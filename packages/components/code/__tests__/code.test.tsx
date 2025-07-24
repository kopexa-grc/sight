import { render } from "@testing-library/react";
import * as React from "react";

import { Code } from "../src";

describe("Code", () => {
	it("should render correctly", () => {
		const wrapper = render(<Code />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Code ref={ref} />);
		expect(ref.current).not.toBeNull();
	});

	it("should include the code", () => {
		const wrapper = render(
			<Code data-testid="code-test">npm install @kopexa/sight</Code>,
		);

		expect(wrapper.getByTestId("code-test")).toHaveTextContent(
			"npm install @kopexa/sight",
		);
	});
});
