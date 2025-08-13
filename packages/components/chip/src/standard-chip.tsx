import { type StandardChipVariants, standardChip } from "@kopexa/theme";
import type { ChipProps } from "./chip";

type Omitted =
	| "indicator"
	| "indicatorColor"
	| "startContent"
	| "endContent"
	| "standard";

type BaseProps = ChipProps & StandardChipVariants;

export type StandardChipProps = Omit<BaseProps, Omitted> & {
	standard: string;
};

export const StandardChip = (props: StandardChipProps) => {
	const {
		className,
		size,
		radius,
		color,
		variant,
		standard: standardProp,
		...rest
	} = props;

	let standard = standardProp;
	if (standardChip.variants.standard[standardProp]) {
		standard = standardProp;
	}

	const styles = standardChip({
		size,
		radius,
		color,
		variant,
		className,
		standard: standard as keyof StandardChipVariants["standard"],
	});

	return (
		<div className={styles.root()} {...rest}>
			<span className={styles.hexagon()} />
			<span className={styles.content()}>{standard}</span>
		</div>
	);
};
