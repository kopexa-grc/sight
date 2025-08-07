import { cn } from "@kopexa/shared-utils";
import { type SkeletonAvatarVariantProps, skeletonAvatar } from "@kopexa/theme";
import { Skeleton, type SkeletonProps } from "./skeleton";

export type SkeletonAvatarProps = SkeletonProps & SkeletonAvatarVariantProps;

export const SkeletonAvatar = (props: SkeletonAvatarProps) => {
	const { size, className, ...restProps } = props;
	const baseStyle = skeletonAvatar({ size });

	return <Skeleton {...restProps} className={cn(baseStyle, className)} />;
};
