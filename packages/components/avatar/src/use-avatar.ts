import type { PropGetter } from "@kopexa/react-utils";
import { cn } from "@kopexa/shared-utils";
import {
	type AvatarSlots,
	type AvatarVariantProps,
	avatar,
	type SlotsToClasses,
} from "@kopexa/theme";
import {
	type ComponentProps,
	type RefObject,
	useCallback,
	useMemo,
	useState,
} from "react";
import { useAvatarGroupContext } from "./avatar-group.context";

interface Props extends ComponentProps<"span"> {
	/**
	 * Ref to the Image DOM node.
	 */
	imgRef?: RefObject<HTMLImageElement | null>;
	/**
	 * The name of the person in the avatar. -
	 * if **src** has loaded, the name will be used as the **alt** attribute of the **img**
	 * - If **src** is not loaded, the name will be used to create the initials
	 */
	name?: string;
	/**
	 * Image source.
	 */
	src?: string;
	/**
	 * Image alt text.
	 */
	alt?: string;
	classNames?: SlotsToClasses<AvatarSlots>;
	onLoadingStatusChange?: (status: ImageStatus) => void;
	/**
	 * Function called when image failed to load
	 */
	onError?: () => void;
}

export type UseAvatarProps = Props &
	Omit<AvatarVariantProps, "children" | "isInGroup" | "isInGridGroup">;

export type ImageStatus = "idle" | "loading" | "loaded" | "error";

export function useAvatar(originalProps: UseAvatarProps = {}) {
	const groupContext = useAvatarGroupContext();
	const isInGroup = !!groupContext;

	const {
		ref,
		src,
		name,
		classNames,
		alt = name || "avatar",
		imgRef: imgRefProp,
		color = groupContext?.color ?? "default",
		radius = groupContext?.radius ?? "full",
		size = groupContext?.size ?? "md",
		isBordered = groupContext?.isBordered ?? false,
		isDisabled = groupContext?.isDisabled ?? false,
		className,
		onError,
		onLoadingStatusChange,
		...otherProps
	} = originalProps;

	const [status, setStatus] = useState<ImageStatus>("idle");

	const handleLoadingStatusChange = useCallback(
		(status: "idle" | "loading" | "loaded" | "error") => {
			onLoadingStatusChange?.(status);
			setStatus(status);
		},
		[onLoadingStatusChange],
	);

	const slots = useMemo(
		() =>
			avatar({
				color,
				radius,
				size,
				isBordered,
				isDisabled,
				isInGroup,
				isInGridGroup: groupContext?.isGrid ?? false,
			}),
		[
			color,
			radius,
			size,
			isBordered,
			isDisabled,
			isInGroup,
			groupContext?.isGrid,
		],
	);

	const baseStyles = cn(classNames?.root, className);

	const getAvatarProps = useCallback<PropGetter>(
		(props = {}) => ({
			ref,
			"data-slot": "avatar",
			className: slots.root({
				class: cn(baseStyles, props?.className),
			}),
			...otherProps,
		}),
		// biome-ignore lint/correctness/useExhaustiveDependencies: we want to memoize this
		[slots, baseStyles, otherProps, ref],
	);

	const getImageProps = useCallback<PropGetter>(
		() => ({
			"data-slot": "avatar-image",
			"data-status": status,
			src,
			onLoadingStatusChange: handleLoadingStatusChange,
			ref: imgRefProp,
			alt,
			onError,
			className: slots.img({
				class: classNames?.img,
			}),
		}),
		[
			status,
			src,
			handleLoadingStatusChange,
			imgRefProp,
			alt,
			slots.img,
			classNames?.img,
			onError,
		],
	);

	return {
		src,
		alt,
		slots,
		classNames,
		name,
		getAvatarProps,
		getImageProps,
	};
}
