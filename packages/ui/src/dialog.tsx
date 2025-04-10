import clsx from "clsx";
import {
	Dialog as AriaDialog,
	type DialogProps as AriaDialogProps,
	DialogTrigger as AriaDialogTrigger,
	Heading as AriaHeading,
	type HeadingProps as AriaHeadingProps,
	Modal as AriaModal,
	ModalOverlay as AriaModalOverlay,
} from "react-aria-components";
import { Text } from "./text";

const DialogTrigger = AriaDialogTrigger;

const sizes = {
	xs: "sm:max-w-xs",
	sm: "sm:max-w-sm",
	md: "sm:max-w-md",
	lg: "sm:max-w-lg",
	xl: "sm:max-w-xl",
	"2xl": "sm:max-w-2xl",
	"3xl": "sm:max-w-3xl",
	"4xl": "sm:max-w-4xl",
	"5xl": "sm:max-w-5xl",
};

interface DialogProps extends AriaDialogProps {
	size?: keyof typeof sizes;
}

const Dialog = ({
	children,
	className,
	size = "lg",
	...props
}: DialogProps) => {
	return (
		<AriaModalOverlay
			isDismissable
			className={({ isEntering, isExiting }) =>
				clsx(
					"fixed inset-0 bg-black/10 data-closed:opacity-0",
					"grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4 will-change-transform",
					isEntering && "animate-in duration-100 ease-out fade-in",
					isExiting && "animate-out duration-100 ease-in fade-out",
				)
			}
		>
			<AriaModal
				className={({ isEntering, isExiting }) =>
					clsx(
						className,
						sizes[size],
						"flex h-full flex-col  bg-white ring-1 shadow-xs ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10",
						"row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-(--gutter) ring-1 shadow-lg ring-zinc-950/10 [--gutter:--spacing(8)] sm:mb-auto sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline",
						isEntering &&
							"animate-in duration-100 ease-out fade-in slide-in-from-bottom-12 sm:slide-in-from-top-0 sm:zoom-in-95",
						isExiting &&
							"animate-out duration-100 ease-in translate-y-12 fade-out sm:translate-y-0 sm:zoom-out-95",
					)
				}
			>
				<AriaDialog className="outline-hidden relative" {...props}>
					{children}
				</AriaDialog>
			</AriaModal>
		</AriaModalOverlay>
	);
};

const DialogTitle = ({ className, ...props }: AriaHeadingProps) => (
	<AriaHeading
		slot="title"
		className={clsx(
			className,
			"text-lg/6 font-semibold text-balance text-zinc-950 sm:text-base/6 dark:text-white",
		)}
		{...props}
	/>
);

const DialogDescription = ({
	className,
	...props
}: React.ComponentPropsWithRef<typeof Text>) => (
	<Text className={clsx(className, "mt-2 text-pretty")} {...props} />
);

const DialogBody = ({
	className,
	...props
}: React.ComponentPropsWithRef<"div">) => (
	<div className={clsx(className, "mt-6")} {...props} />
);

const DialogActions = ({
	className,
	...props
}: React.ComponentPropsWithRef<"div">) => {
	return (
		<div
			{...props}
			className={clsx(
				className,
				"mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto",
			)}
		/>
	);
};

export {
	Dialog,
	DialogBody,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
	DialogActions,
};
