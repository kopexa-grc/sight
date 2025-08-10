import {
	Callout,
	Card,
	CopyButton,
	SidebarProvider,
	SplitPageLayout,
	Table,
} from "@kopexa/sight";
import { AppSidebar } from "../../components/sidebar/app-sidebar";

const meta = {
	title: "Experiments/App/Domains",
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

export const Default = () => {
	return (
		<SplitPageLayout>
			<SplitPageLayout.Content>
				<Callout variant="warning" title="Your domain is not verified">
					<p className="mb-4">
						Woah, it seems like your domain is not verified yet. Please follow
						the instructions to verify your domain.
					</p>
					<Card.Root className="w-full mt-4 md:mt-6">
						<Card.Body className="text-sm space-y-4">
							<p>
								The DNS records at your provider must match the following
								records to verify and connect your domain to Kopexa.
							</p>
							<Table.Root variant="elevated">
								<Table.Head>
									<Table.Row>
										<Table.HeaderCell>Type</Table.HeaderCell>
										<Table.HeaderCell>Name</Table.HeaderCell>
										<Table.HeaderCell>Value</Table.HeaderCell>
									</Table.Row>
								</Table.Head>
								<Table.Body>
									<Table.Row>
										<Table.Cell>TXT</Table.Cell>
										<Table.Cell>
											_kopexa-verification.kopexa.com
											<CopyButton value="kopexa-domain-verification=abc123" />
										</Table.Cell>
										<Table.Cell>random-sha</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table.Root>
							<p>
								Depending on your provider, it might take some time for the DNS
								records to apply.
							</p>
						</Card.Body>
					</Card.Root>
				</Callout>
			</SplitPageLayout.Content>
		</SplitPageLayout>
	);
};
