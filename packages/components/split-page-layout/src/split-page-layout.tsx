import { createContext } from "@kopexa/react-utils";
import {
	type SplitPageLayoutVariantProps,
	splitPageLayout,
} from "@kopexa/theme";
import type { ComponentProps } from "react";

/**
 * The goal is to provide a split page layout component for mobile and desktop views
 * if the user is on mobile, the panel will be hidden and the content will take the full width
 * the panel can be toggled by a on the right side of the screen
 */

type SplitPageLayoutContext = {
	styles: ReturnType<typeof splitPageLayout>;
};

const [Provider, useProvider] = createContext<SplitPageLayoutContext>();

export type SplitPageLayoutProps = ComponentProps<"div"> &
	SplitPageLayoutVariantProps;

const SplitPageLayoutRoot = (props: SplitPageLayoutProps) => {
	const { className, children, inset, ...rest } = props;

	const styles = splitPageLayout({ inset });

	return (
		<Provider value={{ styles }}>
			<div
				className={styles.root({
					className,
				})}
				{...rest}
			>
				{children}
			</div>
		</Provider>
	);
};

const SplitPageLayoutContent = ({
	className,
	...props
}: ComponentProps<"div">) => {
	const { styles } = useProvider();

	return <div className={styles.content({ className })} {...props} />;
};

const SplitPageLayoutPanel = ({
	className,
	...props
}: ComponentProps<"div">) => {
	const { styles } = useProvider();
	return (
		<div className={styles.panelContainer()}>
			<div className={styles.panel({ className })} {...props} />
		</div>
	);
};

type PageLayoutBleedProps = ComponentProps<"div">;

const PageLayoutBleed = ({ className, ...props }: PageLayoutBleedProps) => {
	const { styles } = useProvider();

	return <div className={styles.bleed({ className })} {...props} />;
};

export const SplitPageLayout = Object.assign(SplitPageLayoutRoot, {
	Content: SplitPageLayoutContent,
	Panel: SplitPageLayoutPanel,
	Bleed: PageLayoutBleed,
});
