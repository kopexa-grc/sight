import { render } from "@testing-library/react";
import * as React from "react";

import { Table } from "../src";

describe("Table", () => {
	it("should render correctly", () => {
		const wrapper = render(<Table.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLTableElement>();

		render(<Table.Root ref={ref} />);
		expect(ref.current).not.toBeNull();
	});
});
