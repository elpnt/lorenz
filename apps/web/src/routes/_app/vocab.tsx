import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../../components/ui/button";
import { api } from "../../lib/api-client";

export const Route = createFileRoute("/_app/vocab")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Button
				onPress={async () => {
					const res = await api.vocab.$get();
					if (res.ok) {
						const data = await res.json();
						console.log(data);
					}
				}}
			>
				Request
			</Button>

			<Button
				intent="outline"
				onPress={async () => {
					const res = await api.session.$get();
					if (res.ok) {
						const data = await res.json();
						console.log(data);
					}
				}}
			>
				Get session
			</Button>
		</div>
	);
}
