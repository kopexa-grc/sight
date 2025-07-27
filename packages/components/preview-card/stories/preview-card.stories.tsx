import React from "react";
import {Meta} from "@storybook/react";
import { preview-card } from "@kopexa/theme";

import { PreviewCard, PreviewCardProps } from "../src";

export default {
  title: "Components/PreviewCard",
  component: PreviewCard,
} as Meta<typeof PreviewCard>;

const defaultProps = {
  ...preview-card.defaultVariants,
};

const Template = (args: PreviewCardProps) => <PreviewCard {...args} />;


export const Default = {
  render: Template,
  args: {
    ...defaultProps,
  }
}