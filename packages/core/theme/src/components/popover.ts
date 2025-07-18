import { tv, type VariantProps } from "tailwind-variants";

export const popover = tv({
	slots: {
		content: [
			"bg-popover text-popover-foreground z-50 w-72",
			"origin-(--radix-popover-content-transform-origin)",
			"rounded-md border p-4 shadow-md outline-hidden",
		],
	},
});

export type PopoverVariants = VariantProps<typeof popover>;
