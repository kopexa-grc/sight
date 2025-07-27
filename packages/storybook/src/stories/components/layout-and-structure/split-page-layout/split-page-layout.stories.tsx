import {
	Heading,
	SplitPageLayout,
	type SplitPageLayoutProps,
} from "@kopexa/sight";
import { splitPageLayout } from "@kopexa/theme";
import type { Meta } from "@storybook/react";

export default {
	title: "Components/Layout And Structure/SplitPageLayout",
	parameters: {
		layout: "fullscreen",
	},
	component: SplitPageLayout,
	decorators: [
		(Story) => (
			<div className="min-h-svh flex w-full">
				<div className="bg-background relative flex-1 flex flex-col">
					<Story />
				</div>
			</div>
		),
	],
} as Meta<typeof SplitPageLayout>;

const defaultProps = {
	...splitPageLayout.defaultVariants,
};

const Template = (args: SplitPageLayoutProps) => (
	<SplitPageLayout {...args}>
		<SplitPageLayout.Content>
			<div className="p-4">
				<Heading>Content Area</Heading>
				<p>This is the content area of the split page layout.</p>
			</div>
		</SplitPageLayout.Content>
		<SplitPageLayout.Panel>
			<div className="p-4">
				<Heading level={"h2"}>Panel Area</Heading>
				<p>This is the panel area of the split page layout.</p>
			</div>
			<div className="h-[4000px] bg-red-50">
				demonstrate the split page layout with a panel on the right side. This
				panel can be used for additional information, actions, or navigation.
				and a scrollable content area on the left side.
			</div>
		</SplitPageLayout.Panel>
	</SplitPageLayout>
);

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
