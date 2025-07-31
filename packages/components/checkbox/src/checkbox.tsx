import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxIcon } from "./checkbox-icon";
import { type UseCheckboxProps, useCheckbox } from "./use-checkbox";

export type CheckboxCheckedState = CheckboxPrimitive.CheckedState;

export type CheckboxProps = UseCheckboxProps;

export const Checkbox = (props: CheckboxProps) => {
	const { getRootProps, getIndicatorProps, getIconProps } = useCheckbox(props);

	return (
		<CheckboxPrimitive.Root {...getRootProps()}>
			<CheckboxPrimitive.Indicator {...getIndicatorProps()}>
				<CheckboxIcon {...getIconProps()} />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
};
