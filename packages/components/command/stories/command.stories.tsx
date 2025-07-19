import { command } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

import { Command } from "../src";

export default {
	title: "Components/Command",
	component: Command.Root,
} as Meta<Command.RootProps>;

const defaultProps = {
	...command.defaultVariants,
};

const Template = (args: Command.RootProps) => {
	return (
		<div className="max-w-2xl w-full rounded-lg border shadow-md">
			<Command.Root {...args}>
				<Command.Header>
					<Command.Title>Command Menu</Command.Title>
					<Command.Description>Search and execute commands</Command.Description>
				</Command.Header>
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
		</div>
	);
};

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
