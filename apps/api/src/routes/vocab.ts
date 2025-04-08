import { Hono } from "hono";

import { db } from "../db";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", async (c) => {
	const result = await db.query.vocabularies.findMany({
		where: (vocab, { eq }) => eq(vocab.userId, "/* TODO */"),
	});
	return c.json(result);
});

export default app;
