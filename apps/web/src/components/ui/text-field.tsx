import clsx from "clsx";
import {
	Input as AriaInput,
	TextField as AriaTextField,
	type TextFieldProps as AriaTextFieldProps,
	FieldError,
	type ValidationResult,
} from "react-aria-components";

import { Description, ErrorMessage, Label } from "./fieldset";

interface TextFieldProps extends AriaTextFieldProps {
	ref?: React.Ref<HTMLInputElement>;
	label?: string;
	placeholder?: string;
	description?: string;
	errorMessage?: string | ((validation: ValidationResult) => string);
}

export function TextField({
	className,
	ref,
	label,
	placeholder,
	description,
	errorMessage,
	...props
}: TextFieldProps) {
	return (
		<AriaTextField
			{...props}
			className={clsx([
				"[&>[data-slot=label]+[data-slot=control]]:mt-3",
				"[&>[data-slot=label]+[data-slot=description]]:mt-1",
				"[&>[data-slot=description]+[data-slot=control]]:mt-3",
				"[&>[data-slot=control]+[data-slot=description]]:mt-3",
				"[&>[data-slot=control]+[data-slot=error]]:mt-3",
				"*:data-[slot=label]:font-medium",
			])}
		>
			<Label className="text-base/6 text-zinc-950 select-none data-disabled:opacity-50 sm:text-sm/6 dark:text-white">
				{label}
			</Label>
			{description ? <Description>{description}</Description> : null}
			<span
				data-slot="control"
				className={clsx([
					className,
					// Basic layout
					"relative block w-full",
					// Background color + shadow applied to inset pseudo element, so shadow blends with border in light mode
					"before:absolute before:inset-px before:rounded-[calc(var(--radius-lg)-1px)] before:bg-white before:shadow-sm",
					// Background color is moved to control and shadow is removed in dark mode so hide `before` pseudo
					"dark:before:hidden",
					// Focus ring
					"after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-transparent after:ring-inset sm:focus-within:after:ring-2 sm:focus-within:after:ring-blue-500",
					// Disabled state
					"has-data-disabled:opacity-50 has-data-disabled:before:bg-zinc-950/5 has-data-disabled:before:shadow-none",
					// Invalid state
					"has-data-invalid:before:shadow-red-500/10",
				])}
			>
				<AriaInput
					ref={ref}
					placeholder={placeholder}
					className={clsx([
						// Basic layout
						"relative block w-full appearance-none rounded-lg px-[calc(--spacing(3.5)-1px)] py-[calc(--spacing(2.5)-1px)] sm:px-[calc(--spacing(3)-1px)] sm:py-[calc(--spacing(1.5)-1px)]",
						// Typography
						"text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white",
						// Border
						"border border-zinc-950/10 hover:border-zinc-950/20 dark:border-white/10 dark:hover:border-white/20",
						// Background color
						"bg-transparent dark:bg-white/5",
						// Hide default focus styles
						"focus:outline-hidden",
						// Invalid state
						"data-invalid:border-red-500 data-invalid:hover:border-red-500 dark:data-invalid:border-red-500 dark:data-invalid:hover:border-red-500",
						// Disabled state
						"data-disabled:border-zinc-950/20 dark:data-disabled:border-white/15 dark:data-disabled:bg-white/[2.5%] dark:hover:data-disabled:border-white/15",
						// System icons
						"dark:[color-scheme:dark]",
					])}
				/>
			</span>
			{errorMessage ? (
				<ErrorMessage>
					<FieldError>{errorMessage}</FieldError>
				</ErrorMessage>
			) : null}
		</AriaTextField>
	);
}
