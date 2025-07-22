import { createContext } from "@kopexa/react-utils";
import { alertDialog, type ButtonVariantProps, button } from "@kopexa/theme";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { ComponentProps } from "react";

type AlertDialogContextType = {
	styles: ReturnType<typeof alertDialog>;
};

const [Provider, useAlertDialogContext] =
	createContext<AlertDialogContextType>();

export type AlertDialogRootProps = ComponentProps<
	typeof AlertDialogPrimitive.Root
>;

export function AlertDialogRoot(props: AlertDialogRootProps) {
	const styles = alertDialog();

	return (
		<Provider value={{ styles }}>
			<AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
		</Provider>
	);
}

export type AlertDialogTriggerProps = ComponentProps<
	typeof AlertDialogPrimitive.Trigger
>;

export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
	return (
		<AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
	);
}

export type AlertDialogPortalProps = ComponentProps<
	typeof AlertDialogPrimitive.Portal
>;

export function AlertDialogPortal({ ...props }: AlertDialogPortalProps) {
	return (
		<AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
	);
}

export type AlertDialogOverlayProps = ComponentProps<
	typeof AlertDialogPrimitive.Overlay
>;

export function AlertDialogOverlay({
	className,
	...props
}: AlertDialogOverlayProps) {
	const { styles } = useAlertDialogContext();

	return (
		<AlertDialogPrimitive.Overlay
			data-slot="alert-dialog-overlay"
			className={styles.overlay(className)}
			{...props}
		/>
	);
}

export type AlertDialogContentProps = ComponentProps<
	typeof AlertDialogPrimitive.Content
>;

export function AlertDialogContent({
	className,
	...props
}: AlertDialogContentProps) {
	const { styles } = useAlertDialogContext();

	return (
		<AlertDialogPortal>
			<AlertDialogOverlay />
			<AlertDialogPrimitive.Content
				data-slot="alert-dialog-content"
				className={styles.content(className)}
				{...props}
			/>
		</AlertDialogPortal>
	);
}

export type AlertDialogHeaderProps = ComponentProps<"div">;

export function AlertDialogHeader({
	className,
	...props
}: AlertDialogHeaderProps) {
	const { styles } = useAlertDialogContext();
	return (
		<div
			data-slot="alert-dialog-header"
			className={styles.header(className)}
			{...props}
		/>
	);
}

export type AlertDialogFooterProps = ComponentProps<"div">;

export function AlertDialogFooter({
	className,
	...props
}: AlertDialogFooterProps) {
	const { styles } = useAlertDialogContext();
	return (
		<div
			data-slot="alert-dialog-footer"
			className={styles.footer(className)}
			{...props}
		/>
	);
}

export type AlertDialogTitleProps = ComponentProps<
	typeof AlertDialogPrimitive.Title
>;

export function AlertDialogTitle({
	className,
	...props
}: AlertDialogTitleProps) {
	const { styles } = useAlertDialogContext();

	return (
		<AlertDialogPrimitive.Title
			data-slot="alert-dialog-title"
			className={styles.title(className)}
			{...props}
		/>
	);
}

export type AlertDialogDescriptionProps = ComponentProps<
	typeof AlertDialogPrimitive.Description
>;

export function AlertDialogDescription({
	className,
	...props
}: AlertDialogDescriptionProps) {
	const { styles } = useAlertDialogContext();

	return (
		<AlertDialogPrimitive.Description
			data-slot="alert-dialog-description"
			className={styles.description(className)}
			{...props}
		/>
	);
}

export type AlertDialogActionProps = ComponentProps<
	typeof AlertDialogPrimitive.Action
> & {
	color?: ButtonVariantProps["color"];
	variant?: ButtonVariantProps["variant"];
};

export function AlertDialogAction({
	className,
	color,
	variant,
	...props
}: AlertDialogActionProps) {
	return (
		<AlertDialogPrimitive.Action
			className={button({ className, color, variant })}
			{...props}
		/>
	);
}

export type AlertDialogCancelProps = ComponentProps<
	typeof AlertDialogPrimitive.Cancel
>;

export function AlertDialogCancel({
	className,
	...props
}: AlertDialogCancelProps) {
	return (
		<AlertDialogPrimitive.Cancel
			className={button({ variant: "ghost", className })}
			{...props}
		/>
	);
}
