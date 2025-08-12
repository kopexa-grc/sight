import { MinusIcon } from "@kopexa/icons";
import { IconButton, SectionRow, type SectionRowProps } from "@kopexa/sight";
import { sectionRow } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Section Row",
	component: SectionRow,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		orientation: {
			control: { type: "select" },
			options: ["horizontal", "vertical", "horizontalCentered"],
			defaultValue: "horizontal",
		},
		spacing: {
			control: { type: "select" },
			options: ["tight", "default", "loose"],
			defaultValue: "default",
		},
	},
	decorators: [
		(Story) => (
			<div className="grid place-content-center min-h-svh">
				<div className="w-full min-w-sm">
					<Story />
				</div>
			</div>
		),
	],
} as Meta<SectionRowProps>;

const defaultProps = {
	title: "Section Title",
	value: "This is the value of the section row.",
	actions: (
		<IconButton variant="ghost" size="sm" aria-label="Remove section">
			<MinusIcon />
		</IconButton>
	),
	...sectionRow.defaultVariants,
};

const Template = (args: SectionRowProps) => <SectionRow {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
