import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

export default function CTASection() {
  const { openDemoDrawer } = useWorkspace();

  return (
    <section id="cta" className="relative overflow-hidden py-24 md:py-32 bg-[#07090E] text-white divider-hairline">
      {/* Background Radial Effects */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(800px 400px at 50% 0%, rgba(99,102,241,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 lg:px-8 text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-6">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          START RUNNING ON UKIN TODAY
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] max-w-3xl mx-auto">
          Bring your team, your tools, and your agents into one app.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
          Create your workspace in less than 60 seconds. No credit card required. Free forever for small teams.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href="https://app.ultrakin.com/auth"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_28px_-6px_rgba(99,102,241,0.55)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_14px_36px_-6px_rgba(99,102,241,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Get started free
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openDemoDrawer}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] backdrop-blur-md px-8 py-4 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-200 cursor-pointer"
          >
            Request Enterprise Demo
          </button>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> SOC 2 Type II Certified
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> GDPR &amp; HIPAA Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> 99.95% Guaranteed Uptime
          </span>
        </div>
      </div>
    </section>
  );
}