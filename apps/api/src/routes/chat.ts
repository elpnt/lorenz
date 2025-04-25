import { openai } from "@ai-sdk/openai";
import { type ToolResultUnion, generateObject, streamText, tool } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { z } from "zod";

import type { Env } from "../types";

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

const app = new Hono<Env>().post("/", async (c) => {
	const { messages } = await c.req.json();
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
		// toolCallStreaming: true,
		maxSteps: 2,
	});

	// Need this for Cloudflare Workers
	// See also: https://hono.dev/docs/helpers/streaming#streamtext
	c.header("Content-Encoding", "Identity");

	// Mark the response as a Vercel AI SDK v1 data stream:
	c.header("X-Vercel-AI-Data-Stream", "v1");
	c.header("Content-Type", "text/plain; charset=utf-8");

	return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

export default app;
