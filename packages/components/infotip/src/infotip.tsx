import { IconButton } from "@kopexa/button";
import { HoverCard } from "@kopexa/hover-card";
import { InfoIcon } from "@kopexa/icons";

export type InfotipProps = HoverCard.ContentProps & {
	label?: string;
};

export function Infotip(props: InfotipProps) {
	const { label = "Info", ...restProps } = props;
	return (
		<HoverCard.Root>
			<HoverCard.Trigger>
				<IconButton variant="ghost" aria-label={label} size="sm">
					<InfoIcon />
				</IconButton>
			</HoverCard.Trigger>
			<HoverCard.Content {...restProps} />
		</HoverCard.Root>
	);
}
