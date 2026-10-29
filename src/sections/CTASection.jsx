import React from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="relative isolate overflow-hidden bg-surface/65 py-24 text-ink md:py-32">
      {/* Left brand ambient glow — new depth anchor */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10rem] top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full bg-brand/[0.045] blur-[110px]" />
      {/* Right decorative rings — existing */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-[14rem] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full border border-border/70 bg-[radial-gradient(circle_at_35%_35%,rgba(169,155,132,.12),rgba(169,155,132,.035)_30%,transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[8rem] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-border/70" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-t border-border pt-5">
          <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle"><span className="h-px w-7 bg-brand" /> Start building today</p>
          <span className="hidden font-mono text-[9px] tracking-[0.15em] text-ink-subtle sm:inline">ULTRAKIN / WORKSPACE</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-16">
          <h2 className="max-w-4xl font-display text-[clamp(2.6rem,5.2vw,4rem)] font-medium leading-[0.97] tracking-[-0.062em]">
            Your team's next workspace<br className="hidden sm:block" /> is already here.
          </h2>
          <div className="border-l border-border pl-5 sm:pl-7">
            <p className="max-w-sm text-[13px] leading-6 text-ink-muted">Start free in 60 seconds, or talk with the team about enterprise deployment, governance, and a tailored evaluation.</p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://app.ultrakin.com/auth"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-2 rounded-md bg-brand px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(49,86,207,0.22)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:bg-brand-hover hover:shadow-[0_7px_20px_rgba(49,86,207,0.30)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Create a workspace <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href="mailto:sales@ultrakin.com?subject=Ultrakin%20product%20evaluation"
                className="inline-flex min-h-10 items-center gap-2 px-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                Talk to the team <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
            {/* Enterprise trust micro-copy */}
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-ink-subtle">
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-brand-text" />SOC 2 Type II</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-brand-text" />GDPR-ready</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-brand-text" />SSO / SAML</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-brand-text" />99.9% uptime SLA</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
