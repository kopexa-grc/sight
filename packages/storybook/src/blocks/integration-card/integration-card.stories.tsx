import {
	type Integration,
	IntegrationCard,
	type IntegrationCardProps,
	type IntegrationStatus,
} from "@kopexa/sight";
import { integrationCard } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Blocks/IntegrationCard",
	component: IntegrationCard,
} as Meta<typeof IntegrationCard>;

const defaultProps = {
	...integrationCard.defaultVariants,
};

// ===== Demo data using the provided IntegrationProps model (acts like test cases)
const demoItems: Integration[] = [
	{
		id: "ms365",
		isSaaS: true,
		name: "Microsoft 365 Integration",
		version: "1.0.0",
		website: "https://microsoft.com/microsoft-365",
		logoUrl:
			"https://img.logo.dev/microsoft.com?token=pk_aCFyLlqtSGyKLGEKS0NO4g",
		labels: ["Popular"],
		category: "identity",
		categories: ["identity", "productivity", "email"],
		description:
			"Integration with Microsoft 365 to discover people, assets, domains, and more.",
		supportsOAuth: true,
		capabilities: [
			"user-discovery",
			"mfa-status",
			"group-memberships",
			"domain-verification",
		],
	},
	{
		id: "longtext",
		isSaaS: true,
		name: "An Extremely Long Integration Name That Should Truncate Nicely In The Card Header",
		version: "2.0.1",
		website: null,
		logoUrl: null,
		labels: ["Beta"],
		category: "cloud",
		categories: ["cloud", "security", "governance", "audit", "observability"],
		description:
			"This description is intentionally very long to ensure the card layout remains stable, the footer stays pinned, and no content overflows even with verbose text.",
		supportsOAuth: false,
		capabilities: ["scan", "inventory"],
	},
	{
		id: "nologo",
		isSaaS: false,
		name: "Provider Without Logo",
		version: "0.9.0",
		website: null,
		logoUrl: null,
		labels: null,
		category: "misc",
		categories: ["misc"],
		description: "Demonstrates the fallback icon when no logo URL is supplied.",
		supportsOAuth: false,
		capabilities: ["import"],
	},
	{
		id: "aws",
		isSaaS: true,
		name: "Amazon Web Services",
		version: "3.5.0",
		website: "https://aws.amazon.com",
		logoUrl: "https://logo.dev/amazon.com",
		labels: ["Cloud"],
		category: "cloud",
		categories: ["cloud", "security"],
		description: "Inventory accounts, IAM, S3 buckets and security findings.",
		supportsOAuth: false,
		capabilities: ["api-keys"],
	},
	{
		id: "denseTags",
		isSaaS: true,
		name: "Tool With Many Tags",
		version: "1.2.3",
		website: null,
		logoUrl: null,
		labels: ["Stable", "Verified"],
		category: "security",
		categories: [
			"tag1",
			"tag2",
			"tag3",
			"tag4",
			"tag5",
			"tag6",
			"tag7",
			"tag8",
			"tag9",
			"tag10",
		],
		description: "Verifies wrapping of many tags without overflow.",
		supportsOAuth: true,
		capabilities: ["sync"],
	},
];

const Template = (args: IntegrationCardProps) => <IntegrationCard {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
		integration: demoItems[0],
	},
};

// Map demo statuses just for preview/testing
const demoStatuses: Record<string, IntegrationStatus> = {
	ms365: "CONNECTED",
	longtext: "PENDING",
	nologo: "DISCONNECTED",
	aws: "ERROR",
	denseTags: "CONNECTED",
};

export const Grid = () => {
	const handleManage = () => alert(`Manage`);
	const handleConnect = () => alert(`Connect`);

	return (
		<main className="mx-auto max-w-7xl p-6">
			<header className="mb-6 flex items-center justify-between">
				<div>
					<h1 className="text-xl font-semibold text-slate-900">Integrations</h1>
					<p className="text-sm text-slate-500">
						Manage and configure integrations for your space.
					</p>
				</div>
				<div className="flex gap-2">
					<input
						type="search"
						placeholder="Search integrations…"
						className="w-64 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
					/>
				</div>
			</header>

			<div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{demoItems.map((integration) => (
					<IntegrationCard
						key={integration.id}
						integration={integration}
						status={demoStatuses[integration.id]}
						onManage={handleManage}
						onConnect={handleConnect}
					/>
				))}
			</div>
		</main>
	);
};
