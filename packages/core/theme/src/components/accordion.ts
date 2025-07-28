import { tv, type VariantProps } from "tailwind-variants";

export const accordion = tv({
	slots: {
		root: "",
		item: "border-b last:border-b-0",
		trigger: [
			"w-full",
			"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
		],
		triggerIcon: [
			"pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
		],
		contentContainer: [
			"border-t",
			"data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
		],
		content: ["p-4"],
	},
	variants: {
		color: {
			default: {
				triggerIcon: ["text-muted-foreground"],
			},
			muted: {
				root: "bg-muted",
			},
		},
		border: {
			none: "",
			default: {
				root: "border border-border",
			},
		},
		radius: {
			none: {
				root: "rounded-none",
				trigger: "rounded-t-none",
				content: "rounded-b-none",
			},
			sm: {
				root: "rounded-sm",
				trigger: "rounded-t-sm",
				content: "rounded-b-sm",
			},
			md: {
				root: "rounded-md",
				trigger: "rounded-t-md",
				content: "rounded-b-md",
			},
		},
		spacing: {
			none: {},
			default: {
				trigger: "px-4",
				content: "px-4",
			},
		},
	},
	defaultVariants: {
		color: "default",
		spacing: "default",
		radius: "md",
		border: "default",
	},
});

export type AccordionVariantProps = VariantProps<typeof accordion>;
export type AccordionSlots = keyof ReturnType<typeof accordion>;
