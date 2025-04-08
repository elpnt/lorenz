import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const vocabularies = pgTable("vocabularies", {
	id: serial().primaryKey(),
	front: text().notNull(),
	back: text().notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	updatedAt: timestamp().defaultNow().notNull(),
});
