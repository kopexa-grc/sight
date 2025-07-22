import { render } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import * as React from "react";

import { Card } from "../src";

describe("Card", () => {
	let user: UserEvent;

	beforeEach(() => {
		user = userEvent.setup();
	});

	it("should render correctly", () => {
		const wrapper = render(<Card.Root />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();

		render(<Card.Root ref={ref} />);
		expect(ref.current).not.toBeNull();
	});

	it("should support hoverable", () => {
		const wrapper = render(<Card.Root isHoverable />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("should be clicked when is pressable", async () => {
		const onPress = jest.fn();
		const { getByRole } = render(<Card.Root isPressable onClick={onPress} />);

		const button = getByRole("button");

		await user.click(button);

		expect(onPress).toHaveBeenCalled();
	});

	it("should trigger onPress function", async () => {
		const onPress = jest.fn();
		const { getByRole } = render(<Card.Root isPressable onClick={onPress} />);

		const button = getByRole("button");

		await user.click(button);

		expect(onPress).toHaveBeenCalled();
	});

	it("should render correctly when nested", () => {
		const wrapper = render(
			<Card.Root>
				<Card.Root />
			</Card.Root>,
		);

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
