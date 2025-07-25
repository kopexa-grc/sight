import { skeleton } from "@kopexa/theme";
import type { ComponentProps } from "react";

export type SkeletonProps = ComponentProps<"div">;

export const Skeleton = (props: SkeletonProps) => {
	const { className, children, ...rest } = props;

	const styles = skeleton({
		className,
	});

	return (
		<div className={styles} {...rest}>
			{children}
		</div>
	);
};
