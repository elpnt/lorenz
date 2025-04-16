import { openai } from "@ai-sdk/openai";
import { generateText, streamText, tool } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import { z } from "zod";

import type { Env } from "../types";

const app = new Hono<Env>().post("/", async (c) => {
	const { messages } = await c.req.json();
	const result = streamText({
		model: openai("gpt-4o"),
		system: `
You are a friendly and supportive English teacher. Your primary role is to have natural and engaging
conversations with the user in English, helping them practice their language skills.
If the user's message contains any grammar mistakes, awkward phrasing, or could be expressed in a more
natural or fluent way, call the "proofread" tool with the original user input.
When replying, carry on the conversation naturally. If a "proofread" tool response is available, include
a gentle correction or suggestion as part of your reply, encouraging and guiding the user in a helpful tone.
Do not overwhelm the user with corrections. Focus on the most important ones, and always keep the conversation
flowing in a natural and encouraging way.
`,
		messages,
		tools: {
			proofread: tool({
				description:
					"Correct the grammar and provide a more natural version of the user's text",
				parameters: z.object({
					userText: z.string().describe("User's text written in English"),
				}),
				execute: async ({ userText }) => {
					const res = await generateText({
						model: openai("gpt-4o"),
						prompt: `Correct the grammar and provide a more natural version of the user's text: ${userText}`,
					});
					return res.text;
				},
			}),
		},
		maxSteps: 5,
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
