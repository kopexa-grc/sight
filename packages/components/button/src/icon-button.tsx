import { Tooltip } from "@kopexa/tooltip";
import { cloneElement, isValidElement, useMemo } from "react";
import { Button, type ButtonProps } from "./button";

export type IconButtonProps = Omit<ButtonProps, "isIconOnly"> & {
	"aria-label": string;
};

export const IconButton = (props: IconButtonProps) => {
	const { "aria-label": ariaLabel, children, ...rest } = props;

	const label = ariaLabel || children;

	const toolip = useMemo(() => {
		if (label && typeof label === "string") {
			return label;
		}

		return undefined;
	}, [label]);

	const clonedChildren = isValidElement(children)
		? // biome-ignore lint/suspicious/noExplicitAny: forcing type to any
			cloneElement(children as any, { "aria-hidden": true })
		: children;

	if (toolip) {
		return (
			<Tooltip content={toolip}>
				<Button {...rest} aria-label={ariaLabel} isIconOnly>
					{clonedChildren}
				</Button>
			</Tooltip>
		);
	}

	return (
		<Button {...rest} aria-label={ariaLabel} isIconOnly>
			{clonedChildren}
		</Button>
	);
};
