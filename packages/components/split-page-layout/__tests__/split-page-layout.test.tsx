import { render } from "@testing-library/react";

import { SplitPageLayout } from "../src";

describe("SplitPageLayout", () => {
	it("should render correctly", () => {
		const wrapper = render(<SplitPageLayout />);

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
