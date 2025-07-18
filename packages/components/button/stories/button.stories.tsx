import type { Meta } from "@storybook/react";
import { Button } from "../src";

export default {
	title: "Components/Button",
	component: Button,
} as Meta<typeof Button>;

const defaultProps = {
	children: "Button",
};

export const Default = {
	args: {
		...defaultProps,
	},
};
