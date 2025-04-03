import { LayoutGroup, motion } from "motion/react";
import type React from "react";
import { useId } from "react";
import { Button, type ButtonProps } from "react-aria-components";
import { cnBase } from "tailwind-variants";

import { TouchTarget } from "./button";

export function Navbar({
	className,
	...props
}: React.ComponentPropsWithoutRef<"nav">) {
	return (
		<nav
			{...props}
			className={cnBase(className, "flex flex-1 items-center gap-4 py-2.5")}
		/>
	);
}

export function NavbarDivider({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			aria-hidden="true"
			{...props}
			className={cnBase(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
		/>
	);
}

export function NavbarSection({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const id = useId();

	return (
		<LayoutGroup id={id}>
			<div
				{...props}
				className={cnBase(className, "flex items-center gap-3")}
			/>
		</LayoutGroup>
	);
}

export function NavbarSpacer({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			aria-hidden="true"
			{...props}
			className={cnBase(className, "-ml-4 flex-1")}
		/>
	);
}

export const NavbarItem = ({
	current,
	className,
	children,
	ref,
	...props
}: {
	ref?: React.Ref<HTMLButtonElement>;
	current?: boolean;
	className?: string;
	children: React.ReactNode;
} & Omit<ButtonProps, "className">) => {
	const classes = cnBase(
		// Base
		"relative flex min-w-0 items-center gap-3 rounded-lg p-2 text-left text-base/6 font-medium text-zinc-950 sm:text-sm/5",
		// Leading icon/icon-only
		"*:data-[slot=icon]:size-6 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:fill-zinc-500 sm:*:data-[slot=icon]:size-5",
		// Trailing icon (down chevron or similar)
		"*:not-nth-2:last:data-[slot=icon]:ml-auto *:not-nth-2:last:data-[slot=icon]:size-5 sm:*:not-nth-2:last:data-[slot=icon]:size-4",
		// Avatar
		"*:data-[slot=avatar]:-m-0.5 *:data-[slot=avatar]:size-7 *:data-[slot=avatar]:[--avatar-radius:var(--radius-md)] sm:*:data-[slot=avatar]:size-6",
		// Hover
		"hover:bg-zinc-950/5 hover:*:data-[slot=icon]:fill-zinc-950",
		// Active
		"data-active:bg-zinc-950/5 data-active:*:data-[slot=icon]:fill-zinc-950",
		// Dark mode
		"dark:text-white dark:*:data-[slot=icon]:fill-zinc-400",
		"dark:hover:bg-white/5 dark:hover:*:data-[slot=icon]:fill-white",
		"dark:data-active:bg-white/5 dark:data-active:*:data-[slot=icon]:fill-white",
	);

	return (
		<span className={cnBase(className, "relative")}>
			{current && (
				<motion.span
					layoutId="current-indicator"
					className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-zinc-950 dark:bg-white"
				/>
			)}
			<Button
				{...props}
				className={cnBase("cursor-default", classes)}
				data-current={current ? "true" : undefined}
				ref={ref}
			>
				<TouchTarget>{children}</TouchTarget>
			</Button>
		</span>
	);
};

export function NavbarLabel({
	className,
	...props
}: React.ComponentPropsWithoutRef<"span">) {
	return <span {...props} className={cnBase(className, "truncate")} />;
}
