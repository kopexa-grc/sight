import { render } from "@testing-library/react";

import { HoverCard } from "../src";

describe("HoverCard", () => {
	it("should render correctly", () => {
		const wrapper = render(<HoverCard.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
