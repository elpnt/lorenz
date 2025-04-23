import {
	BookOpenIcon,
	ChatBubbleLeftIcon,
	Cog6ToothIcon,
	HomeIcon,
} from "@heroicons/react/20/solid";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { getHeaders } from "@tanstack/react-start/server";
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
import { getSession } from "../lib/auth-client";

const getSessionOnServer = createServerFn().handler(async () => {
	const session = await getSession({
		fetchOptions: { headers: getHeaders() as HeadersInit },
	});
	return session;
});

/* App layout */
export const Route = createFileRoute("/_app")({
	component: AppLayout,
	beforeLoad: async ({ context }) => {
		const { data: session, error } = await getSessionOnServer();
		if (!session) {
			throw redirect({ to: "/login" });
		}
	},
});

function AppLayout() {
	const router = useRouter();
	const { pathname } = useLocation();

	return (
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
							<SidebarItem href="/settings" current={pathname === "/settings"}>
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
	);
}
