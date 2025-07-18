import { render } from "@testing-library/react";
import * as React from "react";

import { Dialog } from "../src";

describe("Dialog", () => {
	it("should render correctly", () => {
		const wrapper = render(<Dialog />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Dialog ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
