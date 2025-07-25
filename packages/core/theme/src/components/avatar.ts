import { tv, type VariantProps } from "tailwind-variants";
import { focusVisibleClasses, translateCenterClasses } from "../utils/classes";
import { colorVariants } from "../utils/variants";

export const avatar = tv({
	slots: {
		root: [
			"flex",
			"relative",
			"justify-center",
			"items-center",
			"box-border",
			"overflow-hidden",
			"align-middle",
			"text-white",
			"z-0",
			// focus ring
			...focusVisibleClasses,
		],
		img: [
			"flex",
			"object-cover",
			"w-full",
			"h-full",
			"transition-opacity",
			"!duration-500",
			"opacity-0",
			"data-[status=loaded]:opacity-100",
		],
		fallback: [
			...translateCenterClasses,
			"flex",
			"items-center",
			"justify-center",
		],
		name: [
			...translateCenterClasses,
			"font-normal",
			"text-center",
			"text-inherit",
		],
		icon: [
			...translateCenterClasses,
			"flex",
			"items-center",
			"justify-center",
			"text-inherit",
			"w-full",
			"h-full",
			"opacity-30",
		],
	},
	variants: {
		size: {
			sm: {
				root: "w-8 h-8 text-[11px]",
			},
			md: {
				root: "w-10 h-10 text-[12px]",
			},
			lg: {
				root: "w-14 h-14 text-[14px]",
			},
		},
		color: {
			default: {
				root: colorVariants.solid.default,
			},
			primary: {
				root: colorVariants.solid.primary,
			},
			secondary: {
				root: colorVariants.solid.secondary,
			},
			success: {
				root: colorVariants.solid.success,
			},
			warning: {
				root: colorVariants.solid.warning,
			},
			destructive: {
				root: colorVariants.solid.destructive,
			},
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
		isBordered: {
			true: {
				root: "ring-2 ring-offset-2 ring-offset-background",
			},
		},
		isDisabled: {
			true: {
				root: "opacity-50",
			},
		},
		isInGroup: {
			true: {
				root: [
					"-ms-2 hover:-translate-x-3 rtl:hover:translate-x-3 transition-transform",
					"focus-visible:-translate-x-3 rtl:focus-visible:translate-x-3",
				],
			},
		},
		isInGridGroup: {
			true: {
				root: "m-0 hover:translate-x-0",
			},
		},
	},
	defaultVariants: {
		size: "md",
		radius: "full",
		color: "default",
	},
	compoundVariants: [
		{
			color: "default",
			isBordered: true,
			class: {
				root: "ring-default",
			},
		},
		{
			color: "primary",
			isBordered: true,
			class: {
				root: "ring-primary",
			},
		},
		{
			color: "secondary",
			isBordered: true,
			class: {
				root: "ring-secondary",
			},
		},
		{
			color: "success",
			isBordered: true,
			class: {
				root: "ring-success",
			},
		},
		{
			color: "warning",
			isBordered: true,
			class: {
				root: "ring-warning",
			},
		},
		{
			color: "destructive",
			isBordered: true,
			class: {
				root: "ring-destructive",
			},
		},
	],
});

export type AvatarVariantProps = VariantProps<typeof avatar>;
export type AvatarSlots = keyof ReturnType<typeof avatar>;
