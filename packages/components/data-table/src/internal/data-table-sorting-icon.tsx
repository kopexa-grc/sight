import { ArrowDown, ArrowDownUp, ArrowUp } from "@kopexa/icons";
import { cn } from "@kopexa/shared-utils";
import type { DataTableSortDirection } from "../types";

interface SortingIconProps {
	direction: DataTableSortDirection | false;
}

const DataTableSortingIcon = (props: SortingIconProps) => {
	const isAscending = props.direction === "asc";
	const isDescending = props.direction === "desc";

	const isSorted = isAscending || isDescending;

	if (!isSorted) {
		return (
			<ArrowDownUp
				size={16}
				className={cn("opacity-0 group-hover:opacity-100")}
			/>
		);
	}

	if (isAscending) {
		return <ArrowDown size={16} />;
	}

	return <ArrowUp size={16} />;
};
DataTableSortingIcon.displayName = "DataTable.SortingIcon";

export { DataTableSortingIcon };
export type { SortingIconProps };
