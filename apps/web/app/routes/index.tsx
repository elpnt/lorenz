import { useChat } from "@ai-sdk/react";
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
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: "http://localhost:8787/chat",
	});

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<p>Hono says: {text}</p>
			{data ? (
				<div>
					<button type="button" onClick={() => authClient.signOut()}>
						Sign out
					</button>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={input}
							onChange={handleInputChange}
							placeholder="Type a message..."
						/>
						<button type="submit">Send</button>
					</form>
					<div>
						{messages.map((message) => (
							<div key={message.id} className="whitespace-pre-wrap">
								{message.role === "user" ? "User: " : "AI: "}
								{message.parts.map((part, i) => {
									switch (part.type) {
										case "text":
											return <div key={`${message.id}-${i}`}>{part.text}</div>;
										case "tool-invocation":
											return (
												<pre key={`${message.id}-${i}`}>
													{JSON.stringify(part.toolInvocation, null, 2)}
												</pre>
											);
									}
								})}
							</div>
						))}
					</div>
				</div>
			) : (
				<button
					type="button"
					onClick={() =>
						authClient.signIn.social({
							provider: "google",
							callbackURL: "http://localhost:3000",
						})
					}
				>
					Sign in
				</button>
			)}
		</div>
	);
}
