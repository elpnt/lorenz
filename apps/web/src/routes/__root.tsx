import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import type { Session } from "better-auth";

// @ts-ignore
import appCss from "../styles/app.css?url";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	session: Session | null;
}>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Lorenz",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	component: RootComponent,
	errorComponent: ({ error }) => <div>{error.message}</div>,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
			<ReactQueryDevtools />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			lang="en"
			className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
		>
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
