import type { IconSvgProps } from "./types";

export const CatalogIcon = ({ size = 24, ...props }: IconSvgProps) => {
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
			<title>Catalog icon</title>
			<path d="m16 6 4 14" />
			<path d="M12 6v14" />
			<path d="M8 8v12" />
			<path d="M4 4v16" />
		</svg>
	);
};
