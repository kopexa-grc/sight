import { tv, type VariantProps } from "tailwind-variants";

export const spinner = tv({
	slots: {
		base: "relative inline-flex flex-col gap-2 items-center justify-center",
		wrapper: "relative flex",
		label: "text-foreground font-regular",
		circle1: "absolute w-full h-full rounded-full",
		circle2: "absolute w-full h-full rounded-full",
		dots: "relative rounded-full mx-auto",
	},
	variants: {
		size: {
			sm: {
				wrapper: "w-5 h-5",
				circle1: "border-2",
				circle2: "border-2",
				dots: "size-1",
				label: "text-small",
			},
			md: {
				wrapper: "w-8 h-8",
				circle1: "border-3",
				circle2: "border-3",
				dots: "size-1.5",
				label: "text-medium",
			},
			lg: {
				wrapper: "w-10 h-10",
				circle1: "border-3",
				circle2: "border-3",
				dots: "size-2",
				label: "text-large",
			},
		},
		color: {
			current: {
				circle1: "border-b-current",
				circle2: "border-b-current",
				dots: "bg-current",
				spinnerBars: "bg-current",
			},
			white: {
				circle1: "border-b-white",
				circle2: "border-b-white",
				dots: "bg-white",
				spinnerBars: "bg-white",
			},
			primary: {
				circle1: "border-b-primary",
				circle2: "border-b-primary",
				dots: "bg-primary",
				spinnerBars: "bg-primary",
			},
			secondary: {
				circle1: "border-b-secondary",
				circle2: "border-b-secondary",
				dots: "bg-secondary",
				spinnerBars: "bg-secondary",
			},
			success: {
				circle1: "border-b-success",
				circle2: "border-b-success",
				dots: "bg-success",
				spinnerBars: "bg-success",
			},
			warning: {
				circle1: "border-b-warning",
				circle2: "border-b-warning",
				dots: "bg-warning",
				spinnerBars: "bg-warning",
			},
			danger: {
				circle1: "border-b-destructive",
				circle2: "border-b-destructive",
				dots: "bg-destructive",
				spinnerBars: "bg-destructive",
			},
		},
		variant: {
			default: {
				circle1: [
					"animate-spinner-ease-spin",
					"border-solid border-t-transparent border-l-transparent border-r-transparent",
				],
				circle2: [
					"opacity-75",
					"animate-spinner-linear-spin",
					"border-dotted",
					"border-t-transparent",
					"border-l-transparent",
					"border-r-transparent",
				],
			},
			wave: {
				wrapper: "translate-y-3/4",
				dots: ["animate-sway", "spinner-dot-animation"],
			},
			dots: {
				wrapper: "translate-y-2/4",
				dots: ["animate-blink", "spinner-dot-blink-animation"],
			},
		},
	},
	defaultVariants: {
		size: "md",
		color: "current",
		variant: "default",
	},
});

export type SpinnerVariants = VariantProps<typeof spinner>;
