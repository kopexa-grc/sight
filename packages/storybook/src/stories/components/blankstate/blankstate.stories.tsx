import { PlusIcon } from "@kopexa/icons";
import { Blankstate, type BlankstateProps, Button } from "@kopexa/sight";
import { blankstate } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Blankstate",
	parameters: {
		layout: "centered",
	},
	component: Blankstate,
	argTypes: {
		size: {
			control: { type: "select" },
			options: Object.keys(blankstate.variants.size),
		},
		bordered: {
			control: { type: "boolean" },
		},
		classNames: {
			control: { disable: true },
		},
	},
} as Meta<typeof Blankstate>;

const defaultProps = {
	title: "No Data Available",
	description: "There is no data to display at the moment.",
	icon: <PlusIcon />,
	...blankstate.defaultVariants,
};

const Template = (args: BlankstateProps) => (
	<Blankstate className="w-full min-w-7xl" {...args}>
		<Button>Add Data</Button>
		<Button color="secondary">Learn More</Button>
	</Blankstate>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
