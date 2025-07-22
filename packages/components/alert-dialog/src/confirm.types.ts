export interface ConfirmOptions {
	/**
	 * Required. The title of the ConfirmationDialog. This is usually a brief
	 * question.
	 */
	title: React.ReactNode;
	/**
	 * The content of the dialog.
	 */
	children?: React.ReactNode;
	/**
	 * The text to use for the confirm button. Default: "OK".
	 */
	confirmButtonContent?: React.ReactNode;
	/**
	 * The text to use for the cancel button. Default: "Cancel".
	 */
	cancelButtonContent?: React.ReactNode;
	/**
	 * The type of button to use for the confirm button. Default: Button.
	 */
	confirmButtonType?: "primary" | "destructive";
	/**
	 * The variant of the confirm button. Default: "solid".
	 */
	confirmButtonVariant?: "solid" | "outline" | "ghost";
	/**
	 * Hide confirm button. Default: false.
	 */
	hideConfirmButton?: boolean;
}

export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;
