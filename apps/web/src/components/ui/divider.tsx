import clsx from "clsx";

export function Divider({
	soft = false,
	className,
	children,
	...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<"hr">) {
	return (
		<div className="relative">
			<div aria-hidden="true" className="absolute inset-0 flex items-center">
				<hr
					{...props}
					className={clsx(
						className,
						"w-full border-t",
						soft
							? "border-zinc-950/5 dark:border-white/5"
							: "border-zinc-950/10 dark:border-white/10",
					)}
				/>
			</div>
			{children ? (
				<div className="relative flex justify-center">
					<span className="bg-white px-3 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
						{children}
					</span>
				</div>
			) : null}
		</div>
	);
}
