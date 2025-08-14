import {
	RelatedControlChip,
	type RelatedControlChipProps,
} from "@kopexa/sight";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Chips/Related Control Chip",
	component: RelatedControlChip,
	argTypes: {
		mappingType: {
			control: { type: "select" },
			options: ["EQUAL", "INTERSECT", "PARTIAL", "SUBSET", "SUPERSET"],
			defaultValue: "EQUAL",
		},
	},
} as Meta<typeof RelatedControlChip>;

const defaultProps = {
	refCode: "5.5.1",
	mappingType: "EQUAL",
	relation: "Related Control",
};

const Template = (args: RelatedControlChipProps) => (
	<RelatedControlChip {...args} />
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
