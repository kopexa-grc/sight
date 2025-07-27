import { cn } from "@kopexa/shared-utils";
import {
	type SectionRowSlots,
	type SlotsToClasses,
	sectionRow,
} from "@kopexa/theme";
import type { ComponentProps, ReactNode } from "react";

export type SectionRowProps = Omit<ComponentProps<"div">, "children"> & {
	classNames?: SlotsToClasses<SectionRowSlots>;
	/**
	 * The title of the section row.
	 * This is typically used to display the name or title of the section.
	 */
	title: string;
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
	const { className, classNames, title, value, actions, ...rest } = props;
	const isValueString = typeof value === "string" || !value;
	const hasActions = !!actions;

	const styles = sectionRow({
		hasActions,
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
			</div>

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
	);
};
