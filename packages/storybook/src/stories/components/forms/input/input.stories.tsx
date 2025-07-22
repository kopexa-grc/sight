import {
	Button,
	Input,
	type InputProps,
	PasswordInput as PasswordInputComponent,
	SearchInput,
} from "@kopexa/sight";
import { input } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export default {
	title: "Components/Forms/Input",
	component: Input,
	argTypes: {
		size: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
	},
} as Meta<typeof Input>;

const defaultProps = {
	...input.defaultVariants,
};

const Template = (args: InputProps) => <Input {...args} />;

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const WithButton = ({ size }: InputProps) => {
	const [value, setValue] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};

	return (
		<div className="max-w-sm">
			<div className="flex flex-row gap-x-2">
				<Input
					type="text"
					placeholder="placeholder"
					size={size}
					value={value}
					onChange={handleChange}
				/>
				<Button size={size}>Submit</Button>
			</div>
			<div className="mt-2">
				<p>Current Value: {value}</p>
			</div>
		</div>
	);
};

export const PasswordInput = ({ size }: InputProps) => {
	return (
		<div className="max-w-sm">
			<div className="flex flex-row gap-x-2">
				<PasswordInputComponent size={size} />
			</div>
		</div>
	);
};

export const Search = ({ size }: InputProps) => {
	const [value, setValue] = useState("search");

	return (
		<div className="max-w-sm">
			<div className="flex flex-row gap-x-2">
				<SearchInput
					size={size}
					onClear={() => setValue("")}
					onValueChange={setValue}
					defaultValue={value}
				/>
			</div>
			<div>Debounced: {value}</div>
		</div>
	);
};
