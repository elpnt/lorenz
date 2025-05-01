import clsx from "clsx";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
	composeRenderProps,
} from "react-aria-components";
import { type VariantProps, tv } from "tailwind-variants";

const solidClasses = clsx(
	// Optical border, implemented as the button background to avoid corner artifacts
	"border-transparent bg-(--btn-border) has-[text]:bg-green-500",
	// Dark mode: border is rendered on `after` so background is set to button background
	"dark:bg-(--btn-bg)",
	// Button background, implemented as foreground layer to stack on top of pseudo-border layer
	"before:absolute before:inset-0 before:-z-10 before:rounded-[calc(var(--radius-lg)-1px)] before:bg-(--btn-bg)",
	// Drop shadow, applied to the inset `before` layer so it blends with the border
	"before:shadow-sm",
	// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
	"dark:before:hidden",
	// Dark mode: Subtle white outline is applied using a border
	"dark:border-white/5",
	// Shim/overlay, inset to match button foreground and used for hover state + highlight shadow
	"after:absolute after:inset-0 after:-z-10 after:rounded-[calc(var(--radius-lg)-1px)]",
	// Inner highlight shadow
	"after:shadow-[shadow:inset_0_1px_--theme(--color-white/15%)]",
	// White overlay on hover
	"pressed:after:bg-(--btn-hover-overlay) hover:after:bg-(--btn-hover-overlay)",
	// Dark mode: `after` layer expands to cover entire button
	"dark:after:-inset-px dark:after:rounded-lg",
	// Disabled
	"data-disabled:before:shadow-none data-disabled:after:shadow-none",
);

const buttonStyles = tv({
	base: [
		// Base
		"relative isolate inline-flex items-baseline justify-center gap-x-2 rounded-lg border text-base/6 font-semibold",
		// Focus
		"focus-visible:outline-2 outline-offset-2 outline-blue-500",
		// Disabled
		"disabled:opacity-50",
		// Icon
		"*:data-[slot=icon]:-mx-0.5 *:data-[slot=icon]:my-0.5 *:data-[slot=icon]:size-5 *:data-[slot=icon]:shrink-0 *:data-[slot=icon]:self-center sm:*:data-[slot=icon]:my-1 sm:*:data-[slot=icon]:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-hover:[--btn-icon:ButtonText]",
	],
	variants: {
		intent: {
			primary: [
				solidClasses,
				"text-white [--btn-bg:var(--color-zinc-900)] [--btn-border:var(--color-zinc-950)]/90 [--btn-hover-overlay:var(--color-white)]/10",
				"dark:text-white dark:[--btn-bg:var(--color-zinc-600)] dark:[--btn-hover-overlay:var(--color-white)]/5",
				"[--btn-icon:var(--color-zinc-400)] pressed:[--btn-icon:var(--color-zinc-300)] hover:[--btn-icon:var(--color-zinc-300)]",
			],
			outline: [
				// Base
				"border-zinc-950/10 text-zinc-950 pressed:bg-zinc-950/[2.5%] hover:bg-zinc-950/[2.5%]",
				// Dark mode
				"dark:border-white/15 dark:text-white dark:[--btn-bg:transparent] dark:pressed:bg-white/5 dark:hover:bg-white/5",
				// Icon
				"[--btn-icon:var(--color-zinc-500)] pressed:[--btn-icon:var(--color-zinc-700)] hover:[--btn-icon:var(--color-zinc-700)] dark:pressed:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]",
			],
			plain: [
				// Base
				"border-transparent text-zinc-950 pressed:bg-zinc-950/5 hover:bg-zinc-950/5",
				// Dark mode
				"dark:text-white dark:pressed:bg-white/10 dark:hover:bg-white/10",
				// Icon
				"[--btn-icon:var(--color-zinc-500)] pressed:[--btn-icon:var(--color-zinc-700)] hover:[--btn-icon:var(--color-zinc-700)] dark:[--btn-icon:var(--color-zinc-500)] dark:pressed:[--btn-icon:var(--color-zinc-400)] dark:hover:[--btn-icon:var(--color-zinc-400)]",
			],
			danger: [
				solidClasses,
				"text-white [--btn-hover-overlay:var(--color-white)]/10 [--btn-bg:var(--color-red-600)] [--btn-border:var(--color-red-700)]/90",
				"[--btn-icon:var(--color-red-300)] pressed:[--btn-icon:var(--color-red-200)] hover:[--btn-icon:var(--color-red-200)]",
			],
		},
		size: {
			md: [
				// Spacing
				"px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)] sm:text-sm/6",
				// Icon color
				"*:data-[slot=icon]:text-(--btn-icon)",
			],
			icon: ["size-11 sm:size-8"],
		},
	},
	defaultVariants: {
		intent: "primary",
		size: "md",
	},
});

export interface ButtonProps
	extends AriaButtonProps,
		VariantProps<typeof buttonStyles> {
	ref?: React.Ref<HTMLButtonElement>;
}

export function Button({
	className,
	intent,
	size,
	children,
	ref,
	...props
}: ButtonProps) {
	return (
		<AriaButton
			ref={ref}
			{...props}
			className={composeRenderProps(className, (className, renderProps) =>
				buttonStyles({ ...renderProps, intent, size, className }),
			)}
		>
			{children}
		</AriaButton>
	);
}
