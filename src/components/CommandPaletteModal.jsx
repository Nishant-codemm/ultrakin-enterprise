import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Calendar,
  AtSign,
  FolderOpen,
} from 'lucide-react';
import { useWorkspace } from '../context/useWorkspace';
import { cn } from '../lib/cn';
import { scrimMotion, MODAL_DIALOG_TRANSITION } from '../lib/motion';
import { useFocusTrap } from '../lib/useFocusTrap';

export default function CommandPaletteModal() {
  const {
    isSearchPaletteOpen,
    closeSearchPalette,
    setActiveModule,
    setActiveChannel,
    openDemoDrawer,
    testAutomationsWorkflow,
    setIsKeyboardModalOpen,
    activeModule = 'chat',
    activeEmail,
    addToast,
    convertEmailToTask,
    updateKanbanTask,
    sendMessage,
    createCalendarEvent,
  } = useWorkspace();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [aiGeneratingState, setAiGeneratingState] = useState(null);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const resultRefs = useRef([]);

  // Accessible focus trapping, initial focus, and escape dismissal
  useFocusTrap({
    isOpen: isSearchPaletteOpen,
    containerRef: dialogRef,
    initialFocusRef: inputRef,
    onEscape: closeSearchPalette,
  });

  const executeAiAction = useCallback((statusMessage, callback) => {
    setAiGeneratingState(statusMessage);
    setTimeout(() => {
      setAiGeneratingState(null);
      callback();
      closeSearchPalette();
    }, 450);
  }, [closeSearchPalette]);

  // Context-aware AI Copilot Actions based on the active screen
  const aiContextActions = useMemo(() => {
    switch (activeModule) {
      case 'docs':
        return [
          {
            id: 'ai_docs_summarize',
            type: 'ai',
            category: 'AI Copilot · Living Docs',
            title: 'Summarize RFC-891 specification',
            subtitle: 'Extract architecture invariants, failover SLAs, and consensus points',
            icon: Sparkles,
            action: () =>
              executeAiAction('Synthesizing RFC-891 invariants...', () => {
                addToast(
                  'AI Spec Summary Generated',
                  'DOC-891 key invariants and failover SLAs extracted for executive review.',
                  'ai'
                );
              }),
            badge: 'AI Summarize',
            badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          },
          {
            id: 'ai_docs_checklist',
            type: 'ai',
            category: 'AI Copilot · Living Docs',
            title: 'Export RFC checklist to Sprint 24 Kanban',
            subtitle: 'Sync remaining verification items into tracked engineering tasks',
            icon: Sparkles,
            action: () =>
              executeAiAction('Syncing RFC checklist items to Kanban...', () => {
                setActiveModule('tasks');
                addToast(
                  'Checklist Synced to Kanban',
                  '3 operational verification tasks queued in Sprint 24.',
                  'success'
                );
              }),
            badge: 'AI Sync',
            badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          },
        ];
      case 'mail':
        return [
          {
            id: 'ai_mail_draft',
            type: 'ai',
            category: 'AI Copilot · Domain Mail',
            title: 'Draft AI response to david@acmecorp.com',
            subtitle: 'Explain SSL timeout mitigation and reference hotfix PR #1042',
            icon: Sparkles,
            action: () =>
              executeAiAction('Drafting verified email response...', () => {
                setActiveModule('mail');
                addToast(
                  'AI Reply Drafted',
                  'Context from PR #1042 attached to reply composer in Domain Mailbox.',
                  'ai'
                );
              }),
            badge: 'AI Draft',
            badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
          },
          {
            id: 'ai_mail_triage',
            type: 'ai',
            category: 'AI Copilot · Domain Mail',
            title: 'Convert email escalation into P1 Sprint task',
            subtitle: 'Auto-extract SLA deadline and link customer sender context',
            icon: Sparkles,
            action: () =>
              executeAiAction('Converting email to tracked task...', () => {
                convertEmailToTask?.(activeEmail?.id || 'em_1');
                addToast(
                  'Escalation Converted',
                  'Task #tsk_1 created and assigned to Sara Chen.',
                  'success'
                );
              }),
            badge: 'AI Triage',
            badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          },
        ];
      case 'tasks':
        return [
          {
            id: 'ai_tasks_subtasks',
            type: 'ai',
            category: 'AI Copilot · Sprint Board',
            title: 'Decompose task #tsk_1 into execution subtasks',
            subtitle: 'Generate implementation checklist from linked RFC-891',
            icon: Sparkles,
            action: () =>
              executeAiAction('Decomposing task with Ukin...', () => {
                updateKanbanTask?.('tsk_1', {
                  subtasks: [
                    { id: 'st_ai_1', text: 'Verify Sentinel heartbeat threshold on ingress', done: false },
                    { id: 'st_ai_2', text: 'Execute Canary traffic verification 5% -> 100%', done: false },
                  ],
                });
                addToast(
                  'Subtasks Generated',
                  '2 implementation steps added to task #tsk_1.',
                  'ai'
                );
              }),
            badge: 'AI Decompose',
            badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
          },
          {
            id: 'ai_tasks_triage',
            type: 'ai',
            category: 'AI Copilot · Sprint Board',
            title: 'Triage Sprint 24 backlog by priority & dependencies',
            subtitle: 'Re-rank in-progress items based on live cluster telemetry',
            icon: Sparkles,
            action: () =>
              executeAiAction('Triaging backlog with Ukin...', () => {
                addToast(
                  'Backlog Triaged',
                  'P0 and P1 tickets prioritized based on cluster SLA.',
                  'ai'
                );
              }),
            badge: 'AI Triage',
            badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
          },
        ];
      case 'calendar':
        return [
          {
            id: 'ai_cal_debrief',
            type: 'ai',
            category: 'AI Copilot · Team Calendar',
            title: 'Schedule incident debrief follow-up',
            subtitle: 'Find optimal 30-min window for Sara Chen & Alex Mercer',
            icon: Sparkles,
            action: () =>
              executeAiAction('Scheduling post-mortem debrief...', () => {
                createCalendarEvent?.({
                  title: 'Incident Post-Mortem & Sentinel Hardening Review',
                  category: 'architecture',
                  startTime: '14:00',
                  durationMinutes: 45,
                  date: '2026-10-21',
                  attendees: ['Sara Chen', 'Alex Mercer'],
                });
                addToast('Debrief Scheduled', 'Incident debrief added to Team Calendar.', 'ai');
              }),
            badge: 'AI Schedule',
            badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          },
          {
            id: 'ai_cal_export',
            type: 'ai',
            category: 'AI Copilot · Team Calendar',
            title: 'Extract meeting decisions to Living Doc RFC',
            subtitle: 'Sync consensus and action items into RFC-891',
            icon: Sparkles,
            action: () =>
              executeAiAction('Extracting meeting consensus...', () => {
                setActiveModule('docs');
                addToast('Decisions Exported', 'Meeting consensus synced to Living Doc RFC-891.', 'ai');
              }),
            badge: 'AI Export',
            badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          },
        ];
      case 'threads':
        return [
          {
            id: 'ai_threads_bridge',
            type: 'ai',
            category: 'AI Copilot · Incident Threads',
            title: 'Synthesize incident thread into Living Doc',
            subtitle: 'Bridge thread resolution notes into RFC-891',
            icon: Sparkles,
            action: () =>
              executeAiAction('Bridging thread notes to RFC-891...', () => {
                setActiveModule('docs');
                addToast('Thread Synthesized', 'Consensus exported to Living Doc RFC-891.', 'ai');
              }),
            badge: 'AI Bridge',
            badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          },
          {
            id: 'ai_threads_update',
            type: 'ai',
            category: 'AI Copilot · Incident Threads',
            title: 'Draft thread update for stakeholders',
            subtitle: 'Generate executive status message regarding cluster stability',
            icon: Sparkles,
            action: () =>
              executeAiAction('Drafting stakeholder update...', () => {
                addToast('Status Update Drafted', 'Ready for review in #incident-review thread.', 'ai');
              }),
            badge: 'AI Draft',
            badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
          },
        ];
      case 'chat':
      default:
        return [
          {
            id: 'ai_chat_diag',
            type: 'ai',
            category: 'AI Copilot · Spaces Chat',
            title: 'Ask Ukin to diagnose cluster latency',
            subtitle: 'Inspect p99 latency spike on cluster-eu-04 ingress nodes',
            icon: Sparkles,
            action: () =>
              executeAiAction('Running cluster diagnostic in #incident-war-room...', () => {
                setActiveModule('chat');
                sendMessage?.('@ukin run cluster latency diagnostic');
                addToast(
                  'AI Diagnostic Dispatched',
                  'Ukin is analyzing workspace telemetry in #incident-war-room.',
                  'ai'
                );
              }),
            badge: 'AI Diagnostic',
            badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          },
          {
            id: 'ai_chat_summary',
            type: 'ai',
            category: 'AI Copilot · Spaces Chat',
            title: 'Summarize #incident-war-room decisions',
            subtitle: 'Extract rollout consensus and agreed mitigation timeline',
            icon: Sparkles,
            action: () =>
              executeAiAction('Summarizing channel decisions...', () => {
                addToast('Incident Decisions Summarized', 'Consensus linked to Living Doc RFC-891.', 'ai');
              }),
            badge: 'AI Summary',
            badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          },
        ];
    }
  }, [
    activeModule,
    activeEmail,
    executeAiAction,
    addToast,
    setActiveModule,
    convertEmailToTask,
    updateKanbanTask,
    createCalendarEvent,
    sendMessage,
  ]);

  // Context-aware placeholder for keyboard-first invocation
  const contextualPlaceholder = useMemo(() => {
    switch (activeModule) {
      case 'docs':
        return 'Ask Ukin about RFC-891, summarize spec, or search... (⌘K)';
      case 'mail':
        return 'Ask Ukin to draft reply, convert email, or search... (⌘K)';
      case 'tasks':
        return 'Ask Ukin to decompose tasks, triage backlog, or search... (⌘K)';
      case 'calendar':
        return 'Ask Ukin to schedule debrief, extract agenda, or search... (⌘K)';
      case 'threads':
        return 'Ask Ukin to summarize thread, or search... (⌘K)';
      case 'chat':
        return 'Ask Ukin in #incident-war-room, or search... (⌘K)';
      default:
        return "Type a command, ask Ukin, or search... (prefix '>' for commands)";
    }
  }, [activeModule]);

  // All searchable entities across the unified workspace kernel (memoized to prevent reallocation on search keystrokes)
  const entities = useMemo(
    () => [
      // Contextual AI Copilot Actions for active module
      ...aiContextActions,

      // Commands
      {
        id: 'cmd_chat',
        type: 'command',
        category: 'Commands',
        title: 'Open Spaces Chat (⌘1)',
        subtitle: 'Real-time multi-agent communication and Ukin assistant channel',
        icon: MessageSquare,
        action: () => setActiveModule('chat'),
        badge: 'Chat',
        badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      },
      {
        id: 'cmd_threads',
        type: 'command',
        category: 'Commands',
        title: 'Open Incident Threads (⌘2)',
        subtitle: 'Focused discussions and incident resolution threads',
        icon: AtSign,
        action: () => setActiveModule('threads'),
        badge: 'Threads',
        badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      },
      {
        id: 'cmd_mail',
        type: 'command',
        category: 'Commands',
        title: 'Compose Domain Email (⌘3)',
        subtitle: 'Draft a message in the sample workspace',
        icon: Mail,
        action: () => setActiveModule('mail'),
        badge: 'Action',
        badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
      },
      {
        id: 'cmd_docs',
        type: 'command',
        category: 'Commands',
        title: 'Open Living Docs (⌘4)',
        subtitle: 'TipTap collaborative documents, architecture specs, and RFCs',
        icon: FileText,
        action: () => setActiveModule('docs'),
        badge: 'Docs',
        badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      },
      {
        id: 'cmd_calendar',
        type: 'command',
        category: 'Commands',
        title: 'Open Team Calendar & Schedule (⌘5)',
        subtitle: 'View multi-timezone calendar and upcoming architecture sessions',
        icon: Calendar,
        action: () => setActiveModule('calendar'),
        badge: 'Calendar',
        badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      },
      {
        id: 'cmd_huddle',
        type: 'command',
        category: 'Commands',
        title: 'Start WebRTC Huddle (⌘6)',
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
        title: 'Create Kanban Task (⌘7)',
        subtitle: 'Spawn a ticket in Sprint 24 pipeline',
        icon: CheckSquare,
        action: () => setActiveModule('tasks'),
        badge: 'Action',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      },
      {
        id: 'cmd_files',
        type: 'command',
        category: 'Commands',
        title: 'Browse Files & Evidence (⌘8)',
        subtitle: 'Explore uploaded audit specifications, hashes, and compliance evidence',
        icon: FolderOpen,
        action: () => setActiveModule('files'),
        badge: 'Files',
        badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
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
    ],
    [
      aiContextActions,
      setActiveModule,
      setActiveChannel,
      openDemoDrawer,
      testAutomationsWorkflow,
      setIsKeyboardModalOpen,
    ]
  );

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

  const [prevIsOpen, setPrevIsOpen] = useState(isSearchPaletteOpen);

  // Synchronously reset query and selection during render when modal closes (React recommended pattern)
  if (prevIsOpen !== isSearchPaletteOpen) {
    setPrevIsOpen(isSearchPaletteOpen);
    if (!isSearchPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }

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
        e.stopPropagation();
        closeSearchPalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = filtered.length ? (selectedIndex + 1) % filtered.length : 0;
        setSelectedIndex(nextIndex);
        resultRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
        if (document.activeElement !== inputRef.current) resultRefs.current[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const nextIndex = filtered.length ? (selectedIndex - 1 + filtered.length) % filtered.length : 0;
        setSelectedIndex(nextIndex);
        resultRefs.current[nextIndex]?.scrollIntoView({ block: 'nearest' });
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

  return (
    <AnimatePresence>
      {isSearchPaletteOpen && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[12vh] sm:pt-[15vh] px-4 select-none">
          {/* Backdrop Scrim */}
          <motion.div
            {...scrimMotion}
            onClick={closeSearchPalette}
            aria-hidden="true"
            className="fixed inset-0 bg-slate-900/35 backdrop-blur-md -z-10"
          />

        {/* Dialog Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={MODAL_DIALOG_TRANSITION}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Search Ultrakin"
          aria-describedby="command-palette-description"
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
              placeholder={contextualPlaceholder}
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
                onClick={() => {
                  setQuery('');
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                className="cursor-pointer p-1 text-ink-subtle transition-colors hover:text-ink"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden items-center gap-0.5 rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-[10px] text-ink-muted sm:inline-flex">
              ESC
            </kbd>
          </div>

          {/* Inline AI Progress Banner */}
          {aiGeneratingState && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2.5 px-4 py-2.5 bg-indigo-500/10 border-b border-indigo-500/20 text-indigo-300 text-xs font-mono animate-in fade-in duration-150"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span className="font-semibold text-white">Ukin Copilot:</span>
              <span>{aiGeneratingState}</span>
              <span className="ml-auto text-[10px] text-indigo-400/80 hidden sm:inline">
                Synthesizing context
              </span>
            </div>
          )}

          {/* Results List */}
          <div id="command-palette-results" role="listbox" aria-label="Search results" className="max-h-[380px] overflow-y-auto p-2 space-y-1">
            {filtered.length > 0 ? (
              filtered.map((item, idx) => {
                const isSelected = selectedIndex === idx;
                const IconComp = item.icon;
                const isFirstInCategory = idx === 0 || item.category !== filtered[idx - 1].category;

                return (
                  <React.Fragment key={item.id}>
                    {isFirstInCategory && (
                      <div
                        role="presentation"
                        className={cn(
                          'px-3 pb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-subtle select-none',
                          idx === 0 ? 'pt-1.5' : 'pt-3.5 mt-1 border-t border-border/40'
                        )}
                      >
                        {item.category}
                      </div>
                    )}
                    <button
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
                  </React.Fragment>
                );
              })
            ) : (
              <div role="status" aria-live="polite" className="p-6 text-center">
                <div className="mx-auto w-9 h-9 rounded-full bg-surface-soft border border-border flex items-center justify-center text-ink-subtle mb-3">
                  <Search className="w-4 h-4" />
                </div>
                <p className="text-sm font-semibold text-ink">No matching records for &ldquo;{query}&rdquo;</p>
                <p className="mt-1 text-xs text-ink-muted max-w-sm mx-auto">
                  Try searching by module, channel, or use one of the quick actions below:
                </p>
                <div className="mt-4 flex flex-col gap-2 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('chat');
                      closeSearchPalette();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-soft hover:bg-surface-hover border border-border text-xs text-ink transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-brand-text" />
                      <span>Ask Ukin AI in Spaces Chat</span>
                    </span>
                    <span className="text-[10px] font-mono text-ink-subtle">⌘1</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModule('tasks');
                      closeSearchPalette();
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface-soft hover:bg-surface-hover border border-border text-xs text-ink transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-500" />
                      <span>Create Task in Sprint Board</span>
                    </span>
                    <span className="text-[10px] font-mono text-ink-subtle">⌘7</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="text-[11px] text-brand-text hover:underline mt-1 font-medium cursor-pointer"
                  >
                    Clear search query
                  </button>
                </div>
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
      )}
    </AnimatePresence>
  );
}
