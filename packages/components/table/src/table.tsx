import { createContext, mergeRefs } from "@kopexa/react-utils";
import { callAllHandlers, dataAttr } from "@kopexa/shared-utils";
import {
	type SlotsToClasses,
	type TableSlots,
	type TableVariantProps,
	table,
} from "@kopexa/theme";
import { useHover } from "@kopexa/use-hover";
import { type ComponentProps, type ReactNode, useRef } from "react";

type TableProviderContextValue = {
	styles: ReturnType<typeof table>;
	onRowClick?: () => void;
};

const [Provider, useTableContext] = createContext<TableProviderContextValue>(
	{},
);

type TableContentPlacement = "inside" | "outside";

type TableOptions = {
	/**
	 * Where to place the `topContent` component.
	 * @default "inside"
	 */
	topContentPlacement?: TableContentPlacement;
	/**
	 * Provides content to include a component in the top of the table.
	 */
	topContent?: ReactNode;
	/**
	 * Where to place the `bottomContent` component.
	 * @default "inside"
	 */
	bottomContentPlacement?: TableContentPlacement;
	/**
	 * Provides content to include a component in the bottom of the table.
	 */
	bottomContent?: ReactNode;
	/**
	 * Classname or List of classes to change the classNames of the element.
	 * if `className` is passed, it will be added to the base slot.
	 */
	classNames?: SlotsToClasses<TableSlots>;
	/**
	 * Fires when a user selects a row.
	 * @default undefined
	 */
	onRowClick?: () => void;
};

export interface TableRootProps
	extends Omit<ComponentProps<"table">, "color" | "size">,
		TableOptions,
		TableVariantProps {}

export const TableRoot = (props: TableRootProps) => {
	const {
		className,
		children,
		topContent,
		topContentPlacement = "inside",
		bottomContentPlacement = "inside",
		bottomContent,
		isSelectable,
		onRowClick,
		...rest
	} = props;

	const styles = table({
		className,
		isSelectable,
	});

	return (
		<Provider value={{ styles, onRowClick }}>
			<div data-slot="table-base" className={styles.base()}>
				{topContentPlacement === "outside" && topContent}
				<div className={styles.wrapper()}>
					{topContentPlacement === "inside" && topContent}
					<table className={styles.table()} {...rest}>
						{children}
					</table>
					{bottomContentPlacement === "inside" && bottomContent}
				</div>
				{bottomContentPlacement === "outside" && bottomContent}
			</div>
		</Provider>
	);
};

export type TableHeadProps = ComponentProps<"thead">;

export function TableHead(props: TableHeadProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<thead
			data-slot="table-head"
			className={styles.thead({
				className,
			})}
			{...rest}
		/>
	);
}

export type TableBodyProps = ComponentProps<"tbody">;

export function TableBody(props: TableBodyProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<tbody
			data-slot="table-body"
			className={styles.tbody({
				className,
			})}
			{...rest}
		/>
	);
}

export type TableRowProps = ComponentProps<"tr"> & {
	isSelected?: boolean;
};

export function TableRow(props: TableRowProps) {
	const { className, ref, isSelected = false, onClick, ...rest } = props;
	const { styles, onRowClick } = useTableContext();
	const innerRef = useRef<HTMLTableRowElement>(null);

	const isHover = useHover(innerRef);

	return (
		<tr
			data-slot="table-row"
			data-hover={dataAttr(isHover)}
			aria-selected={isSelected}
			className={styles.tr({
				className,
			})}
			ref={mergeRefs(innerRef, ref)}
			onClick={callAllHandlers(onRowClick, onClick)}
			{...rest}
		/>
	);
}

export type TableHeaderCellProps = ComponentProps<"th">;

export function TableHeaderCell(props: TableHeaderCellProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<th
			data-slot="table-header-cell"
			className={styles.th({
				className,
			})}
			{...rest}
		/>
	);
}

export type TableCellProps = ComponentProps<"td">;

export function TableCell(props: TableCellProps) {
	const { className, ...rest } = props;
	const { styles } = useTableContext();

	return (
		<td
			data-slot="table-cell"
			className={styles.td({
				className,
			})}
			{...rest}
		/>
	);
}
