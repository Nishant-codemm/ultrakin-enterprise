import React, { memo } from 'react';
import { ArrowRight, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion } from '../lib/motion';
import { useWorkspace } from '../context/useWorkspace';
import { navigate } from '../lib/navigate';

function CTASection() {
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();
  const { openDemoDrawer } = useWorkspace();

  return (
    <section ref={sectionRef} id="cta" className="divider-hairline relative isolate overflow-hidden bg-transparent py-16 md:py-20 text-ink">
      {/* Ambient background glow anchors */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[28rem] w-[54rem] rounded-full bg-brand/[0.04] blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          {...getSectionHeaderMotion(inView, reduceMotion)}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface-raised/90 p-8 sm:p-12 text-center shadow-[0_20px_50px_-24px_rgba(20,34,59,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-sm"
        >
          {/* Eyebrow */}
          <p className="mb-4 inline-flex items-center gap-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-brand-text">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Ultrakin Workspace OS
          </p>

          {/* High-Contrast Closing Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[-0.035em] text-ink max-w-2xl mx-auto leading-[1.08]">
            The autonomous workspace for{' '}
            <span className="font-display italic text-brand-text">fast teams.</span>
          </h2>

          <p className="mt-3.5 max-w-xl mx-auto text-sm sm:text-base leading-relaxed text-ink-muted">
            Bring chat, mail, meetings, docs, tasks, calendar, and Ukin agents into one connected workspace.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/workspace')}
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(49,86,207,0.28)] transition-all duration-150 hover:-translate-y-px hover:bg-brand-hover hover:shadow-[0_8px_24px_rgba(49,86,207,0.36)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
            >
              <span>Start free</span>
              <ArrowRight size={15} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => (openDemoDrawer ? openDemoDrawer() : navigate('/pricing'))}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border/80 bg-surface px-5 text-sm font-medium text-ink transition-colors hover:bg-surface-hover hover:border-border cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page"
            >
              Talk with us
            </button>
          </div>

          {/* Enterprise Trust Badges Row */}
          <div className="mt-8 pt-6 border-t border-border/60 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-mono text-ink-subtle select-none">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-text" /> SOC 2 Type II
            </span>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
              <Lock className="h-3.5 w-3.5 text-brand-text" /> Zero-Retention AI
            </span>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-text" /> SAML 2.0 / SCIM
            </span>
            <span aria-hidden="true" className="text-border-strong">·</span>
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
              <Sparkles className="h-3.5 w-3.5 text-brand-text" /> 99.98% Platform SLA
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(CTASection);
