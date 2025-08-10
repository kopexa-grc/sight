import { CopyIcon } from "@kopexa/icons";
import { callAllHandlers } from "@kopexa/shared-utils";
import { Tooltip } from "@kopexa/tooltip";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, type ButtonProps } from "./button";

export type CopyButtonProps = Omit<ButtonProps, "isIconOnly"> & {
	/** Tooltip translations. */
	translations?: {
		copy?: string; // default: "Copy"
		copied?: string; // default: "Copied"
		error?: string; // default: "Copy failed"
	};
	/** The text to copy. Can also be a function that returns the text at click time. */
	value?: string | (() => string);
	/** Optional callback after copy attempt. */
	onCopy?: (value: string, ok: boolean, error?: unknown) => void;
	/** Milliseconds until tooltip resets back to "Copy". */
	resetDelay?: number; // default: 1200ms
};

export const CopyButton = ({
	children,
	variant = "ghost",
	value,
	onCopy,
	translations,
	resetDelay = 1200,
	disabled,
	onClick,
	...restProps
}: CopyButtonProps) => {
	const [state, setState] = useState<"idle" | "copied" | "error">("idle");
	const timerRef = useRef<number | null>(null);

	// Resolve the text to copy at click time
	const resolveValue = (): string => {
		if (typeof value === "function") return value() ?? "";
		if (typeof value === "string") return value;
		// If no explicit value, but children is a plain string, use that
		if (typeof children === "string") return children;
		return "";
	};

	// Tooltip content depends on state
	const tooltipContent = useMemo(() => {
		if (state === "copied") return translations?.copied ?? "Copied";
		if (state === "error") return translations?.error ?? "Copy failed";
		return translations?.copy ?? "Copy";
	}, [state, translations]);

	// Clear timer on unmount
	useEffect(() => {
		return () => {
			if (timerRef.current) window.clearTimeout(timerRef.current);
		};
	}, []);

	const resetLater = () => {
		if (timerRef.current) window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(
			() => setState("idle"),
			resetDelay,
		) as unknown as number;
	};

	const copyFallback = async (text: string) => {
		// Old-school fallback for environments without navigator.clipboard
		const ta = document.createElement("textarea");
		ta.value = text;
		ta.setAttribute("readonly", "");
		ta.style.position = "absolute";
		ta.style.left = "-9999px";
		document.body.appendChild(ta);
		const selection = document.getSelection();
		const selected =
			selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
		ta.select();
		let ok = false;
		try {
			ok = document.execCommand("copy");
		} finally {
			document.body.removeChild(ta);
			if (selected && selection) {
				selection.removeAllRanges();
				selection.addRange(selected);
			}
		}
		return ok;
	};

	const handleCopy = async () => {
		if (disabled) return;

		const text = resolveValue();
		if (!text) {
			setState("error");
			onCopy?.(text, false, new Error("No copy value"));
			resetLater();
			return;
		}

		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(text);
				setState("copied");
				onCopy?.(text, true);
			} else {
				const ok = await copyFallback(text);
				setState(ok ? "copied" : "error");
				onCopy?.(text, ok, ok ? undefined : new Error("Fallback copy failed"));
			}
		} catch (err) {
			setState("error");
			onCopy?.(text, false, err);
		} finally {
			resetLater();
		}
	};

	const isIconOnly = !children;

	return (
		<Tooltip content={tooltipContent}>
			<Button
				aria-label={isIconOnly ? (translations?.copy ?? "Copy") : undefined}
				isIconOnly={isIconOnly}
				startContent={!isIconOnly ? <CopyIcon /> : undefined}
				variant={variant}
				disabled={disabled}
				{...restProps}
				onClick={callAllHandlers(handleCopy, onClick)}
			>
				{isIconOnly ? <CopyIcon /> : children}
			</Button>
		</Tooltip>
	);
};
