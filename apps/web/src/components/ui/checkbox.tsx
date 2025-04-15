import clsx from "clsx";
import {
	Checkbox as AriaCheckbox,
	type CheckboxProps as AriaCheckboxProps,
	composeRenderProps,
} from "react-aria-components";

export function CheckboxField({ children }: { children: React.ReactNode }) {
	return (
		<div
			data-slot="field"
			className={clsx(
				// Base layout
				"grid grid-cols-[1.125rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[1rem_1fr]",
				// Control layout
				"*:data-[slot=control]:col-start-1 *:data-[slot=control]:row-start-1 *:data-[slot=control]:mt-0.75 sm:*:data-[slot=control]:mt-1",
				// Label layout
				"*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1",
				// Description layout
				"*:data-[slot=description]:col-start-2 *:data-[slot=description]:row-start-2",
				// With description
				"has-data-[slot=description]:**:data-[slot=label]:font-medium",
			)}
		>
			{children}
		</div>
	);
}

export function Checkbox({ children, ...props }: AriaCheckboxProps) {
	return (
		<AriaCheckbox
			data-slot="label"
			className={clsx(
				// Base
				"flex gap-2 items-center group",
				// Label
				"text-base/6 text-zinc-950 select-none disabled:text-zinc-950/50 sm:text-sm/6 dark:text-white dark:disabled:text-white/50",
			)}
			{...props}
		>
			{composeRenderProps(children, (children, renderProps) => (
				<>
					<div
						data-slot="control"
						className={clsx([
							// Basic layout
							"relative group isolate flex size-[1.125rem] items-center justify-center rounded-[0.3125rem] sm:size-4",
							// Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
							"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(0.3125rem-1px)] before:bg-white before:shadow-sm",
							// Background color when checked
							"group-selected:before:bg-(--checkbox-checked-bg) group-indeterminate:before:bg-(--checkbox-checked-bg)",
							// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
							"dark:before:hidden",
							// Background color applied to control in dark mode
							"dark:bg-white/5 dark:group-selected:bg-(--checkbox-checked-bg) dark:group-indeterminate:bg-(--checkbox-checked-bg)",
							// Border
							"border border-zinc-950/15 group-selected:border-transparent group-indeterminate:border-transparent hover:group-selected:border-transparent hover:group-indeterminate:border-transparent hover:border-zinc-950/30 group-selected:bg-(--checkbox-checked-border) group-indeterminate:bg-(--checkbox-checked-border)",
							"dark:border-white/15 dark:group-selected:border-white/5 dark:group-indeterminate:border-white/5 dark:hover:group-selected:border-white/5 dark:hover:group-indeterminate:border-white/5 dark:hover:border-white/30",
							// Inner highlight shadow
							"after:absolute after:inset-0 after:rounded-[calc(0.3125rem-1px)] after:shadow-[inset_0_1px_--theme(--color-white/15%)]",
							"dark:after:-inset-px dark:after:hidden dark:after:rounded-[0.3125rem] dark:group-selected:after:block dark:group-indeterminate:after:block",
							// Focus ring
							"group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-blue-500",
							// Disabled state
							"group-disabled:opacity-50",
							"group-disabled:border-zinc-950/25 group-disabled:bg-zinc-950/5 group-disabled:[--checkbox-check:var(--color-zinc-950)]/50 group-disabled:before:bg-transparent",
							"dark:group-disabled:border-white/20 dark:group-disabled:bg-white/[2.5%] dark:group-disabled:[--checkbox-check:var(--color-white)]/50 dark:group-selected:group-disabled:after:hidden dark:group-indeterminate:group-disabled:after:hidden",
							// Forced colors mode
							"forced-colors:[--checkbox-check:HighlightText] forced-colors:[--checkbox-checked-bg:Highlight] forced-colors:group-disabled:[--checkbox-check:Highlight]",
							"dark:forced-colors:[--checkbox-check:HighlightText] dark:forced-colors:[--checkbox-checked-bg:Highlight] dark:forced-colors:group-disabled:[--checkbox-check:Highlight]",
							// dark/zinc
							"[--checkbox-check:var(--color-white)] [--checkbox-checked-bg:var(--color-zinc-900)] [--checkbox-checked-border:var(--color-zinc-950)]/90",
							"dark:[--checkbox-checked-bg:var(--color-zinc-600)]",
						])}
					>
						<svg
							aria-hidden
							className={clsx(
								"size-4 stroke-(--checkbox-check) opacity-0 group-selected:opacity-100 group-indeterminate:opacity-100 sm:h-3.5 sm:w-3.5",
							)}
							viewBox="0 0 14 14"
							fill="none"
						>
							{renderProps.isIndeterminate ? (
								// Minus icon
								<path
									d="M3 7H11"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							) : renderProps.isSelected ? (
								// Check icon
								<path
									d="M3 8L6 11L11 3.5"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							) : null}
						</svg>
					</div>
					{children}
				</>
			))}
		</AriaCheckbox>
	);
}
