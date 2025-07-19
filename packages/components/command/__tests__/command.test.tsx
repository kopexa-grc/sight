import { render } from "@testing-library/react";
import * as React from "react";

import { Command } from "../src";

describe("Command", () => {
	it("should render correctly", () => {
		const wrapper = render(<Command.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Command.Root ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
