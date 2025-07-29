import { render } from "@testing-library/react";
import * as React from "react";

import { SectionRow } from "../src";

describe("SectionRow", () => {
	it("should render correctly", () => {
		const wrapper = render(<SectionRow />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<SectionRow ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
