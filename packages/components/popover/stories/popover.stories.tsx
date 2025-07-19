import type { Meta } from "@storybook/react";

import { Popover } from "../src";

export default {
	id: "components-popover",
	title: "Components/Popover",
	component: Popover.Root,
} as Meta<Popover.RootProps>;

const defaultProps = {};

const Template = (args: Popover.RootProps) => (
	<Popover.Root {...args}>
		<Popover.Trigger asChild>
			<button type="button" className="btn">
				trigger
			</button>
		</Popover.Trigger>
		<Popover.Content className="p-0">
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
