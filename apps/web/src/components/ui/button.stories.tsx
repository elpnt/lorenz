import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/16/solid";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Button } from "./button";

const meta = {
	title: "Button",
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
		isPending: {
			control: { type: "boolean" },
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Save draft",
	},
};

export const Outline: Story = {
	args: {
		children: "Save draft",
		intent: "outline",
	},
};

export const Plain: Story = {
	args: {
		children: "Save draft",
		intent: "plain",
	},
};

export const Danger: Story = {
	args: {
		children: "Delete draft",
		intent: "danger",
	},
};

export const Disabled: Story = {
	args: {
		children: "Save draft",
		isDisabled: true,
	},
};

export const Pending: Story = {
	args: {
		children: (
			<>
				<PlusIcon className="h-4" />
				Add item
			</>
		),
		isPending: true,
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
