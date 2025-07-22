import { tv, type VariantProps } from "tailwind-variants";

export const card = tv({
	slots: {
		root: [
			"flex flex-col relative overflow-hidden h-auto outline-hidden text-card-foreground bg-card box-border",
			"border-2 border-transparent",
		],
		header: [
			"flex",
			"p-3",
			"z-10",
			"w-full",
			"justify-start",
			"items-center",
			"shrink-0",
			"overflow-inherit",
			"color-inherit",
			"subpixel-antialiased",
		],
		body: [
			"relative",
			"flex",
			"flex-1",
			"w-full",
			"p-3",
			"flex-auto",
			"flex-col",
			"place-content-inherit",
			"align-items-inherit",
			"h-auto",
			"break-words",
			"text-left",
			"overflow-y-auto",
			"subpixel-antialiased",
		],
		footer: [
			"p-3",
			"h-auto",
			"flex",
			"w-full",
			"items-center",
			"overflow-hidden",
			"color-inherit",
			"subpixel-antialiased",
		],
	},
	variants: {
		shadow: {
			none: {
				root: "shadow-none",
			},
			sm: {
				root: "shadow-sm",
			},
			md: {
				root: "shadow-md",
			},
			lg: {
				root: "shadow-lg",
			},
		},
		radius: {
			none: {
				root: "rounded-none",
				header: "rounded-none",
				footer: "rounded-none",
			},
			sm: {
				root: "rounded-sm",
				header: "rounded-t-sm",
				footer: "rounded-b-sm",
			},
			md: {
				root: "rounded-md",
				header: "rounded-t-md",
				footer: "rounded-b-md",
			},
			lg: {
				root: "rounded-lg",
				header: "rounded-t-lg",
				footer: "rounded-b-lg",
			},
		},
		fullWidth: {
			true: {
				root: "w-full",
			},
		},
		isHoverable: {
			true: {
				root: "hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-primary-600",
			},
		},
		isPressable: {
			true: { root: "cursor-pointer" },
		},
		isBlurred: {
			true: {
				root: ["bg-card/80", "backdrop-blur-md", "backdrop-saturate-150"],
			},
		},
		isDisabled: {
			true: {
				root: "opacity-50 cursor-not-allowed pointer-events-none",
			},
		},
	},
	defaultVariants: {
		radius: "lg",
		shadow: "md",
		fullWidth: false,
		isHoverable: false,
		isPressable: false,
		isBlurred: false,
		isDisabled: false,
	},
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
