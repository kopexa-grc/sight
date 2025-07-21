import { Button, Input, type InputProps } from "@kopexa/sight";
import { input } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Input",
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
	return (
		<div className="flex flex-row gap-x-2">
			<Input type="file" size={size} />
			<Button size={size}>Submit</Button>
		</div>
	);
};
