import React from 'react';
import { ArrowRight, Building2, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion, getSectionContentMotion } from '../lib/motion';
import { handleSpotlightMove } from '../lib/interaction';
import { navigate } from '../lib/navigate';
import TiltCard from '../components/primitives/TiltCard';

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
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} id="evaluation" className="divider-hairline bg-transparent py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header with Scroll Entrance */}
        <motion.div
          {...getSectionHeaderMotion(inView, reduceMotion)}
          className="max-w-2xl"
        >
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-text">
            Next steps
          </p>
          <h2 className="max-w-xl font-display text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
            Choose how you want<br className="hidden sm:block" /> to explore Ultrakin.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-ink-muted">
            Start with the workspace preview, compare current plans, or talk with the team about an enterprise evaluation.
          </p>
        </motion.div>

        {/* Cards grid with Staggered Entrance & Cursor Spotlight */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PATHS.map(({ icon: Icon, eyebrow, title, description, action, href, external, accent, accentBorder }, index) => (
            <motion.div
              key={title}
              {...getSectionContentMotion(inView, reduceMotion, 0.1 + index * 0.12)}
            >
              <TiltCard
                maxTilt={9}
                className="rounded-2xl h-full"
                style={{ borderRadius: '1rem' }}
              >
                <article
                  onMouseMove={handleSpotlightMove}
                  className="spotlight-card group flex h-full flex-col rounded-2xl border bg-surface-raised p-6 shadow-[0_12px_28px_-18px_rgba(20,34,59,0.06)] sm:p-8 md:min-h-[270px]"
                  style={{ borderColor: accentBorder, background: `linear-gradient(135deg, ${accent} 0%, transparent 55%)` }}
                >
                  <div className="relative z-10 flex h-full flex-col">
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
                      onClick={!external && href.startsWith('/') ? (e) => { e.preventDefault(); navigate(href); } : undefined}
                      className="mt-7 inline-flex min-h-10 w-fit items-center gap-2 rounded-lg text-sm font-medium text-ink-soft transition-all duration-200 hover:gap-3 hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
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
                  </div>
                </article>
              </TiltCard>
            </motion.div>
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
