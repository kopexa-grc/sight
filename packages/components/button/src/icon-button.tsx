import { Button, type ButtonProps } from "./button";

export type IconButtonProps = Omit<ButtonProps, "isIconOnly"> & {
	"aria-label": string;
};

export const IconButton = (props: IconButtonProps) => {
	return <Button {...props} isIconOnly />;
};
