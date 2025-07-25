import { heading } from "@kopexa/theme";
import type { ComponentProps } from "react";

// Only allow heading elements h1-h6
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type HeadingProps = {
	level?: HeadingLevel;
	className?: string;
	children?: React.ReactNode;
} & Omit<ComponentProps<HeadingLevel>, "className" | "children" | "level">;

export const Heading = (props: HeadingProps) => {
	const { className, children, level = "h1", ...rest } = props;
	const Component = level;
	const styles = heading({ className, level });
	return (
		<Component className={styles} {...rest}>
			{children}
		</Component>
	);
};
