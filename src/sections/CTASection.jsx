import React from 'react';
import { ArrowRight, Calendar, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion } from '../lib/motion';
import { useWorkspace } from '../context/useWorkspace';
import { navigate } from '../lib/navigate';

export default function CTASection() {
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();
  const { openDemoDrawer } = useWorkspace();

  return (
    <section ref={sectionRef} id="cta" className="divider-hairline relative isolate overflow-hidden bg-transparent py-24 text-ink md:py-32">
      {/* Left brand ambient glow — new depth anchor */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10rem] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-brand/[0.045] blur-[110px]" />
      {/* Right decorative rings */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[14rem] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full border border-border/70 bg-[radial-gradient(circle_at_35%_35%,rgba(169,155,132,.12),rgba(169,155,132,.035)_30%,transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[8rem] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-border/70" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          {...getSectionHeaderMotion(inView, reduceMotion)}
        >
          <div className="mb-8 flex items-center justify-between pt-1">
            <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
              <span className="h-px w-7 bg-brand" /> Enterprise Evaluation & Deployment
            </p>
            <span className="hidden font-mono text-[10px] tracking-[0.18em] text-ink-subtle sm:inline">ULTRAKIN / ENTERPRISE</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-16">
            <h2 className="max-w-4xl font-display text-[clamp(2.5rem,5vw,4.1rem)] font-normal leading-[1.04] tracking-[-0.035em]">
              Bring unified intelligence to your <span className="font-display italic text-brand-text">entire organization.</span>
            </h2>
            <div className="border-l border-border pl-5 sm:pl-7">
              <p className="max-w-sm text-[13px] leading-6 text-ink-muted">
                Schedule a tailored architectural walkthrough with our solutions team, or explore our structured 30-day proof-of-concept sandbox with your own data connectors.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={() => openDemoDrawer ? openDemoDrawer() : navigate('/pricing')}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(49,86,207,0.24)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:bg-brand-hover hover:shadow-[0_8px_24px_rgba(49,86,207,0.36)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
                >
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  Schedule walk-through
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/security')}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-border/80 bg-surface px-4 text-xs font-medium text-ink transition-all hover:bg-surface-hover hover:border-border hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
                >
                  Security architecture <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
              {/* Enterprise trust micro-copy */}
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[10.5px] text-ink-subtle">
                <span className="inline-flex items-center gap-1 font-medium text-ink-soft">
                  <ShieldCheck className="h-3 w-3 text-brand-text" /> SOC 2 Type II
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink-soft">
                  <Lock className="h-3 w-3 text-brand-text" /> Zero-Retention AI
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink-soft">
                  <ShieldCheck className="h-3 w-3 text-brand-text" /> SAML 2.0 / SCIM
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 font-medium text-ink-soft">
                  <Sparkles className="h-3 w-3 text-brand-text" /> 99.99% Uptime SLA
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
