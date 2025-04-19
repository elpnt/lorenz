import type { Meta, StoryObj } from "@storybook/react";

import { Heading, Subheading } from "./heading";

export default {
	title: "Heading",
	component: Heading,
	argTypes: {
		level: {
			control: { type: "select" },
			options: [1, 2, 3, 4, 5, 6],
		},
	},
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
	args: {
		children: "Recent orders",
	},
};

export const SubheadingStory: Story = {
	name: "Subheading",
	render: () => <Subheading>Recent orders</Subheading>,
};
