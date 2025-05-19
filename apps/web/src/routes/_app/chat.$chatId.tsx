import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { chatQueryOptions } from "../../api/chat/get-chat";
import { Chat } from "../../components/chat";

export const Route = createFileRoute("/_app/chat/$chatId")({
	component: RouteComponent,
	loader: async ({ params: { chatId }, context }) => {
		await context.queryClient.ensureQueryData(chatQueryOptions(chatId));
	},
});

function RouteComponent() {
	const { chatId } = Route.useParams();
	const chatQuery = useSuspenseQuery(chatQueryOptions(chatId));

	if ("error" in chatQuery.data) {
		return null;
	}

	return (
		<div>
			<pre className="text-xs">{JSON.stringify(chatQuery.data, null, 2)}</pre>
			<Chat
				id={chatId}
				initialMessages={chatQuery.data.messages.map((message) => ({
					id: message.id,
					role: message.role,
					content: message.role,
				}))}
			/>
		</div>
	);
}
