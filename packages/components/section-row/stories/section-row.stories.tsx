import React from "react";
import {Meta} from "@storybook/react";
import { section-row } from "@kopexa/theme";

import { SectionRow, SectionRowProps } from "../src";

export default {
  title: "Components/SectionRow",
  component: SectionRow,
} as Meta<typeof SectionRow>;

const defaultProps = {
  ...section-row.defaultVariants,
};

const Template = (args: SectionRowProps) => <SectionRow {...args} />;


export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  }
}