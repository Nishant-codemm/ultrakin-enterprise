import React, { useCallback, useRef, useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, CircleDot, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import VisualAutomationsCanvas from '../components/showcase/VisualAutomationsCanvas';
import UkinActionProposalCard from '../components/showcase/UkinActionProposalCard';
import BrowserFrame from '../components/BrowserFrame';

const capabilities = [
  { icon: CircleDot, title: 'Notice the signal', detail: 'Agents work with the conversations and artifacts already in the workspace.' },
  { icon: Sparkles, title: 'Prepare a next step', detail: 'A workflow can gather context and propose a specific, reviewable action.' },
  { icon: ShieldCheck, title: 'Keep people in control', detail: 'People can inspect, approve, or decline an action before it changes work.' },
];

/* ─── Cursor-tracking 3D tilt wrapper ─── */
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
          height: '100%',
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

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-page pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="grid gap-7 border-b border-border pb-8 lg:grid-cols-[1fr_330px] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[.2em] text-brand-text"><Bot size={13} /> Ukin agents</p>
            <h1 className="text-[clamp(2.5rem,4.5vw,3.5rem)] font-medium leading-[1] tracking-[-.055em]">Useful AI, in the flow of work.</h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ink-muted">Ukin agents can connect signals across chat, mail, docs, meetings, and tasks—then prepare work your team can review.</p>
          </div>
          <a
            href="https://app.ultrakin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-brand px-4 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_rgba(49,86,207,.5)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page"
          >
            Open Ultrakin<ArrowRight size={14} />
          </a>
        </header>

        {/* ── 3 capability cards — each with TiltCard ── */}
        <section aria-label="Agent workflow overview" className="mt-10 grid gap-4 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, detail }, index) => (
            <TiltCard
              key={title}
              maxTilt={12}
              className="rounded-2xl"
              style={{ borderRadius: '1rem' }}
            >
              <article className="flex h-full gap-4 rounded-2xl border border-border bg-surface-raised p-5 shadow-[0_12px_28px_-24px_rgba(17,24,39,.2)]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-brand/15 bg-brand-soft text-brand-text">
                  <Icon size={15} />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink-soft">
                    <span className="mr-2 font-mono text-[10px] text-ink-subtle">0{index + 1}</span>
                    {title}
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-ink-muted">{detail}</p>
                </div>
              </article>
            </TiltCard>
          ))}
        </section>

        {/* ── Big BrowserFrame with TiltCard ── */}
        <TiltCard maxTilt={4} className="mt-12" style={{ borderRadius: '1.5rem' }}>
          <BrowserFrame
            address="app.ultrakin.com/workspace/agents"
            className="rounded-3xl shadow-[0_28px_72px_-54px_rgba(17,24,39,.32),0_5px_18px_rgba(17,24,39,.06)]"
            viewportClassName="p-3 sm:p-4"
          >
            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]" aria-label="Interactive agent examples">
              <div className="min-w-0 overflow-hidden rounded-xl border border-obsidian-border bg-[#0b0e14] shadow-elevated">
                <div className="flex min-h-12 items-center justify-between gap-3 border-b border-obsidian-border px-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-400/10 text-indigo-200"><Bot size={13} /></span>
                    Workflow canvas
                  </div>
                  <span className="text-[10px] text-slate-600">Interactive sample</span>
                </div>
                <div className="min-h-[760px] min-w-0 sm:min-h-[860px] md:min-h-[700px] xl:h-[600px] xl:min-h-0">
                  <VisualAutomationsCanvas />
                </div>
              </div>
              <aside className="space-y-4">
                <UkinActionProposalCard />
                <div className="rounded-xl border border-border bg-surface p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-ink-soft">
                    <CheckCircle2 size={14} className="text-emerald-700" />
                    A person stays in the loop
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-ink-muted">The sample proposal can be reviewed, approved, or declined. Try its controls to see how an agent action moves through the workflow.</p>
                </div>
              </aside>
            </section>
          </BrowserFrame>
        </TiltCard>

      </div>
    </div>
  );
}
