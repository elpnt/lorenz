import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, CheckboxField } from "./checkbox";
import { Description } from "./fieldset";

const meta: Meta<typeof Checkbox> = {
	title: "Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		children: "Allow embedding",
	},
};

export const Checked: Story = {
	args: {
		children: "Allow embedding",
		defaultSelected: true,
	},
};

export const Indeterminate: Story = {
	args: {
		children: "Allow embedding",
		isIndeterminate: true,
	},
};

export const WithDescription: Story = {
	render: () => (
		<CheckboxField>
			<Checkbox>Allow embedding</Checkbox>
			<Description>
				Allow others to embed your event details on their own site.
			</Description>
		</CheckboxField>
	),
};

export const Disabled: Story = {
	args: {
		children: "Allow embedding",
		isDisabled: true,
	},
};
