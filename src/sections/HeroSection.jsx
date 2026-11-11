import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import {
  MessageSquare,
  Mail,
  FileText,
  Video,
  ArrowRight,
  Sparkles,
  CheckSquare,
  Pause,
  Play,
  ShieldCheck,
} from 'lucide-react';
import Button from '../components/primitives/Button';
import Badge from '../components/primitives/Badge';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { cn } from '../lib/cn';
import { useWorkspace } from '../context/useWorkspace';
import { navigate } from '../lib/navigate';
import BrowserFrame from '../components/BrowserFrame';
import WorkspaceShell from '../components/showcase/WorkspaceShell';
import HeroThreadsView from '../components/showcase/HeroThreadsView';
import HeroFilesView from '../components/showcase/HeroFilesView';

export { HeroThreadsView, HeroFilesView };

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
        <filter id="conduit-laser-glow-left" x="-50%" y="-50%" width="200%" height="200%">
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
            filter="url(#conduit-laser-glow-left)"
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
          filter="url(#conduit-laser-glow-left)"
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
        <filter id="conduit-laser-glow-right" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
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
        filter="url(#conduit-laser-glow-right)"
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
                className="flex h-[168px] w-[116px] shrink-0 flex-col justify-between"
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
                        <p className="truncate text-[10.5px] font-semibold leading-tight">{signal.label}</p>
                        <p className="truncate text-[9.5px] text-slate-500 font-mono leading-none mt-0.5">{signal.channel}</p>
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

            {/* ── Bottom Telemetry Status Pill with Pause/Resume Control (M-07) ── */}
            <div
              className="relative z-10 mt-3 flex items-center justify-center gap-2"
              style={{ transform: 'translateZ(18px)' }}
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-3 py-1 text-[10px] font-semibold text-slate-800 shadow-[0_2px_8px_rgba(37,99,235,0.06)] backdrop-blur-sm">
                <span className="flex h-2 w-2 items-center justify-center">
                  <span className="absolute h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                <span>Autonomous context mesh active</span>
                <span className="text-sky-300">·</span>
                <span className="font-mono text-slate-500 font-normal">Zero context loss across 4 apps</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? 'Resume workflow animation' : 'Pause workflow animation'}
                className="flex items-center gap-1 rounded-full border border-sky-200/90 bg-white/95 px-2.5 py-1 text-[10px] font-mono font-medium text-slate-700 hover:text-slate-900 transition-colors shadow-[0_2px_8px_rgba(37,99,235,0.06)] cursor-pointer"
              >
                {isPaused ? <Play className="h-2.5 w-2.5 text-blue-600" aria-hidden="true" /> : <Pause className="h-2.5 w-2.5 text-slate-500" aria-hidden="true" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
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
    activeChannel,
  } = useWorkspace();

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
    <section id="hero" className="relative overflow-hidden bg-transparent pt-28 pb-16 text-ink md:pt-36 md:pb-20">

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
          backgroundSize: '32px 32px',
        }}
      />
      {/* Top edge hairline glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1.08fr)] lg:gap-8 xl:gap-12">
          <div className="max-w-[700px]">

            {/* ── Badge ── */}
            <motion.div
              className="mb-5"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge
                variant="indigo"
                size="md"
                dot
                className="max-w-full flex-wrap gap-y-1 border-brand/20 bg-brand/[0.07] px-3 py-1 text-[11px] shadow-[0_2px_8px_rgba(49,86,207,0.12)]"
              >
                <span className="font-semibold tracking-wider text-brand-text">ULTRAKIN</span>
                <span className="mx-1.5 text-ink-subtle/40">|</span>
                <span className="font-normal text-ink-muted">People, tools, and agents in one app</span>
              </Badge>
            </motion.div>

            {/* ── Headline ── */}
            <h1 className="max-w-[680px] font-display text-[clamp(3rem,5.5vw,5rem)] font-normal leading-[1.04] tracking-[-0.035em] text-ink">
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
            <p className="mt-5 max-w-[560px] text-[17px] leading-7 tracking-[-0.005em] text-ink-muted sm:text-[18px]">
              Chat, mail, docs, huddles, and tasks—connected by agents that carry context into what happens next.
            </p>

            {/* ── CTA Buttons + ⌘K Command Palette ── */}
            <div className="mt-7 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="w-full sm:w-auto text-[15px] px-7 h-12 hover:shadow-[0_8px_24px_rgba(49,86,207,0.45)] transition-shadow"
                onClick={() => navigate('/workspace')}
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
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-ink-subtle select-none">
              {[
                'SOC 2 Type II',
                'Zero-Retention AI',
                'SAML 2.0 / SCIM',
                '99.99% uptime SLA',
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

    <section id="workspace-showcase" className="divider-hairline relative bg-transparent py-20 text-ink md:py-28">
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

          <WorkspaceShell />
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