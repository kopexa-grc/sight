/** biome-ignore-all lint/complexity/noBannedTypes: utility library */
/** biome-ignore-all lint/suspicious/noExplicitAny: utility library */
type Args<T extends Function> = T extends (...args: infer R) => any ? R : never;

/**
 * Generates a unique identifier using a specified prefix and a random number.
 *
 * @param prefix - The prefix to prepend to the unique identifier.
 * @returns A string that combines the prefix and a random number.
 *
 * @example
 * getUniqueID('btn'); // returns 'btn-123456'
 */
export function getUniqueID(prefix: string) {
	return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * Creates a function that invokes each provided function with the same argument, until
 * one of the functions calls `event.preventDefault()`.
 *
 * @param fns - An array of functions that may or may not be defined.
 * @returns A function that takes an event and invokes each handler with this event.
 *
 * @typeParam T - A function type that takes an event-like argument.
 *
 * @example
 * const handler1 = event => console.log('Handled by first', event.type);
 * const handler2 = event => event.preventDefault();
 * const allHandlers = callAllHandlers(handler1, handler2);
 * allHandlers({ type: 'click' });
 */
export function callAllHandlers<T extends (event: any) => void>(
	...fns: (T | undefined)[]
) {
	return function func(event: Args<T>[0]) {
		fns.some((fn) => {
			fn?.(event);

			return event?.defaultPrevented;
		});
	};
}
