import { Button, Dialog, type DialogRootProps } from "@kopexa/sight";
import { dialog } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	id: "components-dialog",
	title: "Components/Modal/Dialog",
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
		<Dialog.Body>
			<p>Content of this modal</p>
		</Dialog.Body>
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

export const DialogDefault = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const DialogFullSize = () => {
	return (
		<Dialog.Root size="full">
			<Dialog.Trigger asChild>
				<Button>Open Full Size Dialog</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Full Size Dialog</Dialog.Title>
				</Dialog.Header>
				<Dialog.Body>Content</Dialog.Body>
				<Dialog.Footer>
					<Dialog.CloseTrigger asChild>
						<Button variant="ghost">Close</Button>
					</Dialog.CloseTrigger>
					<Button>Save Changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
