import { render } from "@testing-library/react";
import * as React from "react";

import { Blankstate } from "../src";

describe("Blankstate", () => {
	it("should render correctly", () => {
		const wrapper = render(<Blankstate />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Blankstate ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
