import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  FileText,
  Headphones,
  Inbox,
  MessageSquareText,
  Plus,
  Sparkles,
} from 'lucide-react';
import { cn } from '../lib/cn';

const SIGNALS = [
  {
    id: 'chat', label: 'Conversation', source: '#release-planning', icon: MessageSquareText,
    by: 'Maya Chen', initials: 'MC', time: '10:42',
    message: 'Can someone own the SSO timeout before Thursday’s rollout? The EU tenant is still seeing retries.',
    context: 'SSO rollout checklist', action: 'Trace EU tenant retry spikes', owner: 'Maya Chen', due: 'Thursday',
  },
  {
    id: 'huddle', label: 'Huddle', source: 'Weekly product huddle', icon: Headphones,
    by: 'Meeting notes', initials: 'MN', time: '11:08',
    message: 'Decision: move token refresh earlier. Ravi will update the gateway and share a test build tomorrow.',
    context: 'Gateway RFC · Token refresh', action: 'Move token refresh before expiry', owner: 'Ravi Mehta', due: 'Tomorrow',
  },
  {
    id: 'inbox', label: 'Shared mailbox', source: 'Northstar support mailbox', icon: Inbox,
    by: 'Jordan Lee · Northstar', initials: 'JL', time: '11:26',
    message: 'Our audit export is missing actor names. Could your team confirm when the corrected report will be ready?',
    context: 'Northstar account · Audit exports', action: 'Confirm actor names in audit export', owner: 'Customer success', due: 'Today',
  },
];

export default function WorkflowSpotlight() {
  const [activeId, setActiveId] = useState('chat');
  const [created, setCreated] = useState(false);
  const reduceMotion = useReducedMotion();
  const signal = SIGNALS.find((item) => item.id === activeId) ?? SIGNALS[0];
  const SignalIcon = signal.icon;

  const chooseSignal = (id) => {
    setActiveId(id);
    setCreated(false);
  };

  return (
    <section id="workflows" className="relative overflow-hidden bg-transparent py-28 text-white md:py-40">

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-8">
        <div className="max-w-lg">
          <p className="mb-6 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
            <span className="h-px w-7 bg-[#7779ee]" /> THE WORK, IN CONTEXT
          </p>
          <h2 className="text-[clamp(2.7rem,5.6vw,5rem)] font-medium leading-[0.95] tracking-[-0.065em] text-white">
            A signal comes in.
            <span className="mt-1 block font-serif font-normal italic tracking-[-0.055em] text-[#a7a9ff]">The work moves on.</span>
          </h2>
          <div className="mt-9 border-t border-white/[0.08] pt-5">
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.15em] text-slate-500">Start with</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3" role="group" aria-label="Choose an incoming signal">
              {SIGNALS.map((item, index) => {
                const Icon = item.icon;
                const selected = activeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => chooseSignal(item.id)}
                    className={cn(
                      'group inline-flex items-center gap-2 py-1 text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a7a9ff] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080a10]',
                      selected ? 'text-white' : 'text-slate-500 hover:text-slate-200'
                    )}
                  >
                    <span className={cn('font-mono text-[9px]', selected ? 'text-[#a7a9ff]' : 'text-slate-700')}>0{index + 1}</span>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mt-9 flex items-center gap-2 text-[11px] text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-[#a7a9ff]" aria-hidden="true" />
            The context follows the work.
          </div>
        </div>

        <div className="relative min-w-0">
          <div aria-hidden="true" className="absolute -inset-x-8 -inset-y-8 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_55%_45%,rgba(189,193,255,.18),rgba(255,255,255,.045)_34%,transparent_72%)] blur-xl" />
          <div aria-hidden="true" className="absolute inset-x-[5%] bottom-[-12px] top-5 rounded-[1.6rem] border border-indigo-100/[0.12] bg-[#dfe0e9] shadow-[0_34px_55px_-42px_rgba(0,0,0,.8)] lg:rotate-[1.2deg]" />
          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/90 bg-[#f4f4f7] p-3 shadow-[0_50px_110px_-68px_rgba(0,0,0,.72),0_2px_5px_rgba(27,30,46,.08),inset_0_1px_0_rgba(255,255,255,.96)] sm:p-5 lg:-rotate-[0.7deg] lg:transition-transform lg:duration-700 lg:hover:rotate-0">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white/55 to-transparent" />
            <div className="flex items-center justify-between border-b border-[#dfe0e7] px-2 pb-3 sm:px-3">
              <div className="flex items-center gap-2 text-[11px] font-medium text-[#4c5062]">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#e3e4eb] text-[#53586a]"><SignalIcon className="h-3.5 w-3.5" aria-hidden="true" /></span>
                <span className="truncate">{signal.source}</span>
              </div>
              <span className="ml-3 shrink-0 font-mono text-[9px] text-[#9a9dad]">{signal.time}</span>
            </div>

            <div className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1.08fr)_72px_minmax(0,.92fr)] sm:items-center sm:gap-2 sm:px-2 sm:py-8">
              <AnimatePresence mode="wait">
                <motion.div key={signal.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.22 }} className="relative rounded-xl border border-[#e3e4eb] bg-white px-4 py-4 shadow-[0_10px_24px_-22px_rgba(27,30,46,.35),inset_0_1px_0_rgba(255,255,255,.9)] sm:min-h-[190px] sm:p-5">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9eaf1] text-[9px] font-semibold text-[#5b5e70]">{signal.initials}</span>
                    <span className="text-[11px] font-medium text-[#414555]">{signal.by}</span>
                  </div>
                  <p className="text-[13px] leading-[1.75] text-[#55596a]">“{signal.message}”</p>
                  <div className="mt-5 flex items-center gap-2 border-t border-[#ececf1] pt-3 text-[10px] text-[#86899a]">
                    <FileText className="h-3 w-3 shrink-0 text-[#7779ee]" aria-hidden="true" />
                    <span className="truncate">{signal.context}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="relative hidden h-12 items-center justify-center sm:flex" aria-hidden="true">
                <svg viewBox="0 0 72 30" className="absolute inset-0 h-full w-full overflow-visible">
                  <path d="M1 15 C 22 15, 24 15, 36 15 S 50 15, 71 15" fill="none" stroke="#c3c5d2" strokeWidth="1.2" strokeDasharray="3 4" />
                  <motion.path key={`${signal.id}-signal`} d="M1 15 C 22 15, 24 15, 36 15 S 50 15, 71 15" fill="none" stroke="#8587f5" strokeWidth="1.5" strokeDasharray="4 68" initial={reduceMotion ? false : { strokeDashoffset: 72, opacity: 0 }} animate={reduceMotion ? { opacity: 0 } : { strokeDashoffset: 0, opacity: [0, 0.95, 0] }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }} />
                  <circle cx="36" cy="15" r="4" fill="#7779ee" />
                  <circle cx="36" cy="15" r="8" fill="#7779ee" fillOpacity=".12" />
                </svg>
              </div>

              <div className="relative rounded-xl bg-[#1b1e29] px-4 py-4 text-white shadow-[0_18px_38px_-25px_rgba(22,24,39,.55),inset_0_1px_0_rgba(255,255,255,.08)] sm:min-h-[190px] sm:px-5 sm:py-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#aaaebe]">Ukin agent suggestion</span>
                  <span className="rounded-full bg-white/[0.08] px-2 py-1 text-[9px] text-[#c6c8d2]">Review</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={`${signal.id}-task`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}>
                    <h3 className="mt-5 text-[16px] font-medium leading-6 tracking-[-0.02em] text-white">{signal.action}</h3>
                    <div className="mt-5 space-y-2.5 border-t border-white/[0.09] pt-4 text-[10px]">
                      <div className="flex items-center justify-between gap-3"><span className="text-[#8c90a0]">Owner</span><span className="text-[#e1e2e9]">{signal.owner}</span></div>
                      <div className="flex items-center justify-between gap-3"><span className="text-[#8c90a0]">Due</span><span className="text-[#e1e2e9]">{signal.due}</span></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <button type="button" disabled={created} onClick={() => setCreated(true)} className={cn('mt-5 flex min-h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-[11px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b5b8ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1b1e29] disabled:cursor-default', created ? 'bg-emerald-300/10 text-emerald-200' : 'bg-[#8587f5] text-white hover:bg-[#9597ff]')}>
                  {created ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Plus className="h-3.5 w-3.5" aria-hidden="true" />}
                  {created ? 'Added to the board' : 'Create task'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#dfe0e7] px-2 pt-3 text-[9px] text-[#979aa9] sm:px-3">
              <span>Conversation <span className="px-1 text-[#a1a4b1]">/</span> Context <span className="px-1 text-[#a1a4b1]">/</span> Action</span>
              <span>Interactive preview · sample data</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
