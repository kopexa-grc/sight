import {
	Children,
	cloneElement,
	type ReactNode,
	type Ref,
	type RefCallback,
} from "react";

/**
 * A function that merges React refs into one.
 * Supports both functions and ref objects created using createRef() and useRef().
 *
 * Usage:
 * ```tsx
 * <div ref={mergeRefs(ref1, ref2, ref3)} />
 * ```
 *
 * @param {(Ref<T> | undefined)[]} inputRefs Array of refs
 * @returns {Ref<T> | RefCallback<T>} Merged refs
 */
export function mergeRefs<T>(
	...inputRefs: (Ref<T> | undefined)[]
): Ref<T> | RefCallback<T> {
	const filteredInputRefs = inputRefs.filter(Boolean);

	if (filteredInputRefs.length <= 1) {
		const firstRef = filteredInputRefs[0];

		return firstRef || null;
	}

	return function mergedRefs(ref) {
		for (const inputRef of filteredInputRefs) {
			if (typeof inputRef === "function") {
				inputRef(ref);
			} else if (inputRef) {
				(inputRef as React.RefObject<T | null>).current = ref;
			}
		}
	};
}

/**
 * This is a helper function that is used when a component supports `asChild`
 * using the `Slot` component but its implementation contains nested DOM elements.
 *
 * Using it ensures if a consumer uses the `asChild` prop, the elements are in
 * correct order in the DOM, adopting the intended consumer `children`.
 */
export function getSubtree(
	options: { asChild: boolean | undefined; children: ReactNode },
	content: ReactNode | ((children: ReactNode) => ReactNode),
) {
	const { asChild, children } = options;
	if (!asChild)
		return typeof content === "function" ? content(children) : content;

	const firstChild = Children.only(children) as React.ReactElement;
	return cloneElement(firstChild, {
		// @ts-expect-error
		children:
			typeof content === "function"
				? // @ts-expect-error
					content(firstChild.props.children)
				: content,
	});
}
