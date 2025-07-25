import { tv, type VariantProps } from "tailwind-variants";

export const heading = tv({
	variants: {
		level: {
			h1: "text-h1-core",
			h2: "text-h2-core",
			h3: "text-h3-core",
			h4: "text-h4-core",
			h5: "text-h5-core",
			h6: "text-h6-core",
		},
	},
	defaultVariants: {
		level: "h1",
	},
});

export type HeadingVariantProps = VariantProps<typeof heading>;
