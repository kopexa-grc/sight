import { CloseIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { type DrawerVariantProps, drawer } from "@kopexa/theme";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { useControllableState } from "../../../hooks/use-controllable-state/src";

type DrawerContextValue = {
	styles: ReturnType<typeof drawer>;
	open: boolean;
	placement: "top" | "bottom" | "left" | "right";
};

const [DrawerProvider, useDrawerContext] = createContext<DrawerContextValue>();

export { useDrawerContext, DrawerProvider };

export type DrawerRootProps = ComponentProps<typeof DialogPrimitive.Root> &
	DrawerVariantProps;

export const DrawerRoot = (props: DrawerRootProps) => {
	const {
		open: openProp,
		onOpenChange,
		size,
		radius,
		placement = "right",
		...restProps
	} = props;

	const [open, setOpen] = useControllableState({
		value: openProp,
		onChange: onOpenChange,
		defaultValue: false,
	});
	const styles = drawer({ size, radius, placement });

	return (
		<DrawerProvider value={{ styles, open, placement }}>
			<DialogPrimitive.Root
				data-slot="dialog"
				open={open}
				onOpenChange={setOpen}
				{...restProps}
			/>
		</DrawerProvider>
	);
};

export type DrawerTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export function DrawerTrigger({ ...props }: DrawerTriggerProps) {
	return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

export type DrawerPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

export function DrawerPortal({ ...props }: DrawerPortalProps) {
	return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

export type DrawerCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export function DrawerClose({ ...props }: DrawerCloseProps) {
	return <DialogPrimitive.Close data-slot="drawer-close" {...props} />;
}

export type DrawerOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
	const { styles } = useDrawerContext();
	return (
		<DialogPrimitive.Overlay
			data-slot="drawer-overlay"
			className={styles.overlay({
				className,
			})}
			{...props}
		/>
	);
}

export type DrawerContentProps = ComponentProps<
	typeof DialogPrimitive.Content
> & {
	showCloseButton?: boolean;
};

export const DrawerContent = (props: DrawerContentProps) => {
	const { className, children, showCloseButton = false, ...rest } = props;

	const { styles } = useDrawerContext();

	return (
		<DrawerPortal data-slot="drawer-portal">
			<DrawerOverlay />
			<DialogPrimitive.Content
				data-slot="drawer-content"
				className={styles.content({ className })}
				{...rest}
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
		</DrawerPortal>
	);
};

export type DrawerHeaderProps = ComponentProps<"div">;

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
	const { styles } = useDrawerContext();
	return (
		<div
			data-slot="drawer-header"
			className={styles.header({ className })}
			{...props}
		/>
	);
}

export type DrawerFooterProps = ComponentProps<"div">;

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
	const { styles } = useDrawerContext();
	return (
		<div
			data-slot="drawer-footer"
			className={styles.footer({ className })}
			{...props}
		/>
	);
}

export type DrawerBodyProps = ComponentProps<"div">;

export function DrawerBody({ className, ...props }: DrawerBodyProps) {
	const { styles } = useDrawerContext();
	return (
		<div
			data-slot="drawer-body"
			className={styles.body({ className })}
			{...props}
		/>
	);
}

export type DrawerTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
	const { styles } = useDrawerContext();

	return (
		<DialogPrimitive.Title
			data-slot="drawer-title"
			className={styles.title({ className })}
			{...props}
		/>
	);
}

export type DrawerDescriptionProps = ComponentProps<
	typeof DialogPrimitive.Description
>;

export function DrawerDescription({
	className,
	...props
}: DrawerDescriptionProps) {
	const { styles } = useDrawerContext();

	return (
		<DialogPrimitive.Description
			data-slot="drawer-description"
			className={styles.description({ className })}
			{...props}
		/>
	);
}

export type DrawerCloseTriggerProps = ComponentProps<
	typeof DialogPrimitive.Close
>;

export function DrawerCloseTrigger({
	className,
	...props
}: DrawerCloseTriggerProps) {
	const { styles } = useDrawerContext();

	return (
		<DialogPrimitive.Close
			data-slot="drawer-close-trigger"
			className={styles.closeTrigger({ className })}
			{...props}
		/>
	);
}
