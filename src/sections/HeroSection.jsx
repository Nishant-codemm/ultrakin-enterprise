import React, { lazy, Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import {
  AtSign,
  Bot,
  FolderOpen,
  MessageSquare,
  Mail,
  FileText,
  Video,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Radio,
  CheckCircle2,
  CheckSquare,
  GitBranch,
  ShieldCheck,
} from 'lucide-react';
import Button from '../components/primitives/Button';
import Badge from '../components/primitives/Badge';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { cn } from '../lib/cn';
import { useWorkspace } from '../context/useWorkspace';
import BrowserFrame from '../components/BrowserFrame';
import MatrixChatEngine from '../components/showcase/MatrixChatEngine';
import EventBusTelemetryDrawer from '../components/showcase/EventBusTelemetryDrawer';
import WorkspaceToastContainer from '../components/showcase/WorkspaceToastContainer';

const DomainMailboxEngine = lazy(() => import('../components/showcase/DomainMailboxEngine'));
const LivingDocEditor = lazy(() => import('../components/showcase/LivingDocEditor'));
const HuddleSimulator = lazy(() => import('../components/showcase/HuddleSimulator'));
const KanbanTaskBoard = lazy(() => import('../components/showcase/KanbanTaskBoard'));
const VisualAutomationsCanvas = lazy(() => import('../components/showcase/VisualAutomationsCanvas'));

export function HeroThreadsView() {
  const { activeChannel, activeMessages, channels, setActiveChannel, huddleTranscript, setActiveModule } = useWorkspace();
  const channel = channels.find((item) => item.id === activeChannel) || channels[0];

  return (
    <div className="flex min-h-[580px] flex-col bg-obsidian-canvas text-slate-200">
      <div className="flex min-h-12 items-center justify-between border-b border-obsidian-border bg-obsidian-surface/70 px-4">
        <div className="flex items-center gap-2"><AtSign className="h-4 w-4 text-indigo-300" /><span className="text-sm font-semibold text-white">Threads</span><span className="text-xs text-obsidian-muted">· Workspace context</span></div>
        <span className="text-[10px] text-obsidian-muted">{activeMessages.length + 1} updates</span>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-obsidian-border bg-obsidian-base/70 p-3 md:border-b-0 md:border-r">
          <p className="px-2 py-2 text-[10px] font-mono uppercase tracking-wider text-obsidian-muted">Recent threads</p>
          {channels.map((item) => <button key={item.id} type="button" onClick={() => setActiveChannel(item.id)} aria-current={activeChannel === item.id ? 'page' : undefined} className={cn('mb-1 w-full rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-white/[0.05]', activeChannel === item.id ? 'bg-indigo-500/15 text-indigo-100' : 'text-slate-400')}><span className="block truncate text-xs font-medium">{item.name.replaceAll('-', ' ')}</span><span className="mt-1 block truncate text-[10px] text-obsidian-muted">{item.topic}</span></button>)}
        </aside>
        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3 border-b border-obsidian-border pb-4"><div><p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Connected discussion</p><h2 className="mt-1 text-base font-semibold text-white">#{channel.name}</h2><p className="mt-1 text-xs text-obsidian-muted">{channel.topic}</p></div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2 py-1 text-[9px] text-emerald-200">Context retained</span></div>
          <div className="mt-5 space-y-4">
            {activeMessages.map((message) => <article key={message.id} className="flex gap-3"><span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white', message.avatarBg)}>{message.avatar}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline gap-x-2"><span className="text-xs font-medium text-white">{message.sender}</span><span className="text-[10px] text-obsidian-muted">{message.time}</span></div><p className="mt-1 text-xs leading-5 text-slate-300">{message.text}</p></div></article>)}
            <article className="flex gap-3 rounded-lg border border-violet-400/15 bg-violet-400/[0.04] p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-[10px] font-semibold text-violet-200">UK</span><div><div className="flex items-baseline gap-2"><span className="text-xs font-medium text-white">Ukin connected the Huddle</span><span className="text-[10px] text-obsidian-muted">{huddleTranscript.at(-1)?.time || '10:42 AM'}</span></div><p className="mt-1 text-xs leading-5 text-slate-300">{huddleTranscript.find((entry) => entry.isAgent)?.text || 'A Huddle commitment is linked to this conversation.'}</p></div></article>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-obsidian-border pt-4"><p className="text-[10px] text-obsidian-muted">Messages and meeting commitments stay in one reviewable thread.</p><button type="button" onClick={() => setActiveModule('chat')} className="rounded-md border border-obsidian-border-medium px-3 py-2 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus">Open in Chat <ArrowRight className="ml-1 inline h-3 w-3" /></button></div>
        </div>
      </div>
    </div>
  );
}

export function HeroFilesView() {
  const { setActiveModule, docChecklists, kanbanTasks } = useWorkspace();
  const [selectedFile, setSelectedFile] = useState('RFC-891');
  const files = [
    { id: 'RFC-891', name: 'Launch plan & token refresh notes', type: 'Living Doc', updated: '10:48 AM', owner: 'Alex Mercer', icon: FileText, destination: 'docs' },
    { id: 'PR #1042', name: 'Token cache TTL recovery', type: 'Code review · 14 checks', updated: '10:44 AM', owner: 'Sara Chen', icon: GitBranch, destination: 'tasks' },
    { id: 'Huddle #18', name: 'Architecture sync transcript', type: 'Meeting transcript · 18 min', updated: '10:42 AM', owner: 'Ukin Scribe', icon: Video, destination: 'huddle' },
    { id: 'Sprint 24', name: 'EU cluster recovery checklist', type: `${docChecklists.length} checklist items`, updated: '10:40 AM', owner: kanbanTasks.find((task) => task.id === 'tsk_2')?.assignee || 'Sara Chen', icon: CheckSquare, destination: 'tasks' },
  ];
  const selected = files.find((file) => file.id === selectedFile) || files[0];
  const FileIcon = selected.icon;

  return (
    <div className="flex min-h-[580px] flex-col bg-obsidian-canvas text-slate-200">
      <div className="flex min-h-12 items-center justify-between border-b border-obsidian-border bg-obsidian-surface/70 px-4"><div className="flex items-center gap-2"><FolderOpen className="h-4 w-4 text-indigo-300" /><span className="text-sm font-semibold text-white">Files</span><span className="text-xs text-obsidian-muted">· Acme Platform Team</span></div><span className="text-[10px] text-obsidian-muted">Shared workspace</span></div>
      <div className="grid flex-1 md:grid-cols-[minmax(0,1.15fr)_minmax(240px,.85fr)]">
        <div className="min-w-0 border-b border-obsidian-border p-4 md:border-b-0 md:border-r sm:p-6"><div className="mb-4 grid grid-cols-[minmax(0,1fr)_72px] gap-3 border-b border-obsidian-border px-2 pb-2 text-[9px] font-mono uppercase tracking-wider text-obsidian-muted sm:grid-cols-[minmax(0,1fr)_100px_84px]"><span>Name</span><span>Updated</span><span className="hidden sm:block">Owner</span></div>{files.map((file) => { const Icon = file.icon; return <button key={file.id} type="button" onClick={() => setSelectedFile(file.id)} aria-pressed={selectedFile === file.id} className={cn('grid w-full grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-md border-b border-white/[0.045] px-2 py-3 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus sm:grid-cols-[minmax(0,1fr)_100px_84px]', selectedFile === file.id && 'bg-indigo-400/[0.07]')}><span className="flex min-w-0 items-center gap-2.5"><Icon className="h-4 w-4 shrink-0 text-slate-400" /><span className="min-w-0"><span className="block truncate text-xs font-medium text-slate-200">{file.name}</span><span className="mt-1 block truncate text-[10px] text-obsidian-muted">{file.type}</span></span></span><span className="text-[10px] text-obsidian-muted">{file.updated}</span><span className="hidden truncate text-[10px] text-obsidian-muted sm:block">{file.owner}</span></button>; })}</div>
        <aside className="flex flex-col p-4 sm:p-6"><p className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted">File preview</p><div className="mt-4 rounded-xl border border-obsidian-border bg-obsidian-base p-4"><div className="flex items-center gap-3 border-b border-obsidian-border pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10"><FileIcon className="h-4 w-4 text-indigo-200" /></span><div className="min-w-0"><p className="truncate text-xs font-medium text-white">{selected.name}</p><p className="mt-1 text-[10px] text-obsidian-muted">{selected.type} · {selected.updated}</p></div></div><p className="mt-4 text-xs leading-5 text-slate-400">This workspace item is linked to the EU cluster recovery. Its discussion, decisions, and follow-up remain connected across Ultrakin.</p><div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2 text-[10px] text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />Shared with Acme Platform Team</div></div><button type="button" onClick={() => setActiveModule(selected.destination)} className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-obsidian-border-medium px-3 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus">Open linked {selected.destination === 'huddle' ? 'Huddle' : selected.destination === 'docs' ? 'Doc' : 'Task'} <ArrowRight className="h-3.5 w-3.5" /></button></aside>
      </div>
    </div>
  );
}

const WORKFLOW_SIGNALS = [
  {
    id: 'chat',
    label: 'Chat',
    channel: '#infra-alerts',
    icon: MessageSquare,
    accentColor: '#818cf8',
    glowColor: 'rgba(129, 140, 248, 0.45)',
    pillBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
    title: 'Incident #891: Database failover',
    desc: 'Synthesizing thread into actionable incident log',
    outcomeRow: 0,
    outcomeBadge: 'Live Thread',
  },
  {
    id: 'email',
    label: 'Email',
    channel: 'security@acme.com',
    icon: Mail,
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    pillBg: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
    title: 'Acme SOC-2 review agreement',
    desc: 'Extracting audit obligations & diff requirements',
    outcomeRow: 1,
    outcomeBadge: 'Brief Synced',
  },
  {
    id: 'huddle',
    label: 'Huddle',
    channel: 'Sprint Retro · 18 min',
    icon: Video,
    accentColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.45)',
    pillBg: 'bg-purple-500/15 text-purple-300 border-purple-400/30',
    title: 'Architecture consensus reached',
    desc: 'Mapping commitments to backlog sprint tickets',
    outcomeRow: 2,
    outcomeBadge: 'Tasks Queued',
  },
  {
    id: 'docs',
    label: 'Docs',
    channel: 'RFC-402 Spec v2.4',
    icon: FileText,
    accentColor: '#34d399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    pillBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
    title: 'Token cache TTL approved',
    desc: 'Cross-linking living spec with engineering tasks',
    outcomeRow: 1,
    outcomeBadge: 'Spec Updated',
  },
];

/* ── Conduit 1: 4 Curved Bezier Laser Lines connecting Left Buttons to Center Core ── */
function LaserConduit1({ activeIndex, reduceMotion }) {
  // Height: 168, Width: 36
  // Left button anchor centers: y = [18, 62, 106, 150]
  // Center Card entry center: (36, 84)
  const paths = [
    'M 0 18 C 20 18, 16 84, 36 84',
    'M 0 62 C 20 62, 16 84, 36 84',
    'M 0 106 C 20 106, 16 84, 36 84',
    'M 0 150 C 20 150, 16 84, 36 84',
  ];

  return (
    <svg
      viewBox="0 0 36 168"
      className="h-[168px] w-[36px] shrink-0 overflow-visible select-none pointer-events-none"
    >
      <defs>
        <filter id="conduit-laser-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="laser-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Inactive guide paths */}
      {paths.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          stroke={i === activeIndex ? 'url(#laser-grad-active)' : '#93c5fd'}
          strokeWidth={i === activeIndex ? 2.2 : 1}
          strokeOpacity={i === activeIndex ? 0.95 : 0.35}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      ))}

      {/* Active laser glow underlay */}
      {paths.map((d, i) => (
        i === activeIndex && (
          <path
            key={`glow-${i}`}
            d={d}
            fill="none"
            stroke="#3b82f6"
            strokeWidth={4.5}
            strokeOpacity={0.4}
            strokeLinecap="round"
            filter="url(#conduit-laser-glow)"
          />
        )
      ))}

      {/* Traveling photon beam for active channel */}
      {!reduceMotion && (
        <motion.path
          key={`photon-${activeIndex}`}
          d={paths[activeIndex]}
          fill="none"
          stroke="#ffffff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="14 150"
          filter="url(#conduit-laser-glow)"
          animate={{ strokeDashoffset: [164, -164] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Entry junction node at (36, 84) */}
      <circle cx="36" cy="84" r="3" fill="#2563eb" />
      {!reduceMotion && (
        <motion.circle
          cx="36"
          cy="84"
          r="3"
          fill="none"
          stroke="#60a5fa"
          strokeWidth="1.5"
          animate={{ scale: [1, 2.5], opacity: [0.9, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '36px 84px' }}
        />
      )}
    </svg>
  );
}

/* ── Conduit 2: Direct Laser Bridge connecting Center Core to Right Workspace Card ── */
function LaserConduit2({ reduceMotion }) {
  // Height: 168, Width: 26
  // Bridge from (0, 84) to (26, 84)
  return (
    <svg
      viewBox="0 0 26 168"
      className="h-[168px] w-[26px] shrink-0 overflow-visible select-none pointer-events-none"
    >
      <defs>
        <linearGradient id="laser-grad-out" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Guide line */}
      <line
        x1="0"
        y1="84"
        x2="26"
        y2="84"
        stroke="url(#laser-grad-out)"
        strokeWidth="2.2"
        strokeOpacity="0.85"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="84"
        x2="26"
        y2="84"
        stroke="#3b82f6"
        strokeWidth={4.5}
        strokeOpacity={0.35}
        filter="url(#conduit-laser-glow)"
      />

      {/* Traveling photon pulse */}
      {!reduceMotion && (
        <motion.line
          x1="0"
          y1="84"
          x2="26"
          y2="84"
          stroke="#ffffff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeDasharray="10 26"
          animate={{ strokeDashoffset: [36, -36] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Exit & entry junction dots */}
      <circle cx="0" cy="84" r="2.5" fill="#6366f1" />
      <circle cx="26" cy="84" r="2.5" fill="#0284c7" />
    </svg>
  );
}

/* ── Center: Deep Obsidian Intelligence Core Card ── */
function NeuralCoreCard({ activeSignal, reduceMotion }) {
  return (
    <div
      className="relative flex h-[196px] w-[172px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-3 select-none"
      style={{
        background: 'linear-gradient(155deg, #090e1d 0%, #060914 100%)',
        border: '1px solid rgba(147, 197, 253, 0.35)',
        boxShadow: '0 16px 36px -10px rgba(15, 23, 42, 0.4), 0 0 20px -4px rgba(56, 189, 248, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      }}
    >
      {/* Top specular reflection rim */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.09] to-transparent" />
      <span className="pointer-events-none absolute -left-6 top-1/2 h-16 w-16 rounded-full bg-blue-500/20 blur-xl" />

      {/* Header: Chip badge + telemetry status */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-1.5">
        <div className="flex items-center gap-1.5">
          <span className="flex h-4.5 w-4.5 items-center justify-center rounded-md bg-blue-500/25 ring-1 ring-blue-400/40">
            <Sparkles className="h-2.5 w-2.5 text-cyan-300" />
          </span>
          <span className="text-[9.5px] font-semibold tracking-wide text-white">AI Core</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[7.5px] font-mono text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Middle: Frequency Waveform Equalizer + Dynamic Context */}
      <div className="relative z-10 space-y-1.5 py-0.5">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-end gap-1 h-4">
            {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8].map((scale, idx) => (
              <motion.span
                key={idx}
                className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-cyan-400"
                animate={reduceMotion ? undefined : {
                  height: [5 * scale, 16 * scale, 8 * scale, 18 * scale, 5 * scale],
                }}
                transition={reduceMotion ? undefined : {
                  duration: 1.1 + idx * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ height: 12 * scale }}
              />
            ))}
          </div>
          <span className="text-[7.5px] font-mono uppercase tracking-wider text-slate-400">Streaming</span>
        </div>

        {/* Dynamic Channel Tag */}
        <div className="flex items-center gap-1.5">
          <span className={cn('rounded px-1.5 py-0.5 text-[7.5px] font-mono font-medium border truncate max-w-[140px]', activeSignal.pillBg)}>
            {activeSignal.channel}
          </span>
        </div>

        {/* Dynamic Title & Action (Super crisp high-contrast white text) */}
        <div className="min-w-0">
          <p className="truncate text-[9px] font-semibold text-slate-100 leading-snug">
            {activeSignal.title}
          </p>
          <p className="mt-0.5 truncate text-[7.5px] text-sky-200/90 leading-tight">
            {activeSignal.desc}
          </p>
        </div>
      </div>

      {/* Bottom: Gradient Progress Energy Sweep */}
      <div className="relative z-10">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
            animate={reduceMotion ? undefined : {
              width: ['40%', '85%', '55%', '95%'],
            }}
            transition={reduceMotion ? undefined : {
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ width: '65%' }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-[7px] font-mono text-slate-400">
          <span>Synthesized</span>
          <span className="text-cyan-300 font-medium">12ms latency</span>
        </div>
      </div>
    </div>
  );
}

/* ── Right: Deep Obsidian One Workspace Output Card ── */
function WorkspaceOutcomeCard({ activeSignal }) {
  const rows = [
    { icon: MessageSquare, color: '#818cf8', label: 'Decision thread', sub: '4 replies linked' },
    { icon: FileText,      color: '#34d399', label: 'Living brief',    sub: 'Context synced' },
    { icon: CheckSquare,   color: '#fbbf24', label: 'Assign next step', sub: 'Maya · Ready' },
  ];

  return (
    <div
      className="relative flex h-[196px] w-[146px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-3 select-none"
      style={{
        background: 'linear-gradient(155deg, #0a0f20 0%, #060914 100%)',
        border: '1px solid rgba(255, 255, 255, 0.14)',
        boxShadow: '0 16px 36px -10px rgba(15, 23, 42, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
      }}
    >
      {/* Top specular reflection rim */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/4 rounded-t-2xl bg-gradient-to-b from-white/[0.07] to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/[0.08] pb-1.5">
        <div className="flex items-center gap-1.5">
          <UltrakinLogo size={13} />
          <span className="truncate text-[9px] font-semibold text-white/95">One workspace</span>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-1.5 py-0.5 text-[7.5px] font-mono text-emerald-300">
          3 active
        </span>
      </div>

      {/* Rows */}
      <div className="relative z-10 space-y-1 py-0.5">
        {rows.map(({ icon: Icon, color, label, sub }, idx) => {
          const isHighlighted = activeSignal.outcomeRow === idx;
          return (
            <div
              key={label}
              className={cn(
                'flex items-start gap-1.5 rounded-lg px-1.5 py-1 transition-all duration-300',
                isHighlighted
                  ? 'bg-white/[0.12] ring-1 ring-sky-400/40 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'
                  : 'opacity-70 hover:opacity-100'
              )}
            >
              <Icon style={{ color }} className="mt-0.5 h-3 w-3 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[8px] font-medium text-white/95">{label}</p>
                  {isHighlighted && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>
                <p className="truncate text-[7px] text-white/50">{sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom row */}
      <div className="relative z-10 border-t border-white/[0.06] pt-1">
        <div className="flex items-center justify-between text-[7px] text-white/50">
          <span>Connected</span>
          <span className="font-mono text-sky-300 text-[7.5px] font-medium">100% in sync</span>
        </div>
      </div>
    </div>
  );
}

/* ── HeroInteractiveStage: Next-Level 3D Interactive Stage in Celestial Sky Theme ── */
function HeroInteractiveStage() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState('chat');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 260, y: 150 });
  const cardRef = useRef(null);

  // Framer Motion physics springs for butter-smooth physical momentum
  const springConfig = { stiffness: 150, damping: 20, mass: 0.35 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  // Auto-cycle through signals every 3.2 seconds when not hovered
  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setActiveId((current) => {
        const currentIndex = WORKFLOW_SIGNALS.findIndex((s) => s.id === current);
        const nextIndex = (currentIndex + 1) % WORKFLOW_SIGNALS.length;
        return WORKFLOW_SIGNALS[nextIndex].id;
      });
    }, 3200);
    return () => clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const activeIndex = WORKFLOW_SIGNALS.findIndex((s) => s.id === activeId);
  const activeSignal = WORKFLOW_SIGNALS[activeIndex] || WORKFLOW_SIGNALS[0];

  // Mousemove 3D perspective physics with live spring interpolation
  const handleMouseMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    // Organic spring-driven 3D tilt
    rotateX.set(-normY * 10);
    rotateY.set(normX * 10);
    scale.set(1.02);

    setMousePos({ x, y });
  }, [reduceMotion, rotateX, rotateY, scale]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPaused(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }, [rotateX, rotateY, scale]);

  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:max-w-[580px] select-none py-2 flex justify-center frame-perspective-3d">

      {/* ── Atmospheric Ambient Brand Backglow (Soft & Elegant) ── */}
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(49,86,207,0.11),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute left-[28%] top-[12%] h-[75%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.07),transparent_60%)] blur-2xl" />

      {/* ── Framer Motion 3D Physics Magnetic Card Container ── */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl p-[1px] transition-shadow duration-300"
      >
        {/* Dynamic Cursor-Following Spotlight Border Glow (Senior Frontend Polish: Subtle & Crisp) */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0.4,
            background: isHovered
              ? `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49,86,207,0.32), rgba(99,102,241,0.16) 40%, transparent 68%)`
              : 'linear-gradient(135deg, rgba(226,232,240,0.8) 0%, rgba(203,213,225,0.5) 50%, rgba(226,232,240,0.8) 100%)',
          }}
        />

        {/* Card Body Container: Luminous Pearl-Sky Frosted Surface */}
        <div
          className="relative rounded-2xl p-1 shadow-[0_20px_48px_-16px_rgba(15,23,42,0.08),0_4px_16px_-4px_rgba(49,86,207,0.05),inset_0_1px_0_rgba(255,255,255,1)]"
          style={{
            background: 'linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 254, 0.95) 50%, rgba(240, 246, 253, 0.98) 100%)',
            border: '1px solid rgba(219, 234, 254, 0.75)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* ── Browser Window Header Bar (Crisp Frosted Pearl-Sky) ── */}
          <div
            className="flex h-9 items-center justify-between rounded-t-xl border-b border-slate-200/70 bg-white/95 px-3 backdrop-blur-md"
            style={{ transform: 'translateZ(14px)' }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400 ring-1 ring-rose-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-1 ring-amber-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1 ring-emerald-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <div className="ml-2 hidden sm:flex items-center gap-1.5 rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 text-[9.5px] font-mono text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>app.ultrakin.com · workflow engine</span>
              </div>
            </div>

            {/* Right: Active context badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/[0.07] px-2.5 py-0.5 text-[9px] font-mono font-medium text-brand-text shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              <span>Active context</span>
            </div>
          </div>

          {/* ── Window Body: Interactive Workflow Pipeline ── */}
          <div
            className="relative overflow-hidden rounded-b-xl p-3 backdrop-blur-sm"
            style={{
              background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.6) 0%, rgba(241, 246, 254, 0.75) 100%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Subtle, Organic Ambient Sheen (Low opacity: whisper of light, no harsh glare or washout) */}
            {isHovered && !reduceMotion && (
              <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.14) 0%, rgba(56, 189, 248, 0.04) 40%, transparent 65%)`,
                }}
              />
            )}

            {/* Stage Top Bar: Telemetry Header (High-contrast dark slate text) */}
            <div
              className="relative z-10 mb-2.5 flex items-center justify-between px-1 text-[9px] font-mono uppercase tracking-wider"
              style={{ transform: 'translateZ(12px)' }}
            >
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                <span>Signals Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Relay active</span>
                <span className="text-sky-300">·</span>
                <span className="font-semibold text-blue-700">4 sources synced</span>
              </div>
            </div>

            {/* 5-Column Precision Pipeline Layout with Z-depth Parallax */}
            <div
              className="relative z-10 flex items-center justify-between gap-0 w-full"
              style={{ transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >

              {/* Column 1: Left Signals Column (4 Buttons spanning 168px) */}
              <div
                className="flex h-[168px] w-[102px] shrink-0 flex-col justify-between"
                style={{ transform: 'translateZ(10px)' }}
              >
                {WORKFLOW_SIGNALS.map((signal) => {
                  const Icon = signal.icon;
                  const isActive = signal.id === activeId;
                  return (
                    <button
                      key={signal.id}
                      type="button"
                      onClick={() => setActiveId(signal.id)}
                      onMouseEnter={() => {
                        setActiveId(signal.id);
                        setIsPaused(true);
                      }}
                      className={cn(
                        'relative flex h-9 w-full items-center gap-1.5 rounded-xl border px-2 text-left transition-all duration-200 cursor-pointer shadow-sm',
                        isActive
                          ? 'border-blue-600 bg-white text-blue-700 font-semibold ring-2 ring-blue-500/20 shadow-[0_4px_14px_rgba(37,99,235,0.18)]'
                          : 'border-sky-200/80 bg-white/90 text-slate-700 hover:border-blue-400 hover:bg-white hover:text-slate-900'
                      )}
                    >
                      <Icon
                        className={cn('h-3.5 w-3.5 shrink-0 transition-transform duration-200', isActive && 'scale-110')}
                        style={{ color: isActive ? signal.accentColor : '#64748b' }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9.5px] leading-none">{signal.label}</p>
                      </div>

                      {/* Right-edge diode anchor port */}
                      <span
                        className={cn(
                          'absolute -right-1 h-2 w-2 rounded-full border border-white transition-all duration-300',
                          isActive
                            ? 'bg-blue-600 shadow-[0_0_8px_#2563eb] scale-125 ring-2 ring-blue-400/50'
                            : 'bg-slate-300 opacity-60'
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Column 2: SVG Laser Conduit 1 (Height 168px, Width 36px) */}
              <div style={{ transform: 'translateZ(16px)' }}>
                <LaserConduit1 activeIndex={activeIndex} reduceMotion={reduceMotion} />
              </div>

              {/* Column 3: Center Neural Core Card (Width 172px) */}
              <div style={{ transform: 'translateZ(28px)' }}>
                <NeuralCoreCard activeSignal={activeSignal} reduceMotion={reduceMotion} />
              </div>

              {/* Column 4: SVG Laser Conduit 2 (Height 168px, Width 26px) */}
              <div style={{ transform: 'translateZ(16px)' }}>
                <LaserConduit2 reduceMotion={reduceMotion} />
              </div>

              {/* Column 5: Right One Workspace Card (Width 146px) */}
              <div style={{ transform: 'translateZ(22px)' }}>
                <WorkspaceOutcomeCard activeSignal={activeSignal} />
              </div>

            </div>

            {/* ── Bottom Telemetry Status Pill (Crisp high-contrast white glass) ── */}
            <div
              className="relative z-10 mt-3 flex items-center justify-center"
              style={{ transform: 'translateZ(18px)' }}
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-3 py-1 text-[8.5px] font-semibold text-slate-800 shadow-[0_2px_8px_rgba(37,99,235,0.06)] backdrop-blur-sm">
                <span className="flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>Autonomous context mesh active</span>
                <span className="text-sky-300">·</span>
                <span className="font-mono text-slate-500 font-normal">Zero context loss across 4 apps</span>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HeroWorkspaceContent() {
  const {
    activeModule,
    setActiveModule,
    activeChannel,
    setActiveChannel,
    channels,
    emails,
    kanbanTasks,
    openSearchPalette,
  } = useWorkspace();

  const unreadEmailCount = emails.filter((e) => e.unread).length;
  const showcaseBounds = useRef(null);
  const rotateX = useSpring(0, { stiffness: 120, damping: 22, mass: 0.45 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 22, mass: 0.45 });
  const spotlightX = useSpring(0, { stiffness: 90, damping: 24, mass: 0.5 });
  const spotlightY = useSpring(0, { stiffness: 90, damping: 24, mass: 0.5 });

  const handleShowcasePointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleShowcasePointerLeave();
      return;
    }
    showcaseBounds.current = event.currentTarget.getBoundingClientRect();
  };

  const handleShowcasePointerMove = (event) => {
    const bounds = showcaseBounds.current;
    if (!bounds || event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleShowcasePointerLeave();
      return;
    }
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(y * -0.7);
    rotateY.set(x * 1.1);
    spotlightX.set(x * bounds.width * 0.3);
    spotlightY.set(y * bounds.height * 0.3);
  };

  const handleShowcasePointerLeave = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    showcaseBounds.current = null;
    if (reduceMotion) {
      rotateX.jump(0);
      rotateY.jump(0);
      spotlightX.jump(0);
      spotlightY.jump(0);
      return;
    }
    rotateX.set(0);
    rotateY.set(0);
    spotlightX.set(0);
    spotlightY.set(0);
  };

  return (
    <>
    <section id="hero" className="relative overflow-hidden bg-page pt-28 pb-16 text-ink md:pt-36 md:pb-20">

      {/* ── Atmospheric depth layers ── */}
      {/* Primary brand glow — upper right */}
      <div
        className="pointer-events-none absolute -top-32 right-[-12%] h-[640px] w-[860px] rounded-full opacity-60 blur-[140px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(49,86,207,0.09) 0%, rgba(99,102,241,0.07) 30%, rgba(169,155,132,0.05) 60%, transparent 80%)' }}
      />
      {/* Secondary warm glow — lower left */}
      <div
        className="pointer-events-none absolute bottom-0 left-[-8%] h-[400px] w-[500px] rounded-full opacity-40 blur-[120px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(49,86,207,0.06) 0%, transparent 70%)' }}
      />
      {/* Subtle dot grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Top edge hairline glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1.08fr)] lg:gap-8 xl:gap-12">
          <div className="max-w-[700px]">

            {/* ── Badge ── */}
            <motion.div
              className="mb-6"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge
                variant="indigo"
                size="md"
                dot
                className="max-w-full flex-wrap gap-y-1 border-brand/20 bg-brand/[0.07] px-3 py-1 text-[11px] shadow-[0_2px_8px_rgba(49,86,207,0.12)] sm:text-xs"
              >
                <span className="font-semibold tracking-wider text-brand-text">ULTRAKIN</span>
                <span className="mx-1.5 text-ink-subtle/40">|</span>
                <span className="font-normal text-ink-muted">People, tools, and agents in one app</span>
              </Badge>
            </motion.div>

            {/* ── Headline ── */}
            <h1 className="max-w-[680px] font-display text-[clamp(3rem,5.5vw,5rem)] font-normal leading-[1.03] tracking-[-0.035em] text-ink">
              <span className="block">The autonomous</span>
              <span className="block">workspace for</span>
              <span
                className="block bg-clip-text text-transparent italic"
                style={{ backgroundImage: 'linear-gradient(105deg, #3156cf 0%, #6366f1 40%, #818cf8 75%, #4f7bd9 100%)' }}
              >
                fast teams.
              </span>
            </h1>

            {/* ── Subheadline ── */}
            <p className="mt-5 max-w-[540px] text-[17px] leading-7 tracking-[-0.01em] text-ink-muted sm:text-[18px]">
              Chat, mail, docs, huddles, and tasks—connected by agents that carry context into what happens next.
            </p>

            {/* ── CTA Buttons + ⌘K Command Palette ── */}
            <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="w-full sm:w-auto text-[15px] px-7 h-12 shadow-[0_6px_20px_rgba(49,86,207,0.32),0_2px_8px_rgba(49,86,207,0.18)] hover:shadow-[0_8px_24px_rgba(49,86,207,0.45)] transition-shadow"
                onClick={() => window.open('https://app.ultrakin.com/auth', '_blank', 'noopener,noreferrer')}
              >
                Start free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-[15px] px-6 h-12"
                iconRight={ArrowRight}
                onClick={() => document.getElementById('workspace-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See how it works
              </Button>
            </div>

            {/* ── Trust badges ── */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-ink-subtle select-none">
              {[
                'SOC 2 Type II',
                'GDPR-ready',
                'SSO / SAML',
                '99.9% uptime SLA',
              ].map((label, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />}
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-text" />
                    <span>{label}</span>
                  </span>
                </React.Fragment>
              ))}
            </div>

          </div>

          {/* ── Hero Right: Next-Level 3D Interactive Workflow Stage ── */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroInteractiveStage />
          </div>
        </div>
      </div>
    </section>

    <section id="workspace-showcase" className="relative border-t border-border bg-page py-20 text-ink md:py-28">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.045em] text-ink">Everything in one workspace</h2>
        </header>
        {/* =========================================================================
            100% PURE-CODE INTERACTIVE APPLICATION FRAME (Zero External Video Files)
           ========================================================================= */}
        <motion.div
          className="relative"
          style={{ perspective: '1400px', rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onPointerEnter={handleShowcasePointerEnter}
          onPointerMove={handleShowcasePointerMove}
          onPointerLeave={handleShowcasePointerLeave}
        >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(105,123,164,.12),rgba(169,155,132,.06)_35%,transparent_70%)] opacity-70 md:block"
          style={{ x: spotlightX, y: spotlightY, marginLeft: '-14rem', marginTop: '-14rem' }}
        />
        <BrowserFrame address={`app.ultrakin.com/workspace/acme-eng${activeModule === 'chat' ? `#${activeChannel}` : `/${activeModule}`}`} className="relative z-10 mt-8">
        <div className="relative" style={{ perspective: '1400px' }}>
          {/* Dynamic Ambient Backglow matching active module */}
          <div
            className={cn(
              'pointer-events-none absolute -inset-4 sm:-inset-8 rounded-3xl blur-3xl opacity-35 transition-all duration-700 -z-10',
              activeModule === 'chat' && 'bg-gradient-to-b from-indigo-500/30 via-indigo-600/10 to-transparent',
              activeModule === 'mail' && 'bg-gradient-to-b from-sky-500/30 via-sky-600/10 to-transparent',
              activeModule === 'docs' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent',
              activeModule === 'huddle' && 'bg-gradient-to-b from-violet-500/30 via-violet-600/10 to-transparent',
              activeModule === 'tasks' && 'bg-gradient-to-b from-amber-500/30 via-amber-600/10 to-transparent',
              activeModule === 'automations' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent'
            )}
          />

          <div
            className="relative overflow-hidden bg-obsidian-canvas transition-transform duration-700 ease-out hover:rotate-x-0 group/showcase"
            style={{
              transform: 'rotateX(0.7deg) translateZ(0)',
              transformStyle: 'preserve-3d',
              boxShadow:
                '0 18px 48px -36px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Specular Screen Glass Reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-44 z-20 opacity-[0.16] select-none overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 100%)',
              }}
            />

            {/* Window Chrome Title Bar */}
            <div className="h-11 px-4 bg-obsidian-surface/90 border-b border-obsidian-border flex items-center justify-between select-none relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    app.ultrakin.com/workspace/acme-eng
                    {activeModule === 'chat' ? `#${activeChannel}` : `/${activeModule}`}
                  </span>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 motion-reduce:hidden" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="hidden md:inline">Workspace active</span>
                </span>
              </div>
            </div>

            {/* Application Workspace Shell (64px Rail + 220px Sidebar + Main Viewport + 340px Drawer) */}
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

                {/* Module Quick Switchers */}
                <button
                  type="button"
                  onClick={() => setActiveModule('chat')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'chat'
                      ? 'bg-white/15 text-indigo-400 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Spaces Chat"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>

                <button type="button" onClick={() => setActiveModule('threads')} className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer', activeModule === 'threads' ? 'bg-white/15 text-indigo-300 border border-indigo-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5')} title="Threads" aria-label="Threads">
                  <AtSign className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('mail')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'mail'
                      ? 'bg-white/15 text-sky-400 border border-sky-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Custom Domain Email"
                >
                  <Mail className="w-5 h-5" />
                  {unreadEmailCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('docs')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'docs'
                      ? 'bg-white/15 text-emerald-400 border border-emerald-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="TipTap Living Docs"
                >
                  <FileText className="w-5 h-5" />
                </button>

                <button type="button" onClick={() => setActiveModule('files')} className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer', activeModule === 'files' ? 'bg-white/15 text-indigo-300 border border-indigo-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5')} title="Files" aria-label="Files">
                  <FolderOpen className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('huddle')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'huddle'
                      ? 'bg-white/15 text-violet-400 border border-violet-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Huddle"
                >
                  <Video className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('tasks')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'tasks'
                      ? 'bg-white/15 text-amber-400 border border-amber-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Sprint Kanban Board"
                >
                  <CheckSquare className="w-5 h-5" />
                  {kanbanTasks.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('automations')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'automations'
                      ? 'bg-white/15 text-emerald-400 border border-emerald-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Workflow automation"
                >
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
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        )}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className={isSelected ? 'text-indigo-400' : 'text-obsidian-muted'}>#</span>
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

                <button type="button" onClick={() => setActiveModule('threads')} className={cn('mt-3 w-full flex items-center gap-2 px-2.5 py-2 rounded-md font-medium text-left transition-colors cursor-pointer', activeModule === 'threads' ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5')}>
                  <AtSign className="h-3.5 w-3.5" /> Threads <span className="ml-auto text-[10px] text-obsidian-muted">3</span>
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
                        : 'bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/15'
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
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    )}
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">Q4 EU Cluster RFC</span>
                  </button>
                  <button type="button" onClick={() => setActiveModule('files')} className={cn('w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer', activeModule === 'files' ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5')}>
                    <FolderOpen className="w-3.5 h-3.5 shrink-0 text-slate-400" /><span className="truncate">Files</span><span className="ml-auto text-[10px] text-obsidian-muted">4</span>
                  </button>
                </div>

                {/* Kanban Tasks Navigation */}
                <div className="mt-3 pt-3 border-t border-obsidian-border-soft space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-obsidian-muted flex items-center justify-between">
                    <span>Tasks</span>
                    <span className="text-[10px] text-amber-400 font-bold font-mono">{kanbanTasks.length}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('tasks')}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                      activeModule === 'tasks'
                        ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
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
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
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
                        : 'text-slate-400 hover:bg-white/5'
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

              {/* 3. Main Multi-Mode Interactive Canvas (Sprint Week 2-6 Engines) */}
              <div className="flex flex-col bg-obsidian-base min-h-[580px] overflow-hidden relative">
                <Suspense fallback={<div className="flex min-h-[580px] items-center justify-center text-xs text-slate-500" role="status">Opening workspace view…</div>}>
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
        </div>
        </BrowserFrame>
        </motion.div>

      </div>
    </section>
    </>
  );
}

export default function HeroSection() {
  return <HeroWorkspaceContent />;
}
