import { drawer } from "@kopexa/theme";
import type { ComponentProps } from "react";

export type DrawerProps = ComponentProps<"div">;

export const Drawer = (props: DrawerProps) => {
	const { className, children, ...rest } = props;

	const styles = drawer({
		className,
	});

	return (
		<div className={styles} {...rest}>
			{children}
		</div>
	);
};
