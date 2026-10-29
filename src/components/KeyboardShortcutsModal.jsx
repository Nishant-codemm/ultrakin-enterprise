import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useWorkspace } from '../context/useWorkspace';
import { cn } from '../lib/cn';

export default function KeyboardShortcutsModal() {
  const { isKeyboardModalOpen, setIsKeyboardModalOpen } = useWorkspace();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const shortcutGroups = [
    {
      category: 'Available shortcuts',
      shortcuts: [
        { keys: ['Ctrl / ⌘', 'K'], label: 'Open or close Universal Search' },
        { keys: ['Ctrl / ⌘', '/'], label: 'Open or close this shortcuts panel' },
        { keys: ['Esc'], label: 'Close an open menu, dialog, or drawer' },
      ],
    },
  ];

  useEffect(() => {
    if (!isKeyboardModalOpen) return;

    const previouslyFocused = document.activeElement === document.body ? null : document.activeElement;
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsKeyboardModalOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable?.length) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!dialogRef.current?.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused?.isConnected && previouslyFocused.getClientRects().length > 0) {
        previouslyFocused.focus();
      }
    };
  }, [isKeyboardModalOpen, setIsKeyboardModalOpen]);

  if (!isKeyboardModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 select-none">
        {/* Scrim */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsKeyboardModalOpen(false)}
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-slate-900/35 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="keyboard-shortcuts-title"
          className={cn(
            'w-full max-w-[560px] overflow-hidden rounded-2xl border border-border bg-surface-raised text-ink shadow-[0_28px_80px_-32px_rgba(17,24,39,.32),0_8px_24px_rgba(17,24,39,.12)] backdrop-blur-2xl'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border bg-surface-soft/80 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Keyboard className="h-4 w-4 text-brand-text" />
              <h2 id="keyboard-shortcuts-title" className="text-sm font-semibold text-ink">Keyboard Shortcuts</h2>
              <span className="rounded-full border border-brand/20 bg-brand-soft px-2 py-0.5 font-mono text-[10px] text-brand-text">
                Section 11.1
              </span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsKeyboardModalOpen(false)}
              aria-label="Close keyboard shortcuts"
              className="cursor-pointer rounded-md p-1 text-ink-subtle transition-all hover:bg-surface-hover hover:text-ink active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {shortcutGroups.map((group) => (
              <div key={group.category} className="space-y-2">
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle">
                  {group.category}
                </div>
                <div className="space-y-1.5 rounded-lg border border-border bg-surface-soft p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,.8)]">
                  {group.shortcuts.map((sc) => (
                    <div
                      key={sc.label}
                      className="flex items-center justify-between px-1.5 py-1 text-xs text-ink-soft"
                    >
                      <span>{sc.label}</span>
                      <div className="flex items-center gap-1 font-mono">
                        {sc.keys.map((k) => (
                          <kbd
                            key={k}
                            className="rounded border border-border-strong bg-surface-raised px-2 py-0.5 text-[11px] font-bold text-ink shadow-sm"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border bg-surface-soft/80 p-3 font-mono text-[11px] text-ink-muted backdrop-blur-md">
            <span>Press Esc to close</span>
            <span className="text-emerald-700">100% Keyboard Operable</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
