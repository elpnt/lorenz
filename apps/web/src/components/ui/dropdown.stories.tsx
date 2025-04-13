import type { Meta, StoryObj } from "@storybook/react";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Button } from "./button";
import { Dropdown, DropdownItem, DropdownMenu } from "./dropdown";

const meta = {
	title: "Dropdown",
	component: Dropdown,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<Button intent="outline">
					Open
					<ChevronDownIcon />
				</Button>
				<DropdownMenu>
					<DropdownItem>View</DropdownItem>
					<DropdownItem>Edit</DropdownItem>
					<DropdownItem>Delete</DropdownItem>
				</DropdownMenu>
			</>
		),
	},
};
