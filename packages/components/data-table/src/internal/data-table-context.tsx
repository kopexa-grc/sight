import { createContext } from "@kopexa/react-utils";
import type { dataTable } from "@kopexa/theme";
import type { UseDataTableReturn } from "src/use-data-table";

type DataTableContextType<TData> = {
	instance: UseDataTableReturn<TData>;
	styles: ReturnType<typeof dataTable>;
};

export const [DataTableProvider, useDataTableContext] =
	// biome-ignore lint/suspicious/noExplicitAny: can't use generic here due to circular dependency issues
	createContext<DataTableContextType<any>>();
