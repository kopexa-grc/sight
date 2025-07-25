import {
	Avatar,
	Code,
	createDataTableColumnHelper,
	DataTable,
	type DataTableColumnVisibilityState,
	type DataTableProps,
	type DataTableRowSelectionState,
	type DataTableSortingState,
	useDataTable,
} from "@kopexa/sight";
import type { Meta } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { type Control, useControls } from "../../../query";

const queryClient = new QueryClient();

export default {
	title: "Components/DataTable",
	component: DataTable,
	decorators: [
		(Story) => {
			return (
				<QueryClientProvider client={queryClient}>
					<div className="mx-auto max-w-7xl py-10 w-full">
						<Story />
					</div>
				</QueryClientProvider>
			);
		},
	],
} as Meta<DataTableProps<Control>>;

const defaultProps = {};

const columnHelper = createDataTableColumnHelper<Control>();

const columns = [
	columnHelper.select(),
	columnHelper.accessor("id", {
		header: "ID",
		enableSorting: true,
	}),
	columnHelper.accessor("refCode", {
		header: "Reference Code",
		enableSorting: true,
		cell: (info) => <Code className="w-full">{info.getValue()}</Code>,
	}),
	columnHelper.accessor("name", {
		header: "Name",
		enableSorting: true,
	}),
	columnHelper.accessor("status", {
		header: "Status",
		enableSorting: true,
	}),
	columnHelper.accessor("owner.name", {
		header: "Owner",
		enableSorting: true,
		cell: (info) => (
			<div className="flex items-center gap-2">
				<Avatar
					name={info.getValue()}
					size="sm"
					className="border border-gray-300"
				/>
				{info.getValue()}
			</div>
		),
	}),
	columnHelper.accessor("chapter", {
		header: "Chapter",
		enableSorting: true,
	}),
	columnHelper.accessor("lastUpdated", {
		header: "Last Updated",
		enableSorting: true,
	}),
	columnHelper.accessor("scope", {
		header: "Scope",
		enableSorting: true,
	}),
	columnHelper.accessor("framework", {
		header: "Framework",
		enableSorting: true,
	}),
	columnHelper.accessor("createdAt", {
		header: "Created At",
		enableSorting: true,
	}),
	columnHelper.action({
		actions: (_ctx) => [
			[
				{
					label: "Edit",
					onClick: () => {},
				},
			],
		],
	}),
];

const Simple = () => {
	const [search, setSearch] = useState("");

	const { data, isPending } = useControls({
		first: 5,
		where: {
			nameContains: search ? search : undefined,
		},
	});

	const controls = data?.controls?.edges.map((edge) => edge.node) || [];
	const [visibleColumns, setVisibleColumns] =
		useState<DataTableColumnVisibilityState>({
			id: true,
			refCode: true,
			name: true,
			status: true,
		});
	const [rowSelection, setRowSelection] = useState<DataTableRowSelectionState>(
		{},
	);
	const [sorting, setSorting] = useState<DataTableSortingState | null>(null);

	const instance = useDataTable({
		columns,
		data: controls,
		getRowId: (product) => product.id,
		rowCount: controls.length,
		isLoading: isPending,
		search: {
			state: search,
			onSearchChange: setSearch,
		},
		rowSelection: {
			state: rowSelection,
			onRowSelectionChange: setRowSelection,
		},
		sorting: {
			state: sorting,
			onSortingChange: setSorting,
		},
		columnVisibility: {
			state: visibleColumns,
			onColumnVisibilityChange: setVisibleColumns,
		},
	});

	return (
		<div className="flex flex-col gap-4">
			<DataTable instance={instance}>
				<DataTable.Toolbar>
					<DataTable.Search />
				</DataTable.Toolbar>
				<DataTable.Table />
			</DataTable>
			<pre>{JSON.stringify(rowSelection, null, 2)}</pre>
			<pre>{JSON.stringify(sorting, null, 2)}</pre>
		</div>
	);
};

export const Default = {
	render: Simple,
	args: {
		...defaultProps,
	},
};
