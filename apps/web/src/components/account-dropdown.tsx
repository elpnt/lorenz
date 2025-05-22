import { useRouter } from "@tanstack/react-router";

import { signOut, useSession } from "../lib/auth-client";
import { Avatar } from "./ui/avatar";
import { Dropdown, DropdownItem, DropdownMenu } from "./ui/dropdown";
import { SidebarItem } from "./ui/sidebar";

export const AccountDropdown = () => {
	const router = useRouter();
	const { data } = useSession();

	return (
		<Dropdown>
			<SidebarItem>
				<span className="flex min-w-0 items-center gap-3">
					<Avatar
						src={data?.user.image}
						initials={data?.user.name[0]}
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
			<DropdownMenu className="min-w-(--trigger-width)">
				<DropdownItem href={{ to: "/settings" }}>Settings</DropdownItem>
				<DropdownItem
					// href={{}}
					onAction={() =>
						signOut({
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
