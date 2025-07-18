import type { Meta } from "@storybook/react";
import { Button } from "../src";

export default {
	title: "Components/Button",
	component: Button,
	argTypes: {
		disabled: {
			control: {
				type: "boolean",
			},
		},
	},
} as Meta<typeof Button>;

const defaultProps = {
	children: "Button",
};

export const Default = {
	args: {
		...defaultProps,
	},
};

export const IsDisabled = {
	args: {
		...defaultProps,
		disabled: true,
	},
};
