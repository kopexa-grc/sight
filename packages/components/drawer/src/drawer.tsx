import { DialogOverlay, DialogPortal, useDialogContext } from "@kopexa/dialog";
import { CloseIcon } from "@kopexa/icons";
import { TRANSITION_EASINGS } from "@kopexa/motion-utils";
import { drawer } from "@kopexa/theme";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { type ComponentProps, useMemo } from "react";

export type DrawerContentProps = ComponentProps<
	typeof DialogPrimitive.Content
> & {
	showCloseButton?: boolean;
};

export const DrawerContent = (props: DrawerContentProps) => {
	const { className, children, showCloseButton, ...rest } = props;

	const { open, placement, size, radius } = useDialogContext();

	const styles = drawer({ placement, size, radius, className });

	const motionProps = useMemo(() => {
		const key = placement === "left" || placement === "right" ? "x" : "y";

		return {
			variants: {
				enter: {
					[key]: 0,
					transition: {
						[key]: {
							duration: 0.2,
							ease: TRANSITION_EASINGS.easeOut,
						},
					},
				},
				exit: {
					[key]: placement === "top" || placement === "left" ? "-100%" : "100%",
					transition: {
						[key]: {
							duration: 0.1,
							ease: TRANSITION_EASINGS.easeIn,
						},
					},
				},
			} as Variants,
		};
	}, [placement]);

	return (
		<AnimatePresence>
			{open ? (
				<DialogPortal data-slot="dialog-portal" forceMount>
					<DialogOverlay />
					<DialogPrimitive.Content
						data-slot="dialog-content"
						className={styles.content({ className })}
						asChild
						{...rest}
					>
						<motion.div
							animate="enter"
							exit="exit"
							initial="exit"
							{...motionProps}
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
						</motion.div>
					</DialogPrimitive.Content>
				</DialogPortal>
			) : null}
		</AnimatePresence>
	);
};
