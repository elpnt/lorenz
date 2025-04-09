import { Hono } from "hono";
import { z } from "zod";

import { validator } from "hono/validator";
import { db } from "../db";

const app = new Hono<{ Bindings: CloudflareBindings }>();

const newVocabSchema = z.object({
	front: z.string().min(2).max(100),
	back: z.string().min(2).max(1000),
});

app
	.get("/", async (c) => {
		const result = await db.query.vocabularies.findMany({
			where: (vocab, { eq }) => eq(vocab.userId, "/* TODO */"),
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
			const { front, back } = c.req.valid("json");
		},
	);

export default app;
