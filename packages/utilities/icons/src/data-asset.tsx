import type { IconSvgProps } from "./types";

export const DataAssetIcon = ({ size = 24, ...props }: IconSvgProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>Plattform Asset icon</title>
			<ellipse cx="12" cy="5" rx="9" ry="3" />
			<path d="M3 5V19A9 3 0 0 0 21 19V5" />
			<path d="M3 12A9 3 0 0 0 21 12" />
		</svg>
	);
};
