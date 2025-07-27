import { tv, type VariantProps } from "tailwind-variants";

export const sectionRow = tv({
	slots: {
		root: ["section-row items-start"],
		title: "section-row__title text-muted-foreground text-sm font-semibold",
		valueText: "whitespace-pre-line text-pretty text-sm",
		valueContainer: "section-row__value-container flex flex-wrap gap-1",
		action: "section-row__action",
	},
	variants: {
		hasActions: {
			true: {
				root: [
					"has-actions",
					//"md:grid-cols-[min(40%,--spacing(80))_auto_28px]",
				],
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
