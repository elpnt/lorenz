import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "@lorenz/ui/button";

const meta = {
	title: "UI/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { onPress: fn() },
	argTypes: {
		intent: {
			options: ["primary", "outline", "plain", "danger"],
			control: { type: "select" },
		},
		size: {
			options: ["md", "icon"],
			control: { type: "select" },
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Primary",
	},
};

export const Outline: Story = {
	args: {
		children: "Outline",
		intent: "outline",
	},
};

export const Plain: Story = {
	args: {
		children: "Plain",
		intent: "plain",
	},
};

export const Danger: Story = {
	args: {
		children: "Danger",
		intent: "danger",
	},
};

export const OnlyIcon: Story = {
	args: {
		children: <SearchIcon />,
		size: "icon",
	},
};

function SearchIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			data-slot="icon"
		>
			<title>Search Icon</title>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}
