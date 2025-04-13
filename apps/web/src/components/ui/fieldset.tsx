import clsx from "clsx";
import { Label as AriaLabel } from "react-aria-components";

export function Fieldset({
	className,
	...props
}: React.HTMLAttributes<HTMLFieldSetElement>) {
	return (
		<fieldset
			data-slot="control"
			{...props}
			className={clsx(
				className,
				"*:data-[slot=text]:mt-1 [&>*+[data-slot=control]]:mt-6",
			)}
		/>
	);
}

export function Legend({
	className,
	...props
}: React.HTMLAttributes<HTMLLegendElement>) {
	return (
		<legend
			data-slot="legend"
			{...props}
			className={clsx(
				className,
				"text-base/6 font-semibold text-zinc-950 data-disabled:opacity-50 sm:text-sm/6 dark:text-white",
			)}
		/>
	);
}

export function Label({
	className,
	...props
}: React.HTMLAttributes<HTMLLabelElement>) {
	return (
		<AriaLabel
			data-slot="label"
			className={clsx("text-sm font-medium text-gray-700", className)}
			{...props}
		/>
	);
}

export function FieldGroup({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	return (
		<div
			data-slot="control"
			{...props}
			className={clsx(className, "space-y-8")}
		/>
	);
}

export function Description({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			data-slot="description"
			{...props}
			className={clsx(
				className,
				"text-base/6 text-zinc-500 data-disabled:opacity-50 sm:text-sm/6 dark:text-zinc-400",
			)}
		/>
	);
}

export function ErrorMessage({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			data-slot="error"
			{...props}
			className={clsx(
				className,
				"text-base/6 text-red-600 data-disabled:opacity-50 sm:text-sm/6 dark:text-red-500",
			)}
		/>
	);
}
