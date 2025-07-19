import { type SpinnerVariants, spinner } from "@kopexa/theme";
import { type ComponentProps, useMemo } from "react";

export type SpinnerProps = ComponentProps<"output"> &
	SpinnerVariants & {
		/**
		 * Spinner label, in case you passed it will be used as `aria-label`.
		 */
		label?: string;
	};

export const Spinner = (props: SpinnerProps) => {
	const {
		label: labelProp,
		children,
		size,
		color,
		variant,
		className,
		...otherProps
	} = props;

	const slots = useMemo(
		() => spinner({ size, color, variant }),
		[size, color, variant],
	);

	const label = labelProp || children;

	const ariaLabel = useMemo(() => {
		if (label && typeof label === "string") {
			return label;
		}

		return !otherProps["aria-label"] ? "Loading..." : "";
	}, [label, otherProps["aria-label"]]);

	if (variant === "wave" || variant === "dots") {
		return (
			<output
				aria-label={ariaLabel}
				className={slots.base({ className })}
				{...otherProps}
			>
				<div className={slots.wrapper()}>
					{[...new Array(3)].map((_, index) => (
						<i
							key={`dot-${index.toString()}`}
							className={slots.dots()}
							style={
								{
									"--dot-index": index,
								} as React.CSSProperties
							}
						/>
					))}
				</div>
				{label && <span className={slots.label()}>{label}</span>}
			</output>
		);
	}

	return (
		<output
			aria-label={ariaLabel}
			className={slots.base({ className })}
			{...otherProps}
		>
			<div className={slots.wrapper()}>
				<div className={slots.circle1()} />
				<div className={slots.circle2()} />
			</div>
			{label && <span className={slots.label()}>{label}</span>}
		</output>
	);
};
