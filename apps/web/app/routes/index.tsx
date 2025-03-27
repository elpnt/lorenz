import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

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

	return <div>Hono says: {text}</div>;
}
