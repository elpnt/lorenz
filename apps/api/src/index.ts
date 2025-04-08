import { Hono } from "hono";
import { cors } from "hono/cors";

import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";
import vocabRoutes from "./routes/vocab";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use(
	"/auth/*",
	cors({
		origin: "http://localhost:3000",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

// app.get("/", async (c) => {
// 	return c.text("Hello World!");
// });

app
	.route("/auth", authRoutes)
	.route("/chat", chatRoutes)
	.route("/vocab", vocabRoutes);

export default app;
