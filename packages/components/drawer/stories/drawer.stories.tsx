import { drawer } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

import { Drawer, type DrawerProps } from "../src";

export default {
	title: "Components/Drawer",
	component: Drawer,
} as Meta<typeof Drawer>;

const defaultProps = {
	...drawer.defaultVariants,
};

const Template = (args: DrawerProps) => <Drawer {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
