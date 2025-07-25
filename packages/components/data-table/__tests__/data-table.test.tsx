import { render } from "@testing-library/react";
import * as React from "react";

import { DataTable } from "../src";

describe("DataTable", () => {
	it("should render correctly", () => {
		const wrapper = render(<DataTable />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<DataTable ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
