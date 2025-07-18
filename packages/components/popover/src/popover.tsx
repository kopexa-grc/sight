import { TRANSITION_VARIANTS } from "@kopexa/motion-utils";
import { createContext } from "@kopexa/react-utils";
import { popover } from "@kopexa/theme";
import { useControllableState } from "@kopexa/use-controllable-state";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import {
	AnimatePresence,
	domAnimation,
	LazyMotion,
	motion,
} from "motion/react";
import type { ComponentProps } from "react";

type PopoverContextValue = {
	styles: ReturnType<typeof popover>;
	open: boolean;
};

const [PopoverProvider, usePopoverContext] =
	createContext<PopoverContextValue>();

export type PopoverRootProps = ComponentProps<typeof PopoverPrimitive.Root>;

export const PopoverRoot = (props: PopoverRootProps) => {
	const { open: openProp, onOpenChange, ...restProps } = props;

	const [open, setOpen] = useControllableState({
		value: openProp,
		onChange: onOpenChange,
		defaultValue: false,
	});

	const styles = popover();

	return (
		<PopoverProvider value={{ styles, open }}>
			<PopoverPrimitive.Root
				data-slot="popover"
				open={open}
				onOpenChange={setOpen}
				{...restProps}
			/>
		</PopoverProvider>
	);
};

export type PopoverTriggerProps = ComponentProps<
	typeof PopoverPrimitive.Trigger
>;

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
	return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export type PopoverContentProps = ComponentProps<
	typeof PopoverPrimitive.Content
> & {
	align?: "start" | "center" | "end";
	sideOffset?: number;
};

export function PopoverContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: PopoverContentProps) {
	const { open, styles } = usePopoverContext();

	return (
		<AnimatePresence>
			{open ? (
				<PopoverPrimitive.Portal forceMount>
					<LazyMotion features={domAnimation}>
						<PopoverPrimitive.Content
							data-slot="popover-content"
							align={align}
							sideOffset={sideOffset}
							className={styles.content({ className })}
							{...props}
							asChild
						>
							<motion.div
								animate="enter"
								exit="exit"
								initial="initial"
								variants={TRANSITION_VARIANTS.scaleSpringOpacity}
							/>
						</PopoverPrimitive.Content>
					</LazyMotion>
				</PopoverPrimitive.Portal>
			) : null}
		</AnimatePresence>
	);
}

export type PopoverAnchorProps = ComponentProps<typeof PopoverPrimitive.Anchor>;

export function PopoverAnchor({ ...props }: PopoverAnchorProps) {
	return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}
