import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, FileCheck2, KeyRound, MapPinned, Plus } from 'lucide-react';
import { cn } from '../lib/cn';

const TOPICS = [
  { id: 'assurance', number: '01', icon: FileCheck2, title: 'Assurance and compliance', description: 'Ask which reports, certifications, and contractual materials are currently available.' },
  { id: 'identity', number: '02', icon: KeyRound, title: 'Identity and access', description: 'Discuss authentication, provisioning, roles, and administrative controls.' },
  { id: 'data', number: '03', icon: MapPinned, title: 'Data handling', description: 'Confirm hosting regions, retention, deletion, and backup behavior for your use case.' },
];

export default function SecuritySection() {
  const [active, setActive] = useState('assurance');

  return (
    <section id="security" className="relative overflow-hidden bg-transparent py-24 text-white md:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute right-[-15rem] top-[-18rem] h-[42rem] w-[42rem] rounded-full border border-white/[0.025]" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-6 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-7 bg-indigo-300/70" /> A straight conversation about trust</p>
          <h2 className="text-[clamp(2.5rem,4.5vw,4.2rem)] font-medium leading-[0.98] tracking-[-0.06em]">Enterprise trust is earned in the details.</h2>
          <p className="mt-6 max-w-md text-[13px] leading-6 text-slate-400">This preview does not include supporting security or compliance documents. Ask the Ultrakin team for current product details before making an evaluation decision.</p>
          <a href="mailto:sales@ultrakin.com?subject=Ultrakin%20security%20and%20deployment%20questions" className="mt-7 inline-flex items-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
            Ask about your requirements <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="relative overflow-hidden border-y border-white/[0.075] bg-[linear-gradient(125deg,rgba(255,255,255,.025),transparent_40%,rgba(116,148,157,.035))] shadow-[inset_0_1px_0_rgba(255,255,255,.04)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[radial-gradient(ellipse_at_left,rgba(138,178,178,.075),transparent_72%)]" />
          {TOPICS.map((topic) => {
            const isOpen = active === topic.id;
            const Icon = topic.icon;
            const panelId = `security-topic-${topic.id}`;
            return (
              <div key={topic.id} className={cn('relative border-b border-white/[0.07] last:border-b-0 transition-colors duration-300', isOpen && 'bg-white/[0.018]')}>
                {isOpen && <motion.span layoutId="security-edge" className="absolute bottom-3 left-0 top-3 w-px bg-gradient-to-b from-transparent via-emerald-100/70 to-transparent" />}
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={isOpen ? panelId : undefined} onClick={() => setActive(isOpen ? null : topic.id)} className="group flex min-h-[76px] w-full items-center gap-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:gap-5">
                    <span className={cn('w-7 font-mono text-[9px] transition-colors', isOpen ? 'text-indigo-200' : 'text-slate-700')}>{topic.number}</span>
                    <Icon aria-hidden="true" className={cn('h-4 w-4 transition-colors', isOpen ? 'text-slate-200' : 'text-slate-600 group-hover:text-slate-400')} />
                    <span className={cn('flex-1 text-[13px] font-medium transition-colors', isOpen ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')}>{topic.title}</span>
                    <Plus aria-hidden="true" className={cn('h-4 w-4 text-slate-600 transition-transform duration-200', isOpen && 'rotate-45 text-indigo-200')} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={panelId} key={panelId} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }} className="overflow-hidden">
                      <p className="max-w-lg pb-6 pl-11 text-[12px] leading-6 text-slate-400 sm:pl-16">{topic.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
