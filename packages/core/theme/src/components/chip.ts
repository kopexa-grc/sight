import { tv, type VariantProps } from "tailwind-variants";
import { colorVariants } from "../utils/variants";

export const chip = tv({
	slots: {
		root: [
			"relative",
			"max-w-fit",
			"min-w-min",
			"inline-flex",
			"items-center",
			"justify-between",
			"box-border",
			"whitespace-nowrap",
			"isolate",
		],
		content: "flex-1 text-inherit font-normal",
		indicator: "relative flex size-2 ml-1",
		indicatorPulse:
			"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
		indicatorDot: "relative inline-flex size-2 rounded-full",
		status: "flex items-center gap-2 border-r pr-1 font-medium ml-1",
		closeButton: [
			"z-10 appearance-none outline-none select-none transition-opacity",
			"opacity-70 hover:opacity-100 cursor-pointer active:opacity-50",
		],
	},
	variants: {
		variant: {
			solid: {},
			bordered: {
				root: "border-2 bg-transparent",
			},
			faded: {
				root: "border-2",
			},
			flat: {},
		},
		color: {
			default: {
				status: "border-default-200 dark:border-default-700",
			},
			primary: {
				status: "border-primary-200 dark:border-primary-700",
			},
			secondary: {
				status: "border-secondary-200 dark:border-secondary-700",
			},
			success: {
				status: "border-success-200 dark:border-success-700",
			},
			destructive: {
				status: "border-destructive-200 dark:border-destructive-700",
			},
			warning: {
				status: "border-warning-200 dark:border-warning-700",
			},
		},
		indicatorColor: {
			default: {
				indicatorDot: "bg-accent",
			},
			primary: {
				indicatorDot: "bg-primary",
			},
			secondary: {
				indicatorDot: "bg-secondary",
			},
			success: {
				indicatorDot: "bg-success",
			},
			warning: {
				indicatorDot: "bg-warning",
			},
			destructive: {
				indicatorDot: "bg-destructive",
			},
			info: {
				indicatorDot: "bg-info",
			},
		},
		indicator: {
			true: {},
			false: {},
		},
		indicatorVariant: {
			pulse: {},
		},
		size: {
			sm: {
				root: "px-1 h-6 text-[11px] [&_svg]:size-3",
				status: "text-[11px]",
				content: "px-1",
				closeButton: ["[&_svg]:size-3", "px-1"],
			},
			md: {
				root: "px-1 h-7 text-sm [&_svg]:size-4",
				status: "text-sm",
				content: "px-2",
				closeButton: ["[&_svg]:size-4", "px-2"],
			},
			lg: {
				root: "px-2 h-8 text-md [&_svg]:size-5",
				status: "text-md",
				content: "px-2",
				closeButton: ["[&_svg]:size-5", "px-2"],
			},
		},
		isCloseable: {
			true: {},
			false: {},
		},
		radius: {
			none: {
				root: "rounded-none",
			},
			sm: {
				root: "rounded-sm",
			},
			md: {
				root: "rounded-md",
			},
			lg: {
				root: "rounded-lg",
			},
			full: {
				root: "rounded-full",
			},
		},
		disabled: {
			true: {
				root: "opacity-50 pointer-events-none",
			},
			false: {},
		},
	},
	defaultVariants: {
		color: "default",
		variant: "solid",
		size: "sm",
		radius: "full",
		indicatorVariant: "pulse",
		indicatorColor: "success",
	},
	compoundVariants: [
		// solid / color
		{
			variant: "solid",
			color: "default",
			class: {
				root: colorVariants.solid.default,
			},
		},
		{
			variant: "solid",
			color: "primary",
			class: {
				root: colorVariants.solid.primary,
			},
		},
		{
			variant: "solid",
			color: "secondary",
			class: {
				root: colorVariants.solid.secondary,
			},
		},
		{
			variant: "solid",
			color: "success",
			class: {
				root: colorVariants.solid.success,
			},
		},
		{
			variant: "solid",
			color: "warning",
			class: {
				root: colorVariants.solid.warning,
			},
		},
		{
			variant: "solid",
			color: "destructive",
			class: {
				root: colorVariants.solid.destructive,
			},
		},
		// bordered / color
		{
			variant: "bordered",
			color: "default",
			class: {
				root: colorVariants.outline.default,
			},
		},
		{
			variant: "bordered",
			color: "primary",
			class: {
				root: colorVariants.outline.primary,
			},
		},
		{
			variant: "bordered",
			color: "secondary",
			class: {
				root: colorVariants.outline.secondary,
			},
		},
		{
			variant: "bordered",
			color: "success",
			class: {
				root: colorVariants.outline.success,
			},
		},
		{
			variant: "bordered",
			color: "warning",
			class: {
				root: colorVariants.outline.warning,
			},
		},
		{
			variant: "bordered",
			color: "destructive",
			class: {
				root: colorVariants.outline.destructive,
			},
		},
		{
			variant: "flat",
			color: "default",
			class: {
				root: colorVariants.flat.default,
			},
		},
		{
			variant: "flat",
			color: "primary",
			class: {
				root: colorVariants.flat.primary,
			},
		},
		{
			variant: "flat",
			color: "secondary",
			class: {
				root: colorVariants.flat.secondary,
			},
		},
		{
			variant: "flat",
			color: "success",
			class: {
				root: colorVariants.flat.success,
			},
		},
		{
			variant: "flat",
			color: "warning",
			class: {
				root: colorVariants.flat.warning,
			},
		},
		{
			variant: "flat",
			color: "destructive",
			class: {
				root: colorVariants.flat.destructive,
			},
		},
		// faded / color
		{
			variant: "faded",
			color: "default",
			class: {
				root: colorVariants.faded.default,
			},
		},
		{
			variant: "faded",
			color: "primary",
			class: {
				root: colorVariants.faded.primary,
			},
		},
		{
			variant: "faded",
			color: "secondary",
			class: {
				root: colorVariants.faded.secondary,
			},
		},
		{
			variant: "faded",
			color: "success",
			class: {
				root: colorVariants.faded.success,
			},
		},
		{
			variant: "faded",
			color: "warning",
			class: {
				root: colorVariants.faded.warning,
			},
		},
		{
			variant: "faded",
			color: "destructive",
			class: {
				root: colorVariants.faded.destructive,
			},
		},
	],
});

export type ChipVariantProps = VariantProps<typeof chip>;
export type ChipSlots = keyof ReturnType<typeof chip>;

// calculated classNames
// src/components/chip/src/chip.tsx
// max-h-[80%]
