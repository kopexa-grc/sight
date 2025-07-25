import { render } from "@testing-library/react";
import * as React from "react";

import { Heading } from "../src";

describe("Heading", () => {
	it("should render correctly", () => {
		const wrapper = render(<Heading />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLHeadingElement>();

		render(<Heading ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
