import type { Meta, StoryObj } from "@storybook/react";
import { FieldGroup } from "./fieldset";
import { TextField } from "./text-field";

export default {
	title: "Text Field",
	component: TextField,
	parameters: {
		layout: "centered",
	},
	decorators: [
		(Story) => (
			<div className="min-w-sm mx-auto">
				<FieldGroup>
					<Story />
				</FieldGroup>
			</div>
		),
	],
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
	args: {
		label: "Full name",
	},
};

export const Email: Story = {
	args: {
		label: "Email address",
		type: "email",
	},
};

export const Password: Story = {
	args: {
		label: "Password",
		type: "password",
	},
};

export const Disabled: Story = {
	args: {
		label: "Full name",
		isDisabled: true,
	},
};

export const WithPlaceholder: Story = {
	args: {
		label: "Full name",
		placeholder: "John Doe",
	},
};

export const WithDescription: Story = {
	args: {
		label: "Product name",
		description: "Use the name you'd like people to see in their cart.",
	},
};

export const Invalid: Story = {
	args: {
		label: "Full name",
		isInvalid: true,
		placeholder: "Enter text",
		errorMessage: "This field is required",
	},
};
