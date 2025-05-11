import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { chatQueryOptions } from "../../api/chat/get-chat";

export const Route = createFileRoute("/_app/chat/$chatId")({
	component: RouteComponent,
	loader: async ({ params: { chatId }, context }) => {
		await context.queryClient.ensureQueryData(chatQueryOptions(chatId));
	},
});

function RouteComponent() {
	const { chatId } = Route.useParams();
	const chatQuery = useSuspenseQuery(chatQueryOptions(chatId));

	return (
		<div>
			<pre className="text-xs">{JSON.stringify(chatQuery.data, null, 2)}</pre>
		</div>
	);
}
