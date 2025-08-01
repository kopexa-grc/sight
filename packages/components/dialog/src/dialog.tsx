import { CloseIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { cn } from "@kopexa/shared-utils";
import { type DialogVariantProps, dialog } from "@kopexa/theme";
import { useControllableState } from "@kopexa/use-controllable-state";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";

type DialogContextValue = {
	styles: ReturnType<typeof dialog>;
	open: boolean;
	placement?: "top" | "bottom" | "left" | "right";
	size?: DialogVariantProps["size"];
	radius?: DialogVariantProps["radius"];
};

const [DialogProvider, useDialogContext] = createContext<DialogContextValue>();

export { useDialogContext };

export type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root> &
	DialogVariantProps;

export const DialogRoot = (props: DialogRootProps) => {
	const {
		open: openProp,
		onOpenChange,
		size,
		radius,
		placement,
		...restProps
	} = props;

	const [open, setOpen] = useControllableState({
		value: openProp,
		onChange: onOpenChange,
		defaultValue: false,
	});
	const styles = dialog({ size, radius, placement });

	return (
		<DialogProvider value={{ styles, open, placement, size, radius }}>
			<DialogPrimitive.Root
				data-slot="dialog"
				open={open}
				onOpenChange={setOpen}
				{...restProps}
			/>
		</DialogProvider>
	);
};

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export function DialogTrigger({ ...props }: DialogTriggerProps) {
	return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

export function DialogPortal({ ...props }: DialogPortalProps) {
	return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export function DialogClose({ ...props }: DialogCloseProps) {
	return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

export function DialogOverlay({ className, ...props }: DialogOverlayProps) {
	const { styles } = useDialogContext();
	return (
		<DialogPrimitive.Overlay
			data-slot="dialog-overlay"
			className={styles.overlay({
				className,
			})}
			{...props}
		/>
	);
}

export type DialogContentProps = ComponentProps<
	typeof DialogPrimitive.Content
> & {
	showCloseButton?: boolean;
};

export function DialogContent({
	className,
	children,
	showCloseButton = true,
	...props
}: DialogContentProps) {
	const { styles } = useDialogContext();
	return (
		<DialogPortal data-slot="dialog-portal">
			<DialogOverlay />
			<DialogPrimitive.Content
				data-slot="dialog-content"
				className={cn(styles.content(), className)}
				{...props}
			>
				{children}
				{showCloseButton && (
					<DialogPrimitive.Close
						data-slot="dialog-close"
						className={styles.close()}
					>
						<CloseIcon />
						<span className="sr-only">Close</span>
					</DialogPrimitive.Close>
				)}
			</DialogPrimitive.Content>
		</DialogPortal>
	);
}

export type DialogHeaderProps = ComponentProps<"div">;

export function DialogHeader({ className, ...props }: DialogHeaderProps) {
	const { styles } = useDialogContext();
	return (
		<div
			data-slot="dialog-header"
			className={styles.header({ className })}
			{...props}
		/>
	);
}

export type DialogFooterProps = ComponentProps<"div">;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
	const { styles } = useDialogContext();
	return (
		<div
			data-slot="dialog-footer"
			className={styles.footer({ className })}
			{...props}
		/>
	);
}

export type DialogBodyProps = ComponentProps<"div">;

export function DialogBody({ className, ...props }: DialogBodyProps) {
	const { styles } = useDialogContext();
	return (
		<div
			data-slot="dialog-body"
			className={styles.body({ className })}
			{...props}
		/>
	);
}

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
	const { styles } = useDialogContext();

	return (
		<DialogPrimitive.Title
			data-slot="dialog-title"
			className={styles.title({ className })}
			{...props}
		/>
	);
}

export type DialogDescriptionProps = ComponentProps<
	typeof DialogPrimitive.Description
>;

export function DialogDescription({
	className,
	...props
}: DialogDescriptionProps) {
	const { styles } = useDialogContext();

	return (
		<DialogPrimitive.Description
			data-slot="dialog-description"
			className={styles.description({ className })}
			{...props}
		/>
	);
}

export type DialogCloseTriggerProps = ComponentProps<
	typeof DialogPrimitive.Close
>;

export function DialogCloseTrigger({
	className,
	...props
}: DialogCloseTriggerProps) {
	const { styles } = useDialogContext();

	return (
		<DialogPrimitive.Close
			data-slot="dialog-close-trigger"
			className={styles.closeTrigger({ className })}
			{...props}
		/>
	);
}
