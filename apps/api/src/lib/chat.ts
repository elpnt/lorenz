import type { CoreAssistantMessage, CoreToolMessage } from "ai";
import { asc, eq } from "drizzle-orm";

import type { DB } from "../db";
import { type DBMessage, chat, message } from "../db/schema";

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };

export async function getChatById(db: DB, { id }: { id: string }) {
	try {
		const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
		return selectedChat;
	} catch (error) {
		console.error("Failed to get chat by id from database");
		throw error;
	}
}

export async function saveChat(
	db: DB,
	{
		id,
		userId,
		title,
	}: {
		id: string;
		userId: string;
		title: string;
	},
) {
	try {
		return await db.insert(chat).values({
			id,
			createdAt: new Date(),
			userId,
			title,
		});
	} catch (error) {
		console.error("Failed to save chat in database");
		throw error;
	}
}

export async function getMessagesByChatId(
	db: DB,
	{ id }: { id: string },
): Promise<DBMessage[]> {
	try {
		return await db
			.select()
			.from(message)
			.where(eq(message.chatId, id))
			.orderBy(asc(message.createdAt));
	} catch (error) {
		console.error("Failed to get messages by chat id from database", error);
		throw error;
	}
}

export async function saveMessages(
	db: DB,
	{
		messages,
	}: {
		messages: Array<DBMessage>;
	},
) {
	try {
		return await db.insert(message).values(messages);
	} catch (error) {
		console.error("Failed to save messages in database", error);
		throw error;
	}
}

export function getTrailingMessageId({
	messages,
}: {
	messages: Array<ResponseMessage>;
}): string | null {
	const trailingMessage = messages.at(-1);

	if (!trailingMessage) return null;

	return trailingMessage.id;
}
