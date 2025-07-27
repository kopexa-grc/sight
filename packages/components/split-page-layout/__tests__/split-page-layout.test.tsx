import * as React from "react";
import {render} from "@testing-library/react";

import { SplitPageLayout } from "../src";


describe("SplitPageLayout", () => {
  it("should render correctly", () => {
   const wrapper = render(<SplitPageLayout />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<SplitPageLayout ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});