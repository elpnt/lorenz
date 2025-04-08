import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const vocabularies = pgTable("vocabularies", {
	id: serial().primaryKey(),
	userId: text().references(() => user.id),
	front: text().notNull(),
	back: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});
