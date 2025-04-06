import { useState } from "react";
import {
	Dialog as AriaDialog,
	DialogTrigger as AriaDialogTrigger,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
} from "react-aria-components";

import { NavbarItem } from "@lorenz/ui/navbar";
import { clsx } from "clsx";

function OpenMenuIcon() {
	return (
		<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M2 6.75C2 6.33579 2.33579 6 2.75 6H17.25C17.6642 6 18 6.33579 18 6.75C18 7.16421 17.6642 7.5 17.25 7.5H2.75C2.33579 7.5 2 7.16421 2 6.75ZM2 13.25C2 12.8358 2.33579 12.5 2.75 12.5H17.25C17.6642 12.5 18 12.8358 18 13.25C18 13.6642 17.6642 14 17.25 14H2.75C2.33579 14 2 13.6642 2 13.25Z" />
		</svg>
	);
}

function CloseMenuIcon() {
	return (
		<svg data-slot="icon" viewBox="0 0 20 20" aria-hidden="true">
			<path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
		</svg>
	);
}

function MobileSidebar({
	open,
	onOpenChange,
	children,
}: React.PropsWithChildren<{
	open: boolean;
	onOpenChange: (open: boolean) => void;
}>) {
	return (
		<AriaDialogTrigger isOpen={open} onOpenChange={onOpenChange}>
			<AriaModalOverlay
				isDismissable
				className={({ isEntering, isExiting }) =>
					clsx(
						"fixed inset-0 bg-black/30 data-closed:opacity-0 lg:hidden",
						isEntering && "animate-in duration-300 ease-out fade-in",
						isExiting && "animate-out duration-200 ease-in fade-out",
					)
				}
			>
				<AriaModal
					className={({ isEntering, isExiting }) =>
						clsx(
							"fixed inset-y-0 p-2 w-full max-w-80",
							isEntering &&
								"animate-in duration-300 ease-in-out slide-in-from-left",
							isExiting &&
								"animate-out duration-200 ease-in-out slide-out-to-left",
						)
					}
				>
					<AriaDialog className="flex h-full flex-col rounded-lg bg-white ring-1 shadow-xs ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10">
						{({ close }) => (
							<>
								<div className="-mb-3 px-4 pt-3">
									<NavbarItem onPress={close} aria-label="Close navigation">
										<CloseMenuIcon />
									</NavbarItem>
								</div>
								{children}
							</>
						)}
					</AriaDialog>
				</AriaModal>
			</AriaModalOverlay>
		</AriaDialogTrigger>
	);
}

export function SidebarLayout({
	navbar,
	sidebar,
	children,
}: React.PropsWithChildren<{
	navbar: React.ReactNode;
	sidebar: React.ReactNode;
}>) {
	const [showSidebar, setShowSidebar] = useState(false);

	return (
		<div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
			{/* Sidebar on desktop */}
			<div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">{sidebar}</div>

			{/* Sidebar on mobile */}
			<MobileSidebar open={showSidebar} onOpenChange={setShowSidebar}>
				{sidebar}
			</MobileSidebar>

			{/* Navbar on mobile */}
			<header className="flex items-center px-4 lg:hidden">
				<div className="py-2.5">
					<NavbarItem
						onPress={() => setShowSidebar(true)}
						aria-label="Open navigation"
					>
						<OpenMenuIcon />
					</NavbarItem>
				</div>
				<div className="min-w-0 flex-1">{navbar}</div>
			</header>

			{/* Content */}
			<main className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
				<div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:ring-1 lg:shadow-xs lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
					<div className="mx-auto max-w-6xl">{children}</div>
				</div>
			</main>
		</div>
	);
}
