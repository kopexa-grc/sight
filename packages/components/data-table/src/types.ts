import type {
	AccessorFn,
	AccessorFnColumnDef,
	AccessorKeyColumnDef,
	CellContext,
	ColumnDef,
	ColumnSort,
	DeepKeys,
	DeepValue,
	DisplayColumnDef,
	HeaderContext,
	IdentifiedColumnDef,
	IdIdentifier,
	PaginationState,
	Row,
	RowData,
	RowSelectionState,
	SortDirection,
	StringHeaderIdentifier,
	StringOrTemplateHeader,
	VisibilityState,
} from "@tanstack/react-table";

export type DataTableSortDirection = SortDirection;
export type DataTableRowData = RowData;
export type DataTableRow<TData extends DataTableRowData> = Row<TData>;

export type DataTableSortingState = ColumnSort;
export type DataTablePaginationState = PaginationState;
export type DataTableRowSelectionState = RowSelectionState;
export type DataTableColumnVisibilityState = VisibilityState;

export interface DataTableHeaderContext<TData extends DataTableRowData, TValue>
	extends HeaderContext<TData, TValue> {}

export type DataTableSortableColumnDefMeta = {
	___sortMetaData?: DataTableSortableColumnDef;
};

export type DataTableAction<TData> = {
	label: string;
	onClick: (ctx: CellContext<TData, unknown>) => void;
	icon?: React.ReactNode;
};

export interface DataTableActionColumnDef<TData>
	extends Pick<DisplayColumnDef<TData>, "meta"> {
	actions:
		| DataTableAction<TData>[]
		| DataTableAction<TData>[][]
		| ((
				ctx: DataTableCellContext<TData, unknown>,
		  ) => DataTableAction<TData>[] | DataTableAction<TData>[][]);
}

export interface DataTableCellContext<TData extends DataTableRowData, TValue>
	extends CellContext<TData, TValue> {}

export type DataTableColumnDef<
	TData extends DataTableRowData,
	TValue = unknown,
> = ColumnDef<TData, TValue>;

type DataTableColumnIdentifiers<TData extends DataTableRowData, TValue> =
	| IdIdentifier<TData, TValue>
	| StringHeaderIdentifier;

export type DataTableDisplayColumnDef<
	TData extends DataTableRowData,
	TValue = unknown,
> = Pick<
	DisplayColumnDef<TData, TValue>,
	"meta" | "header" | "cell" | "minSize" | "maxSize" | "size"
> &
	DataTableColumnIdentifiers<TData, TValue>;

export interface DataTableSelectColumnDef<TData>
	extends Pick<DisplayColumnDef<TData>, "cell" | "header"> {}

export type DataTableSortableColumnDef = {
	/**
	 * The label to display in the sorting menu.
	 */
	sortLabel?: string;
	/**
	 * The label to display in the sorting menu when sorting in ascending order.
	 */
	sortAscLabel?: string;
	/**
	 * The label to display in the sorting menu when sorting in descending order.
	 */
	sortDescLabel?: string;
	/**
	 * Whether the column is sortable.
	 * @default false
	 */
	enableSorting?: boolean;
};

export interface DataTableIdentifiedColumnDef<
	TData extends DataTableRowData,
	TValue,
> extends Pick<
		IdentifiedColumnDef<TData, TValue>,
		"meta" | "header" | "cell" | "minSize" | "maxSize" | "size"
	> {
	id?: string;
	header?: StringOrTemplateHeader<TData, TValue>;
}

export type DataTableActionColumnDefMeta<TData> = {
	___actions?:
		| DataTableAction<TData>[]
		| DataTableAction<TData>[][]
		| ((ctx: DataTableCellContext<TData, unknown>) => DataTableAction<TData>[]);
};

export interface DataTableColumnHelper<TData> {
	/**
	 * Create a accessor column.
	 *
	 * @param accessor The accessor to create the column for.
	 * @param column The column to create for the accessor.
	 * @returns The created accessor.
	 */
	accessor: <
		TAccessor extends AccessorFn<TData> | DeepKeys<TData>,
		TValue extends TAccessor extends AccessorFn<TData, infer TReturn>
			? TReturn
			: TAccessor extends DeepKeys<TData>
				? DeepValue<TData, TAccessor>
				: never,
	>(
		accessor: TAccessor,
		column: TAccessor extends AccessorFn<TData>
			? DataTableDisplayColumnDef<TData, TValue> & DataTableSortableColumnDef
			: DataTableIdentifiedColumnDef<TData, TValue> &
					DataTableSortableColumnDef,
	) => TAccessor extends AccessorFn<TData>
		? AccessorFnColumnDef<TData, TValue>
		: AccessorKeyColumnDef<TData, TValue>;
	/**
	 * Create a display column.
	 *
	 * @param column The column to create the display for.
	 * @returns The created display column.
	 */
	display: (
		column: DataTableDisplayColumnDef<TData>,
	) => DisplayColumnDef<TData>;
	/**
	 * Create an action column.
	 *
	 * @param props The props to create the action column for.
	 * @returns The created action column.
	 */
	action: (
		props: DataTableActionColumnDef<TData>,
	) => DisplayColumnDef<TData, unknown>;
	/**
	 * Create a select column.
	 *
	 * @param props The props to create the select column for.
	 * @returns The created select column.
	 */
	select: (
		props?: DataTableSelectColumnDef<TData>,
	) => DisplayColumnDef<TData, unknown>;
}

export type DataTableFilteringState<
	T extends Record<string, unknown> = Record<string, unknown>,
> = {
	[K in keyof T]: T[K];
};

export type DataTableFilterType = "radio" | "select" | "date";
export type DataTableFilterOption<T = string> = {
	label: string;
	value: T;
};

interface DataTableBaseFilterProps {
	type: DataTableFilterType;
	label: string;
}

export interface DataTableRadioFilterProps extends DataTableBaseFilterProps {
	type: "radio";
	options: DataTableFilterOption[];
}

export interface DataTableSelectFilterProps extends DataTableBaseFilterProps {
	type: "select";
	options: DataTableFilterOption[];
}

export interface DataTableDateFilterProps extends DataTableBaseFilterProps {
	type: "date";
	/**
	 * The format of the date.
	 * @default "date"
	 */
	format?: "date" | "date-time";
	/**
	 * The label to display for the range option.
	 */
	rangeOptionLabel?: string;
	/**
	 * The label to display for the start of the range option.
	 */
	rangeOptionStartLabel?: string;
	/**
	 * The label to display for the end of the range option.
	 */
	rangeOptionEndLabel?: string;
	/**
	 * Whether to disable the range option.
	 */
	disableRangeOption?: boolean;
	/**
	 * A function to format the date value.
	 *
	 * @example
	 * ```tsx
	 * formatDateValue={(value) => value.toLocaleDateString()}
	 * ```
	 */
	formatDateValue?: (value: Date) => string;
	/**
	 * The options to display in the filter.
	 *
	 * @example
	 * ```tsx
	 * options: [
	 *   { label: "Today", value: { $gte: new Date().toISOString() } },
	 *   { label: "Yesterday", value: { $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString() } },
	 * ]
	 * ```
	 */
	options: DataTableFilterOption<DataTableDateComparisonOperator>[];
}

export type DataTableFilterProps =
	| DataTableRadioFilterProps
	| DataTableSelectFilterProps
	| DataTableDateFilterProps;

export type DataTableFilter<
	T extends DataTableFilterProps = DataTableFilterProps,
> = T & {
	id: string;
};

export type DataTableDateComparisonOperator = {
	EQ?: string;
	GTE?: string;
	GT?: string;
	LTE?: string;
};

export enum DataTableEmptyState {
	EMPTY = "EMPTY",
	FILTERED_EMPTY = "FILTERED_EMPTY",
	POPULATED = "POPULATED",
}
