import { faker } from "@faker-js/faker";
import {
	AssetsIcon,
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
	RiskBadge,
	SearchInput,
	SidebarProvider,
	Table,
	TabNav,
	Tabs,
} from "@kopexa/sight";
import { useState } from "react";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

const meta = {
	title: "Experiments/App/Risks",
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

// Risiko-Typen und Status definieren
type RiskType =
	| "operational"
	| "financial"
	| "strategic"
	| "compliance"
	| "security"
	| "other";
type RiskStatus =
	| "OPEN"
	| "NEEDS_ATTENTION"
	| "IN_PROGRESS"
	| "ONGOING"
	| "MITIGATED"
	| "ACCEPTED"
	| "TRANSFERRED"
	| "ARCHIVED"
	| "NEEDS_REVIEW"
	| "CLOSED";

// Risk-Ratings
type RiskRating = {
	consequence?: number;
	likelihood?: number;
};

interface RiskOwner {
	name: string;
	email: string;
	avatar?: string;
}

interface Risk {
	id: string;
	title: string;
	description: string;
	type: RiskType;
	status: RiskStatus;
	owner: RiskOwner | null;
	riskRating: RiskRating;
	mitigationPlan: string;
	residualRisk: RiskRating;
	createdAt: Date;
	updatedAt: Date;
}

// Mock-Daten für Risiken generieren
const generateMockRisks = (count: number): Risk[] => {
	return Array.from({ length: count }).map(() => {
		const type: RiskType = faker.helpers.arrayElement([
			"operational",
			"financial",
			"strategic",
			"compliance",
			"security",
			"other",
		]);

		const status: RiskStatus = faker.helpers.arrayElement([
			"OPEN",
			"NEEDS_ATTENTION",
			"IN_PROGRESS",
			"ONGOING",
			"MITIGATED",
			"ACCEPTED",
			"TRANSFERRED",
			"ARCHIVED",
			"NEEDS_REVIEW",
			"CLOSED",
		]);

		// 80% Chance, dass ein Risiko einen Owner hat
		const hasOwner = faker.datatype.boolean(0.8);

		// Generiere Titel basierend auf dem Risikotyp
		const riskTitle = () => {
			switch (type) {
				case "operational":
					return faker.helpers.arrayElement([
						"Service Disruption",
						"Process Inefficiency",
						"Resource Shortage",
						"Supply Chain Disruption",
						"Operational Overhead",
					]);
				case "financial":
					return faker.helpers.arrayElement([
						"Budget Overrun",
						"Currency Exchange Loss",
						"Cash Flow Shortage",
						"Unexpected Expenses",
						"Revenue Decline",
					]);
				case "strategic":
					return faker.helpers.arrayElement([
						"Market Share Loss",
						"Competitive Disadvantage",
						"Product Market Fit",
						"Business Model Failure",
						"Partnership Dissolution",
					]);
				case "compliance":
					return faker.helpers.arrayElement([
						"Regulatory Non-Compliance",
						"Audit Failure",
						"Legal Violation",
						"Standard Adherence Gap",
						"Certification Loss",
					]);
				case "security":
					return faker.helpers.arrayElement([
						"Data Breach",
						"Unauthorized Access",
						"Malware Infection",
						"Social Engineering",
						"DDoS Attack",
					]);
				default:
					return faker.company.catchPhrase();
			}
		};

		return {
			id: faker.string.uuid(),
			title: riskTitle(),
			description: faker.lorem.paragraph(),
			type,
			status,
			owner: hasOwner
				? {
						name: faker.person.fullName(),
						email: faker.internet.email(),
						avatar: faker.image.avatar(),
					}
				: null,
			riskRating: {
				consequence: faker.number.int({ min: 1, max: 5 }),
				likelihood: faker.number.int({ min: 1, max: 5 }),
			},
			mitigationPlan: faker.lorem.sentences(3),
			residualRisk: {
				consequence: faker.number.int({ min: 1, max: 5 }),
				likelihood: faker.number.int({ min: 1, max: 5 }),
			},
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
		};
	});
};

// Risiken nach Typ gruppieren
const groupRisksByType = (risks: Risk[]) => {
	const groups: Record<RiskType | "all", Risk[]> = {
		all: [],
		operational: [],
		financial: [],
		strategic: [],
		compliance: [],
		security: [],
		other: [],
	};

	risks.forEach((risk) => {
		groups.all.push(risk);
		groups[risk.type].push(risk);
	});

	return groups;
};

// Komponente für Status-Badge
// Status-Badge-Komponente für die Darstellung des Risiko-Status
const StatusBadge: React.FC<{ status: RiskStatus }> = ({ status }) => {
	// Chip-Varianten und Texte basierend auf dem Status
	const statusConfig: Record<
		RiskStatus,
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
		OPEN: { variant: "warning", label: "Open" },
		NEEDS_ATTENTION: { variant: "destructive", label: "Needs Attention" },
		IN_PROGRESS: { variant: "primary", label: "In Progress" },
		ONGOING: { variant: "primary", label: "Ongoing" },
		MITIGATED: { variant: "success", label: "Mitigated" },
		ACCEPTED: { variant: "info", label: "Accepted" },
		TRANSFERRED: { variant: "secondary", label: "Transferred" },
		ARCHIVED: { variant: "default", label: "Archived" },
		NEEDS_REVIEW: { variant: "warning", label: "Needs Review" },
		CLOSED: { variant: "default", label: "Closed" },
	};

	const config = statusConfig[status];

	return (
		<Chip color="default" indicatorColor={config.variant} indicator>
			{config.label}
		</Chip>
	);
};

// Risks-Tabelle Komponente
const RisksTable = ({ risks }: { risks: Risk[] }) => {
	if (risks.length === 0) {
		return (
			<div className="py-8 text-center text-muted-foreground border-t">
				No risks found matching your criteria
			</div>
		);
	}

	return (
		<Table.Root bleed variant="grid" layout="fixed" className="border-t">
			<Table.Head>
				<Table.HeaderCell className="min-h-[50px]">Title</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">Status</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">Owner</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">
					Inherent Risk
				</Table.HeaderCell>
				<Table.HeaderCell className="min-h-[50px]">
					Residual Risk
				</Table.HeaderCell>
			</Table.Head>
			<Table.Body>
				{risks.map((risk) => (
					<Table.Row key={risk.id}>
						<Table.Cell className="min-h-[50px]">
							<div className="inline-flex flex-col">
								<span className="font-medium">{risk.title}</span>
								<span className="text-xs text-muted-foreground truncate max-w-[250px] capitalize">
									{risk.type}
								</span>
							</div>
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<StatusBadge status={risk.status} />
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<Table.OwnerCellValue owner={risk.owner} onClick={() => {}} />
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<RiskBadge risk={risk.riskRating} />
						</Table.Cell>
						<Table.Cell className="min-h-[50px]">
							<RiskBadge risk={risk.residualRisk} />
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table.Root>
	);
};

const mockRisks = generateMockRisks(30);
const groupedRisks = groupRisksByType(mockRisks);

export const Default = () => {
	const [selectedTab, setSelectedTab] = useState<RiskType | "all">("all");
	const [searchQuery, setSearchQuery] = useState("");
	// Filter-Funktionen für die Suche
	const filterRisksBySearch = (risks: Risk[], query: string): Risk[] => {
		if (!query.trim()) return risks;

		const lowercasedQuery = query.toLowerCase();
		return risks.filter(
			(risk) =>
				risk.title.toLowerCase().includes(lowercasedQuery) ||
				risk.description.toLowerCase().includes(lowercasedQuery) ||
				risk.owner?.name.toLowerCase().includes(lowercasedQuery) ||
				false ||
				risk.owner?.email.toLowerCase().includes(lowercasedQuery) ||
				false ||
				risk.type.toLowerCase().includes(lowercasedQuery) ||
				risk.status.toLowerCase().includes(lowercasedQuery),
		);
	};

	// Tab wechseln
	const handleTabChange = (tabId: string) => {
		setSelectedTab(tabId as RiskType | "all");
		setSearchQuery("");
	};

	// Gefilterte Risiken für aktuelle Ansicht
	const filteredRisks = filterRisksBySearch(
		selectedTab === "all" ? groupedRisks.all : groupedRisks[selectedTab],
		searchQuery,
	);

	return (
		<PageLayout.Root width="full">
			<PageLayout.Header>
				<PageHeader>
					<PageHeader.TitleArea>
						<PageHeader.Title>Risks Directory</PageHeader.Title>
					</PageHeader.TitleArea>
					<PageHeader.Actions>
						<Button variant="ghost" startContent={<UploadIcon />}>
							Import CSV
						</Button>
						<Button startContent={<PlusIcon />}>Add Risk</Button>
					</PageHeader.Actions>
					{/** part of layout.tsx in app */}
					<PageHeader.Navigation>
						<TabNav className="-mx-4 md:-mx-6 px-4 md:px-6">
							<TabNav.Link active>
								<AssetsIcon />
								All Risks
							</TabNav.Link>
							<TabNav.Link>
								<PlattformAssetIcon />
								Risk Discovery {/** da wo unsere surveys liegen */}
							</TabNav.Link>
						</TabNav>
					</PageHeader.Navigation>
				</PageHeader>
			</PageLayout.Header>
			<PageLayout.Content spacing="normal">
				<Tabs value={selectedTab} onValueChange={handleTabChange}>
					<Tabs.List className="w-full mb-4">
						<Tabs.Trigger value="all">All Risks</Tabs.Trigger>
						<Tabs.Trigger value="operational">Operational</Tabs.Trigger>
						<Tabs.Trigger value="financial">Financial</Tabs.Trigger>
						<Tabs.Trigger value="strategic">Strategic</Tabs.Trigger>
						<Tabs.Trigger value="compliance">Compliance</Tabs.Trigger>
						<Tabs.Trigger value="security">Security</Tabs.Trigger>
						<Tabs.Trigger value="other">Other</Tabs.Trigger>
					</Tabs.List>
				</Tabs>
				<div className="mb-4">
					<div className="max-w-sm">
						<SearchInput
							defaultValue={searchQuery}
							onValueChange={setSearchQuery}
							placeholder="Search risks..."
						/>
					</div>
				</div>

				<RisksTable risks={filteredRisks} />
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
						<PageHeader.Title>Risk Details</PageHeader.Title>
					</PageHeader.TitleArea>
				</PageHeader>

				<div className="mt-4 space-y-4">
					<div>
						<h3 className="text-lg font-medium">Mitigation Plan</h3>
						<p className="mt-1 text-muted-foreground">
							{faker.lorem.paragraphs(3)}
						</p>
					</div>
				</div>
			</div>
			<div className="col-span-1 bg-slate-50 p-4 md:p-6 rounded-e-md border-s">
				<Heading level="h4" className="mb-4">
					Risk Overview
				</Heading>

				<div className="space-y-4">
					<div>
						<div className="text-sm font-medium text-muted-foreground mb-1">
							Status
						</div>
						<StatusBadge status="IN_PROGRESS" />
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground mb-1">
							Risk Rating
						</div>
						{/* <RiskBadge risk="high" /> */}
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground mb-1">
							Residual Risk
						</div>
						{/* <RiskBadge level="medium" /> */}
					</div>
					<div>
						<div className="text-sm font-medium text-muted-foreground mb-1">
							Owner
						</div>
						<div className="inline-flex items-center justify-start gap-2">
							<Avatar size="sm" />
							<div className="inline-flex flex-col items-start">
								<span className="text-sm">{faker.person.fullName()}</span>
								<span className="text-xs text-muted-foreground">
									{faker.internet.email()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
