import { CloseIcon } from "@kopexa/icons";
import { mergeRefs } from "@kopexa/react-utils";
import { ariaAttr, chain, cn, dataAttr, isEmpty } from "@kopexa/shared-utils";
import { Spinner } from "@kopexa/spinner";
import {
	type InputVariantProps,
	input,
	type SlotsToClasses,
} from "@kopexa/theme";
import type { InputSlots } from "@kopexa/theme/src/components/input";
import { useControllableState } from "@kopexa/use-controllable-state";
import { useSafeLayoutEffect } from "@kopexa/use-safe-layout-effect";
import { type ComponentProps, useCallback, useMemo, useRef } from "react";

type InputValue = ComponentProps<"input">["value"];

type BaseProps = {
	/**
	 * Element to be rendered in the left side of the input.
	 */
	startContent?: React.ReactNode;
	/**
	 * Element to be rendered in the right side of the input.
	 * if you pass this prop and the `onClear` prop, the passed element
	 * will have the clear button props and it will be rendered instead of the
	 * default clear button.
	 */
	endContent?: React.ReactNode;
	/**
	 * Classname or List of classes to change the classNames of the element.
	 * if `className` is passed, it will be added to the base slot.
	 */
	classNames?: SlotsToClasses<InputSlots>;
	/**
	 * Callback fired when the value is cleared.
	 * if you pass this prop, the clear button will be shown.
	 */
	onClear?: () => void;
	/**
	 * React aria onChange event.
	 */
	onValueChange?: (value: InputValue) => void;
	/**
	 * Loading state of the input.
	 * If true, the input will be disabled and a loading spinner will be shown.
	 */
	loading?: boolean;
};

export type InputProps = Omit<ComponentProps<"input">, "size"> &
	InputVariantProps &
	BaseProps;

export const Input = (props: InputProps) => {
	const {
		className,
		size,
		radius,
		type = "text",
		startContent,
		endContent,
		classNames,
		value: valueProp,
		onChange: onChangeProp,
		onValueChange,
		ref: refProp,
		onClear,
		loading,
		isClearable: propsIsClearable,
		...rest
	} = props;

	const handleValueChange = useCallback(
		(value: InputValue) => {
			onValueChange?.(value ?? "");
		},
		[onValueChange],
	);

	const [inputValue, setInputValue] = useControllableState<InputValue>({
		value: valueProp,
		onChange: handleValueChange,
		defaultValue: props.defaultValue ?? "",
	});
	const domRef = useRef<HTMLInputElement>(null);

	const isFileTypeInput = type === "file";
	const isClearable = !!onClear || propsIsClearable || false;
	const isFilledByDefault = ["date", "time", "month", "week", "range"].includes(
		type,
	);
	const hasUploadedFiles =
		((domRef?.current as HTMLInputElement)?.files?.length ?? 0) > 0;
	const isFilled =
		!isEmpty(valueProp) ||
		isFilledByDefault ||
		hasUploadedFiles ||
		!!inputValue;

	const styles = useMemo(
		() =>
			input({
				size,
				radius,
				isClearable,
			}),
		[size, radius, isClearable],
	);

	const handleClear = useCallback(() => {
		if (isFileTypeInput) {
			(domRef.current as HTMLInputElement).value = "";
		} else {
			setInputValue("");
		}

		onClear?.();
		domRef.current?.focus();
	}, [setInputValue, isFileTypeInput, onClear]);

	const end = useMemo(() => {
		if (isClearable) {
			return (
				<button
					type="button"
					tabIndex={-1}
					disabled={props.disabled}
					aria-label="clear input"
					data-slot="clear-button"
					className={styles.clearButton()}
					onClick={handleClear}
				>
					{endContent || <CloseIcon />}
				</button>
			);
		}
		return endContent;
	}, [
		endContent,
		props?.disabled,
		isClearable,
		styles.clearButton,
		handleClear,
	]);

	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isFileTypeInput) {
			setInputValue(event.target.value);
		}

		onChangeProp?.(event);
	};

	// if we use `react-hook-form`, it will set the input value using the ref in register
	// i.e. setting ref.current.value to something which is uncontrolled
	// hence, sync the state with `ref.current.value`
	useSafeLayoutEffect(() => {
		if (!domRef.current) return;

		setInputValue(domRef.current.value);
	}, [domRef.current]);

	return (
		<div
			className={styles.inputWrapper({
				className: classNames?.inputWrapper,
			})}
			data-disabled={dataAttr(props.disabled)}
			data-readonly={dataAttr(props.readOnly)}
			data-hidden={dataAttr(props.hidden)}
			data-slot="input-wrapper"
		>
			<div
				className={styles.innerWrapper({
					className: classNames?.innerWrapper,
				})}
				data-slot="inner-wrapper"
			>
				{startContent}
				<input
					type={type}
					data-slot="input"
					data-has-start-content={dataAttr(!!startContent)}
					data-has-end-content={dataAttr(!!endContent)}
					data-filled={dataAttr(isFilled)}
					aria-readonly={ariaAttr(props.readOnly)}
					className={styles.input({
						className: cn(classNames?.input, className),
					})}
					value={inputValue}
					onChange={chain(onChangeProp, onChange)}
					ref={mergeRefs(domRef, refProp)}
					{...rest}
				/>
				{loading ? <Spinner size="xs" /> : end}
			</div>
		</div>
	);
};
