import { tv, type VariantProps } from "tailwind-variants";

export const command = tv({
	slots: {
		root: "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
		inputWrapper: "flex h-9 items-center gap-2 border-b px-3",
		inputIcon: "size-4 shrink-0 opacity-50",
		input:
			"placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
		list: "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
		empty: "py-6 text-center text-sm",
		group:
			"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
		separator: "bg-border -mx-1 h-px",
		item: "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		shortcut: "text-muted-foreground ml-auto text-xs tracking-widest",
		header: "flex flex-col items-start justify-between px-3 py-2 border-b",
		title: "text-sm font-semibold",
		description: "text-xs text-muted-foreground",
	},
});

export type CommandVariants = VariantProps<typeof command>;
