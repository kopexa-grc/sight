import React from "react";
import {Meta} from "@storybook/react";
import { drawer } from "@kopexa/theme";

import { Drawer, DrawerProps } from "../src";

export default {
  title: "Components/Drawer",
  component: Drawer,
} as Meta<typeof Drawer>;

const defaultProps = {
  ...drawer.defaultVariants,
};

const Template = (args: DrawerProps) => <Drawer {...args} />;


export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  }
}