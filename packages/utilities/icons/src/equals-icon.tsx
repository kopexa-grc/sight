import type { IconSvgProps } from "./types";

export const EqualsIcon = ({ size = 24, ...props }: IconSvgProps) => {
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
			<title>Equals icon</title>
			<line x1="5" x2="19" y1="9" y2="9" />
			<line x1="5" x2="19" y1="15" y2="15" />
		</svg>
	);
};
