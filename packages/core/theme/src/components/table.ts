import { tv, type VariantProps } from "tailwind-variants";

export const table = tv({
	slots: {
		table: "min-w-full h-auto",
		thead: "",
		tbody: "after:block divide-y",
		tr: [
			"group/tr outline-hidden",
			"[&_td:last-child]:pr-4 [&_th:last-child]:pr-4",
			"[&_td:first-child]:pl-4 [&_th:first-child]:pl-4",
		],
		th: [
			"group/th px-3 py-3.5 text-start text-xs font-semibold whitespace-normal",
			"text-foreground border-b",
		],
		td: [
			"py-2 px-3 text-xs font-normal whitespace-normal relative",
			"[&>*]:z-[1]",
			"[&>*]:relative",
			// after content for selection
			"after:pointer-events-none",
			"after:content-['']",
			"after:absolute",
			"after:-z-[1]",
			"after:inset-0",
			"after:opacity-0",
			"group-aria-[selected=true]/tr:after:opacity-100",
			// before content for selection
			"before:pointer-events-none",
			"before:content-['']",
			"before:absolute",
			"before:-z-[1]",
			"before:inset-y-0",
			"before:start-0",
			"before:w-0.5",
			"before:opacity-0",
			"group-aria-[selected=true]/tr:first:before:opacity-100",
		],
	},
	variants: {
		overscroll: {
			horizontal: {
				th: "whitespace-nowrap",
				td: "whitespace-nowrap",
			},
		},
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
		layout: {
			auto: {
				table: "table-auto",
			},
			fixed: {
				table: "table-fixed",
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
		hasSelect: {
			true: {
				tr: "[&_th:first-of-type]:w-[1%] [&_th:first-of-type]:whitespace-nowrap",
			},
		},
		hasActions: {
			true: {
				tr: "[&_th:last-of-type]:w-[1%] [&_th:last-of-type]:whitespace-nowrap",
			},
		},
		isStickyCell: {
			true: {
				th: "sticky bg-background z-[2]",
				td: "sticky h-full bg-background z-[2]",
			},
		},
		isSelectCell: {
			true: {
				td: "w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]",
			},
		},
		isActionCell: {
			true: {
				td: "w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]",
			},
		},
		fullWidth: {
			true: {
				base: "w-full",
				wrapper: "w-full",
				table: "w-full",
			},
		},
	},
	defaultVariants: {
		layout: "auto",
		color: "default",
		fullWidth: true,
	},
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableSlots = keyof ReturnType<typeof table>;

// computed classes for table row
// left-0 left-[calc(20px+24px+24px)] cursor-pointer
// group w-fit flex cursor-default items-center gap-2
//
// packages/components/data-table/src/internal/data-table-sorting-icon.tsx
// opacity-0 transition-opacity group-hover:opacity-100
// opacity-100 when sorted
//
// left-0
// left-[calc(20px+24px+24px)]
