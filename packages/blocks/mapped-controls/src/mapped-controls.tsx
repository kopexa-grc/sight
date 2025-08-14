import type { ComponentProps } from "react";

export type MappedControlsProps = ComponentProps<"div">;

export const MappedControls = (props: MappedControlsProps) => {
	const { className, children, ...rest } = props;

	// biome-ignore lint/style/useTemplate: placeholder
	const styles = "mapped-controls-root" + (className ? ` ${className}` : "");

	return (
		<div className={styles} {...rest}>
			{children}
		</div>
	);
};
