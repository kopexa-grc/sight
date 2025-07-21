// password input is based on the default input component

import { EyeIcon, EyeOffIcon } from "@kopexa/icons";
import { passwordInput } from "@kopexa/theme";
import { Tooltip } from "@kopexa/tooltip";
import { useState } from "react";
import { Input, type InputProps } from "./input";

type Props = {
	/**
	 * Used for Aria labeling the toggle button.
	 * @default "Toggle password visibility"
	 * This is the label that will be read by screen readers when the toggle button is focused
	 * or hovered. It should describe the action of showing or hiding the password.
	 */
	toggleLabel?: string;
};

// and provides a toggle for showing/hiding the password
export type PasswordInputProps = Omit<InputProps, "type"> & Props;

export const PasswordInput = (props: PasswordInputProps) => {
	const {
		className,
		toggleLabel = "Toggle password visibility",
		...rest
	} = props;

	const [isVisible, setIsVisible] = useState(false);

	const styles = passwordInput();

	return (
		<Input
			type={isVisible ? "text" : "password"}
			data-slot="input"
			className={className}
			endContent={
				<Tooltip content={toggleLabel}>
					<button
						aria-label={toggleLabel}
						type="button"
						onClick={() => setIsVisible(!isVisible)}
						className={styles.button()}
					>
						{isVisible ? (
							<EyeOffIcon
								aria-hidden={true}
								focusable={false}
								className={styles.icon()}
							/>
						) : (
							<EyeIcon
								aria-hidden={true}
								focusable={false}
								className={styles.icon()}
							/>
						)}
					</button>
				</Tooltip>
			}
			{...rest}
		/>
	);
};
