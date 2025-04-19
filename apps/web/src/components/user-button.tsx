import clsx from "clsx";
import { Button } from "react-aria-components";

import { useRouter } from "@tanstack/react-router";
import { authClient } from "../lib/auth-client";
import { Dropdown, DropdownItem, DropdownMenu } from "./ui/dropdown";

export const UserButton = () => {
	const router = useRouter();

	return (
		<Dropdown>
			<Button
				className={clsx(
					"flex w-48 items-center gap-3 rounded-xl border border-transparent p-1",
					"pressed:border-zinc-200 hover:border-zinc-200 dark:pressed:border-zinc-700 dark:hover:border-zinc-700",
				)}
				aria-label="Account options"
			>
				Open
			</Button>
			<DropdownMenu>
				<DropdownItem>Settings</DropdownItem>
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
