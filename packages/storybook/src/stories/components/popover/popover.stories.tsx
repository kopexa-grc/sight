import { Popover } from "@kopexa/sight";
import type { Meta } from "@storybook/react";

export default {
	id: "components-popover",
	title: "Components/Popover",
	component: Popover.Root,
} as Meta<Popover.RootProps>;

const defaultProps = {};

const Template = (args: Popover.RootProps) => (
	<Popover.Root {...args}>
		<Popover.Trigger asChild>
			<button type="button" className="px-2 py-1.5 rounded-md border">
				trigger
			</button>
		</Popover.Trigger>
		<Popover.Content className="p-0" align="start">
			<p>Content of this popover</p>
		</Popover.Content>
	</Popover.Root>
);

export const Default = {
	id: "components-popover-default",
	render: Template,
	args: {
		...defaultProps,
	},
};
