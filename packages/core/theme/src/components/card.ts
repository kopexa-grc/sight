import { tv, type VariantProps } from "tailwind-variants";

export const card = tv({
	slots: {
		root: [
			"flex flex-col relative h-auto outline-hidden box-border",
			"transition-colors duration-200",
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
		variant: {
			default: {
				root: "bg-card text-card-foreground",
			},
			muted: {
				root: "bg-muted text-muted-foreground",
			},
		},
		shadow: {
			none: {
				root: "shadow-none",
			},
			"2xs": {
				root: "shadow-2xs",
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
		border: {
			none: {
				root: "border-0",
			},
			default: {
				root: "border border-border",
			},
			emphasized: {
				root: "border-2 border-border",
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
				root: [
					"hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
					"hover:border-primary/50 hover:bg-card/80",
				],
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
		bleed: {
			none: {},
			sm: {
				body: "px-2",
				header: "px-2",
				footer: "px-2",
			},
			md: {
				body: "px-0",
				header: "px-0",
				footer: "px-0",
			},
			lg: {
				body: "-mx-2",
				header: "-mx-2",
				footer: "-mx-2",
			},
			content: {
				body: "px-0",
				header: "px-3",
				footer: "px-3",
			},
		},
		spacing: {
			sm: {
				body: "p-2",
				header: "p-2",
				footer: "p-2",
			},
			md: {
				body: "p-3",
				header: "p-3",
				footer: "p-3",
			},
			lg: {
				body: "p-4",
				header: "p-4",
				footer: "p-4",
			},
			xl: {
				body: "p-6",
				header: "p-6",
				footer: "p-6",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		radius: "lg",
		shadow: "none",
		fullWidth: false,
		isHoverable: false,
		isPressable: false,
		isBlurred: false,
		isDisabled: false,
		border: "default",
		bleed: "none",
		spacing: "md",
	},
});

export type CardVariantProps = VariantProps<typeof card>;
export type CardSlots = keyof ReturnType<typeof card>;
