import { riskBadge } from "@kopexa/theme";
import { type ComponentProps, useMemo } from "react";

type RiskRating = {
	/**
	 * Comment provides additional context or explanation for the risk assessment.
	 */
	comment?: string;
	/**
	 * Consequence represents the impact if the risk occurs on a scale of 1-5.
	 * Higher values indicate more severe consequences.
	 */
	consequence?: number;
	/**
	 * Likelihood represents the probability of the risk occurring on a scale of 1-5.
	 * Higher values indicate greater probability.
	 */
	likelihood?: number;
};

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type RiskBadgeProps = ComponentProps<"div"> & {
	/**
	 * The risk rating object containing likelihood and consequence.
	 * If not provided, an outstanding risk will be displayed.
	 */
	risk?: RiskRating;
	/**
	 * Optional override for the risk level.
	 * If not provided, it will be calculated based on the risk rating.
	 */
	riskLevel?: RiskLevel;
	/**
	 * A callback function that is triggered when the user clicks on the badge.
	 * This is typically used to prompt the user to assess the risk if it is outstanding.
	 */
	onEvaluateClick?: () => void;
};

// risk to grade mapping
const riskToGradeMap: Record<RiskLevel, string> = {
	low: "B",
	medium: "C",
	high: "D",
	critical: "F",
};

export const RiskBadge = (props: RiskBadgeProps) => {
	const {
		className,
		risk,
		riskLevel: propRiskLevel,
		onEvaluateClick,
		...rest
	} = props;

	const rating = useMemo(() => {
		if (
			!risk ||
			typeof risk.likelihood !== "number" ||
			typeof risk.consequence !== "number"
		) {
			return 0;
		}
		return Math.min(25, Math.max(0, risk.likelihood * risk.consequence));
	}, [risk]);

	const hasRisk = useMemo(() => {
		return (
			!!risk &&
			typeof risk.likelihood === "number" &&
			typeof risk.consequence === "number"
		);
	}, [risk]);

	const calculatedRiskLevel = useMemo((): RiskLevel => {
		if (!hasRisk) return "low";

		if (rating <= 4) return "low";
		if (rating <= 9) return "medium";
		if (rating <= 16) return "high";
		return "critical";
	}, [hasRisk, rating]);

	const riskLevel = propRiskLevel || calculatedRiskLevel;

	// Calculate the number of filled dots (1-5)
	const filledDots = useMemo(() => {
		if (!hasRisk) return 0;
		// Map the rating (1-25) to a scale of 1-5 dots
		return Math.ceil(rating / 5);
	}, [hasRisk, rating]);

	// Determine color based on risk level
	const badgeColor = useMemo(() => {
		switch (riskLevel) {
			case "low":
				return "success";
			case "medium":
				return "warning";
			case "high":
				return "destructive";
			case "critical":
				return "destructive";
			default:
				return "default";
		}
	}, [riskLevel]);

	const styles = riskBadge({
		className,
	});

	const handleClick = () => {
		if (onEvaluateClick) {
			onEvaluateClick();
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if ((event.key === "Enter" || event.key === " ") && onEvaluateClick) {
			event.preventDefault();
			onEvaluateClick();
		}
	};

	const displayLevel = hasRisk
		? riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)
		: "Outstanding";

	const isClickable = !!onEvaluateClick;

	// Gemeinsame Komponenten für beide Render-Varianten
	const badgeContent = (
		<>
			<span className={styles.label()}>
				<span className={styles.grade()}>{riskToGradeMap[riskLevel]}</span>
				<span>-</span>
				<span className={styles.level()}>{displayLevel}</span>
			</span>
			<span className={styles.dots()}>
				{[...Array(5)].map((_, index) => (
					<span
						className={styles.dot({
							dotFilled: hasRisk && index < filledDots,
							color: hasRisk ? badgeColor : "default",
						})}
						key={index.toString()}
					></span>
				))}
			</span>
		</>
	);

	return (
		<div className={styles.root()} {...rest}>
			{badgeContent}
		</div>
	);
};
