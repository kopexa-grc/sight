import { dataTable } from "@kopexa/theme";
import type { ReactNode } from "react";
import { DataTableProvider } from "./internal/data-table-context";
import { DataTableSearch } from "./internal/data-table-search";
import { DataTableTable } from "./internal/data-table-table";
import { DataTableToolbar } from "./internal/data-table-toolbar";
import type { UseDataTableReturn } from "./use-data-table";

export type DataTableProps<TData> = {
	/**
	 * The instance returned by the `useDataTable` hook.
	 */
	instance: UseDataTableReturn<TData>;
	/**
	 * The children of the component.
	 */
	children?: ReactNode;
	/**
	 * Additional classes to pass to the wrapper `div` of the component.
	 */
	className?: string;
};

export const Root = <TData,>(props: DataTableProps<TData>) => {
	const { instance, children, ...rest } = props;

	const styles = dataTable();

	return (
		<DataTableProvider value={{ instance, styles }}>
			<div className={styles.base()} {...rest}>
				{children}
			</div>
		</DataTableProvider>
	);
};

const DataTable = Object.assign(Root, {
	Table: DataTableTable,
	Toolbar: DataTableToolbar,
	Search: DataTableSearch,
});

export { DataTable };
