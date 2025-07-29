import {
	AlertCircleIcon,
	AlertIcon,
	CheckCirleIcon,
	CloseIcon,
	InfoIcon,
	ShellIcon,
} from "@kopexa/icons";
import { cn } from "@kopexa/shared-utils";
import { type CalloutVariantProps, callout } from "@kopexa/theme";
import type { ComponentProps } from "react";

export type CalloutProps = ComponentProps<"div"> &
	CalloutVariantProps & {
		/**
		 * The content to display inside the callout.
		 */
		children: React.ReactNode;
		/**
		 * The title of the callout.
		 * This is typically used to provide a brief summary or label for the callout content.
		 */
		title?: string;
		/**
		 * Custom icon to override the default icon for the variant
		 */
		icon?: React.ReactNode;
		/**
		 * Callback function when the callout is dismissed
		 * If provided, a close button will be shown
		 */
		onDismiss?: () => void;
	};

export const Callout = (props: CalloutProps) => {
	const {
		className,
		children,
		title,
		variant = "default",
		radius,
		size,
		icon,
		onDismiss,
		...rest
	} = props;

	const styles = callout({
		variant,
		radius,
		size,
	});

	const getIcon = () => {
		if (icon) return icon;

		switch (variant) {
			case "info":
				return <InfoIcon className={styles.icon()} />;
			case "success":
				return <CheckCirleIcon className={styles.icon()} />;
			case "warning":
				return <AlertIcon className={styles.icon()} />;
			case "destructive":
				return <AlertCircleIcon className={styles.icon()} />;
			default:
				return <ShellIcon className={styles.icon()} />;
		}
	};

	return (
		<div className={cn(styles.root(), className)} {...rest}>
			<div className={styles.iconContainer()}>{getIcon()}</div>
			<div className={styles.content()}>
				{title && <div className={styles.title()}>{title}</div>}
				<div>{children}</div>
			</div>
			{onDismiss && (
				<button
					type="button"
					onClick={onDismiss}
					className={styles.closeButton()}
					aria-label="Close"
				>
					<CloseIcon className="h-4 w-4" />
				</button>
			)}
		</div>
	);
};
