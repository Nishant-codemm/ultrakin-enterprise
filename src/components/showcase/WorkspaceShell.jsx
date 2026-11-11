import React, { Suspense, lazy } from 'react';
import {
  AtSign,
  Bot,
  CheckSquare,
  ChevronDown,
  FileText,
  FolderOpen,
  GitBranch,
  Mail,
  MessageSquare,
  Radio,
  Search,
  Video,
} from 'lucide-react';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { cn } from '../../lib/cn';
import { useWorkspace } from '../../context/useWorkspace';
import MatrixChatEngine from './MatrixChatEngine';
import EventBusTelemetryDrawer from './EventBusTelemetryDrawer';
import WorkspaceToastContainer from './WorkspaceToastContainer';
import WorkspaceModuleSkeleton from './WorkspaceModuleSkeleton';
import HeroThreadsView from './HeroThreadsView';
import HeroFilesView from './HeroFilesView';

const DomainMailboxEngine = lazy(() => import('./DomainMailboxEngine'));
const LivingDocEditor = lazy(() => import('./LivingDocEditor'));
const HuddleSimulator = lazy(() => import('./HuddleSimulator'));
const KanbanTaskBoard = lazy(() => import('./KanbanTaskBoard'));
const VisualAutomationsCanvas = lazy(() => import('./VisualAutomationsCanvas'));

export default function WorkspaceShell({ className = '' }) {
  const {
    activeModule,
    setActiveModule,
    activeChannel,
    setActiveChannel,
    channels,
    unreadEmailCount,
    kanbanTasks,
    openSearchPalette,
  } = useWorkspace();

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-obsidian-canvas text-slate-200 select-none transition-transform duration-700 ease-out hover:rotate-x-0 group/showcase',
        className,
      )}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow:
          '0 18px 48px -36px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Specular Screen Glass Reflection */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 z-20 opacity-[0.16] select-none overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 100%)',
        }}
      />

      {/* ── Workspace Application Command Bar ── */}
      <div className="h-11 px-3 sm:px-4 bg-obsidian-surface/95 border-b border-obsidian-border flex items-center justify-between select-none relative z-20 backdrop-blur-md">
        {/* Left: Organization & Active Context Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors cursor-pointer shrink-0"
            title="Switch organization"
          >
            <div className="w-4 h-4 rounded bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-[9.5px]">
              A
            </div>
            <span className="text-xs font-semibold tracking-tight text-white hidden sm:inline">
              Acme Corp
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
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
          className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.035] border border-white/[0.08] text-xs text-obsidian-muted hover:text-slate-200 hover:border-white/[0.16] hover:bg-white/[0.06] transition-all duration-200 cursor-pointer max-w-[280px] w-full justify-between"
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
          <div className="hidden md:flex items-center -space-x-1.5" title="Active in workspace">
            <span className="w-5 h-5 rounded-full bg-indigo-500/25 border border-obsidian-surface text-[9px] font-semibold text-indigo-200 flex items-center justify-center">
              SC
            </span>
            <span className="w-5 h-5 rounded-full bg-emerald-500/25 border border-obsidian-surface text-[9px] font-semibold text-emerald-200 flex items-center justify-center">
              EL
            </span>
            <span className="w-5 h-5 rounded-full bg-violet-500/25 border border-obsidian-surface text-[9px] font-semibold text-violet-200 flex items-center justify-center">
              UK
            </span>
          </div>
          <span className="hidden md:inline h-3 w-px bg-white/10" aria-hidden="true" />
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 motion-reduce:hidden" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="hidden lg:inline text-[10.5px]">3 agents synced</span>
          </span>
        </div>
      </div>

      {/* ── Multi-Column Application Shell (64px Rail + 220px Sidebar + Main Viewport + 340px Drawer) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[64px_220px_1fr] lg:grid-cols-[64px_220px_1fr_340px] min-h-[620px] bg-obsidian-base">
        {/* 1. 64px Workspace Left Rail */}
        <div className="hidden md:flex flex-col items-center py-4 bg-obsidian-base border-r border-obsidian-border-soft gap-4 select-none">
          {/* Active Workspace Squircle */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
            title="Ultrakin Enterprise Workspace"
          >
            <UltrakinLogo size={36} />
          </div>

          <div className="w-8 h-[1px] bg-white/10" />

          {/* Module Quick Switchers with Tactile Active Indicator (Linear/Slack Craftsmanship) */}
          <button
            type="button"
            onClick={() => setActiveModule('chat')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'chat'
                ? 'bg-white/15 text-indigo-400 border border-indigo-400/30 shadow-[0_2px_10px_rgba(99,102,241,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Spaces Chat"
            aria-label="Spaces Chat"
          >
            {activeModule === 'chat' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                aria-hidden="true"
              />
            )}
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('threads')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'threads'
                ? 'bg-white/15 text-indigo-300 border border-indigo-400/30 shadow-[0_2px_10px_rgba(99,102,241,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Threads"
            aria-label="Threads"
          >
            {activeModule === 'threads' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                aria-hidden="true"
              />
            )}
            <AtSign className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('mail')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'mail'
                ? 'bg-white/15 text-sky-400 border border-sky-400/30 shadow-[0_2px_10px_rgba(56,189,248,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Custom Domain Email"
            aria-label="Custom Domain Email"
          >
            {activeModule === 'mail' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"
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
            onClick={() => setActiveModule('docs')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'docs'
                ? 'bg-white/15 text-emerald-400 border border-emerald-400/30 shadow-[0_2px_10px_rgba(52,211,153,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="TipTap Living Docs"
            aria-label="TipTap Living Docs"
          >
            {activeModule === 'docs' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                aria-hidden="true"
              />
            )}
            <FileText className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('files')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'files'
                ? 'bg-white/15 text-indigo-300 border border-indigo-400/30 shadow-[0_2px_10px_rgba(99,102,241,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Files"
            aria-label="Files"
          >
            {activeModule === 'files' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                aria-hidden="true"
              />
            )}
            <FolderOpen className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('huddle')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'huddle'
                ? 'bg-white/15 text-violet-400 border border-violet-400/30 shadow-[0_2px_10px_rgba(167,139,250,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Huddle"
            aria-label="Huddle"
          >
            {activeModule === 'huddle' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
                aria-hidden="true"
              />
            )}
            <Video className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('tasks')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'tasks'
                ? 'bg-white/15 text-amber-400 border border-amber-400/30 shadow-[0_2px_10px_rgba(251,191,36,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Sprint Kanban Board"
            aria-label="Sprint Kanban Board"
          >
            {activeModule === 'tasks' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
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
            onClick={() => setActiveModule('automations')}
            className={cn(
              'relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
              activeModule === 'automations'
                ? 'bg-white/15 text-emerald-400 border border-emerald-400/30 shadow-[0_2px_10px_rgba(52,211,153,0.2)]'
                : 'text-slate-400 hover:text-white hover:bg-white/5',
            )}
            title="Workflow automation"
            aria-label="Workflow automation"
          >
            {activeModule === 'automations' && (
              <span
                className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                aria-hidden="true"
              />
            )}
            <GitBranch className="w-5 h-5" />
          </button>

          <div className="mt-auto flex flex-col items-center gap-3">
            <div
              className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-semibold border border-indigo-500/30"
              title="Sara Chen (Principal Infra Engineer)"
            >
              SC
            </div>
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
        <div className="flex flex-col bg-obsidian-base min-h-[580px] overflow-hidden relative">
          <Suspense fallback={<WorkspaceModuleSkeleton />}>
            {activeModule === 'chat' && <MatrixChatEngine />}
            {activeModule === 'threads' && <HeroThreadsView />}
            {activeModule === 'mail' && <DomainMailboxEngine />}
            {activeModule === 'docs' && <LivingDocEditor />}
            {activeModule === 'files' && <HeroFilesView />}
            {activeModule === 'huddle' && <HuddleSimulator />}
            {activeModule === 'tasks' && <KanbanTaskBoard />}
            {activeModule === 'automations' && <VisualAutomationsCanvas />}
          </Suspense>
        </div>

        {/* 4. 340px Contextual Secondary Drawer: Kernel Telemetry & Ukin Action Engine */}
        <EventBusTelemetryDrawer />
      </div>

      {/* Reactive Telemetry Toast Container */}
      <WorkspaceToastContainer />
    </div>
  );
}
