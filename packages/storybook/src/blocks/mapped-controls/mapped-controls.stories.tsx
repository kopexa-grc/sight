import { MappedControls, type MappedControlsProps } from "@kopexa/sight";
import type { Meta } from "@storybook/react";

export default {
	title: "Blocks/MappedControls",
	component: MappedControls,
} as Meta<typeof MappedControls>;

const defaultProps = {};

const Template = (args: MappedControlsProps) => <MappedControls {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
