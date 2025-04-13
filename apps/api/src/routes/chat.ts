import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import type { Env } from "../types";

const app = new Hono<Env>().post("/", async (c) => {
	const { messages } = await c.req.json();
	const result = streamText({
		model: openai("gpt-4o"),
		system: `
You are an English teacher helping a student improve their English writing.
For each message from the user, correct the grammar and provide a more natural version.
Then explain the changes in simple English.

Respond in the following format:
1. ✅ {{Corrected sentence}}
2. ✍️ {{Explanation}}
`,
		messages,
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
