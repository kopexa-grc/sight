import { StandardChip, type StandardChipProps } from "@kopexa/sight";
import { standardChip } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Chips/StandardChip",
	component: StandardChip,
	argTypes: {
		standard: {
			control: { type: "select" },
			options: Object.keys(standardChip.variants.standard),
			defaultValue: standardChip.defaultVariants.standard,
		},
		size: {
			control: { type: "select" },
			options: Object.keys(standardChip.variants.size),
			defaultValue: standardChip.defaultVariants.size,
		},
	},
} as Meta<typeof StandardChip>;

const defaultProps = {
	...standardChip.defaultVariants,
	standard: "ISO 27001",
};

const Template = (args: StandardChipProps) => <StandardChip {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
