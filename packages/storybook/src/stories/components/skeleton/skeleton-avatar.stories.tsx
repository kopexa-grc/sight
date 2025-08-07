import { SkeletonAvatar, type SkeletonAvatarProps } from "@kopexa/sight";
import { skeletonAvatar } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/SkeletonAvatar",
	component: SkeletonAvatar,
	argTypes: {
		size: {
			control: {
				type: "select",
			},
			options: ["2xs", "xs", "sm", "md", "lg"],
		},
	},
} as Meta<typeof SkeletonAvatar>;

const defaultProps = {
	...skeletonAvatar.defaultVariants,
};

const Template = (args: SkeletonAvatarProps) => <SkeletonAvatar {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
