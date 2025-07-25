import { faker } from "@faker-js/faker";
import { graphql, HttpResponse } from "msw";

type Control = {
	id: string;
	refCode: string;
	name: string;
	status: "active" | "inactive";
};

const generateControls = (count: number): Control[] => {
	return Array.from({ length: count }, (_, i) => ({
		id: `CTRL-${i + 1}`,
		refCode: `ISO-27001-A.${i + 1}`,
		name: faker.person.fullName(),
		status: i % 2 === 0 ? "active" : "inactive",
		owner: {
			id: faker.string.uuid(),
			name: faker.person.fullName(),
			email: faker.internet.email(),
		},
		chapter: faker.lorem.words(2),
		scope: faker.lorem.sentence(),
		framework: faker.lorem.word(),
		createdAt: faker.date.past().toISOString(),
		lastUpdated: faker.date.past().toISOString().split("T")[0],
	}));
};

const allControls: Control[] = generateControls(20);

export const handlers = [
	graphql.query("GetControlsQuery", ({ variables }) => {
		const { first = 5, after, where } = variables ?? {};

		let filtered = allControls;
		if (where?.nameContains) {
			const search = where.nameContains.toLowerCase();
			filtered = filtered.filter((c) => c.name.toLowerCase().includes(search));
		}

		// Step 2: Pagination
		const total = filtered.length;
		const startIndex = after
			? parseInt(after.replace("cursor-", ""), 10) + 1
			: 0;
		const endIndex = Math.min(startIndex + first, total);

		const paginated = filtered.slice(startIndex, endIndex);
		const edges = paginated.map((ctrl, i) => ({
			node: ctrl,
			cursor: `cursor-${startIndex + i}`,
		}));

		return HttpResponse.json({
			data: {
				controls: {
					edges,
					totalCount: allControls.length,
					pageInfo: {
						hasNextPage: endIndex < total,
						hasPreviousPage: startIndex > 0,
						startCursor: edges[0]?.cursor ?? null,
						endCursor: edges[edges.length - 1]?.cursor ?? null,
					},
				},
			},
		});
	}),
];
