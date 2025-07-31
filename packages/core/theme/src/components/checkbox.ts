import { tv, type VariantProps } from "tailwind-variants";

export const checkbox = tv({
	slots: {
		base: [
			"group",
			"peer border-input dark:bg-input/30",
			"focus-visible:border-ring focus-visible:ring-ring/50",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
			"aria-invalid:border-destructive size-4 shrink-0 rounded-[4px]",
			"border shadow-xs transition-shadow outline-none focus-visible:ring-[3px]",
			"disabled:cursor-not-allowed disabled:opacity-50",
		],
		indicator: [
			"flex items-center justify-center text-current transition-none",
		],
		icon: [
			"w-4 h-3 opacity-0 group-data-[state=checked]:opacity-100",
			"pointer-events-none",
		],
	},
	variants: {
		color: {
			primary: {
				base: [
					"data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
					"dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary",
				],
			},
		},
		size: {
			sm: {},
			md: {},
			lg: {},
		},
	},
	defaultVariants: {
		size: "md",
		color: "primary",
	},
});

export type CheckboxVariantProps = VariantProps<typeof checkbox>;
