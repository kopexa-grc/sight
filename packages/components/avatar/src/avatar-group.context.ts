import { createContext } from "@kopexa/react-utils";
import type { ContextType } from "./use-avatar-group";

export const [AvatarGroupProvider, useAvatarGroupContext] =
	createContext<ContextType>({
		name: "AvatarGroupContext",
		strict: false,
	});
