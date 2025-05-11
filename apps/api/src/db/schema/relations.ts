import { relations } from "drizzle-orm";

import { user } from "./auth";
import { chat, message } from "./chat";
import { vocabulary } from "./vocab";

export const userRelations = relations(user, ({ many }) => ({
	vocabulary: many(vocabulary),
	chat: many(chat),
}));

export const chatRelations = relations(chat, ({ one, many }) => ({
	user: one(user, {
		fields: [chat.userId],
		references: [user.id],
	}),
	messages: many(message),
}));

export const messageRelations = relations(message, ({ one }) => ({
	chat: one(chat, {
		fields: [message.chatId],
		references: [chat.id],
	}),
}));
