import type { ComponentProps } from "react";

export type MappedControlsProps = ComponentProps<"div">;

export const MappedControls = (props: MappedControlsProps) => {
	const { className, children, ...rest } = props;

	const styles = "mapped-controls-root";

	return (
		<div className={styles} {...rest}>
			{children}
		</div>
	);
};
