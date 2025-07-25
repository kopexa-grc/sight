import { Button, Checkbox, type CheckboxProps } from "@kopexa/sight";
import { checkbox } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Forms/Checkbox",
	component: Checkbox,
} as Meta<typeof Checkbox>;

const defaultProps = {
	...checkbox.defaultVariants,
};

const Template = (args: CheckboxProps) => <Checkbox {...args} />;

const FormTemplate = (args: CheckboxProps) => {
	return (
		<form
			className="flex flex-col items-start gap-2"
			onSubmit={(e) => {
				e.preventDefault();
				// @ts-ignore
				// biome-ignore lint/complexity/useLiteralKeys: testing.!
				const checkbox = e.target["check"] as HTMLInputElement;

				if (checkbox.checked) {
					alert(`Submitted value: ${checkbox.value}`);
				} else {
					alert("Checkbox is not checked");
				}
			}}
		>
			<Checkbox name="check" {...args}>
				Check
			</Checkbox>
			<Button type="submit">Submit</Button>
		</form>
	);
};

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};

export const WithForm = {
	render: FormTemplate,

	args: {
		...defaultProps,
	},
};
