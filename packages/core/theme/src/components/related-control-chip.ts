import { tv, type VariantProps } from "tailwind-variants";

export const relatedControlChip = tv({
	slots: {
		root: [
			"text-xs border rounded-full cursor-pointer hover:text-primary px-2.5 py-0.5",
		],
		tooltip: "text-xs",
	},
});

export type RelatedControlChipVariantsProps = VariantProps<
	typeof relatedControlChip
>;
