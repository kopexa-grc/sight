import type { IconSvgProps } from "./types";

export const PlusIcon = (props: IconSvgProps) => {
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
			<title>Plus Icon</title>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
};
