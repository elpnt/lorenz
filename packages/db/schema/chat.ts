import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { user } from "./auth";

export const chat = pgTable("chat", {
	id: uuid("id").primaryKey(),
	title: text("title").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const message = pgTable("message", {
	id: uuid("id").primaryKey(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	chatId: uuid("chat_id")
		.notNull()
		.references(() => chat.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
	parts: jsonb("parts").notNull(),
});
