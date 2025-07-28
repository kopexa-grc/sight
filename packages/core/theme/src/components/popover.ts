import { tv, type VariantProps } from "tailwind-variants";
import { popoverContentClasses } from "../utils/classes";

export const popover = tv({
	slots: {
		content: [
			...popoverContentClasses,
			"w-72",
			"origin-(--radix-popover-content-transform-origin)",
		],
	},
});

export type PopoverVariants = VariantProps<typeof popover>;
