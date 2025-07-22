import { Avatar, type AvatarProps } from "@kopexa/sight";
import { avatar } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Avatar",
	component: Avatar,
	argTypes: {
		color: {
			control: {
				type: "select",
			},
			options: [
				"default",
				"primary",
				"secondary",
				"success",
				"warning",
				"destructive",
			],
		},
		radius: {
			control: {
				type: "select",
			},
			options: ["none", "sm", "md", "lg", "full"],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
	},
} as Meta<typeof Avatar>;

const defaultProps = {
	...avatar.defaultVariants,
};

const Template = (args: AvatarProps) => <Avatar {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
		name: "SP",
	},
};

export const WithText = {
	args: {
		...defaultProps,
		name: "SP",
		color: "destructive",
	},
};

export const WithImage = {
	args: {
		...defaultProps,
		name: "SP",
		src: "https://i.pravatar.cc/300?u=a042581f4e29026705d",
	},
};

export const isBordered = {
	args: {
		...defaultProps,
		name: "SP",
		src: "https://i.pravatar.cc/300?u=a042581f4e29026709d",
		color: "secondary",
		isBordered: true,
	},
};

export const WithIcon = {
	args: {
		...defaultProps,
		size: "lg",
	},
};
