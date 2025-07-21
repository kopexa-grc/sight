import { Button } from "@kopexa/button";
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from "@kopexa/icons";
import { cn } from "@kopexa/shared-utils";
import { type ButtonVariantProps, button, calendar } from "@kopexa/theme";
import { useEffect, useRef } from "react";
import {
	type DayButton,
	DayPicker,
	type DayPickerProps,
	getDefaultClassNames,
} from "react-day-picker";

export type CalendarProps = DayPickerProps & {
	buttonVariant?: ButtonVariantProps["variant"];
};

export const Calendar = (props: CalendarProps) => {
	const {
		className,
		classNames,
		showOutsideDays = true,
		captionLayout = "label",
		buttonVariant = "ghost",
		formatters,
		components,
		...rest
	} = props;

	const defaultClassNames = getDefaultClassNames();

	const styles = calendar({
		captionLayout: captionLayout === "label" ? "label" : "default",
		className,
	});

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={styles.base({
				className,
			})}
			captionLayout={captionLayout}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString("default", { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: styles.root({ className: defaultClassNames.root }),
				months: styles.months({ className: defaultClassNames.months }),
				month: styles.month({ className: defaultClassNames.month }),
				nav: styles.nav({ className: defaultClassNames.nav }),
				button_previous: button({
					variant: buttonVariant,
					isIconOnly: true,
					className: styles.buttonPrevious({
						className: defaultClassNames.button_previous,
					}),
				}),
				button_next: button({
					variant: buttonVariant,
					isIconOnly: true,
					className: styles.buttonNext({
						className: defaultClassNames.button_next,
					}),
				}),
				month_caption: styles.monthCaption({
					className: defaultClassNames.month_caption,
				}),
				dropdown: styles.dropdown({
					className: defaultClassNames.dropdown,
				}),
				dropdowns: styles.dropdowns({
					className: defaultClassNames.dropdowns,
				}),
				dropdown_root: styles.dropdownRoot({
					className: defaultClassNames.dropdown_root,
				}),
				caption_label: styles.captionLabel({
					className: defaultClassNames.caption_label,
				}),
				table: styles.table(),
				weekdays: styles.weekdays({
					className: defaultClassNames.weekdays,
				}),
				weekday: styles.weekday({
					className: defaultClassNames.weekday,
				}),
				week: styles.week({
					className: defaultClassNames.week,
				}),
				week_number_header: styles.weekNumberHeader({
					className: defaultClassNames.week_number_header,
				}),
				week_number: styles.weekNumber({
					className: defaultClassNames.week_number,
				}),
				day: styles.day({
					className: defaultClassNames.day,
				}),
				range_start: styles.rangeStart({
					className: defaultClassNames.range_start,
				}),
				range_middle: styles.rangeMiddle({
					className: defaultClassNames.range_middle,
				}),
				range_end: styles.rangeEnd({
					className: defaultClassNames.range_end,
				}),
				today: styles.today({
					className: defaultClassNames.today,
				}),
				outside: styles.outside({
					className: defaultClassNames.outside,
				}),
				disabled: styles.disabled({
					className: defaultClassNames.disabled,
				}),
				hidden: styles.hidden({
					className: defaultClassNames.hidden,
				}),
				...classNames,
			}}
			components={{
				Root: ({ rootRef, ...props }) => {
					return <div data-slot="calendar" ref={rootRef} {...props} />;
				},
				Chevron: ({ className, orientation, ...props }) => {
					if (orientation === "left") {
						return (
							<ChevronLeftIcon
								className={styles.icon({
									className,
								})}
								{...props}
							/>
						);
					}
					if (orientation === "right") {
						return (
							<ChevronRightIcon
								className={styles.icon({
									className,
								})}
								{...props}
							/>
						);
					}
					return (
						<ChevronDownIcon
							className={styles.icon({
								className,
							})}
							{...props}
						/>
					);
				},
				DayButton: CalendarDayButton,
				WeekNumber: ({ children, ...props }) => {
					return (
						<td {...props} data-slot="week-number">
							<div className={styles.weekNumberWrapper()}>{children}</div>
						</td>
					);
				},
				...components,
			}}
			{...rest}
		/>
	);
};

type CalendarDayButtonBaseProps = React.ComponentProps<typeof DayButton>;

type CalendarDayButtonProps = Omit<CalendarDayButtonBaseProps, "color">;

function CalendarDayButton({
	className,
	day,
	modifiers,
	...props
}: CalendarDayButtonProps) {
	const defaultClassNames = getDefaultClassNames();

	const ref = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	const styles = calendar();

	return (
		<Button
			ref={ref}
			variant="ghost"
			data-slot="day-button"
			isIconOnly
			data-day={day.date.toLocaleDateString()}
			data-selected-single={
				modifiers.selected &&
				!modifiers.range_start &&
				!modifiers.range_end &&
				!modifiers.range_middle
			}
			data-range-start={modifiers.range_start}
			data-range-end={modifiers.range_end}
			data-range-middle={modifiers.range_middle}
			className={styles.dayButton({
				className: cn(defaultClassNames.day_button, className),
			})}
			{...props}
		/>
	);
}
