/** biome-ignore-all lint/suspicious/noExplicitAny: utility file */
/** biome-ignore-all lint/complexity/noBannedTypes: utility file */
/** biome-ignore-all lint/performance/noAccumulatingSpread: utility file */

type Extractable =
	| {
			[key: string]: any;
	  }
	| undefined;

export function compact<T extends Record<any, any>>(object: T) {
	const clone = Object.assign({}, object);

	for (const key in clone) {
		if (clone[key] === undefined) delete clone[key];
	}

	return clone;
}

export const mapPropsVariants = <
	T extends Record<string, any>,
	K extends keyof T,
>(
	props: T,
	variantKeys?: K[],
	removeVariantProps = true,
): readonly [Omit<T, K> | T, Pick<T, K> | {}] => {
	if (!variantKeys) {
		return [props, {}];
	}

	const picked = variantKeys.reduce((acc, key) => {
		// Only include the key in `picked` if it exists in `props`
		if (key in props) {
			return { ...acc, [key]: props[key] };
		} else {
			return acc;
		}
	}, {});

	if (removeVariantProps) {
		const omitted = Object.keys(props)
			.filter((key) => !variantKeys.includes(key as K))
			.reduce((acc, key) => ({ ...acc, [key]: props[key as keyof T] }), {});

		return [omitted, picked] as [Omit<T, K>, Pick<T, K>];
	} else {
		return [props, picked] as [T, Pick<T, K>];
	}
};

/**
 * Converts an object into a JSON string. Returns an empty string if the object
 * is not extractable or if a circular reference is detected during stringification.
 *
 * @param obj - The object to convert into a dependency string.
 *
 * @returns A JSON string representation of the object or an empty string if conversion fails.
 *
 * @example
 * objectToDeps({ key: 'value' }); // returns '{"key":"value"}'
 * objectToDeps(undefined); // returns ""
 */
export function objectToDeps(obj: Extractable) {
	if (!obj || typeof obj !== "object") {
		return "";
	}

	try {
		return JSON.stringify(obj);
	} catch {
		return "";
	}
}
