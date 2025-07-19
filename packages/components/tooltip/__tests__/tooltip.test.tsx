import { render } from "@testing-library/react";

import { Tooltip } from "../src";

describe("Tooltip", () => {
	it("should render correctly", () => {
		const wrapper = render(<Tooltip content="hello" />);

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
