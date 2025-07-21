import { Calendar, type CalendarProps, type DateRange } from "@kopexa/sight";
import { calendar } from "@kopexa/theme";
import type { Meta } from "@storybook/react";
import { useState } from "react";

export default {
	title: "Components/Calendar",
	component: Calendar,
} as Meta<typeof Calendar>;

const defaultProps = {
	mode: "single",
	...calendar.defaultVariants,
};

export const Default = (args: CalendarProps) => {
	const [date, setDate] = useState<Date | undefined>(new Date());
	return (
		<Calendar
			{...args}
			mode="single"
			selected={date}
			onSelect={setDate}
			className="rounded-lg border"
		/>
	);
};

Default.args = {
	...defaultProps,
};

export const Range = (args: CalendarProps) => {
	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(2025, 5, 12),
		to: new Date(2025, 5, 20),
	});
	return (
		<Calendar
			{...args}
			mode="range"
			captionLayout="dropdown"
			defaultMonth={new Date(2025, 5, 1)}
			numberOfMonths={2}
			selected={date}
			onSelect={setDate}
			className="rounded-lg border shadow-sm"
		/>
	);
};
