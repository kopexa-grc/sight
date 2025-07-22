import { Button, DropdownMenu } from "@kopexa/sight";
import { dropdownMenu } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Overlays and layering/DropdownMenu",
	component: DropdownMenu.Root,
} as Meta<DropdownMenu.RootProps>;

const defaultProps = {
	...dropdownMenu.defaultVariants,
};

const Template = (args: DropdownMenu.RootProps) => (
	<DropdownMenu.Root {...args}>
		<DropdownMenu.Trigger>
			<Button>Open Menu</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="start">
			<DropdownMenu.Label>Menu</DropdownMenu.Label>
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					Profile <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>

				<DropdownMenu.Item>
					Billing
					<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Settings
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					Keyboard shortcuts
					<DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>Team</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
					<DropdownMenu.Portal>
						<DropdownMenu.SubContent>
							<DropdownMenu.Item>Email</DropdownMenu.Item>
							<DropdownMenu.Item>Message</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>More...</DropdownMenu.Item>
						</DropdownMenu.SubContent>
					</DropdownMenu.Portal>
				</DropdownMenu.Sub>
				<DropdownMenu.Item>
					New Team
					<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>GitHub</DropdownMenu.Item>
			<DropdownMenu.Item>Support</DropdownMenu.Item>
			<DropdownMenu.Item disabled>API</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				Log out
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
