import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section id="cta" className="relative isolate overflow-hidden bg-transparent py-32 text-white md:py-40">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[14rem] top-1/2 h-[42rem] w-[42rem] -translate-y-1/2 rounded-full border border-indigo-200/[0.045] bg-[radial-gradient(circle_at_35%_35%,rgba(140,144,255,.1),rgba(18,22,34,.035)_30%,transparent_65%)] shadow-[inset_0_1px_0_rgba(255,255,255,.035)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[8rem] top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full border border-white/[0.035]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-t border-white/[0.075] pt-5">
          <p className="flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500"><span className="h-px w-7 bg-indigo-300/70" /> Keep the conversation going</p>
          <span className="hidden font-mono text-[9px] tracking-[0.15em] text-slate-700 sm:inline">ULTRAKIN / WORKSPACE</span>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:items-end lg:gap-16">
          <h2 className="max-w-4xl text-[clamp(2.7rem,6vw,5.5rem)] font-medium leading-[0.96] tracking-[-0.062em]">
            See whether Ultrakin fits the way your team works.
          </h2>
          <div className="border-l border-white/[0.09] pl-5 sm:pl-7">
            <p className="max-w-sm text-[13px] leading-6 text-slate-400">Start with a workspace, or talk with the team about deployment, governance, and an enterprise evaluation.</p>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
              <a href="https://app.ultrakin.com/auth" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-[#7779ee] px-4 text-xs font-medium text-white transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-[#8587f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a10]">
                Create a workspace <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a href="mailto:sales@ultrakin.com?subject=Ultrakin%20product%20evaluation" className="inline-flex min-h-10 items-center gap-2 px-2 text-xs font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a10]">
                Talk to the team <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
