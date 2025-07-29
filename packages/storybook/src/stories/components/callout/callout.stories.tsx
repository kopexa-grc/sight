import { Callout, type CalloutProps } from "@kopexa/sight";
import { callout } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { fn } from "storybook/test";

export default {
	title: "Components/Callout",
	component: Callout,
	argTypes: {
		title: {
			control: { type: "text" },
			description: "The title of the callout",
			defaultValue: "Callout Title",
		},
		variant: {
			control: { type: "select" },
			options: Object.keys(callout.variants.variant),
			defaultValue: callout.defaultVariants.variant,
		},
		radius: {
			control: { type: "select" },
			options: Object.keys(callout.variants.radius),
			defaultValue: callout.defaultVariants.radius,
		},
		size: {
			control: { type: "select" },
			options: Object.keys(callout.variants.size),
			defaultValue: callout.defaultVariants.size,
		},
		onDismiss: { action: "dismissed" },
	},
} as Meta<typeof Callout>;

const defaultProps = {
	children: "that's a message",
	onDismiss: fn,
	...callout.defaultVariants,
};

const Template = (args: CalloutProps) => <Callout {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
		title: "Default Callout",
		children: "This is a default callout with some information.",
	},
};

export const Info = {
	render: Template,
	args: {
		...defaultProps,
		variant: "info",
		title: "Information",
		children:
			"This callout contains important information that you should know.",
	},
};

export const Success = {
	render: Template,
	args: {
		...defaultProps,
		variant: "success",
		title: "Success",
		children: "Your action was completed successfully!",
	},
};

export const Warning = {
	render: Template,
	args: {
		...defaultProps,
		variant: "warning",
		title: "Warning",
		children:
			"Please be careful with this action as it might have consequences.",
	},
};

export const Destructive = {
	render: Template,
	args: {
		...defaultProps,
		variant: "destructive",
		title: "Error",
		children: "An error occurred while processing your request.",
	},
};

export const Dismissible = {
	render: Template,
	args: {
		...defaultProps,
		variant: "info",
		title: "Dismissible Callout",
		children: "This callout can be dismissed by clicking the close button.",
		onDismiss: undefined, // This will be handled by the action in argTypes
	},
};

export const SizeVariants = () => (
	<div className="flex flex-col space-y-4">
		<Callout title="Small Size" size="sm">
			This is a small-sized callout.
		</Callout>
		<Callout title="Medium Size" size="md">
			This is a medium-sized callout (default).
		</Callout>
		<Callout title="Large Size" size="lg">
			This is a large-sized callout with more prominent text and spacing.
		</Callout>
	</div>
);

export const AllVariants = () => (
	<div className="flex flex-col space-y-4">
		<Callout variant="default" title="Default Variant">
			This is the default variant of the callout component.
		</Callout>
		<Callout variant="info" title="Info Variant">
			This variant provides informational content to the user.
		</Callout>
		<Callout variant="success" title="Success Variant">
			This variant indicates a successful action or positive outcome.
		</Callout>
		<Callout variant="warning" title="Warning Variant">
			This variant warns the user about potential issues.
		</Callout>
		<Callout variant="destructive" title="Destructive Variant">
			This variant indicates an error or destructive action.
		</Callout>
	</div>
);
