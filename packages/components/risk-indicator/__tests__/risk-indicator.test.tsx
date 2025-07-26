import { render, screen } from "@testing-library/react";
import * as React from "react";

import { RiskIndicator } from "../src";

describe("RiskIndicator", () => {
	it("should render correctly", () => {
		const wrapper = render(<RiskIndicator />);
		expect(() => wrapper.unmount()).not.toThrow();
	});

	it("ref should be forwarded", () => {
		const ref = React.createRef<HTMLDivElement>();
		render(<RiskIndicator ref={ref} />);
		expect(ref.current).not.toBeNull();
	});

	it("renders with the correct level when value is provided", () => {
		// Test low risk
		const { rerender } = render(<RiskIndicator value={5} />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"aria-label",
			"Risk level: low",
		);

		// Test medium risk
		rerender(<RiskIndicator value={12} />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"aria-label",
			"Risk level: medium",
		);

		// Test high risk
		rerender(<RiskIndicator value={20} />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"aria-label",
			"Risk level: high",
		);

		// Test no risk
		rerender(<RiskIndicator value={0} />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"aria-label",
			"Risk level: none",
		);
	});

	it("respects explicitly provided level prop over value", () => {
		render(<RiskIndicator value={20} level="low" />);
		expect(screen.getByRole("img")).toHaveAttribute(
			"aria-label",
			"Risk level: low",
		);
	});

	it("renders the correct number of active bars based on level", () => {
		// Test high risk level - 3 active bars
		const { container: containerHigh } = render(<RiskIndicator level="high" />);
		expect(containerHigh.querySelectorAll('[data-active="true"]').length).toBe(
			3,
		);

		// Test medium risk level - 2 active bars
		const { container: containerMedium } = render(
			<RiskIndicator level="medium" />,
		);
		expect(
			containerMedium.querySelectorAll('[data-active="true"]').length,
		).toBe(2);

		// Test low risk level - 1 active bar
		const { container: containerLow } = render(<RiskIndicator level="low" />);
		expect(containerLow.querySelectorAll('[data-active="true"]').length).toBe(
			1,
		);

		// Test none risk level - 0 active bars
		const { container: containerNone } = render(<RiskIndicator level="none" />);
		expect(containerNone.querySelectorAll('[data-active="true"]').length).toBe(
			0,
		);
	});

	it("applies size variants correctly", () => {
		const { container } = render(<RiskIndicator size="lg" />);
		expect(container.firstChild).toHaveClass("h-5");
	});
});
