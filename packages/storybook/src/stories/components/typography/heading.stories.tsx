import { Heading } from "@kopexa/sight";
import { heading } from "@kopexa/theme";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Heading> = {
	title: "Components/Typography/Heading",
	component: Heading,
	argTypes: {
		level: {
			control: {
				type: "select",
			},
			options: ["h1", "h2", "h3", "h4", "h5", "h6"],
		},
		className: { control: false },
		ref: { table: { disable: true } },
	},
	parameters: {
		docs: {
			description: {
				component:
					"Heading-Komponente für typografische Überschriften (h1-h6).",
			},
		},
	},
};
export default meta;

type Story = StoryObj<typeof Heading>;

const defaultProps = {
	children: "Heading",
	...heading.defaultVariants,
};

export const Default: Story = {
	args: {
		...defaultProps,
	},
};

export const AllLevels: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
			<Heading {...args} level="h1">
				h1 Heading
			</Heading>
			<Heading {...args} level="h2">
				h2 Heading
			</Heading>
			<Heading {...args} level="h3">
				h3 Heading
			</Heading>
			<Heading {...args} level="h4">
				h4 Heading
			</Heading>
			<Heading {...args} level="h5">
				h5 Heading
			</Heading>
			<Heading {...args} level="h6">
				h6 Heading
			</Heading>
		</div>
	),
	args: {
		...heading.defaultVariants,
	},
	parameters: {
		docs: {
			description: {
				story: "Alle Heading-Levels im Vergleich.",
			},
		},
	},
};
