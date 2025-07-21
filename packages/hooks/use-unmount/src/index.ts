import { useEffect, useRef } from "react";

/**
 * kopexa useUnmount hook
 *
 * This hook runs a cleanup function when the component is unmounted.
 *
 * @param {() => void} func - The cleanup function to be executed on unmount.
 * @public
 * @note This code originates from https://github.com/juliencrn/usehooks-ts and is adapted for kopexa. Credit to the original authors.
 * @example
 * ```tsx
 * useUnmount(() => {
 *   // Cleanup logic here
 * });
 * ```
 */
export function useUnmount(func: () => void) {
	const funcRef = useRef(func);

	funcRef.current = func;

	useEffect(
		() => () => {
			funcRef.current();
		},
		[],
	);
}
