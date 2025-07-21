import { render } from "@testing-library/react";
import * as React from "react";

import { DropdownMenu } from "../src";

describe("DropdownMenu", () => {
	it("should render correctly", () => {
		const wrapper = render(<DropdownMenu.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLButtonElement>();

		render(
			<DropdownMenu.Root>
				<DropdownMenu.Trigger ref={ref}>Open Menu</DropdownMenu.Trigger>
				<DropdownMenu.Content />
			</DropdownMenu.Root>,
		);
		expect(ref.current).not.toBeNull();
	});
});
