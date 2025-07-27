import { IconButton } from "@kopexa/button";
import { CloseIcon } from "@kopexa/icons";
import { createContext } from "@kopexa/react-utils";
import { type PreviewCardVariantProps, previewCard } from "@kopexa/theme";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

type PreviewCardContext = {
	styles: ReturnType<typeof previewCard>;
};

const [Provider, useProvider] = createContext<PreviewCardContext>();

export type PreviewCardProps = ComponentProps<"div"> &
	PreviewCardVariantProps & {
		asChild?: boolean;
	};

const PreviewCardRoot = (props: PreviewCardProps) => {
	const {
		className,
		children,
		asChild,
		size,
		isBordered,
		isHoverable,
		...rest
	} = props;
	const Component = asChild ? Slot : "div";

	const styles = previewCard({
		size,
		isBordered,
		isHoverable,
	});

	return (
		<Provider value={{ styles }}>
			<Component className={styles.root({ className })} {...rest}>
				{children}
			</Component>
		</Provider>
	);
};

export type PreviewCardIcon = ComponentProps<"div">;

function PreviewCardIcon(props: PreviewCardIcon) {
	const { className, children, ...rest } = props;
	const { styles } = useProvider();

	return (
		<div className={styles.icon({ className })} {...rest}>
			{children}
		</div>
	);
}

export type PreviewCardContent = ComponentProps<"div">;

function PreviewCardContent(props: PreviewCardContent) {
	const { className, children, ...rest } = props;
	const { styles } = useProvider();

	return (
		<div className={styles.content({ className })} {...rest}>
			{children}
		</div>
	);
}

export type PreviewCardTitleProps = ComponentProps<"p">;

function PreviewCardTitle({ className, ...props }: PreviewCardTitleProps) {
	const { styles } = useProvider();

	return <p className={styles.title({ className })} {...props} />;
}

export type PreviewCardDescriptionProps = ComponentProps<"p">;

function PreviewCardDescription({
	className,
	...props
}: PreviewCardDescriptionProps) {
	const { styles } = useProvider();

	return <p className={styles.description({ className })} {...props} />;
}

export type PreviewCardActionProps = ComponentProps<typeof IconButton>;

export const PreviewCardAction = ({
	className,
	onClick,
	...props
}: PreviewCardActionProps) => {
	const { styles } = useProvider();

	return (
		<IconButton
			variant="ghost"
			size="sm"
			className={styles.action({ className })}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				onClick?.(e);
			}}
			{...props}
		>
			<CloseIcon />
		</IconButton>
	);
};

export type PreviewCardTagsProps = ComponentProps<"div">;

function PreviewCardTags({ className, ...props }: PreviewCardTagsProps) {
	const { styles } = useProvider();
	return <div className={styles.tags({ className })} {...props} />;
}

export const PreviewCard = Object.assign(PreviewCardRoot, {
	Icon: PreviewCardIcon,
	Content: PreviewCardContent,
	Title: PreviewCardTitle,
	Description: PreviewCardDescription,
	Action: PreviewCardAction,
	Tags: PreviewCardTags,
});
