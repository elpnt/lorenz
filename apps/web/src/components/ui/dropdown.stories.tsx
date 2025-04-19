import type { Meta, StoryObj } from "@storybook/react";

import {
	ChevronDownIcon,
	EyeIcon,
	PencilSquareIcon,
	TrashIcon,
} from "@heroicons/react/20/solid";
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
					<DropdownItem danger>Delete</DropdownItem>
				</DropdownMenu>
			</>
		),
	},
};

export const WithIcon: Story = {
	args: {
		children: (
			<>
				<Button intent="outline">
					Open
					<ChevronDownIcon />
				</Button>
				<DropdownMenu>
					<DropdownItem>
						<EyeIcon />
						View
					</DropdownItem>
					<DropdownItem>
						<PencilSquareIcon />
						Edit
					</DropdownItem>
					<DropdownItem danger>
						<TrashIcon /> Delete
					</DropdownItem>
				</DropdownMenu>
			</>
		),
	},
};
