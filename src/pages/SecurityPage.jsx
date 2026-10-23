import React from 'react';
import { ArrowUpRight, BadgeCheck, Building2, Database, Fingerprint, KeyRound, LockKeyhole } from 'lucide-react';

const topics = [
  { number: '01', title: 'Encryption', icon: LockKeyhole, summary: 'Understand how information is protected as it moves through Ultrakin and while it is stored.', detail: 'For a security review, ask us for current encryption coverage, key-management details, and the controls available for your deployment.' },
  { number: '02', title: 'Privacy and data handling', icon: Fingerprint, summary: 'Review how workspace content, agent context, and connected services are handled.', detail: 'We can walk through data use, retention, deletion, and the boundaries that apply to agents and connected tools for your use case.' },
  { number: '03', title: 'Compliance', icon: BadgeCheck, summary: 'Get the current materials your procurement and risk teams need to evaluate Ultrakin.', detail: 'Compliance availability and supporting documentation can change. Request the latest reports, policies, and contractual materials from the team.' },
  { number: '04', title: 'Infrastructure and resilience', icon: Database, summary: 'Discuss hosting, backups, monitoring, and recovery expectations before rollout.', detail: 'Share your region, recovery, and availability requirements so the team can confirm the current architecture and operational commitments.' },
  { number: '05', title: 'Enterprise security', icon: Building2, summary: 'Plan identity, administration, audit, and support controls for a larger organization.', detail: 'Business and Enterprise plans include identity and administrative capabilities such as SSO / IdP, roles, and audit controls. Enterprise can add advanced SSO, SCIM, retention, audit export, and deployment terms.' },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#080a10] pb-24 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="max-w-3xl">
          <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[.2em] text-slate-500"><span className="h-px w-7 bg-indigo-300/70" /> Security and trust</p>
          <h1 className="text-[clamp(2.8rem,5.4vw,4.5rem)] font-medium leading-[.95] tracking-[-.065em]">Clear answers for<br className="hidden sm:block" /> careful teams.</h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-400">Security reviews depend on your policies and deployment requirements. Explore the areas teams typically review, then ask us for current product details and supporting materials.</p>
          <a href="mailto:sales@ultrakin.com?subject=Ultrakin%20security%20review" className="mt-7 inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#7779ee] px-4 text-xs font-semibold text-white transition-colors hover:bg-[#8587f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">Talk with security<ArrowUpRight size={14} /></a>
        </header>

        <section aria-label="Security topics" className="mt-16 border-y border-white/[0.09]">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <details key={topic.number} className="group border-b border-white/[0.075] last:border-0">
                <summary className="grid cursor-pointer list-none grid-cols-[34px_22px_minmax(0,1fr)_20px] items-center gap-3 py-5 sm:grid-cols-[44px_24px_minmax(0,1fr)_20px] sm:gap-5 sm:py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
                  <span className="font-mono text-[10px] text-indigo-200/70">{topic.number}</span>
                  <Icon className="h-4 w-4 text-slate-400" />
                   <span><span className="block text-sm font-medium text-slate-100">{topic.title}</span><span className="mt-1 block text-xs leading-5 text-slate-400">{topic.summary}</span></span>
                  <span className="text-lg leading-none text-slate-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-3xl pb-6 pl-[72px] text-xs leading-6 text-slate-400 sm:pl-[93px]">{topic.detail}</p>
              </details>
            );
          })}
        </section>

        <aside className="mt-16 flex flex-col gap-5 border-l border-indigo-200/25 pl-5 sm:flex-row sm:items-center sm:justify-between sm:pl-7">
          <div className="flex items-start gap-3"><KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-indigo-200" /><div><h2 className="text-sm font-medium text-slate-200">Need a security packet?</h2><p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">Tell us what your team needs to review. We’ll share the current information available for your evaluation.</p></div></div>
          <a href="mailto:sales@ultrakin.com?subject=Ultrakin%20security%20materials" className="inline-flex shrink-0 items-center gap-2 rounded-sm text-xs font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">Request materials<ArrowUpRight size={13} /></a>
        </aside>
      </div>
    </div>
  );
}
