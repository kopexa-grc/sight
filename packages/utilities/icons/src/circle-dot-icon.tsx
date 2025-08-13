import type { IconSvgProps } from "./types";

export const CircleDotIcon = ({ size = 24, ...props }: IconSvgProps) => {
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
			<title>CircleDot icon</title>
			<circle cx="12" cy="12" r="10" />
			<circle cx="12" cy="12" r="1" />
		</svg>
	);
};
