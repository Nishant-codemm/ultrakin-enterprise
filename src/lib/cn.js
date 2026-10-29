/**
 * Lightweight className merger — avoids pulling in clsx/tailwind-merge
 * for just a few usages. Upgrade to clsx + twMerge when needed.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
