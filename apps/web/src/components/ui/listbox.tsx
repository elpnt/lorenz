import clsx from "clsx";
import {
	Button as AriaButton,
	ListBox as AriaListbox,
	ListBoxItem as AriaListboxItem,
	type ListBoxItemProps as AriaListboxItemProps,
	Popover as AriaPopover,
	Select as AriaSelect,
	type SelectProps as AriaSelectProps,
	SelectValue as AriaSelectValue,
} from "react-aria-components";

function ChevronUpDownIcon() {
	return (
		<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
			<svg
				className="size-5 stroke-zinc-500 group-data-disabled:stroke-zinc-600 sm:size-4 dark:stroke-zinc-400 forced-colors:stroke-[CanvasText]"
				viewBox="0 0 16 16"
				aria-hidden="true"
				fill="none"
			>
				<path
					d="M5.75 10.75L8 13L10.25 10.75"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M10.25 5.25L8 3L5.75 5.25"
					strokeWidth={1.5}
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}

interface ListboxProps<T extends object> extends AriaSelectProps<T> {
	className?: string;
	label?: string;
	description?: string;
	errorMessage?: string;
}

function Listbox<T extends object>({ className, ...props }: ListboxProps<T>) {
	return (
		<AriaSelect>
			<AriaButton
				className={clsx([
					className,
					// Basic layout
					"group relative block w-full min-w-48",
					// Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
					"before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm",
					// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
					"dark:before:hidden",
					// Hide default focus styles
					"focus:outline-hidden",
					// Focus ring
					"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset focus:after:ring-2 focus:after:ring-blue-500",
					// Disabled state
					"data-disabled:opacity-50 data-disabled:before:bg-zinc-950/5 data-disabled:before:shadow-none",
				])}
			>
				<span
					className={clsx([
						// Basic layout
						"relative block w-full appearance-none rounded-lg py-[calc(--spacing(2.5)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
						// Set minimum height for when no value is selected
						"min-h-11 sm:min-h-9",
						// Horizontal padding
						"pr-[calc(--spacing(7)-1px)] pl-[calc(--spacing(3.5)-1px)] sm:pl-[calc(--spacing(3)-1px)]",
						// Typography
						"text-left text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
						// Border
						"border border-zinc-950/10 group-data-active:border-zinc-950/20 group-hover:border-zinc-950/20 dark:border-white/10 dark:group-data-active:border-white/20 dark:group-hover:border-white/20",
						// Background color
						"bg-transparent dark:bg-white/5",
						// Invalid state
						"group-data-invalid:border-red-500 group-hover:group-data-invalid:border-red-500 dark:group-data-invalid:border-red-600 dark:hover:group-data-invalid:border-red-600",
						// Disabled state
						"group-data-disabled:border-zinc-950/20 group-data-disabled:opacity-100 dark:group-data-disabled:border-white/15 dark:group-data-disabled:bg-white/[2.5%] dark:group-data-disabled:hover:border-white/15",
					])}
				>
					<AriaSelectValue />
					<ChevronUpDownIcon />
				</span>
			</AriaButton>
			<AriaPopover
				className={({ isEntering, isExiting, placement }) =>
					clsx([
						isEntering && "animate-in fade-in",
						isExiting && "animate-out fade-out",
						placement === "bottom" && "slide-in-from-top-1 slide-out-to-top-1",
						placement === "top" &&
							"slide-in-from-bottom-1 slide-out-to-bottom-1",
						placement === "right" && "slide-in-from-left-1 slide-out-to-left-1",
						placement === "left" &&
							"slide-in-from-right-1 slide-out-to-right-1",
					])
				}
			>
				<AriaListbox
					className={clsx(
						"min-w-(--trigger-width)",
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
					{props.children}
				</AriaListbox>
			</AriaPopover>
		</AriaSelect>
	);
}

function ListboxOption({
	className,
	children,
	...props
}: AriaListboxItemProps) {
	return (
		<AriaListboxItem
			{...props}
			className={clsx(
				className,
				// Base styles
				"group cursor-default rounded-lg px-3.5 py-2.5 focus:outline-hidden sm:px-3 sm:py-1.5",
				// Text styles
				"text-left text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white forced-colors:text-[CanvasText]",
				// Focus
				// danger ? "data-focused:bg-red-500" : "data-focused:bg-blue-500",
				"data-focused:bg-blue-500 data-focused:text-white",
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
		>
			{children}
		</AriaListboxItem>
	);
}

export { Listbox, ListboxOption };
