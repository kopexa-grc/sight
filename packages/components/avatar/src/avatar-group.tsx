import { Avatar } from "./avatar";
import { AvatarGroupProvider } from "./avatar-group.context";
import { type UseAvatarGroupProps, useAvatarGroup } from "./use-avatar-group";

export interface AvatarGroupProps extends UseAvatarGroupProps {}

export function AvatarGroup(props: AvatarGroupProps) {
	const {
		clones,
		context,
		remainingCount,
		getAvatarGroupCountProps,
		getAvatarGroupProps,
	} = useAvatarGroup(props);

	return (
		<div {...getAvatarGroupProps()}>
			<AvatarGroupProvider value={context}>
				{clones}
				{remainingCount > 0 && (
					<Avatar {...getAvatarGroupCountProps()} name={`+${remainingCount}`} />
				)}
			</AvatarGroupProvider>
		</div>
	);
}
