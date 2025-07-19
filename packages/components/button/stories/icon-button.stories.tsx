import { button } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { IconButton, type IconButtonProps } from "../src";

export default {
	title: "Components/IconButton",
	component: IconButton,
	argTypes: {
		variant: {
			control: {
				type: "select",
			},
			options: ["solid", "ghost", "outline", "link"],
		},
		color: {
			control: {
				type: "select",
			},
			options: ["primary", "secondary", "destructive", "warning", "success"],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		isLoading: {
			control: {
				type: "boolean",
			},
		},
	},
} as Meta<IconButtonProps>;

const defaultProps = {
	...button.defaultVariants,
};

export const Default = {
	args: {
		...defaultProps,
	},
};
