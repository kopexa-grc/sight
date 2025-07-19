import { render } from "@testing-library/react";

import { Popover } from "../src";

describe("Popover", () => {
	it("should render correctly", () => {
		const wrapper = render(<Popover.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		render(<Popover.Root />);
	});
});
