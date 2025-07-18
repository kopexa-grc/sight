import { useCallbackRef } from "@kopexa/use-callback-ref";
import { useMemo, useState } from "react";

/**
 * Determines if a component is controlled (receives its value from props) or uncontrolled (manages its own state).
 * Returns a tuple: [isControlled, value].
 *
 * @template T - The type of the value.
 * @param prop - The controlled value from props, or undefined if uncontrolled.
 * @param state - The internal state value.
 * @returns [boolean, T] - Whether the component is controlled, and the current value.
 */
export function useControllableProp<T>(prop: T | undefined, state: T) {
	const controlled = typeof prop !== "undefined";
	const value = controlled ? prop : state;
	return useMemo<[boolean, T]>(() => [controlled, value], [controlled, value]);
}

/**
 * Props for the useControllableState hook.
 *
 * @template T - The type of the value.
 * @property value - The controlled value (if provided).
 * @property defaultValue - The initial value for uncontrolled usage.
 * @property onChange - Callback fired when the value changes.
 * @property shouldUpdate - Custom comparison function to determine if the value should update.
 */
export interface UseControllableStateProps<T> {
	value?: T;
	defaultValue?: T | (() => T);
	onChange?: (value: T) => void;
	shouldUpdate?: (prev: T, next: T) => boolean;
}

/**
 * A React hook for building controlled or uncontrolled components.
 *
 * - If `value` is provided, the component is controlled and must be updated via `onChange`.
 * - If `value` is not provided, the component manages its own state internally.
 *
 * Returns a tuple: [value, setValue].
 *
 * @template T - The type of the value.
 * @param props - The props for controlling the state.
 * @returns [T, Dispatch<SetStateAction<T>>] - The current value and a setter function.
 *
 * @example
 * const [value, setValue] = useControllableState({
 *   value: props.value,
 *   defaultValue: 0,
 *   onChange: props.onChange,
 * });
 */
export function useControllableState<T>(props: UseControllableStateProps<T>) {
	const {
		value: valueProp,
		defaultValue,
		onChange,
		shouldUpdate = (prev, next) => prev !== next,
	} = props;

	// Always reference the latest onChange and shouldUpdate callbacks
	const onChangeProp = useCallbackRef(onChange);
	const shouldUpdateProp = useCallbackRef(shouldUpdate);

	// Internal state for uncontrolled usage
	const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);
	const controlled = valueProp !== undefined;
	const value = controlled ? valueProp : uncontrolledState;

	/**
	 * Updates the value, calling onChange and updating state if uncontrolled.
	 * Accepts either a value or a function updater.
	 */
	const setValue = useCallbackRef(
		(next: React.SetStateAction<T>) => {
			const setter = next as (prevState?: T) => T;
			const nextValue = typeof next === "function" ? setter(value) : next;

			// Only update if shouldUpdate returns true
			if (!shouldUpdateProp(value, nextValue)) {
				return;
			}

			// Update internal state if uncontrolled
			if (!controlled) {
				setUncontrolledState(nextValue);
			}

			// Notify change
			onChangeProp(nextValue);
		},
		[controlled, onChangeProp, value, shouldUpdateProp],
	);

	return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}
