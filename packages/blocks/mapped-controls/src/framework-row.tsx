import { RelatedControlChip, StandardChip } from "@kopexa/chip";
import { frameworkRow } from "@kopexa/theme";
import { type ComponentProps, useState } from "react";

type MappingType = "EQUAL" | "INTERSECT" | "PARTIAL" | "SUBSET" | "SUPERSET";

type BaseProps = {
	standard: string;
	codes: string[];
	/**
	 * Initial number of visible codes in the row.
	 * This can be used to control how many codes are displayed initially.
	 * @default 8
	 */
	initialVisible?: number;
	mappingType: MappingType;
	relation: string;
};

type StandardRowProps = ComponentProps<"div"> & BaseProps;

export function StandardRow(props: StandardRowProps) {
	const {
		className,
		standard,
		codes = [],
		initialVisible = 8,
		mappingType,
		relation,
		...rest
	} = props;

	const [expanded, setExpanded] = useState(false);
	const visible = expanded ? codes : codes.slice(0, initialVisible);
	const hasMore = codes.length > initialVisible;

	const styles = frameworkRow();

	return (
		<div className={styles.root({ className })} {...rest}>
			<div className={styles.standardContainer()}>
				<StandardChip standard={standard} />
			</div>
			<div className={styles.refCodeContainer()}>
				{visible.map((code) => (
					<RelatedControlChip
						key={`${standard}:${code}`}
						refCode={code}
						mappingType={mappingType}
						relation={relation}
					/>
				))}
				{hasMore && (
					<button
						type="button"
						onClick={() => setExpanded((v) => !v)}
						className={styles.toggleButton()}
						aria-expanded={expanded}
					>
						{expanded ? "Show less" : `+${codes.length - initialVisible} more`}
					</button>
				)}
			</div>
		</div>
	);
}
