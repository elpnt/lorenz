import type { UIMessage } from "ai";
import type { InferSelectModel } from "drizzle-orm";
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
	id: text("id").primaryKey(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	chatId: uuid("chat_id")
		.notNull()
		.references(() => chat.id, { onDelete: "cascade" }),
	role: text("role", {
		enum: ["user", "assistant", "data", "system"],
	}).notNull(),
	parts: jsonb("parts").$type<UIMessage["parts"]>().notNull(),
});

export type DBMessage = InferSelectModel<typeof message>;
