import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Button from "./button";

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

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<PlusIcon />
				Add item
			</>
		),
	},
};

export const OnlyIcon: Story = {
	args: {
		children: <MagnifyingGlassIcon />,
		size: "icon",
	},
};
