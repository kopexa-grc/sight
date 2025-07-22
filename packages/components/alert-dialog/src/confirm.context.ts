import { createContext } from "@kopexa/react-utils";
import type { ConfirmFunction } from "./confirm.types";

type ConfirmContextValue = {
	confirm: ConfirmFunction;
};

export const [ConfirmInternalProvider, useConfirm] =
	createContext<ConfirmContextValue>();
