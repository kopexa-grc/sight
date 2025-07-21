import { act, renderHook } from "@testing-library/react";

import { useDebounceCallback } from "../src";

describe("useDebounceCallback()", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});
	afterEach(() => {
		jest.clearAllTimers();
		jest.useRealTimers();
	});

	it("should debounce the callback", () => {
		const delay = 500;
		const debouncedCallback = jest.fn();
		const { result } = renderHook(() =>
			useDebounceCallback(debouncedCallback, delay),
		);

		act(() => {
			result.current("argument");
		});

		// The callback should not be invoked immediately
		expect(debouncedCallback).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		// The callback should be invoked after the debounce interval
		expect(debouncedCallback).toHaveBeenCalledTimes(1);
	});

	it("should handle options", () => {
		const delay = 500;
		const debouncedCallback = jest.fn();
		const { result } = renderHook(() =>
			useDebounceCallback(debouncedCallback, delay, { leading: true }),
		);

		act(() => {
			result.current("argument");
		});

		// The callback should be invoked immediately due to leading option
		expect(debouncedCallback).toHaveBeenCalledWith("argument");

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		// The callback should not be invoked again after the interval
		expect(debouncedCallback).toHaveBeenCalledTimes(1);
	});

	it("should debounce the callback function", () => {
		const callback = jest.fn();
		const { result } = renderHook(() => useDebounceCallback(callback, 100));

		act(() => {
			result.current("test1");
			result.current("test2");
			result.current("test3");
		});

		expect(callback).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(200);
		});

		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith("test3");
	});

	it("should cancel the debounced callback", () => {
		const delay = 500;
		const debouncedCallback = jest.fn();
		const { result } = renderHook(() =>
			useDebounceCallback(debouncedCallback, delay),
		);

		act(() => {
			result.current("argument");
			result.current.cancel();
		});

		act(() => {
			jest.advanceTimersByTime(200);
		});

		// The callback should not be invoked after cancellation
		expect(debouncedCallback).not.toHaveBeenCalled();
	});

	it("should flush the debounced callback", () => {
		const delay = 500;
		const debouncedCallback = jest.fn();
		const { result } = renderHook(() =>
			useDebounceCallback(debouncedCallback, delay),
		);

		act(() => {
			result.current("argument");
		});

		// The callback should not be invoked immediately
		expect(debouncedCallback).not.toHaveBeenCalled();

		// Flush the debounced callback
		act(() => {
			result.current.flush();
		});

		// The callback should be invoked immediately after flushing
		expect(debouncedCallback).toHaveBeenCalled();
	});
});
