import { tv, type VariantProps } from "tailwind-variants";

export const sidebar = tv({
	slots: {
		provider: [
			"group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
		],
		sidebarWrapper: ["group peer text-sidebar-foreground hidden md:block"],
		sidebar: [
			"bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col",
		],
		gap: [
			"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
			"group-data-[collapsible=offcanvas]:w-0",
			"group-data-[side=right]:rotate-180",
		],
		container: [
			"fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
		],
		inner: [
			"bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm",
		],
		trigger: [],
		rail: [
			"hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
			"in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
			"[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
			"hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
			"[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
			"[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
		],
		inset: [
			"bg-background relative flex w-full flex-1 flex-col",
			"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
		],
		input: ["bg-background h-8 w-full shadow-none"],
		header: ["flex flex-col gap-2 p-2"],
		footer: ["flex flex-col gap-2 p-2"],
		separator: ["bg-sidebar-border mx-2 w-auto"],
		content: [
			"flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
		],
		group: ["relative flex w-full min-w-0 flex-col p-2"],
		groupLabel: [
			"text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
			"group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
		],
		groupAction: [
			"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
			// Increases the hit area of the button on mobile.
			"after:absolute after:-inset-2 md:after:hidden",
			"group-data-[collapsible=icon]:hidden",
		],
		groupContent: ["w-full text-sm"],
		menu: ["flex w-full min-w-0 flex-col gap-1"],
		menuItem: ["group/menu-item relative"],
	},
	variants: {
		variant: {
			sidebar: {
				gap: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
				container:
					"group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
			},
			floating: {
				gap: "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
				container:
					"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
			},
			inset: {
				gap: "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]",
				container:
					"p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]",
			},
		},
		side: {
			left: {
				container:
					"left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]",
			},
			right: {
				container:
					"right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
			},
		},
		isMobile: {
			true: {},
			false: {},
		},
	},
	defaultVariants: {
		variant: "sidebar",
		isMobile: false,
	},
});

export type SidebarVariantProps = VariantProps<typeof sidebar>;

export const sidebarMenuButton = tv({
	base: [
		"peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md",
		"p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding]",
		"disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8",
		"aria-disabled:pointer-events-none aria-disabled:opacity-50",
		"data-[active=true]:font-medium",
		"group-data-[collapsible=icon]:size-8!",
		"group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
	],
	variants: {
		variant: {
			default: "",
			outline: "",
		},
		color: {
			default: [
				"hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				"focus-visible:ring-2",
				"active:bg-sidebar-accent active:text-sidebar-accent-foreground",
				"data-[active=true]:bg-sidebar-accent",
				"data-[active=true]:text-sidebar-accent-foreground",
				"data-[state=open]:hover:bg-sidebar-accent",
				"data-[state=open]:hover:text-sidebar-accent-foreground ",
			],
		},
		size: {
			sm: "h-7 text-xs",
			md: "h-8 text-sm",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
		},
	},
	defaultVariants: {
		color: "default",
		variant: "default",
		size: "md",
	},
	compoundVariants: [
		{
			variant: "default",
			color: "default",
			class: ["hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"],
		},
		{
			variant: "outline",
			color: "default",
			class: [
				"bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
			],
		},
	],
});

export type SidebarMenuButtonVariantProps = VariantProps<
	typeof sidebarMenuButton
>;

export const sidebarMenuAction = tv({
	base: [
		"text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
		// Increases the hit area of the button on mobile.
		"after:absolute after:-inset-2 md:after:hidden",
		"peer-data-[size=sm]/menu-button:top-1",
		"peer-data-[size=default]/menu-button:top-1.5",
		"peer-data-[size=lg]/menu-button:top-2.5",
		"group-data-[collapsible=icon]:hidden",
	],
	variants: {
		showOnHover: {
			true: [
				"peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0",
			],
		},
	},
});

export type SidebarMenuActionVariantProps = VariantProps<
	typeof sidebarMenuAction
>;

// packages/components/sidebar/src/sidebar.tsx
// sr-only
