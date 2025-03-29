import { Hono } from "hono";
import { cors } from "hono/cors";

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

export default app;
