import { tv, type VariantProps } from "tailwind-variants";
import { focusVisibleClasses } from "../utils/classes";

export const input = tv({
	base: [
		"selection:bg-primary selection:text-primary-foreground dark:bg-input/30 placeholder:text-muted-foreground ",
		"border-input flex w-full min-w-0 border bg-transparent",
		"px-3 py-1 shadow-xs data-[hidden=true]:hidden",
		// file
		"file:text-foreground file:border-0 file:bg-transparent file:inline-flex file:text-sm file:font-medium",
		"transition-[color,box-shadow]",
		// disabled
		"disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
		...focusVisibleClasses,
		"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	],
	variants: {
		size: {
			sm: "px-2.5 h-8 text-xs file:h-6 rounded-sm",
			md: "text-base md:text-sm h-10 file:h-8 rounded-md",
			lg: "h-12 text-base file:h-10 rounded-lg",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type InputVariantProps = VariantProps<typeof input>;
