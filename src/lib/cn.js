/**
 * Lightweight className merger — combines conditional and array class names.
 * Filters falsy values (false, null, undefined, 0, '') without extra dependencies.
 */
export function cn(...classes) {
  return classes.flat(Infinity).filter(Boolean).join(' ');
}

