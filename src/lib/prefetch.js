/**
 * prefetch.js
 * Production-Grade Dynamic Chunk Prefetching Utility
 *
 * Implements non-blocking speculative preloading for dynamic import modules.
 * Eliminates route/module transition network latency by invoking chunk factory
 * during idle cycles or pointer hover deliberation phases.
 */

const prefetchedPromises = new Map();

/**
 * Speculatively prefetches a dynamic module chunk.
 * Idempotent, memory-safe, and gracefully suppresses offline/network abort rejections.
 * Uses function reference, key, or function signature to prevent duplicate network calls.
 *
 * @param {() => Promise<any>} factory - e.g. () => import('../pages/PricingPage')
 * @param {string} [key] - Optional unique identifier for the chunk
 * @returns {Promise<any>}
 */
export function prefetch(factory, key) {
  if (typeof factory !== 'function') {
    return Promise.resolve();
  }

  const cacheKey = key || (factory.name && factory.name !== 'anonymous' ? factory.name : factory.toString());
  const existing = prefetchedPromises.get(cacheKey);
  if (existing) {
    return existing;
  }

  const promise = Promise.resolve()
    .then(() => factory())
    .catch(() => {
      // Suppress speculative prefetch rejection (e.g. offline or abort)
      return null;
    });

  prefetchedPromises.set(cacheKey, promise);
  return promise;
}

/**
 * Schedules prefetching during browser idle time when the main thread has free execution cycles.
 * Uses requestIdleCallback with a fallback to setTimeout.
 *
 * @param {() => Promise<any>} factory
 * @param {number} [timeout=2000] - Maximum millisecond deadline before prefetch executes
 */
export function prefetchIdle(factory, timeout = 2000) {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => prefetch(factory), { timeout });
  } else {
    setTimeout(() => prefetch(factory), 120);
  }
}

export default prefetch;
