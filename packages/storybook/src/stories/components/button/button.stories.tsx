import { PlusIcon, SaveIcon } from "@kopexa/icons";
import { Button, type ButtonProps } from "@kopexa/sight";
import { button } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export default {
	title: "Components/Button",
	component: Button,
	argTypes: {
		active: {
			control: {
				type: "boolean",
			},
			options: [true, false],
			defaultValue: false,
		},
		variant: {
			control: {
				type: "select",
			},
			options: ["solid", "ghost", "outline", "link"],
		},
		color: {
			control: {
				type: "select",
			},
			options: [
				"primary",
				"secondary",
				"destructive",
				"warning",
				"success",
				"default",
			],
		},
		size: {
			control: {
				type: "select",
			},
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: {
				type: "boolean",
			},
		},
		isLoading: {
			control: {
				type: "boolean",
			},
		},
	},
	parameters: {
		controls: { expanded: true },
	},
	decorators: [
		(Story, context) => {
			const { active, ...rest } = context.args as {
				active?: boolean;
			} & typeof context.args;
			return (
				<Story
					{...context}
					args={{
						...rest,
						...(active ? { "data-active-state": "on" } : {}),
					}}
				/>
			);
		},
	],
} as Meta<typeof Button>;

const defaultProps = {
	children: "Button",
	...button.defaultVariants,
};

const StateTemplate = (args: ButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handlePress: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		// eslint-disable-next-line no-console
		console.log("Pressed", e);
		setIsOpen((prev) => !prev);
	};

	return (
		<Button
			{...args}
			aria-label={isOpen ? "Close" : "Open"}
			aria-pressed={isOpen}
			onClick={handlePress}
		>
			{isOpen ? "Close" : "Open"}
		</Button>
	);
};

export const Default = {
	args: {
		...defaultProps,
	},
};

export const WithState = {
	render: StateTemplate,

	args: {
		...defaultProps,
	},
};

export const IsDisabled = {
	args: {
		...defaultProps,
		disabled: true,
	},
};

export const DisableRipple = {
	args: {
		...defaultProps,
		disableRipple: true,
	},
};

export const WithIcons = {
	args: {
		...defaultProps,
		startContent: <PlusIcon className="color-current" />,
		endContent: <SaveIcon className="color-current" />,
	},
};
