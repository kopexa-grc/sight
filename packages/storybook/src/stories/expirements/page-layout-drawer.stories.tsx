import { faker } from "@faker-js/faker";
import { CheckIcon } from "@kopexa/icons";
import {
	Button,
	Chip,
	Drawer,
	DropdownMenu,
	PageHeader,
	PageLayout,
} from "@kopexa/sight";
import { useState } from "react";
import { cn } from "../../../../utilities/shared-utils/src";

const meta = {
	title: "Experiments/PageLayout in Drawer",
	parameters: {
		layout: "centered",
	},
};

export default meta;

export const Default = () => {
	const [open, setOpen] = useState(true);

	return (
		<Drawer.Root open={open} onOpenChange={setOpen} size="6xl">
			<Drawer.Trigger asChild>
				<Button>Toggle Drawer</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<PageLayout.Root paneWidth="lg" inModal>
					<PageLayout.Header>
						<PageHeader className={cn("transition-colors sticky top-0")}>
							<PageHeader.TitleArea>
								<PageHeader.LeadingVisual>
									<CheckIcon />
								</PageHeader.LeadingVisual>
								<PageHeader.Title>
									Informationssicherheitsrichtlinie
								</PageHeader.Title>
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
						</PageHeader>
					</PageLayout.Header>
					<PageLayout.Content>
						<p>{faker.lorem.paragraphs(5)}</p>
					</PageLayout.Content>
					<PageLayout.Pane>
						<div className="space-y-4">
							<p>This is the pane content.</p>
							<div className="border-2 border-dashed h-[300px]" />
							<div className="border-2 border-dashed h-[300px]" />
							<div className="border-2 border-dashed h-[300px]" />
							<div className="border-2 border-dashed h-[300px]" />
							<div className="border-2 border-dashed h-[300px]" />
						</div>
					</PageLayout.Pane>
					<PageLayout.Footer>
						<p>Footer content goes here.</p>
					</PageLayout.Footer>
				</PageLayout.Root>
			</Drawer.Content>
		</Drawer.Root>
	);
};
