import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Tooltip, TooltipTrigger } from "./tooltip";

const meta = {
	title: "Tooltip",
	component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		children: { control: { type: "text" } },
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
	render: () => (
		<TooltipTrigger>
			<Button size="icon">
				<MagnifyingGlassIcon />
			</Button>
			<Tooltip>Search</Tooltip>
		</TooltipTrigger>
	),
};

export const Bottom: Story = {
	render: () => (
		<TooltipTrigger>
			<Button size="icon">
				<MagnifyingGlassIcon />
			</Button>
			<Tooltip placement="bottom">Search</Tooltip>
		</TooltipTrigger>
	),
};

export const Left: Story = {
	render: () => (
		<TooltipTrigger>
			<Button size="icon">
				<MagnifyingGlassIcon />
			</Button>
			<Tooltip placement="left">Search</Tooltip>
		</TooltipTrigger>
	),
};

export const Right: Story = {
	render: () => (
		<TooltipTrigger>
			<Button size="icon">
				<MagnifyingGlassIcon />
			</Button>
			<Tooltip placement="right">Search</Tooltip>
		</TooltipTrigger>
	),
};
