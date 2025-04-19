import { Outlet, createFileRoute } from "@tanstack/react-router";

import { AuthLayout } from "../components/ui/auth-layout";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AuthLayout>
			<Outlet />
		</AuthLayout>
	);
}
