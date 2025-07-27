import { tv, type VariantProps } from "tailwind-variants";

export const previewCard = tv({
	slots: {
		root: [
			"flex w-full items-start gap-3 rounded-md bg-background p-2 transition-colors",
			"transition-all group min-h-10",
			"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
		],
		icon: ["flex-shrink-0 text-muted-foreground"],
		content: ["flex min-w-0 flex-1 flex-col justify-center"],
		title: ["truncate text-xs font-medium text-foreground"],
		description: ["truncate text-[10px] text-muted-foreground line-clamp-1"],
		action: ["shrink-0 rounded-full [&_svg]:size-4"],
		tags: ["mt-1.5 flex items-center gap-2"],
	},
	variants: {
		size: {
			md: {
				icon: "[&__svg]:size-5",
			},
		},
		isBordered: {
			true: {
				root: ["border"],
			},
			false: {},
		},
		isHoverable: {
			true: {
				root: "hover:bg-muted/50 hover:border-primary",
				title: "group-hover:text-primary",
			},
			false: {},
		},
	},
	defaultVariants: {
		size: "md",
		isBordered: true,
	},
});

export type PreviewCardSlots = keyof ReturnType<typeof previewCard>;
export type PreviewCardVariantProps = VariantProps<typeof previewCard>;
