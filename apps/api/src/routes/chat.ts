import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Hono } from "hono";
import { stream } from "hono/streaming";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.post("/", async (c) => {
	const { messages } = await c.req.json();
	const result = streamText({
		model: openai("gpt-4o"),
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
