import { Hono } from "hono";
import { cors } from "hono/cors";

import { authMiddleware } from "./middleware";
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
app.use("/chat", cors({ origin: "http://localhost:3000" }));
app.use(authMiddleware);

app
	.route("/auth", authRoutes)
	.route("/chat", chatRoutes)
	.route("/vocab", vocabRoutes);

export default app;
