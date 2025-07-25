import { tv, type VariantProps } from "tailwind-variants";

export const pageHeader = tv({
	slots: {
		root: "page-header",
		titleArea: "page-header__title-area flex gap-2 flex-row items-center",
		title: "page-header__title block",
		contextArea: [
			"page-header__context-area",
			"flex",
			"pb-2",
			"text-sm",
			"flex-row",
			"gap-2",
		],
		leadingVisual:
			"page-header__leading-visual flex items-center [&_svg]:size-4",
		leadingAction: "page-header__leading-action",
		breadcrumbs: ["page-header__breadcrumbs", "flex pe-2 items-center"],
		actions: [
			"page-header__actions",
			"flex",
			"flex-row",
			"gap-2",
			"justify-end",
			"items-start",
			"min-w-max",
			"ps-2",
		],
		description: [
			"page-header__description",
			"flex flex-row items-center gap-2 pt-2 text-sm font-normal leading-normal",
		],
		navigation: ["page-header__navigation", "block pt-2 text-sm fonr-normal"],
	},
});

export type PageHeaderVariantProps = VariantProps<typeof pageHeader>;
