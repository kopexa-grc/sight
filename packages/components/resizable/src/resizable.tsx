import { GripVerticalIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { resizable } from "@kopexa/theme";
import type { ComponentProps } from "react";
import * as ResizablePrimitive from "react-resizable-panels";

type ResizableContextValue = {
	styles: ReturnType<typeof resizable>;
};

const [ResizableProvider, useResizableContext] =
	createContext<ResizableContextValue>();

export type ResizableProps = ComponentProps<
	typeof ResizablePrimitive.PanelGroup
>;

const ResizableRoot = (props: ResizableProps) => {
	const { className, children, ...rest } = props;

	const styles = resizable();

	return (
		<ResizableProvider value={{ styles }}>
			<ResizablePrimitive.PanelGroup
				className={styles.root({ className })}
				{...rest}
			>
				{children}
			</ResizablePrimitive.PanelGroup>
		</ResizableProvider>
	);
};

export type ResizablePanelProps = ComponentProps<
	typeof ResizablePrimitive.Panel
>;

function ResizablePanel({ ...props }: ResizablePanelProps) {
	const { styles } = useResizableContext();
	return (
		<ResizablePrimitive.Panel
			className={styles.panel({ className: props.className })}
			{...props}
		/>
	);
}

export type ResizableHandleProps = ComponentProps<
	typeof ResizablePrimitive.PanelResizeHandle
> & {
	withHandle?: boolean;
};

function ResizableHandle({
	withHandle,
	className,
	...props
}: ResizableHandleProps) {
	const { styles } = useResizableContext();

	return (
		<ResizablePrimitive.PanelResizeHandle
			data-slot="resizable-handle"
			className={styles.handle({ className })}
			{...props}
		>
			{withHandle && (
				<div className={styles.iconContainer()}>
					<GripVerticalIcon />
				</div>
			)}
		</ResizablePrimitive.PanelResizeHandle>
	);
}

export const Resizable = Object.assign(ResizableRoot, {
	Panel: ResizablePanel,
	Handle: ResizableHandle,
});
