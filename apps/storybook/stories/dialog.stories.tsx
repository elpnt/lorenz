import type { Meta, StoryObj } from "@storybook/react";

import Button from "@lorenz/ui/button";
import {
	Dialog,
	DialogBody,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@lorenz/ui/dialog";

const meta = {
	title: "UI/Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		return (
			<DialogTrigger>
				<Button>Open</Button>
				<Dialog>
					<DialogTitle>Refund payment</DialogTitle>
					<DialogDescription>
						The refund will be reflected in the customer’s bank account 2 to 3
						business days after processing.
					</DialogDescription>
					<DialogBody>Hello world</DialogBody>
				</Dialog>
			</DialogTrigger>
		);
	},
};
