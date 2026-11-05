/**
 * navigate.js
 * Central client-side SPA navigation utility for custom window.history routing.
 *
 * Guarantees:
 * - Redundant route push prevention (does not pollute history if already on target path)
 * - Synthetic 'popstate' dispatch to synchronize App.jsx route state
 * - Smooth scroll-to-top on page change
 * - Safe SSR / headless fallback guard
 */

/**
 * Navigates to a client-side route without triggering a full page reload.
 *
 * @param {string} path - Target path (e.g. '/pricing', '/products/chat')
 * @param {object} [options]
 * @param {boolean} [options.smooth=true] - Whether to scroll to top smoothly
 */
export function navigate(path, { smooth = true } = {}) {
  if (typeof window === 'undefined' || !path) return;

  const normalize = (p) => p.replace(/\/$/, '') || '/';
  const currentPath = normalize(window.location.pathname);
  const targetPath = normalize(path);

  if (currentPath === targetPath) {
    if (smooth) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  window.history.pushState({}, '', targetPath);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
}

export default navigate;
