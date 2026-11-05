/**
 * interaction.js — Ultrakin Shared Interaction Primitives
 *
 * Centralized interaction helpers, cursor spotlight tracker, and standard focus ring tokens.
 */

/**
 * Updates CSS custom properties `--mouse-x` and `--mouse-y` on the event's currentTarget
 * relative to its bounding rectangle, driving dynamic radial-gradient spotlight effects.
 *
 * @param {React.MouseEvent<HTMLElement>} e
 */
export function handleSpotlightMove(e) {
  if (!e?.currentTarget) return;
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
}

/**
 * Standard accessible focus-visible class tokens across the Ultrakin design system.
 */
export const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page';

export const FOCUS_RING_OBSIDIAN =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus';
