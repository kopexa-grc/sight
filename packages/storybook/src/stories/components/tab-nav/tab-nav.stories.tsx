import { CheckIcon } from "@kopexa/icons";
import { TabNav, type TabNavProps } from "@kopexa/sight";
import { tabNav } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export default {
	title: "Components/TabNav",
	component: TabNav,
} as Meta<typeof TabNav>;

const defaultProps = {
	...tabNav.defaultVariants,
};

const Template = (args: TabNavProps) => {
	const [active, setActive] = useState<string>("overview");
	return (
		<TabNav {...args}>
			<TabNav.Link
				active={active === "overview"}
				onClick={() => setActive("overview")}
			>
				<CheckIcon />
				Overview
			</TabNav.Link>
			<TabNav.Link
				active={active === "details"}
				onClick={() => setActive("details")}
			>
				Details
			</TabNav.Link>
			<TabNav.Link
				active={active === "settings"}
				onClick={() => setActive("settings")}
			>
				Settings
			</TabNav.Link>
		</TabNav>
	);
};

export const Default = {
	render: Template,
	args: {
		...defaultProps,
	},
};
