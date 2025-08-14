import * as React from "react";
import {render} from "@testing-library/react";

import { IntegrationCard } from "../src";


describe("IntegrationCard", () => {
  it("should render correctly", () => {
   const wrapper = render(<IntegrationCard />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<IntegrationCard ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});