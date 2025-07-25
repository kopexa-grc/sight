import { tv, type VariantProps } from "tailwind-variants";
import { focusWithinClasses } from "../utils/classes";

export const passwordInput = tv({
	slots: {
		button: "focus:outline-hidden",
		icon: "pointer-events-none text-muted-foreground",
	},
});

export const input = tv({
	base: [],
	slots: {
		inputWrapper: [
			"relative w-full inline-flex flex-row items-center shadow-xs px-3 gap-3 [&_svg]:shrink-0",
			"border-input border dark:bg-input/30 data-[hidden=true]:hidden transition-[color,box-shadow]",
			"data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
			...focusWithinClasses,
		],
		innerWrapper: "inline-flex w-full items-center h-full box-border",
		input: [
			"w-full font-normal outline-hidden focus-visible:outline-hidden",
			"data-[has-start-content=true]:ps-1.5",
			"data-[has-end-content=true]:pe-1.5",
			"file:cursor-pointer file:bg-transparent file:border-0",
			"autofill:bg-transparent bg-clip-text",
			// legacy
			"selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
			"flex",
			// file
			"file:text-foreground file:inline-flex file:text-sm file:font-medium",
			"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
		],
		clearButton: [
			"p-2 -m-2 z-10 absolute end-3 start-auto pointer-events-none",
			"appearance-none outline-hidden select-none opacity-0 cursor-pointer",
			"active:!opacity-70 rounded-full",
		],
	},
	variants: {
		size: {
			sm: {
				inputWrapper: ["h-8 min-h-8 px-2 rounded-sm [&_svg]:size-4"],
				input: "text-sm file:h-6",
			},
			md: {
				inputWrapper: "h-10 min-10 rounded-md [&_svg]:size-4",
				input: "text-base md:text-sm file:h-8",
				clearButton: "hover:opacity-100",
			},
			lg: {
				inputWrapper: "h-12 min-h-12 rounded-lg [&_svg]:size-4",
				input: "text-base file:h-10",
				clearButton: "hover:opacity-100",
			},
		},
		radius: {
			none: {
				inputWrapper: "rounded-none",
			},
			sm: {
				inputWrapper: "rounded-sm",
			},
			md: {
				inputWrapper: "rounded-md",
			},
			lg: {
				inputWrapper: "rounded-lg",
			},
			full: {
				inputWrapper: "rounded-full",
			},
		},
		isClearable: {
			true: {
				input: "peer pe-6",
				clearButton: [
					"peer-data-[filled=true]:pointer-events-auto",
					"peer-data-[filled=true]:opacity-70 peer-data-[filled=true]:block",
					"peer-data-[filled=true]:scale-100",
				],
			},
			false: {},
		},
	},
	defaultVariants: {
		size: "sm",
	},
});

export type InputVariantProps = VariantProps<typeof input>;
export type InputSlots = keyof ReturnType<typeof input>;

// pointer-events-none text-muted-foreground
