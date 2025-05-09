import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import {
	Dialog,
	DialogActions,
	DialogClose,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

const meta = {
	title: "Dialog",
	component: Dialog,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DialogStory: Story = {
	name: "Dialog",
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
					<DialogActions>
						<DialogClose>Cancel</DialogClose>
						<Button intent="primary" slot="close">
							Refund
						</Button>
					</DialogActions>
				</Dialog>
			</DialogTrigger>
		);
	},
};

export const AlertDialog: Story = {
	render: () => {
		return (
			<DialogTrigger>
				<Button>Open</Button>
				<Dialog role="alertdialog">
					<DialogTitle>Delete Account</DialogTitle>
					<DialogDescription>
						This action is irreversible. Are you sure you want to delete your
						account?
					</DialogDescription>
					<DialogActions>
						<DialogClose>Cancel</DialogClose>
						<Button intent="danger" slot="close">
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</DialogTrigger>
		);
	},
};
