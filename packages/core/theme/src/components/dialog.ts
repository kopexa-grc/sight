import { tv, type VariantProps } from "tailwind-variants";

export const dialog = tv({
	slots: {
		overlay: ["fixed inset-0 z-50 bg-black/50"],
		content: [
			"bg-background fixed top-[50%] left-[50%] z-50",
			"grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]",
			"gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
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
		header: "flex flex-col gap-2 text-center sm:text-left",
		footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
		title: "text-lg leading-none font-semibold",
		description: "text-muted-foreground text-sm",
	},
});

export type DialogVariantProps = VariantProps<typeof dialog>;
export type DialogSlots = keyof ReturnType<typeof dialog>;
