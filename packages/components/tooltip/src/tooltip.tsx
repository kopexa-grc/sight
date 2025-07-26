import { tooltip } from "@kopexa/theme";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ComponentProps } from "react";

export type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> & {
	content?: React.ReactNode;
	className?: string;
	side?: "top" | "right" | "bottom" | "left";
	sideOffset?: number;
	align?: "start" | "center" | "end";
	alignOffset?: number;
	arrowPadding?: number;
	disabled?: boolean;
	hidden?: boolean;
};

export function Tooltip(props: TooltipProps) {
	const {
		children,
		delayDuration = 0,
		className,
		side,
		sideOffset = 0,
		align,
		alignOffset,
		arrowPadding,
		disabled,
		hidden,
		...rest
	} = props;

	const styles = tooltip();

	if (disabled) {
		return <>{children}</>;
	}

	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root
				data-slot="tooltip-root"
				delayDuration={delayDuration}
				{...rest}
			>
				<TooltipPrimitive.Trigger asChild data-slot="tooltip-trigger">
					{children}
				</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Content
					side={side}
					className={styles.content({ className })}
					data-slot="tooltip-content"
					sideOffset={sideOffset}
					align={align}
					alignOffset={alignOffset}
					arrowPadding={arrowPadding}
					hidden={hidden || disabled}
				>
					{props.content}
					<TooltipPrimitive.Arrow />
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}

export function TooltipProvider({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delayDuration={delayDuration}
			{...props}
		/>
	);
}
