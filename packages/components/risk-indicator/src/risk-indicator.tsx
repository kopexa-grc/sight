import { type RiskIndicatorVariantProps, riskIndicator } from "@kopexa/theme";
import type { ComponentProps } from "react";
import { forwardRef, useMemo } from "react";

export type RiskLevel = "none" | "low" | "medium" | "high";

export interface RiskIndicatorProps
	extends ComponentProps<"div">,
		Pick<RiskIndicatorVariantProps, "size"> {
	/**
	 * Risk value between 0-25, where 0 is no risk and 25 is maximum risk
	 */
	value?: number;
	/**
	 * Risk level, used when no value is provided
	 */
	level?: RiskLevel;
}

/**
 * RiskIndicator component displays risk levels as a series of bars, similar to a network wifi indicator.
 * It shows 3 bars in total with different colors based on the risk level.
 * - 0 renders empty bars (no risk)
 * - 1-8 represents low risk (1 bar)
 * - 9-16 represents medium risk (2 bars)
 * - 17-25 represents high risk (3 bars)
 */
export const RiskIndicator = forwardRef<HTMLDivElement, RiskIndicatorProps>(
	function RiskIndicator(props, ref) {
		const { className, value, level: propLevel, size, ...rest } = props;

		const level = useMemo(() => {
			if (propLevel) return propLevel;
			if (value === undefined) return "none";

			if (value <= 0) return "none";
			if (value >= 1 && value <= 8) return "low";
			if (value >= 9 && value <= 16) return "medium";
			if (value >= 17) return "high";

			return "none";
		}, [value, propLevel]);

		const { base } = riskIndicator({
			level,
			size,
		});

		return (
			<div
				className={base({ className })}
				role="img"
				aria-label={`Risk level: ${level}`}
				ref={ref}
				{...rest}
			>
				<Bar active={level !== "none"} level={level} position={1} />
				<Bar
					active={level === "medium" || level === "high"}
					level={level}
					position={2}
				/>
				<Bar active={level === "high"} level={level} position={3} />
			</div>
		);
	},
);

interface BarProps {
	active: boolean;
	level: RiskLevel;
	position: 1 | 2 | 3;
}

const Bar = ({ active, level, position }: BarProps) => {
	const {
		bar,
		barLow,
		barMedium,
		barHigh,
		barInactive,
		barHeight1,
		barHeight2,
		barHeight3,
		barWidth,
	} = riskIndicator();

	const getBarColor = () => {
		if (!active) return barInactive();

		switch (level) {
			case "low":
				return barLow();
			case "medium":
				return barMedium();
			case "high":
				return barHigh();
			default:
				return barInactive();
		}
	};

	const getBarHeight = () => {
		switch (position) {
			case 1:
				return barHeight1();
			case 2:
				return barHeight2();
			case 3:
				return barHeight3();
		}
	};

	return (
		<div
			className={`${barWidth()} ${getBarHeight()} ${getBarColor()} ${bar()}`}
			data-position={position}
			data-active={active}
		/>
	);
};
