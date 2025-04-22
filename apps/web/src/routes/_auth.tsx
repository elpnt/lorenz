import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout } from "../components/ui/auth-layout";
import { authClient } from "../lib/auth-client";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		const { data: session } = await authClient.getSession();
		if (session) {
			throw redirect({
				to: "/",
				search: {
					redirect: location.href,
				},
			});
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
