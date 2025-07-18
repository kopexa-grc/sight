import { tv, type VariantProps } from "tailwind-variants";
import { dialog } from "./dialog";

export const drawer = tv({
	slots: {
		overlay: dialog.slots.overlay,
		content: [
			"bg-background fixed z-50 flex flex-col w-full gap-4 shadow-lg max-h-dvh",
			"outline-hidden",
		],
		close: dialog.slots.close,
		closeTrigger: dialog.slots.closeTrigger,
		header: dialog.slots.header,
		footer: dialog.slots.footer,
		body: dialog.slots.body,
		title: dialog.slots.title,
		description: dialog.slots.description,
	},
	variants: {
		size: {
			xs: {
				content: "max-w-xs",
			},
			sm: {
				content: "max-w-sm",
			},
			md: {
				content: "max-w-md",
			},
			lg: {
				content: "max-w-lg",
			},
			xl: {
				content: "max-w-xl",
			},
			"2xl": {
				content: "max-w-2xl",
			},
			"3xl": {
				content: "max-w-3xl",
			},
			"4xl": {
				content: "max-w-4xl",
			},
			"5xl": {
				content: "max-w-5xl",
			},
			"6xl": {
				content: "max-w-6xl",
			},
			full: {
				content: "max-w-full max-h-full h-[calc(100dvh_-_1rem)] inset-2",
			},
		},
		placement: {
			top: {},
			bottom: {},
			left: {},
			right: {
				content: "inset-y-2 me-2 right-0 h-[calc(100%-1rem)] border-l",
			},
		},
		radius: {
			none: "",
			sm: {
				content: "rounded-sm",
			},
			md: {
				content: "rounded-md",
			},
			lg: {
				content: "rounded-lg",
			},
		},
	},
	defaultVariants: {
		placement: "right",
		size: "md",
		radius: "lg",
	},
});

export type DrawerVariantProps = VariantProps<typeof drawer>;
