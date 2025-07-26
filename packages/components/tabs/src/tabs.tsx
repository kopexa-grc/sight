import { createContext } from "@kopexa/react-utils";
import { tabs } from "@kopexa/theme";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";

type TabsContextValue = {
	styles: ReturnType<typeof tabs>;
};

const [TabsProvider, useTabsContext] = createContext<TabsContextValue>();

export type TabsProps = ComponentProps<typeof TabsPrimitive.Root>;

function TabsRoot({ className, ...props }: TabsProps) {
	const styles = tabs();

	return (
		<TabsProvider value={{ styles }}>
			<TabsPrimitive.Root
				data-slot="tabs"
				className={styles.root({ className })}
				{...props}
			/>
		</TabsProvider>
	);
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	const { styles } = useTabsContext();

	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={styles.list({ className })}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	const { styles } = useTabsContext();

	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={styles.trigger({ className })}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	const { styles } = useTabsContext();
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={styles.content({ className })}
			{...props}
		/>
	);
}

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});
