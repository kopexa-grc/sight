import type { IconSvgProps } from "./types";

export const CircleIcon = (props: IconSvgProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<title>Circle Icon</title>
			<circle cx="12" cy="12" r="10" /> <path d="M20 6 9 17l-5-5" />
		</svg>
	);
};
