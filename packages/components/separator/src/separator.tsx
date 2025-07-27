import { type SeparatorVariantProps, separator } from "@kopexa/theme";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import type { ComponentProps } from "react";

export type SeparatorProps = ComponentProps<typeof SeparatorPrimitive.Root> &
	SeparatorVariantProps;

export const Separator = ({
	className,
	orientation = "horizontal",
	decorative = true,
	bleed,
	...props
}: SeparatorProps) => {
	const styles = separator({
		className,
		orientation,
		bleed,
	});

	return (
		<SeparatorPrimitive.Root
			data-slot="separator"
			decorative={decorative}
			orientation={orientation}
			className={styles}
			{...props}
		/>
	);
};
