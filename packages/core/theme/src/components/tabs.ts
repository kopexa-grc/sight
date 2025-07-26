import { tv, type VariantProps } from "tailwind-variants";

export const tabs = tv({
	slots: {
		root: "flex flex-col gap-2",
		list: [
			"bg-muted text-muted-foreground",
			"inline-flex flex-col md:flex-row",
			"w-full md:w-fit items-center justify-center rounded-lg p-[3px]",
		],
		trigger: [
			"inline-flex flex-1 items-center justify-center gap-1.5 rounded-md",
			" border border-transparent",
			"data-[state=active]:bg-background",
			"dark:data-[state=active]:text-foreground",
			"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",
			"dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30",
			"text-foreground dark:text-muted-foreground",
			"h-[calc(100%-1px)] whitespace-nowrap transition-[color,box-shadow]",
			"focus-visible:ring-[3px] focus-visible:outline-1",
			"disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
			"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		],
		content: ["flex-1 outline-none"],
	},
	variants: {
		size: {
			md: {
				list: "md:h-9",
				trigger: "px-2 py-1 text-sm font-medium max-md:w-full",
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export type TabsVariantProps = VariantProps<typeof tabs>;
