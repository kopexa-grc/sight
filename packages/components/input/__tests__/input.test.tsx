import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";

import { Input } from "../src";

describe("Input", () => {
	it("should render correctly", () => {
		const wrapper = render(<Input />);

		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLInputElement>();

		render(<Input ref={ref} />);
		expect(ref.current).not.toBeNull();
	});

	it("should have aria-readonly when isReadOnly", () => {
		const { container } = render(<Input readOnly />);

		expect(container.querySelector("input")).toHaveAttribute(
			"aria-readonly",
			"true",
		);
	});

	it("should have disabled attribute when isDisabled", () => {
		const { container } = render(<Input disabled />);

		expect(container.querySelector("input")).toHaveAttribute("disabled");
	});

	it("should disable the clear button when isDisabled", () => {
		const { getByRole } = render(<Input isClearable disabled />);

		const clearButton = getByRole("button");

		expect(clearButton).toBeDisabled();
	});

	it("should not allow clear button to be focusable", () => {
		const { getByRole } = render(<Input isClearable />);

		const clearButton = getByRole("button");

		expect(clearButton).toHaveAttribute("tabIndex", "-1");
	});

	it("should have required attribute when isRequired with native validationBehavior", () => {
		const { container } = render(<Input required />);

		expect(container.querySelector("input")).toHaveAttribute("required");
		expect(container.querySelector("input")).not.toHaveAttribute(
			"aria-required",
		);
	});

	it("should have the correct type attribute", () => {
		const { container } = render(<Input type="email" />);

		expect(container.querySelector("input")).toHaveAttribute("type", "email");

		const { container: container2 } = render(<Input type="number" />);

		expect(container2.querySelector("input")).toHaveAttribute("type", "number");

		const { container: container3 } = render(<Input type="password" />);

		expect(container3.querySelector("input")).toHaveAttribute(
			"type",
			"password",
		);

		const { container: container4 } = render(<Input type="search" />);

		expect(container4.querySelector("input")).toHaveAttribute("type", "search");

		const { container: container5 } = render(<Input type="tel" />);

		expect(container5.querySelector("input")).toHaveAttribute("type", "tel");

		const { container: container6 } = render(<Input type="text" />);

		expect(container6.querySelector("input")).toHaveAttribute("type", "text");
	});

	it("should call dom event handlers only once", () => {
		const onFocus = jest.fn();

		const { container } = render(<Input onFocus={onFocus} />);

		act(() => {
			container.querySelector("input")?.focus();
		});
		act(() => {
			container.querySelector("input")?.blur();
		});

		expect(onFocus).toHaveBeenCalledTimes(1);
	});

	it("should work with keyboard input", async () => {
		const { getByTestId } = render(<Input data-testid="input" />);

		const input = getByTestId("input") as HTMLInputElement;

		const user = userEvent.setup();

		act(() => {
			input.focus();
		});
		expect(input.value).toBe("");

		await user.keyboard("Hello World!");
		expect(input.value).toBe("Hello World!");

		await user.keyboard("[Backspace][Backspace]");
		expect(input.value).toBe("Hello Worl");

		await user.keyboard("[ArrowLeft][Delete]");
		expect(input.value).toBe("Hello Wor");
	});

	it("should highlight text with user multi-clicks", async () => {
		const { getByTestId } = render(
			<Input data-testid="input" defaultValue="Hello World!" />,
		);

		const input = getByTestId("input") as HTMLInputElement;

		const user = userEvent.setup();

		expect(input.value).toBe("Hello World!");

		// in react testing library, input dblClick selects the word/symbol, tripleClick selects the entire text
		await user.tripleClick(input);
		await user.keyboard("Goodbye World!");
		expect(input.value).toBe("Goodbye World!");

		await user.tripleClick(input);
		await user.keyboard("[Delete]");
		expect(input.value).toBe("");
	});

	it("should focus input on click", async () => {
		const { getByTestId } = render(<Input data-testid="input" />);

		const input = getByTestId("input") as HTMLInputElement;

		const user = userEvent.setup();

		expect(document.activeElement).not.toBe(input);

		await user.click(input);
		expect(document.activeElement).toBe(input);
		act(() => {
			input.blur();
		});
		expect(document.activeElement).not.toBe(input);
	});

	it("ref should update the value", () => {
		const ref = React.createRef<HTMLInputElement>();

		render(<Input ref={ref} type="text" />);

		if (!ref.current) {
			throw new Error("ref is null");
		}
		const value = "value";

		// biome-ignore lint/style/noNonNullAssertion: testing
		ref.current!.value = value;

		expect(ref.current?.value)?.toBe(value);
	});

	it("should clear the value and onClear is triggered", async () => {
		const onClear = jest.fn();

		const ref = React.createRef<HTMLInputElement>();

		const { getByRole } = render(
			<Input
				ref={ref}
				isClearable
				defaultValue="hello@kopexa.com"
				onClear={onClear}
			/>,
		);

		const clearButton = getByRole("button");

		expect(clearButton).not.toBeNull();

		const user = userEvent.setup();

		await user.click(clearButton);

		expect(ref.current?.value)?.toBe("");

		expect(onClear).toHaveBeenCalledTimes(1);
	});
});
