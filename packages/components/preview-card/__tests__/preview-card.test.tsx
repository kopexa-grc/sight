import * as React from "react";
import {render} from "@testing-library/react";

import { PreviewCard } from "../src";


describe("PreviewCard", () => {
  it("should render correctly", () => {
   const wrapper = render(<PreviewCard />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<PreviewCard ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});