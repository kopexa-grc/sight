import { tv, type VariantProps } from "tailwind-variants";
import { dialog } from "./dialog";

export const drawer = tv({
	slots: {
		overlay: dialog.slots.overlay,
		content: [
			"bg-background fixed z-50 flex flex-col w-full gap-4 shadow-lg max-h-dvh",
			"outline-hidden",
			"data-[state=open]:animate-in data-[state=closed]:animate-out",
			"transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
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
				content: ["max-w-full h-[calc(100dvh_-_1rem)] !inset-2"],
			},
		},
		placement: {
			top: {
				content: [
					"data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
					"inset-x-2 top-2 w-[calc(100svw-1rem)] max-h-[calc(100dvh-1rem)] mx-auto h-auto border-b",
					"max-w-[calc(100svw-1rem)]",
				],
			},
			bottom: {
				content: [
					"data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
					"inset-x-2 bottom-2 h-auto border-t",
					"max-w-[calc(100svw-1rem)] max-h-[calc(100dvh-1rem)]",
				],
			},
			left: {
				content: [
					"inset-y-2 ms-2 left-0 border-r h-[calc(100dvh_-_1rem)]",
					"data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
				],
			},
			right: {
				content: [
					"inset-y-2 me-2 right-0 h-[calc(100%-1rem)] border-l",
					"data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
				],
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
