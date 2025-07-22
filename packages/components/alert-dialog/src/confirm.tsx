import { type ReactNode, useCallback, useMemo, useState } from "react";
import { ConfirmInternalProvider } from "./confirm.context";
import { ConfirmDialog } from "./confirm.dialog";
import type { ConfirmOptions } from "./confirm.types";

export interface ConfirmDialogState {
	isOpen: boolean;
	config: ConfirmOptions;
	resolver: ((value: boolean) => void) | null;
}

type ConfirmDialogProviderProps = {
	children: ReactNode;
};

const defaultOptions: ConfirmOptions = {
	title: "Are you sure?",
	children: "This action cannot be undone.",
	confirmButtonContent: "OK",
	cancelButtonContent: "Cancel",
	confirmButtonType: "destructive",
	confirmButtonVariant: "solid",
};

export const ConfirmDialogProvider = ({
	children,
}: ConfirmDialogProviderProps) => {
	const [dialogState, setDialogState] = useState<ConfirmDialogState>({
		isOpen: false,
		config: defaultOptions,
		resolver: null,
	});

	const confirm = useCallback((options: ConfirmOptions) => {
		setDialogState((prev) => ({
			isOpen: true,
			config: { ...defaultOptions, ...options },
			resolver: prev.resolver,
		}));
		return new Promise<boolean>((resolve) => {
			setDialogState((prev) => ({
				...prev,
				resolver: resolve,
			}));
		});
	}, []);

	const handleCancel = useCallback(() => {
		setDialogState((prev) => {
			if (prev.resolver) {
				prev.resolver(false);
			}
			return {
				...prev,
				isOpen: false,
				resolver: null,
			};
		});
	}, []);

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) {
				handleCancel();
			}
		},
		[handleCancel],
	);

	const handleConfirm = useCallback(() => {
		setDialogState((prev) => {
			if (prev.resolver) {
				prev.resolver(true);
			}
			return {
				...prev,
				isOpen: false,
				resolver: null,
			};
		});
	}, []);

	const context = useMemo(() => ({ confirm }), [confirm]);

	return (
		<ConfirmInternalProvider value={context}>
			{children}
			<ConfirmDialog
				isOpen={dialogState.isOpen}
				onOpenChange={handleOpenChange}
				onConfirm={handleConfirm}
				onCancel={handleCancel}
				config={dialogState.config || {}}
			/>
		</ConfirmInternalProvider>
	);
};
