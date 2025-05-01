import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const vocabulary = pgTable("vocabulary", {
	id: serial().primaryKey(),
	userId: text()
		.references(() => user.id)
		.notNull(),
	front: text().notNull(),
	back: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});
