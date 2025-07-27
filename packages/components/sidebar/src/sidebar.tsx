import { IconButton } from "@kopexa/button";
import { Drawer } from "@kopexa/drawer";
import { PanelLeftIcon } from "@kopexa/icons";
import { Input } from "@kopexa/input";
import { createContext } from "@kopexa/react-utils";
import { Separator } from "@kopexa/separator";
import {
	type SidebarMenuButtonVariantProps,
	sidebar,
	sidebarMenuAction,
	sidebarMenuButton,
} from "@kopexa/theme";
import { Tooltip, TooltipProvider } from "@kopexa/tooltip";
import { useIsMobile } from "@kopexa/use-is-mobile";
import { Slot } from "@radix-ui/react-slot";
import {
	type ComponentProps,
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

const SIDEBAR_COOKIE_NAME = "kpx_sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
	styles: ReturnType<typeof sidebar>;
};

const [Provider, useSidebar] = createContext<SidebarContextProps>();

export { useSidebar };

export type SidebarProviderProps = ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
};

export const SidebarProvider = ({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: SidebarProviderProps) => {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = useState(false);

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value;
			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}
			// This sets the cookie to keep the sidebar state.
			// biome-ignore lint/suspicious/noDocumentCookie: shadcn
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[setOpenProp, open],
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [isMobile, setOpen]);

	// Adds a keyboard shortcut to toggle the sidebar.
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);

	const styles = useMemo(() => sidebar(), []);

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed";
	const contextValue = useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
			styles,
		}),
		[state, open, setOpen, isMobile, openMobile, styles, toggleSidebar],
	);

	return (
		<Provider value={contextValue}>
			<TooltipProvider delayDuration={0}>
				<div
					data-slot="sidebar-wrapper"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH,
							"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={styles.provider({
						className,
					})}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</Provider>
	);
};

export type SidebarProps = ComponentProps<"div"> & {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
};

function SidebarRoot({
	side = "left",
	variant = "sidebar",
	collapsible = "offcanvas",
	className,
	children,
	...props
}: SidebarProps) {
	const { isMobile, state, openMobile, setOpenMobile, styles } = useSidebar();

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={styles.sidebar({
					className,
				})}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<Drawer.Root
				open={openMobile}
				onOpenChange={setOpenMobile}
				placement={side}
				{...props}
			>
				<Drawer.Content
					data-sidebar="sidebar"
					data-slot="sidebar"
					data-mobile="true"
					className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
				>
					<Drawer.Header className="sr-only">
						<Drawer.Title>Sidebar</Drawer.Title>
						<Drawer.Description>
							Displays the mobile sidebar.
						</Drawer.Description>
					</Drawer.Header>
					<div className="flex h-full w-full flex-col">{children}</div>
				</Drawer.Content>
			</Drawer.Root>
		);
	}

	return (
		<div
			className={styles.sidebarWrapper()}
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div
				data-slot="sidebar-gap"
				className={styles.gap({
					variant,
				})}
			/>
			<div
				data-slot="sidebar-container"
				className={styles.container({
					side,
					variant,
					className,
				})}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className={styles.inner({
						side,
						variant,
					})}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export type SidebarTriggerProps = Omit<
	ComponentProps<typeof IconButton>,
	"aria-label"
>;

function SidebarTrigger({ className, onClick, ...props }: SidebarTriggerProps) {
	const { toggleSidebar, styles } = useSidebar();
	return (
		<IconButton
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="md"
			className={styles.trigger({ className })}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			aria-label="Toggle Sidebar"
			{...props}
		>
			<PanelLeftIcon />
			<span className="sr-only">Toggle Sidebar</span>
		</IconButton>
	);
}

export type SidebarRailProps = ComponentProps<"button">;

function SidebarRail({ className, ...props }: SidebarRailProps) {
	const { toggleSidebar, styles } = useSidebar();
	return (
		<button
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar"
			className={styles.rail({ className })}
			{...props}
		/>
	);
}

export type SidebarInsetProps = ComponentProps<"main">;

function SidebarInset({ className, ...props }: SidebarInsetProps) {
	const { styles } = useSidebar();

	return (
		<main
			data-slot="sidebar-inset"
			className={styles.inset({ className })}
			{...props}
		/>
	);
}

type SidebarInputProps = ComponentProps<typeof Input>;

function SidebarInput({ className, ...props }: SidebarInputProps) {
	const { styles } = useSidebar();

	return (
		<Input
			data-slot="sidebar-input"
			data-sidebar="input"
			className={styles.input({ className })}
			{...props}
		/>
	);
}

type SidebarHeaderProps = ComponentProps<"div">;

function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
	const { styles } = useSidebar();

	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={styles.header({ className })}
			{...props}
		/>
	);
}

type SidebarFooterProps = ComponentProps<"div">;

function SidebarFooter({ className, ...props }: SidebarFooterProps) {
	const { styles } = useSidebar();

	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={styles.footer({ className })}
			{...props}
		/>
	);
}

export type SidebarSeparatorProps = React.ComponentProps<typeof Separator>;

function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
	const { styles } = useSidebar();

	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={styles.separator({ className })}
			{...props}
		/>
	);
}

export type SidebarContentProps = ComponentProps<"div">;

function SidebarContent({ className, ...props }: SidebarContentProps) {
	const { styles } = useSidebar();

	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={styles.content({ className })}
			{...props}
		/>
	);
}

export type SidebarGroupProps = ComponentProps<"div">;

function SidebarGroup({ className, ...props }: SidebarGroupProps) {
	const { styles } = useSidebar();

	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={styles.group({ className })}
			{...props}
		/>
	);
}

export type SidebarGroupLabelProps = React.ComponentProps<"div"> & {
	asChild?: boolean;
};

function SidebarGroupLabel({
	className,
	asChild = false,
	...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
	const { styles } = useSidebar();

	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={styles.groupLabel({ className })}
			{...props}
		/>
	);
}

export type SidebarGroupActionProps = ComponentProps<"button"> & {
	asChild?: boolean;
};

function SidebarGroupAction({
	className,
	asChild = false,
	...props
}: SidebarGroupActionProps) {
	const { styles } = useSidebar();
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			data-slot="sidebar-group-action"
			data-sidebar="group-action"
			className={styles.groupAction({ className })}
			{...props}
		/>
	);
}

export type SidebarGroupContentProps = ComponentProps<"div">;

function SidebarGroupContent({
	className,
	...props
}: SidebarGroupContentProps) {
	const { styles } = useSidebar();

	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={styles.groupContent({ className })}
			{...props}
		/>
	);
}

export type SidebarMenuProps = ComponentProps<"ul">;

function SidebarMenu({ className, ...props }: SidebarMenuProps) {
	const { styles } = useSidebar();
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={styles.menu({ className })}
			{...props}
		/>
	);
}

export type SidebarMenuItemProps = ComponentProps<"li">;

function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
	const { styles } = useSidebar();

	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={styles.menuItem({ className })}
			{...props}
		/>
	);
}

export interface SidebarMenuButtonProps
	extends Omit<ComponentProps<"button">, "color" | "size">,
		SidebarMenuButtonVariantProps {
	asChild?: boolean;
	isActive?: boolean;
	tooltip?: ReactNode;
}

function SidebarMenuButton({
	asChild = false,
	isActive = false,
	variant = "default",
	size = "md",
	tooltip,
	className,
	...props
}: SidebarMenuButtonProps) {
	const Comp = asChild ? Slot : "button";
	const { isMobile, state } = useSidebar();
	const button = (
		<Comp
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-size={size}
			data-active={isActive}
			className={sidebarMenuButton({ variant, size, className })}
			{...props}
		/>
	);
	if (!tooltip) {
		return button;
	}

	return (
		<Tooltip
			content={tooltip}
			side="right"
			align="center"
			disabled={state !== "collapsed" || isMobile}
		>
			{button}
		</Tooltip>
	);
}

export type SidebarMenuActionProps = ComponentProps<"button"> & {
	asChild?: boolean;
	showOnHover?: boolean;
};

function SidebarMenuAction({
	className,
	asChild = false,
	showOnHover = false,
	...props
}: SidebarMenuActionProps) {
	const styles = sidebarMenuAction({ showOnHover, className });
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			data-slot="sidebar-menu-action"
			data-sidebar="menu-action"
			className={styles}
			{...props}
		/>
	);
}

export const Sidebar = Object.assign(SidebarRoot, {
	Trigger: SidebarTrigger,
	Rail: SidebarRail,
	Inset: SidebarInset,
	Input: SidebarInput,
	Header: SidebarHeader,
	Footer: SidebarFooter,
	Separator: SidebarSeparator,
	Content: SidebarContent,
	Group: SidebarGroup,
	GroupLabel: SidebarGroupLabel,
	GroupAction: SidebarGroupAction,
	GroupContent: SidebarGroupContent,
	Menu: SidebarMenu,
	MenuItem: SidebarMenuItem,
	MenuButton: SidebarMenuButton,
	MenuAction: SidebarMenuAction,
});
