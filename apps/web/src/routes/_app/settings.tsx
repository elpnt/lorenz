import { createFileRoute } from "@tanstack/react-router";

import Button from "../../components/ui/button";
import { authClient } from "../../lib/auth-client";

export const Route = createFileRoute("/_app/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button
				intent="danger"
				onPress={async () => {
					try {
						await authClient.deleteUser();
						// TODO: Replace with a goodbye page
						window.location.href = "http://localhost:3000";
					} catch (error) {
						console.error(error);
					}
				}}
			>
				Delete Account
			</Button>
		</div>
	);
}
