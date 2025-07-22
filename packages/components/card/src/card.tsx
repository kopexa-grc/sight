import { createContext } from "@kopexa/react-utils";
import { dataAttr } from "@kopexa/shared-utils";
import { type CardVariantProps, card } from "@kopexa/theme";
import * as Slot from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

type CardContextValue = {
	styles: ReturnType<typeof card>;
};

const [Provider, useCardContext] = createContext<CardContextValue>();

export type CardRootProps = ComponentProps<"div"> &
	CardVariantProps & {
		asChild?: boolean;
	};

export const CardRoot = (props: CardRootProps) => {
	const {
		className,
		children,
		shadow,
		radius,
		isHoverable,
		isPressable,
		isBlurred,
		fullWidth,
		isDisabled,
		asChild,
		...rest
	} = props;

	const Component = asChild ? Slot.Root : "div";

	const styles = card({
		shadow,
		radius,
		isHoverable,
		isPressable,
		isBlurred,
		fullWidth,
		isDisabled,
	});

	return (
		<Provider value={{ styles }}>
			<Component
				className={styles.root({ className })}
				tabIndex={isPressable ? 0 : -1}
				data-disabled={dataAttr(isDisabled)}
				role={isPressable ? "button" : undefined}
				{...rest}
			>
				{children}
			</Component>
		</Provider>
	);
};

export type CardHeaderProps = ComponentProps<"div"> & {
	asChild?: boolean;
};

export function CardHeader(props: CardHeaderProps) {
	const { className, children, asChild, ...rest } = props;
	const Component = asChild ? Slot.Root : "div";

	const { styles } = useCardContext();

	return (
		<Component className={styles.header({ class: className })} {...rest}>
			{children}
		</Component>
	);
}

export type CardBodyProps = ComponentProps<"div"> & {
	asChild?: boolean;
};

export function CardBody(props: CardBodyProps) {
	const { className, children, asChild, ...rest } = props;
	const Component = asChild ? Slot.Root : "div";

	const { styles } = useCardContext();

	return (
		<Component className={styles.body({ class: className })} {...rest}>
			{children}
		</Component>
	);
}

export type CardFooterProps = ComponentProps<"div"> & {
	asChild?: boolean;
};

export function CardFooter(props: CardFooterProps) {
	const { className, children, asChild, ...rest } = props;
	const Component = asChild ? Slot.Root : "div";

	const { styles } = useCardContext();

	return (
		<Component className={styles.footer({ class: className })} {...rest}>
			{children}
		</Component>
	);
}
