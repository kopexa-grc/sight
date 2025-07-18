import { render, screen } from "@testing-library/react";
import React from "react";
import { useControllableState } from "../src";

describe("useControllableState", () => {
	it("should work as uncontrolled by default", () => {
		const TestComponent = () => {
			const [value, setValue] = useControllableState({ defaultValue: 0 });
			return (
				<button type="button" onClick={() => setValue((v) => v + 1)}>
					{value}
				</button>
			);
		};
		render(<TestComponent />);
		const button = screen.getByRole("button");
		expect(button.textContent).toBe("0");
		button.click();
		expect(button.textContent).toBe("1");
	});

	it("should work as controlled", () => {
		const TestComponent = () => {
			const [value, setValue] = React.useState(5);
			const [state] = useControllableState({ value, onChange: setValue });
			return <span>{state}</span>;
		};
		render(<TestComponent />);
		expect(screen.getByText("5")).toBeInTheDocument();
	});

	it("should call onChange when value changes", () => {
		const handleChange = jest.fn();
		const TestComponent = () => {
			const [value, setValue] = useControllableState({
				defaultValue: 0,
				onChange: handleChange,
			});
			return (
				<button type="button" onClick={() => setValue(42)}>
					{value}
				</button>
			);
		};
		render(<TestComponent />);
		screen.getByRole("button").click();
		expect(handleChange).toHaveBeenCalledWith(42);
	});
});
