import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Building2, X } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';

export default function EnterpriseDemoDrawer() {
  const { isDemoDrawerOpen, closeDemoDrawer } = useWorkspace();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isDemoDrawerOpen) return undefined;

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDemoDrawer();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [isDemoDrawerOpen, closeDemoDrawer]);

  if (!isDemoDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="presentation">
      <button
        type="button"
        aria-label="Close evaluation panel"
        onClick={closeDemoDrawer}
        className="absolute inset-0 cursor-default bg-slate-900/30 backdrop-blur-sm"
      />
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="evaluation-title"
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-border bg-surface-raised text-ink shadow-[-24px_0_64px_-32px_rgba(17,24,39,.3)]"
      >
        <header className="flex items-start justify-between gap-5 border-b border-border p-6 sm:p-8">
          <div>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/15 bg-brand-soft text-brand-text">
              <Building2 aria-hidden="true" className="h-5 w-5" />
            </span>
            <h2 id="evaluation-title" className="mt-5 text-xl font-semibold tracking-tight text-ink">
              Talk with the Ultrakin team
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Ask about current product availability, security documentation, deployment, or an evaluation.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDemoDrawer}
            aria-label="Close evaluation panel"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 p-6 sm:p-8">
          <div className="rounded-xl border border-border bg-surface-soft p-5">
            <p className="text-sm font-medium text-ink">No meeting is booked from this preview.</p>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              The preview has no scheduling connection. Use the link below to open an email draft and send a request when you are ready.
            </p>
          </div>
        </div>

        <footer className="border-t border-border p-6 sm:p-8">
          <a
            href="mailto:sales@ultrakin.com?subject=Ultrakin%20evaluation%20request&body=Hi%20Ultrakin%20team%2C%0A%0AI%27d%20like%20to%20learn%20about%20the%20current%20product%20and%20discuss%20an%20evaluation.%0A"
            onClick={closeDemoDrawer}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Open an email draft
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </footer>
      </section>
    </div>
  );
}
