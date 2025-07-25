import { Heading, type HeadingProps } from "@kopexa/heading";
import { createContext } from "@kopexa/react-utils";
import { pageHeader } from "@kopexa/theme";
import type { ComponentProps } from "react";

type PageHeaderContextValue = {
	styles: ReturnType<typeof pageHeader>;
};

const [PageHeaderProvider, usePageHeaderContext] =
	createContext<PageHeaderContextValue>();

export type PageHeaderProps = ComponentProps<"div">;

// What do we want?
// Title and Actions should be on the same line
// Breadcrumbs should be above the title

const Root = (props: PageHeaderProps) => {
	const { className, children, ...rest } = props;

	const styles = pageHeader();

	return (
		<PageHeaderProvider value={{ styles }}>
			<div className={styles.root({ className })} data-slot="root" {...rest}>
				{children}
			</div>
		</PageHeaderProvider>
	);
};

type TitleAreaProps = ComponentProps<"div">;

export function TitleArea(props: TitleAreaProps) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="title-area"
			className={styles.titleArea({ className })}
			{...rest}
		/>
	);
}

export type PageHeaderTitleProps = HeadingProps;

function PageHeaderTitle(props: PageHeaderTitleProps) {
	const { className, level = "h2", ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<Heading className={styles.title({ className })} level={level} {...rest} />
	);
}

export type PageHeaderContextArea = ComponentProps<"div">;

export function PageHeaderContextArea(props: PageHeaderContextArea) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="context-area"
			className={styles.contextArea({ className })}
			{...rest}
		/>
	);
}

export type PageHeaderActionsProps = ComponentProps<"div">;

export function PageHeaderActions(props: PageHeaderActionsProps) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="action"
			className={styles.actions({ className })}
			{...rest}
		/>
	);
}

export type PageHeaderDescriptionProps = ComponentProps<"div">;

export function PageHeaderDescription(props: PageHeaderDescriptionProps) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="description"
			className={styles.description({ className })}
			{...rest}
		/>
	);
}

export type PageHeaderNavigationProps = ComponentProps<"div">;

export function PageHeaderNavigation(props: PageHeaderNavigationProps) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="navigation"
			className={styles.navigation({ className })}
			{...rest}
		/>
	);
}

export type PageHeaderLeadingVisualProps = ComponentProps<"div">;

export function PageHeaderLeadingVisual(props: PageHeaderLeadingVisualProps) {
	const { className, ...rest } = props;

	const { styles } = usePageHeaderContext();

	return (
		<div
			data-slot="leading-visual"
			className={styles.leadingVisual({ className })}
			{...rest}
		/>
	);
}

export const PageHeader = Object.assign(Root, {
	TitleArea,
	Title: PageHeaderTitle,
	ContextArea: PageHeaderContextArea,
	LeadingVisual: PageHeaderLeadingVisual,
	Description: PageHeaderDescription,
	Actions: PageHeaderActions,
	Navigation: PageHeaderNavigation,
});
