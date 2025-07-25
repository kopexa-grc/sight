import {
	type ComponentPropsWithout,
	createContext,
	getSubtree,
	type RemovedProps,
} from "@kopexa/react-utils";
import { Ripple, type RippleProps, useRipple } from "@kopexa/ripple";
import { callAllHandlers, cn } from "@kopexa/shared-utils";
import { type SlotsToClasses, type TabNavSlots, tabNav } from "@kopexa/theme";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { type ComponentProps, useCallback } from "react";

type TabNavContextValue = {
	styles: ReturnType<typeof tabNav>;
	classNames?: SlotsToClasses<TabNavSlots>;
};

const [TabNavProvider, useTabNavContext] = createContext<TabNavContextValue>();

type TabNavRootElementProps = ComponentPropsWithout<"nav", RemovedProps>;

export type TabNavProps = Omit<
	TabNavRootElementProps,
	"defaultValue" | "dir" | "color"
> & {
	classNames?: SlotsToClasses<TabNavSlots>;
};

const TabNavRoot = (props: TabNavProps) => {
	const { className, children, classNames, ...rest } = props;

	const styles = tabNav({
		className,
	});

	return (
		<TabNavProvider value={{ styles, classNames }}>
			<NavigationMenuPrimitive.Root
				className={styles.base({
					className: classNames?.base,
				})}
				data-slot="base"
				{...rest}
				asChild={false}
			>
				<NavigationMenuPrimitive.List
					className={styles.list({
						className: cn(className, classNames?.list),
					})}
					data-slot="list"
				>
					{children}
				</NavigationMenuPrimitive.List>
			</NavigationMenuPrimitive.Root>
		</TabNavProvider>
	);
};

type TabNavLinkElement = ComponentProps<typeof NavigationMenuPrimitive.Link>;

export interface TabNavLinkProps extends TabNavLinkElement {}

function TabNavLink(props: TabNavLinkProps) {
	const { asChild, className, children, onClick, ...rest } = props;

	const { styles, classNames } = useTabNavContext();

	const {
		onClick: onRippleClickHandler,
		onClear: onClearRipple,
		ripples,
	} = useRipple();

	const getRippleProps = useCallback<() => RippleProps>(
		() => ({ ripples, onClear: onClearRipple }),
		[ripples, onClearRipple],
	);

	return (
		<NavigationMenuPrimitive.Item
			data-slot="item"
			className={styles.item({ className: classNames?.item })}
		>
			<NavigationMenuPrimitive.Link
				data-slot="link"
				{...rest}
				className={styles.link({
					className: cn(className, classNames?.link),
				})}
				onSelect={undefined}
				onClick={callAllHandlers(onRippleClickHandler, onClick)}
				asChild={asChild}
			>
				{getSubtree({ asChild, children }, (children) => (
					<>
						<span
							className={styles.linkInner({
								className: classNames?.linkInner,
							})}
							data-slot="link-inner"
						>
							{children}
							<Ripple {...getRippleProps()} />
						</span>
						<span
							className={styles.linkInnerHidden({
								className: classNames?.linkInnerHidden,
							})}
							data-slot="link-inner"
						>
							{children}
						</span>
					</>
				))}
			</NavigationMenuPrimitive.Link>
		</NavigationMenuPrimitive.Item>
	);
}

export const TabNav = Object.assign(TabNavRoot, { Link: TabNavLink });
