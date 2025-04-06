import { createFileRoute } from "@tanstack/react-router";

import Button from "@lorenz/ui/button";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button onPress={() => authClient.deleteUser()}>Delete Account</Button>
		</div>
	);
}
