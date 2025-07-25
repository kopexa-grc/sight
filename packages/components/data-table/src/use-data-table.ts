import {
	type ColumnFilter,
	type ColumnFiltersState,
	type ColumnSort,
	getCoreRowModel,
	type PaginationState,
	type RowSelectionState,
	type SortingState,
	type TableOptions,
	type Updater,
	useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	type DataTableColumnDef,
	type DataTableColumnVisibilityState,
	type DataTableDateComparisonOperator,
	DataTableEmptyState,
	type DataTableFilter,
	type DataTableFilteringState,
	type DataTableFilterOption,
	type DataTablePaginationState,
	type DataTableRow,
	type DataTableRowSelectionState,
	type DataTableSortingState,
} from "./types";

interface DataTableOptions<TData>
	extends Pick<TableOptions<TData>, "data" | "getRowId"> {
	/**
	 * The columns to use for the table.
	 */

	// biome-ignore lint/suspicious/noExplicitAny: deep.
	columns: DataTableColumnDef<TData, any>[];
	/**
	 * The filters which the user can apply to the table.
	 */
	filters?: DataTableFilter[];
	/**
	 * Whether the data for the table is currently being loaded.
	 */
	isLoading?: boolean;
	/**
	 * The state and callback for the sorting.
	 */
	sorting?: {
		state: DataTableSortingState | null;
		onSortingChange: (state: DataTableSortingState) => void;
	};
	/**
	 * The state and callback for the pagination.
	 */
	pagination?: {
		state: DataTablePaginationState;
		onPaginationChange: (state: DataTablePaginationState) => void;
	};
	/**
	 * The function to execute when a row is clicked.
	 */
	onRowClick?: (
		event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
		row: TData,
	) => void;
	/**
	 * The state and callback for the row selection.
	 */
	rowSelection?: {
		state: DataTableRowSelectionState;
		onRowSelectionChange: (state: DataTableRowSelectionState) => void;
		enableRowSelection?:
			| boolean
			| ((row: DataTableRow<TData>) => boolean)
			| undefined;
	};
	/**
	 * The state and callback for the column visibility.
	 */
	columnVisibility?: {
		state: DataTableColumnVisibilityState;
		onColumnVisibilityChange: (state: DataTableColumnVisibilityState) => void;
	};
	/**
	 * The total count of rows. When working with pagination, this will be the total
	 * number of rows available, not the number of rows currently being displayed.
	 */
	rowCount?: number;
	/**
	 * Whether the page index should be reset the filtering, sorting, or pagination changes.
	 *
	 * @default true
	 */
	autoResetPageIndex?: boolean;
	/**
	 * The state and callback for the filtering.
	 */
	filtering?: {
		state: DataTableFilteringState;
		onFilteringChange: (state: DataTableFilteringState) => void;
	};
	/**
	 * The state and callback for the search, with optional debounce.
	 */
	search?: {
		state: string;
		onSearchChange: (state: string) => void;
		/**
		 * Debounce time in milliseconds for the search callback.
		 * @default 300
		 */
		debounce?: number;
	};
}

export const useDataTable = <TData>({
	isLoading,
	sorting,
	pagination,
	rowSelection,
	rowCount,
	autoResetPageIndex = true,
	filtering,
	onRowClick,
	filters,
	search,
	...options
}: DataTableOptions<TData>) => {
	const { state: columnVisibilityState, onColumnVisibilityChange } =
		options.columnVisibility ?? {};
	const { state: sortingState, onSortingChange } = sorting ?? {};
	const {
		state: rowSelectionState,
		onRowSelectionChange,
		enableRowSelection,
	} = rowSelection ?? {};
	const { state: filteringState, onFilteringChange } = filtering ?? {};
	const { state: paginationState, onPaginationChange } = pagination ?? {};
	const { state: searchState, onSearchChange, debounce = 300 } = search ?? {};
	const [localSearch, setLocalSearch] = useState(searchState ?? "");
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		setLocalSearch(searchState ?? "");
	}, [searchState]);

	const getSearch = useCallback(() => {
		return localSearch;
	}, [localSearch]);

	const autoResetPageIndexHandler = useCallback(() => {
		return autoResetPageIndex
			? () =>
					paginationState &&
					onPaginationChange?.({ ...paginationState, pageIndex: 0 })
			: undefined;
	}, [autoResetPageIndex, paginationState, onPaginationChange]);

	const debouncedSearchChange = useMemo(() => {
		if (!onSearchChange) {
			return undefined;
		}

		return (value: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			if (debounce <= 0) {
				autoResetPageIndexHandler()?.();
				onSearchChange(value);
				return;
			}

			timeoutRef.current = setTimeout(() => {
				autoResetPageIndexHandler()?.();
				onSearchChange(value);
			}, debounce);
		};
	}, [onSearchChange, debounce, autoResetPageIndexHandler]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const onSearchChangeHandler = useCallback(
		(search: string) => {
			setLocalSearch(search);
			debouncedSearchChange?.(search);
		},
		[debouncedSearchChange],
	);

	const sortingStateHandler = useCallback(() => {
		return onSortingChange
			? (updaterOrValue: Updater<SortingState>) => {
					autoResetPageIndexHandler()?.();
					onSortingChangeTransformer(
						onSortingChange,
						sortingState,
					)(updaterOrValue);
				}
			: undefined;
	}, [onSortingChange, sortingState, autoResetPageIndexHandler]);

	const rowSelectionStateHandler = useCallback(() => {
		return onRowSelectionChange
			? (updaterOrValue: Updater<RowSelectionState>) => {
					onRowSelectionChangeTransformer(
						onRowSelectionChange,
						rowSelectionState,
					)(updaterOrValue);
				}
			: undefined;
	}, [onRowSelectionChange, rowSelectionState]);

	const paginationStateHandler = useCallback(() => {
		return onPaginationChange
			? onPaginationChangeTransformer(onPaginationChange, paginationState)
			: undefined;
	}, [onPaginationChange, paginationState]);

	const filteringStateHandler = useCallback(() => {
		return onFilteringChange
			? (updaterOrValue: Updater<ColumnFiltersState>) => {
					autoResetPageIndexHandler()?.();
					onFilteringChangeTransformer(
						onFilteringChange,
						filteringState,
					)(updaterOrValue);
				}
			: undefined;
	}, [onFilteringChange, filteringState, autoResetPageIndexHandler]);

	const columnVisibilityStateHandler = useCallback(() => {
		return onColumnVisibilityChange
			? (updaterOrValue: Updater<DataTableColumnVisibilityState>) => {
					onColumnVisibilityChange(
						typeof updaterOrValue === "function"
							? updaterOrValue(columnVisibilityState ?? {})
							: updaterOrValue,
					);
				}
			: undefined;
	}, [onColumnVisibilityChange, columnVisibilityState]);

	const instance = useReactTable({
		...options,
		getCoreRowModel: getCoreRowModel(),
		state: {
			rowSelection: rowSelectionState ?? {},
			sorting: sortingState ? [sortingState] : undefined,
			columnFilters: Object.entries(filteringState ?? {}).map(
				([id, filter]) => ({
					id,
					value: filter,
				}),
			),
			pagination: paginationState,
			columnVisibility: columnVisibilityState ?? {},
		},
		enableRowSelection,
		rowCount,
		onColumnFiltersChange: filteringStateHandler(),
		onRowSelectionChange: rowSelectionStateHandler(),
		onSortingChange: sortingStateHandler(),
		onPaginationChange: paginationStateHandler(),
		onColumnVisibilityChange: columnVisibilityStateHandler(),
		manualSorting: true,
		manualPagination: true,
		manualFiltering: true,
	});

	const getSorting = useCallback(() => {
		return instance.getState().sorting?.[0] ?? null;
	}, [instance]);

	const setSorting = useCallback(
		(
			sortingOrUpdater: ColumnSort | ((prev: ColumnSort | null) => ColumnSort),
		) => {
			const currentSort = instance.getState().sorting?.[0] ?? null;
			const newSorting =
				typeof sortingOrUpdater === "function"
					? sortingOrUpdater(currentSort)
					: sortingOrUpdater;

			autoResetPageIndexHandler()?.();
			instance.setSorting([newSorting]);
		},
		[instance, autoResetPageIndexHandler],
	);

	const getFilters = useCallback(() => {
		return filters ?? [];
	}, [filters]);

	const getFilterOptions = useCallback(
		<T extends string | string[] | DataTableDateComparisonOperator>(
			id: string,
		) => {
			const filter = getFilters().find((filter) => filter.id === id);

			if (!filter) {
				return null;
			}

			return filter.options as DataTableFilterOption<T>[];
		},
		[getFilters],
	);

	const getFilterMeta = useCallback(
		(id: string) => {
			return getFilters().find((filter) => filter.id === id) || null;
		},
		[getFilters],
	);

	const getFiltering = useCallback(() => {
		const state = instance.getState().columnFilters ?? [];
		return Object.fromEntries(state.map((filter) => [filter.id, filter.value]));
	}, [instance]);

	const addFilter = useCallback(
		(filter: ColumnFilter) => {
			if (filter.value) {
				autoResetPageIndexHandler()?.();
			}
			onFilteringChange?.({ ...getFiltering(), [filter.id]: filter.value });
		},
		[onFilteringChange, getFiltering, autoResetPageIndexHandler],
	);

	const removeFilter = useCallback(
		(id: string) => {
			const currentFilters = getFiltering();
			delete currentFilters[id];
			autoResetPageIndexHandler()?.();
			onFilteringChange?.(currentFilters);
		},
		[onFilteringChange, getFiltering, autoResetPageIndexHandler],
	);

	const clearFilters = useCallback(() => {
		autoResetPageIndexHandler()?.();
		onFilteringChange?.({});
	}, [onFilteringChange, autoResetPageIndexHandler]);

	const updateFilter = useCallback(
		(filter: ColumnFilter) => {
			addFilter(filter);
		},
		[addFilter],
	);

	const getRowSelection = useCallback(() => {
		return instance.getState().rowSelection;
	}, [instance]);

	const rows = instance.getRowModel().rows;

	const emptyState = useMemo(() => {
		const hasRows = rows.length > 0;
		const hasSearch = Boolean(searchState);
		const hasFilters = Object.keys(filteringState ?? {}).length > 0;

		if (hasRows) {
			return DataTableEmptyState.POPULATED;
		}

		if (hasSearch || hasFilters) {
			return DataTableEmptyState.FILTERED_EMPTY;
		}

		return DataTableEmptyState.EMPTY;
	}, [rows, searchState, filteringState]);

	const showSkeleton = useMemo(() => {
		return isLoading === true && rows.length === 0;
	}, [isLoading, rows]);

	const enablePagination: boolean = !!pagination;
	const enableFiltering: boolean = !!filtering;
	const enableSorting: boolean = !!sorting;
	const enableSearch: boolean = !!search;

	return {
		// Table
		getHeaderGroups: instance.getHeaderGroups,
		getRowModel: instance.getRowModel,
		getAllColumns: instance.getAllColumns,
		// Pagination
		enablePagination,
		getCanNextPage: instance.getCanNextPage,
		getCanPreviousPage: instance.getCanPreviousPage,
		nextPage: instance.nextPage,
		previousPage: instance.previousPage,
		getPageCount: instance.getPageCount,
		pageIndex: instance.getState()?.pagination?.pageIndex ?? 0,
		pageSize: instance.getState()?.pagination?.pageSize ?? 10,
		rowCount,
		// Search
		enableSearch,
		getSearch,
		onSearchChange: onSearchChangeHandler,
		// Sorting
		enableSorting,
		getSorting,
		setSorting,
		// Filtering
		enableFiltering,
		getFilters,
		getFilterOptions,
		getFilterMeta,
		getFiltering,
		addFilter,
		removeFilter,
		clearFilters,
		updateFilter,
		// commands
		getRowSelection,
		// Handlers
		onRowClick,
		// Empty State
		emptyState,
		// Loading
		isLoading,
		showSkeleton,
	};
};

export type UseDataTableReturn<TData> = ReturnType<typeof useDataTable<TData>>;

function onRowSelectionChangeTransformer(
	onRowSelectionChange: (state: RowSelectionState) => void,
	state?: RowSelectionState,
) {
	return (updaterOrValue: Updater<RowSelectionState>) => {
		const value =
			typeof updaterOrValue === "function"
				? updaterOrValue(state ?? {})
				: updaterOrValue;

		onRowSelectionChange(value);
	};
}

function onSortingChangeTransformer(
	onSortingChange: (state: ColumnSort) => void,
	state?: ColumnSort | null,
) {
	return (updaterOrValue: Updater<SortingState>) => {
		const value =
			typeof updaterOrValue === "function"
				? updaterOrValue(state ? [state] : [])
				: updaterOrValue;
		const columnSort = value[0];

		onSortingChange(columnSort);
	};
}

function onPaginationChangeTransformer(
	onPaginationChange: (state: PaginationState) => void,
	state?: PaginationState,
) {
	return (updaterOrValue: Updater<PaginationState>) => {
		const value =
			typeof updaterOrValue === "function"
				? updaterOrValue(state ?? { pageIndex: 0, pageSize: 10 })
				: updaterOrValue;

		onPaginationChange(value);
	};
}

function onFilteringChangeTransformer(
	onFilteringChange: (state: DataTableFilteringState) => void,
	state?: DataTableFilteringState,
) {
	return (updaterOrValue: Updater<ColumnFiltersState>) => {
		const value =
			typeof updaterOrValue === "function"
				? updaterOrValue(
						Object.entries(state ?? {}).map(([id, filter]) => ({
							id,
							value: filter,
						})),
					)
				: updaterOrValue;

		const transformedValue = Object.fromEntries(
			value.map((filter) => [filter.id, filter]),
		);

		onFilteringChange(transformedValue);
	};
}
