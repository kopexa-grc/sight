import React from "react";
import {Meta} from "@storybook/react";
import { resizable } from "@kopexa/theme";

import { Resizable, ResizableProps } from "../src";

export default {
  title: "Components/Resizable",
  component: Resizable,
} as Meta<typeof Resizable>;

const defaultProps = {
  ...resizable.defaultVariants,
};

const Template = (args: ResizableProps) => <Resizable {...args} />;


export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  }
}