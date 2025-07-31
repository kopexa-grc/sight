import type { PropGetter } from "@kopexa/react-utils";
import { dataAttr } from "@kopexa/shared-utils";
import { type CheckboxVariantProps, checkbox } from "@kopexa/theme";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { type ComponentProps, useCallback, useMemo } from "react";

export type CheckboxCheckedState = CheckboxPrimitive.CheckedState;

export type CheckboxIconProps = {
	"data-checked": string;
	isSelected: boolean;
	isIndeterminate: boolean;
	className: string;
};

interface Props
	extends Omit<
		ComponentProps<typeof CheckboxPrimitive.Root>,
		keyof CheckboxVariantProps
	> {
	checked?: CheckboxCheckedState | undefined;
}

export type UseCheckboxProps = Props & CheckboxVariantProps;

export function useCheckbox({
	disabled,
	checked,
	className,
	color,
	size,
	...restProps
}: UseCheckboxProps) {
	const slots = useMemo(() => checkbox({ color, size }), [color, size]);

	const getRootProps: PropGetter = useCallback(
		() => ({
			className: slots.base({ className }),
			"data-slot": "checkbox",
			"data-disabled": dataAttr(disabled),
			"data-selected": dataAttr(
				typeof checked === "boolean" ? checked : checked === "indeterminate",
			),
			"data-indeterminate": dataAttr(checked === "indeterminate"),
			disabled,
			checked,
			...restProps,
		}),
		// biome-ignore lint/correctness/useExhaustiveDependencies: eslint does not understand the dependencies
		[slots, disabled, checked, restProps, className],
	);

	const getIndicatorProps: PropGetter = useCallback(
		() => ({
			className: slots.indicator(),
			"data-slot": "checkbox-indicator",
			"data-selected": dataAttr(
				typeof checked === "boolean" ? checked : checked === "indeterminate",
			),
			"data-indeterminate": dataAttr(checked === "indeterminate"),
		}),
		[slots, checked],
	);

	const getIconProps = useCallback(
		() =>
			({
				className: slots.icon(),
				isSelected: typeof checked === "boolean" ? checked : false,
				isIndeterminate: checked === "indeterminate",
				"data-checked": dataAttr(
					typeof checked === "boolean" ? checked : checked === "indeterminate",
				),
			}) as CheckboxIconProps,
		[slots, checked],
	);

	return {
		checked,
		getRootProps,
		getIndicatorProps,
		getIconProps,
	};
}
