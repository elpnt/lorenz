import { eq } from "drizzle-orm";
import type { DB } from "../db";

import { chat } from "../db/schema";

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
