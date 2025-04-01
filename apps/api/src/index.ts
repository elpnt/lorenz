import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { stream } from "hono/streaming";

import { auth } from "./lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
	"/api/auth/*",
	cors({
		origin: "http://localhost:3000",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});
app.get("/", (c) => {
	return c.text("Hello from Hono🔥");
});

app.use("/chat", cors({ origin: "http://localhost:3000" }));
app.post("/chat", async (c) => {
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
