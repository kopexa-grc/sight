import {
	ChevronsLeftRightEllipsisIcon,
	EqualsIcon,
	IntersectIcon,
	PartialIcon,
	SubsetIcon,
	SupersetIcon,
} from "@kopexa/icons";
import { relatedControlChip } from "@kopexa/theme";
import { Tooltip } from "@kopexa/tooltip";
import * as Slot from "@radix-ui/react-slot";

type MappingType = "EQUAL" | "INTERSECT" | "PARTIAL" | "SUBSET" | "SUPERSET";

export type RelatedControlChipProps = {
	refCode: string;
	mappingType?: MappingType;
	relation?: string | null;
	/**
	 * Render the chip as a different component.
	 * @default false
	 * @example
	 * <RelatedControlChip asChild><Link to="/path">Link</Link></RelatedControlChip>
	 */
	asChild?: boolean;
};

const MappingIconMapper: Record<MappingType, React.ReactNode> = {
	EQUAL: <EqualsIcon />,
	INTERSECT: <IntersectIcon />,
	SUBSET: <SubsetIcon />,
	PARTIAL: <PartialIcon />,
	SUPERSET: <SupersetIcon />,
};

export const RelatedControlChip = ({
	refCode,
	mappingType,
	relation,
	asChild,
}: RelatedControlChipProps) => {
	const tooltipDisabled = !relation && !mappingType;
	const Comp = asChild ? Slot.Root : "span";

	const styles = relatedControlChip();

	if (!tooltipDisabled) {
		return (
			<Tooltip
				side="top"
				className={styles.tooltip()}
				content={
					<div className="flex flex-col gap-1">
						{mappingType && (
							<div className="flex gap-1 items-center">
								<ChevronsLeftRightEllipsisIcon size={12} />
								<span>Mapping type</span>
								<div
									className={`ml-4 flex w-2.5 h-2.5 justify-center items-center ${mappingType === "SUPERSET" ? "h-5 w-5" : "h-2.5 w-2.5"}`}
								>
									{MappingIconMapper[mappingType]}
								</div>
								<span className="capitalize">{mappingType.toLowerCase()}</span>
							</div>
						)}
					</div>
				}
			>
				<Comp className={styles.root()}>{refCode}</Comp>
			</Tooltip>
		);
	}

	return <Comp className={styles.root()}>{refCode}</Comp>;
};
