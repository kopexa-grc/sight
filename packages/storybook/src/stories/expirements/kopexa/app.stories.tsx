import { faker } from "@faker-js/faker";
import {
	ChevronRightIcon,
	PlusIcon,
	UploadIcon,
	VendorIcon,
} from "@kopexa/icons";
import {
	Avatar,
	Button,
	PageHeader,
	PageLayout,
	RiskIndicator,
	SearchInput,
	SidebarProvider,
	Table,
	TabNav,
	Tabs,
} from "@kopexa/sight";
import { useState } from "react";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

const meta = {
	title: "Experiments/App/Vendors",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		// @ts-ignore
		(Story) => (
			<SidebarProvider>
				<Story />
			</SidebarProvider>
		),
	],
};

export default meta;

// Define vendor types
type RiskLevel = "none" | "low" | "medium" | "high";

interface VendorOwner {
	name: string;
	email: string;
	avatar?: string;
}

interface Vendor {
	id: string;
	name: string;
	riskLevel: RiskLevel;
	lastAudit: string | null;
	owner: VendorOwner | null;
}

// Generate mock data
const generateMockVendors = (count: number): Vendor[] => {
	return Array.from({ length: count }).map(() => {
		const riskLevel: RiskLevel = faker.helpers.arrayElement([
			"none",
			"low",
			"medium",
			"high",
		]);

		// Some vendors might not have an owner or last audit date
		const hasOwner = faker.datatype.boolean(0.8); // 80% chance to have an owner
		const hasAuditDate = faker.datatype.boolean(0.7); // 70% chance to have an audit date

		return {
			id: faker.string.uuid(),
			name: faker.company.name(),
			riskLevel,
			lastAudit: hasAuditDate
				? faker.date.past({ years: 2 }).toISOString().split("T")[0]
				: null,
			owner: hasOwner
				? {
						name: faker.person.fullName(),
						email: faker.internet.email(),
						avatar: faker.image.avatar(),
					}
				: null,
		};
	});
};

// Group vendors by risk level
const groupVendorsByRiskLevel = (vendors: Vendor[]) => {
	const groups: Record<RiskLevel, Vendor[]> = {
		none: [],
		low: [],
		medium: [],
		high: [],
	};

	vendors.forEach((vendor) => {
		groups[vendor.riskLevel].push(vendor);
	});

	return groups;
};

// Generate 20 mock vendors
const mockVendors = generateMockVendors(20);
const groupedVendors = groupVendorsByRiskLevel(mockVendors);

export const Vendors = () => {
	const [search, setSearch] = useState("");
	const [riskLevel, setRiskLevel] = useState<RiskLevel | "all">("all");

	const handleTabChange = (value: string | "all") => {
		setRiskLevel(value as RiskLevel | "all");
		setSearch(""); // Reset search when changing tabs + additional filters, if any
	};

	return (
		<AppSidebar>
			<PageLayout.Root width="full">
				<PageLayout.Header spacing="normal">
					<PageHeader>
						<PageHeader.TitleArea>
							<PageHeader.Title>Vendor Directory</PageHeader.Title>
						</PageHeader.TitleArea>
						<PageHeader.Actions>
							<Button variant="ghost" startContent={<UploadIcon />}>
								Import CSV
							</Button>
							<Button startContent={<PlusIcon />}>Add Vendor</Button>
						</PageHeader.Actions>
						<PageHeader.Navigation>
							<TabNav className="-mx-4 md:-mx-6 px-4 md:px-6">
								<TabNav.Link active>
									<VendorIcon />
									All Vendors
								</TabNav.Link>
							</TabNav>
						</PageHeader.Navigation>
					</PageHeader>
				</PageLayout.Header>
				<PageLayout.Content>
					<Tabs
						value={riskLevel}
						onValueChange={handleTabChange}
						className="w-full"
					>
						<Tabs.List className="w-full mb-4">
							<Tabs.Trigger value="all" className="px-4">
								All Vendors
							</Tabs.Trigger>
							<Tabs.Trigger value="needs-details" className="px-4">
								<RiskIndicator level="none" size="sm" />
								Needs Details
							</Tabs.Trigger>
							<Tabs.Trigger value="high-risk" className="px-4">
								<RiskIndicator level="high" size="sm" />
								High Risk
							</Tabs.Trigger>
							<Tabs.Trigger value="medium-risk" className="px-4">
								<RiskIndicator level="medium" size="sm" />
								Medium Risk
							</Tabs.Trigger>
							<Tabs.Trigger value="low-risk" className="px-4">
								<RiskIndicator level="low" size="sm" />
								Low Risk
							</Tabs.Trigger>
						</Tabs.List>
						<div className="mb-4">
							<div className="max-w-sm">
								<SearchInput onValueChange={setSearch} />
							</div>
						</div>
						<Tabs.Content value="all">
							<GroupedVendorsTable vendors={mockVendors} searchQuery={search} />
						</Tabs.Content>
						<Tabs.Content value="needs-details" className="flow-root">
							<FilteredVendorsTable
								vendors={groupedVendors.none}
								searchQuery={search}
							/>
						</Tabs.Content>
						<Tabs.Content value="high-risk">
							<FilteredVendorsTable
								vendors={groupedVendors.high}
								searchQuery={search}
							/>
						</Tabs.Content>
						<Tabs.Content value="medium-risk">
							<FilteredVendorsTable
								vendors={groupedVendors.medium}
								searchQuery={search}
							/>
						</Tabs.Content>
						<Tabs.Content value="low-risk">
							<FilteredVendorsTable
								vendors={groupedVendors.low}
								searchQuery={search}
							/>
						</Tabs.Content>
					</Tabs>
				</PageLayout.Content>
			</PageLayout.Root>
		</AppSidebar>
	);
};

interface VendorTableProps {
	vendors: Vendor[];
	searchQuery: string;
}

const filterVendorsBySearch = (
	vendors: Vendor[],
	searchQuery: string,
): Vendor[] => {
	if (!searchQuery.trim()) return vendors;

	const query = searchQuery.toLowerCase();
	return vendors.filter(
		(vendor) =>
			vendor.name.toLowerCase().includes(query) ||
			vendor.owner?.name.toLowerCase().includes(query) ||
			false ||
			vendor.owner?.email.toLowerCase().includes(query) ||
			false,
	);
};

const GroupedVendorsTable = ({ vendors, searchQuery }: VendorTableProps) => {
	const filteredVendors = filterVendorsBySearch(vendors, searchQuery);
	const groupedVendors = groupVendorsByRiskLevel(filteredVendors);

	// Check if we have any results at all
	const totalResults = Object.values(groupedVendors).reduce(
		(sum, group) => sum + group.length,
		0,
	);

	if (totalResults === 0 && searchQuery) {
		return (
			<div className="py-8 text-center text-muted-foreground border-t">
				No vendors match your search "{searchQuery}"
			</div>
		);
	}

	return (
		<Table.Root bleed variant="grid" layout="fixed" className="border-t">
			<VendorTableHead />
			<Table.Body>
				{/* Needs details section */}
				<Table.Row>
					<Table.Cell
						className="bg-muted text-muted-foreground min-h-[50px]"
						colSpan={4}
					>
						<div className="flex items-center gap-2">
							<RiskIndicator level="none" size="sm" />
							<span className="font-medium">Needs details</span> (
							{groupedVendors.none.length})
						</div>
					</Table.Cell>
				</Table.Row>
				{groupedVendors.none.length > 0 ? (
					groupedVendors.none.map((vendor) => (
						<VendorCell key={vendor.id} vendor={vendor} />
					))
				) : searchQuery ? (
					<Table.Row>
						<Table.Cell
							colSpan={4}
							className="py-4 text-center text-muted-foreground"
						>
							No results match your search
						</Table.Cell>
					</Table.Row>
				) : null}

				{/* High Risk section */}
				<Table.Row>
					<Table.Cell
						className="bg-muted text-muted-foreground min-h-[50px]"
						colSpan={4}
					>
						<div className="flex items-center gap-2">
							<RiskIndicator level="high" size="sm" />
							<span className="font-medium">High Risk</span> (
							{groupedVendors.high.length})
						</div>
					</Table.Cell>
				</Table.Row>
				{groupedVendors.high.length > 0 ? (
					groupedVendors.high.map((vendor) => (
						<VendorCell key={vendor.id} vendor={vendor} />
					))
				) : searchQuery ? (
					<Table.Row>
						<Table.Cell
							colSpan={4}
							className="py-4 text-center text-muted-foreground"
						>
							No results match your search
						</Table.Cell>
					</Table.Row>
				) : null}

				{/* Medium Risk section */}
				<Table.Row>
					<Table.Cell
						className="bg-muted text-muted-foreground min-h-[50px]"
						colSpan={4}
					>
						<div className="flex items-center gap-2">
							<RiskIndicator level="medium" size="sm" />
							<span className="font-medium">Medium Risk</span> (
							{groupedVendors.medium.length})
						</div>
					</Table.Cell>
				</Table.Row>
				{groupedVendors.medium.length > 0 ? (
					groupedVendors.medium.map((vendor) => (
						<VendorCell key={vendor.id} vendor={vendor} />
					))
				) : searchQuery ? (
					<Table.Row>
						<Table.Cell
							colSpan={4}
							className="py-4 text-center text-muted-foreground"
						>
							No results match your search
						</Table.Cell>
					</Table.Row>
				) : null}

				{/* Low Risk section */}
				<Table.Row>
					<Table.Cell
						className="bg-muted text-muted-foreground min-h-[50px]"
						colSpan={4}
					>
						<div className="flex items-center gap-2">
							<RiskIndicator level="low" size="sm" />
							<span className="font-medium">Low Risk</span> (
							{groupedVendors.low.length})
						</div>
					</Table.Cell>
				</Table.Row>
				{groupedVendors.low.length > 0 ? (
					groupedVendors.low.map((vendor) => (
						<VendorCell key={vendor.id} vendor={vendor} />
					))
				) : searchQuery ? (
					<Table.Row>
						<Table.Cell
							colSpan={4}
							className="py-4 text-center text-muted-foreground"
						>
							No results match your search
						</Table.Cell>
					</Table.Row>
				) : null}
			</Table.Body>
		</Table.Root>
	);
};

const VendorCell = ({ vendor }: { vendor: Vendor }) => {
	return (
		<Table.Row>
			<Table.Cell className="min-h-[50px]">{vendor.name}</Table.Cell>
			<Table.Cell className="min-h-[50px]">
				{vendor.riskLevel === "none" ? (
					<Button
						variant="ghost"
						startContent={<RiskIndicator level="none" size="sm" />}
						endContent={<ChevronRightIcon />}
					>
						Evaluate Risk
					</Button>
				) : (
					<div className="flex items-center gap-2 px-3">
						<RiskIndicator level={vendor.riskLevel} size="sm" />
						<span>
							{vendor.riskLevel.charAt(0).toUpperCase() +
								vendor.riskLevel.slice(1)}
						</span>
					</div>
				)}
			</Table.Cell>
			<Table.Cell className="min-h-[50px]">
				{vendor.lastAudit || "Never"}
			</Table.Cell>
			<Table.Cell className="min-h-[50px]">
				{vendor.owner ? (
					<div className="inline-flex items-center justify-center gap-2">
						<Avatar size="sm" />
						<div className="inline-flex flex-col items-start">
							<span className="text-xs">{vendor.owner.name}</span>
							<span className="text-[11px] text-muted-foreground">
								{vendor.owner.email}
							</span>
						</div>
					</div>
				) : (
					<span className="text-muted-foreground">
						<Button
							variant="ghost"
							size="sm"
							startContent={<PlusIcon />}
							endContent={<ChevronRightIcon />}
						>
							Assign now
						</Button>
					</span>
				)}
			</Table.Cell>
		</Table.Row>
	);
};

const FilteredVendorsTable = ({ vendors, searchQuery }: VendorTableProps) => {
	const filteredVendors = filterVendorsBySearch(vendors, searchQuery);

	if (filteredVendors.length === 0) {
		return (
			<div className="py-8 text-center text-muted-foreground">
				{searchQuery
					? "No vendors match your search"
					: "No vendors found in this category"}
			</div>
		);
	}

	return (
		<Table.Root bleed variant="grid" layout="fixed" className="border-t">
			<VendorTableHead />
			<Table.Body>
				{filteredVendors.map((vendor) => (
					<VendorCell key={vendor.id} vendor={vendor} />
				))}
			</Table.Body>
		</Table.Root>
	);
};

const VendorTableHead = () => (
	<Table.Head>
		<Table.HeaderCell className="min-h-[50px]">Vendor</Table.HeaderCell>
		<Table.HeaderCell className="min-h-[50px]">Risk Level</Table.HeaderCell>
		<Table.HeaderCell className="min-h-[50px]">Last Audit</Table.HeaderCell>
		<Table.HeaderCell className="min-h-[50px]">Owner</Table.HeaderCell>
	</Table.Head>
);
