import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
// import { SearchIcon } from "lucide-react";

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
			options: ["primary", "outline", "plain"],
			control: { type: "select" },
		},
		size: {
			options: ["md", "icon"],
			control: { type: "select" },
		},
		isDanger: {
			control: { type: "boolean" },
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
		isDanger: true,
	},
};

// export const OnlyIcon: Story = {
// 	args: {
// 		children: <SearchIcon data-slot="icon" />,
// 		size: "icon",
// 	},
// };
