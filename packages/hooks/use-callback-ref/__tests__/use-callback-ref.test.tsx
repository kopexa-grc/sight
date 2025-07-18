import { render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { useCallbackRef } from "../src";

describe("useCallbackRef", () => {
	it("should always return the latest callback", () => {
		let callbackValue = 0;
		const TestComponent = () => {
			const [count, setCount] = useState(0);
			const callback = useCallbackRef(() => {
				callbackValue = count;
			});
			React.useEffect(() => {
				callback();
			}, [callback]);
			return (
				<button type="button" onClick={() => setCount((c) => c + 1)}>
					Increment
				</button>
			);
		};
		render(<TestComponent />);
		expect(callbackValue).toBe(0);
		screen.getByRole("button").click();
		expect(callbackValue).toBe(1);
	});
});
