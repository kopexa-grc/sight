import { render } from "@testing-library/react";

import { Calendar } from "../src";

describe("Calendar", () => {
	it("should render correctly", () => {
		const wrapper = render(<Calendar />);

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
