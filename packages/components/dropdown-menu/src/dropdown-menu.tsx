import { CheckIcon, ChevronRightIcon, CircleIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { dataAttr } from "@kopexa/shared-utils";
import { dropdownMenu } from "@kopexa/theme";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";

type DropdownMenuContextValue = {
	styles: ReturnType<typeof dropdownMenu>;
};

const [Provider, useDropdownMenuContext] =
	createContext<DropdownMenuContextValue>();

export type DropdownMenuRootProps = ComponentProps<
	typeof DropdownMenuPrimitive.Root
>;

export function DropdownMenuRoot(props: DropdownMenuRootProps) {
	const styles = dropdownMenu();

	return (
		<Provider value={{ styles }}>
			<DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
		</Provider>
	);
}

export type DropdownMenuPortalProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Portal
>;

export function DropdownMenuPortal({
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
	return (
		<DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
	);
}

export type DropdownMenuTriggerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Trigger
>;

export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
			{...props}
		/>
	);
}

export type DropdownMenuContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Content
>;

export function DropdownMenuContent({
	className,
	sideOffset = 4,
	...props
}: DropdownMenuContentProps) {
	const styles = dropdownMenu();

	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				className={styles.content({ className })}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

export type DropdownMenuGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Group
>;
export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
	return (
		<DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
	);
}

export type DropdownMenuItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Item
> & {
	inset?: boolean;
	variant?: "default" | "destructive";
};

export function DropdownMenuItem({
	className,
	inset,
	variant = "default",
	...props
}: DropdownMenuItemProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset}
			data-variant={variant}
			className={styles.item({
				className,
			})}
			{...props}
		/>
	);
}

export type DropdownMenuCheckboxItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.CheckboxItem
>;

export function DropdownMenuCheckboxItem({
	className,
	children,
	checked,
	...props
}: DropdownMenuCheckboxItemProps) {
	const { styles } = useDropdownMenuContext();
	return (
		<DropdownMenuPrimitive.CheckboxItem
			data-slot="dropdown-menu-checkbox-item"
			className={styles.checkboxItem({ className })}
			checked={checked}
			{...props}
		>
			<span className={styles.iconWrapper()}>
				<DropdownMenuPrimitive.ItemIndicator>
					<CheckIcon className={styles.icon()} />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.CheckboxItem>
	);
}

export type DropdownMenuRadioGroupProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioGroup
>;

export function DropdownMenuRadioGroup({
	...props
}: DropdownMenuRadioGroupProps) {
	return (
		<DropdownMenuPrimitive.RadioGroup
			data-slot="dropdown-menu-radio-group"
			{...props}
		/>
	);
}

export type DropdownMenuRadioItemProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.RadioItem
>;

export function DropdownMenuRadioItem({
	className,
	children,
	...props
}: DropdownMenuRadioItemProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<DropdownMenuPrimitive.RadioItem
			data-slot="dropdown-menu-radio-item"
			className={styles.radioItem({ className })}
			{...props}
		>
			<span className={styles.iconWrapper()}>
				<DropdownMenuPrimitive.ItemIndicator>
					<CircleIcon className={styles.radioItemIcon()} />
				</DropdownMenuPrimitive.ItemIndicator>
			</span>
			{children}
		</DropdownMenuPrimitive.RadioItem>
	);
}

export type DropdownMenuLabelProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Label
> & {
	inset?: boolean;
};

export function DropdownMenuLabel({
	className,
	inset,
	...props
}: DropdownMenuLabelProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<DropdownMenuPrimitive.Label
			data-slot="dropdown-menu-label"
			data-inset={inset}
			className={styles.label({ className })}
			{...props}
		/>
	);
}

export type DropdownMenuSeparatorProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Separator
>;

export function DropdownMenuSeparator({
	className,
	...props
}: DropdownMenuSeparatorProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={styles.separator({ className })}
			{...props}
		/>
	);
}

export type DropdownMenuItemShortcutProps = React.ComponentProps<"span">;

export function DropdownMenuShortcut({
	className,
	...props
}: DropdownMenuItemShortcutProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<span
			data-slot="dropdown-menu-shortcut"
			className={styles.shortcut({ className })}
			{...props}
		/>
	);
}

export type DropdownMenuSubProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.Sub
>;

export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
	return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export type DropdownMenuSubTriggerProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.SubTrigger
> & {
	inset?: boolean;
};

export function DropdownMenuSubTrigger({
	className,
	inset,
	children,
	...props
}: DropdownMenuSubTriggerProps) {
	const { styles } = useDropdownMenuContext();

	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
			data-inset={dataAttr(inset)}
			className={styles.subTrigger({ className })}
			{...props}
		>
			{children}
			<ChevronRightIcon className={styles.subTriggerIcon()} />
		</DropdownMenuPrimitive.SubTrigger>
	);
}

export type DropdownMenuSubContentProps = React.ComponentProps<
	typeof DropdownMenuPrimitive.SubContent
>;

export function DropdownMenuSubContent({
	className,
	...props
}: DropdownMenuSubContentProps) {
	const { styles } = useDropdownMenuContext();
	return (
		<DropdownMenuPrimitive.SubContent
			data-slot="dropdown-menu-sub-content"
			className={styles.subContent({ className })}
			{...props}
		/>
	);
}
