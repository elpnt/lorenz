import clsx from "clsx";
import {
	Button as AriaButton,
	type ButtonProps as AriaButtonProps,
} from "react-aria-components";

type AvatarProps = {
	src?: string | null;
	square?: boolean;
	initials?: string;
	alt?: string;
	className?: string;
	ref?: React.Ref<HTMLButtonElement>;
};

export function Avatar({
	src = null,
	square = false,
	initials,
	alt = "",
	className,
	...props
}: AvatarProps & React.ComponentPropsWithoutRef<"span">) {
	return (
		<span
			data-slot="avatar"
			{...props}
			className={clsx(
				className,
				// Basic layout
				"inline-grid overflow-hidden shrink-0 align-middle [--avatar-radius:20%] *:col-start-1 *:row-start-1",
				"outline -outline-offset-1 outline-black/10 dark:outline-white/10",
				// Border radius
				square
					? "rounded-(--avatar-radius) *:rounded-(--avatar-radius)"
					: "rounded-full *:rounded-full",
			)}
		>
			{initials && (
				<svg
					className="size-full fill-current p-[5%] text-[48px] font-medium uppercase select-none"
					viewBox="0 0 100 100"
					aria-hidden={alt ? undefined : "true"}
				>
					{alt && <title>{alt}</title>}
					<text
						x="50%"
						y="50%"
						alignmentBaseline="middle"
						dominantBaseline="middle"
						textAnchor="middle"
						dy=".125em"
					>
						{initials}
					</text>
				</svg>
			)}
			{src && (
				<img className="size-full object-bottom-right" src={src} alt={alt} />
			)}
		</span>
	);
}

export const AvatarButton = ({
	src,
	square = false,
	initials,
	alt,
	className,
	ref,
	...props
}: AvatarProps & Omit<AriaButtonProps, "as" | "className">) => {
	const classes = clsx(
		className,
		square ? "rounded-[20%]" : "rounded-full",
		"relative inline-grid data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-blue-500",
	);

	return (
		<AriaButton {...props} className={classes} ref={ref}>
			<Avatar src={src} square={square} initials={initials} alt={alt} />
		</AriaButton>
	);
};
