import type { Target, TargetAndTransition, Transition } from "motion";

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

type TargetResolver<P = object> = (
	props: P & TransitionProperties,
) => TargetAndTransition;

type Variant<P = object> = TargetAndTransition | TargetResolver<P>;

export type Variants<P = object> = Record<
	string,
	{
		enter: Variant<P>;
		exit: Variant<P>;
		initial?: Variant<P>;
	}
>;

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

export const TRANSITION_VARIANTS: Variants = {
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
	},
};
