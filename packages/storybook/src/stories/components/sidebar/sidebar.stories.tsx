import { Sidebar, type SidebarProps, SidebarProvider } from "@kopexa/sight";
import { sidebar } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { AppSidebar } from "./app-sidebar";

export default {
	title: "Components/Sidebar",
	component: Sidebar,
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		variant: {
			control: {
				type: "select",
			},
			options: ["sidebar", "inset", "floating"],
		},
		collapsible: {
			control: {
				type: "select",
			},
			options: ["offcanvas", "icon", "none"],
		},
	},
	decorators: [
		(Story) => (
			<SidebarProvider>
				<Story />
			</SidebarProvider>
		),
	],
} as Meta<typeof Sidebar>;

const defaultProps = {
	...sidebar.defaultVariants,
};

const Template = (args: SidebarProps) => <AppSidebar {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
