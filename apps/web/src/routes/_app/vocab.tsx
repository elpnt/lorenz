import { createFileRoute } from "@tanstack/react-router";

import Button from "../../components/ui/button";
import { authClient } from "../../lib/auth-client";

export const Route = createFileRoute("/_app/vocab")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button
				onPress={async () => {
					const { data, error } = await authClient.getSession();
					if (!data) return;

					const res = await fetch("http://localhost:8787/vocab", {
						method: "POST",
						credentials: "include",
						headers: {
							// Authorization: `Bearer ${data.session.token}`,
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ front: "result", back: "結果" }),
					});
					const json = await res.json();
					console.log(json);
				}}
			>
				Request
			</Button>

			<Button
				intent="outline"
				onPress={async () => {
					const res = await fetch("http://localhost:8787/session", {
						credentials: "include",
					});
					const data = await res.json();
					console.log(data);
				}}
			>
				Get session
			</Button>
		</div>
	);
}
