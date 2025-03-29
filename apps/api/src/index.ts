import { Hono } from "hono";

import { db } from "./db";
import { auth } from "./lib/auth";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.get("/", (c) => {
	const x = db;
	const clientId = process.env.GOOGLE_CLIENT_ID;
	return c.text(`clientId: ${clientId}`);
});

export default app;
