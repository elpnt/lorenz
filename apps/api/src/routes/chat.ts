import { openai } from "@ai-sdk/openai";
import { type ToolResultUnion, generateObject, streamText, tool } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { z } from "zod";

import type { Env } from "../types";

const tools = {
	proofread: tool({
		description:
			"Correct any grammar mistakes, awkward phrasing, or expressions that could be more natural",
		parameters: z.object({
			userText: z.string().describe("User's text written in English"),
		}),
		execute: async ({ userText }) => {
			const res = await generateObject({
				model: openai("gpt-4o"),
				prompt: `Correct the grammar and provide a more natural version of the user's text. Don't repeat the user's original text to avoid redundancy.
"""
${userText}
"""`,
				schema: z.object({
					corrected: z.string(),
					explanation: z.string(),
				}),
			});
			return {
				corrected: res.object.corrected,
				explanation: res.object.explanation,
			};
		},
	}),
};

export type ToolResult = ToolResultUnion<typeof tools>;

const app = new Hono<Env>().post("/", async (c) => {
	const { messages } = await c.req.json();
	const result = streamText({
		model: openai("gpt-4o"),
		system: `
		You are Lorenz, a friendly and encouraging English teacher. Your role is to help users practice natural English through engaging conversation.

		When a user sends a message:
		- Respond naturally and keep the conversation going, as if chatting with a friend.
		- Carefully check the user's English for any grammar mistakes or unnatural expressions, even minor ones.
		- If you notice anything that could be improved, do NOT include the correction in your response text. Instead, USE the "proofread" tool and
		  return its result as an object, including both "corrected" and "explanation" fields.
		- If the user's English is already natural and correct, do not use the tool—just reply as normal.

		Important:
		- Never include the correction or explanation as a paragraph in your reply text.
		- Only return the correction and explanation via the proofread tool if an improvement is possible.
		- Be supportive and make users feel good about their progress.
		- Your output order must always be: (1) conversational reply, (2) (if needed) proofread tool invocation.
		`,
		messages,
		tools,
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
