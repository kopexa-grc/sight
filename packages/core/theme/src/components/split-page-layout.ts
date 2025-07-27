import { tv, type VariantProps } from "tailwind-variants";

export const splitPageLayout = tv({
	slots: {
		root: ["size-full min-h-0 grid md:grid-cols-3 relative"],
		content: ["p-4 md:p-6 col-span-full md:col-span-2"],
		panelContainer: ["md:border-s", "bg-slate-50 dark:bg-primary-900"],
		panel: ["md:border-s", "p-4 md:p-6"],
		bleed: "-mx-4 md:-mx-6",
	},
	variants: {
		inset: {
			true: {
				panelContainer: "rounded-e-md",
			},
		},
	},
	defaultVariants: {
		inset: true,
	},
});

export type SplitPageLayoutVariantProps = VariantProps<typeof splitPageLayout>;
