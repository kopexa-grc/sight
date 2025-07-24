import { mapPropsVariants, objectToDeps } from "@kopexa/shared-utils";
import { type CodeVariantProps, code } from "@kopexa/theme";
import { type ComponentProps, useMemo } from "react";

export interface CodeProps
	extends Omit<ComponentProps<"code">, "color" | "size" | "radius">,
		CodeVariantProps {}

export const Code = (originalProps: CodeProps) => {
	const [props, variantProps] = mapPropsVariants(
		originalProps,
		code.variantKeys,
	);
	const { children, className, ...otherProps } = props;

	// biome-ignore lint/correctness/useExhaustiveDependencies: via objectToDeps
	const styles = useMemo(
		() =>
			code({
				...variantProps,
				className,
			}),
		[objectToDeps(variantProps), className],
	);

	return (
		<code className={styles} {...otherProps}>
			{children}
		</code>
	);
};
