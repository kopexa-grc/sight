import { createContext } from "@kopexa/react-utils";
import { cn, dataAttr } from "@kopexa/shared-utils";
import {
	type PageLayoutSlots,
	type PageLayoutVariantProps,
	pageLayout,
	type SlotsToClasses,
} from "@kopexa/theme";
import { Children, type ComponentProps, isValidElement, useMemo } from "react";

type PageLayoutContextValue = {
	styles: ReturnType<typeof pageLayout>;
	classNames?: SlotsToClasses<PageLayoutSlots>;
};

const [Provider, usePageLayoutContext] = createContext<PageLayoutContextValue>(
	{},
);

export type PageLayoutRootProps = ComponentProps<"div"> &
	PageLayoutVariantProps & {
		classNames?: SlotsToClasses<PageLayoutSlots>;
	};

export const PageLayoutRoot = (props: PageLayoutRootProps) => {
	const {
		children,
		width,
		spacing,
		paneWidth,
		gap,
		className,
		classNames,
		inModal,
		...rest
	} = props;

	const styles = useMemo(
		() => pageLayout({ width, spacing, paneWidth, gap, inModal }),
		[width, spacing, paneWidth, gap, inModal],
	);

	const header: React.ReactNode[] = [];
	const footer: React.ReactNode[] = [];
	const content: React.ReactNode[] = [];

	Children.forEach(children, (child) => {
		if (isValidElement(child)) {
			const type = getDisplayName(child);

			if (type === "PageLayoutHeader") {
				header.push(child);
			} else if (type === "PageLayoutFooter") {
				footer.push(child);
			} else {
				content.push(child);
			}
		} else {
			content.push(child);
		}
	});

	return (
		<Provider value={{ styles, classNames }}>
			<div
				className={styles.wrapper({
					className: cn(className, classNames?.wrapper),
					spacing,
					gap,
				})}
				{...rest}
			>
				{header}
				<div
					className={styles.baseContent({
						className: classNames?.baseContent,
					})}
				>
					{content}
				</div>
				{footer}
			</div>
		</Provider>
	);
};

export type PageLayoutHeaderProps = ComponentProps<"header"> & {
	spacing?: PageLayoutVariantProps["spacing"];
	gap?: PageLayoutVariantProps["gap"];
};

export const PageLayoutHeader = (props: PageLayoutHeaderProps) => {
	const { className, spacing, gap, ...rest } = props;

	const { styles, classNames } = usePageLayoutContext();

	return (
		<header
			className={styles.header({
				className: cn(className, classNames?.header),
				spacing,
				gap,
			})}
			{...rest}
		/>
	);
};

PageLayoutHeader.displayName = "PageLayoutHeader";

export type PageLayoutFooterProps = ComponentProps<"footer">;

export const PageLayoutFooter = (props: PageLayoutFooterProps) => {
	const { className, children, ...rest } = props;
	const { styles, classNames } = usePageLayoutContext();

	return (
		<footer
			className={styles.footerWrapper({
				className: cn(className, classNames?.footerWrapper),
			})}
			{...rest}
		>
			<div
				className={styles.footerContent({
					className: classNames?.footerContent,
				})}
			>
				{children}
			</div>
		</footer>
	);
};

PageLayoutFooter.displayName = "PageLayoutFooter";

export type PageLayoutPaneProps = ComponentProps<"div"> & {
	/**
	 * Position of the pane within the layout.
	 * - `start`: Pane is positioned at the start of the layout.
	 * - `end`: Pane is positioned at the end of the layout.
	 * @default `end`
	 */
	position?: "start" | "end";
	/**
	 * If true, the pane will be sticky at the top of the viewport.
	 * This is useful for keeping the pane visible while scrolling.
	 * @default false
	 */
	sticky?: boolean;
	spacing?: PageLayoutVariantProps["spacing"];
	gap?: PageLayoutVariantProps["gap"];
};

export function PageLayoutPane(props: PageLayoutPaneProps) {
	const {
		className,
		children,
		position = "end",
		sticky,
		spacing,
		gap,
		...rest
	} = props;
	const { styles, classNames } = usePageLayoutContext();

	return (
		<div
			className={styles.paneWrapper({
				className: cn(className, classNames?.paneWrapper),
				spacing,
				gap,
			})}
			data-position={position}
			data-sticky={dataAttr(sticky)}
			{...rest}
		>
			<div
				className={styles.pane({ spacing, gap, className: classNames?.pane })}
			>
				{children}
			</div>
		</div>
	);
}

export type PageLayoutContentProps = ComponentProps<"div"> & {
	spacing?: PageLayoutVariantProps["spacing"];
	gap?: PageLayoutVariantProps["gap"];
};

export function PageLayoutContent(props: PageLayoutContentProps) {
	const { className, children, spacing, gap, ...rest } = props;
	const { styles, classNames } = usePageLayoutContext();

	return (
		<div
			className={styles.contentWrapper({
				className: cn(className, classNames?.contentWrapper),
				spacing,
				gap,
			})}
			{...rest}
		>
			<div
				className={styles.content({
					spacing,
					gap,
					className: classNames?.content,
				})}
			>
				{children}
			</div>
		</div>
	);
}

function getDisplayName(el: React.ReactElement): string | undefined {
	// biome-ignore lint/suspicious/noExplicitAny: catching errors
	return (el.type as any)?.displayName ?? (el.type as any)?.name;
}

export type PageLayoutBleedProps = ComponentProps<"div">;

export function PageLayoutBleed({ className, ...rest }: PageLayoutBleedProps) {
	return (
		<div
			className={cn(className, "relative -mx-4 md:-mx-6 px-4 md:px-6")}
			{...rest}
		/>
	);
}
