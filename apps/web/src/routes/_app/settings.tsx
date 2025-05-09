import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../../components/ui/button";
import { deleteUser } from "../../lib/auth-client";

export const Route = createFileRoute("/_app/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-4">
			<Button
				intent="danger"
				onPress={async () => {
					try {
						await deleteUser();
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
