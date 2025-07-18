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
