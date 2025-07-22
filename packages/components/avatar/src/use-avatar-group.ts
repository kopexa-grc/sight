import { getValidChildren, type PropGetter } from "@kopexa/react-utils";
import { cn, compact } from "@kopexa/shared-utils";
import {
	type AvatarGroupSlots,
	type AvatarGroupVariantProps,
	avatarGroup,
	type SlotsToClasses,
} from "@kopexa/theme";
import { type ComponentProps, cloneElement, useMemo } from "react";
import type { AvatarProps } from "./avatar";

type Props = ComponentProps<"div"> & {
	/**
	 * The maximum number of visible avatars
	 * @default 5
	 */
	max?: number;
	/**
	 * Control the number of avatar not visible
	 */
	total?: number;
	/**
	 * Classname or List of classes to change the classNames of the avatar group.
	 * if `className` is passed, it will be added to the base slot.
	 *
	 * @example
	 * ```ts
	 * <AvatarGroup classNames={{
	 *    base: "base-classes",
	 *    count: "count-classes"
	 * }} />
	 * ```
	 */
	classNames?: SlotsToClasses<AvatarGroupSlots>;
};

export type UseAvatarGroupProps = Props &
	Omit<AvatarGroupVariantProps, "children"> &
	Partial<
		Pick<AvatarProps, "size" | "color" | "radius" | "isDisabled" | "isBordered">
	>;

export type ContextType = {
	size?: AvatarProps["size"];
	color?: AvatarProps["color"];
	radius?: AvatarProps["radius"];
	isGrid?: boolean;
	isBordered?: AvatarProps["isBordered"];
	isDisabled?: AvatarProps["isDisabled"];
};

export function useAvatarGroup(props: UseAvatarGroupProps = {}) {
	const {
		ref,
		max = 5,
		total,
		size,
		color,
		radius,
		children,
		isBordered,
		isDisabled,
		isGrid,
		className,
		classNames,
		...otherProps
	} = props;

	const context = useMemo<ContextType>(
		() => ({
			size,
			color,
			radius,
			isGrid,
			isBordered,
			isDisabled,
		}),
		[size, color, radius, isGrid, isBordered, isDisabled],
	);

	const slots = useMemo(
		() => avatarGroup({ className, isGrid }),
		[className, isGrid],
	);

	const validChildren = getValidChildren(children);
	const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

	const remainingCount = total
		? total
		: max != null
			? validChildren.length - max
			: -1;

	const clones = childrenWithinMax.map((child, index) => {
		const isFirstAvatar = index === 0;
		const isLastAvatar = index === childrenWithinMax.length - 1;

		const childProps = {
			className: cn(
				isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
				isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : "",
			),
		};

		return cloneElement(child, compact(childProps));
	});

	const getAvatarGroupProps: PropGetter = () => {
		return {
			ref,
			className: slots.base({
				class: cn(classNames?.base, className),
			}),
			role: "group",
			...otherProps,
		};
	};

	const getAvatarGroupCountProps = () => {
		return {
			className: slots.count({
				class: classNames?.count,
			}),
		} as AvatarProps;
	};

	return {
		context,
		remainingCount,
		clones,
		getAvatarGroupProps,
		getAvatarGroupCountProps,
	};
}
