import { tv, type VariantProps } from "tailwind-variants";

export const blankstate = tv({
	slots: {
		root: "@container/blankstate",
		container: "grid  justify-items-center",
		icon: "inline-flex mb-2 text-muted-foreground [&_svg]:w-full",
		title: "mb-1",
		description: "text-muted-foreground",
		actions: "my-4 flex items-center gap-2",
	},
	variants: {
		size: {
			sm: {
				container: "py-8 px-5",
				title: "text-h4-core",
				icon: "[&_svg]:size-6",
				description: "text-sm",
			},
			md: {
				container: "py-8 px-8",
				title: "text-h2-core",
				description: "text-base",
				icon: "[&_svg]:size-8",
			},
			lg: {
				container: "py-8 px-8",
				title: "text-h1-core",
				description: "text-base",
				icon: "[&_svg]:size-10",
			},
		},
		bordered: {
			true: {
				container: "border rounded-lg",
			},
			false: {},
		},
		narrow: {
			true: {
				container: "max-w-md mx-auto",
			},
			false: {},
		},
	},
	defaultVariants: {
		size: "md",
		bordered: false,
		narrow: false,
	},
});

export type BlankStateVariantProps = VariantProps<typeof blankstate>;
export type BlankStateSlots = keyof ReturnType<typeof blankstate>;
