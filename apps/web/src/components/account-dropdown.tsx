import { useRouter } from "@tanstack/react-router";

import { authClient } from "../lib/auth-client";
import { Avatar } from "./ui/avatar";
import { Dropdown, DropdownItem, DropdownMenu } from "./ui/dropdown";
import { SidebarItem } from "./ui/sidebar";

export const AccountDropdown = () => {
	const router = useRouter();
	const { data } = authClient.useSession();

	return (
		<Dropdown>
			<SidebarItem>
				<span className="flex min-w-0 items-center gap-3">
					<Avatar
						src={data?.user.image}
						className="size-10"
						square
						alt="Avatar"
					/>
					<span className="block text-left">
						<span className="block text-sm/5 font-medium">
							{data?.user.name}
						</span>
						<span className="block text-xs/5 text-zinc-500">
							{data?.user.email}
						</span>
					</span>
				</span>
			</SidebarItem>
			<DropdownMenu>
				<DropdownItem href="/settings">Settings</DropdownItem>
				<DropdownItem
					onAction={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									router.navigate({ to: "/login" });
								},
							},
						})
					}
				>
					Log out
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
