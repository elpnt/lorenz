import {
	BookOpenIcon,
	Cog6ToothIcon,
	HomeIcon,
} from "@heroicons/react/20/solid";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

import {
	Sidebar,
	SidebarBody,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
} from "../components/sidebar";
import { SidebarLayout } from "../components/sidebar-layout";

/* App layout */
export const Route = createFileRoute("/_app")({
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { pathname } = useLocation();

	return (
		<ReactAriaRouterProvider
			navigate={(to, options) => router.navigate({ to, ...options })}
			useHref={(to) => router.buildLocation({ to }).href}
		>
			<SidebarLayout
				sidebar={
					<Sidebar>
						<SidebarBody>
							<SidebarSection>
								<SidebarItem to="/" current={pathname === "/"}>
									<HomeIcon />
									<SidebarLabel>Home</SidebarLabel>
								</SidebarItem>
								<SidebarItem to="/vocab" current={pathname === "/vocab"}>
									<BookOpenIcon />
									<SidebarLabel>Vocabulary</SidebarLabel>
								</SidebarItem>
								<SidebarItem to="/settings" current={pathname === "/settings"}>
									<Cog6ToothIcon />
									<SidebarLabel>Settings</SidebarLabel>
								</SidebarItem>
							</SidebarSection>
						</SidebarBody>
					</Sidebar>
				}
				navbar={<div>Navbar</div>}
			>
				<Outlet />
			</SidebarLayout>
		</ReactAriaRouterProvider>
	);
}
