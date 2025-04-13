import { Hono } from "hono";
import { cors } from "hono/cors";
import { authMiddleware } from "./middleware";
import authRoutes from "./routes/auth";
import chatRoutes from "./routes/chat";
import vocabRoutes from "./routes/vocab";
import type { Env } from "./types";

const app = new Hono<Env>();

// app.use("*", cors({ origin: "http://localhost:3000" }));
app.use(
	"*",
	cors({
		origin: "http://localhost:3000",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use(authMiddleware);

// app.use("*", async (c, next) => {
// 	console.log(c.req.raw.headers);
// 	const session = await auth.api.getSession({ headers: c.req.raw.headers });

// 	if (!session) {
// 		c.set("user", null);
// 		c.set("session", null);
// 		return next();
// 	}

// 	c.set("user", session.user);
// 	c.set("session", session.session);
// 	return next();
// });

// app.use("/vocab", cors({ origin: "http://localhost:3000" }));
// app.use("/vocab", authMiddleware);

// app.get("/session", async (c) => {
// 	const session = c.get("session");
// 	const user = c.get("user");

// 	if (!user) return c.body(null, 401);

// 	return c.json({
// 		session,
// 		user,
// 	});
// });

// app.get("/hello", (c) => {
// 	return c.text("🔥 Hello world!! 🔥");
// });

// const routes = app
// 	.route("/auth", authRoutes)
// 	.route("/chat", chatRoutes)
// 	.route("/vocab", vocabRoutes);

// const routes = app.get("/", (c) => {
// 	return c.text("🔥 Hello world!! 🔥");
// });

const routes = app
	.route("/auth", authRoutes)
	.route("/chat", chatRoutes)
	.route("/vocab", vocabRoutes)
	.get("/session", async (c) => {
		const session = c.get("session");
		const user = c.get("user");

		if (!user) return c.body(null, 401);

		return c.json({
			session,
			user,
		});
	});

export type AppType = typeof routes;

export default app;
