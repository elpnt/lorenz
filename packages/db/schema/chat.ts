import { jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const chatConversation = pgTable("chat_conversation", {
  id: serial().primaryKey(),
  userId: text().references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const chatMessage = pgTable("chat_message", {
  id: serial().primaryKey(),
  conversationId: serial().references(() => chatConversation.id, { onDelete: "cascade" }),
  role: text().notNull(), // "user" または "assistant"
  content: text().notNull(),
  toolCalls: jsonb(), // ツールコールのJSON表現
  createdAt: timestamp().defaultNow().notNull(),
});
