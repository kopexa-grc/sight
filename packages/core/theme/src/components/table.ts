import { tv, type VariantProps } from "tailwind-variants";

export const table = tv({
	slots: {
		base: "flex flex-col relative gap-4",
		wrapper:
			"z-0 flex flex-col relative justify-between gap-4 bg-background overflow-auto",
		table: "min-w-full h-auto",
		thead: "",
		tbody: "after:block divide-y",
		tr: [
			"group/tr outline-hidden",
			"[&_td:last-child]:pr-4 [&_th:last-child]:pr-4",
			"[&_td:first-child]:pl-4 [&_th:first-child]:pl-4",
		],
		th: [
			"group/th px-3 py-3.5 text-start text-sm font-semibold",
			"text-foreground border-b",
		],
		td: [
			"py-2 px-3 text-sm font-normal whitespace-normal relative",
			"[&>*]:z-10",
			"[&>*]:relative",
			// after content for selection
			"after:pointer-events-none",
			"after:content-['']",
			"after:absolute",
			"after:z-0",
			"after:inset-0",
			"after:opacity-0",
			"group-aria-[selected=true]/tr:after:opacity-100",
			// before content for selection
			"before:pointer-events-none",
			"before:content-['']",
			"before:absolute",
			"before:-z-1",
			"before:inset-y-0",
			"before:start-0",
			"before:w-0.5",
			"before:opacity-0",
			"group-aria-[selected=true]/tr:first:before:opacity-100",
		],
	},
	variants: {
		color: {
			default: {
				td: [
					"first:before:bg-primary group-aria-[selected=true]/tr:text-accent-foreground",
				],
			},
			primary: {
				td: [
					"before:bg-primary group-aria-[selected=true]/tr:text-primary dark:group-aria-[selected=true]/tr:text-primary-foreground",
					"after:bg-primary/10 dark:after:bg-primary/20",
				],
			},
		},
		isSelectable: {
			true: {
				tr: "cursor-default",
				td: [
					"group-aria-[selected=false]/tr:group-data-[hover=true]/tr:bg-muted/30",
				],
			},
		},
	},
	defaultVariants: {
		color: "default",
	},
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableSlots = keyof ReturnType<typeof table>;
