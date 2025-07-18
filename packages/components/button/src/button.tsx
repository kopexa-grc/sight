import { mergeRefs } from "@kopexa/react-utils";
import { Ripple, type RippleProps, useRipple } from "@kopexa/ripple";
import { type ButtonVariantProps, button } from "@kopexa/theme";
import * as Slot from "@radix-ui/react-slot";
import { type ComponentProps, useCallback, useRef } from "react";

export type ButtonProps = ComponentProps<"button"> &
	ButtonVariantProps & {
		asChild?: boolean;
		/**
		 * Whether the button should display a ripple effect on press.
		 * @default false
		 */
		disableRipple?: boolean;
		/**
		 * Whether the button should display a loading spinner.
		 * @default false
		 */
		isLoading?: boolean;
	};

export const Button = (props: ButtonProps) => {
	const {
		type = "button",
		asChild,
		children,
		onClick,
		disabled,
		disableRipple,
		ref,
		isLoading,
		variant,
		size,
		className,
		...rest
	} = props;

	const Comp = asChild ? Slot.Root : "button";

	const domRef = useRef<HTMLButtonElement>(null);
	const isDisabled = disabled || isLoading;

	const {
		onClick: onRippleClickHandler,
		onClear: onClearRipple,
		ripples,
	} = useRipple();

	const styles = button({
		variant,
		size,
		className,
	});

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			if (disableRipple || isDisabled) return;

			domRef.current && onRippleClickHandler(e);

			onClick?.(e);
		},
		[onClick, disableRipple, isDisabled, onRippleClickHandler],
	);

	const getRippleProps = useCallback<() => RippleProps>(
		() => ({ ripples, onClear: onClearRipple }),
		[ripples, onClearRipple],
	);

	return (
		<Comp
			type={type}
			className={styles}
			onClick={handleClick}
			ref={mergeRefs(domRef, ref)}
			disabled={isDisabled}
			{...rest}
		>
			<Slot.Slottable>{children}</Slot.Slottable>
			{!disableRipple && <Ripple {...getRippleProps()} />}
		</Comp>
	);
};
