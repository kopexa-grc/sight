import { button } from "@kopexa/theme";
import type { ComponentProps } from "react";

export type ButtonProps = ComponentProps<"button">;

export const Button = (props: ButtonProps) => {
	const { type = "button", ...rest } = props;

	const styles = button();

	return <button type={type} className={styles} {...rest} />;
};
