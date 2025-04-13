import type { Meta, StoryObj } from "@storybook/react";
import { Code, Strong, Text, TextLink } from "./text";

export default {
	title: "Text",
	component: Text,
	argTypes: {
		children: { control: "text" },
	},
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	decorators: [
		(Story) => (
			<div style={{ maxWidth: 448 }}>
				<Story />
			</div>
		),
	],
} satisfies Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		children:
			"Deleting your account is permanent, and your data will not be able to be recovered.",
	},
};

export const WithLink: Story = {
	render: () => (
		<Text>
			Deleting your account is permanent, and your data will not be able to be
			recovered. If you still want to use this account in the future, learn
			about <TextLink href="/">pausing your subscription</TextLink> instead.
		</Text>
	),
};

export const WithStrong: Story = {
	render: () => (
		<Text>
			Deleting your account is permanent, and{" "}
			<Strong>your account data cannot be recovered</Strong>.
		</Text>
	),
};

export const WithCode: Story = {
	render: () => (
		<Text>
			Your new API token is <Code>BaVrRKpRMS_ndKU</Code>. Store this token
			somewhere safe as it will only be displayed once.
		</Text>
	),
};
