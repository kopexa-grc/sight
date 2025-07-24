import { tv, type VariantProps } from "tailwind-variants";
import { colorVariants } from "../utils/variants";

export const code = tv({
	base: [
		"px-2",
		"py-1",
		"h-fit",
		"font-mono",
		"font-normal",
		"inline-block",
		"whitespace-nowrap",
	],
	variants: {
		color: {
			default: colorVariants.flat.default,
			primary: colorVariants.flat.primary,
			secondary: colorVariants.flat.secondary,
			success: colorVariants.flat.success,
			warning: colorVariants.flat.warning,
			destructive: colorVariants.flat.destructive,
		},
		size: {
			sm: "text-xs",
			md: "text-sm",
			lg: "text-base",
		},
		radius: {
			none: "rounded-none",
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			full: "rounded-full",
		},
	},
	defaultVariants: {
		color: "default",
		size: "sm",
		radius: "sm",
	},
});

export type CodeVariantProps = VariantProps<typeof code>;
