import { Avatar, Code, Table } from "@kopexa/sight";
import { table } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";
import { Chip } from "../../../../../components/chip/src/chip";

export default {
	title: "Components/Table",
	component: Table.Root,
	argTypes: {
		isSelectable: {
			control: {
				type: "boolean",
			},
			description: "Enable row selection",
		},
	},
	decorators: [
		(Story) => (
			<div className="mx-auto m-10 max-w-7xl">
				<Story />
			</div>
		),
	],
} as Meta<Table.RootProps>;

const defaultProps = {
	...table.defaultVariants,
};

const owners = [
	{ name: "Alice" },
	{ name: "Bob" },
	{ name: "Charlie" },
	{ name: "Diana" },
];
const chapters = [
	"Kapitel 1: Organisation",
	"Kapitel 2: Technik",
	"Kapitel 3: Prozesse",
];
const demoData = Array.from({ length: 20 }, (_, i) => {
	const owner = owners[i % owners.length];
	const chapter = chapters[Math.floor(i / 7)];
	return {
		id: `CTRL-${1000 + i}`,
		name: `Control ${i + 1}`,
		status: ["Implemented", "Planned", "In Review", "Not Started"][i % 4],
		owner,
		lastUpdated: `2025-07-${(i % 28) + 1}`,
		reference: `ISO-27001-A.${(i % 10) + 1}`,
		chapter,
	};
});

const statusColor = {
	Implemented: "success",
	Planned: "primary",
	"In Review": "warning",
	"Not Started": "info",
} as const;
function getStatusColor(status: string) {
	return statusColor[status as keyof typeof statusColor] || "default";
}

const Template = (args: Table.RootProps) => {
	let lastChapter: string | undefined;

	const [selectedRows, setSelectedRows] = useState<string[]>([]);

	const handleRowSelection = (rowId: string) => {
		setSelectedRows((prevSelected) =>
			prevSelected.includes(rowId)
				? prevSelected.filter((id) => id !== rowId)
				: [...prevSelected, rowId],
		);
	};

	return (
		<Table.Root {...args}>
			<Table.Head>
				<Table.Row>
					<Table.HeaderCell className="w-10">
						<input
							type="checkbox"
							checked={selectedRows.length === demoData.length}
							onChange={(e) => {
								if (e.target.checked) {
									setSelectedRows(demoData.map((row) => row.id));
								} else {
									setSelectedRows([]);
								}
							}}
						/>
					</Table.HeaderCell>
					<Table.HeaderCell className="w-[120px]">ID</Table.HeaderCell>
					<Table.HeaderCell className="w-[150px]">Reference</Table.HeaderCell>
					<Table.HeaderCell>Name</Table.HeaderCell>
					<Table.HeaderCell className="w-[180px]">Status</Table.HeaderCell>
					<Table.HeaderCell>Owner</Table.HeaderCell>
					<Table.HeaderCell className="w-[150px]">
						Last Updated
					</Table.HeaderCell>
				</Table.Row>
			</Table.Head>
			<Table.Body>
				{demoData.map((row) => {
					const groupRow =
						row.chapter !== lastChapter ? (
							<Table.Row key={`group-${row.chapter}`} className="bg-muted">
								<Table.Cell colSpan={7}>{row.chapter}</Table.Cell>
							</Table.Row>
						) : null;
					lastChapter = row.chapter;
					return (
						<>
							{groupRow}
							<Table.Row
								key={row.id}
								isSelected={selectedRows.includes(row.id)}
								onClick={() => handleRowSelection(row.id)}
							>
								<Table.Cell className="w-10">
									<input
										type="checkbox"
										checked={selectedRows.includes(row.id)}
										onChange={(e) => {
											const newSelectedRows = e.target.checked
												? [...selectedRows, row.id]
												: selectedRows.filter((id) => id !== row.id);
											setSelectedRows(newSelectedRows);
										}}
									/>
								</Table.Cell>
								<Table.Cell>
									<Code className="uppercase">{row.id}</Code>
								</Table.Cell>
								<Table.Cell>
									<Chip size="sm">{row.reference}</Chip>
								</Table.Cell>
								<Table.Cell>
									<span>{row.name}</span>
								</Table.Cell>
								<Table.Cell>
									<Chip
										indicator
										indicatorColor={getStatusColor(row.status)}
										size="md"
									>
										{row.status}
									</Chip>
								</Table.Cell>
								<Table.Cell>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "0.5rem",
										}}
									>
										<Avatar name={row.owner.name} size="sm" />
										<span>{row.owner.name}</span>
									</div>
								</Table.Cell>
								<Table.Cell>{row.lastUpdated}</Table.Cell>
							</Table.Row>
						</>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
};

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
