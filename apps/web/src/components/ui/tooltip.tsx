import clsx from "clsx";
import {
	Tooltip as AriaTooltip,
	type TooltipProps as AriaTooltipProps,
	TooltipTrigger as AriaTooltipTrigger,
	type TooltipTriggerComponentProps as AriaTooltipTriggerProps,
} from "react-aria-components";

function TooltipTrigger({
	delay = 300,
	closeDelay = 0,
	...props
}: AriaTooltipTriggerProps) {
	return (
		<AriaTooltipTrigger delay={delay} closeDelay={closeDelay} {...props} />
	);
}

type TooltipProps = Omit<AriaTooltipProps, "className">;

function Tooltip({ offset = 4, ...props }: TooltipProps) {
	return (
		<AriaTooltip
			offset={offset}
			className={({ isEntering, isExiting, placement }) =>
				clsx([
					"inline-flex items-center rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white dark:ring-1 dark:ring-white/10 dark:ring-inset",
					isEntering && "animate-in fade-in",
					isExiting && "animate-out fade-out",
					placement === "top" && "slide-in-from-bottom-1 slide-out-to-bottom-1",
					placement === "bottom" && "slide-in-from-top-1 slide-out-to-top-1",
					placement === "left" && "slide-in-from-right-1 slide-out-to-right-1",
					placement === "right" && "slide-in-from-left-1 slide-out-to-left-1",
				])
			}
			{...props}
		/>
	);
}

export { TooltipTrigger, Tooltip };
