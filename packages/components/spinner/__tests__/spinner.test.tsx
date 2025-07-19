import { render } from "@testing-library/react";
import * as React from "react";

import { Spinner } from "../src";

describe("Spinner", () => {
	it("should render correctly", () => {
		const wrapper = render(<Spinner />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Spinner ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
