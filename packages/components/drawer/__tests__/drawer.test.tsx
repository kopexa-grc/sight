import * as React from "react";
import {render} from "@testing-library/react";

import { Drawer } from "../src";


describe("Drawer", () => {
  it("should render correctly", () => {
   const wrapper = render(<Drawer />);

    expect(() => wrapper.unmount()).not.toThrow();
  });

  it("ref should be forwarded", () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Drawer ref={ref} />);
    expect(ref.current).not.toBeNull();
  });
});