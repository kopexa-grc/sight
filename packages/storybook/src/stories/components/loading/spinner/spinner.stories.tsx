import { Spinner, type SpinnerProps } from "@kopexa/sight";
import { spinner } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Loading/Spinner",
	component: Spinner,
	argTypes: {
		color: {
			control: {
				type: "select",
			},
			options: [
				"current",
				"white",
				"primary",
				"secondary",
				"success",
				"warning",
				"danger",
			],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
		variant: {
			control: {
				type: "select",
			},
			options: ["default", "simple", "gradient", "spinner", "wave", "dots"],
		},
	},
	decorators: [
		(Story) => (
			<div className="ms-4">
				<Story />
			</div>
		),
	],
} as Meta<typeof Spinner>;

const defaultProps = {
	...spinner.defaultVariants,
};

const VariantsTemplate = (args: SpinnerProps) => {
	return (
		<div className="flex flex-wrap items-end gap-8 py-4">
			<Spinner {...args} label="default" variant="default" />
			<Spinner {...args} label="wave" variant="wave" />
			<Spinner {...args} label="dots" variant="dots" />
		</div>
	);
};

const Template = (args: SpinnerProps) => <Spinner {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const Variants = {
	args: {
		...defaultProps,
	},

	render: VariantsTemplate,
};
