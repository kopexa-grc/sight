import { tv, type VariantProps } from "tailwind-variants";

export const sectionRow = tv({
	slots: {
		root: ["grid grid-cols-1 text-base/6 sm:text-sm/6", "w-full"],
		title: [
			"col-start-1 text-muted-foreground text-sm font-medium",
			"flex flex-row items-start gap-1",
			"shrink-0",
		],
		infoTip: ["min-w-64 w-auto max-w-96 p-2"],
		valueText: "whitespace-pre-line text-pretty text-sm",
		valueContainer: ["flex flex-row items-start gap-1", "grow"],
		action: "self-start ml-auto",
	},
	variants: {
		orientation: {
			horizontal: {
				root: "sm:grid-cols-[min(33%,--spacing(80))_auto]",
			},
			vertical: {
				root: "grid-cols-1",
				title: "col-start-1",
				valueContainer: "col-start-1",
			},
			horizontalCentered: {
				root: "sm:grid-cols-[min(33%,--spacing(80))_auto] sm:items-center",
				valueContainer: "items-center",
			},
		},
		spacing: {
			tight: {
				root: "gap-1",
				title: "max-sm:pt-1",
				valueContainer: "max-sm:pt-0",
			},
			default: {
				root: "gap-3",
				title: "max-sm:pt-3",
				valueContainer: "max-sm:pt-1",
			},
			loose: {
				root: "gap-6",
				title: "max-sm:pt-4",
				valueContainer: "max-sm:pt-2",
			},
		},
		hasActions: {
			true: {
				valueContainer: "justify-between",
			},
			false: {},
		},
	},
	defaultVariants: {
		hasActions: false,
		orientation: "horizontal",
		spacing: "default",
	},
});

export type SectionRowVariantProps = VariantProps<typeof sectionRow>;
export type SectionRowSlots = keyof ReturnType<typeof sectionRow>;
