import { tv, type VariantProps } from "tailwind-variants";

export const dialog = tv({
	slots: {
		overlay: ["fixed inset-0 z-50 bg-black/25"],
		content: [
			"bg-background fixed top-[50%] left-[50%] z-50",
			"grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]",
			"gap-4 border shadow-lg",
			//  mobile animation vars
			"[--scale-enter:100%]",
			"[--scale-exit:100%]",
			"[--slide-enter:0px]",
			"[--slide-exit:80px]",
			// tablet/desktop animation vars
			"sm:[--scale-enter:100%]",
			"sm:[--scale-exit:103%]",
			"sm:[--slide-enter:0px]",
			"sm:[--slide-exit:0px]",
		],
		close: [
			"ring-offset-background focus:ring-ring",
			"data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
			"absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100",
			"focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none",
			"[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		],
		closeTrigger: [],
		header:
			"flex flex-col gap-1 text-center sm:text-left shrink grow-0 px-6 pt-4",
		footer:
			"flex flex-col-reverse gap-2 px-6 pt-2 pb-4 sm:flex-row sm:justify-end",
		body: "px-6 py-2 flex-1 overflow-auto",
		title: "text-lg leading-none font-semibold",
		description: "text-muted-foreground text-sm",
	},
	variants: {
		size: {
			xs: {
				content: "sm:max-w-xs",
			},
			sm: {
				content: "sm:max-w-sm",
			},
			md: {
				content: "sm:max-w-md",
			},
			lg: {
				content: "sm:max-w-lg",
			},
			xl: {
				content: "sm:max-w-xl",
			},
			"2xl": {
				content: "sm:max-w-2xl",
			},
			"3xl": {
				content: "sm:max-w-3xl",
			},
			"4xl": {
				content: "sm:max-w-4xl",
			},
			"5xl": {
				content: "sm:max-w-5xl",
			},
			full: {
				content: [
					"my-0 mx:0 sm:mx-0 sm:my-0 max-w-[calc(100%-1rem)] w-full h-[calc(100dvh-1rem)] inset-2",
					"translate-0",
				],
			},
		},
		placement: { top: {}, bottom: {}, left: {}, right: {} },
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
		size: "md",
		placement: "right",
		radius: "lg",
	},
});

export type DialogVariantProps = VariantProps<typeof dialog>;
export type DialogSlots = keyof ReturnType<typeof dialog>;
