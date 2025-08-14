import { faker } from "@faker-js/faker";
import {
	ApplicationAssetIcon,
	AssetsIcon,
	DataAssetIcon,
	PeopleIcon,
	PhysicalAssetIcon,
	PlattformAssetIcon,
	PlusIcon,
	UploadIcon,
} from "@kopexa/icons";
import {
	Avatar,
	Button,
	Chip,
	Heading,
	PageHeader,
	PageLayout,
	SearchInput,
	SidebarProvider,
	Table,
	TabNav,
} from "@kopexa/sight";
import { useState } from "react";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

const meta = {
	title: "Experiments/App/Assets",
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		// @ts-ignore
		(Story) => (
			<SidebarProvider>
				<AppSidebar>
					<Story />
				</AppSidebar>
			</SidebarProvider>
		),
	],
};

export default meta;

// Asset-Typen und Status definieren
type AssetType = "platform" | "data" | "physical" | "people" | "other";
type AssetStatus =
	| "PENDING"
	| "ACTION_REQUIRED"
	| "ACTIVE"
	| "DEPRECATED"
	| "DISPOSED";

// CIA-Ratings
type CIARating = "low" | "medium" | "high" | "critical";

interface CIA {
	confidentiality: CIARating;
	integrity: CIARating;
	availability: CIARating;
}

interface AssetOwner {
	name: string;
	email: string;
	avatar?: string;
}

interface Asset {
	id: string;
	name: string;
	type: AssetType;
	status: AssetStatus;
	owner: AssetOwner | null;
	cia: CIA;
}

// Mock-Daten für Assets generieren
const generateMockAssets = (count: number): Asset[] => {
	return Array.from({ length: count }).map(() => {
		const type: AssetType = faker.helpers.arrayElement([
			"platform",
			"data",
			"physical",
			"people",
			"other",
		]);

		const status: AssetStatus = faker.helpers.arrayElement([
			"PENDING",
			"ACTION_REQUIRED",
			"ACTIVE",
			"DEPRECATED",
			"DISPOSED",
		]);

		// 80% Chance, dass ein Asset einen Owner hat
		const hasOwner = faker.datatype.boolean(0.8);

		// Zufällige CIA-Werte
		const ciaRatings: CIARating[] = ["low", "medium", "high", "critical"];

		return {
			id: faker.string.uuid(),
			name:
				type === "platform"
					? faker.helpers.arrayElement([
							"AWS",
							"Azure",
							"GCP",
							"Kubernetes",
							"Docker",
							"VMware",
							"Salesforce",
							"SAP",
							"Oracle",
							"GitHub",
						])
					: type === "data"
						? faker.helpers.arrayElement([
								"Customer Database",
								"Financial Records",
								"Employee Data",
								"Logs",
								"Analytics",
								"Product Data",
								"Marketing Data",
							]) +
							" " +
							faker.string.alpha(3).toUpperCase()
						: type === "physical"
							? faker.helpers.arrayElement([
									"Server",
									"Laptop",
									"Mobile Device",
									"Security Camera",
									"Printer",
									"Access Card",
									"USB Drive",
									"Router",
								]) +
								" " +
								faker.string.alpha(2).toUpperCase() +
								"-" +
								faker.number.int({ min: 100, max: 999 })
							: type === "people"
								? faker.person.jobTitle()
								: // biome-ignore lint/style/useTemplate: storybook
									faker.company.name() + " " + faker.company.buzzNoun(),
			type,
			status,
			owner: hasOwner
				? {
						name: faker.person.fullName(),
						email: faker.internet.email(),
						avatar: faker.image.avatar(),
					}
				: null,
			cia: {
				confidentiality: faker.helpers.arrayElement(ciaRatings),
				integrity: faker.helpers.arrayElement(ciaRatings),
				availability: faker.helpers.arrayElement(ciaRatings),
			},
		};
	});
};

// Assets nach Typ gruppieren
const groupAssetsByType = (assets: Asset[]) => {
	const groups: Record<AssetType | "all", Asset[]> = {
		all: [],
		platform: [],
		data: [],
		physical: [],
		people: [],
		other: [],
	};

	assets.forEach((asset) => {
		groups.all.push(asset);
		groups[asset.type].push(asset);
	});

	return groups;
};

// Komponente für die CIA-Ratings
const CIABadge = ({ level }: { level: CIARating }) => {
	const colorMap: Record<CIARating, string> = {
		low: "bg-success/20 text-success border-success/20",
		medium: "bg-warning/20 text-warning border-warning/20",
		high: "bg-destructive/20 text-destructive border-destructive/20",
		critical: "bg-destructive text-white border-destructive",
	};

	const labelMap: Record<CIARating, string> = {
		low: "L",
		medium: "M",
		high: "H",
		critical: "C",
	};

	return (
		<span
			className={`inline-flex items-center justify-center h-6 w-6 rounded-md border text-xs font-medium ${colorMap[level]}`}
		>
			{labelMap[level]}
		</span>
	);
};

// Komponente für Status-Badge
// Status-Badge-Komponente für die Darstellung des Asset-Status
const StatusBadge: React.FC<{ status: AssetStatus }> = ({ status }) => {
	// Chip-Varianten und Texte basierend auf dem Status
	const statusConfig: Record<
		AssetStatus,
		{
			variant:
				| "default"
				| "destructive"
				| "success"
				| "warning"
				| "info"
				| "primary"
				| "secondary";
			label: string;
		}
	> = {
		PENDING: { variant: "warning", label: "Pending" },
		ACTION_REQUIRED: { variant: "destructive", label: "Action Required" },
		ACTIVE: { variant: "success", label: "Active" },
		DEPRECATED: { variant: "secondary", label: "Deprecated" },
		DISPOSED: { variant: "default", label: "Disposed" },
	};

	const config = statusConfig[status];

	return (
		<Chip color="default" indicatorColor={config.variant} indicator>
			{config.label}
		</Chip>
	);
};

// Assets-Tabelle Komponente
const AssetsTable = ({ assets }: { assets: Asset[] }) => {
	if (assets.length === 0) {
		return (
			<div className="py-8 text-center text-muted-foreground border-t">
				No assets found matching your criteria
			</div>
		);
	}

	return (
		<Table.Root bleed variant="grid" layout="fixed" className="border-t">
			<Table.Head>
				<Table.HeaderCell className="min-h-[50px]">Name</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">Status</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">Owner</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">CIA Rating</Table.HeaderCell>
			</Table.Head>
			<Table.Body>
				{assets.map((asset) => (
					<Table.Row key={asset.id}>
						<Table.Cell className="min-h-[50px]">{asset.name}</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<StatusBadge status={asset.status} />
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							{asset.owner ? (
								<div className="inline-flex items-center justify-start gap-2">
									<Avatar size="sm" />
									<div className="inline-flex flex-col items-start">
										<span className="text-sm">{asset.owner.name}</span>
										<span className="text-xs text-muted-foreground">
											{asset.owner.email}
										</span>
									</div>
								</div>
							) : (
								<span className="text-muted-foreground">Unassigned</span>
							)}
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<div className="flex items-center gap-1">
								<CIABadge level={asset.cia.confidentiality} />
								<CIABadge level={asset.cia.integrity} />
								<CIABadge level={asset.cia.availability} />
							</div>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

export const Default = () => {
	// 30 Assets generieren
	const mockAssets = generateMockAssets(30);
	const groupedAssets = groupAssetsByType(mockAssets);
	const [selectedTab, setSelectedTab] = useState<AssetType | "all">("all");
	const [searchQuery, setSearchQuery] = useState("");
	// Filter-Funktionen für die Suche
	const filterAssetsBySearch = (assets: Asset[], query: string): Asset[] => {
		if (!query.trim()) return assets;

		const lowercasedQuery = query.toLowerCase();
		return assets.filter(
			(asset) =>
				asset.name.toLowerCase().includes(lowercasedQuery) ||
				asset.owner?.name.toLowerCase().includes(lowercasedQuery) ||
				false ||
				asset.owner?.email.toLowerCase().includes(lowercasedQuery) ||
				false ||
				asset.type.toLowerCase().includes(lowercasedQuery) ||
				asset.status.toLowerCase().includes(lowercasedQuery),
		);
	};

	// Tab wechseln
	const handleTabChange = (tabId: string) => {
		setSelectedTab(tabId as AssetType | "all");
		setSearchQuery("");
	};

	// Gefilterte Assets für aktuelle Ansicht
	const filteredAssets = filterAssetsBySearch(
		selectedTab === "all" ? groupedAssets.all : groupedAssets[selectedTab],
		searchQuery,
	);

	return (
		<PageLayout.Root width="full">
			<PageLayout.Header>
				<PageHeader>
					<PageHeader.TitleArea>
						<PageHeader.Title>Assets Directory</PageHeader.Title>
					</PageHeader.TitleArea>
					<PageHeader.Actions>
						<Button variant="ghost" startContent={<UploadIcon />}>
							Import CSV
						</Button>
						<Button startContent={<PlusIcon />}>Add Asset</Button>
					</PageHeader.Actions>
					{/** part of layout.tsx in app */}
					<PageHeader.Navigation>
						<TabNav className="-mx-4 md:-mx-6 px-4 md:px-6">
							<TabNav.Link
								active={selectedTab === "all"}
								onClick={() => handleTabChange("all")}
							>
								<AssetsIcon />
								All Assets
							</TabNav.Link>
							<TabNav.Link
								active={selectedTab === "platform"}
								onClick={() => handleTabChange("platform")}
							>
								<PlattformAssetIcon />
								Platform
							</TabNav.Link>
							<TabNav.Link
								active={selectedTab === "data"}
								onClick={() => handleTabChange("data")}
							>
								<DataAssetIcon />
								Data
							</TabNav.Link>
							<TabNav.Link
								active={selectedTab === "physical"}
								onClick={() => handleTabChange("physical")}
							>
								<PhysicalAssetIcon />
								Physical
							</TabNav.Link>
							<TabNav.Link
								active={selectedTab === "people"}
								onClick={() => handleTabChange("people")}
							>
								<PeopleIcon />
								People
							</TabNav.Link>
							<TabNav.Link
								active={selectedTab === "other"}
								onClick={() => handleTabChange("other")}
							>
								<ApplicationAssetIcon />
								Application
							</TabNav.Link>
						</TabNav>
					</PageHeader.Navigation>
				</PageHeader>
			</PageLayout.Header>
			<PageLayout.Content spacing="normal">
				<div className="mb-4">
					<div className="max-w-sm">
						<SearchInput
							defaultValue={searchQuery}
							onValueChange={setSearchQuery}
							placeholder="Search assets..."
						/>
					</div>
				</div>

				<AssetsTable assets={filteredAssets} />
			</PageLayout.Content>
		</PageLayout.Root>
	);
};

export const Detail = () => {
	return (
		<div className="grid grid-cols-3 size-full">
			<div className="col-span-2 p-4 md:p-6">
				<PageHeader>
					<PageHeader.TitleArea>
						<PageHeader.Title>Asset Details</PageHeader.Title>
					</PageHeader.TitleArea>
				</PageHeader>
			</div>
			<div className="col-span-1 bg-slate-50 p-4 md:p-6 rounded-e-md border-s">
				<Heading level="h4" className="mb-4">
					Asset Overview
				</Heading>
			</div>
		</div>
	);
};
