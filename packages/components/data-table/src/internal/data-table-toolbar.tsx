import { DataTableColumnVisibility } from "./data-table-column-visibility";
import { useDataTableContext } from "./data-table-context";
import { DataTableFilterBar } from "./data-table-filter-bar";

interface DataTableToolbarTranslations {
	/**
	 * The label for the clear all filters button
	 * @default "Clear all"
	 */
	clearAll?: string;
}

interface DataTableToolbarProps {
	/**
	 * Additional classes to pass to the wrapper `div` of the component.
	 */
	className?: string;
	/**
	 * The children to show in the toolbar.
	 */
	children?: React.ReactNode;
	/**
	 * The translations of strings in the toolbar.
	 */
	translations?: DataTableToolbarTranslations;
}

/**
 * Toolbar shown for the data table.
 */
const DataTableToolbar = (props: DataTableToolbarProps) => {
	const { styles } = useDataTableContext();

	return (
		<div className={styles.toolbarWrapper()}>
			<div className={styles.toolbar({ className: props.className })}>
				{props.children}
			</div>
			<div>
				<DataTableFilterBar
					clearAllFiltersLabel={props.translations?.clearAll}
				/>

				<DataTableColumnVisibility />
			</div>
		</div>
	);
};

export { DataTableToolbar };
export type { DataTableToolbarProps, DataTableToolbarTranslations };
