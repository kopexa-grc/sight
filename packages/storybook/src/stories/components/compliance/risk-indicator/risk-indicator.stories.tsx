import { RiskIndicator } from "@kopexa/sight";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof RiskIndicator> = {
	title: "Components/RiskIndicator",
	component: RiskIndicator,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		value: {
			control: { type: "range", min: 0, max: 25, step: 1 },
			description: "Risk value between 0-25",
		},
		level: {
			control: { type: "select" },
			options: ["none", "low", "medium", "high"],
			description: "Risk level, used when no value is provided",
		},
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
			description: "Size of the risk indicator",
		},
	},
};

export default meta;
type Story = StoryObj<typeof RiskIndicator>;

export const Default: Story = {
	args: {},
};

export const WithValue: Story = {
	args: {
		value: 15,
	},
};

export const WithLevel: Story = {
	args: {
		level: "high",
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">Small:</span>
				<RiskIndicator size="sm" level="high" />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">Medium:</span>
				<RiskIndicator size="md" level="high" />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">Large:</span>
				<RiskIndicator size="lg" level="high" />
			</div>
		</div>
	),
};

export const AllLevels: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">None:</span>
				<RiskIndicator level="none" />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">Low:</span>
				<RiskIndicator level="low" />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">Medium:</span>
				<RiskIndicator level="medium" />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">High:</span>
				<RiskIndicator level="high" />
			</div>
		</div>
	),
};

export const ValueExample: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">0:</span>
				<RiskIndicator value={0} />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">5:</span>
				<RiskIndicator value={5} />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">12:</span>
				<RiskIndicator value={12} />
			</div>
			<div className="flex items-center gap-2">
				<span className="w-10 text-sm">20:</span>
				<RiskIndicator value={20} />
			</div>
		</div>
	),
};
