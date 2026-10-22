import React from 'react';
import { ArrowRight, Bot, CheckCircle2, CircleDot, ShieldCheck, Sparkles } from 'lucide-react';
import VisualAutomationsCanvas from '../components/showcase/VisualAutomationsCanvas';
import UkinActionProposalCard from '../components/showcase/UkinActionProposalCard';

const capabilities = [
  { icon: CircleDot, title: 'Notice the signal', detail: 'Agents work with the conversations and artifacts already in the workspace.' },
  { icon: Sparkles, title: 'Prepare a next step', detail: 'A workflow can gather context and propose a specific, reviewable action.' },
  { icon: ShieldCheck, title: 'Keep people in control', detail: 'People can inspect, approve, or decline an action before it changes work.' },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-[#080a10] pb-24 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="grid gap-7 border-b border-white/[0.08] pb-8 lg:grid-cols-[1fr_330px] lg:items-end">
          <div className="max-w-3xl"><p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[.2em] text-indigo-200/75"><Bot size={13} /> Ukin agents</p><h1 className="text-[clamp(2.8rem,6vw,5.2rem)] font-medium leading-[.95] tracking-[-.065em]">Useful AI, in the flow of work.</h1><p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400">Ukin agents can connect signals across chat, mail, docs, meetings, and tasks—then prepare work your team can review.</p></div>
          <a href="https://app.ultrakin.com" target="_blank" rel="noreferrer" className="inline-flex h-10 w-fit items-center gap-2 rounded-lg bg-[#7779ee] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#8587f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a10]">Open Ultrakin<ArrowRight size={14} /></a>
        </header>

        <section aria-label="Agent workflow overview" className="mt-8 grid gap-3 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, detail }, index) => <article key={title} className="flex gap-3 border-t border-white/[0.09] py-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-200/10 bg-indigo-300/[0.06] text-indigo-200"><Icon size={15} /></span><div><p className="text-xs font-medium text-slate-200"><span className="mr-2 font-mono text-[9px] text-slate-600">0{index + 1}</span>{title}</p><p className="mt-1.5 max-w-xs text-[11px] leading-5 text-slate-400">{detail}</p></div></article>)}
        </section>

        <section className="mt-10 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]" aria-label="Interactive agent examples">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0e14] shadow-[0_28px_70px_-55px_rgba(0,0,0,.9)]">
            <div className="flex min-h-12 items-center justify-between gap-3 border-b border-white/[0.08] px-4"><div className="flex items-center gap-2 text-xs font-medium text-slate-200"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-400/10 text-indigo-200"><Bot size={13} /></span>Workflow canvas</div><span className="text-[10px] text-slate-600">Interactive sample</span></div>
            <div className="overflow-x-auto"><div className="h-[600px] min-w-[1200px]"><VisualAutomationsCanvas /></div></div>
          </div>
          <aside className="space-y-4">
            <UkinActionProposalCard />
            <div className="rounded-xl border border-white/[0.075] bg-white/[0.02] p-4"><div className="flex items-center gap-2 text-xs font-medium text-slate-200"><CheckCircle2 size={14} className="text-emerald-200" />A person stays in the loop</div><p className="mt-2 text-[11px] leading-5 text-slate-400">The sample proposal can be reviewed, approved, or declined. Try its controls to see how an agent action moves through the workflow.</p></div>
          </aside>
        </section>
      </div>
    </div>
  );
}
