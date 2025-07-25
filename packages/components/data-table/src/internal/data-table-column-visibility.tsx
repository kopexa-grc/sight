import { Button } from "@kopexa/button";
import { DropdownMenu } from "@kopexa/dropdown-menu";
import { CheckIcon, SettingsIcon } from "@kopexa/icons";
import { cn } from "@kopexa/shared-utils";
import { useMemo } from "react";
import { useDataTableContext } from "./data-table-context";

export const DataTableColumnVisibility = () => {
	const { instance } = useDataTableContext();

	const columns = useMemo(() => {
		const allColumns = instance.getAllColumns();
		// remove "select" and "action"
		return allColumns.filter(
			(column) => column.id !== "select" && column.id !== "action",
		);
	}, [instance]);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<Button size="sm" variant="outline">
					<SettingsIcon />
					View
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="bottom" align="start">
				{columns.map((column) => {
					return (
						<DropdownMenu.Item
							key={column.id}
							onClick={() => {
								column.toggleVisibility();
							}}
						>
							<CheckIcon
								className={cn(
									"mr-2",
									column.getIsVisible() ? "opacity-100" : "opacity-0",
								)}
							/>
							{column.columnDef.header?.toString()}
						</DropdownMenu.Item>
					);
				})}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	);
};
