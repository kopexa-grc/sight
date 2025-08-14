import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";

import {
	type Integration,
	IntegrationCard,
	type IntegrationStatus,
} from "../src";

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

const setup = (
	overrides?: Partial<React.ComponentProps<typeof IntegrationCard>>,
) => {
	const integration = (overrides?.integration as Integration) ?? demoItems[0];
	const statusProp: IntegrationStatus =
		(overrides?.status as IntegrationStatus | undefined) ?? "DISCONNECTED";
	const onConnect = jest.fn();
	const utils = render(
		<IntegrationCard
			integration={integration}
			status={statusProp}
			onConnect={overrides?.onConnect ?? onConnect}
			translations={overrides?.translations}
			onManage={overrides?.onManage}
		/>,
	);
	return { onConnect, integration, ...utils };
};

describe("IntegrationCard", () => {
	it("renders core info, chips, website link and status for a disconnected SaaS + OAuth integration", async () => {
		const user = userEvent.setup();
		const { onConnect } = setup();

		// Name heading
		expect(
			screen.getByRole("heading", { name: demoItems[0].name }),
		).toBeInTheDocument();

		// Category chip
		expect(screen.getAllByText(demoItems[0].category).length).toBeGreaterThan(
			0,
		);

		// Tags from categories and labels
		expect(screen.getByText("productivity")).toBeInTheDocument();
		expect(screen.getByText("email")).toBeInTheDocument();
		expect(screen.getByText("Popular")).toBeInTheDocument();

		// SaaS + OAuth chips
		expect(screen.getByText("SaaS")).toBeInTheDocument();
		expect(screen.getByText("OAuth")).toBeInTheDocument();

		// Description
		expect(screen.getByText(/discover people, assets/)).toBeInTheDocument();

		// Version text
		expect(screen.getByText(`v${demoItems[0].version}`)).toBeInTheDocument();

		// Website link
		const websiteLink = screen.getByRole("link", { name: /Website/i });
		const expectedHref = demoItems[0].website as string;
		expect(websiteLink).toHaveAttribute("href", expectedHref);

		// Status label
		expect(screen.getByText("Disconnected")).toBeInTheDocument();

		// Connect button triggers onConnect
		await user.click(screen.getByRole("button", { name: /Connect/i }));
		expect(onConnect).toHaveBeenCalledTimes(1);
	});

	it("renders Manage button and calls onManage when status is CONNECTED and onManage is a function", async () => {
		const user = userEvent.setup();
		const onManage = jest.fn();
		render(
			<IntegrationCard
				integration={demoItems[3]} // aws
				status="CONNECTED"
				onManage={onManage}
			/>,
		);

		// No Connect button
		expect(screen.queryByRole("button", { name: /Connect/i })).toBeNull();

		const manageBtn = screen.getByRole("button", { name: /Manage/i });
		await user.click(manageBtn);
		expect(onManage).toHaveBeenCalledTimes(1);
	});

	it("renders custom onManage node when provided (connected state)", () => {
		render(
			<IntegrationCard
				integration={demoItems[3]} // aws
				status="CONNECTED"
				onManage={<a href="/manage/aws">Open AWS Settings</a>}
			/>,
		);

		expect(
			screen.getByRole("link", { name: /Open AWS Settings/i }),
		).toHaveAttribute("href", "/manage/aws");
		// Connect button should not be present
		expect(screen.queryByRole("button", { name: /Connect/i })).toBeNull();
	});

	it("does not render website link when website is missing", () => {
		const integration = { ...demoItems[2], website: null };
		render(<IntegrationCard integration={integration} status="DISCONNECTED" />);
		expect(screen.queryByRole("link", { name: /Website/i })).toBeNull();
	});

	it("renders without description when absent", () => {
		const integration = { ...demoItems[1], description: null };
		render(<IntegrationCard integration={integration} status="DISCONNECTED" />);
		// Ensure the card still shows the heading and version
		expect(
			screen.getByRole("heading", { name: integration.name }),
		).toBeInTheDocument();
		expect(screen.getByText(`v${integration.version}`)).toBeInTheDocument();
	});
});
