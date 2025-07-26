import { createContext, mergeRefs } from "@kopexa/react-utils";
import { callAllHandlers, cn, dataAttr } from "@kopexa/shared-utils";
import {
	type SlotsToClasses,
	type TableSlots,
	type TableVariantProps,
	table,
} from "@kopexa/theme";
import { useHover } from "@kopexa/use-hover";
import { type ComponentProps, useRef } from "react";

type TableProviderContextValue = {
	styles: ReturnType<typeof table>;
	onRowClick?: () => void;
};

const [Provider, useTableContext] = createContext<TableProviderContextValue>(
	{},
);

type TableOptions = {
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
		isSelectable,
		onRowClick,
		layout,
		fullWidth,
		overscroll,
		variant,
		bleed,
		classNames,
		...rest
	} = props;

	const styles = table({
		isSelectable,
		layout,
		fullWidth,
		variant,
		overscroll,
		bleed,
	});

	return (
		<Provider value={{ styles, onRowClick }}>
			<div className={styles.container({ className: classNames?.container })}>
				<div className={styles.wrapper({ className: classNames?.wrapper })}>
					<table
						className={styles.table({
							className: cn(className, classNames?.table),
						})}
						{...rest}
					>
						{children}
					</table>
				</div>
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
	hasSelect?: boolean;
	hasActions?: boolean;
};

export function TableRow(props: TableRowProps) {
	const {
		className,
		ref,
		isSelected = false,
		onClick,
		hasSelect,
		hasActions,
		...rest
	} = props;
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
				hasSelect,
				hasActions,
			})}
			ref={mergeRefs(innerRef, ref)}
			onClick={callAllHandlers(onRowClick, onClick)}
			{...rest}
		/>
	);
}

export type TableHeaderCellProps = ComponentProps<"th"> & {
	isSelectCell?: boolean;
	isActionCell?: boolean;
	isStickyCell?: boolean;
};

export function TableHeaderCell(props: TableHeaderCellProps) {
	const { className, isSelectCell, isActionCell, isStickyCell, ...rest } =
		props;
	const { styles } = useTableContext();

	return (
		<th
			data-slot="table-header-cell"
			className={styles.th({
				className,
				isSelectCell,
				isActionCell,
				isStickyCell,
			})}
			{...rest}
		/>
	);
}

export type TableCellProps = ComponentProps<"td"> & {
	isSelectCell?: boolean;
	isActionCell?: boolean;
	isStickyCell?: boolean;
};

export function TableCell(props: TableCellProps) {
	const { className, isSelectCell, isActionCell, isStickyCell, ...rest } =
		props;
	const { styles } = useTableContext();

	return (
		<td
			data-slot="table-cell"
			className={styles.td({
				className,
				isSelectCell,
				isActionCell,
				isStickyCell,
			})}
			{...rest}
		/>
	);
}
