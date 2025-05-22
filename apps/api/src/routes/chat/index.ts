import { openai } from "@ai-sdk/openai";
import {
	type ToolResultUnion,
	appendClientMessage,
	appendResponseMessages,
	generateObject,
	streamText,
	tool,
} from "ai";
import { and, asc, desc, eq } from "drizzle-orm";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { validator } from "hono/validator";
import { z } from "zod";

import { createClient } from "../../db";
import { chat } from "../../db/schema";
import {
	getChatById,
	getMessagesByChatId,
	getTrailingMessageId,
	saveChat,
	saveMessages,
} from "../../lib/chat";
import type { Env } from "../../types";
import { generateTitleFromUserMessage } from "./lib";
import { postRequestBodySchema } from "./schema";

const tools = {
	proofread: tool({
		description:
			"Supportively correct grammar mistakes, awkward phrasing, or unnatural English expressions, and encourage the user's progress.",
		parameters: z.object({
			userText: z.string().describe("User's text written in English"),
		}),
		execute: async ({ userText }) => {
			const res = await generateObject({
				model: openai("gpt-4o"),
				prompt: `Check the user's English below for grammar mistakes or unnatural expressions.

Be tolerant of casual chat conventions:
- Lowercase sentences beginnings are acceptable in chat
- Missing periods or commas at the end of sentences are common in chat
- Short, informal phrases are normal
- Common chat abbreviations (btw, lol, omg, etc.) are fine

If the text is understandable and follows casual chat conventions, respond ONLY with { \"ok\": true }.
Only mark text as needing correction if it contains SIGNIFICANT grammar errors that affect understanding or clearly unnatural expressions.

If significant improvements are needed, respond ONLY with { \"ok\": false, \"corrected\": \"...\", \"explanation\": \"...\" }.
Your explanation must always be supportive and positive. Don't repeat the original text.

User's input:
"""
${userText}
"""`,
				schema: z.object({
					ok: z.boolean(),
					corrected: z.string().optional(),
					explanation: z.string().optional(),
				}),
			});
			return res.object;
		},
	}),
};

export type ToolResult = ToolResultUnion<typeof tools>;

const app = new Hono<Env>()
	.get("/", async (c) => {
		const user = c.get("user");
		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}
		const db = createClient(c.env.DATABASE_URL);
		const res = await db.query.chat.findMany({
			where: eq(chat.userId, user.id),
			orderBy: asc(chat.createdAt),
			columns: { id: true, title: true },
		});
		return c.json(res);
	})
	.get("/recent", async (c) => {
		const user = c.get("user");
		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}
		const db = createClient(c.env.DATABASE_URL);
		const res = await db.query.chat.findMany({
			where: eq(chat.userId, user.id),
			orderBy: desc(chat.createdAt),
			limit: 5,
			columns: { id: true, title: true },
		});
		return c.json(res);
	})
	.get("/:id", async (c) => {
		const user = c.get("user");
		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const db = createClient(c.env.DATABASE_URL);
		const { id } = c.req.param();

		const data = await db.query.chat.findFirst({
			where: and(eq(chat.userId, user.id), eq(chat.id, id)),
			with: {
				messages: {
					columns: { id: true, role: true, parts: true },
				},
			},
		});

		if (!data) {
			return c.json({ error: "Chat not found" }, 404);
		}

		return c.json(data);
	})
	.post(
		"/",
		validator("json", (value, c) => {
			console.log(JSON.stringify(value, null, 2));
			const parsed = postRequestBodySchema.safeParse(value);
			if (!parsed.success) {
				return c.json({ error: "Invalid request body" }, 400);
			}
			return parsed.data;
		}),
		async (c) => {
			const user = c.get("user");
			if (!user) {
				return c.json({ error: "Unauthorized" }, 401);
			}

			const db = createClient(c.env.DATABASE_URL);

			const { id, message } = c.req.valid("json");
			const chat = await getChatById(db, { id });

			if (!chat) {
				const title = await generateTitleFromUserMessage({
					message,
				});
				await saveChat(db, { id, title, userId: user.id });
			} else {
				if (chat.userId !== user.id) {
					return c.json({ error: "Forbidden" }, 403);
				}
			}

			const previousMessages = await getMessagesByChatId(db, { id });
			const messages = appendClientMessage({
				messages: previousMessages.map((message) => ({
					...message,
					content:
						message.parts[0].type === "text" ? message.parts[0].text : "",
				})),
				message,
			});
			await saveMessages(db, {
				messages: [
					{
						chatId: id,
						id: message.id,
						role: "user",
						parts: message.parts,
						createdAt: new Date(),
					},
				],
			});

			const result = streamText({
				model: openai("gpt-4o"),
				system: `
You are Lorenz, a friendly and encouraging English teacher. Your role is to help users practice natural English with engaging conversation.

When a user sends a message:
1. ALWAYS proofread the user's input by invoking the "proofread" tool. Use the tool with every user message, but remember that casual chat
conventions (lowercase beginnings, missing periods, abbreviations) are acceptable.
2. After the tool returns, give a supportive, conversational response that keeps the conversation going and encourages the user. Your reply
should feel like chatting with a friend and encourage continued learning.

Important:
- Do not include corrections or explanations in your conversational text; only return them via the proofread tool as its result.
- The output order MUST always be: (1) proofread tool invocation (so the correction/explanation appears first), then (2) your conversational reply.
- Only point out significant errors that affect understanding, not minor stylistic issues common in chat.
- Be supportive and make users feel good about their progress.
`,
				messages,
				tools,
				maxSteps: 2,
				onFinish: async ({ response }) => {
					try {
						const assistantId = getTrailingMessageId({
							messages: response.messages.filter(
								(message) => message.role === "assistant",
							),
						});
						if (!assistantId) {
							throw new Error("No assistant message found");
						}

						const [, assistantMessage] = appendResponseMessages({
							messages: [message],
							responseMessages: response.messages,
						});

						await saveMessages(db, {
							messages: [
								{
									id: assistantId,
									chatId: id,
									role: assistantMessage.role,
									parts: assistantMessage.parts || [],
									createdAt: new Date(),
								},
							],
						});
					} catch (_) {
						console.error("Failed to save chat");
					}
				},
			});

			// Need this for Cloudflare Workers
			// See also: https://hono.dev/docs/helpers/streaming#streamtext
			c.header("Content-Encoding", "Identity");

			// Mark the response as a Vercel AI SDK v1 data stream:
			c.header("X-Vercel-AI-Data-Stream", "v1");
			c.header("Content-Type", "text/plain; charset=utf-8");

			return stream(c, (stream) => stream.pipe(result.toDataStream()));
		},
	)
	.delete("/:id", async (c) => {
		const user = c.get("user");
		if (!user) {
			return c.json({ error: "Unauthorized" }, 401);
		}

		const db = createClient(c.env.DATABASE_URL);
		const { id } = c.req.param();

		const res = await db
			.delete(chat)
			.where(and(eq(chat.userId, user.id), eq(chat.id, id)))
			.returning();

		return c.json({ success: true, id: res[0].id });
	});

export default app;
