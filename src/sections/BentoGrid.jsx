import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  FileText,
  LockKeyhole,
  MessageSquare,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '../lib/cn';
import BrowserFrame from '../components/BrowserFrame';
import { useReveal } from '../lib/useReveal';

const LENSES = [
  { id: 'memory',     number: '01', label: 'Find past decisions',   hint: 'Search across conversations and docs', icon: Search },
  { id: 'control',    number: '02', label: 'Review agent work',     hint: 'People approve consequential changes',  icon: ShieldCheck },
  { id: 'boundaries', number: '03', label: 'Set access boundaries', hint: 'Agents inherit workspace permissions',  icon: LockKeyhole },
];

/* ─── Cursor-tracking 3D tilt ─── */
function TiltCard({ children, className, style, maxTilt = 8 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width  - 0.5;
    const dy = (e.clientY - r.top)  / r.height - 0.5;
    setT({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '1100px', perspectiveOrigin: '50% 50%', ...style }}
    >
      <div style={{
        transform: t.on
          ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(1.01)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transition: t.on ? 'transform 90ms ease-out' : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
        transformOrigin: '50% 50%', willChange: 'transform',
        position: 'relative', borderRadius: 'inherit',
      }}>
        {children}
        {t.on && !reduceMotion && (
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(165,180,252,0.08) 0%, transparent 55%)`,
            mixBlendMode: 'screen', zIndex: 10,
          }} />
        )}
      </div>
    </div>
  );
}

/* ─── Tab 1: Memory search ─── */
function MemoryView() {
  const [query, setQuery] = useState('What did we decide about launch?');
  const records = [
    { icon: MessageSquare, type: 'CONVERSATION', title: 'Launch planning · #product-launch', body: 'Hold the announcement until the regional pilot is confirmed.', time: 'Yesterday', highlight: true },
    { icon: FileText, type: 'DECISION NOTE', title: 'Launch decision note', body: 'Support will use one shared checklist for customer updates.', time: 'Updated 2h ago', highlight: false },
  ];
  const terms = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  const matches = records.filter((r) => terms.length === 0 || terms.some((t) => `${r.title} ${r.body} ${r.type}`.toLowerCase().includes(t)));

  return (
    <div className="relative z-10 mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Workspace memory</span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-1 text-[10px] text-slate-400">
          <Search className="h-3 w-3" /> Conversations + docs
        </span>
      </div>

      {/* Search input */}
      <label className="sr-only" htmlFor="memory-query">Search workspace memory</label>
      <div className="group flex items-center gap-3 rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-3 transition-colors focus-within:border-indigo-400/40">
        <Search className="h-4 w-4 shrink-0 text-indigo-300" />
        <input
          id="memory-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-w-0 flex-1 bg-transparent text-base font-light tracking-[-0.02em] text-slate-100 outline-none placeholder:text-obsidian-muted sm:text-lg"
          aria-label="Search workspace memory"
        />
        <span className="hidden rounded border border-obsidian-border-medium px-1.5 py-1 font-mono text-[9px] text-obsidian-muted sm:inline">⌘ K</span>
      </div>
      <div className="mt-2 pl-1 text-[10px] text-slate-500">Across conversations, notes, and active work</div>

      {/* Results */}
      <div className="mt-7 divide-y divide-white/[0.07]" aria-live="polite">
        {matches.map((record, i) => {
          const Icon = record.icon;
          return (
            <motion.div
              key={record.title}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.24 }}
              className={cn(
                'grid grid-cols-[26px_1fr] gap-3 py-4 first:pt-0 sm:grid-cols-[26px_1fr_auto] sm:gap-4',
                record.highlight && 'rounded-lg px-3 ring-1 ring-indigo-400/10',
              )}
              style={record.highlight ? { background: 'rgba(99,102,241,0.05)' } : {}}
            >
              <Icon className="mt-1 h-4 w-4 text-indigo-200/80" />
              <div>
                <p className="text-[9px] font-medium tracking-[0.14em] text-slate-400">{record.type}</p>
                <h3 className="mt-1 text-[13px] font-medium text-slate-200">{record.title}</h3>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">{record.body}</p>
              </div>
              <span className="hidden pt-1 text-[9px] text-slate-500 sm:block">{record.time}</span>
            </motion.div>
          );
        })}
        {matches.length === 0 && <p className="py-5 text-xs text-slate-500">No matching workspace context.</p>}
      </div>
    </div>
  );
}

/* ─── Tab 2: Agent approval ─── */
function ControlView() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="relative z-10 mx-auto grid max-w-3xl gap-10 sm:grid-cols-[1fr_0.7fr] sm:items-center sm:gap-14">
      <div>
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-obsidian-muted">Suggested action</span>
        <h3 className="mt-4 max-w-md text-2xl font-light leading-[1.1] tracking-[-0.04em] text-white sm:text-3xl">
          Publish this launch update to the team?
        </h3>
        <p className="mt-4 max-w-sm text-xs leading-6 text-slate-400">
          Ukin prepared a draft from the launch brief. It stays private until a person approves it.
        </p>
        <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-300/70" />
          No changes happen without explicit human approval
        </div>
        <button
          type="button"
          onClick={() => setApproved((v) => !v)}
          aria-pressed={approved}
          className={cn(
            'mt-6 inline-flex min-h-10 items-center gap-2 rounded-md px-3.5 text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus',
            approved
              ? 'bg-emerald-300/10 text-emerald-200 hover:bg-emerald-300/15'
              : 'bg-white text-[#12151c] shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-indigo-50',
          )}
        >
          {approved ? <Check className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          {approved ? 'Draft approved' : 'Review draft'}
        </button>
      </div>

      <div className="rounded-xl border border-obsidian-border-strong bg-white/[0.025] p-4 sm:pl-7">
        <div className="mb-4 flex items-center gap-2 text-[10px] text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-200" /> Review details
        </div>
        <div className="space-y-3">
          {[
            ['Draft', 'Team channel update'],
            ['Source', 'Launch brief'],
            ['Status', approved ? 'Approved by Maya' : 'Awaiting review'],
          ].map(([name, value]) => (
            <div key={name} className="flex items-start justify-between gap-4 border-t border-white/[0.075] pt-3">
              <span className="text-[11px] text-slate-300">{name}</span>
              <span className={cn('max-w-[135px] text-right text-[10px] leading-4', approved && name === 'Status' ? 'text-emerald-300' : 'text-slate-400')}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Tab 3: Access boundaries ─── */
function BoundariesView() {
  const policies = [
    { scope: 'Source access', access: 'Chat and Docs', state: 'Available',   icon: Search },
    { scope: 'Member scope',  access: 'Maya\u2019s channels', state: 'Inherited',   icon: ShieldCheck },
    { scope: 'External data', access: 'No external access', state: 'Restricted', icon: LockKeyhole },
  ];
  return (
    <div className="relative z-10 mx-auto max-w-3xl">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">Agent policy</span>
          <h3 className="mt-2 text-lg font-medium tracking-[-0.025em] text-white">Access follows the workspace.</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-2.5 py-1.5 text-[10px] text-emerald-200">
          <LockKeyhole className="h-3 w-3" /> Policy active
        </span>
      </div>

      <div className="divide-y divide-white/[0.09] rounded-xl border border-white/[0.07] bg-white/[0.02]">
        {policies.map(({ scope, access, state, icon: Icon }, i) => (
          <motion.div
            key={scope}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.24 }}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_160px_140px] sm:gap-6"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-obsidian-border-medium bg-white/[0.035] text-slate-300">
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-200">{scope}</p>
                <p className="mt-0.5 text-[10px] text-slate-500 sm:hidden">{access}</p>
              </div>
            </div>
            <span className="hidden text-[11px] text-slate-400 sm:block">{access}</span>
            <span className={cn(
              'justify-self-end rounded-full px-2.5 py-1 text-[9px] font-medium',
              state === 'Available'  ? 'bg-emerald-300/10 text-emerald-200' :
              state === 'Restricted' ? 'bg-rose-300/10 text-rose-200' :
                                       'bg-indigo-300/10 text-indigo-200',
            )}>
              {state}
            </span>
          </motion.div>
        ))}
      </div>

      <p className="mt-5 flex items-center gap-2 text-[11px] text-slate-400">
        <LockKeyhole className="h-3.5 w-3.5 text-indigo-200" />
        Ukin can only use information and actions available to the signed-in team member.
      </p>
    </div>
  );
}

export default function BentoGrid() {
  const [active, setActive] = useState('memory');
  const tabRefs = useRef([]);
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();
  const lens = LENSES.find((l) => l.id === active) ?? LENSES[0];
  const ActiveIcon = lens.icon;
  const content = active === 'memory' ? <MemoryView /> : active === 'control' ? <ControlView /> : <BoundariesView />;

  const handleTabKeyDown = (e, index) => {
    let next = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (index + 1) % LENSES.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (index - 1 + LENSES.length) % LENSES.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = LENSES.length - 1;
    else return;
    e.preventDefault();
    setActive(LENSES[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="platform" className="relative overflow-hidden bg-transparent py-20 md:py-28">
      {/* Decorative circles */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[30rem] top-1/4 h-[48rem] w-[48rem] rounded-full border border-border/40" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-[24rem] top-[30%] h-[36rem] w-[36rem] rounded-full border border-border/40" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* ── Header with Scroll Entrance ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle">
              <span className="h-px w-7 bg-brand" /> Memory · review · boundaries
            </p>
            <h2 className="max-w-2xl font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
              Useful AI, with<br className="hidden sm:block" /> clear boundaries.
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-ink-muted md:pb-1">
            Find past decisions, review suggested work, and keep agent access aligned to team policy.
          </p>
        </motion.div>

        {/* ── Tabs + BrowserFrame ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 border-t border-border pt-7 lg:grid-cols-[250px_1fr] lg:gap-16"
        >

          {/* Sidebar tabs */}
          <div role="tablist" aria-label="Explore how the workspace connects" className="flex gap-3 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {LENSES.map((item, index) => {
              const Icon = item.icon;
              const selected = active === item.id;
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabRefs.current[index] = el; }}
                  type="button"
                  role="tab"
                  id={`lens-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="lens-panel"
                  tabIndex={selected ? 0 : -1}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  onClick={() => setActive(item.id)}
                  className={cn(
                    'group relative min-w-[190px] flex-1 border-b border-border py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus lg:min-w-0 lg:flex-none lg:py-5',
                    selected ? 'text-ink' : 'text-ink-subtle hover:text-ink-soft',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn('font-mono text-[9px]', selected ? 'text-brand-text' : 'text-ink-muted')}>{item.number}</span>
                    <Icon className={cn('h-3.5 w-3.5', selected ? 'text-brand-text' : 'text-ink-subtle')} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </span>
                  <span className="mt-2 hidden pl-[3.45rem] text-[10px] text-ink-subtle lg:block">{item.hint}</span>
                  {selected && (
                    <motion.span
                      layoutId="lens-indicator"
                      className="absolute bottom-[-1px] left-0 right-0 h-px bg-brand/70 lg:right-auto lg:top-0 lg:h-auto lg:w-px"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* BrowserFrame with TiltCard */}
          <TiltCard maxTilt={4} className="rounded-[1.25rem]" style={{ borderRadius: '1.25rem' }}>
            <BrowserFrame address={`app.ultrakin.com/workspace/agents/${active}`}>
              <div
                id="lens-panel"
                role="tabpanel"
                aria-labelledby={`lens-tab-${active}`}
                className="relative isolate min-h-[400px] overflow-hidden bg-[#0b0e14] py-6 shadow-[0_18px_42px_-34px_rgba(0,0,0,.72),inset_0_1px_0_rgba(255,255,255,.055)] sm:py-8 lg:min-h-[430px] lg:px-10 lg:py-9"
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_44%,rgba(105,111,200,.12),transparent_56%),linear-gradient(132deg,rgba(255,255,255,.035),transparent_28%,transparent_74%,rgba(146,151,255,.035))]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.22 }}
                  >
                    {content}
                  </motion.div>
                </AnimatePresence>
              </div>
            </BrowserFrame>
          </TiltCard>
        </motion.div>

        {/* Footer label */}
        <div className="mt-5 flex items-center justify-between text-[9px] uppercase tracking-[0.14em] text-ink-subtle">
          <span className="flex items-center gap-2"><ActiveIcon className="h-3 w-3" /> {lens.label}</span>
          <span>Interactive lenses · sample data</span>
        </div>
      </div>
    </section>
  );
}
