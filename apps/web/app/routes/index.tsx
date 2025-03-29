import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { authClient } from "../lib/auth-client";

const getServerMessage = createServerFn({
	method: "GET",
}).handler(async () => {
	const res = await fetch("http://localhost:8787");
	const text = await res.text();
	return text;
});

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => await getServerMessage(),
});

function Home() {
	const text = Route.useLoaderData();
	const { data, isPending } = authClient.useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>Hono says: {text}</p>
			{data ? (
				<div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
					<button type="button" onClick={() => authClient.signOut()}>
						Sign out
					</button>
				</div>
			) : (
				<button
					type="button"
					onClick={() =>
						authClient.signIn.social({
							provider: "google",
							callbackURL: "http://localhost:3000/dashboard",
						})
					}
				>
					Sign in
				</button>
			)}
		</div>
	);
}
