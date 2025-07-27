import { IconButton } from "@kopexa/button";
import { Drawer } from "@kopexa/drawer";
import { PanelLeftIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import {
	Resizable,
	type ResizablePanelProps,
	type ResizableProps,
} from "@kopexa/resizable";
import {
	type SplitPageLayoutVariantProps,
	splitPageLayout,
} from "@kopexa/theme";
import { useIsMobile } from "@kopexa/use-is-mobile";
import { type ComponentProps, useCallback, useMemo, useState } from "react";

/**
 * The goal is to provide a split page layout component for mobile and desktop views
 * if the user is on mobile, the panel will be hidden and the content will take the full width
 * the panel can be toggled by a on the right side of the screen
 */

type SplitPageLayoutContext = {
	styles: ReturnType<typeof splitPageLayout>;
	open: boolean;
	setOpen: (open: boolean) => void;
	isMobile: boolean;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	toggleSidebar: () => void;
};

const [Provider, useProvider] = createContext<SplitPageLayoutContext>();

export type SplitPageLayoutProps = Omit<ResizableProps, "direction"> &
	SplitPageLayoutVariantProps & {
		defaultOpen?: boolean;
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
	};

const SplitPageLayoutRoot = (props: SplitPageLayoutProps) => {
	const {
		className,
		children,
		inset,
		defaultOpen = false,
		open: openProp,
		onOpenChange: setOpenProp,
		...rest
	} = props;

	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = useState(false);
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
		},
		[setOpenProp, open],
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [isMobile, setOpen]);

	const styles = splitPageLayout({ inset });

	const contextValue = useMemo(
		() => ({
			styles,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[styles, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<Provider value={contextValue}>
			<Resizable
				className={styles.root({
					className,
				})}
				{...rest}
				direction="horizontal"
			>
				{children}
			</Resizable>
		</Provider>
	);
};

const SplitPageLayoutContent = ({
	className,
	...props
}: ResizablePanelProps) => {
	const { styles } = useProvider();

	return (
		<Resizable.Panel className={styles.content({ className })} {...props} />
	);
};

const SplitPageLayoutPanel = ({
	className,
	children,
	...props
}: ResizablePanelProps) => {
	const { styles, isMobile, openMobile, setOpenMobile } = useProvider();

	if (isMobile) {
		return (
			<div className={styles.mobileWrapper()}>
				<div className={styles.mobileContainer()}>
					<IconButton
						variant="outline"
						color="secondary"
						aria-label="Toggle panel"
						onClick={() => setOpenMobile(true)}
					>
						<PanelLeftIcon />
					</IconButton>
				</div>
				<Drawer.Root
					open={openMobile}
					onOpenChange={setOpenMobile}
					placement="right"
					size="full"
					{...props}
				>
					<Drawer.Content showCloseButton>
						<Drawer.Header className="sr-only">
							<Drawer.Title>Panel</Drawer.Title>
							<Drawer.Description>
								Displays the mobile panel.
							</Drawer.Description>
						</Drawer.Header>
						<div className={styles.panelContainer()}>
							<div className={styles.panel()}>{children}</div>
						</div>
					</Drawer.Content>
				</Drawer.Root>
			</div>
		);
	}

	return (
		<>
			<Resizable.Handle />
			<Resizable.Panel
				className={styles.panelContainer({ className })}
				defaultSize={33}
				minSize={30}
				maxSize={50}
				order={2}
				{...props}
			>
				<div className={styles.panel()}>{children}</div>
			</Resizable.Panel>
		</>
	);
};

type PageLayoutBleedProps = ComponentProps<"div">;

const PageLayoutBleed = ({ className, ...props }: PageLayoutBleedProps) => {
	const { styles } = useProvider();

	return <div className={styles.bleed({ className })} {...props} />;
};

export const SplitPageLayout = Object.assign(SplitPageLayoutRoot, {
	Content: SplitPageLayoutContent,
	Panel: SplitPageLayoutPanel,
	Bleed: PageLayoutBleed,
});
