import { tv, type VariantProps } from "tailwind-variants";

export const pageLayout = tv({
	slots: {
		root: "",
		wrapper: "flex mx-auto flex-wrap w-full",
		baseContent: "flex flex-1 flex-wrap max-w-full",
		header: "w-full grow-0 shrink-0",
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
		content: "w-full mx-auto grow h-full",
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
				header: "mb-2 lg:mb-3",
				footerWrapper: "mt-2 lg:mt-3",
				paneWrapper: [
					"max-md:data-[position=start]:mb-2 md:data-[position=start]:mr-3",
					"max-md:data-[position=end]:mt-2 md:data-[position=end]:ml-3",
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
				wrapper: "max-w-8xl",
				content: "max-w-8xl",
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
				wrapper: "p-2 md:p-3",
				header: "p-2 md:p-3",
				content: "p-2 md:p-3",
				pane: "p-2 md:p-3",
				footerContent: "p-2 md:p-3",
			},
		},
		inModal: {
			true: {
				wrapper: "overflow-auto flex-1 min-h-0 flex-col",
				baseContent: "min-h-0",
				header: "shrink grow-0",
				contentWrapper: "grow shrink-0",
			},
		},
	},
	defaultVariants: {
		width: "xl",
		spacing: "normal",
		paneWidth: "lg",
		gap: "normal",
	},
});

export type PageLayoutVariantProps = VariantProps<typeof pageLayout>;
export type PageLayoutSlots = keyof ReturnType<typeof pageLayout>;
