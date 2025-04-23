import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getHeaders } from "@tanstack/react-start/server";

import { AuthLayout } from "../components/ui/auth-layout";
import { getSession } from "../lib/auth-client";

const getSessionOnServer = createServerFn().handler(async () => {
	const session = await getSession({
		fetchOptions: { headers: getHeaders() as HeadersInit },
	});
	return session;
});

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data: session } = await getSessionOnServer();
		if (session) {
			throw redirect({ to: "/" });
		}
	},
});

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
