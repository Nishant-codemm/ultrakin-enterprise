import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — Senior Frontend Scroll Entrance Hook
 * Built with IntersectionObserver and prefers-reduced-motion safety.
 * Triggers cinematic entrance choreography when sections scroll into view.
 */
export function useReveal({ threshold = 0.12, rootMargin = '0px 0px -40px 0px', once = true } = {}) {
  const ref = useRef(null);

  // Initialize inView to true if user prefers reduced motion or if IntersectionObserver is unsupported, avoiding cascading effect re-renders
  const [inView, setInView] = useState(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return true;
    }
    return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
  });

  useEffect(() => {
    // If already revealed or unneeded, skip observer
    if (inView && once) return;
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.unobserve(node);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, inView]);

  return [ref, inView];
}

export default useReveal;

