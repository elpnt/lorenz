import { type LinkComponent, createLink } from "@tanstack/react-router";
import * as React from "react";
import {
	mergeProps,
	useFocusRing,
	useHover,
	useLink,
	useObjectRef,
} from "react-aria";
import type { AriaLinkOptions } from "react-aria";

interface RACLinkProps extends Omit<AriaLinkOptions, "href"> {
	children?: React.ReactNode;
	className?: string;
}

const RACLinkComponent = React.forwardRef<HTMLAnchorElement, RACLinkProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);

		const { isPressed, linkProps } = useLink(props, ref);
		const { isHovered, hoverProps } = useHover(props);
		const { isFocusVisible, isFocused, focusProps } = useFocusRing(props);

		return (
			<a
				{...mergeProps(linkProps, hoverProps, focusProps, props)}
				ref={ref}
				data-hovered={isHovered || undefined}
				data-pressed={isPressed || undefined}
				data-focus-visible={isFocusVisible || undefined}
				data-focused={isFocused || undefined}
			/>
		);
	},
);

const CreatedLinkComponent = createLink(RACLinkComponent);

export const Link: LinkComponent<typeof RACLinkComponent> = (props) => {
	return <CreatedLinkComponent preload={"intent"} {...props} />;
};

export type LinkProps = React.ComponentProps<typeof Link>;
