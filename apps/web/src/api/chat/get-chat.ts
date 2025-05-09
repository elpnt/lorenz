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

const fetchChatByIdSchema = z.object({
	id: z.string().uuid(),
});

const fetchChat = createServerFn({ method: "GET" })
	.validator(fetchChatByIdSchema)
	.handler(async ({ data }) => {
		const api = createAPIClient();
		const res = await api.chat[":id"].$get({ param: { id: data.id } });
		return res.json();
	});

export const chatQueryOptions = (id: string) => {
	return queryOptions({
		queryKey: ["chat", id],
		queryFn: () => fetchChat({ data: { id } }),
	});
};
