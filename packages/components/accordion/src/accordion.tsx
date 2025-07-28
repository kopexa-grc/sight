"use client";

import { ChevronDownIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { type AccordionVariantProps, accordion } from "@kopexa/theme";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentProps } from "react";

type AccordionContextValue = {
	styles: ReturnType<typeof accordion>;
};

const [Provider, useProvider] = createContext<AccordionContextValue>();

export type AccordionRootProps = ComponentProps<
	typeof AccordionPrimitive.Root
> &
	AccordionVariantProps;

export function AccordionRoot({
	className,
	color,
	radius,
	spacing,
	border,
	...props
}: AccordionRootProps) {
	const styles = accordion({ color, radius, spacing, border });

	return (
		<Provider value={{ styles }}>
			<AccordionPrimitive.Root
				data-slot="accordion"
				className={styles.root({ className })}
				{...props}
			/>
		</Provider>
	);
}

export type AccordionItemProps = ComponentProps<typeof AccordionPrimitive.Item>;

export function AccordionItem({ className, ...props }: AccordionItemProps) {
	const { styles } = useProvider();

	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={styles.item({ className })}
			{...props}
		/>
	);
}

export type AccordionTriggerProps = ComponentProps<
	typeof AccordionPrimitive.Trigger
>;

export function AccordionTrigger({
	className,
	children,
	...props
}: AccordionTriggerProps) {
	const { styles } = useProvider();

	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={styles.trigger({ className })}
				{...props}
			>
				{children}
				<ChevronDownIcon className={styles.triggerIcon()} />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

export type AccordionContentProps = ComponentProps<
	typeof AccordionPrimitive.Content
>;

export function AccordionContent({
	className,
	children,
	...props
}: AccordionContentProps) {
	const { styles } = useProvider();

	return (
		<AccordionPrimitive.Content
			data-slot="accordion-content"
			className={styles.contentContainer()}
			{...props}
		>
			<div className={styles.content({ className })}>{children}</div>
		</AccordionPrimitive.Content>
	);
}
