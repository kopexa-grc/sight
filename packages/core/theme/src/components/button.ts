import { tv, type VariantProps } from "tailwind-variants";
import { focusVisibleClasses } from "../utils/classes";
import { colorVariants } from "../utils/variants";

/**
 * Solid variant
 *  Ergebnis: solid button mit farbe im BG und contrast als foreground
 * - default: solid + primary color
 * - Solid can be combined with colors: primary, secondary, destructive, success, warning
 *
 * Ghost variant
 * Ein Button mit transparentem Background und Color im foreground
 * - default: ghost + primary color
 *
 * Outline variant
 * Ein Button mit transparentem Background und Border in der Color
 * - default: outline + primary color
 *
 * Link variant
 * Link ist transparenter button, mit Color.
 */

export const button = tv({
	base: [
		"group relative inline-flex items-center justify-center select-none",
		"box-border appearance-none",
		"whitespace-nowrap min-w-max font-normal subpixel-antialiased",
		"transform-gpu cursor-pointer hover:opacity-80",
		...focusVisibleClasses,
		// shadcn below
		"disabled:pointer-events-none disabled:opacity-50",
		"shrink-0 [&_svg]:shrink-0",
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
		"text-sm font-medium",
	],
	variants: {
		variant: {
			solid: "shadow-xs",
			ghost: "",
			outline: "border-2 bg-transparent",
			link: "",
			// destructive:
			// 	"bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
			// outline:
			// 	"border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
			// secondary:
			// 	"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			// ghost:
			// 	"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
			// link: "text-primary underline-offset-4 hover:underline",
		},
		size: {
			sm: "px-3 min-w-16 h-8 text-xs gap-2 rounded-sm has-[>svg]:px-2.5",
			md: "px-4 min-w-20 h-10 text-sm gap-2 rounded-md has-[>svg]:px-3",
			lg: "px-6 min-w-24 h-12 text-base gap-3 rounded-lg has-[>svg]:px-4",
		},
		color: {
			primary: "",
			secondary: "",
			destructive: "",
			warning: "",
			success: "",
		},
		radius: {},
		fullWidth: {
			true: "w-full",
		},
		isIconOnly: {
			true: "",
			false: "[&>svg]:max-w-[theme(spacing.8)]",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "solid",
		color: "primary",
		fullWidth: false,
		isIconOnly: false,
	},
	compoundVariants: [
		// primary color
		{
			variant: "solid",
			color: "primary",
			class: colorVariants.solid.primary,
		},
		{
			variant: "solid",
			color: "secondary",
			class: colorVariants.solid.secondary,
		},
		{
			variant: "solid",
			color: "destructive",
			class: colorVariants.solid.destructive,
		},
		{
			variant: "solid",
			color: "warning",
			class: colorVariants.solid.warning,
		},
		{
			variant: "solid",
			color: "success",
			class: colorVariants.solid.success,
		},
		// ghost color
		{
			variant: "ghost",
			color: "primary",
			class: colorVariants.ghost.primary,
		},
		{
			variant: "ghost",
			color: "secondary",
			class: colorVariants.ghost.secondary,
		},
		{
			variant: "ghost",
			color: "destructive",
			class: colorVariants.ghost.destructive,
		},
		{
			variant: "ghost",
			color: "warning",
			class: colorVariants.ghost.warning,
		},
		{
			variant: "ghost",
			color: "success",
			class: colorVariants.ghost.success,
		},
		// outline color
		{
			variant: "outline",
			color: "primary",
			class: colorVariants.outline.primary,
		},
		{
			variant: "outline",
			color: "secondary",
			class: colorVariants.outline.secondary,
		},
		{
			variant: "outline",
			color: "destructive",
			class: colorVariants.outline.destructive,
		},
		{
			variant: "outline",
			color: "warning",
			class: colorVariants.outline.warning,
		},
		{
			variant: "outline",
			color: "success",
			class: colorVariants.outline.success,
		},
	],
});

export type ButtonVariantProps = VariantProps<typeof button>;
