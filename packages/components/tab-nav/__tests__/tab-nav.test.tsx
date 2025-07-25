import { render } from "@testing-library/react";
import * as React from "react";

import { TabNav } from "../src";

describe("TabNav", () => {
	it("should render correctly", () => {
		const wrapper = render(<TabNav />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<TabNav ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
