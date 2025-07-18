import { getUniqueID } from "@kopexa/shared-utils";
import type React from "react";
import { useCallback, useState } from "react";

export type RippleType = {
	key: React.Key;
	x: number;
	y: number;
	size: number;
};

export function useRipple() {
	const [ripples, setRipples] = useState<RippleType[]>([]);

	const onClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
		const trigger = event.target as HTMLElement;

		const size = Math.max(trigger.clientWidth, trigger.clientHeight);

		const rect = trigger.getBoundingClientRect();
		const x = event.clientX - rect.left - size / 2;
		const y = event.clientY - rect.top - size / 2;

		setRipples((prevRipples) => [
			...prevRipples,
			{
				key: getUniqueID(prevRipples.length.toString()),
				size,
				x,
				y,
			},
		]);
	}, []);

	const onClear = useCallback((key: React.Key) => {
		setRipples((prevState) => prevState.filter((ripple) => ripple.key !== key));
	}, []);

	return { ripples, onClick, onClear };
}
