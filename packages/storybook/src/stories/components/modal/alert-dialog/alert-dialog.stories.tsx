import {
	AlertDialog,
	Button,
	ConfirmDialogProvider,
	useConfirm,
} from "@kopexa/sight";
import { alertDialog } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export default {
	title: "Components/Modal/AlertDialog",
	component: AlertDialog.Root,
	decorators: [
		(Story) => (
			<ConfirmDialogProvider>
				<Story />
			</ConfirmDialogProvider>
		),
	],
} as Meta<AlertDialog.RootProps>;

const defaultProps = {
	...alertDialog.defaultVariants,
};

const Template = (args: AlertDialog.RootProps) => (
	<AlertDialog.Root {...args}>
		<AlertDialog.Trigger>
			<Button>Open Alert Dialog</Button>
		</AlertDialog.Trigger>
		<AlertDialog.Content>
			<AlertDialog.Header>
				<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
				<AlertDialog.Description>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialog.Description>
			</AlertDialog.Header>
			<AlertDialog.Footer>
				<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
				<AlertDialog.Action>Continue</AlertDialog.Action>
			</AlertDialog.Footer>
		</AlertDialog.Content>
	</AlertDialog.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const Hook = () => {
	const { confirm } = useConfirm();
	const [result, setResult] = useState<boolean | null>(null);

	const handleClick = async () => {
		const result = await confirm({
			title: "Are you sure?",
			children: "This action cannot be undone.",
			confirmButtonContent: "Yes, delete",
			cancelButtonContent: "No, cancel",
		});

		if (result) {
			setResult(true);
		} else {
			setResult(false);
		}
	};

	return (
		<div>
			<Button onClick={handleClick}>Open Confirm Dialog</Button>
			{result !== null && <p>Result: {result ? "Confirmed" : "Cancelled"}</p>}
		</div>
	);
};
