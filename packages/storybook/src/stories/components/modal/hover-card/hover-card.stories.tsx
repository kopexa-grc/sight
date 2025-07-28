import { Button, HoverCard } from "@kopexa/sight";
import { hoverCard } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Overlays and layering/HoverCard",
	component: HoverCard.Root,
} as Meta<HoverCard.RootProps>;

const defaultProps = {
	...hoverCard.defaultVariants,
};

const Template = (args: HoverCard.RootProps) => (
	<HoverCard.Root {...args}>
		<HoverCard.Trigger>
			<Button variant="ghost">Hover me</Button>
		</HoverCard.Trigger>
		<HoverCard.Content>Some pitty content here.</HoverCard.Content>
	</HoverCard.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
