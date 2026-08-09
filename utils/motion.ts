import type { Variants } from "framer-motion";

/** Shared easing — a soft overshoot that reads as "snappy" rather than floaty. */
const EASE = [0.22, 1, 0.36, 1] as const;

export function slideInFromLeft(delay = 0): Variants {
  return {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: EASE },
    },
  };
}

export function slideInFromRight(delay = 0): Variants {
  return {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: EASE },
    },
  };
}

export const slideInFromTop: Variants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5, ease: EASE },
  },
};

export function fadeUp(delay = 0): Variants {
  return {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay, duration: 0.6, ease: EASE },
    },
  };
}

/**
 * Parent variant that walks its children in sequence. Pair with `fadeUp` on
 * each child and leave the child's own delay at 0 — the stagger supplies it.
 */
export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
