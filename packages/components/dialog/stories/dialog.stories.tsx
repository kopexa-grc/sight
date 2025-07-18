import { dialog } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

import { Dialog, type DialogRootProps } from "../src";

export default {
	title: "Components/Dialog",
	component: Dialog.Root,
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
		<Dialog.Footer>Footerino</Dialog.Footer>
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
