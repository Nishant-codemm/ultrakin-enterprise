import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { cn } from '../lib/cn';

export default function KeyboardShortcutsModal() {
  const { isKeyboardModalOpen, setIsKeyboardModalOpen } = useWorkspace();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const shortcutGroups = [
    {
      category: 'Global Navigation & Overlays',
      shortcuts: [
        { keys: ['⌘', 'K'], label: 'Universal Search & Command Palette' },
        { keys: ['⌘', '/'], label: 'Open Keyboard Shortcuts Cheatsheet' },
        { keys: ['Esc'], label: 'Dismiss Active Modal / Drawer' },
      ],
    },
    {
      category: 'Workspace Operations',
      shortcuts: [
        { keys: ['⌘', 'D'], label: 'Toggle Microphone in WebRTC Huddle' },
        { keys: ['J'], label: 'Select Next Record / Email / Task' },
        { keys: ['K'], label: 'Select Previous Record / Email / Task' },
        { keys: ['Enter'], label: 'Open Selected Record in Drawer' },
      ],
    },
    {
      category: 'Kanban Boards (Section 11.2 A11y)',
      shortcuts: [
        { keys: ['Space'], label: 'Grab Selected Kanban Card' },
        { keys: ['←', '→'], label: 'Move Grabbed Card to Adjacent Column' },
        { keys: ['Enter'], label: 'Drop Card & Commit Optimistic Status' },
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
          className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md -z-10"
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
            'w-full max-w-[560px] rounded-xl border border-white/12 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_70px_rgba(0,0,0,0.85)]',
            'bg-[#07090E]/95 backdrop-blur-2xl text-slate-200'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0B0F19]/90 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-indigo-400" />
              <h2 id="keyboard-shortcuts-title" className="font-semibold text-sm text-white">Keyboard Shortcuts</h2>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded-full">
                Section 11.1
              </span>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsKeyboardModalOpen(false)}
              aria-label="Close keyboard shortcuts"
              className="p-1 hover:text-white text-slate-400 hover:bg-white/5 active:scale-95 rounded-md cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto">
            {shortcutGroups.map((group) => (
              <div key={group.category} className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  {group.category}
                </div>
                <div className="space-y-1.5 bg-[#0B0F19]/80 rounded-lg p-2.5 border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  {group.shortcuts.map((sc) => (
                    <div
                      key={sc.label}
                      className="flex items-center justify-between text-xs py-1 px-1.5 text-slate-300"
                    >
                      <span>{sc.label}</span>
                      <div className="flex items-center gap-1 font-mono">
                        {sc.keys.map((k) => (
                          <kbd
                            key={k}
                            className="px-2 py-0.5 rounded bg-white/8 border border-white/12 text-[11px] font-bold text-slate-200 shadow-sm"
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
          <div className="p-3 bg-[#0B0F19]/90 backdrop-blur-md border-t border-white/8 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Press Esc to close</span>
            <span className="text-emerald-400">100% Keyboard Operable</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
