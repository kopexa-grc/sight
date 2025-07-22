import { CloseIcon } from "@kopexa/icons";
import { cn } from "@kopexa/shared-utils";
import {
	type ChipSlots,
	type ChipVariantProps,
	chip,
	type SlotsToClasses,
} from "@kopexa/theme";
import { type ComponentProps, useMemo } from "react";

type BaseProps = {
	/**
	 * Element to be rendered in the left side of the chip.
	 * this props overrides the `avatar` prop.
	 */
	startContent?: React.ReactNode;
	/**
	 * Element to be rendered in the right side of the chip.
	 * if you pass this prop and the `onClose` prop, the passed element
	 * will have the close button props and it will be rendered instead of the
	 * default close button.
	 */
	endContent?: React.ReactNode;
	classNames?: SlotsToClasses<ChipSlots>;
	/**
	 * A Status text to be displayed in the chip.
	 * This is usually used to display a status like "active", "inactive", etc.
	 */
	status?: React.ReactNode;
	/**
	 * Callback fired when the chip is closed.
	 */
	onClose?: () => void;
};

export type ChipProps = ComponentProps<"div"> & BaseProps & ChipVariantProps;

export const Chip = (props: ChipProps) => {
	const {
		className,
		children,
		startContent,
		endContent,
		classNames,
		size,
		disabled,
		radius,
		variant,
		color,
		indicator,
		indicatorColor,
		indicatorVariant,
		status,
		isCloseable,
		onClose,
		...rest
	} = props;

	const styles = chip({
		size,
		radius,
		variant,
		disabled,
		color,
		indicator,
		indicatorColor,
		indicatorVariant,
		isCloseable,
		className,
	});

	// we allow:
	// - startContent
	// - indicator (a dot)
	// - a status (text) with an icon (optional)
	const start = useMemo(() => {
		if (indicator) {
			return (
				<div className={styles.indicator({ class: classNames?.indicator })}>
					<span
						className={styles.indicatorPulse({
							class: classNames?.indicatorPulse,
						})}
					/>
					<span
						className={styles.indicatorDot({
							class: classNames?.indicatorDot,
						})}
					/>
				</div>
			);
		}

		return startContent;
	}, [startContent, indicator, styles, classNames]);

	const end = useMemo(() => {
		if (isCloseable) {
			return (
				// biome-ignore lint/a11y/useSemanticElements: we use a span here
				<span
					role="button"
					tabIndex={0}
					aria-label="Close"
					className={styles.closeButton({ class: classNames?.closeButton })}
					onClick={onClose}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							onClose?.();
						}
					}}
				>
					{endContent || <CloseIcon />}
				</span>
			);
		}

		return endContent;
	}, [endContent, isCloseable, styles, classNames, onClose]);

	return (
		<div
			className={styles.root({
				className: cn(classNames?.root, className),
			})}
			{...rest}
		>
			{start}
			{status && (
				<span className={styles.status({ class: classNames?.status })}>
					{status}
				</span>
			)}
			<span className={styles.content({ class: classNames?.content })}>
				{children}
			</span>
			{end}
		</div>
	);
};
