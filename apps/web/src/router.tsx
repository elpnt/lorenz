import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { routerWithQueryClient } from "@tanstack/react-router-with-query";

import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const queryClient = new QueryClient();

	return routerWithQueryClient(
		createTanStackRouter({
			routeTree,
			context: { queryClient, session: null },
			defaultPreload: "intent",
			scrollRestoration: true,
		}),
		queryClient,
	);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

type QueryKey = ["vocab", ...ReadonlyArray<unknown>];

declare module "@tanstack/react-query" {
	interface Register {
		queryKey: QueryKey;
		mutationKey: QueryKey;
	}
}
