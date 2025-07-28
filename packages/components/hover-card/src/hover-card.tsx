import { createContext } from "@kopexa/react-utils";
import { hoverCard } from "@kopexa/theme";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import type { ComponentProps } from "react";

type HoverCardContextValue = {
	styles: ReturnType<typeof hoverCard>;
};

const [HoverCardProvider, useHoverCardContext] =
	createContext<HoverCardContextValue>();

export type HoverCardProps = ComponentProps<typeof HoverCardPrimitive.Root>;

export function HoverCardRoot(props: HoverCardProps) {
	const styles = hoverCard();

	return (
		<HoverCardProvider value={{ styles }}>
			<HoverCardPrimitive.Root data-slot="hover-card" {...props} />
		</HoverCardProvider>
	);
}

export type HoverCardTriggerProps = ComponentProps<
	typeof HoverCardPrimitive.Trigger
>;

export function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
	return (
		<HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
	);
}

export type HoverCardContentProps = ComponentProps<
	typeof HoverCardPrimitive.Content
>;

export function HoverCardContent({
	className,
	align = "center",
	sideOffset = 4,
	...props
}: HoverCardContentProps) {
	const { styles } = useHoverCardContext();

	return (
		<HoverCardPrimitive.Portal data-slot="hover-card-portal">
			<HoverCardPrimitive.Content
				data-slot="hover-card-content"
				align={align}
				sideOffset={sideOffset}
				className={styles.content({ className })}
				{...props}
			/>
		</HoverCardPrimitive.Portal>
	);
}
