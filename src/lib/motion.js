/**
 * motion.js — Ultrakin Motion Foundation Architecture
 *
 * Centralized motion tokens, easing curves, transition presets, and variant factories
 * for Framer Motion across the Ultrakin design system.
 *
 * Engineering Principles:
 * - 60fps GPU acceleration (transforms & opacity only).
 * - Full prefers-reduced-motion accessibility compliance.
 * - Single source of truth for the kinetic curve defined in index.css (--ease-kinetic).
 * - Avoid Hasty Abstractions (AHA): only abstract genuinely identical tokens and factories.
 */

// ── Easing Curves ────────────────────────────────────────────────────────────

/**
 * Ultrakin Canonical Kinetic Curve — matching `--ease-kinetic: cubic-bezier(0.16, 1, 0.3, 1)`.
 * Used for high-responsiveness, high-damping interface motion (dialogs, cards, section reveals).
 */
export const ULTRAKIN_EASE = [0.16, 1, 0.3, 1];

/**
 * Ultrakin Smooth Ease — matching `cubic-bezier(0.22, 1, 0.36, 1)`.
 * Used for navigation menus, popovers, and compact disclosure transitions.
 */
export const SMOOTH_EASE = [0.22, 1, 0.36, 1];

// ── Shared Transition Presets ────────────────────────────────────────────────

/**
 * Standard slide-over drawer spring configuration.
 */
export const DRAWER_SPRING = {
  type: 'spring',
  damping: 30,
  stiffness: 300,
};

/**
 * Modal dialog kinetic entrance transition.
 */
export const MODAL_DIALOG_TRANSITION = {
  duration: 0.18,
  ease: ULTRAKIN_EASE,
};

// ── Modal / Overlay Props ───────────────────────────────────────────────────

/**
 * Reusable backdrop scrim fade motion props for dialogs and drawers.
 */
export const scrimMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// ── Section Scroll Entrance Choreography ─────────────────────────────────────

/**
 * Creates motion props for landing section headers (eyebrow + headline).
 *
 * @param {boolean} inView - IntersectionObserver visibility status
 * @param {boolean} reduceMotion - User prefers-reduced-motion preference
 */
export function getSectionHeaderMotion(inView, reduceMotion) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, ease: ULTRAKIN_EASE },
  };
}

/**
 * Creates motion props for landing section content/cards following a header.
 *
 * @param {boolean} inView - IntersectionObserver visibility status
 * @param {boolean} reduceMotion - User prefers-reduced-motion preference
 * @param {number} [delay=0.12] - Stagger delay in seconds
 */
export function getSectionContentMotion(inView, reduceMotion, delay = 0.12) {
  return {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay, ease: ULTRAKIN_EASE },
  };
}

// ── Page Shell Motion Variants ───────────────────────────────────────────────

/**
 * Generates identical motion variants for universal demo shells (ProductPage & SolutionPage).
 *
 * @param {boolean} reduceMotion - User prefers-reduced-motion preference
 * @returns {{ containerVariants: object, leftVariants: object, rightVariants: object }}
 */
export function createShellVariants(reduceMotion) {
  return {
    containerVariants: {
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.08 },
      },
    },
    leftVariants: {
      hidden: {
        opacity: 0,
        x: reduceMotion ? 0 : -20,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.5,
          ease: ULTRAKIN_EASE,
        },
      },
    },
    rightVariants: {
      hidden: {
        opacity: 0,
        x: reduceMotion ? 0 : 20,
        y: reduceMotion ? 0 : 8,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.55,
          ease: ULTRAKIN_EASE,
        },
      },
    },
  };
}
