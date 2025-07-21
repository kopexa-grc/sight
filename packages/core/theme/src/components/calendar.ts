import { tv, type VariantProps } from "tailwind-variants";

export const calendar = tv({
	slots: {
		base: [
			"bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
			String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
			String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
		],
		icon: "size-4",
		root: "w-fit",
		months: "flex gap-4 flex-col md:flex-row relative",
		month: "flex flex-col w-full gap-4",
		nav: "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
		buttonPrevious:
			"size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
		buttonNext: "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
		monthCaption:
			"flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
		dropdown: "absolute bg-popover inset-0 opacity-0",
		dropdowns:
			"w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5",
		dropdownRoot:
			"relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md",
		captionLabel: "select-none font-medium",
		table: "w-full border-collapse",
		weekdays: "flex",
		weekday:
			"text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none",
		week: "flex w-full mt-2",
		weekNumberWrapper:
			"flex size-(--cell-size) items-center justify-center text-center",
		weekNumberHeader: "select-none w-(--cell-size)",
		weekNumber: "text-[0.8rem] select-none text-muted-foreground",
		day: "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
		dayButton:
			"data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 dark:hover:text-accent-foreground flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] data-[range-end=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-start=true]:rounded-l-md [&>span]:text-xs [&>span]:opacity-70",
		rangeStart: "rounded-l-md bg-accent",
		rangeMiddle: "rounded-none",
		rangeEnd: "rounded-r-md bg-accent",
		today:
			"bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none",
		outside: "text-muted-foreground aria-selected:text-muted-foreground",
		disabled: "text-muted-foreground opacity-50",
		hidden: "invisible",
	},
	variants: {
		captionLayout: {
			label: {
				captionLabel: "text-sm",
			},
			default: {
				captionLabel:
					"rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5",
			},
		},
	},
	defaultVariants: {
		captionLayout: "default",
	},
});

export type CalendarVariantProps = VariantProps<typeof calendar>;
