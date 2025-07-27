import { tv, type VariantProps } from "tailwind-variants";

export const sectionRow = tv({
	slots: {
		root: "grid grid-cols-[min(40%,--spacing(80))_auto] items-start gap-2",
		title: "text-muted-foreground text-sm font-semibold",
		valueText: "whitespace-pre-line text-pretty text-sm",
		valueContainer: "flex flex-wrap gap-1",
	},
	variants: {
		hasActions: {
			true: {
				root: "grid-cols-[min(40%,--spacing(80))_auto_28px]",
			},
			false: {},
		},
	},
	defaultVariants: {
		hasActions: false,
	},
});

export type SectionRowVariantProps = VariantProps<typeof sectionRow>;
export type SectionRowSlots = keyof ReturnType<typeof sectionRow>;
