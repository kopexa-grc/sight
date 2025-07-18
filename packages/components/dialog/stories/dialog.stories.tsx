import { dialog } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

import { Dialog, type DialogRootProps } from "../src";

export default {
	title: "Components/Dialog",
	component: Dialog.Root,
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
	},
} as Meta<typeof Dialog.Root>;

const defaultProps = {
	...dialog.defaultVariants,
};

const content = (
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>A Title</Dialog.Title>
			<Dialog.Description>My Description</Dialog.Description>
		</Dialog.Header>
		<p>Content of this modal</p>
		<Dialog.Footer>
			<Dialog.CloseTrigger>
				<button type="button" className="btn">
					Close
				</button>
			</Dialog.CloseTrigger>
		</Dialog.Footer>
	</Dialog.Content>
);

const Template = (args: DialogRootProps) => {
	return (
		<Dialog.Root {...args}>
			<Dialog.Trigger>
				<button type="button" className="btn">
					Open Dialog
				</button>
			</Dialog.Trigger>
			{content}
		</Dialog.Root>
	);
};

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
