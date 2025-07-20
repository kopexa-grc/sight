import { createContext } from "@kopexa/react-utils";
import { dataAttr } from "@kopexa/shared-utils";
import { type PageLayoutVariantProps, pageLayout } from "@kopexa/theme";
import { Children, type ComponentProps, isValidElement, useMemo } from "react";

type PageLayoutContextValue = {
	styles: ReturnType<typeof pageLayout>;
};

const [Provider, usePageLayoutContext] = createContext<PageLayoutContextValue>(
	{},
);

export type PageLayoutRootProps = ComponentProps<"div"> &
	PageLayoutVariantProps;

export const PageLayoutRoot = (props: PageLayoutRootProps) => {
	const { children, width, spacing, paneWidth, gap, ...rest } = props;

	const styles = useMemo(
		() => pageLayout({ width, spacing, paneWidth, gap }),
		[width, spacing, paneWidth, gap],
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
		<Provider value={{ styles }}>
			<div {...rest}>
				<div className={styles.wrapper()}>
					{header}
					<div className={styles.baseContent()}>{content}</div>
					{footer}
				</div>
			</div>
		</Provider>
	);
};

export type PageLayoutHeaderProps = ComponentProps<"header">;

export const PageLayoutHeader = (props: PageLayoutHeaderProps) => {
	const { className, ...rest } = props;

	const { styles } = usePageLayoutContext();

	return <header className={styles.header({ className })} {...rest} />;
};

PageLayoutHeader.displayName = "PageLayoutHeader";

export type PageLayoutFooterProps = ComponentProps<"footer">;

export const PageLayoutFooter = (props: PageLayoutFooterProps) => {
	const { className, children, ...rest } = props;
	const { styles } = usePageLayoutContext();

	return (
		<footer className={styles.footerWrapper({ className })} {...rest}>
			<div className={styles.footerContent()}>{children}</div>
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
};

export function PageLayoutPane(props: PageLayoutPaneProps) {
	const { className, children, position = "end", sticky, ...rest } = props;
	const { styles } = usePageLayoutContext();

	return (
		<div
			className={styles.paneWrapper({ className })}
			data-position={position}
			data-sticky={dataAttr(sticky)}
			{...rest}
		>
			<div className={styles.pane()}>{children}</div>
		</div>
	);
}

export type PageLayoutContentProps = ComponentProps<"div">;

export function PageLayoutContent(props: PageLayoutContentProps) {
	const { className, children, ...rest } = props;
	const { styles } = usePageLayoutContext();

	return (
		<div className={styles.contentWrapper({ className })} {...rest}>
			<div className={styles.content()}>{children}</div>
		</div>
	);
}

function getDisplayName(el: React.ReactElement): string | undefined {
	// biome-ignore lint/suspicious/noExplicitAny: catching errors
	return (el.type as any)?.displayName ?? (el.type as any)?.name;
}
