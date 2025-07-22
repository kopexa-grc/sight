import { Card } from "@kopexa/sight";
import { card } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Card",
	component: Card.Root,
	argTypes: {
		shadow: {
			control: {
				type: "select",
			},
			options: ["none", "sm", "md", "lg"],
		},
		radius: {
			control: {
				type: "select",
			},
			options: ["none", "sm", "md", "lg"],
		},
		fullWidth: {
			control: {
				type: "boolean",
			},
		},
		isHoverable: {
			control: {
				type: "boolean",
			},
		},
		isPressable: {
			control: {
				type: "boolean",
			},
		},
		isBlurred: {
			control: {
				type: "boolean",
			},
		},
		isDisabled: {
			control: {
				type: "boolean",
			},
		},
	},
	decorators: [
		(Story) => (
			<div className="flex items-center justify-center w-screen h-screen">
				<Story />
			</div>
		),
	],
} as Meta<Card.RootProps>;

const defaultProps = {
	...card.defaultVariants,
};

const Template = (args: Card.RootProps) => (
	<Card.Root className="max-w-md" {...args}>
		<Card.Body>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed</p>
		</Card.Body>
	</Card.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

const WithDividerTemplate = (args: Card.RootProps) => (
	<Card.Root {...args} className="max-w-md">
		<Card.Header className="border-b border-divider dark:border-divider-dark">
			<strong>Description</strong>
		</Card.Header>
		<Card.Body className="py-8">
			<p>
				The Object constructor creates an object wrapper for the given value.
			</p>
		</Card.Body>
		<Card.Footer className="border-t border-divider dark:border-divider-dark">
			<p>
				When called in a non-constructor context, Object behaves identically to{" "}
				<code>new Object()</code>.
			</p>
		</Card.Footer>
	</Card.Root>
);

export const WithDivider = {
	render: WithDividerTemplate,

	args: {
		...defaultProps,
	},
};
