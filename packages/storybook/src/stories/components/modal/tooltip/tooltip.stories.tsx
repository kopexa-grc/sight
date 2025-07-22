import { Tooltip, type TooltipProps } from "@kopexa/sight";
import { tooltip } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Overlays and layering/Tooltip",
	component: Tooltip,
} as Meta<TooltipProps>;

const defaultProps = {
	...tooltip.defaultVariants,
};

const Template = (args: TooltipProps) => (
	<Tooltip content="hello" {...args}>
		<button type="button" className="px-2 py-1.5 rounded-md border">
			Hover me
		</button>
	</Tooltip>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
