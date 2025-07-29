import { render } from "@testing-library/react";
import * as React from "react";

import { Callout } from "../src";

describe("Callout", () => {
	it("should render correctly", () => {
		const wrapper = render(<Callout />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Callout ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
