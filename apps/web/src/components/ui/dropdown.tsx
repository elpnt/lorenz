import clsx from "clsx";
import {
	Menu as AriaMenu,
	MenuItem as AriaMenuItem,
	type MenuItemProps as AriaMenuItemProps,
	MenuTrigger as AriaMenuTrigger,
	Popover as AriaPopover,
} from "react-aria-components";

function DropdownMenu({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<AriaPopover>
			<AriaMenu
				className={clsx(
					className,
					// Anchor positioning
					"[--anchor-gap:--spacing(2)] [--anchor-padding:--spacing(1)] data-[anchor~=end]:[--anchor-offset:6px] data-[anchor~=start]:[--anchor-offset:-6px] sm:data-[anchor~=end]:[--anchor-offset:4px] sm:data-[anchor~=start]:[--anchor-offset:-4px]",
					// Base styles
					"isolate w-max rounded-xl p-1",
					// Invisible border that is only visible in `forced-colors` mode for accessibility purposes
					"outline outline-transparent focus:outline-hidden",
					// Handle scrolling when menu won't fit in viewport
					"overflow-y-auto",
					// Popover background
					"bg-white/75 backdrop-blur-xl dark:bg-zinc-800/75",
					// Shadows
					"ring-1 shadow-lg ring-zinc-950/10 dark:ring-white/10 dark:ring-inset",
					// Define grid at the menu level if subgrid is supported
					"supports-[grid-template-columns:subgrid]:grid supports-[grid-template-columns:subgrid]:grid-cols-[auto_1fr_1.5rem_0.5rem_auto]",
					// Transitions
					"transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0",
				)}
			>
				{children}
			</AriaMenu>
		</AriaPopover>
	);
}

interface DropdownItemProps extends AriaMenuItemProps {
	danger?: boolean;
}

function DropdownItem({
	children,
	className,
	danger,
	...props
}: DropdownItemProps) {
	return (
		<AriaMenuItem
			className={clsx(
				className,
				// Base styles
				"group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5",
				// Text styles
				"text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
				// Focus
				danger ? "data-focused:bg-red-500" : "data-focused:bg-blue-500",
				"data-focused:text-white",
				// Disabled state
				"data-disabled:opacity-50",
				// Forced colors mode
				"forced-color-adjust-none forced-colors:data-focused:bg-[Highlight] forced-colors:data-focused:text-[HighlightText] forced-colors:data-focused:*:data-[slot=icon]:text-[HighlightText]",
				// Use subgrid when available but fallback to an explicit grid layout if not
				"col-span-full grid grid-cols-[auto_1fr_1.5rem_0.5rem_auto] items-center supports-[grid-template-columns:subgrid]:grid-cols-subgrid",
				// Icons
				"*:data-[slot=icon]:col-start-1 *:data-[slot=icon]:row-start-1 *:data-[slot=icon]:mr-2.5 *:data-[slot=icon]:-ml-0.5 *:data-[slot=icon]:size-5 sm:*:data-[slot=icon]:mr-2 sm:*:data-[slot=icon]:size-4",
				"*:data-[slot=icon]:text-zinc-500 data-focused:*:data-[slot=icon]:text-white dark:*:data-[slot=icon]:text-zinc-400 dark:data-focused:*:data-[slot=icon]:text-white",
				// Avatar
				"*:data-[slot=avatar]:mr-2.5 *:data-[slot=avatar]:-ml-1 *:data-[slot=avatar]:size-6 sm:*:data-[slot=avatar]:mr-2 sm:*:data-[slot=avatar]:size-5",
			)}
			{...props}
		>
			{children}
		</AriaMenuItem>
	);
}

export { AriaMenuTrigger as Dropdown, DropdownItem, DropdownMenu };
