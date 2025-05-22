import { createFileRoute } from "@tanstack/react-router";

import { Chat } from "../../components/chat";
import { generateUUID } from "../../lib/generate-uuid";

export const Route = createFileRoute("/_app/chat/")({
	component: RouteComponent,
});

function RouteComponent() {
	const id = generateUUID();

	return (
		<>
			<Chat id={id} />
		</>
	);
}
