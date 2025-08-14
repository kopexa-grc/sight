import * as React from "react";
import {render} from "@testing-library/react";

import { MappedControls } from "../src";


describe("MappedControls", () => {
  it("should render correctly", () => {
   const wrapper = render(<MappedControls />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<MappedControls ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});