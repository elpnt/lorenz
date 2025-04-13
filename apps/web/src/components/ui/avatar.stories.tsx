import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarButton } from "./avatar";

const meta = {
	title: "Avatar",
	component: Avatar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const avatarUrl =
	"https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

export const Circle: Story = {
	args: {
		className: "size-10",
		src: avatarUrl,
	},
};

export const Square: Story = {
	args: {
		className: "size-10",
		src: avatarUrl,
		square: true,
	},
};

export const WithInitials: Story = {
	args: {
		className: "size-10 bg-zinc-900 text-white dark:bg-white dark:text-black",
		initials: "mk",
	},
};

export const AsButton: Story = {
	render: () => (
		<AvatarButton
			className="size-10"
			src={avatarUrl}
			onPress={() => alert("clicked!")}
		/>
	),
};
