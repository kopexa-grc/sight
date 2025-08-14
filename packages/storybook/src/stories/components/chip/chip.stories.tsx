import { CheckIcon, NotificationIcon } from "@kopexa/icons";
import { Chip, type ChipProps } from "@kopexa/sight";
import { chip } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Chips/Chip",
	component: Chip,
	argTypes: {
		variant: {
			control: { type: "select" },
			options: Object.keys(chip.variants.variant),
			defaultValue: chip.defaultVariants.variant,
		},
		color: {
			control: { type: "select" },
			options: Object.keys(chip.variants.color),
			defaultValue: chip.defaultVariants.color,
		},
		size: {
			control: { type: "select" },
			options: Object.keys(chip.variants.size),
			defaultValue: chip.defaultVariants.size,
		},
		indicatorColor: {
			control: { type: "select" },
			options: Object.keys(chip.variants.indicatorColor),
			defaultValue: chip.defaultVariants.indicatorColor,
		},
		radius: {
			control: { type: "select" },
			options: Object.keys(chip.variants.radius),
			defaultValue: chip.defaultVariants.radius,
		},
	},
} as Meta<typeof Chip>;

const defaultProps = {
	children: "Chip",
	...chip.defaultVariants,
};

const Template = (args: ChipProps) => <Chip {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const Disabled = () => <Chip disabled>Disabled Chip</Chip>;

export const Sizes = () => {
	return (
		<div className="flex gap-4">
			<Chip size="sm">Small</Chip>
			<Chip size="md">Medium</Chip>
			<Chip size="lg">Large</Chip>
		</div>
	);
};

export const Radius = () => {
	return (
		<div className="flex gap-4">
			<Chip radius="full">Full</Chip>
			<Chip radius="lg">Large</Chip>
			<Chip radius="md">Medium</Chip>
			<Chip radius="sm">Small</Chip>
		</div>
	);
};

export const Variants = (args: ChipProps) => {
	return (
		<div className="flex flex-col gap-4">
			<Chip variant="solid" {...args}>
				Solid Default
			</Chip>
			<Chip variant="bordered" {...args}>
				Bordered Default
			</Chip>
			<Chip variant="flat" {...args}>
				Flat
			</Chip>
			<Chip variant="faded" {...args}>
				Faded
			</Chip>
		</div>
	);
};

Variants.defaultProps = {
	color: "warning",
};

Variants.argTypes = {
	color: {
		control: {
			type: "select",
		},
		options: [
			"default",
			"primary",
			"secondary",
			"success",
			"destructive",
			"warning",
		],
	},
};

export const StartAndEndContent = () => {
	return (
		<div className="flex gap-4">
			<Chip color="success" startContent={<CheckIcon />} variant="faded">
				Chip
			</Chip>
			<Chip color="secondary" endContent={<NotificationIcon />} variant="flat">
				Chip
			</Chip>
		</div>
	);
};

export const Indicator = (args: ChipProps) => {
	return (
		<div className="flex gap-4">
			<Chip
				indicator
				color="default"
				status="Passed"
				variant="solid"
				{...args}
				isCloseable
			>
				Approval Status
			</Chip>
			<Chip
				indicator
				color="secondary"
				status="Failed"
				variant="faded"
				isCloseable
				{...args}
			>
				Review Status
			</Chip>
			<Chip
				indicator
				color="success"
				status="Passed"
				variant="flat"
				{...args}
				isCloseable
			>
				Risk evaluation
			</Chip>
			<Chip
				indicator
				color="warning"
				status="Warning"
				variant="bordered"
				isCloseable
				{...args}
			>
				Compliance Status
			</Chip>
		</div>
	);
};

Indicator.defaultProps = {
	indicator: true,
};

Indicator.argTypes = {
	indicatorColor: {
		control: {
			type: "select",
		},
		options: [
			"default",
			"primary",
			"secondary",
			"success",
			"destructive",
			"warning",
			"info",
		],
	},
	size: {
		control: {
			type: "select",
		},
		options: ["sm", "md", "lg"],
	},
};
