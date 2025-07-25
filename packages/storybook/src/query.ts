import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";

export type Control = {
	id: string;
	refCode: string;
	name: string;
	status: "active" | "inactive";
	owner: {
		id: string;
		name: string;
		email: string;
	};
	chapter: string;
	lastUpdated: string;
	scope: string;
	framework: string;
	createdAt: string;
};

const query = gql`
	query GetControlsQuery($first: Int!, $after: String $where: ControlWhereInput) {
		controls(first: $first, after: $after, where: $where) {
			edges {
				node {
					id
					refCode
					name
					status
                    owner {
                        id
                        name
                        email
                    }
                    chapter
                    lastUpdated
                    scope
                    framework
                    createdAt
				}
			}
			pageInfo {
                endCursor
                startCursor
                hasPreviousPage
				hasNextPage
			}
			totalCount
		}
	}
`;

type GetControlVariables = {
	first?: number;
	after?: string;
	where?: {
		nameContains?: string;
	};
};
export const useControls = (variables?: GetControlVariables) => {
	return useQuery({
		queryKey: ["controls", variables],
		queryFn: () =>
			request<{
				controls: {
					edges: { node: Control }[];
					pageInfo: { hasNextPage: boolean; endCursor: string };
					totalCount: number;
				};
			}>(`${window.location.origin}/graphql`, query, variables),
	});
};
