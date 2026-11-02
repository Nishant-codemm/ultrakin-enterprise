import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckSquare,
  FileText,
  MessageSquareText,
  Plus,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/cn';
import BrowserFrame from '../components/BrowserFrame';
import { useReveal } from '../lib/useReveal';

const SIGNAL = {
  source: '#release-planning', icon: MessageSquareText,
  by: 'Maya Chen', initials: 'MC', time: '10:42',
  message: 'Can someone own the SSO timeout before Thursday\u2019s rollout? The EU tenant is still seeing retries.',
  context: 'SSO rollout checklist', action: 'Trace EU tenant retry spikes', owner: 'Maya Chen', due: 'Thursday',
};

/* ─── Cursor-tracking 3D tilt for any card ─── */
function TiltCard({ children, className, maxTilt = 10, style }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left)  / r.width  - 0.5;
    const dy = (e.clientY - r.top)   / r.height - 0.5;
    setTilt({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%', ...style }}
    >
      <div
        style={{
          transform: tilt.on
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.018)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: tilt.on ? 'transform 90ms ease-out' : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          transformOrigin: '50% 50%',
          willChange: 'transform',
          position: 'relative',
          borderRadius: 'inherit',
        }}
      >
        {children}
        {tilt.on && !reduceMotion && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(165,180,252,0.1) 0%, transparent 60%)`,
              mixBlendMode: 'screen',
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Precision SVG Flow Connector ─── */
function FlowConnector({ reduceMotion, activePulse = false }) {
  const MAIN  = 'M1 15 C 18 15, 20 15, 36 15 S 52 15, 71 15';
  const GUIDE = 'M1 17.5 C 18 17.5, 20 17.5, 36 17.5 S 52 17.5, 71 17.5';

  return (
    <div className="relative hidden h-14 items-center justify-center sm:flex" aria-hidden="true">
      <svg viewBox="0 0 72 30" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="wf-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="wf-flow-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#a5b4fc" stopOpacity="0" />
            <stop offset="35%"  stopColor="#818cf8" stopOpacity={activePulse ? 0.95 : 0.85} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Companion guide — ultra-thin */}
        <path d={GUIDE} fill="none" stroke="rgba(165,180,252,0.07)" strokeWidth="0.55" strokeDasharray="2 5" />

        {/* Base dashed track */}
        <path d={MAIN} fill="none" stroke={activePulse ? 'rgba(165,180,252,0.32)' : 'rgba(165,180,252,0.18)'} strokeWidth="0.85" strokeDasharray="2.5 4" />

        {/* Ambient glow */}
        <path d={MAIN} fill="none" stroke="url(#wf-flow-grad)" strokeWidth={activePulse ? 2.5 : 2} opacity={activePulse ? 0.35 : 0.18} />

        {/* Particle 1 — primary signal bead */}
        {!reduceMotion && (
          <motion.path
            d={MAIN}
            fill="none"
            stroke="#818cf8"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeDasharray="7 65"
            filter="url(#wf-dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.3, ease: 'linear', repeat: Infinity, repeatDelay: 0.5 }}
          />
        )}

        {/* Particle 2 — trailing echo */}
        {!reduceMotion && (
          <motion.path
            d={MAIN}
            fill="none"
            stroke="#c7d2fe"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeDasharray="4 68"
            filter="url(#wf-dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.3, ease: 'linear', repeat: Infinity, repeatDelay: 0.5, delay: 0.62 }}
          />
        )}

        {/* Center converge point */}
        <circle cx="36" cy="15" r="3.2" fill="#3156cf" />
        <circle cx="36" cy="15" r="6.5" fill="#3156cf" fillOpacity="0.1" />
        {!reduceMotion && (
          <motion.circle
            cx="36" cy="15" r="3.2"
            fill="none"
            stroke="#818cf8"
            strokeWidth="0.8"
            initial={{ scale: 1, opacity: 0.65 }}
            animate={{ scale: 3.0, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '36px 15px' }}
          />
        )}

        {/* Entry + exit anchor dots */}
        <circle cx="2"  cy="15" r="1.8" fill="rgba(165,180,252,0.4)" />
        <circle cx="70" cy="15" r="1.8" fill="rgba(165,180,252,0.4)" />
      </svg>
    </div>
  );
}

/* ─── Workflow narrative stage strip ─── */
const WORKFLOW_STAGES = [
  { id: 'signal',   label: 'Signal',   icon: MessageSquareText, color: '#818cf8' },
  { id: 'context',  label: 'Context',  icon: FileText,          color: '#a5b4fc' },
  { id: 'agent',    label: 'Agent',    icon: Sparkles,          color: '#c4b5fd' },
  { id: 'decision', label: 'Decision', icon: Zap,               color: '#818cf8' },
  { id: 'task',     label: 'Task',     icon: CheckSquare,       color: '#6ee7b7' },
  { id: 'outcome',  label: 'Outcome',  icon: Check,             color: '#34d399' },
];

/* ─── Stage arrow connector — SVG precision ─── */
function StageArrow({ active }) {
  return (
    <div className="relative hidden h-4 w-5 shrink-0 items-center justify-center sm:flex" aria-hidden="true">
      <svg viewBox="0 0 20 8" className="h-full w-full overflow-visible">
        <path
          d="M0 4 L16 4"
          fill="none"
          stroke={active ? 'rgba(165,180,252,0.65)' : 'rgba(165,180,252,0.2)'}
          strokeWidth="0.75"
          strokeDasharray={active ? 'none' : '2 3'}
          className="transition-all duration-300"
        />
        <polygon
          points="16,1.5 20,4 16,6.5"
          fill={active ? 'rgba(165,180,252,0.65)' : 'rgba(165,180,252,0.2)'}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}

/* ─── Stage interactive pill button ─── */
function StagePill({ stage, isActive, isSelected, onClick }) {
  const Icon = stage.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9.5px] font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
        isSelected
          ? 'bg-brand text-white shadow-[0_2px_8px_rgba(49,86,207,0.3)] ring-1 ring-brand'
          : isActive
          ? 'bg-brand/[0.08] text-brand-text ring-1 ring-brand/15 hover:bg-brand/[0.12]'
          : 'text-ink-muted hover:text-ink hover:bg-surface-hover',
      )}
      aria-current={isSelected ? 'step' : undefined}
    >
      <Icon
        className="h-3 w-3 shrink-0"
        style={{ color: isSelected ? '#ffffff' : isActive ? stage.color : undefined }}
        aria-hidden="true"
      />
      {stage.label}
    </button>
  );
}

export default function WorkflowSpotlight() {
  const [created, setCreated] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const reduceMotion = useReducedMotion();
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const signal = SIGNAL;
  const SignalIcon = signal.icon;

  // Compute active stage index: user selection takes priority, otherwise follows task creation state
  const activeStageIdx = selectedStage !== null ? selectedStage : (created ? 4 : 0);

  const handleStageSelect = (idx) => {
    setSelectedStage(idx);
    if (idx >= 4) {
      setCreated(true);
    } else if (idx === 0) {
      setCreated(false);
    }
  };

  return (
    <section ref={sectionRef} id="workflows" className="relative overflow-hidden bg-transparent py-20 text-ink md:py-28">

      {/* Section hairline — visual continuity */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/12 to-transparent" />

      {/* Ambient background depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8rem] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-8">

        {/* ── Left: Copy + workflow strip ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg"
        >
          <p className="mb-6 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle">
            <span className="h-px w-7 bg-brand" /> THE WORK, IN CONTEXT
          </p>
          <h2 className="font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
            A signal comes in.
            <span className="mt-1 block font-display italic text-brand-text">The work moves on.</span>
          </h2>

          {/* ── Workflow stage pipeline ── */}
          <div className="mt-10 border-t border-border pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-subtle">
                One workflow · signal to outcome
              </p>
              <span className="text-[9px] font-mono text-ink-subtle hidden sm:inline">
                Click any step to scrub
              </span>
            </div>
            <div
              role="list"
              aria-label="Workflow stages: Signal to Outcome"
              className="flex flex-wrap items-center gap-y-2"
            >
              {WORKFLOW_STAGES.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <div role="listitem">
                    <StagePill
                      stage={stage}
                      isActive={i <= activeStageIdx}
                      isSelected={i === activeStageIdx}
                      onClick={() => handleStageSelect(i)}
                    />
                  </div>
                  {i < WORKFLOW_STAGES.length - 1 && (
                    <StageArrow active={i < activeStageIdx} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Context thread legend */}
            <div className="mt-6 flex items-center gap-3">
              <svg width="28" height="8" viewBox="0 0 28 8" className="shrink-0 overflow-visible" aria-hidden="true">
                <path d="M0 4 L24 4" fill="none" stroke="rgba(129,140,248,0.45)" strokeWidth="0.7" strokeDasharray="2 3" />
                <circle cx="2"  cy="4" r="1.5" fill="rgba(129,140,248,0.65)" />
                <circle cx="24" cy="4" r="1.5" fill="rgba(129,140,248,0.65)" />
              </svg>
              <span className="text-[10px] text-ink-subtle">Context travels through every step</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Browser frame ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-w-0"
        >
          <TiltCard maxTilt={5}>
            <BrowserFrame address="app.ultrakin.com/workflows/release-planning">
              <div className="relative overflow-hidden border border-obsidian-border bg-obsidian-canvas p-3 shadow-[0_20px_42px_-32px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.065)] sm:p-5">

                {/* Top fade */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-obsidian-surface/40 to-transparent" />

                {/* Signal source header */}
                <div className="flex items-center justify-between border-b border-obsidian-border-soft px-2 pb-3 sm:px-3">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-obsidian-elevated text-indigo-200">
                      <SignalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="truncate">{signal.source}</span>
                  </div>
                  {/* Mini pipeline indicator */}
                  <div className="hidden items-center gap-1 sm:flex" aria-label="Workflow pipeline">
                    {['S', 'C', 'A', 'T'].map((letter, i) => (
                      <React.Fragment key={letter}>
                        <span className={cn(
                          'flex h-[18px] w-[18px] items-center justify-center rounded-sm text-[7.5px] font-semibold transition-all duration-300',
                          i <= activeStageIdx ? 'bg-indigo-500/25 text-indigo-200 ring-1 ring-indigo-400/30' : 'bg-white/[0.04] text-obsidian-muted',
                        )}>
                          {letter}
                        </span>
                        {i < 3 && <span className="h-px w-2 bg-obsidian-border-soft" aria-hidden="true" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="ml-3 shrink-0 font-mono text-[9px] text-ink-subtle">{signal.time}</span>
                </div>

                {/* 3-col layout */}
                <div className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1.08fr)_72px_minmax(0,.92fr)] sm:items-center sm:gap-2 sm:px-2 sm:py-8">

                  {/* ── Signal card ── */}
                  <TiltCard maxTilt={12} className="relative rounded-xl" style={{ borderRadius: '0.75rem' }}>
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
                      className={cn(
                        'relative rounded-xl border bg-obsidian-surface px-4 py-4 shadow-[0_16px_32px_-24px_rgba(0,0,0,.88),inset_0_1px_0_rgba(220,224,255,.055)] sm:min-h-[190px] sm:p-5 transition-all duration-300',
                        activeStageIdx === 0 ? 'border-indigo-500/40 shadow-[0_0_24px_-6px_rgba(99,102,241,0.25)]' : 'border-obsidian-border',
                      )}
                    >
                      {/* Stage chip */}
                      <div className="mb-3 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-indigo-400/70" aria-hidden="true" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-indigo-300/60">Signal</span>
                      </div>
                      <div className="mb-4 flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian-elevated text-[9px] font-semibold text-indigo-200">{signal.initials}</span>
                        <span className="text-[11px] font-medium text-slate-200">{signal.by}</span>
                      </div>
                      <p className="text-[13px] leading-[1.75] text-obsidian-muted">&ldquo;{signal.message}&rdquo;</p>
                      <div className={cn(
                        'mt-5 flex items-center gap-2 border-t pt-3 text-[10px] transition-all duration-300',
                        activeStageIdx === 1 ? 'border-indigo-400/40 text-indigo-200' : 'border-obsidian-border text-ink-subtle',
                      )}>
                        <FileText className="h-3 w-3 shrink-0 text-brand-text" aria-hidden="true" />
                        <span className="truncate">{signal.context}</span>
                      </div>
                    </motion.div>
                  </TiltCard>

                  {/* ── Animated flow connector ── */}
                  <FlowConnector reduceMotion={reduceMotion} activePulse={activeStageIdx >= 2} />

                  {/* ── Agent suggestion card ── */}
                  <TiltCard maxTilt={12} className="relative rounded-xl" style={{ borderRadius: '0.75rem' }}>
                    <div className={cn(
                      'relative rounded-xl border bg-obsidian-base px-4 py-4 text-white shadow-[0_18px_38px_-25px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.07)] sm:min-h-[190px] sm:px-5 sm:py-5 transition-all duration-300',
                      activeStageIdx >= 2 ? 'border-violet-500/40 shadow-[0_0_24px_-6px_rgba(139,92,246,0.25)]' : 'border-obsidian-border-medium',
                    )}>
                      {/* Stage chip */}
                      <div className="mb-3 flex items-center gap-1.5">
                        <span className="h-1 w-1 rounded-full bg-violet-400/70" aria-hidden="true" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-violet-300/60">Agent</span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-obsidian-muted">Ukin suggestion</span>
                        <span className={cn(
                          'rounded-full px-2 py-1 text-[9px] transition-all duration-300',
                          activeStageIdx === 3 ? 'bg-indigo-400/20 text-indigo-200 ring-1 ring-indigo-400/40' : 'bg-white/[0.08] text-slate-300',
                        )}>Review</span>
                      </div>
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                      >
                        <h3 className="mt-4 text-[16px] font-medium leading-6 tracking-[-0.02em] text-white">{signal.action}</h3>
                        <div className="mt-5 space-y-2.5 border-t border-white/[0.09] pt-4 text-[10px]">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-obsidian-muted">Owner</span>
                            <span className="text-slate-200">{signal.owner}</span>
                          </div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-obsidian-muted">Due</span>
                            <span className="text-slate-200">{signal.due}</span>
                          </div>
                        </div>
                      </motion.div>
                      <button
                        type="button"
                        aria-pressed={created}
                        onClick={() => {
                          const nextState = !created;
                          setCreated(nextState);
                          setSelectedStage(nextState ? 4 : 0);
                        }}
                        className={cn(
                          'mt-5 flex min-h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base cursor-pointer',
                          created
                            ? 'bg-emerald-300/10 text-emerald-200 hover:bg-emerald-300/15'
                            : 'bg-brand text-white hover:bg-brand-hover shadow-[0_4px_12px_rgba(49,86,207,0.3)]',
                        )}
                      >
                        {created ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                        {created ? 'Added to the board · undo' : 'Create task'}
                      </button>
                    </div>
                  </TiltCard>

                </div>

                {/* ── Bottom: workflow breadcrumb ── */}
                <div className="flex items-center justify-between border-t border-obsidian-border-soft px-2 pt-3 text-[9px] text-ink-subtle sm:px-3">
                  <span className="flex items-center gap-1.5">
                    <span className={cn('transition-colors', activeStageIdx === 0 ? 'text-indigo-200 font-semibold' : 'text-indigo-300/55')}>Conversation</span>
                    <ArrowRight className="h-2.5 w-2.5 text-obsidian-muted" aria-hidden="true" />
                    <span className={cn('transition-colors', activeStageIdx === 1 ? 'text-indigo-200 font-semibold' : 'text-indigo-300/55')}>Context</span>
                    <ArrowRight className="h-2.5 w-2.5 text-obsidian-muted" aria-hidden="true" />
                    <span className={cn('transition-colors duration-300', activeStageIdx >= 4 ? 'text-emerald-300 font-semibold' : 'text-indigo-300/55')}>
                      {created ? 'Task · created' : 'Action'}
                    </span>
                  </span>
                  <span>Interactive preview · sample data</span>
                </div>

              </div>
            </BrowserFrame>
          </TiltCard>
        </motion.div>

      </div>

      {/* Bottom hairline — continuity to BentoGrid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" />
    </section>
  );
}
