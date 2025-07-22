import type { ConfirmOptions } from "./confirm.types";
import * as AlertDialog from "./namespace";

type ConfirmationDialogProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	config: ConfirmOptions;
	onConfirm: () => void;
	onCancel: () => void;
};

export const ConfirmDialog = (props: ConfirmationDialogProps) => {
	const { isOpen, onOpenChange, config, onCancel, onConfirm } = props;

	return (
		<AlertDialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>{config.title}</AlertDialog.Title>
					<AlertDialog.Description>{config.children}</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel onClick={onCancel}>
						{config.cancelButtonContent}
					</AlertDialog.Cancel>
					{!config.hideConfirmButton && (
						<AlertDialog.Action
							onClick={onConfirm}
							color={config.confirmButtonType}
							variant={config.confirmButtonVariant}
						>
							{config.confirmButtonContent}
						</AlertDialog.Action>
					)}
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};
