import { tv, type VariantProps } from "tailwind-variants";

export const riskBadge = tv({
	slots: {
		root: ["inline-flex flex-col items-start gap-0.5"],
		label: ["inline-flex items-center gap-0.5 text-xs"],
		grade: ["font-semibold"],
		level: ["font-medium"],
		dots: ["inline-flex items-center gap-0.5"],
		dot: [
			"inline-block w-1.5 h-1.5 rounded-full",
			"transition-all duration-150 ease-in-out",
		],
	},
	variants: {
		color: {
			default: {
				dot: "bg-gray-200 dark:bg-gray-700",
			},
			success: {
				dot: "bg-success",
			},
			destructive: {
				dot: "bg-destructive",
			},
			warning: {
				dot: "bg-warning",
			},
		},
		dotFilled: {
			true: {
				dot: "opacity-100 scale-110",
			},
			false: {
				dot: "opacity-40 scale-100",
			},
		},
	},
});

export type RiskBadgeVariantProps = VariantProps<typeof riskBadge>;
