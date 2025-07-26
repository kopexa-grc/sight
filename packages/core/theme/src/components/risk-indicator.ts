import { tv, type VariantProps } from "tailwind-variants";

export const riskIndicator = tv({
	slots: {
		base: "flex items-end gap-0.5",
		bar: "rounded-sm",
		barLow: "bg-green-500",
		barMedium: "bg-yellow-500",
		barHigh: "bg-red-500",
		barInactive: "bg-gray-200",
		barHeight1: "h-1/3",
		barHeight2: "h-2/3",
		barHeight3: "h-full",
		barWidth: "w-1",
	},
	variants: {
		level: {
			none: "",
			low: "",
			medium: "",
			high: "",
		},
		size: {
			sm: "h-3",
			md: "h-4",
			lg: "h-5",
		},
	},
	defaultVariants: {
		level: "none",
		size: "md",
	},
});

export type RiskIndicatorVariantProps = VariantProps<typeof riskIndicator>;
