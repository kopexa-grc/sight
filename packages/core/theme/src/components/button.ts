import { tv } from "tailwind-variants";

export const button = tv({
	base: [
		"inline-flex items-center justify-center gap-2",
		"whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50",
		"shrink-0 [&_svg]:shrink-0 outline-none",
		"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		"[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
		"text-sm font-medium",
	],
	variants: {
		variant: {},
		size: {},
	},
	defaultVariants: {},
});
