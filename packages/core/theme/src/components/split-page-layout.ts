import { tv, type VariantProps } from "tailwind-variants";

export const splitPageLayout = tv({
	slots: {
		root: [
			"size-full min-h-0 grid grid-cols-[1fr_10px] md:grid-cols-3 relative",
		],
		content: ["p-4 md:p-6 col-span-1 md:col-span-2"],
		panelContainer: [
			"flex flex-col",
			"md:border-s",
			//"size-full",
			"bg-muted dark:bg-primary-900",
		],
		panel: [
			"md:border-s",
			"p-4 md:p-6",
			"overflow-y-auto overflow-x-hidden",
			"flex-1",
			"min-h-0",
			"h-full",
		],
		bleed: "-mx-4 md:-mx-6",
		mobileWrapper: "relative",
		mobileContainer: ["absolute top-2 right-2 z-10"],
	},
	variants: {
		inset: {
			true: {
				panelContainer: "rounded-e-md max-md:rounded-md",
			},
		},
	},
	defaultVariants: {
		inset: true,
	},
});

export type SplitPageLayoutVariantProps = VariantProps<typeof splitPageLayout>;

// Computed
