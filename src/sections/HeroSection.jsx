import React, { lazy, Suspense, useRef, useState, useCallback } from 'react';
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

function HeroWorkflowPreview() {
  const reduceMotion = useReducedMotion();

  /* Animated flowing trace on each connection line */
  const traceMotion = (delay = 0, duration = 4.8) => reduceMotion
    ? { initial: false, animate: { pathLength: 1, opacity: 0.42 } }
    : {
      initial: { pathLength: 0, opacity: 0.12 },
      animate: { pathLength: [0, 1, 0], opacity: [0.12, 0.9, 0.12] },
      transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
    };

  /* Particle dot traveling along each path using strokeDashoffset */
  const particleMotion = (delay = 0, duration = 4.8) => reduceMotion ? {} : {
    initial: { strokeDashoffset: 260, opacity: 0 },
    animate: { strokeDashoffset: [-10, -270], opacity: [0, 1, 1, 0] },
    transition: { duration: duration * 0.7, delay, repeat: Infinity, ease: 'easeInOut', times: [0, 0.1, 0.9, 1] },
  };

  const SIGNAL_PATHS = [
    'M116 75 C139 75 143 105 164 116',
    'M116 119 C138 119 143 128 164 132',
    'M116 164 C138 164 145 151 164 148',
    'M116 208 C140 208 145 170 164 164',
  ];
  const DELAYS = [0, 0.45, 0.9, 1.35];

  return (
    <div className="relative mx-auto h-[310px] w-full max-w-[460px] select-none sm:h-[340px]" aria-hidden="true">

      {/* ── Layered atmospheric glow ── */}
      <div className="absolute inset-x-[4%] top-[8%] h-[84%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(49,86,207,0.14),transparent_68%)] blur-2xl" />
      <div className="absolute left-[30%] top-[20%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)] blur-xl" />

      {/* ── SVG: connection lines + particles ── */}
      <svg viewBox="0 0 440 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <filter id="hero-particle-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="hero-line-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#3156cf" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Static base lines — softer */}
        <g fill="none" stroke="#3156cf" strokeWidth="1.2" strokeLinecap="round">
          {SIGNAL_PATHS.map((d, i) => <path key={i} d={d} opacity=".18" />)}
          <path d="M278 140 C302 140 308 140 329 140" opacity=".22" />
        </g>

        {/* Animated glow traces */}
        <g fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round">
          {SIGNAL_PATHS.map((d, i) => (
            <motion.path key={i} d={d} {...traceMotion(DELAYS[i])} />
          ))}
          <motion.path d="M278 140 C302 140 308 140 329 140" {...traceMotion(2.15, 4.2)} />
        </g>

        {/* Flowing particle dots on each line */}
        {!reduceMotion && SIGNAL_PATHS.map((d, i) => (
          <motion.path
            key={`p-${i}`}
            d={d}
            fill="none"
            stroke="#a5b4fc"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="5 255"
            filter="url(#hero-particle-glow)"
            {...particleMotion(DELAYS[i], 4.8)}
          />
        ))}
        {/* Particle on right connector */}
        {!reduceMotion && (
          <motion.path
            d="M278 140 C302 140 308 140 329 140"
            fill="none" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray="5 60"
            filter="url(#hero-particle-glow)"
            {...particleMotion(2.15, 4.2)}
          />
        )}

        {/* Endpoint dots at each signal row */}
        {[[116,75],[116,119],[116,164],[116,208]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#818cf8" opacity="0.6" />
        ))}
        {/* Endpoint dot at Context card entry */}
        <circle cx="164" cy="130" r="3" fill="#6366f1" opacity="0.9" />
        <motion.circle cx="164" cy="130" r="3" fill="none" stroke="#818cf8" strokeWidth="1"
          animate={reduceMotion ? undefined : { scale: [1, 2.5], opacity: [0.8, 0] }}
          transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '164px 130px' }}
        />
      </svg>

      {/* ── LEFT: Signal rows with cursor-reflection glow ── */}
      <div className="absolute left-0 top-[11%] w-[29%]">
        <p className="mb-2.5 pl-1 text-[9px] font-semibold uppercase tracking-[.16em] text-ink-subtle">Signals</p>
        <div className="space-y-2.5">
          {[
            { label: 'Chat',   icon: MessageSquare, delay: 0 },
            { label: 'Email',  icon: Mail,          delay: .45 },
            { label: 'Huddle', icon: Video,         delay: .9 },
            { label: 'Docs',   icon: FileText,      delay: 1.35 },
          ].map(({ label, icon: Icon, delay }) => (
            <SignalRow key={label} label={label} icon={Icon} delay={delay} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>

      {/* ── CENTER: Context card — dark glass + 3D tilt ── */}
      <HeroTiltCard style={{ position: 'absolute', left: '36%', top: '20%', width: '31%' }} reduceMotion={reduceMotion}>
        <motion.div
          className="overflow-hidden rounded-xl p-3"
          style={{
            background: 'linear-gradient(145deg, #1c2140 0%, #0f1221 70%)',
            border: '1px solid rgba(99,102,241,0.35)',
            boxShadow: '0 20px 44px -28px rgba(49,86,207,0.6), 0 4px 12px rgba(49,86,207,0.2), inset 0 1px 0 rgba(165,180,252,0.12)',
          }}
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-xl bg-gradient-to-b from-white/[0.07] to-transparent" />
          <span className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 rounded-full bg-indigo-500/20 blur-xl" />
          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/25 ring-1 ring-indigo-400/30">
              <Sparkles className="h-3 w-3 text-indigo-300" />
            </span>Context
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-1.5 text-[8px] text-indigo-300/80">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />4 signals connected
            </div>
            <div className="h-px bg-indigo-500/20" />
            <motion.div
              animate={reduceMotion ? undefined : { opacity: [.55, 1, .55] }}
              transition={reduceMotion ? undefined : { duration: 4.8, delay: 1.65, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-center gap-1.5 text-[8px] font-medium text-indigo-300"
            >
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-indigo-500/25">
                <Sparkles className="h-2 w-2 text-indigo-300" />
              </span>AI finds the pattern
            </motion.div>
            <div className="flex gap-1 pt-0.5">
              <motion.span
                className="h-1 rounded-full bg-indigo-400/50"
                animate={reduceMotion ? undefined : { width: ['52%', '72%', '52%'] }}
                transition={reduceMotion ? undefined : { duration: 4.8, delay: 1.65, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '52%' }}
              />
              <span className="h-1 w-[20%] rounded-full bg-indigo-500/70" />
            </div>
          </div>
        </motion.div>
      </HeroTiltCard>

      {/* ── RIGHT: One workspace card — dark glass + 3D tilt ── */}
      <HeroTiltCard style={{ position: 'absolute', right: 0, top: '12%', width: '26%' }} reduceMotion={reduceMotion}>
        <motion.div
          className="overflow-hidden rounded-xl p-2.5"
          style={{
            background: 'linear-gradient(155deg, #181c2e 0%, #0d1020 80%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 20px 42px -28px rgba(0,0,0,0.6), 0 3px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          animate={reduceMotion ? undefined : { y: [0, -2.5, 0] }}
          transition={reduceMotion ? undefined : { duration: 7, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/4 rounded-t-xl bg-gradient-to-b from-white/[0.06] to-transparent" />
          <div className="flex items-center gap-1.5 border-b border-white/[0.08] pb-2">
            <UltrakinLogo size={15} />
            <span className="truncate text-[8px] font-semibold text-white/90">One workspace</span>
          </div>
          <div className="mt-2 space-y-2">
            {[
              { icon: MessageSquare, color: '#818cf8', label: 'Decision thread', sub: '4 replies linked' },
              { icon: FileText,      color: '#34d399', label: 'Launch brief',    sub: 'Updated just now' },
              { icon: CheckSquare,   color: '#fbbf24', label: 'Assign next step', sub: 'Maya · Thu' },
            ].map(({ icon: Icon, color, label, sub }) => (
              <div key={label} className="flex items-start gap-1.5">
                <Icon style={{ color }} className="mt-0.5 h-3 w-3 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate text-[8px] font-medium text-white/80">{label}</p>
                  <p className="text-[7px] text-white/40">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </HeroTiltCard>

      {/* ── BOTTOM: Intelligent follow-through pill — dark glass ── */}
      <motion.div
        className="absolute bottom-[6%] left-[35%] flex items-center gap-1.5 overflow-hidden rounded-full px-2.5 py-1.5 text-[8px] font-medium"
        style={{
          background: 'linear-gradient(135deg, #1a1f35 0%, #0f1221 100%)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 8px 24px -12px rgba(49,86,207,0.4), inset 0 1px 0 rgba(165,180,252,0.08)',
          color: 'rgba(165,180,252,0.9)',
        }}
        animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
        transition={reduceMotion ? undefined : { duration: 5, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span
          animate={reduceMotion ? undefined : { scale: [1, 1.3, 1], opacity: [.65, 1, .65] }}
          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-1.5 w-1.5 rounded-full bg-indigo-400"
        />
        Intelligent follow-through
      </motion.div>
    </div>
  );
}

/* ── SignalRow: per-row cursor-reflection glow ── */
function SignalRow({ label, icon: Icon, delay, reduceMotion }) {
  const ref = useRef(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  }, [reduceMotion]);

  const onLeave = useCallback(() => setGlow(g => ({ ...g, on: false })), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={reduceMotion ? undefined : { opacity: [0.7, 1, 0.7], y: [0, -1, 0] }}
      transition={reduceMotion ? undefined : { duration: 4.8, delay, repeat: Infinity, ease: 'easeInOut' }}
      className="relative flex h-9 cursor-default items-center gap-2 overflow-hidden rounded-lg border border-border/70 bg-surface/95 px-2.5 text-[10px] font-medium text-ink-muted shadow-[0_5px_14px_rgba(20,34,59,.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-shadow hover:border-brand/30 hover:shadow-[0_6px_18px_rgba(49,86,207,0.1)]"
    >
      {glow.on && !reduceMotion && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-lg"
          style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.18) 0%, transparent 55%)` }} />
      )}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-lg bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <Icon className="h-3.5 w-3.5 shrink-0 text-brand-text" />{label}
      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand/60" />
    </motion.div>
  );
}

/* ── HeroTiltCard: 3D magnetic tilt wrapper ── */
function HeroTiltCard({ children, style, reduceMotion, maxTilt = 12 }) {
  const ref = useRef(null);
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ perspective: '700px', perspectiveOrigin: '50% 50%', ...style }}>
      <div style={{
        transform: t.on ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(1.04)` : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transition: t.on ? 'transform 80ms ease-out' : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        transformOrigin: '50% 50%',
        willChange: 'transform',
        position: 'relative',
        borderRadius: 'inherit',
      }}>
        {children}
        {t.on && !reduceMotion && (
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: '12px', pointerEvents: 'none',
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(165,180,252,0.14) 0%, transparent 55%)`,
            mixBlendMode: 'overlay', zIndex: 10,
          }} />
        )}
      </div>
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
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] lg:gap-12 xl:gap-16">
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
              <button
                type="button"
                onClick={openSearchPalette}
                className="group hidden sm:inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface-raised px-4 text-xs font-mono text-ink-muted shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-brand/40 hover:text-ink hover:shadow-[0_4px_12px_rgba(49,86,207,0.08)]"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-text transition-transform group-hover:scale-110" />
                <span>Quick actions</span>
                <kbd className="rounded border border-border bg-surface-soft px-1.5 py-0.5 text-[10px] text-ink-soft">⌘K</kbd>
              </button>
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

          {/* ── Hero Right: Workflow Preview inside Hardware-Accelerated Browser Frame ── */}
          <div className="relative rounded-2xl border border-border/80 bg-surface/50 p-1.5 shadow-[0_24px_54px_-24px_rgba(20,34,59,0.18),0_4px_16px_rgba(20,34,59,0.04)] backdrop-blur-sm">
            <div className="flex h-9 items-center justify-between rounded-t-xl border-b border-border/70 bg-surface-raised px-3.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-2 font-mono text-[10px] text-ink-muted">app.ultrakin.com · workflow engine</span>
              </div>
              <span className="rounded-full border border-brand/20 bg-brand/5 px-2 py-0.5 text-[9px] font-mono text-brand-text">Active context</span>
            </div>
            <div className="relative overflow-hidden rounded-b-xl bg-surface/20 p-2 sm:p-3">
              <HeroWorkflowPreview />
            </div>
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
