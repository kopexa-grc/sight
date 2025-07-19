import { Drawer } from "@kopexa/sight";
import { drawer } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	id: "components-drawer",
	title: "Components/Drawer",
	component: Drawer.Root,
	argTypes: {
		size: {
			control: {
				type: "select",
			},
			options: [
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
				"2xl",
				"3xl",
				"4xl",
				"5xl",
				"6xl",
				"full",
			],
		},
		radius: {
			control: {
				type: "select",
			},
			options: ["none", "sm", "md", "lg"],
		},
	},
} as Meta<typeof Drawer.Root>;

const defaultProps = {
	...drawer.defaultVariants,
};

const content = (
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>A Title</Drawer.Title>
			<Drawer.Description>My Description</Drawer.Description>
		</Drawer.Header>
		<Drawer.Body>
			<div className="bg-purple-50 h-[2000px]">
				large scrollable content here
			</div>
		</Drawer.Body>
		<Drawer.Footer>
			<Drawer.CloseTrigger>
				<button type="button" className="btn">
					Close
				</button>
			</Drawer.CloseTrigger>
		</Drawer.Footer>
	</Drawer.Content>
);

const Template = (args: Drawer.RootProps) => (
	<Drawer.Root {...args}>
		<Drawer.Trigger>
			<button type="button" className="btn">
				Open Drawer
			</button>
		</Drawer.Trigger>
		{content}
	</Drawer.Root>
);

export const Default = {
	render: Template,
	id: "components-drawer--default",
	args: {
		...defaultProps,
	},
};
