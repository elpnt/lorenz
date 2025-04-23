import { createFileRoute } from "@tanstack/react-router";

import { useSession } from "../../lib/auth-client";

export const Route = createFileRoute("/_app/")({
	component: Home,
});

function Home() {
	const { data, isPending } = useSession();
	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div className="p-4">
			<pre className="text-xs">{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
