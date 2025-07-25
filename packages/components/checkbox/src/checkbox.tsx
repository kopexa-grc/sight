import { CheckIcon, MinusIcon } from "@kopexa/icons";
import { checkbox } from "@kopexa/theme";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ComponentProps } from "react";

export type CheckboxCheckedState = CheckboxPrimitive.CheckedState;

export type CheckboxProps = ComponentProps<typeof CheckboxPrimitive.Root> & {
	checked?: CheckboxCheckedState | undefined;
};

export const Checkbox = (props: CheckboxProps) => {
	const { className, checked, ...rest } = props;

	const styles = checkbox();

	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={styles.base({ className })}
			checked={checked}
			{...rest}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className={styles.indicator()}
			>
				{checked === "indeterminate" ? (
					<MinusIcon className={styles.icon()} />
				) : (
					<CheckIcon className={styles.icon()} />
				)}
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};
