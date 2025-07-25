import { mergeRefs } from "@kopexa/react-utils";
import { Ripple, type RippleProps, useRipple } from "@kopexa/ripple";
import { dataAttr } from "@kopexa/shared-utils";
import { Spinner, type SpinnerProps } from "@kopexa/spinner";
import { type ButtonVariantProps, button } from "@kopexa/theme";
import * as Slot from "@radix-ui/react-slot";
import {
	type ComponentProps,
	type ReactNode,
	useCallback,
	useMemo,
	useRef,
} from "react";

export type ButtonProps = ComponentProps<"button"> &
	ButtonVariantProps & {
		/**
		 * The button start content.
		 */
		startContent?: ReactNode;
		/**
		 * The button end content.
		 */
		endContent?: ReactNode;

		/**
		 * The spinner placement.
		 * @default "start"
		 */
		spinnerPlacement?: "start" | "end";
		/**
		 * render the button as a different component.
		 * @default false
		 * @example
		 * <Button asChild><Link to="/path">Link</Link></Button>
		 */
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
		size = "md",
		className,
		color,
		radius,
		fullWidth,
		startContent,
		endContent,
		isIconOnly,
		spinnerPlacement = "start",
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

	const styles = useMemo(() => {
		return button({
			variant,
			size,
			color,
			radius,
			fullWidth,
			isIconOnly,
			className,
		});
	}, [variant, size, color, radius, isIconOnly, fullWidth, className]);

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

	const spinnerSize = useMemo(() => {
		const buttonSpinnerSizeMap: Record<string, SpinnerProps["size"]> = {
			sm: "xs",
			md: "sm",
			lg: "md",
		};

		return buttonSpinnerSizeMap[size];
	}, [size]);

	return (
		<Comp
			type={type}
			className={styles}
			onClick={handleClick}
			ref={mergeRefs(domRef, ref)}
			disabled={isDisabled}
			// data
			data-disabled={dataAttr(isDisabled)}
			data-loading={dataAttr(isLoading)}
			aria-disabled={isDisabled}
			tabIndex={isDisabled ? -1 : undefined}
			{...rest}
		>
			{isLoading && spinnerPlacement === "start" ? (
				<Spinner color="current" size={spinnerSize} />
			) : (
				startContent
			)}
			<Slot.Slottable>{children}</Slot.Slottable>
			{isLoading && spinnerPlacement === "end" ? (
				<Spinner color="current" size={spinnerSize} />
			) : (
				endContent
			)}
			{!disableRipple && <Ripple {...getRippleProps()} />}
		</Comp>
	);
};
