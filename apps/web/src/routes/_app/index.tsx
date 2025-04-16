import { createFileRoute } from "@tanstack/react-router";

import { Button } from "../../components/ui/button";
import { authClient } from "../../lib/auth-client";

export const Route = createFileRoute("/_app/")({
	component: Home,
});

function Home() {
	const { data, isPending } = authClient.useSession();
	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{data ? (
				<div>
					<Button intent="outline" onPress={() => authClient.signOut()}>
						Sign out
					</Button>
				</div>
			) : (
				<Button
					onPress={() =>
						authClient.signIn.social({
							provider: "google",
							callbackURL: "http://localhost:3000",
						})
					}
				>
					Sign in
				</Button>
			)}
		</div>
	);
}
