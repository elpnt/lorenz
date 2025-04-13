import clsx from "clsx";
import { LayoutGroup, motion } from "motion/react";
import { useContext, useId } from "react";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	OverlayTriggerStateContext,
} from "react-aria-components";

import { Link, type LinkProps } from "./link";

export function Sidebar({
	className,
	...props
}: React.ComponentPropsWithoutRef<"nav">) {
	return (
		<nav
			{...props}
			className={clsx(className, "flex h-full min-h-0 flex-col")}
		/>
	);
}

export function SidebarHeader({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"flex flex-col border-b border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5",
			)}
		/>
	);
}

export function SidebarBody({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8",
			)}
		/>
	);
}

export function SidebarFooter({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"flex flex-col border-t border-zinc-950/5 p-4 dark:border-white/5 [&>[data-slot=section]+[data-slot=section]]:mt-2.5",
			)}
		/>
	);
}

export function SidebarSection({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const id = useId();

	return (
		<LayoutGroup id={id}>
			<div
				{...props}
				data-slot="section"
				className={clsx(className, "flex flex-col gap-0.5")}
			/>
		</LayoutGroup>
	);
}

export function SidebarDivider({
	className,
	...props
}: React.ComponentPropsWithoutRef<"hr">) {
	return (
		<hr
			{...props}
			className={clsx(
				className,
				"my-4 border-t border-zinc-950/5 lg:-mx-4 dark:border-white/5",
			)}
		/>
	);
}

export function SidebarSpacer({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			aria-hidden="true"
			{...props}
			className={clsx(className, "mt-8 flex-1")}
		/>
	);
}

export function SidebarHeading({
	className,
	...props
}: React.ComponentPropsWithoutRef<"h3">) {
	return (
		<h3
			{...props}
			className={clsx(
				className,
				"mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400",
			)}
		/>
	);
}

type BaseSidebarItemProps = {
	current?: boolean;
	className?: string;
	children: React.ReactNode;
};

type SidebarLinkItemProps = BaseSidebarItemProps &
	LinkProps & {
		href: string; // Make href required for Link variant
		ref?: React.Ref<HTMLAnchorElement>;
	};

type SidebarButtonItemProps = BaseSidebarItemProps &
	Omit<AriaButtonProps, "className"> & {
		href?: never; // Ensure href is never present for Button variant
		ref?: React.Ref<HTMLButtonElement>;
	};

// Combine them into a discriminated union
type SidebarItemProps = SidebarLinkItemProps | SidebarButtonItemProps;

const sidebarItemClasses = clsx(
	// Base
	"flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5",
	// Focus ring
	"focus-visible:outline-2 outline-offset-2 outline-blue-500",
	// Leading icon/icon-only
	"*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
	// Trailing icon (down chevron or similar)
	"*:last:data-[slot=icon]:ml-auto *:last:data-[slot=icon]:size-5 sm:*:last:data-[slot=icon]:size-4",
	// Avatar
	"*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 sm:*:data-[slot=avatar]:size-6",
	// Hover
	"hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950",
	// Active
	"pressed:bg-zinc-950/5 pressed:*:data-[slot=icon]:fill-zinc-950",
	// Current
	"data-current:*:data-[slot=icon]:fill-zinc-950",
	// Dark mode
	"dark:text-white dark:*:data-[slot=icon]:fill-zinc-400",
	"dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white",
	"dark:pressed:bg-white/5 dark:pressed:*:data-[slot=icon]:fill-white",
	"dark:data-current:*:data-[slot=icon]:fill-white",
);

export const SidebarItem = ({
	current,
	className,
	children,
	ref,
	...props
}: SidebarItemProps) => {
	const state = useContext(OverlayTriggerStateContext);

	return (
		<span className={clsx(className, "relative")}>
			{current && (
				<motion.span
					layoutId="current-indicator"
					className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
				/>
			)}
			{"href" in props ? (
				<Link
					{...(props as SidebarLinkItemProps)}
					className={sidebarItemClasses}
					onClick={() => state?.close()}
					data-current={current ? "true" : undefined}
					ref={ref as React.RefObject<HTMLAnchorElement>}
				>
					{children}
				</Link>
			) : (
				<AriaButton
					{...(props as SidebarButtonItemProps)}
					className={clsx("cursor-default", sidebarItemClasses)}
					data-current={current ? "true" : undefined}
					ref={ref as React.RefObject<HTMLButtonElement>}
				>
					{children}
				</AriaButton>
			)}
		</span>
	);
};

export function SidebarLabel({
	className,
	...props
}: React.ComponentPropsWithoutRef<"span">) {
	return <span {...props} className={clsx(className, "truncate")} />;
}
