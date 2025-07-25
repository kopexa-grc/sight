import { Skeleton, type SkeletonProps } from "@kopexa/sight";
import { skeleton } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Skeleton",
	component: Skeleton,
} as Meta<typeof Skeleton>;

const defaultProps = {
	...skeleton.defaultVariants,
};

const Template = (args: SkeletonProps) => <Skeleton {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
