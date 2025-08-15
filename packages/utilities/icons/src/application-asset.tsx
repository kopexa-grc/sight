import type { IconSvgProps } from "./types";

export const ApplicationAssetIcon = ({ size = 24, ...props }: IconSvgProps) => {
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
			<title>Application Asset Icon</title>
			<rect width="20" height="16" x="2" y="4" rx="2" />
			<path d="M6 8h.01" />
			<path d="M10 8h.01" />
			<path d="M14 8h.01" />
		</svg>
	);
};
