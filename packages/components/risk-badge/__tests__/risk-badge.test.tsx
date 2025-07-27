import { render } from "@testing-library/react";
import * as React from "react";

import { RiskBadge } from "../src";

describe("RiskBadge", () => {
	it("should render correctly", () => {
		const wrapper = render(<RiskBadge />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<RiskBadge ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
