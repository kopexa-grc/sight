import { cn } from "@kopexa/shared-utils";
import {
	type BlankStateSlots,
	type BlankStateVariantProps,
	blankstate,
	type SlotsToClasses,
} from "@kopexa/theme";
import type { ComponentProps } from "react";

type Props = {
	icon?: React.ReactNode;
	title?: string;
	description?: string;
	classNames?: SlotsToClasses<BlankStateSlots>;
};

export type BlankstateProps = ComponentProps<"div"> &
	Props &
	BlankStateVariantProps;

export const Blankstate = (props: BlankstateProps) => {
	const {
		className,
		children,
		classNames,
		icon,
		title,
		description,
		size,
		bordered,
		narrow,
		...rest
	} = props;

	const styles = blankstate({ size, bordered, narrow });

	return (
		<div
			className={styles.root({ className: cn(classNames?.root, className) })}
			{...rest}
		>
			<div className={styles.container({ className: classNames?.container })}>
				{icon && (
					<div className={styles.icon({ className: classNames?.icon })}>
						{icon}
					</div>
				)}
				{title && (
					<h2 className={styles.title({ className: classNames?.title })}>
						{title}
					</h2>
				)}
				{description && (
					<div
						className={styles.description({
							className: classNames?.description,
						})}
					>
						{description}
					</div>
				)}
				{children && (
					<div className={styles.actions({ className: classNames?.actions })}>
						{children}
					</div>
				)}
			</div>
		</div>
	);
};
