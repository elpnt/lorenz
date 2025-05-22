import {
	BookOpenIcon,
	ChatBubbleLeftIcon,
	Cog6ToothIcon,
	HomeIcon,
} from "@heroicons/react/20/solid";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { recentChatsQueryOptions } from "../api/chat/get-chat";
import { AccountDropdown } from "../components/account-dropdown";
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
} from "../components/ui/sidebar";
import { SidebarLayout } from "../components/ui/sidebar-layout";
import { getServerSession } from "../lib/auth-server";

const getSessionOnServer = createServerFn().handler(getServerSession);

/* App layout */
export const Route = createFileRoute("/_app")({
	component: AppLayout,
	beforeLoad: async () => {
		const { data: session } = await getSessionOnServer();
		if (!session) {
			throw redirect({ to: "/login" });
		}
	},
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(recentChatsQueryOptions());
	},
});

function AppLayout() {
	const { pathname } = useLocation();
	const recentChatQuery = useSuspenseQuery(recentChatsQueryOptions());

	return (
		<SidebarLayout
			sidebar={
				<Sidebar>
					<SidebarBody>
						<SidebarSection>
							<SidebarItem href={{ to: "/" }} current={pathname === "/"}>
								<HomeIcon />
								<SidebarLabel>Home</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href={{ to: "/chat" }}
								current={pathname.startsWith("/chat")}
							>
								<ChatBubbleLeftIcon />
								<SidebarLabel>Chat</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href={{ to: "/vocab" }}
								current={pathname === "/vocab"}
							>
								<BookOpenIcon />
								<SidebarLabel>Vocabulary</SidebarLabel>
							</SidebarItem>
							<SidebarItem
								href={{ to: "/settings" }}
								current={pathname === "/settings"}
							>
								<Cog6ToothIcon />
								<SidebarLabel>Settings</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
						{recentChatQuery.data ? (
							<SidebarSection>
								<SidebarHeading>Recent chats</SidebarHeading>
								{recentChatQuery.data?.map((chat) => (
									<SidebarItem
										key={chat.id}
										href={{ to: "/chat/$chatId", params: { chatId: chat.id } }}
									>
										{chat.title}
									</SidebarItem>
								))}
							</SidebarSection>
						) : null}
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
