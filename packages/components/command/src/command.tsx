import { SearchIcon } from "@kopexa/icons";
import { command } from "@kopexa/theme";
import { Command as CommandPrimitive } from "cmdk";
import type { ComponentProps } from "react";

export type CommandRootProps = ComponentProps<typeof CommandPrimitive>;

export function CommandRoot(props: CommandRootProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive
			data-slot="command"
			className={styles.root({ className })}
			{...restProps}
		/>
	);
}

export type CommandInputProps = ComponentProps<typeof CommandPrimitive.Input>;

export function CommandInput(props: CommandInputProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<div data-slot="command-input-wrapper" className={styles.inputWrapper()}>
			<SearchIcon className={styles.inputIcon()} />
			<CommandPrimitive.Input
				data-slot="command-input"
				className={styles.input({ className })}
				{...restProps}
			/>
		</div>
	);
}

export type CommandListProps = ComponentProps<typeof CommandPrimitive.List>;

export function CommandList(props: CommandListProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={styles.list({ className })}
			{...restProps}
		/>
	);
}

export type CommandEmptyProps = ComponentProps<typeof CommandPrimitive.Empty>;

export function CommandEmpty(props: CommandEmptyProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={styles.empty({ className })}
			{...restProps}
		/>
	);
}

export type CommandGroupProps = ComponentProps<typeof CommandPrimitive.Group>;

export function CommandGroup(props: CommandGroupProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={styles.group({ className })}
			{...restProps}
		/>
	);
}

export type CommandSeparatorProps = ComponentProps<
	typeof CommandPrimitive.Separator
>;

export function CommandSeparator(props: CommandSeparatorProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={styles.separator({ className })}
			{...restProps}
		/>
	);
}

export type CommandItemProps = ComponentProps<typeof CommandPrimitive.Item>;

export function CommandItem(props: CommandItemProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={styles.item({ className })}
			{...restProps}
		/>
	);
}

export type CommandShortcutProps = ComponentProps<"span">;

export function CommandShortcut(props: CommandShortcutProps) {
	const { className, ...restProps } = props;

	const styles = command();
	return (
		<span
			data-slot="command-shortcut"
			className={styles.shortcut({ className })}
			{...restProps}
		/>
	);
}
