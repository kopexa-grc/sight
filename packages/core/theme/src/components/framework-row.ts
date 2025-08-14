import { tv } from "tailwind-variants";

export const frameworkRow = tv({
	slots: {
		root: "flex w-full items-start gap-3 py-2 first:pt-0 last:pb-0 border-b border-dotted last:border-0",
		standardContainer: "shrink-0",
		refCodeContainer: "flex flex-wrap gap-2",
		toggleButton: [
			"px-2 py-0.5 text-xs rounded-full border",
			"bg-background text-muted-foreground hover:bg-muted/40",
		],
	},
});
