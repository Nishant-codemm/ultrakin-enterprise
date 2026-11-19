import React, { useRef, useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion, useSpring } from 'framer-motion';
import {
  Pause,
  Play,
} from 'lucide-react';
import UltrakinLogo from '../primitives/UltrakinLogo';
import { cn } from '../../lib/cn';
import { WORKFLOW_SIGNALS } from '../../data/heroSignals';

/* ── Conduit 1: 4 Curved Bezier Laser Lines connecting Left Signal Buttons to Center Core ── */
export function LaserConduit1({ activeIndex, reduceMotion }) {
  // Coordinates mapped precisely to the 4 button centers at y: 20, 68, 116, 164 -> converging at core entry (32, 92)
  const paths = [
    'M 0 20 C 18 20, 14 92, 32 92',
    'M 0 68 C 18 68, 14 92, 32 92',
    'M 0 116 C 18 116, 14 92, 32 92',
    'M 0 164 C 18 164, 14 92, 32 92',
  ];

  // Ambient staggered parameters for background multi-signal convergence (Siva's feedback: signals from meetings, mail, chat converging simultaneously)
  const ambientPulses = [
    { index: 0, color: '#3b82f6', duration: 1.8, delay: 0.2 },
    { index: 1, color: '#0ea5e9', duration: 2.2, delay: 0.7 },
    { index: 2, color: '#6366f1', duration: 1.6, delay: 0.4 }, // Huddle / Meetings
    { index: 3, color: '#10b981', duration: 2.4, delay: 1.0 }, // Docs
  ];

  return (
    <svg
      viewBox="0 0 32 184"
      className="h-[184px] w-[32px] shrink-0 overflow-visible select-none pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <filter id="conduit-laser-glow-left" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="laser-grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="60%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Inactive & guide paths */}
      {paths.map((d, i) => (
        <path
          key={`base-${i}`}
          d={d}
          fill="none"
          stroke={i === activeIndex ? 'url(#laser-grad-active)' : '#cbd5e1'}
          strokeWidth={i === activeIndex ? 1.8 : 1}
          strokeOpacity={i === activeIndex ? 0.9 : 0.45}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      ))}

      {/* Ambient background signal pulses (Simultaneous convergence from meetings, mail, docs) */}
      {!reduceMotion &&
        ambientPulses.map(({ index, color, duration, delay }) => {
          if (index === activeIndex) return null;
          return (
            <motion.path
              key={`ambient-${index}`}
              d={paths[index]}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeOpacity={0.65}
              strokeLinecap="round"
              strokeDasharray="10 166"
              filter="url(#conduit-laser-glow-left)"
              animate={{ strokeDashoffset: [176, -176] }}
              transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
            />
          );
        })}

      {/* Active laser glow underlay */}
      {paths.map((d, i) => (
        i === activeIndex && (
          <path
            key={`glow-${i}`}
            d={d}
            fill="none"
            stroke="#93c5fd"
            strokeWidth={3.5}
            strokeOpacity={0.4}
            strokeLinecap="round"
            filter="url(#conduit-laser-glow-left)"
          />
        )
      ))}

      {/* Primary focused signal packet on active path */}
      {!reduceMotion && (
        <>
          <motion.path
            key={`photon-outer-${activeIndex}`}
            d={paths[activeIndex]}
            fill="none"
            stroke="#2563eb"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeDasharray="18 158"
            filter="url(#conduit-laser-glow-left)"
            animate={{ strokeDashoffset: [176, -176] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            key={`photon-core-${activeIndex}`}
            d={paths[activeIndex]}
            fill="none"
            stroke="#ffffff"
            strokeWidth={1.4}
            strokeLinecap="round"
            strokeDasharray="8 168"
            animate={{ strokeDashoffset: [176, -176] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Intake convergence aperture at (32, 92) into Ultrakin Core */}
      <circle cx="32" cy="92" r="3.2" fill="#2563eb" />
      <circle cx="32" cy="92" r="6" fill="#2563eb" fillOpacity="0.12" />
      {!reduceMotion && (
        <motion.circle
          cx="32"
          cy="92"
          r="3.2"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.2"
          animate={{ scale: [1, 2.4], opacity: [0.75, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '32px 92px' }}
        />
      )}
    </svg>
  );
}

/* ── Conduit 2: Direct Laser Bridge connecting Center Core to Right Workspace Card ── */
export function LaserConduit2({ reduceMotion }) {
  return (
    <svg
      viewBox="0 0 24 184"
      className="h-[184px] w-[24px] shrink-0 overflow-visible select-none pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <filter id="conduit-laser-glow-right" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="laser-grad-out" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>

      {/* Guide line */}
      <line
        x1="0"
        y1="92"
        x2="24"
        y2="92"
        stroke="url(#laser-grad-out)"
        strokeWidth="1.8"
        strokeOpacity={0.8}
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="92"
        x2="24"
        y2="92"
        stroke="#93c5fd"
        strokeWidth={3.5}
        strokeOpacity={0.3}
        filter="url(#conduit-laser-glow-right)"
      />

      {/* Traveling photon pulse */}
      {!reduceMotion && (
        <>
          <motion.line
            x1="0"
            y1="92"
            x2="24"
            y2="92"
            stroke="#2563eb"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeDasharray="10 22"
            animate={{ strokeDashoffset: [32, -32] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
          />
          <motion.line
            x1="0"
            y1="92"
            x2="24"
            y2="92"
            stroke="#ffffff"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeDasharray="5 27"
            animate={{ strokeDashoffset: [32, -32] }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
          />
        </>
      )}

      {/* Exit & entry junction dots */}
      <circle cx="0" cy="92" r="2.5" fill="#2563eb" />
      <circle cx="24" cy="92" r="2.5" fill="#0ea5e9" />
    </svg>
  );
}

/* ── Center: Light-Mode Enterprise Intelligence Core Card with Official Ultrakin Logo ── */
export function NeuralCoreCard({ activeSignal }) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className="relative flex h-[204px] w-[190px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-3.5 select-none bg-white border border-slate-200/90 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08),0_2px_6px_-1px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
    >
      {/* Specular subtle highlight rim */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-2xl bg-gradient-to-b from-blue-50/50 to-transparent" />

      {/* Header: Official Ultrakin Logo + Telemetry Status */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <UltrakinLogo size={18} />
          <span className="text-[11.5px] font-semibold tracking-tight text-slate-900">Ultrakin Core</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-mono text-emerald-700 font-medium">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span>SYNTHESIZING</span>
        </div>
      </div>

      {/* Middle: Clear Real-World Context & Intent Correlation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSignal.id}
          initial={reduceMotion ? false : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? false : { opacity: 0, y: -3 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-1.5 py-1"
        >
          {/* Dynamic Channel Badge */}
          <div className="flex items-center gap-1.5">
            <span className="rounded px-1.5 py-0.5 text-[9.5px] font-mono font-medium border truncate max-w-[160px] bg-slate-50 border-slate-200 text-slate-700 shadow-2xs">
              {activeSignal.channel}
            </span>
          </div>

          {/* Dynamic Signal Title */}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 leading-snug line-clamp-2">
              {activeSignal.title}
            </p>
          </div>

          {/* Knowledge Graph Correlation String */}
          <div className="rounded-md bg-slate-50 border border-slate-200/80 p-1.5 shadow-2xs">
            <p className="text-[10px] text-slate-600 font-mono leading-tight">
              ⚡ {activeSignal.contextEngine}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Bottom: Progress & Confidence Metrics */}
      <div className="relative z-10 pt-1 border-t border-slate-100">
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
          <span className="text-emerald-700 font-semibold">{activeSignal.confidence} match</span>
          <span className="text-slate-600 font-medium">{activeSignal.latency} latency</span>
        </div>
      </div>
    </div>
  );
}

/* ── Right: Light-Mode Enterprise One Workspace Output Card ── */
export function WorkspaceOutcomeCard({ activeSignal }) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className="relative flex h-[204px] w-[170px] shrink-0 flex-col justify-between overflow-hidden rounded-2xl p-3.5 select-none bg-white border border-slate-200/90 shadow-[0_12px_28px_-8px_rgba(15,23,42,0.08),0_2px_6px_-1px_rgba(15,23,42,0.04),inset_0_1px_0_rgba(255,255,255,1)]"
    >
      {/* Specular subtle highlight rim */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/4 rounded-t-2xl bg-gradient-to-b from-blue-50/40 to-transparent" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5">
          <UltrakinLogo size={14} />
          <span className="truncate text-[11px] font-semibold text-slate-900">One workspace</span>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[9px] font-mono font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{activeSignal.outcomeCount}</span>
        </span>
      </div>

      {/* Dynamic Concrete Deliverable Rows */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSignal.id}
          initial={reduceMotion ? false : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? false : { opacity: 0, y: -3 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-1.5 py-0.5"
        >
          {activeSignal.deliverables.map(({ icon: Icon, color, label, sub, active }) => (
            <div
              key={label}
              className={cn(
                'flex items-start gap-2 rounded-lg px-2 py-1.5 transition-all duration-200',
                active
                  ? 'bg-blue-50/80 border border-blue-200/80 shadow-2xs'
                  : 'opacity-70 hover:opacity-100 hover:bg-slate-50'
              )}
            >
              <Icon style={{ color }} className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate text-[10.5px] font-medium text-slate-800">{label}</p>
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                  )}
                </div>
                <p className="truncate text-[9.5px] text-slate-500 font-mono">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Row */}
      <div className="relative z-10 border-t border-slate-100 pt-1">
        <div className="flex items-center justify-between text-[9px] text-slate-500 font-mono">
          <span>Connected</span>
          <span className="text-blue-700 font-medium">100% in sync</span>
        </div>
      </div>
    </div>
  );
}

/* ── HeroInteractiveStage: 3D Interactive Stage in Celestial Sky Theme ── */
export default function HeroInteractiveStage() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState('chat');
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 280, y: 160 });
  const cardRef = useRef(null);

  // Framer Motion physics springs for butter-smooth physical momentum (calibrated, dignified tilt)
  const springConfig = { stiffness: 140, damping: 24, mass: 0.35 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  // Auto-cycle through signals every 3.6 seconds when not paused/hovered
  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(() => {
      setActiveId((current) => {
        const currentIndex = WORKFLOW_SIGNALS.findIndex((s) => s.id === current);
        const nextIndex = (currentIndex + 1) % WORKFLOW_SIGNALS.length;
        return WORKFLOW_SIGNALS[nextIndex].id;
      });
    }, 3600);
    return () => clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const activeIndex = WORKFLOW_SIGNALS.findIndex((s) => s.id === activeId);
  const activeSignal = WORKFLOW_SIGNALS[activeIndex] || WORKFLOW_SIGNALS[0];

  // Mousemove 3D perspective physics with restrained, premium angles (max ±4 degrees)
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
    rotateX.set(-normY * 5);
    rotateY.set(normX * 5);
    scale.set(1.01);

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
    <div className="relative mx-auto w-full max-w-[580px] lg:max-w-[600px] select-none py-2 flex justify-center frame-perspective-3d">

      {/* Atmospheric Ambient Brand Backglow */}
      <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_center,rgba(49,86,207,0.12),transparent_65%)] blur-2xl" />
      <div className="pointer-events-none absolute left-[28%] top-[12%] h-[75%] w-[45%] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08),transparent_60%)] blur-2xl" />

      {/* Framer Motion 3D Physics Magnetic Card Container */}
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
        {/* Cursor-Following Spotlight Border Glow */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0.45,
            background: isHovered
              ? `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(49,86,207,0.35), rgba(99,102,241,0.18) 40%, transparent 68%)`
              : 'linear-gradient(135deg, rgba(226,232,240,0.85) 0%, rgba(203,213,225,0.6) 50%, rgba(226,232,240,0.85) 100%)',
          }}
        />

        {/* Card Body Container */}
        <div
          className="relative rounded-2xl p-1 shadow-[0_20px_48px_-16px_rgba(15,23,42,0.08),0_4px_16px_-4px_rgba(49,86,207,0.05),inset_0_1px_0_rgba(255,255,255,1)]"
          style={{
            background:
              'linear-gradient(160deg, rgba(255, 255, 255, 0.98) 0%, rgba(246, 250, 254, 0.95) 50%, rgba(240, 246, 253, 0.98) 100%)',
            border: '1px solid rgba(219, 234, 254, 0.75)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Browser Window Header Bar */}
          <div
            className="flex h-9 items-center justify-between rounded-t-xl border-b border-slate-200/70 bg-white/95 px-3 backdrop-blur-md"
            style={{ transform: 'translateZ(14px)' }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400 ring-1 ring-rose-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400 ring-1 ring-amber-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 ring-1 ring-emerald-500/25 transition-transform duration-200 hover:scale-125 cursor-pointer shadow-sm" />
              <div className="ml-2 hidden sm:flex items-center gap-1.5 rounded-md border border-slate-200/80 bg-slate-50/80 px-2 py-0.5 text-[10px] font-mono text-slate-600 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>app.ultrakin.com · workflow engine</span>
              </div>
            </div>

            {/* Right: Active context badge */}
            <div className="flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/[0.07] px-2.5 py-0.5 text-[9.5px] font-mono font-medium text-brand-text shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
              <span>Active context</span>
            </div>
          </div>

          {/* Window Body: Interactive Workflow Pipeline */}
          <div
            className="relative overflow-hidden rounded-b-xl p-3.5 backdrop-blur-sm"
            style={{
              background:
                'linear-gradient(165deg, rgba(255, 255, 255, 0.6) 0%, rgba(241, 246, 254, 0.75) 100%)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Ambient Sheen */}
            {isHovered && !reduceMotion && (
              <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(340px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.16) 0%, rgba(56, 189, 248, 0.05) 40%, transparent 65%)`,
                }}
              />
            )}

            {/* Stage Top Bar: Telemetry Header */}
            <div
              className="relative z-10 mb-2.5 flex items-center justify-between px-1 text-[10px] font-mono uppercase tracking-wider"
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

            {/* 5-Column Precision Pipeline Layout */}
            <div
              className="relative z-10 flex items-center justify-between gap-0 w-full"
              style={{ transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
            >
              {/* Column 1: Left Signals Column (4 Buttons spanning 184px) */}
              <div
                className="flex h-[184px] w-[124px] shrink-0 flex-col justify-between"
                style={{ transform: 'translateZ(10px)' }}
              >
                {WORKFLOW_SIGNALS.map((signal) => {
                  const Icon = signal.icon;
                  const isActive = signal.id === activeId;
                  return (
                    <button
                      key={signal.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(signal.id)}
                      onMouseEnter={() => {
                        setActiveId(signal.id);
                        setIsPaused(true);
                      }}
                      className={cn(
                        'relative flex h-10 w-full items-center gap-2 rounded-xl border px-2.5 text-left transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.985] motion-reduce:active:scale-100',
                        isActive
                          ? 'border-blue-600 bg-white text-blue-700 font-semibold ring-2 ring-blue-500/20 shadow-[0_4px_14px_rgba(37,99,235,0.18),inset_0_1px_0_rgba(255,255,255,1)]'
                          : 'border-sky-200/80 bg-white/90 text-slate-700 hover:border-blue-400 hover:bg-white hover:text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]'
                      )}
                    >
                      <Icon
                        className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isActive && 'scale-110')}
                        style={{ color: isActive ? signal.accentColor : '#64748b' }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold leading-tight">{signal.label}</p>
                        <p className="truncate text-[10px] text-slate-500 font-mono leading-none mt-0.5">{signal.channel}</p>
                      </div>

                      {/* Right-edge diode anchor port */}
                      <span
                        className={cn(
                          'absolute -right-1 h-2.5 w-2.5 rounded-full border border-white transition-all duration-300',
                          isActive
                            ? 'bg-blue-600 shadow-[0_0_8px_#2563eb] scale-125 ring-2 ring-blue-400/50'
                            : 'bg-slate-300 opacity-60'
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Column 2: SVG Laser Conduit 1 (Height 184px, Width 32px) */}
              <div style={{ transform: 'translateZ(16px)' }}>
                <LaserConduit1 activeIndex={activeIndex} reduceMotion={reduceMotion} />
              </div>

              {/* Column 3: Center Neural Core Card (Width 190px) */}
              <div style={{ transform: 'translateZ(28px)' }}>
                <NeuralCoreCard activeSignal={activeSignal} reduceMotion={reduceMotion} />
              </div>

              {/* Column 4: SVG Laser Conduit 2 (Height 184px, Width 24px) */}
              <div style={{ transform: 'translateZ(16px)' }}>
                <LaserConduit2 reduceMotion={reduceMotion} />
              </div>

              {/* Column 5: Right One Workspace Card (Width 170px) */}
              <div style={{ transform: 'translateZ(22px)' }}>
                <WorkspaceOutcomeCard activeSignal={activeSignal} reduceMotion={reduceMotion} />
              </div>
            </div>

            {/* Bottom Status Pill with Pause/Resume Control */}
            <div
              className="relative z-10 mt-3 flex items-center justify-center gap-2"
              style={{ transform: 'translateZ(18px)' }}
            >
              <div className="flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-3.5 py-1 text-[10.5px] font-semibold text-slate-800 shadow-[0_2px_8px_rgba(37,99,235,0.06)] backdrop-blur-sm">
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
