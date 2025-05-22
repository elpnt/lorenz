import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { createAPIClient } from "../../lib/api-client";

const fetchChats = createServerFn({ method: "GET" }).handler(async () => {
	const api = createAPIClient();
	const res = await api.chat.$get();
	return res.json();
});

export const chatsQueryOptions = () => {
	return queryOptions({
		queryKey: ["chat"],
		queryFn: fetchChats,
	});
};

const fetchRecentChats = createServerFn({ method: "GET" }).handler(async () => {
	const api = createAPIClient();
	const res = await api.chat.recent.$get();
	if (res.ok) {
		const data = await res.json();
		return data;
	}
});

export const recentChatsQueryOptions = () => {
	return queryOptions({
		queryKey: ["chat", "recent"],
		queryFn: fetchRecentChats,
	});
};

const fetchChatByIdSchema = z.object({
	id: z.string().uuid(),
});

const fetchChat = createServerFn({ method: "GET" })
	.validator(fetchChatByIdSchema)
	.handler(async ({ data }) => {
		const client = createAPIClient();
		const res = await client.chat[":id"].$get({ param: { id: data.id } });
		if (res.status === 501) {
			const data = await res.json();
			return data;
		}
		if (res.ok) {
			const data = await res.json();
			return data;
		}
		// const json = await res.json();
		// return json;
	});

export const chatQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: ["chat", id],
		queryFn: () => fetchChat({ data: { id } }),
	});
};
