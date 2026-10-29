import React, { useCallback, useRef, useState } from 'react';
import { ArrowRight, Building2, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/* ─── Cursor-tracking 3D tilt ─── */
function TiltCard({ children, className, style, maxTilt = 10 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width  - 0.5;
    const dy = (e.clientY - r.top)  / r.height - 0.5;
    setT({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%', ...style }}
    >
      <div style={{
        transform: t.on
          ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(1.018)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transition: t.on ? 'transform 90ms ease-out' : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        transformOrigin: '50% 50%',
        willChange: 'transform',
        position: 'relative',
        borderRadius: 'inherit',
        height: '100%',
      }}>
        {children}
        {t.on && !reduceMotion && (
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(165,180,252,0.11) 0%, transparent 60%)`,
            mixBlendMode: 'screen', zIndex: 10,
          }} />
        )}
      </div>
    </div>
  );
}

const PATHS = [
  {
    icon: Compass,
    eyebrow: 'Explore the preview',
    title: 'See the workspace in action',
    description: 'Open the interactive workspace to explore sample conversations, notes, and follow-up flows — no sign-up required.',
    action: 'Open the workspace',
    href: '/workspace',
    external: false,
    accent: 'rgba(99,102,241,0.08)',
    accentBorder: 'rgba(99,102,241,0.18)',
  },
  {
    icon: Building2,
    eyebrow: 'Plan for your team',
    title: 'Compare plans and controls',
    description: 'See how workspace, mailbox, agent, and admin capabilities vary by plan. Contact the team for a tailored enterprise evaluation.',
    action: 'View current plans',
    href: '/pricing',
    external: false,
    accent: 'rgba(49,86,207,0.07)',
    accentBorder: 'rgba(49,86,207,0.16)',
  },
];

export default function EvaluationSection() {
  return (
    <section id="evaluation" className="divider-hairline bg-surface/65 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.19em] text-brand-text">
            Next steps
          </p>
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:text-[2.65rem]">
            Choose how you want<br className="hidden sm:block" /> to explore Ultrakin.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink-muted">
            Start with the workspace preview, compare current plans, or talk with the team about an enterprise evaluation.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PATHS.map(({ icon: Icon, eyebrow, title, description, action, href, external, accent, accentBorder }) => (
            <TiltCard
              key={title}
              maxTilt={11}
              className="rounded-2xl"
              style={{ borderRadius: '1rem' }}
            >
              <article
                className="group flex h-full flex-col rounded-2xl border bg-surface-raised p-6 sm:p-8 md:min-h-[270px]"
                style={{ borderColor: accentBorder, background: `linear-gradient(135deg, ${accent} 0%, transparent 55%)` }}
              >
                {/* Icon */}
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand/15 bg-brand-soft transition-colors duration-200 group-hover:border-brand/25 group-hover:bg-brand/10"
                >
                  <Icon aria-hidden="true" className="h-[18px] w-[18px] text-brand-text" />
                </span>

                {/* Eyebrow */}
                <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.17em] text-ink-subtle">{eyebrow}</p>

                {/* Title */}
                <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-ink transition-colors duration-200 group-hover:text-brand-text">
                  {title}
                </h3>

                {/* Description */}
                <p className="mt-3 max-w-lg flex-1 text-[13px] leading-6 text-ink-muted">{description}</p>

                {/* CTA */}
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="mt-7 inline-flex min-h-10 w-fit items-center gap-2 rounded-md text-sm font-medium text-ink-soft transition-all duration-200 hover:gap-3 hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  {action}
                  <motion.span
                    className="inline-flex"
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </motion.span>
                </a>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* Bottom micro-trust line */}
        <p className="mt-10 flex items-center gap-2 text-[11px] text-ink-subtle">
          <span className="h-px w-6 bg-border-strong" />
          Questions? <a href="mailto:sales@ultrakin.com" className="text-ink-soft underline-offset-2 hover:text-brand-text hover:underline">Talk to the team</a> — no pressure, no sales pitch.
        </p>

      </div>
    </section>
  );
}
