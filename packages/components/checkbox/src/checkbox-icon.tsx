import { CheckIcon, MinusIcon } from "@kopexa/icons";
import type { ComponentProps } from "react";
import type { CheckboxIconProps } from "./use-checkbox";

type IconProps = ComponentProps<"svg"> & CheckboxIconProps;

/**
 * CheckboxIcon is used to visually indicate the checked or indeterminate
 * state of a checkbox.
 */
export function CheckboxIcon(props: IconProps) {
	const { isIndeterminate, isSelected: _, ...otherProps } = props;
	const BaseIcon = isIndeterminate ? MinusIcon : CheckIcon;

	return <BaseIcon {...otherProps} />;
}
