import { render } from "@testing-library/react";
import * as React from "react";

import { Separator } from "../src";

describe("Separator", () => {
	it("should render correctly", () => {
		const wrapper = render(<Separator />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Separator ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
