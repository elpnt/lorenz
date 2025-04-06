import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import {
	type NavigateOptions,
	type ToOptions,
	useRouter,
} from "@tanstack/react-router";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

declare module "react-aria-components" {
	interface RouterConfig {
		href: ToOptions["to"];
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}

// @ts-ignore
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
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
});

function RootComponent() {
	const router = useRouter();

	return (
		<ReactAriaRouterProvider
			navigate={(to, options) => router.navigate({ to, ...options })}
			useHref={(to) => router.buildLocation({ to }).href}
		>
			<RootDocument>
				<Outlet />
			</RootDocument>
		</ReactAriaRouterProvider>
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
