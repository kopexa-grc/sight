import { Accordion } from "@kopexa/sight";
import { accordion } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Accordion",
	component: Accordion.Root,
	argTypes: {
		color: {
			control: { type: "select" },
			options: ["default", "muted"],
			defaultValue: "muted",
		},
		spacing: {
			control: { type: "select" },
			options: ["none", "default"],
			defaultValue: "default",
		},
	},
	decorators: [
		(Story) => (
			<div className="size-full flex items-center justify-center">
				<div className="max-w-3xl mx-auto p-4 w-full">
					<Story />
				</div>
			</div>
		),
	],
} as Meta<Accordion.RootProps>;

const defaultProps = {
	type: "single",
	collapsible: true,
	className: "w-full",
	defaultValue: "item-1",
	...accordion.defaultVariants,
};

const Template = (args: Accordion.RootProps) => (
	<Accordion.Root {...args}>
		<Accordion.Item value="item-1">
			<Accordion.Trigger>Product Information</Accordion.Trigger>
			<Accordion.Content className="flex flex-col gap-4 text-balance">
				<p>
					Our flagship product combines cutting-edge technology with sleek
					design. Built with premium materials, it offers unparalleled
					performance and reliability.
				</p>
				<p>
					Key features include advanced processing capabilities, and an
					intuitive user interface designed for both beginners and experts.
				</p>
			</Accordion.Content>
		</Accordion.Item>
		<Accordion.Item value="item-2">
			<Accordion.Trigger>Shipping Details</Accordion.Trigger>
			<Accordion.Content className="flex flex-col gap-4 text-balance">
				<p>
					We offer worldwide shipping through trusted courier partners. Standard
					delivery takes 3-5 business days, while express shipping ensures
					delivery within 1-2 business days.
				</p>
				<p>
					All orders are carefully packaged and fully insured. Track your
					shipment in real-time through our dedicated tracking portal.
				</p>
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
