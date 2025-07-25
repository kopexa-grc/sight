import { tv, type VariantProps } from "tailwind-variants";

export const pageLayout = tv({
	slots: {
		root: "",
		wrapper: "flex mx-auto flex-wrap",
		baseContent: "flex flex-1 flex-wrap max-w-full",
		header: "w-full",
		footerWrapper: "w-full",
		footerContent: "",
		paneWrapper: [
			"flex w-full mx-auto",
			// order start + mt-6
			"data-[position=start]:flex-col",
			// order? + mb-6
			"data-[position=end]:flex-col-reverse",
			// md+
			"md:w-auto md:mt-0 md:mb-0",
			"md:data-[sticky=true]:sticky md:data-[sticky=true]:top-2 md:data-[sticky=true]:max-h-[calc(100dvh-1rem)]",
			"md:data-[position=end]:flex-row-reverse",
			"md:data-[position=start]:flex-row",
		],
		pane: "w-[var(--pane-width-size)] md:overflow-auto",
		contentWrapper: "flex min-w-px flex-col basis-0 grow shrink",
		content: "w-full mx-auto grow",
	},
	variants: {
		gap: {
			none: "",
			condensed: {
				header: "mb-4",
				footerWrapper: "mt-4",
				paneWrapper: [
					"max-md:data-[position=start]:mb-4 md:data-[position=start]:mr-4",
					"max-md:data-[position=end]:mt-4 md:data-[position=end]:ml-4",
				],
			},
			normal: {
				header: "mb-4 lg:mb-6",
				footerWrapper: "mt-4 lg:mt-6",
				paneWrapper: [
					"max-md:data-[position=start]:mb-4 md:data-[position=start]:mr-6",
					"max-md:data-[position=end]:mt-4 md:data-[position=end]:ml-6",
				],
			},
		},
		width: {
			full: {
				wrapper: "max-w-full",
				content: "max-w-full",
			},
			md: {
				wrapper: "max-w-3xl",
				content: "max-w-3xl",
			},
			lg: {
				wrapper: "max-w-5xl",
			},
			xl: {
				wrapper: "max-w-7xl",
				content: "max-w-7xl",
			},
		},
		paneWidth: {
			sm: {
				pane: "w-full md:w-60 lg:w-64",
			},
			md: {
				pane: "w-full md:w-64 lg:w-74",
			},
			lg: {
				pane: "w-full md:w-72 lg:w-80",
			},
		},
		spacing: {
			none: {},
			condensed: {
				wrapper: "p-4",
				header: "p-4",
				content: "p-4",
				pane: "p-4",
				footerContent: "p-4",
			},
			// 1.5rem
			normal: {
				wrapper: "p-4 md:p-6",
				header: "p-4 md:p-6",
				content: "p-4 md:p-6",
				pane: "p-4 md:p-6",
			},
		},
	},
	defaultVariants: {
		width: "xl",
		spacing: "normal",
		paneWidth: "md",
		gap: "normal",
	},
});

export type PageLayoutVariantProps = VariantProps<typeof pageLayout>;
