import { tv, type VariantProps } from "tailwind-variants";

export const integrationCard = tv({
	slots: {
		root: "",
		header: "flex items-start justify-between gap-3",
		headerContent: "flex min-w-0 items-center gap-3",
		logoAndName: ["flex w-min items-center justify-center "],
		headingContainer: "min-w-0",
		heading: "truncate text-base font-semibold",
		statusIndicatorContainer: "ml-auto",
		description: "text-sm leading-relaxed text-muted-foreground break-words",
		tagsContainer: "mt-2 flex flex-wrap gap-1.5",
		footer: "mt-auto flex items-center justify-between border-t",
		version: "text-xs text-muted-foreground",
		websiteContainer: "flex items-center gap-2",
		websiteLink: [
			"inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-sm text-muted-foreground ring-1 ring-inset ring-ring transition hover:bg-primary-50 hover:text-primary-900",
		],
		websiteIcons: "size-3.5",
	},
});

export type IntegrationCardVariantProps = VariantProps<typeof integrationCard>;

export type IntegrationCardSlots = keyof ReturnType<typeof integrationCard>;

// additional classNames
// ml-auto
