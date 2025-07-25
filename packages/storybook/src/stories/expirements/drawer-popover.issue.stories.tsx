import { Button, Command, Drawer, Popover } from "@kopexa/sight";

const meta = {
	title: "Experiments/Drawer Popover Issue",
	parameters: {
		layout: "centered",
	},
};

export default meta;

const Template = () => {
	return (
		<Drawer.Root>
			<Drawer.Trigger asChild>
				<Button>Open Drawer</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Popover Search is not focusable</Drawer.Title>
				</Drawer.Header>
				<Drawer.Body>
					<p>
						This is a test to check if the popover inside the drawer can be
						focused. If it cannot, it may indicate an issue with focus
						management in nested components.
					</p>
					<Popover.Root>
						<Popover.Trigger asChild>
							<Button variant="outline">Open Popover</Button>
						</Popover.Trigger>
						<Popover.Content className="p-0" align="end">
							<Command.Root>
								<Command.Input placeholder="Type a command..." />
								<Command.List>
									<Command.Empty>No results found.</Command.Empty>
									<Command.Group heading="Suggestions">
										<Command.Item>Calendar</Command.Item>
										<Command.Item>Contacts</Command.Item>
									</Command.Group>
									<Command.Separator />
									<Command.Group heading="Actions">
										<Command.Item>
											<span>Settings</span>
											<Command.Shortcut>⌘,</Command.Shortcut>
										</Command.Item>
										<Command.Item>
											<span>Help</span>
											<Command.Shortcut>⌘S</Command.Shortcut>
										</Command.Item>
									</Command.Group>
									<Command.Separator />
									<Command.Group heading="More">
										<Command.Item>
											<span>Logout</span>
											<Command.Shortcut>⌘Q</Command.Shortcut>
										</Command.Item>
										<Command.Item>
											<span>Exit</span>
											<Command.Shortcut>⌘W</Command.Shortcut>
										</Command.Item>
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</Drawer.Body>
			</Drawer.Content>
		</Drawer.Root>
	);
};

export const Default = {
	render: Template,
};
