import { tv, type VariantProps } from "tailwind-variants";

export const sectionRow = tv({
	slots: {
		root: [
			"grid grid-cols-1 text-base/6 sm:grid-cols-[min(33%,--spacing(80))_auto] sm:text-sm/6",
			"gap-3 w-full",
		],
		title: [
			"col-start-1 text-muted-foreground text-sm font-medium",
			"max-sm:pt-3 flex flex-row items-start gap-1",
			"shrink-0",
		],
		infoTip: ["min-w-64 w-auto max-w-96 p-2"],
		valueText: "whitespace-pre-line text-pretty text-sm",
		valueContainer: ["flex flex-row items-start gap-1", "max-sm:pt-1", "grow"],
		action: "self-start ml-auto",
	},
	variants: {
		hasActions: {
			true: {},
			false: {},
		},
	},
	defaultVariants: {
		hasActions: false,
	},
});

export type SectionRowVariantProps = VariantProps<typeof sectionRow>;
export type SectionRowSlots = keyof ReturnType<typeof sectionRow>;
