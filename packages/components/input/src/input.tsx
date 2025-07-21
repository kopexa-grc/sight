import { type InputVariantProps, input } from "@kopexa/theme";
import type { ComponentProps } from "react";

export type InputProps = ComponentProps<"input"> & InputVariantProps;

export const Input = (props: InputProps) => {
	const { className, size, type = "text", ...rest } = props;

	const styles = input({
		size,
		className,
	});

	return <input type={type} data-slot="input" className={styles} {...rest} />;
};
