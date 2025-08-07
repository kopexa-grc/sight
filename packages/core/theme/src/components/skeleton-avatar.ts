import { tv, type VariantProps } from "tailwind-variants";
import { avatar } from "./avatar";

export const skeletonAvatar = tv({
	base: "rounded-full",
	variants: {
		size: {
			"2xs": avatar.variants.size["2xs"].root,
			xs: avatar.variants.size.xs.root,
			sm: avatar.variants.size.sm.root,
			md: avatar.variants.size.md.root,
			lg: avatar.variants.size.lg.root,
		},
	},
	defaultVariants: {
		size: avatar.defaultVariants.size,
	},
});

export type SkeletonAvatarVariantProps = VariantProps<typeof skeletonAvatar>;
