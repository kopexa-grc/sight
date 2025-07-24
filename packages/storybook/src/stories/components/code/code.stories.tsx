import { Code, type CodeProps } from "@kopexa/sight";
import { code } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Code",
	component: Code,
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
} as Meta<typeof Code>;

const defaultProps = {
	children: "npm install @kopexa/sight",
	...code.defaultVariants,
};

const Template = (args: CodeProps) => <Code {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
