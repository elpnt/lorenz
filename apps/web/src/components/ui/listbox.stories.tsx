import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Listbox, ListboxOption } from "./listbox";

const meta = {
	title: "Listbox",
	component: Listbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} as Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
	render: () => (
		<Listbox defaultSelectedKey="hello">
			<ListboxOption id="hello">Hello</ListboxOption>
			<ListboxOption id="world">World</ListboxOption>
		</Listbox>
	),
	// args: {
	// 	defaultSelectedKey: "hello",
	// 	children: (
	// 		<>
	// 			<ListboxOption id="hello">Hello</ListboxOption>
	// 			<ListboxOption id="world">World</ListboxOption>
	// 		</>
	// 	),
	// },
};
