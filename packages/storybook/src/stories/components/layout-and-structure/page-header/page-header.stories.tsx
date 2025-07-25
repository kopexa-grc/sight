import { CheckIcon } from "@kopexa/icons";
import {
	Button,
	Chip,
	DropdownMenu,
	PageHeader,
	type PageHeaderProps,
	PageLayout,
} from "@kopexa/sight";
import { pageHeader } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Layout And Structure/PageHeader",
	component: PageHeader,
} as Meta<typeof PageHeader>;

const defaultProps = {
	...pageHeader.defaultVariants,
};

const Template = (args: PageHeaderProps) => (
	<PageLayout.Root spacing="none">
		<PageLayout.Header>
			<PageHeader {...args}>
				<PageHeader.ContextArea>
					Bread / Crumbs / Navigation
				</PageHeader.ContextArea>
				<PageHeader.TitleArea>
					<PageHeader.LeadingVisual>
						<CheckIcon />
					</PageHeader.LeadingVisual>
					<PageHeader.Title>Informationssicherheitsrichtlinie</PageHeader.Title>
				</PageHeader.TitleArea>
				<PageHeader.Actions>
					<Button size="sm">Open Dialog</Button>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button variant="ghost" size="sm">
								Actions
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item>Action 1</DropdownMenu.Item>
							<DropdownMenu.Item>Action 2</DropdownMenu.Item>
							<DropdownMenu.Item>Action 3</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</PageHeader.Actions>
				<PageHeader.Description>
					<Chip indicator status="Solved">
						Automation
					</Chip>
					<p className="text-muted-foreground">
						<span className="text-primary-600">Steffen</span>&nbsp;hat die
						Richtlinie aktualisiert am{" "}
						<span className="text-primary-600">01.01.2024</span>.
					</p>
				</PageHeader.Description>
				<PageHeader.Navigation>
					Navigation Slot / Links / Tabs / etc / pp{" "}
				</PageHeader.Navigation>
			</PageHeader>
		</PageLayout.Header>
		<PageLayout.Content>
			<div className="border rounded-sm h-[600px]" />
		</PageLayout.Content>
		<PageLayout.Pane>
			<div className="flex flex-col gap-3">
				<div className="border rounded-sm h-[100px]" />
				<div className="border rounded-sm h-[100px]" />
				<div className="border rounded-sm h-[100px]" />
			</div>
		</PageLayout.Pane>
	</PageLayout.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
