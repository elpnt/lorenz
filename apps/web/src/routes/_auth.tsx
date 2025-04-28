import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { AuthLayout } from "../components/ui/auth-layout";
import { getServerSession } from "../lib/auth-server";

const getSessionOnServer = createServerFn().handler(getServerSession);

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: async () => {
		const { data: session } = await getSessionOnServer();
		if (session) {
			throw redirect({ to: "/chat" });
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
