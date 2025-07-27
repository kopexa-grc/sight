import * as React from "react";
import {render} from "@testing-library/react";

import { Resizable } from "../src";


describe("Resizable", () => {
  it("should render correctly", () => {
   const wrapper = render(<Resizable />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Resizable ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});