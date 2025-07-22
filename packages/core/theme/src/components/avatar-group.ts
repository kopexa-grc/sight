import { tv, type VariantProps } from "tailwind-variants";

export const avatarGroup = tv({
	slots: {
		base: "flex items-center justify-center h-auto w-max",
		count: "hover:-translate-x-0",
	},
	variants: {
		isGrid: {
			true: "inline-grid grid-cols-4 gap-3",
		},
	},
});

export type AvatarGroupVariantProps = VariantProps<typeof avatarGroup>;
export type AvatarGroupSlots = keyof ReturnType<typeof avatarGroup>;

// calculated classNames
// src/components/avatar/src/use-avatar-group.ts
// -ms-2 hover:-translate-x-0 ms-0
