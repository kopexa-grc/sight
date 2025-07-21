//
// default props + onValueChange
// behvaiour for onValueChange is debounced, with default option of 300ms
// can be overridden by passing a custom value to the `debounce` prop
//
// and when we have content + onClear is provided we render a clear button

import { SearchIcon } from "@kopexa/icons";
import { passwordInput } from "@kopexa/theme";
import { useDebounceCallback } from "@kopexa/use-debounced-callback";
import { Input, type InputProps } from "./input";

type Omitted =
	| "startContent"
	| "endContent"
	| "value"
	| "onValueChange"
	| "onChange";

export type SearchInputProps = Omit<InputProps, Omitted> & {
	onValueChange?: (value: string) => void;
	debounce?: number;
};

export const SearchInput = ({
	defaultValue,
	onValueChange,
	debounce = 300,
	...props
}: SearchInputProps) => {
	const styles = passwordInput();

	const debounced = useDebounceCallback(
		(value: string) => onValueChange?.(value),
		debounce,
	);

	return (
		<Input
			{...props}
			defaultValue={defaultValue}
			onChange={(event) => debounced(event.target.value)}
			startContent={<SearchIcon className={styles.icon()} />}
			isClearable
		/>
	);
};
