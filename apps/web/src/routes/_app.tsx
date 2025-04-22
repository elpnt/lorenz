import {
	BookOpenIcon,
	ChatBubbleLeftIcon,
	Cog6ToothIcon,
	HomeIcon,
} from "@heroicons/react/20/solid";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { RouterProvider as ReactAriaRouterProvider } from "react-aria-components";

import { AccountDropdown } from "../components/account-dropdown";
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
} from "../components/ui/sidebar";
import { SidebarLayout } from "../components/ui/sidebar-layout";
import { authClient } from "../lib/auth-client";

/* App layout */
export const Route = createFileRoute("/_app")({
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		const { data: session } = await authClient.getSession();
		if (!session) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
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
								<SidebarItem href="/" current={pathname === "/"}>
									<HomeIcon />
									<SidebarLabel>Home</SidebarLabel>
								</SidebarItem>
								<SidebarItem href="/chat" current={pathname === "/chat"}>
									<ChatBubbleLeftIcon />
									<SidebarLabel>Chat</SidebarLabel>
								</SidebarItem>
								<SidebarItem href="/vocab" current={pathname === "/vocab"}>
									<BookOpenIcon />
									<SidebarLabel>Vocabulary</SidebarLabel>
								</SidebarItem>
								<SidebarItem
									href="/settings"
									current={pathname === "/settings"}
								>
									<Cog6ToothIcon />
									<SidebarLabel>Settings</SidebarLabel>
								</SidebarItem>
							</SidebarSection>
						</SidebarBody>
						<SidebarFooter>
							<AccountDropdown />
						</SidebarFooter>
					</Sidebar>
				}
				navbar={<div>Navbar</div>}
			>
				<Outlet />
			</SidebarLayout>
		</ReactAriaRouterProvider>
	);
}
