import { tv, type VariantProps } from "tailwind-variants";
import { popoverContentClasses } from "../utils/classes";

export const hoverCard = tv({
	slots: {
		content: [
			...popoverContentClasses,
			"w-64 data-[state=open]:animate-in",
			"data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2",
			"data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
			"data-[side=top]:slide-in-from-bottom-2",
			"origin-(--radix-hover-card-content-transform-origin)",
		],
	},
});

export type HoverCardVariantProps = VariantProps<typeof hoverCard>;
export type HoverCardSlots = keyof ReturnType<typeof hoverCard>;
