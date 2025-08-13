import type { IconSvgProps } from "./types";

export const ChevronsLeftRightEllipsisIcon = ({
	size = 24,
	...props
}: IconSvgProps) => {
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
			<title>ChevronsLeftRightEllipsis icon</title>
			<path d="M12 12h.01" />
			<path d="M16 12h.01" />
			<path d="m17 7 5 5-5 5" />
			<path d="m7 7-5 5 5 5" />
			<path d="M8 12h.01" />
		</svg>
	);
};
