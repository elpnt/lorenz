import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { chatsQueryOptions } from "../../api/chat/get-chat";
import { Chat } from "../../components/chat";
import { Link } from "../../components/ui/link";
import { generateUUID } from "../../lib/generate-uuid";

export const Route = createFileRoute("/_app/chat/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(chatsQueryOptions());
	},
});

function RouteComponent() {
	const id = generateUUID();
	const chatQuery = useSuspenseQuery(chatsQueryOptions());

	if ("error" in chatQuery.data) {
		return <div>Error: {chatQuery.data.error}</div>;
	}

	return (
		<>
			<div className="flex flex-col space-y-2">
				{chatQuery.data.map((chat) => (
					<Link key={chat.id} to="/chat/$chatId" params={{ chatId: chat.id }}>
						{chat.title}
					</Link>
				))}
			</div>
			<Chat id={id} />
		</>
	);
}
