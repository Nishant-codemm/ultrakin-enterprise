import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  AtSign,
  Bot,
  Calendar as CalendarIcon,
  Check,
  CheckSquare,
  ChevronDown,
  FileText,
  FolderOpen,
  GitBranch,
  HelpCircle,
  LogOut,
  Mail,
  MessageSquare,
  Minimize2,
  Radio,
  Search,
  Settings,
  Shield,
  Video,
} from 'lucide-react';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { cn } from '../../lib/cn';
import { useWorkspace } from '../../context/useWorkspace';
import MatrixChatEngine from './MatrixChatEngine';
import EventBusTelemetryDrawer from './EventBusTelemetryDrawer';
import WorkspaceToastContainer from './WorkspaceToastContainer';
import WorkspaceModuleSkeleton from './WorkspaceModuleSkeleton';
import ErrorBoundary from '../common/ErrorBoundary';
import HeroThreadsView from './HeroThreadsView';
import HeroFilesView from './HeroFilesView';
import { prefetch } from '../../lib/prefetch';

const loadMail = () => import('./DomainMailboxEngine');
const loadDocs = () => import('./LivingDocEditor');
const loadHuddle = () => import('./HuddleSimulator');
const loadTasks = () => import('./KanbanTaskBoard');
const loadAutomations = () => import('./VisualAutomationsCanvas');
const loadCalendar = () => import('./calendar/CalendarEngine');

const DomainMailboxEngine = lazy(loadMail);
const LivingDocEditor = lazy(loadDocs);
const HuddleSimulator = lazy(loadHuddle);
const KanbanTaskBoard = lazy(loadTasks);
const VisualAutomationsCanvas = lazy(loadAutomations);
const CalendarEngine = lazy(loadCalendar);

const MODULE_PREFETCH_MAP = {
  mail: loadMail,
  docs: loadDocs,
  calendar: loadCalendar,
  huddle: loadHuddle,
  tasks: loadTasks,
  automations: loadAutomations,
};

export default function WorkspaceShell({ className = '', onExitFullscreen }) {
  const {
    activeModule,
    setActiveModule,
    activeChannel,
    setActiveChannel,
    channels,
    unreadEmailCount,
    kanbanTasks,
    openSearchPalette,
    setIsKeyboardModalOpen,
    isOnline = true,
    lastSyncedAt = 'Just now',
    toasts = [],
  } = useWorkspace();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [orgMenuOpen, setOrgMenuOpen] = useState(false);
  const [userStatus, setUserStatus] = useState('online');

  const reduceMotion = useReducedMotion();
  const [visitedModules, setVisitedModules] = useState(() => [activeModule]);
  if (!visitedModules.includes(activeModule)) {
    setVisitedModules((prev) => (prev.includes(activeModule) ? prev : [...prev, activeModule]));
  }

  const mainCanvasRef = useRef(null);
  const prevModuleRef = useRef(activeModule);

  useEffect(() => {
    if (prevModuleRef.current !== activeModule) {
      prevModuleRef.current = activeModule;
      if (
        mainCanvasRef.current &&
        !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
      ) {
        mainCanvasRef.current.focus({ preventScroll: true });
      }
    }
  }, [activeModule]);

  const orgMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    if (!orgMenuOpen && !profileMenuOpen) return;

    const handlePointerDown = (event) => {
      if (orgMenuOpen && orgMenuRef.current && !orgMenuRef.current.contains(event.target)) {
        setOrgMenuOpen(false);
      }
      if (profileMenuOpen && profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOrgMenuOpen(false);
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [orgMenuOpen, profileMenuOpen]);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-obsidian-canvas text-slate-200 select-none border border-obsidian-border rounded-xl shadow-2xl',
        className,
      )}
    >
      {/* Accessible live status announcement region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {toasts.length > 0 ? toasts[toasts.length - 1]?.title : `Active module: ${activeModule}`}
      </div>

      {/* ── Workspace Application Command Bar ── */}
      <div className="h-11 px-3 sm:px-4 bg-obsidian-surface/95 border-b border-obsidian-border flex items-center justify-between select-none relative z-30 backdrop-blur-md">
        {/* Left: Organization & Active Context Breadcrumb */}
        <div ref={orgMenuRef} className="flex items-center gap-2 min-w-0 relative">
          <button
            type="button"
            onClick={() => {
              setOrgMenuOpen((prev) => !prev);
              setProfileMenuOpen(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-colors cursor-pointer shrink-0 text-left"
            title="Switch organization"
            aria-expanded={orgMenuOpen}
          >
            <div className="w-4 h-4 rounded bg-indigo-500/25 text-indigo-300 flex items-center justify-center font-bold text-[9.5px]">
              A
            </div>
            <span className="text-xs font-semibold tracking-tight text-white hidden sm:inline">
              Acme Corp
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Org Switcher Dropdown */}
          {orgMenuOpen && (
            <div
              className="absolute left-0 top-full mt-1.5 w-60 rounded-xl bg-obsidian-surface border border-obsidian-border p-2 shadow-2xl z-40 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
              role="menu"
            >
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-obsidian-muted border-b border-obsidian-border-soft mb-1">
                Select Organization
              </div>
              <button
                type="button"
                onClick={() => setOrgMenuOpen(false)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs bg-indigo-600/15 text-indigo-200 border border-indigo-500/30 font-medium cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-4 h-4 rounded bg-indigo-500 text-white font-bold text-[9px] flex items-center justify-center">
                    A
                  </div>
                  <span className="truncate">Acme Corp (Primary)</span>
                </div>
                <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setOrgMenuOpen(false)}
                className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] transition-colors cursor-pointer mt-0.5"
              >
                <div className="flex items-center gap-2 truncate">
                  <div className="w-4 h-4 rounded bg-slate-700 text-slate-300 font-bold text-[9px] flex items-center justify-center">
                    S
                  </div>
                  <span className="truncate">Acme Security Staging</span>
                </div>
              </button>
              <div className="mt-1 pt-1 border-t border-obsidian-border-soft">
                <span className="text-[10px] text-slate-500 px-2 py-0.5 block">
                  Enterprise Plan · SOC 2 Type II
                </span>
              </div>
            </div>
          )}

          <span className="text-obsidian-border text-xs hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span className="text-xs font-mono text-indigo-300 truncate font-medium">
            {activeModule === 'chat'
              ? `#${activeChannel}`
              : activeModule === 'threads'
              ? 'Threads'
              : activeModule === 'mail'
              ? 'Inbox'
              : activeModule === 'docs'
              ? 'Living Docs'
              : activeModule === 'calendar'
              ? 'Team Calendar'
              : activeModule === 'huddle'
              ? 'Live Huddle'
              : activeModule === 'tasks'
              ? 'Sprint Board'
              : activeModule === 'files'
              ? 'Files'
              : 'Automations'}
          </span>
        </div>

        {/* Center: Command Palette Search Bar */}
        <button
          type="button"
          onClick={openSearchPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.035] border border-white/[0.08] text-xs text-obsidian-muted hover:text-slate-200 hover:border-white/[0.16] hover:bg-white/[0.06] transition-all duration-150 cursor-pointer max-w-[280px] w-full justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-[11.5px]">Search or ask Ukin...</span>
          </div>
          <kbd className="font-mono text-[9.5px] px-1.5 py-0.5 rounded bg-white/[0.08] border border-white/[0.1] text-slate-300 shrink-0">
            ⌘K
          </kbd>
        </button>

        {/* Right: Real-time Presence & Sync Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center -space-x-1.5" title="Active collaborators in workspace">
            <span
              className="relative w-5 h-5 rounded-full bg-indigo-500/30 border border-obsidian-surface text-[9px] font-semibold text-indigo-200 flex items-center justify-center cursor-default"
              title={`Sara Chen · Active in ${activeModule}`}
            >
              SC
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-obsidian-canvas" />
            </span>
            <span
              className="relative w-5 h-5 rounded-full bg-emerald-500/30 border border-obsidian-surface text-[9px] font-semibold text-emerald-200 flex items-center justify-center cursor-default"
              title="Elena Rostova · Idle 4m"
            >
              EL
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 border border-obsidian-canvas" />
            </span>
            <span
              className="relative w-5 h-5 rounded-full bg-violet-500/30 border border-obsidian-surface text-[9px] font-semibold text-violet-200 flex items-center justify-center cursor-default"
              title="Ukin Agent · Real-time pipeline active"
            >
              UK
              <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 border border-obsidian-canvas animate-pulse" />
            </span>
          </div>
          <span className="hidden md:inline h-3 w-px bg-white/10" aria-hidden="true" />
          {isOnline ? (
            <span
              className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5"
              title={`Live real-time sync active · Synced ${lastSyncedAt}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="hidden lg:inline text-[10.5px]">3 agents synced · {lastSyncedAt}</span>
            </span>
          ) : (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center gap-1.5"
              title="Client is offline. Workspace changes are cached locally."
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Offline (Cached)</span>
            </span>
          )}
          <button
            type="button"
            onClick={() => setDrawerOpen((prev) => !prev)}
            title={drawerOpen ? 'Collapse Event Bus Drawer' : 'Show Event Bus & Telemetry Drawer'}
            aria-label="Toggle Event Bus Drawer"
            aria-pressed={drawerOpen}
            className={cn(
              'hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-mono border transition-all cursor-pointer',
              drawerOpen
                ? 'bg-indigo-600/25 text-indigo-300 border-indigo-500/40 shadow-xs'
                : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-slate-200 hover:bg-white/[0.08]',
            )}
          >
            <Activity className="w-3 h-3 text-indigo-400" />
            <span>Telemetry</span>
          </button>
          {onExitFullscreen && (
            <button
              type="button"
              onClick={onExitFullscreen}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-mono border border-white/[0.08] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Exit Fullscreen (Esc)"
            >
              <Minimize2 className="w-3 h-3 text-slate-400" />
              <span className="hidden sm:inline">Exit Fullscreen</span>
              <kbd className="px-1 py-0.2 rounded bg-white/[0.08] text-[9px] font-mono text-slate-400">Esc</kbd>
            </button>
          )}
        </div>
      </div>

      {/* ── Compact Mobile Module Switcher Bar (< md only: Realism & Full Mobile Touch Affordance) ── */}
      <div
        role="tablist"
        aria-label="Mobile workspace modules"
        className="flex md:hidden items-center gap-1.5 px-3 py-2 bg-obsidian-surface border-b border-obsidian-border overflow-x-auto select-none scrollbar-none"
      >
        {[
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'threads', label: 'Threads', icon: AtSign },
          { id: 'mail', label: 'Mail', icon: Mail, badge: unreadEmailCount > 0 ? unreadEmailCount : null },
          { id: 'docs', label: 'Docs', icon: FileText },
          { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
          { id: 'huddle', label: 'Huddle', icon: Video },
          { id: 'tasks', label: 'Tasks', icon: CheckSquare, badge: kanbanTasks.length },
          { id: 'files', label: 'Files', icon: FolderOpen },
          { id: 'automations', label: 'Agents', icon: Bot },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              id={`mobile-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`module-panel-${item.id}`}
              type="button"
              onClick={() => setActiveModule(item.id)}
              onMouseEnter={() => MODULE_PREFETCH_MAP[item.id] && prefetch(MODULE_PREFETCH_MAP[item.id])}
              onFocus={() => MODULE_PREFETCH_MAP[item.id] && prefetch(MODULE_PREFETCH_MAP[item.id])}
              onTouchStart={() => MODULE_PREFETCH_MAP[item.id] && prefetch(MODULE_PREFETCH_MAP[item.id])}
              className={cn(
                'relative flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer',
                isActive
                  ? 'text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeMobileModulePill"
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-xs -z-10"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className={cn('px-1 py-0.2 rounded-full text-[9px] font-mono font-bold', isActive ? 'bg-white/20 text-white' : 'bg-indigo-500/20 text-indigo-300')}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Multi-Column Application Shell (56px Rail + 210px Sidebar + Main Canvas + Optional 320px Drawer) ── */}
      <div
        className={cn(
          'grid grid-cols-1 md:grid-cols-[56px_210px_1fr] min-h-[620px] flex-1 min-h-0 bg-obsidian-base transition-all duration-300',
          drawerOpen ? 'xl:grid-cols-[56px_210px_1fr_320px]' : '',
        )}
      >
        {/* 1. 56px Workspace Left Rail */}
        <div className="hidden md:flex flex-col items-center py-3 bg-obsidian-base border-r border-obsidian-border-soft gap-2 select-none relative">
          {/* Active Workspace Squircle */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            title="Ultrakin Enterprise Workspace"
          >
            <UltrakinLogo size={32} />
          </div>

          <div className="w-7 h-[1px] bg-white/10 my-1" />

          {/* Module Quick Switchers (Linear/Slack Craftsmanship: Restrained, Pixel-Aligned) */}
          <nav role="tablist" aria-label="Workspace modules" className="flex flex-col items-center gap-2 w-full">
            <button
              type="button"
              role="tab"
              id="module-tab-chat"
              aria-selected={activeModule === 'chat'}
              aria-controls="module-panel-chat"
              tabIndex={activeModule === 'chat' ? 0 : -1}
              onClick={() => setActiveModule('chat')}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'chat'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Spaces Chat (⌘1)"
              aria-label="Spaces Chat"
            >
              {activeModule === 'chat' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-threads"
              aria-selected={activeModule === 'threads'}
              aria-controls="module-panel-threads"
              tabIndex={activeModule === 'threads' ? 0 : -1}
              onClick={() => setActiveModule('threads')}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'threads'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Threads (⌘2)"
              aria-label="Threads"
            >
              {activeModule === 'threads' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <AtSign className="w-5 h-5" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-mail"
              aria-selected={activeModule === 'mail'}
              aria-controls="module-panel-mail"
              tabIndex={activeModule === 'mail' ? 0 : -1}
              onClick={() => setActiveModule('mail')}
              onMouseEnter={() => prefetch(loadMail)}
              onFocus={() => prefetch(loadMail)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'mail'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Custom Domain Email (⌘3)"
              aria-label="Custom Domain Email"
            >
              {activeModule === 'mail' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <Mail className="w-5 h-5" />
              {unreadEmailCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-400" />
              )}
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-docs"
              aria-selected={activeModule === 'docs'}
              aria-controls="module-panel-docs"
              tabIndex={activeModule === 'docs' ? 0 : -1}
              onClick={() => setActiveModule('docs')}
              onMouseEnter={() => prefetch(loadDocs)}
              onFocus={() => prefetch(loadDocs)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'docs'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="TipTap Living Docs (⌘4)"
              aria-label="TipTap Living Docs"
            >
              {activeModule === 'docs' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <FileText className="w-5 h-5" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-calendar"
              aria-selected={activeModule === 'calendar'}
              aria-controls="module-panel-calendar"
              tabIndex={activeModule === 'calendar' ? 0 : -1}
              onClick={() => setActiveModule('calendar')}
              onMouseEnter={() => prefetch(loadCalendar)}
              onFocus={() => prefetch(loadCalendar)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'calendar'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Team Calendar & Events (⌘5)"
              aria-label="Team Calendar & Events"
            >
              {activeModule === 'calendar' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <CalendarIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-huddle"
              aria-selected={activeModule === 'huddle'}
              aria-controls="module-panel-huddle"
              tabIndex={activeModule === 'huddle' ? 0 : -1}
              onClick={() => setActiveModule('huddle')}
              onMouseEnter={() => prefetch(loadHuddle)}
              onFocus={() => prefetch(loadHuddle)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'huddle'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Huddle Video Chamber (⌘6)"
              aria-label="Huddle"
            >
              {activeModule === 'huddle' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <Video className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-tasks"
              aria-selected={activeModule === 'tasks'}
              aria-controls="module-panel-tasks"
              tabIndex={activeModule === 'tasks' ? 0 : -1}
              onClick={() => setActiveModule('tasks')}
              onMouseEnter={() => prefetch(loadTasks)}
              onFocus={() => prefetch(loadTasks)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'tasks'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Tasks & Sprint Board (⌘7)"
              aria-label="Tasks Kanban Board"
            >
              {activeModule === 'tasks' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <CheckSquare className="w-5 h-5" />
              {kanbanTasks.length > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-files"
              aria-selected={activeModule === 'files'}
              aria-controls="module-panel-files"
              tabIndex={activeModule === 'files' ? 0 : -1}
              onClick={() => setActiveModule('files')}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'files'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Files & Evidence (⌘8)"
              aria-label="Files"
            >
              {activeModule === 'files' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <FolderOpen className="w-5 h-5" />
            </button>

            <button
              type="button"
              role="tab"
              id="module-tab-automations"
              aria-selected={activeModule === 'automations'}
              aria-controls="module-panel-automations"
              tabIndex={activeModule === 'automations' ? 0 : -1}
              onClick={() => setActiveModule('automations')}
              onMouseEnter={() => prefetch(loadAutomations)}
              onFocus={() => prefetch(loadAutomations)}
              className={cn(
                'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer',
                activeModule === 'automations'
                  ? 'bg-white/[0.12] text-white border border-white/[0.14] font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]',
              )}
              title="Workflow Automations & Agents (⌘9)"
              aria-label="Automations and Agents"
            >
              {activeModule === 'automations' && (
                <motion.span
                  layoutId="activeModuleIndicator"
                  className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400"
                  transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }}
                  aria-hidden="true"
                />
              )}
              <GitBranch className="w-5 h-5" />
            </button>
          </nav>

          {/* User Profile Avatar with Floating Settings Menu */}
          <div ref={profileMenuRef} className="mt-auto relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => {
                setProfileMenuOpen((prev) => !prev);
                setOrgMenuOpen(false);
              }}
              aria-expanded={profileMenuOpen}
              aria-label="User profile and settings menu"
              className="relative w-9 h-9 rounded-xl bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/40 flex items-center justify-center text-xs font-semibold border border-indigo-500/30 transition-all cursor-pointer"
              title="Sara Chen (Principal Infra Lead) · Settings"
            >
              <span>SC</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-obsidian-base" />
            </button>

            {/* Floating Profile & Settings Menu */}
            {profileMenuOpen && (
              <div
                className="absolute left-full bottom-0 ml-3 w-64 rounded-xl bg-obsidian-surface border border-obsidian-border p-2.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
                role="menu"
              >
                {/* User Info Header */}
                <div className="p-2 border-b border-obsidian-border-soft mb-2">
                  <div className="font-semibold text-white text-xs">Sara Chen</div>
                  <div className="text-[11px] font-mono text-slate-400 truncate">sara@acme.corp</div>
                  <div className="text-[10px] text-indigo-300 font-medium mt-0.5">Principal Infra Lead</div>
                </div>

                {/* Status Selector */}
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-obsidian-muted mb-1">
                  Status
                </div>
                <div className="grid grid-cols-2 gap-1 mb-2">
                  {[
                    { id: 'online', label: 'Online', dot: 'bg-emerald-400' },
                    { id: 'huddle', label: 'In Huddle', dot: 'bg-amber-400' },
                    { id: 'busy', label: 'Do Not Disturb', dot: 'bg-rose-400' },
                    { id: 'offline', label: 'Offline', dot: 'bg-slate-500' },
                  ].map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setUserStatus(st.id)}
                      className={cn(
                        'flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-colors cursor-pointer text-left',
                        userStatus === st.id
                          ? 'bg-white/[0.08] text-white font-medium'
                          : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                      )}
                    >
                      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', st.dot)} />
                      <span className="truncate">{st.label}</span>
                    </button>
                  ))}
                </div>

                {/* Navigation Links */}
                <div className="border-t border-obsidian-border-soft pt-1.5 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setIsKeyboardModalOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Keyboard Shortcuts</span>
                    </div>
                    <kbd className="font-mono text-[9px] text-slate-400 bg-white/[0.06] px-1 py-0.2 rounded border border-white/[0.08]">
                      ⌘/
                    </kbd>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      openSearchPalette();
                    }}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span>Workspace Preferences</span>
                    </div>
                    <kbd className="font-mono text-[9px] text-slate-400 bg-white/[0.06] px-1 py-0.2 rounded border border-white/[0.08]">
                      ⌘,
                    </kbd>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-slate-300 hover:bg-white/[0.06] hover:text-white transition-colors cursor-pointer text-left"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Security &amp; Audit Logs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProfileMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-rose-300 hover:bg-rose-500/15 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. 220px Contextual Sidebar */}
        <div className="hidden md:flex flex-col bg-obsidian-canvas border-r border-obsidian-border-soft p-3 select-none text-xs">
          {/* Workspace Header */}
          <div className="flex items-center justify-between pb-3 border-b border-obsidian-border-soft mb-3">
            <div className="font-semibold text-white truncate flex items-center gap-1.5">
              <UltrakinLogo size={14} className="shrink-0" />
              <span>Acme Platform Team</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {/* Chat and Spaces */}
          <div className="space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted flex items-center justify-between">
              <span>Chat</span>
              <span className="text-[10px] text-slate-600">Shared workspace</span>
            </div>

            {channels.map((ch) => {
              const isSelected = activeModule === 'chat' && activeChannel === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setActiveChannel(ch.id);
                    setActiveModule('chat');
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer text-left',
                    isSelected
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span className={isSelected ? 'text-indigo-400' : 'text-obsidian-muted'}>
                      #
                    </span>
                    <span className="truncate">{ch.name}</span>
                  </span>
                  {ch.isAlert ? (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                  ) : ch.unread > 0 ? (
                    <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold shrink-0">
                      {ch.unread}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveModule('threads')}
            className={cn(
              'mt-3 w-full flex items-center gap-2 px-2.5 py-2 rounded-md font-medium text-left transition-colors cursor-pointer',
              activeModule === 'threads'
                ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
            )}
          >
            <AtSign className="h-3.5 w-3.5" /> Threads{' '}
            <span className="ml-auto text-[10px] text-obsidian-muted">3</span>
          </button>

          {/* Active Huddle Banner */}
          <div className="mt-4 pt-3 border-t border-obsidian-border-soft">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted">
              Huddles
            </div>
            <button
              type="button"
              onClick={() => setActiveModule('huddle')}
              className={cn(
                'w-full p-2 rounded-lg border text-emerald-300 flex items-center justify-between mt-1 cursor-pointer transition-colors',
                activeModule === 'huddle'
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow-sm'
                  : 'bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/15',
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
                <span className="font-semibold text-xs truncate">Sprint Architecture Sync</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-200 font-mono shrink-0">
                4 online
              </span>
            </button>
          </div>

          {/* Docs and Files Navigation */}
          <div className="mt-4 pt-3 border-t border-obsidian-border-soft space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted">
              Docs
            </div>
            <button
              type="button"
              onClick={() => setActiveModule('docs')}
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                activeModule === 'docs'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
              )}
            >
              <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span className="truncate">Q4 EU Cluster RFC</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveModule('files')}
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                activeModule === 'files'
                  ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
              )}
            >
              <FolderOpen className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="truncate">Files</span>
              <span className="ml-auto text-[10px] text-obsidian-muted">4</span>
            </button>
          </div>

          {/* Calendar Navigation */}
          <div className="mt-3 pt-3 border-t border-obsidian-border-soft space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted flex items-center justify-between">
              <span>Calendar</span>
              <span className="text-[10px] text-indigo-400 font-bold font-mono">
                Today
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModule('calendar')}
              className={cn(
                'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                activeModule === 'calendar'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <CalendarIcon className="w-3.5 h-3.5 shrink-0 text-indigo-400" />
                <span className="truncate">Team Schedule</span>
              </div>
              <span className="text-[9.5px] font-mono text-emerald-400 shrink-0">1 live</span>
            </button>
          </div>

          {/* Kanban Tasks Navigation */}
          <div className="mt-3 pt-3 border-t border-obsidian-border-soft space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted flex items-center justify-between">
              <span>Tasks</span>
              <span className="text-[10px] text-amber-400 font-bold font-mono">
                {kanbanTasks.length}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveModule('tasks')}
              className={cn(
                'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                activeModule === 'tasks'
                  ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
              )}
            >
              <div className="flex items-center gap-2 truncate">
                <CheckSquare className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                <span className="truncate">Sprint 24 Board</span>
              </div>
            </button>
          </div>

          {/* Visual Automations Navigation */}
          <div className="mt-3 pt-3 border-t border-obsidian-border-soft space-y-1">
            <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted">
              Agents
            </div>
            <button
              type="button"
              onClick={() => setActiveModule('automations')}
              className={cn(
                'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                activeModule === 'automations'
                  ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5',
              )}
            >
              <Bot className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              <span className="truncate">Ukin workflows</span>
            </button>
          </div>

          {/* Native Mailbox Counter */}
          <div className="mt-auto pt-3 border-t border-obsidian-border-soft">
            <button
              type="button"
              onClick={() => setActiveModule('mail')}
              className={cn(
                'w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer',
                activeModule === 'mail'
                  ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:bg-white/5',
              )}
            >
              <span className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">Domain Mail</span>
              </span>
              {unreadEmailCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold shrink-0">
                  {unreadEmailCount} new
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 3. Main Multi-Mode Interactive Canvas (Engines) */}
        <div
          ref={mainCanvasRef}
          tabIndex={-1}
          aria-label={`Workspace ${activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} view`}
          className="flex flex-col bg-obsidian-base min-h-[580px] flex-1 min-h-0 overflow-hidden relative outline-none"
        >
          <ErrorBoundary name={activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}>
            <Suspense fallback={<WorkspaceModuleSkeleton />}>
              {visitedModules.includes('chat') && (
                <div
                  role="tabpanel"
                  id="module-panel-chat"
                  aria-labelledby="module-tab-chat"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'chat' && 'hidden'
                  )}
                >
                  <MatrixChatEngine />
                </div>
              )}
              {visitedModules.includes('threads') && (
                <div
                  role="tabpanel"
                  id="module-panel-threads"
                  aria-labelledby="module-tab-threads"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'threads' && 'hidden'
                  )}
                >
                  <HeroThreadsView />
                </div>
              )}
              {visitedModules.includes('mail') && (
                <div
                  role="tabpanel"
                  id="module-panel-mail"
                  aria-labelledby="module-tab-mail"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'mail' && 'hidden'
                  )}
                >
                  <DomainMailboxEngine />
                </div>
              )}
              {visitedModules.includes('docs') && (
                <div
                  role="tabpanel"
                  id="module-panel-docs"
                  aria-labelledby="module-tab-docs"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'docs' && 'hidden'
                  )}
                >
                  <LivingDocEditor />
                </div>
              )}
              {visitedModules.includes('calendar') && (
                <div
                  role="tabpanel"
                  id="module-panel-calendar"
                  aria-labelledby="module-tab-calendar"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'calendar' && 'hidden'
                  )}
                >
                  <CalendarEngine />
                </div>
              )}
              {visitedModules.includes('huddle') && (
                <div
                  role="tabpanel"
                  id="module-panel-huddle"
                  aria-labelledby="module-tab-huddle"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'huddle' && 'hidden'
                  )}
                >
                  <HuddleSimulator />
                </div>
              )}
              {visitedModules.includes('tasks') && (
                <div
                  role="tabpanel"
                  id="module-panel-tasks"
                  aria-labelledby="module-tab-tasks"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'tasks' && 'hidden'
                  )}
                >
                  <KanbanTaskBoard />
                </div>
              )}
              {visitedModules.includes('files') && (
                <div
                  role="tabpanel"
                  id="module-panel-files"
                  aria-labelledby="module-tab-files"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'files' && 'hidden'
                  )}
                >
                  <HeroFilesView />
                </div>
              )}
              {visitedModules.includes('automations') && (
                <div
                  role="tabpanel"
                  id="module-panel-automations"
                  aria-labelledby="module-tab-automations"
                  className={cn(
                    'h-full w-full flex flex-col flex-1 min-h-0 overflow-hidden',
                    activeModule !== 'automations' && 'hidden'
                  )}
                >
                  <VisualAutomationsCanvas />
                </div>
              )}
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* 4. Contextual Secondary Drawer: Kernel Telemetry & Ukin Action Engine */}
        {drawerOpen && <EventBusTelemetryDrawer onClose={() => setDrawerOpen(false)} />}
      </div>

      {/* Reactive Telemetry Toast Container */}
      <WorkspaceToastContainer />
    </div>
  );
}
