import { tv, type VariantProps } from "tailwind-variants";

export const callout = tv({
	slots: {
		root: ["flex items-start gap-3 w-full", "border", "relative"],
		iconContainer: "flex-shrink-0 mt-0.5",
		icon: "h-5 w-5",
		title: "font-semibold leading-none tracking-tight mb-2",
		content: "text-sm/6 grow",
		closeButton:
			"absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	},
	variants: {
		radius: {
			none: { root: "rounded-none" },
			sm: { root: "rounded-sm" },
			md: { root: "rounded-md" },
			lg: { root: "rounded-lg" },
		},
		size: {
			sm: {
				root: "p-3 text-sm",
				icon: "h-4 w-4",
				title: "text-sm mb-1",
			},
			md: {
				root: "p-4",
				icon: "h-5 w-5",
			},
			lg: {
				root: "p-6",
				icon: "h-6 w-6",
				title: "text-lg mb-3",
			},
		},
		variant: {
			default: {
				root: "bg-muted/50 text-foreground border-border",
				icon: "text-foreground",
				title: "text-foreground",
			},
			info: {
				root: "bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800/50",
				icon: "text-blue-500 dark:text-blue-400",
				title: "text-blue-900 dark:text-blue-200",
			},
			success: {
				root: "bg-green-50 dark:bg-green-950/50 text-green-900 dark:text-green-200 border-green-200 dark:border-green-800/50",
				icon: "text-green-500 dark:text-green-400",
				title: "text-green-900 dark:text-green-200",
			},
			warning: {
				root: "bg-orange-50 dark:bg-orange-950/50 text-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800/50",
				icon: "text-orange-500 dark:text-orange-400",
				title: "text-orange-900 dark:text-orange-200",
			},
			destructive: {
				root: "bg-red-50 dark:bg-red-950/50 text-red-900 dark:text-red-200 border-red-200 dark:border-red-800/50",
				icon: "text-red-500 dark:text-red-400",
				title: "text-red-900 dark:text-red-200",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		radius: "md",
		size: "md",
	},
});

export type CalloutVariantProps = VariantProps<typeof callout>;
