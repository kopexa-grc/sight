import { tv, type VariantProps } from "tailwind-variants";

export const tabNav = tv({
	slots: {
		base: "",
		list: [
			"flex",
			"justify-start",
			"overflow-x-auto",
			"whitespace-nowrap",
			"font-sans",
		],
		item: "flex",
		link: [
			"relative",
			"flex",
			"items-center",
			"justify-center",
			"shrink-0",
			"select-none",
			"px-2",
			"[&_svg]:shrink-0",
			"transition-colors",
			"font-normal",
			"data-active:[&>_span]:font-medium",
			"hover:[&>_span]:bg-accent hover:[&>_span]:text-accent-foreground",
		],
		linkInner: [
			"flex",
			"items-center",
			"justify-center",
			"absolute",
			"overflow-hidden",
			"transition-all",
		],
		linkInnerHidden: [
			"flex",
			"items-center",
			"justify-center",
			"invisible",
			"transition-all",
		],
	},
	variants: {
		color: {
			primary: {
				link: ["before:bg-primary"],
			},
		},
		size: {
			sm: {
				link: ["h-10", "text-xs [&_svg]:size-3.5"],
				linkInner: "px-3 h-8 gap-2 rounded-sm min-w-16",
				linkInnerHidden: "px-3 h-8 gap-2 rounded-sm min-w-16",
			},
			md: {
				link: ["h-12", "text-sm", "rounded-md [&_svg]:size-4"],
				linkInner: "px-4 h-10 gap-2 rounded-md min-w-20",
				linkInnerHidden: "px-4 h-10 gap-2 rounded-md min-w-20",
			},
		},
		border: {
			true: {
				list: "border-b -mb-px",
				link: [
					"before:h-[2px]",
					"before:absolute",
					"before:bottom-0",
					"before:left-0",
					"before:right-0",
					"before:opacity-0",
					"before:transition-opacity",
					"data-active:before:opacity-100",
				],
			},
		},
	},
	defaultVariants: {
		color: "primary",
		border: true,
		size: "sm",
	},
});

export type TabNavVariantProps = VariantProps<typeof tabNav>;
export type TabNavSlots = keyof ReturnType<typeof tabNav>;
