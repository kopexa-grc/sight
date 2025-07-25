import type { Variants as MotionVariants, Target, Transition } from "motion";

type WithMotionState<P> = Partial<Record<"enter" | "exit", P>>;

export type TransitionConfig = WithMotionState<Transition>;
export type TransitionEndConfig = WithMotionState<Target>;

export type TransitionProperties = {
	/**
	 * Custom `transition` definition for `enter` and `exit`
	 */
	transition?: TransitionConfig;
	/**
	 * Custom `transitionEnd` definition for `enter` and `exit`
	 */
	transitionEnd?: TransitionEndConfig;
};

export const TRANSITION_EASINGS = {
	ease: [0.36, 0.66, 0.4, 1],
	easeIn: [0.4, 0, 1, 1],
	easeOut: [0, 0, 0.2, 1],
	easeInOut: [0.4, 0, 0.2, 1],
	spring: [0.155, 1.105, 0.295, 1.12],
	springOut: [0.57, -0.15, 0.62, 0.07],
	softSpring: [0.16, 1.11, 0.3, 1.02],
} as const;

export const TRANSITION_DEFAULTS = {
	enter: {
		duration: 0.2,
		ease: TRANSITION_EASINGS.easeOut,
	},
	exit: {
		duration: 0.1,
		ease: TRANSITION_EASINGS.easeIn,
	},
} as const;

type VariantTypes = "fade" | "scaleSpringOpacity" | "scale";

export type Variants = Record<VariantTypes, MotionVariants>;

export const TRANSITION_VARIANTS = {
	fade: {
		enter: {
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: TRANSITION_EASINGS.ease,
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.3,
				ease: TRANSITION_EASINGS.ease,
			},
		},
	} satisfies MotionVariants,
	scaleSpringOpacity: {
		initial: {
			opacity: 0,
			transform: "scale(0.8)",
		},
		enter: {
			opacity: 1,
			transform: "scale(1)",
			transition: {
				type: "spring",
				bounce: 0,
				duration: 0.3,
			},
		},
		exit: {
			opacity: 0,
			transform: "scale(0.96)",
			transition: {
				ease: TRANSITION_EASINGS.easeOut,
				bounce: 0,
				duration: 0.15,
			},
		},
	} satisfies MotionVariants,
	scale: {
		enter: { scale: 1 },
		exit: { scale: 0.95 },
	} satisfies MotionVariants,
};
