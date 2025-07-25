import { cn } from "@kopexa/shared-utils";
import { Table } from "@kopexa/table";
import { flexRender } from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useDataTableContext } from "./data-table-context";
import { DataTableSortingIcon } from "./data-table-sorting-icon";

export const DataTableTable = () => {
	const { instance, styles } = useDataTableContext();

	const columns = instance.getAllColumns();

	const [showStickyBorder, setShowStickyBorder] = useState(false);
	const scrollableRef = useRef<HTMLDivElement>(null);

	const hasSelect: boolean =
		columns.find((c) => c.id === "select") !== undefined;
	const hasActions = columns.find((c) => c.id === "action") !== undefined;

	const handleHorizontalScroll = (e: React.UIEvent<HTMLDivElement>) => {
		const scrollLeft = e.currentTarget.scrollLeft;

		if (scrollLeft > 0) {
			setShowStickyBorder(true);
		} else {
			setShowStickyBorder(false);
		}
	};

	return (
		<div
			ref={scrollableRef}
			onScroll={handleHorizontalScroll}
			className={styles.wrapper()}
		>
			<Table.Root overscroll="horizontal" isSelectable>
				<Table.Head>
					{instance.getHeaderGroups().map((headerGroup) => (
						<Table.Row
							key={headerGroup.id}
							hasSelect={hasSelect}
							hasActions={hasActions}
						>
							{headerGroup.headers.map((header, idx) => {
								const canSort = header.column.getCanSort();
								const sortDirection = header.column.getIsSorted();
								const sortHandler = header.column.getToggleSortingHandler();

								const isActionHeader = header.id === "action";
								const isSelectHeader = header.id === "select";
								const isSpecialHeader = isActionHeader || isSelectHeader;

								const Wrapper = canSort ? "button" : "div";
								const isFirstColumn = hasSelect ? idx === 1 : idx === 0;

								return (
									<Table.HeaderCell
										key={header.id}
										className={cn(
											styles.th({
												isSelect: isSelectHeader,
												isAction: isActionHeader,
												isFirstColumn,
												showStickyBorder: showStickyBorder && isFirstColumn,
												isSticky: isFirstColumn || isSelectHeader,
											}),
											{
												"left-0":
													isSelectHeader || (isFirstColumn && !hasSelect),
												"left-[calc(20px+24px+24px)]":
													isFirstColumn && hasSelect,
											},
										)}
										style={
											!isSpecialHeader
												? {
														width: header.column.columnDef.size,
														maxWidth: header.column.columnDef.maxSize,
														minWidth: header.column.columnDef.minSize,
													}
												: undefined
										}
									>
										<Wrapper
											type={canSort ? "button" : undefined}
											onClick={canSort ? sortHandler : undefined}
											className={cn(
												"group w-fit flex cursor-default items-center gap-2",
												{
													"cursor-pointer": canSort,
												},
											)}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
											{canSort && (
												<DataTableSortingIcon direction={sortDirection} />
											)}
										</Wrapper>
									</Table.HeaderCell>
								);
							})}
						</Table.Row>
					))}
				</Table.Head>
				<Table.Body>
					{instance.getRowModel().rows.map((row) => (
						<Table.Row
							key={row.id}
							onClick={(e) => instance.onRowClick?.(e, row)}
						>
							{row.getVisibleCells().map((cell, idx) => {
								const isSelectCell = cell.column.id === "select";
								const isActionCell = cell.column.id === "action";
								const isFirstColumn = hasSelect ? idx === 1 : idx === 0;

								return (
									<Table.Cell
										key={cell.id}
										className={cn(
											styles.td({
												isSelect: isSelectCell,
												isAction: isActionCell,
												isFirstColumn,
												showStickyBorder: showStickyBorder && isFirstColumn,
												isSticky: isFirstColumn || isSelectCell,
											}),
											{
												"left-0": isSelectCell || (isFirstColumn && !hasSelect),
												"left-[calc(20px+24px+24px)]":
													isFirstColumn && hasSelect,
											},
										)}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Table.Cell>
								);
							})}
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};
