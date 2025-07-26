import {
	AssetsIcon,
	CatalogIcon,
	CheckIcon,
	ChevronUpDown,
	ControlsIcon,
	DocumentsIcon,
	DSARIcon,
	IncidentIcon,
	IssuesIcon,
	PeopleIcon,
	ProcessingActivityIcon,
	ProgramIcon,
	RiskIcon,
	VendorIcon,
} from "@kopexa/icons";
import {
	Avatar,
	DropdownMenu,
	Sidebar,
	type SidebarProps,
} from "@kopexa/sight";
import { linkTo } from "@storybook/addon-links";

export type AppSidebarProps = SidebarProps & {
	children?: React.ReactNode;
};

type Item = {
	name: string;
	url: string;
	icon: React.ReactNode;
	onClick?: () => void;
};

const data: Record<string, Item[]> = {
	navMain: [
		{
			name: "Work items",
			url: "#",
			icon: <IssuesIcon />,
		},
		{
			name: "Documents",
			url: "#",
			icon: <DocumentsIcon />,
		},
	],
	navCompliance: [
		{
			name: "Programs",
			url: "#",
			icon: <ProgramIcon />,
		},
		{
			name: "Catalog",
			url: "#",
			icon: <CatalogIcon />,
		},
		{
			name: "Controls",
			url: "#",
			icon: <ControlsIcon />,
		},
		{
			name: "Risk",
			url: "#",
			icon: <RiskIcon />,
		},
		{
			name: "Incidents",
			url: "#",
			icon: <IncidentIcon />,
		},
	],
	navOrganization: [
		{
			name: "Vendors",
			url: "#",
			icon: <VendorIcon />,
			onClick: linkTo("Experiments/App/Vendors", "Vendors"),
		},
		{
			name: "Assets",
			url: "#",
			icon: <AssetsIcon />,
			onClick: linkTo("Experiments/App/Assets", "Default"),
		},
		{
			name: "People",
			url: "#",
			icon: <PeopleIcon />,
		},
	],
	navDataProtection: [
		{
			name: "Data Subject Requests",
			url: "#",
			icon: <DSARIcon />,
		},
		{
			name: "Processing Activities",
			url: "#",
			icon: <ProcessingActivityIcon />,
		},
	],
};

export const AppSidebar = ({ children, ...args }: SidebarProps) => {
	return (
		<>
			<Sidebar variant="inset" {...args}>
				<Sidebar.Header>
					<Switcher />
				</Sidebar.Header>
				<Sidebar.Content>
					<NavMain label="main" items={data.navMain} />
					<NavCompliance label="Compliance" items={data.navCompliance} />
					<NavCompliance label="Organization" items={data.navOrganization} />
					<NavCompliance
						label="Data Protection"
						items={data.navDataProtection}
					/>
				</Sidebar.Content>
				<Sidebar.Footer>
					<UserMenu />
				</Sidebar.Footer>
				<Sidebar.Rail />
			</Sidebar>
			<Sidebar.Inset>{children}</Sidebar.Inset>
		</>
	);
};

type NavProps = {
	items?: Item[];
	label: string;
};

function NavMain({ items }: NavProps) {
	return (
		<Sidebar.Group>
			<Sidebar.GroupContent className="flex flex-col gap-2">
				<Sidebar.Menu>
					{items?.map((item) => (
						<Sidebar.MenuItem key={item.name}>
							<Sidebar.MenuButton tooltip={item.name}>
								{item.icon}
								<span>{item.name}</span>
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					))}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	);
}

function NavCompliance({ items, label }: NavProps) {
	return (
		<Sidebar.Group>
			<Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
			<Sidebar.Menu>
				{items?.map((item) => (
					<Sidebar.MenuItem key={item.name}>
						<Sidebar.MenuButton
							tooltip={item.name}
							asChild={!item.onClick}
							onClick={item.onClick}
						>
							{!item.onClick && item.url ? (
								<a href={item.url}>
									{item.icon}
									<span>{item.name}</span>
								</a>
							) : (
								<>
									{item.icon}
									<span>{item.name}</span>
								</>
							)}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				))}
			</Sidebar.Menu>
		</Sidebar.Group>
	);
}

function UserMenu() {
	return (
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<Avatar />
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate font-medium">Julian Köhn</span>
						<span className="truncate text-xs">julian@kopexa.com</span>
					</div>
					<ChevronUpDown className="ml-auto size-4" />
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	);
}

function Switcher() {
	return (
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild>
						<Sidebar.MenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<CheckIcon className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">Workspace</span>
								<span className="truncate text-xs">Kopexa GmbH</span>
							</div>
							<ChevronUpDown className="ml-auto" />
						</Sidebar.MenuButton>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>stuff</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	);
}
