import React, { useCallback, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  FileText,
  MessageSquareText,
  Plus,
  Sparkles,
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
    const dx = (e.clientX - r.left)  / r.width  - 0.5;   // -0.5 → 0.5
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
        {/* Cursor-following surface highlight */}
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

/* ─── Flowing mid-line with repeating particles ─── */
function FlowConnector({ reduceMotion }) {
  const PATH = 'M1 15 C 22 15, 24 15, 36 15 S 50 15, 71 15';

  return (
    <div className="relative hidden h-12 items-center justify-center sm:flex" aria-hidden="true">
      <svg viewBox="0 0 72 30" className="absolute inset-0 h-full w-full overflow-visible">
        {/* Defs */}
        <defs>
          <filter id="dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="flow-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#a5b4fc" stopOpacity="0" />
            <stop offset="40%"  stopColor="#a5b4fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Static dashed base line */}
        <path d={PATH} fill="none" stroke="#c3c6c1" strokeWidth="1.2" strokeDasharray="3 4" />

        {/* Ambient glow line */}
        <path d={PATH} fill="none" stroke="url(#flow-grad)" strokeWidth="2.5" opacity="0.25" />

        {/* Particle 1 — main fast pulse */}
        {!reduceMotion && (
          <motion.path
            d={PATH}
            fill="none"
            stroke="#818cf8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 64"
            filter="url(#dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.2, ease: 'linear', repeat: Infinity, repeatDelay: 0.4 }}
          />
        )}

        {/* Particle 2 — slower trailing pulse, offset delay */}
        {!reduceMotion && (
          <motion.path
            d={PATH}
            fill="none"
            stroke="#c7d2fe"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 68"
            filter="url(#dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.2, ease: 'linear', repeat: Infinity, repeatDelay: 0.4, delay: 0.55 }}
          />
        )}

        {/* Center node — pulsing ring */}
        <circle cx="36" cy="15" r="4" fill="#3156cf" />
        <circle cx="36" cy="15" r="8" fill="#3156cf" fillOpacity=".12" />
        {!reduceMotion && (
          <motion.circle
            cx="36" cy="15" r="4"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1"
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '36px 15px' }}
          />
        )}
      </svg>
    </div>
  );
}

export default function WorkflowSpotlight() {
  const [created, setCreated] = useState(false);
  const reduceMotion = useReducedMotion();
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const signal = SIGNAL;
  const SignalIcon = signal.icon;

  return (
    <section ref={sectionRef} id="workflows" className="relative overflow-hidden bg-transparent py-20 text-ink md:py-28">

      {/* Ambient background blob for section depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8rem] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-8">
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
          <div className="mt-9 border-t border-border pt-5">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-ink-subtle">One workflow · chat to task</p>
            <div role="list" aria-label="Workflow stages" className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[11px] font-medium text-ink-muted">
              <span role="listitem" className="inline-flex items-center gap-1.5"><MessageSquareText className="h-3.5 w-3.5 text-brand-text" aria-hidden="true" />Signal</span>
              <ArrowRight className="h-3 w-3 text-ink-subtle" aria-hidden="true" />
              <span role="listitem" className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-brand-text" aria-hidden="true" />Ukin context</span>
              <ArrowRight className="h-3 w-3 text-ink-subtle" aria-hidden="true" />
              <span role="listitem" className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />Tracked task</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Browser frame wraps both inner cards ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-w-0"
        >
          <TiltCard maxTilt={5}>
            <BrowserFrame address="app.ultrakin.com/workflows/release-planning">
              <div className="relative overflow-hidden border border-obsidian-border bg-obsidian-canvas p-3 shadow-[0_20px_42px_-32px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.065)] sm:p-5">
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-obsidian-surface/45 to-transparent" />
                <div className="flex items-center justify-between border-b border-obsidian-border-soft px-2 pb-3 sm:px-3">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-obsidian-elevated text-indigo-200"><SignalIcon className="h-3.5 w-3.5" aria-hidden="true" /></span>
                    <span className="truncate">{signal.source}</span>
                  </div>
                  <span className="ml-3 shrink-0 font-mono text-[9px] text-ink-subtle">{signal.time}</span>
                </div>

                <div className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1.08fr)_72px_minmax(0,.92fr)] sm:items-center sm:gap-2 sm:px-2 sm:py-8">

                  {/* ── Left card: Signal ── */}
                  <TiltCard
                    maxTilt={12}
                    className="relative rounded-xl"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
                      className="relative rounded-xl border border-obsidian-border bg-obsidian-surface px-4 py-4 shadow-[0_16px_32px_-24px_rgba(0,0,0,.88),inset_0_1px_0_rgba(220,224,255,.055)] sm:min-h-[190px] sm:p-5"
                    >
                      <div className="mb-5 flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-obsidian-elevated text-[9px] font-semibold text-indigo-200">{signal.initials}</span>
                        <span className="text-[11px] font-medium text-slate-200">{signal.by}</span>
                      </div>
                      <p className="text-[13px] leading-[1.75] text-obsidian-muted">"{signal.message}"</p>
                      <div className="mt-5 flex items-center gap-2 border-t border-obsidian-border pt-3 text-[10px] text-ink-subtle">
                        <FileText className="h-3 w-3 shrink-0 text-brand-text" aria-hidden="true" />
                        <span className="truncate">{signal.context}</span>
                      </div>
                    </motion.div>
                  </TiltCard>

                  {/* ── Mid: Animated flowing connector ── */}
                  <FlowConnector reduceMotion={reduceMotion} />

                  {/* ── Right card: Agent suggestion ── */}
                  <TiltCard
                    maxTilt={12}
                    className="relative rounded-xl"
                    style={{ borderRadius: '0.75rem' }}
                  >
                    <div className="relative rounded-xl border border-obsidian-border-medium bg-obsidian-base px-4 py-4 text-white shadow-[0_18px_38px_-25px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.07)] sm:min-h-[190px] sm:px-5 sm:py-5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-obsidian-muted">Ukin agent suggestion</span>
                        <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[9px] text-slate-300">Review</span>
                      </div>
                      <motion.div initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.18 }}>
                        <h3 className="mt-5 text-[16px] font-medium leading-6 tracking-[-0.02em] text-white">{signal.action}</h3>
                        <div className="mt-5 space-y-2.5 border-t border-white/[0.09] pt-4 text-[10px]">
                          <div className="flex items-center justify-between gap-3"><span className="text-obsidian-muted">Owner</span><span className="text-slate-200">{signal.owner}</span></div>
                          <div className="flex items-center justify-between gap-3"><span className="text-obsidian-muted">Due</span><span className="text-slate-200">{signal.due}</span></div>
                        </div>
                      </motion.div>
                      <button
                        type="button"
                        aria-pressed={created}
                        onClick={() => setCreated((v) => !v)}
                        className={cn('mt-5 flex min-h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base',
                          created ? 'bg-emerald-300/10 text-emerald-200 hover:bg-emerald-300/15' : 'bg-brand text-white hover:bg-brand-hover shadow-[0_4px_12px_rgba(49,86,207,0.3)]')}
                      >
                        {created ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                        {created ? 'Added to the board · undo' : 'Create task'}
                      </button>
                    </div>
                  </TiltCard>

                </div>

                <div className="flex items-center justify-between border-t border-obsidian-border-soft px-2 pt-3 text-[9px] text-ink-subtle sm:px-3">
                  <span>Conversation <span className="px-1 text-obsidian-muted">/</span> Context <span className="px-1 text-obsidian-muted">/</span> Action</span>
                  <span>Interactive preview · sample data</span>
                </div>
              </div>
            </BrowserFrame>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
