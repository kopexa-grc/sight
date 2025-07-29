import { cn } from "@kopexa/shared-utils";
import {
	type SectionRowSlots,
	type SectionRowVariantProps,
	type SlotsToClasses,
	sectionRow,
} from "@kopexa/theme";
import type { ComponentProps, ReactNode } from "react";

export type SectionRowProps = Omit<ComponentProps<"div">, "children"> &
	SectionRowVariantProps & {
		classNames?: SlotsToClasses<SectionRowSlots>;
		/**
		 * The title of the section row.
		 * This is typically used to display the name or title of the section.
		 */
		title: string;
		/**
		 * Optional info to render inside the section row.
		 * This can be used to provide additional context or information about the section.
		 * It can be a string or a ReactNode, and it will be displayed alongside the title.
		 * If not provided, no info will be displayed.
		 */
		info?: ReactNode | string | null;
		/**
		 * Optional children to render inside the section row.
		 * This can be any React node, such as text, icons, or other components.
		 */
		value?: ReactNode | string | null;

		/**
		 * optional actions to render inside the section row
		 * this can be used to render buttons or other interactive elements
		 */
		actions?: React.ReactNode;
	};

export const SectionRow = (props: SectionRowProps) => {
	const {
		className,
		classNames,
		title,
		value,
		actions,
		orientation,
		info,
		spacing,
		...rest
	} = props;
	const isValueString = typeof value === "string" || !value;
	const hasActions = !!actions;

	const styles = sectionRow({
		hasActions,
		orientation,
		spacing,
	});

	return (
		<div
			className={styles.root({
				className: cn(className, classNames?.root),
			})}
			{...rest}
		>
			<div className={styles.title({ className: classNames?.title })}>
				{title}
				{info && (
					<div className={styles.infoTip({ className: classNames?.infoTip })}>
						{info}
					</div>
				)}
			</div>
			<div
				className={styles.valueContainer({
					className: classNames?.valueContainer,
				})}
			>
				{isValueString ? (
					<span
						className={styles.valueText({ className: classNames?.valueText })}
					>
						{value ?? "-"}
					</span>
				) : (
					value
				)}
				{actions && (
					<div
						className={styles.action({
							className: classNames?.action,
						})}
					>
						{actions}
					</div>
				)}
			</div>
		</div>
	);
};
