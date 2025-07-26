import { tv, type VariantProps } from "tailwind-variants";

export const separator = tv({
	base: "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
	variants: {
		orientation: {
			vertical: "",
			horizontal: "",
		},
	},
});

export type SeparatorVariantProps = VariantProps<typeof separator>;
