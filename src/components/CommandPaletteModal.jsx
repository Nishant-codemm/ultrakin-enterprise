import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MessageSquare,
  FileText,
  Mail,
  CheckSquare,
  GitBranch,
  Video,
  Terminal,
  ArrowRight,
  Sparkles,
  X,
  Keyboard,
  Shield,
} from 'lucide-react';
import { useWorkspace } from '../context/useWorkspace';
import { cn } from '../lib/cn';

export default function CommandPaletteModal() {
  const {
    isSearchPaletteOpen,
    closeSearchPalette,
    setActiveModule,
    setActiveChannel,
    openDemoDrawer,
    testAutomationsWorkflow,
    setIsKeyboardModalOpen,
  } = useWorkspace();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const resultRefs = useRef([]);

  useEffect(() => {
    if (!isSearchPaletteOpen) return undefined;

    const previouslyFocused = document.activeElement;
    restoreFocusRef.current = previouslyFocused === document.body ? null : previouslyFocused;
    const focusFrame = window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      const restoreTarget = restoreFocusRef.current;
      if (restoreTarget?.isConnected && !restoreTarget.hasAttribute('disabled') && restoreTarget.getClientRects().length > 0) {
        restoreTarget.focus();
      }
      restoreFocusRef.current = null;
    };
  }, [isSearchPaletteOpen]);

  const trapDialogFocus = (event) => {
    if (event.key !== 'Tab') return;
    const focusable = dialogRef.current?.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable?.length) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const activeElement = document.activeElement;
    if (!dialogRef.current?.contains(activeElement)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  // All searchable entities across the unified workspace kernel
  const entities = [
    // Commands
    {
      id: 'cmd_huddle',
      type: 'command',
      category: 'Commands',
      title: 'Start WebRTC Huddle',
      subtitle: 'Start a Huddle and capture discussion notes',
      icon: Video,
      action: () => setActiveModule('huddle'),
      badge: 'Action',
      badgeColor: 'bg-violet-50 text-violet-800 border-violet-200',
    },
    {
      id: 'cmd_task',
      type: 'command',
      category: 'Commands',
      title: 'Create Kanban Task',
      subtitle: 'Spawn a ticket in Sprint 24 pipeline',
      icon: CheckSquare,
      action: () => setActiveModule('tasks'),
      badge: 'Action',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'cmd_mail',
      type: 'command',
      category: 'Commands',
      title: 'Compose Domain Email',
      subtitle: 'Draft a message in the sample workspace',
      icon: Mail,
      action: () => setActiveModule('mail'),
      badge: 'Action',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    {
      id: 'cmd_dag',
      type: 'command',
      category: 'Commands',
      title: 'Test Automations DAG Execution',
      subtitle: 'Run Tarjan cycle validator and step through node simulation',
      icon: GitBranch,
      action: () => {
        setActiveModule('automations');
        testAutomationsWorkflow();
      },
      badge: 'Action',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'cmd_demo',
      type: 'command',
      category: 'Commands',
      title: 'Contact the Ultrakin team',
      subtitle: 'Open an email draft to ask about a product evaluation',
      icon: Terminal,
      action: () => openDemoDrawer(),
      badge: 'Sales',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'cmd_shortcuts',
      type: 'command',
      category: 'Commands',
      title: 'Keyboard Shortcuts Cheatsheet (⌘/)',
      subtitle: 'View the keyboard shortcuts available in this preview',
      icon: Keyboard,
      action: () => setIsKeyboardModalOpen(true),
      badge: 'Help',
      badgeColor: 'bg-surface-soft text-ink-muted border-border',
    },

    // Spaces Chat
    {
      id: 'ch_incident',
      type: 'space',
      category: 'Spaces Chat',
      title: '#incident-war-room',
      subtitle: 'Coordinate a rollout and review team updates',
      icon: MessageSquare,
      action: () => {
        setActiveModule('chat');
        setActiveChannel('incident-war-room');
      },
      badge: 'Space',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'ch_escalations',
      type: 'space',
      category: 'Spaces Chat',
      title: '#client-escalations',
      subtitle: 'VIP client SLA triage & high-priority webhook alerts',
      icon: MessageSquare,
      action: () => {
        setActiveModule('chat');
        setActiveChannel('client-escalations');
      },
      badge: 'Space',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },
    {
      id: 'ch_arch',
      type: 'space',
      category: 'Spaces Chat',
      title: '#product-architecture',
      subtitle: 'Product notes and decisions from the sample workspace',
      icon: MessageSquare,
      action: () => {
        setActiveModule('chat');
        setActiveChannel('product-architecture');
      },
      badge: 'Space',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    },

    // Living Docs
    {
      id: 'doc_rfc_2026',
      type: 'doc',
      category: 'Living Docs',
      title: 'Q4 EU Cluster RFC (doc_rfc_2026)',
      subtitle: 'Shared workspace doc with comments and checklists',
      icon: FileText,
      action: () => setActiveModule('docs'),
      badge: 'Living Doc',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      id: 'doc_msa',
      type: 'doc',
      category: 'Living Docs',
      title: 'Master Service Agreement 2026.pdf',
      subtitle: 'Sample enterprise service and security terms',
      icon: Shield,
      action: () => setActiveModule('docs'),
      badge: 'Security',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },

    // Domain Mail
    {
      id: 'em_ssl',
      type: 'email',
      category: 'Domain Mailbox',
      title: 'david@acmecorp.com: SSL timeout on EU cluster',
      subtitle: 'P0 escalation converted to Sprint task #tsk_1',
      icon: Mail,
      action: () => setActiveModule('mail'),
      badge: 'Email',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    },
    {
      id: 'em_soc',
      type: 'email',
      category: 'Domain Mailbox',
      title: 'elena@fintechscale.io: SOC 2 & CMEK key rotation audit',
      subtitle: 'AWS KMS customer-managed key verification request',
      icon: Mail,
      action: () => setActiveModule('mail'),
      badge: 'Email',
      badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    },

    // Kanban Tasks
    {
      id: 'tsk_ssl',
      type: 'task',
      category: 'Tasks',
      title: 'Task #tsk_1: Investigate SSL handshake timeouts',
      subtitle: 'Priority P1 · Assigned to Sara Chen',
      icon: CheckSquare,
      action: () => setActiveModule('tasks'),
      badge: 'P1 Task',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
    {
      id: 'tsk_ttl',
      type: 'task',
      category: 'Tasks',
      title: 'Task #tsk_2: Revert token caching logic (PR #1042)',
      subtitle: 'Priority P0 · Extracted from Huddle #18 commitment',
      icon: CheckSquare,
      action: () => setActiveModule('tasks'),
      badge: 'P0 Task',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    },
  ];

  // Filtering matching items
  const filtered = entities.filter((item) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    if (q.startsWith('>')) {
      const commandQuery = q.slice(1).trim();
      return (
        item.type === 'command' &&
        (item.title.toLowerCase().includes(commandQuery) ||
          item.subtitle.toLowerCase().includes(commandQuery))
      );
    }
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  // Global Keyboard Navigation inside modal
  useEffect(() => {
    if (!isSearchPaletteOpen) return;

    const handleKeyDown = (e) => {
      // Toggle modal with ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        closeSearchPalette();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeSearchPalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = filtered.length ? (selectedIndex + 1) % filtered.length : 0;
        setSelectedIndex(nextIndex);
        if (document.activeElement !== inputRef.current) resultRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIndex = filtered.length ? (selectedIndex - 1 + filtered.length) % filtered.length : 0;
        setSelectedIndex(nextIndex);
        if (document.activeElement !== inputRef.current) resultRefs.current[nextIndex]?.focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          closeSearchPalette();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchPaletteOpen, filtered, selectedIndex, closeSearchPalette]);

  if (!isSearchPaletteOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4 select-none">
        {/* Backdrop Scrim (Section 9.9: blur 8px, rgba(3, 7, 18, 0.75)) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSearchPalette}
          aria-hidden="true"
          className="fixed inset-0 bg-slate-900/35 backdrop-blur-md -z-10"
        />

        {/* Dialog Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search Ultrakin"
          aria-describedby="command-palette-description"
          onKeyDown={trapDialogFocus}
          className={cn(
            'w-full max-w-[640px] overflow-hidden rounded-2xl border border-border bg-surface-raised text-ink shadow-[0_28px_80px_-32px_rgba(17,24,39,.32),0_8px_24px_rgba(17,24,39,.12)] backdrop-blur-2xl'
          )}
        >
          <p id="command-palette-description" className="sr-only">
            Search workspace records and commands. Use the arrow keys to move through results and Enter to select.
          </p>
          {/* Header Search Input */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-soft/80 p-4 backdrop-blur-md">
            <Search aria-hidden="true" className="w-5 h-5 shrink-0 text-brand-text" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label="Search workspace and commands"
              aria-autocomplete="list"
              aria-expanded="true"
              aria-controls="command-palette-results"
              aria-activedescendant={filtered[selectedIndex] ? `command-option-${filtered[selectedIndex].id}` : undefined}
              placeholder="Type a command or search anything... (prefix '>' for commands)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full bg-transparent font-sans text-base text-ink placeholder:text-ink-subtle focus:outline-none sm:text-lg"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQuery('')}
                className="cursor-pointer p-1 text-ink-subtle transition-colors hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden items-center gap-0.5 rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-ink-muted sm:inline-flex">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div id="command-palette-results" role="listbox" aria-label="Search results" className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const IconComp = item.icon;

                return (
                  <button
                    key={item.id}
                    ref={(element) => { resultRefs.current[idx] = element; }}
                    id={`command-option-${item.id}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    aria-label={`${item.title}. ${item.category}. ${item.subtitle}. ${item.badge}.`}
                    onClick={() => {
                      item.action();
                      closeSearchPalette();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onFocus={() => setSelectedIndex(idx)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl border p-3 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                      isSelected
                        ? 'border-brand/25 bg-brand-soft text-ink shadow-[inset_0_1px_0_rgba(255,255,255,.8)]'
                        : 'border-transparent text-ink-soft hover:border-border hover:bg-surface-soft'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border',
                          isSelected
                            ? 'border-brand/20 bg-brand-soft text-brand-text'
                            : 'border-border bg-surface-soft text-ink-subtle'
                        )}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-semibold truncate flex items-center gap-2">
                          <span className={isSelected ? 'text-ink' : 'text-ink-soft'}>
                            {item.title}
                          </span>
                        </div>
                        <div className="truncate text-[11px] text-ink-muted">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span
                        className={cn(
                          'text-[10px] font-mono px-2 py-0.5 rounded border',
                          item.badgeColor
                        )}
                      >
                        {item.badge}
                      </span>
                      {isSelected && (
                        <ArrowRight className="hidden h-4 w-4 text-brand-text sm:block" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div role="status" aria-live="polite" className="p-8 text-center text-xs text-ink-muted">
                No matching workspace records or commands found for "{query}".
              </div>
            )}
          </div>

          {/* Footer Navigation Hints */}
          <div className="flex items-center justify-between border-t border-border bg-surface-soft/80 px-4 py-2.5 font-mono text-[11px] text-ink-muted backdrop-blur-md">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-raised px-1.5 py-0.5 text-[9px]">
                  ↑↓
                </kbd>{' '}
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-raised px-1.5 py-0.5 text-[9px]">
                  ↵
                </kbd>{' '}
                Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-border bg-surface-raised px-1.5 py-0.5 text-[9px]">
                  &gt;
                </kbd>{' '}
                Commands
              </span>
            </div>
            <span className="flex items-center gap-1 text-brand-text">
              <Sparkles className="h-3 w-3 text-brand-text" />
              Workspace results
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
