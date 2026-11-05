import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useClipboard — Production-grade async clipboard copy hook.
 *
 * Features:
 * - Robust navigator.clipboard.writeText execution with fallback safety.
 * - Rejection suppression (prevents uncaught exceptions on permissions block).
 * - Automatic timeout reset with safe unmount cleanup.
 *
 * @param {object} [options]
 * @param {number} [options.timeout=2000] - Duration in ms to retain copied state
 * @returns {{ copied: boolean, copy: (text: string) => Promise<boolean> }}
 */
export function useClipboard({ timeout = 2000 } = {}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(
    async (text) => {
      if (!text || typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, timeout);
        return true;
      } catch {
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
}

export default useClipboard;
