import { Hono } from "hono";
import { validator } from "hono/validator";
import { z } from "zod";

import { createClient } from "../db";
import { vocabulary } from "../db/schema";
import type { Env } from "../types";

const newVocabSchema = z.object({
	front: z.string().min(1).max(100),
	back: z.string().min(1).max(1000),
});

const app = new Hono<Env>()
	.get("/", async (c) => {
		const user = c.get("user");
		if (!user) {
			return c.text("Unauthorized", 401);
		}
		const db = createClient(c.env.DATABASE_URL);
		const result = await db.query.vocabulary.findMany({
			where: (vocab, { eq }) => eq(vocab.userId, user.id),
		});
		return c.json(result);
	})
	.post(
		"/",
		validator("json", (value, c) => {
			const parsed = newVocabSchema.safeParse(value);
			if (!parsed.success) {
				return c.text("Invalid input", 400);
			}
			return parsed.data;
		}),
		async (c) => {
			const user = c.get("user");

			if (!user) {
				return c.text("Unauthorized", 401);
			}
			const db = createClient(c.env.DATABASE_URL);
			const { front, back } = c.req.valid("json");
			await db.insert(vocabulary).values({ front, back, userId: user.id });

			return c.json({ message: "Vocabulary created successfully" });
		},
	);

export default app;
