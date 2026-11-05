import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * useFocusTrap — Production Focus Trap & Escape Management Hook
 *
 * Implements W3C WAI-ARIA Modal Dialog recommendations:
 * 1. Preserves and restores prior active element upon dismissal.
 * 2. Auto-focuses the target or first focusable element on opening.
 * 3. Traps Tab and Shift+Tab key navigation within the container boundary.
 * 4. Listens for the Escape key and triggers the onEscape callback.
 * 5. Validates DOM connectivity to prevent stale focus exceptions.
 *
 * @param {object} options
 * @param {boolean} options.isOpen - Whether the overlay/dialog is currently active
 * @param {React.RefObject<HTMLElement>} options.containerRef - Ref of the modal dialog container
 * @param {React.RefObject<HTMLElement>} [options.initialFocusRef] - Optional element to receive initial focus
 * @param {() => void} [options.onEscape] - Callback invoked when the Escape key is pressed
 */
export function useFocusTrap({ isOpen, containerRef, initialFocusRef, onEscape }) {
  const restoreFocusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Capture the trigger element that opened the dialog
    const previous = document.activeElement;
    restoreFocusRef.current = previous === document.body ? null : previous;

    // Focus initial element or first focusable child
    const focusFrame = window.requestAnimationFrame(() => {
      if (initialFocusRef?.current) {
        initialFocusRef.current.focus();
      } else if (containerRef.current) {
        const firstFocusable = containerRef.current.querySelector(FOCUSABLE_SELECTOR);
        firstFocusable?.focus();
      }
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        return;
      }

      if (event.key === 'Tab') {
        const container = containerRef.current;
        if (!container) return;

        const focusables = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (!focusables.length) {
          event.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;

        if (!container.contains(active)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        } else if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);

      const target = restoreFocusRef.current;
      if (target?.isConnected && !target.hasAttribute('disabled') && target.getClientRects().length > 0) {
        target.focus();
      }
      restoreFocusRef.current = null;
    };
  }, [isOpen, containerRef, initialFocusRef, onEscape]);
}

export default useFocusTrap;
