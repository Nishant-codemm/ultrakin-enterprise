import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  LockKeyhole,
  MessageSquare,
  Search,
  ShieldCheck,
  SquareCheckBig,
} from 'lucide-react';
import { cn } from '../lib/cn';

const LENSES = [
  { id: 'memory', number: '01', label: 'Find the thread', hint: 'Search that understands context', icon: Search },
  { id: 'control', number: '02', label: 'Keep the say', hint: 'People stay in control', icon: ShieldCheck },
  { id: 'continuity', number: '03', label: 'Keep it connected', hint: 'Decisions travel with work', icon: GitBranch },
];

function MemoryView() {
  const [query, setQuery] = useState('What did we decide about SSO?');
  const records = [
    { icon: MessageSquare, type: 'CONVERSATION', title: 'Release planning · #identity', body: 'Keep the current certificate path; add a retry guard before rollout.', time: 'Yesterday' },
    { icon: FileText, type: 'DECISION NOTE', title: 'SSO rollout checklist', body: 'Maya to verify EU tenant recovery before release.', time: 'Updated 2h ago' },
  ];
  const terms = query.toLowerCase().split(/\W+/).filter((word) => word.length > 2);
  const matches = records.filter((record) => terms.length === 0 || terms.some((term) => `${record.title} ${record.body} ${record.type}`.toLowerCase().includes(term)));

  return (
    <div className="relative z-10 mx-auto max-w-2xl">
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Workspace memory</span>
        <span className="flex items-center gap-1.5 text-[10px] text-slate-500"><LockKeyhole className="h-3 w-3" /> Permission-aware</span>
      </div>
      <label className="sr-only" htmlFor="memory-query">Search workspace memory</label>
      <div className="flex items-center gap-3 border-b border-white/[0.15] pb-4">
        <Search className="h-4 w-4 shrink-0 text-indigo-200" />
        <input id="memory-query" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-base font-light tracking-[-0.02em] text-slate-100 outline-none placeholder:text-slate-600 sm:text-lg" aria-label="Search workspace memory" />
        <span className="hidden rounded border border-white/10 px-1.5 py-1 font-mono text-[9px] text-slate-600 sm:inline">⌘ K</span>
      </div>
      <div className="mt-3 text-[10px] text-slate-600">Across conversations, notes, and active work</div>
      <div className="mt-8 divide-y divide-white/[0.075]" aria-live="polite">
        {matches.map((record, index) => {
          const Icon = record.icon;
          return (
            <motion.div key={record.title} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.24 }} className="grid grid-cols-[26px_1fr] gap-3 py-4 first:pt-0 sm:grid-cols-[26px_1fr_auto] sm:gap-4">
              <Icon className="mt-1 h-4 w-4 text-indigo-200/80" />
              <div>
                <p className="text-[9px] font-medium tracking-[0.14em] text-slate-600">{record.type}</p>
                <h3 className="mt-1 text-[13px] font-medium text-slate-200">{record.title}</h3>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">{record.body}</p>
              </div>
              <span className="hidden pt-1 text-[9px] text-slate-600 sm:block">{record.time}</span>
            </motion.div>
          );
        })}
        {matches.length === 0 && <p className="py-5 text-xs text-slate-400">No matching workspace context.</p>}
      </div>
    </div>
  );
}

function ControlView() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="relative z-10 mx-auto grid max-w-3xl gap-10 sm:grid-cols-[1fr_0.7fr] sm:items-center sm:gap-14">
      <div>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">Suggested action</span>
        <h3 className="mt-4 max-w-md text-2xl font-light leading-[1.1] tracking-[-0.04em] text-white sm:text-3xl">Create a task from the SSO release conversation.</h3>
        <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400">The source, owner, and related decision stay attached. A person makes the call.</p>
        <button type="button" onClick={() => setApproved((value) => !value)} aria-pressed={approved} className={cn('mt-7 inline-flex min-h-10 items-center gap-2 rounded-md px-3.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300', approved ? 'bg-emerald-300/10 text-emerald-200' : 'bg-white text-[#12151c] hover:bg-indigo-100')}>
          {approved ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          {approved ? 'Approved for the board' : 'Review and approve'}
        </button>
      </div>
      <div className="border-l border-white/[0.12] pl-5 sm:pl-7">
        <div className="mb-5 flex items-center gap-2 text-[10px] text-slate-400"><LockKeyhole className="h-3.5 w-3.5 text-indigo-200" /> Access inherited</div>
        <div className="space-y-4">
          {[
            ['Maya Chen', 'Release planning'],
            ['Ukin', 'Only this suggested action'],
            ['Workspace admin', 'Policy controls'],
          ].map(([name, access]) => <div key={name} className="flex items-start justify-between gap-4 border-t border-white/[0.075] pt-3"><span className="text-[11px] text-slate-300">{name}</span><span className="max-w-[135px] text-right text-[10px] leading-4 text-slate-600">{access}</span></div>)}
        </div>
      </div>
    </div>
  );
}

function ContinuityView() {
  const points = [
    { icon: MessageSquare, tag: 'SOURCE', title: 'A release decision', note: '#identity' },
    { icon: FileText, tag: 'CONTEXT', title: 'The SSO checklist', note: 'Updated with owner' },
    { icon: SquareCheckBig, tag: 'FOLLOW-THROUGH', title: 'Verify EU recovery', note: 'Maya · Thursday' },
  ];
  return (
    <div className="relative z-10 mx-auto max-w-3xl">
      <div className="mb-10 flex items-center justify-between gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">One continuous thread</span>
        <span className="text-[10px] text-slate-600">Context stays linked</span>
      </div>
      <div className="relative grid gap-7 sm:grid-cols-3 sm:gap-4">
        <div className="absolute left-[13%] right-[13%] top-[21px] hidden h-px bg-gradient-to-r from-indigo-300/15 via-indigo-200/50 to-emerald-200/20 sm:block" />
        {points.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div key={point.tag} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.28 }} className="relative">
              <span className="relative z-10 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/[0.1] bg-[#151922] text-slate-300 shadow-[0_8px_24px_-16px_rgba(0,0,0,.9)]"><Icon className="h-4 w-4" /></span>
              <p className="mt-5 text-[9px] font-medium tracking-[0.16em] text-slate-600">{point.tag}</p>
              <h3 className="mt-2 text-[13px] font-medium text-slate-200">{point.title}</h3>
              <p className="mt-1 text-[10px] text-slate-500">{point.note}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function BentoGrid() {
  const [active, setActive] = useState('memory');
  const lens = LENSES.find((item) => item.id === active) ?? LENSES[0];
  const ActiveIcon = lens.icon;
  const content = active === 'memory' ? <MemoryView /> : active === 'control' ? <ControlView /> : <ContinuityView />;

  return (
    <section id="platform" className="relative overflow-hidden bg-transparent py-24 md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -left-[30rem] top-1/4 h-[48rem] w-[48rem] rounded-full border border-white/[0.025]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-[24rem] top-[30%] h-[36rem] w-[36rem] rounded-full border border-white/[0.025]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-7 bg-indigo-300/70" /> A workspace that holds the thread</p>
            <h2 className="max-w-2xl text-[clamp(2.7rem,5.2vw,4.8rem)] font-medium leading-[0.96] tracking-[-0.06em] text-white">Context shouldn’t<br className="hidden sm:block" /> disappear between tools.</h2>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-slate-400 md:pb-1">Explore how memory, control, and follow-through work as one system.</p>
        </div>

        <div className="grid gap-10 border-t border-white/[0.08] pt-7 lg:grid-cols-[250px_1fr] lg:gap-16">
          <div role="tablist" aria-label="Explore how the workspace connects" className="flex gap-3 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {LENSES.map((item) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button key={item.id} type="button" role="tab" id={`lens-tab-${item.id}`} aria-selected={selected} aria-controls="lens-panel" onClick={() => setActive(item.id)} className={cn('group relative min-w-[190px] flex-1 border-b border-white/[0.07] py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 lg:min-w-0 lg:flex-none lg:py-5', selected ? 'text-white' : 'text-slate-500 hover:text-slate-300')}>
                  <span className="flex items-center gap-3">
                    <span className={cn('font-mono text-[9px]', selected ? 'text-indigo-200' : 'text-slate-700')}>{item.number}</span>
                    <Icon className={cn('h-3.5 w-3.5', selected ? 'text-indigo-200' : 'text-slate-600')} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </span>
                  <span className="mt-2 hidden pl-[3.45rem] text-[10px] text-slate-600 lg:block">{item.hint}</span>
                  {selected && <motion.span layoutId="lens-indicator" className="absolute bottom-[-1px] left-0 right-0 h-px bg-indigo-200/70 lg:right-auto lg:top-0 lg:h-auto lg:w-px" />}
                </button>
              );
            })}
          </div>

          <div id="lens-panel" role="tabpanel" aria-labelledby={`lens-tab-${active}`} className="relative isolate min-h-[400px] overflow-hidden rounded-[1.65rem] border border-white/[0.08] bg-[#0b0e14]/80 py-6 shadow-[0_38px_90px_-68px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.055)] sm:py-8 lg:min-h-[430px] lg:px-10 lg:py-9 lg:[transform:perspective(1400px)_rotateY(-1.1deg)_rotateX(.35deg)] lg:[transform-origin:30%_50%] lg:transition-transform lg:duration-700 lg:hover:[transform:perspective(1400px)_rotateY(0deg)_rotateX(0deg)]">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_44%,rgba(105,111,200,.12),transparent_56%),linear-gradient(132deg,rgba(255,255,255,.035),transparent_28%,transparent_74%,rgba(146,151,255,.035))]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.22 }}>
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between text-[9px] uppercase tracking-[0.14em] text-slate-700">
          <span className="flex items-center gap-2"><ActiveIcon className="h-3 w-3" /> {lens.label}</span>
          <span>Interactive preview · sample data</span>
        </div>
      </div>
    </section>
  );
}
