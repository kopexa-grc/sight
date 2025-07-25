import { tv, type VariantProps } from "tailwind-variants";

export const dataTable = tv({
	slots: {
		base: "relative flex min-h-0 flex-1 flex-col",
		toolbarWrapper: "flex flex-col gap-2 divide-y pb-2",
		toolbar: "flex items-center py-4",
		wrapper: "min-h-0 w-full flex-1 overflow-auto overscroll-none",
		th: "",
		td: "",
	},
	variants: {
		isFirstColumn: {
			true: {
				th: "after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']",
				td: "after:absolute after:inset-y-0 after:right-0 after:h-full after:w-px after:bg-transparent after:content-['']",
			},
		},
		showStickyBorder: {
			true: {
				th: "after:bg-border",
				td: "after:bg-border",
			},
		},
		isSelect: {
			true: {
				th: "w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]",
				td: "w-[calc(20px+24px+24px)] min-w-[calc(20px+24px+24px)] max-w-[calc(20px+24px+24px)]",
			},
		},
		isAction: {
			true: {
				th: "w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]",
				td: "w-[calc(28px+24px+4px)] min-w-[calc(28px+24px+4px)] max-w-[calc(28px+24px+4px)]",
			},
		},
		isSticky: {
			true: {
				th: "bg-background sticky",
				td: "bg-background sticky z-[2]",
			},
		},
	},
});

export type DataTableVariants = VariantProps<typeof dataTable>;

// packages/components/data-table/src/internal/data-table-search.tsx
// pr-[calc(15px+2px+8px)]
