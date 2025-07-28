import { tv, type VariantProps } from "tailwind-variants";

export const sectionRow = tv({
	slots: {
		root: [
			"grid grid-cols-1 text-base/6 sm:grid-cols-[min(25%,--spacing(32))_auto] sm:text-sm/6",
			"gap-3",
		],
		title: [
			"col-start-1 text-muted-foreground text-sm font-semibold",
			"max-sm:pt-3",
			"shrink-0",
		],
		valueText: "whitespace-pre-line text-pretty text-sm",
		valueContainer: ["flex flex-row items-center gap-1", "max-sm:pt-1", "grow"],
		action: "self-end ml-auto",
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
