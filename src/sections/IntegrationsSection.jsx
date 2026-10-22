import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';
import UltrakinLogo from '../components/primitives/UltrakinLogo';

const CATEGORIES = ['Built in', 'Extensions'];
const INTEGRATIONS = [
  { name: 'Spaces', category: 'Built in', badge: 'Conversations', desc: 'Spaces, direct messages, and huddles are where team signals arrive.', color: '#b9bbff', iconLetter: 'SP', point: [112, 78] },
  { name: 'Mail', category: 'Built in', badge: 'Business · shared mailbox', desc: 'Route customer email into owned work and connected threads.', color: '#c6c9ff', iconLetter: 'ML', point: [310, 48] },
  { name: 'Meetings', category: 'Built in', badge: 'Live collaboration', desc: 'Meet, capture the important context, and carry the next step forward.', color: '#aeb3ff', iconLetter: 'MT', point: [510, 78] },
  { name: 'Tasks', category: 'Built in', badge: 'Follow-through', desc: 'Give every next step an owner and a place to move toward done.', color: '#a6d4c4', iconLetter: 'TK', point: [548, 210] },
  { name: 'Calendar', category: 'Built in', badge: 'Time and availability', desc: 'Keep schedules and team availability inside the same workspace.', color: '#e1c38b', iconLetter: 'CA', point: [505, 342] },
  { name: 'Docs', category: 'Built in', badge: 'Shared context', desc: 'Keep knowledge close to the work and decisions it informs.', color: '#c4b6ff', iconLetter: 'DC', point: [310, 370] },
  { name: 'Ukin agent', category: 'Built in', badge: 'Intelligence across the workspace', desc: 'Ukin works across workspace context to surface and move work forward.', color: '#d0d2ff', iconLetter: 'UK', point: [112, 342] },
  { name: 'GitHub', category: 'Extensions', badge: 'App · developer tools', desc: 'Bring GitHub into the workspace as an installable app.', color: '#c0c6d2', iconLetter: 'GH', point: [130, 84] },
  { name: 'PostHog', category: 'Extensions', badge: 'App · product analytics', desc: 'Keep product analytics available alongside team work.', color: '#e9b18a', iconLetter: 'PH', point: [490, 68] },
  { name: 'MCP tools', category: 'Extensions', badge: 'Approved external tools', desc: 'Connect external tools through MCP, with availability governed by plan and workspace controls.', color: '#a8c9c2', iconLetter: 'MCP', point: [550, 202] },
  { name: 'Journeys', category: 'Extensions', badge: 'Installable app', desc: 'Extend the workspace with Journeys from the Ultrakin app ecosystem.', color: '#c6b5f2', iconLetter: 'JR', point: [490, 344] },
  { name: 'Forms', category: 'Extensions', badge: 'Installable app', desc: 'Bring structured intake into the same place teams act on requests.', color: '#a8c1ec', iconLetter: 'FM', point: [145, 350] },
  { name: 'Lists', category: 'Extensions', badge: 'Installable app', desc: 'Extend the workspace with lightweight tracking.', color: '#b5d3a5', iconLetter: 'LS', point: [100, 213] },
];

const CENTER = [310, 210];

const PREVIEWS = {
  Spaces: { surface: 'launch-planning', actor: 'Maya Chen', message: 'The handoff is ready for review. I linked the launch checklist here.', outcome: 'Decision captured in the launch brief', icon: 'SC' },
  Mail: { surface: 'shared inbox', actor: 'Customer success', message: 'We need to move our onboarding session to Thursday.', outcome: 'Reply drafted · follow-up assigned', icon: 'ML' },
  Meetings: { surface: 'product sync · 10:30', actor: 'Huddle notes', message: 'The team agreed to keep the beta invite-only through launch week.', outcome: 'Summary ready for the team', icon: 'MT' },
  Tasks: { surface: 'launch checklist', actor: 'Jon Bell', message: 'Review beta onboarding flow', outcome: 'In progress · due today', icon: 'TK' },
  Calendar: { surface: 'team calendar', actor: 'Next up · 2:30 PM', message: 'Beta readiness review · 4 attendees', outcome: 'Agenda linked to launch planning', icon: 'CA' },
  Docs: { surface: 'launch brief', actor: 'Updated just now', message: 'Beta scope, owners, and launch criteria in one shared document.', outcome: 'Connected to 3 decisions', icon: 'DC' },
  'Ukin agent': { surface: 'workspace signal', actor: 'Ukin noticed', message: 'The same onboarding question came up in three conversations this week.', outcome: 'Suggested: add it to the launch brief', icon: 'UK' },
};

function SurfacePreview({ item }) {
  const preview = PREVIEWS[item.name] ?? {
    surface: item.name.toLowerCase(),
    actor: `${item.name} · connected`,
    message: `Bring ${item.name} context alongside the work your team is already doing.`,
    outcome: 'Available in the shared workspace',
    icon: item.iconLetter,
  };

  return (
    <div className="mt-6 max-w-md overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d1118]/90 shadow-[0_18px_44px_-34px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.035)]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] font-mono text-[8px] text-indigo-200">{preview.icon}</span>
          <span className="truncate text-[10px] font-medium text-slate-300">{preview.surface}</span>
        </div>
        <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[9px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />In context</span>
      </div>
      <div className="px-3.5 py-3">
        <p className="text-[9px] text-slate-500">{preview.actor}</p>
        <p className="mt-1.5 text-[11px] leading-[1.55] text-slate-300">{preview.message}</p>
        <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-2.5 text-[9px] text-indigo-100/75">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-300/10 text-[9px] text-indigo-200">↗</span>
          <span className="truncate">{preview.outcome}</span>
        </div>
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('Built in');
  const [selected, setSelected] = useState('Spaces');
  const visible = INTEGRATIONS.filter((item) => item.category === selectedCat);
  const current = visible.find((item) => item.name === selected) ?? visible[0];

  const selectCategory = (category) => {
    setSelectedCat(category);
    if (!INTEGRATIONS.some((item) => item.name === selected && item.category === category)) {
      setSelected(INTEGRATIONS.find((item) => item.category === category)?.name ?? 'Spaces');
    }
  };

  return (
    <section id="integrations" className="relative overflow-hidden bg-transparent py-28 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500"><span className="h-px w-7 bg-indigo-300/70" /> BUILT IN, THEN OPEN</p>
            <h2 className="max-w-xl text-[clamp(2.6rem,5vw,4.6rem)] font-medium leading-[0.96] tracking-[-0.06em] text-white">One workspace.<br /><span className="font-serif font-normal italic text-slate-400">Room to extend.</span></h2>
          </div>
          <div className="lg:justify-self-end lg:pb-1">
            <p className="max-w-sm text-[13px] leading-6 text-slate-400">Chat, mail, meetings, calendar, tasks, docs, and Ukin share one workspace. Add apps and approved MCP tools when the work calls for them.</p>
            <a href="#workspace-showcase" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">
              Explore the workspace <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-y border-white/[0.075] py-4">
          <div role="group" aria-label="Explore workspace surfaces and extensions" className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button key={category} type="button" aria-pressed={selectedCat === category} onClick={() => selectCategory(category)} className={cn('shrink-0 rounded-full px-3 py-1.5 text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300', selectedCat === category ? 'bg-white/[0.1] text-white' : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-300')}>
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,.8fr)] lg:items-center lg:gap-12">
          <div className="relative hidden h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.055] bg-[radial-gradient(ellipse_at_48%_46%,rgba(112,119,219,.11),rgba(15,19,28,.12)_35%,transparent_72%)] shadow-[inset_0_1px_0_rgba(255,255,255,.045),0_46px_90px_-75px_rgba(0,0,0,.9)] sm:block sm:[transform:perspective(1300px)_rotateX(3deg)_rotateY(-4deg)] sm:[transform-origin:52%_48%] sm:transition-transform sm:duration-700 sm:hover:[transform:perspective(1300px)_rotateX(0deg)_rotateY(0deg)]" aria-label="Connected tools map">
            <svg viewBox="0 0 620 420" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" role="img" aria-label={`Connections from Ultrakin to ${selectedCat.toLowerCase()}`}>
              <defs>
                <linearGradient id="orbit-line" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#9295f8" stopOpacity=".3" /><stop offset="1" stopColor="#a9afbd" stopOpacity=".1" /></linearGradient>
                <radialGradient id="orbit-core"><stop stopColor="#7779ee" stopOpacity=".15" /><stop offset="1" stopColor="#7779ee" stopOpacity="0" /></radialGradient>
              </defs>
              <ellipse cx={CENTER[0]} cy={CENTER[1]} rx="236" ry="152" fill="none" stroke="rgba(255,255,255,.05)" strokeDasharray="1 8" />
              <ellipse cx={CENTER[0]} cy={CENTER[1]} rx="172" ry="108" fill="none" stroke="rgba(255,255,255,.06)" />
              <circle cx={CENTER[0]} cy={CENTER[1]} r="76" fill="url(#orbit-core)" />
              {visible.map((item) => <motion.path key={item.name} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .7 }} exit={{ opacity: 0 }} transition={{ duration: .45 }} d={`M ${CENTER[0]} ${CENTER[1]} Q ${(CENTER[0] + item.point[0]) / 2} ${(CENTER[1] + item.point[1]) / 2 - 18} ${item.point[0]} ${item.point[1]}`} fill="none" stroke="url(#orbit-line)" strokeWidth="1" />)}
              {visible.map((item) => <circle key={`${item.name}-endpoint`} cx={item.point[0]} cy={item.point[1]} r="2.5" fill={item.color} fillOpacity=".8" />)}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-10 flex h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[1.6rem] border border-white/[0.15] bg-[linear-gradient(145deg,#1a2030,#0d1118_68%)] shadow-[0_28px_55px_-24px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.14),inset_0_-1px_0_rgba(144,148,255,.12)]">
              <UltrakinLogo size={38} id="integration-core-logo" />
            </div>

            <AnimatePresence mode="popLayout">
              {visible.map((item, index) => {
                const isSelected = item.name === current.name;
                const [x, y] = item.point;
                return (
                  <motion.button key={item.name} layout initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .92 }} transition={{ duration: .22, delay: index * .025 }} type="button" aria-pressed={isSelected} onClick={() => setSelected(item.name)} style={{ left: `${(x / 620) * 100}%`, top: `${(y / 420) * 100}%`, '--node-color': item.color }} className={cn('group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300', isSelected ? 'text-white' : 'text-slate-500 hover:text-slate-200')}>
                    <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl border text-[10px] font-semibold tracking-tight transition-[background-color,border-color,box-shadow] duration-200', isSelected ? 'border-white/[0.22] bg-[#171d29] shadow-[0_8px_28px_-12px_var(--node-color)]' : 'border-white/[0.07] bg-[#0d1118] group-hover:border-white/[0.14]')} style={{ color: item.color }}>{item.iconLetter}</span>
                    <span className="max-w-[120px] whitespace-nowrap text-[9px] font-medium tracking-wide">{item.name}</span>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="relative min-h-[250px] border-l border-white/[0.08] pl-6 sm:pl-8 lg:min-h-[290px] lg:pl-10">
            <div aria-hidden="true" className="absolute -left-px top-0 h-8 w-px bg-indigo-200/70" />
            <AnimatePresence mode="wait">
              <motion.div key={current.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2 }}>
                <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-indigo-200/70">{current.badge}</p>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">{current.name}</h3>
                <p className="mt-4 max-w-sm text-[13px] leading-6 text-slate-400">{current.desc}</p>
                <SurfacePreview item={current} />
                <div className="mt-8 flex items-center gap-3 text-[10px] text-slate-600">
                  <span className="h-px w-8 bg-white/15" />
                  <span>{current.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-0 border-t border-white/[0.075] sm:hidden">
              {visible.map((item) => <button key={item.name} type="button" aria-pressed={item.name === current.name} onClick={() => setSelected(item.name)} className={cn('flex min-h-11 items-center gap-2 border-b border-white/[0.06] text-left text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300', item.name === current.name ? 'text-white' : 'text-slate-500')}><span className="font-mono text-[9px]" style={{ color: item.color }}>{item.iconLetter}</span>{item.name}</button>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
