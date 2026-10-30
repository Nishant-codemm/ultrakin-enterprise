import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/cn';
import BrowserFrame from '../components/BrowserFrame';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { useReveal } from '../lib/useReveal';

/* ─── Cursor-tracking 3D tilt wrapper for the whole orbit card ─── */
function TiltCard({ children, className }) {
  const cardRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const handleMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width;   // 0→1 left→right
    const dy = (e.clientY - rect.top)  / rect.height;  // 0→1 top→bottom
    // Max ±5deg tilt — subtle, premium, not aggressive
    setTilt({
      rx: (0.5 - dy) * 7,   // tilt up when cursor is at top
      ry: (dx - 0.5) * 9,   // tilt right when cursor is at right
      gx: dx * 100,
      gy: dy * 100,
      active: true,
    });
  }, [reduceMotion]);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn('relative hidden sm:block', className)}
      style={{
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      {/* The card itself — 3D tilts on cursor move */}
      <div
        style={{
          transform: tilt.active
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.012)`
            : 'rotateX(1.5deg) rotateY(-2deg) scale(1)',
          transition: tilt.active
            ? 'transform 100ms ease-out'
            : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
          transformOrigin: '50% 50%',
          willChange: 'transform',
          borderRadius: '1.25rem',
        }}
      >
        {children}

        {/* Edge spotlight — follows cursor along card border */}
        {tilt.active && !reduceMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300"
            style={{
              opacity: tilt.active ? 1 : 0,
              background: `radial-gradient(
                circle at ${tilt.gx}% ${tilt.gy}%,
                rgba(140,148,255,0.13) 0%,
                transparent 55%
              )`,
              mixBlendMode: 'screen',
            }}
          />
        )}
      </div>
    </div>
  );
}

const CATEGORIES = ['Built in', 'Extension examples'];
const INTEGRATIONS = [
  { name: 'Spaces',     category: 'Built in',          badge: 'Conversations',                      desc: 'Spaces, direct messages, and huddles are where team signals arrive.',                        color: '#b9bbff', iconLetter: 'SP',  point: [112, 78]  },
  { name: 'Mail',       category: 'Built in',          badge: 'Business · shared mailbox',          desc: 'Route customer email into owned work and connected threads.',                               color: '#c6c9ff', iconLetter: 'ML',  point: [310, 48]  },
  { name: 'Meetings',   category: 'Built in',          badge: 'Live collaboration',                  desc: 'Meet, capture the important context, and carry the next step forward.',                     color: '#aeb3ff', iconLetter: 'MT',  point: [510, 78]  },
  { name: 'Tasks',      category: 'Built in',          badge: 'Follow-through',                     desc: 'Give every next step an owner and a place to move toward done.',                            color: '#a6d4c4', iconLetter: 'TK',  point: [548, 210] },
  { name: 'Calendar',   category: 'Built in',          badge: 'Time and availability',              desc: 'Keep schedules and team availability inside the same workspace.',                           color: '#e1c38b', iconLetter: 'CA',  point: [505, 342] },
  { name: 'Docs',       category: 'Built in',          badge: 'Shared context',                     desc: 'Keep knowledge close to the work and decisions it informs.',                               color: '#c4b6ff', iconLetter: 'DC',  point: [310, 370] },
  { name: 'Ukin agent', category: 'Built in',          badge: 'Intelligence across the workspace',  desc: 'Ukin works across workspace context to surface and move work forward.',                     color: '#d0d2ff', iconLetter: 'UK',  point: [112, 342] },
  { name: 'GitHub',     category: 'Extension examples',badge: 'Illustrative · developer tools',    desc: 'An example of how developer-tool context could sit alongside team work.',                   color: '#c0c6d2', iconLetter: 'GH',  point: [130, 84]  },
  { name: 'PostHog',    category: 'Extension examples',badge: 'Illustrative · product analytics',  desc: 'An example of keeping product analytics context close to team work.',                       color: '#e9b18a', iconLetter: 'PH',  point: [490, 68]  },
  { name: 'MCP tools',  category: 'Extension examples',badge: 'Illustrative · external tools',     desc: 'An example of connecting approved external tools through MCP.',                             color: '#a8c9c2', iconLetter: 'MCP', point: [550, 202] },
  { name: 'Journeys',   category: 'Extension examples',badge: 'Illustrative · app ecosystem',      desc: 'An example of extending the workspace with an installable app.',                           color: '#c6b5f2', iconLetter: 'JR',  point: [490, 344] },
  { name: 'Forms',      category: 'Extension examples',badge: 'Illustrative · structured intake',  desc: 'An example of bringing structured requests into the team workspace.',                       color: '#a8c1ec', iconLetter: 'FM',  point: [145, 350] },
  { name: 'Lists',      category: 'Extension examples',badge: 'Illustrative · lightweight tracking',desc: 'An example of adding lightweight tracking alongside team work.',                           color: '#b5d3a5', iconLetter: 'LS',  point: [100, 213] },
];

const CENTER = [310, 210];

const PREVIEWS = {
  Spaces:      { surface: 'launch-planning',       actor: 'Maya Chen',       message: 'The handoff is ready for review. I linked the launch checklist here.',          outcome: 'Decision captured in the launch brief',     icon: 'SC' },
  Mail:        { surface: 'shared inbox',           actor: 'Customer success',message: 'We need to move our onboarding session to Thursday.',                           outcome: 'Reply drafted · follow-up assigned',        icon: 'ML' },
  Meetings:    { surface: 'product sync · 10:30',   actor: 'Huddle notes',    message: 'The team agreed to keep the beta invite-only through launch week.',              outcome: 'Summary ready for the team',                icon: 'MT' },
  Tasks:       { surface: 'launch checklist',       actor: 'Jon Bell',        message: 'Review beta onboarding flow',                                                   outcome: 'In progress · due today',                   icon: 'TK' },
  Calendar:    { surface: 'team calendar',          actor: 'Next up · 2:30 PM',message: 'Beta readiness review · 4 attendees',                                          outcome: 'Agenda linked to launch planning',          icon: 'CA' },
  Docs:        { surface: 'launch brief',           actor: 'Updated just now', message: 'Beta scope, owners, and launch criteria in one shared document.',              outcome: 'Connected to 3 decisions',                  icon: 'DC' },
  'Ukin agent':{ surface: 'workspace signal',       actor: 'Ukin noticed',    message: 'The same onboarding question came up in three conversations this week.',        outcome: 'Suggested: add it to the launch brief',     icon: 'UK' },
};

/* ─── Quadratic bezier path helper ─── */
function qPath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 22;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

/* ─── Animated particle dots flowing along each connection line ─── */
/* Uses strokeDashoffset technique — guaranteed cross-browser on SVG paths */
function FlowingParticle({ d, color, delay, duration, isActive }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const dashLen = isActive ? 8 : 5;
  const gapLen  = isActive ? 180 : 220;
  const total   = dashLen + gapLen;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={isActive ? 2.5 : 1.8}
      strokeLinecap="round"
      strokeDasharray={`${dashLen} ${gapLen}`}
      filter={isActive ? 'url(#particle-glow)' : 'url(#particle-blur)'}
      initial={{ strokeDashoffset: total, opacity: 0 }}
      animate={{
        strokeDashoffset: [total, -total * 0.15],
        opacity: [0, isActive ? 0.95 : 0.7, isActive ? 0.95 : 0.7, 0],
      }}
      transition={{
        strokeDashoffset: { duration, delay, repeat: Infinity, ease: 'linear', repeatDelay: 0.3 },
        opacity: { duration, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3, times: [0, 0.1, 0.9, 1] },
      }}
    />
  );
}

/* ─── Pulsing ring from the center core ─── */
function PulsingRing({ r, delay }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <motion.circle cx={CENTER[0]} cy={CENTER[1]} r={r} fill="none"
      stroke="rgba(120,122,255,0.18)" strokeWidth="1"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: [0.85, 1.25], opacity: [0.5, 0] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, ease: 'easeOut' }}
      style={{ transformOrigin: `${CENTER[0]}px ${CENTER[1]}px` }}
    />
  );
}

/* ─── 3D magnetic node button ─── */
function NodeButton({ item, isSelected, onClick }) {
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rx: -dy * 18, ry: dx * 18, gx: (e.clientX - rect.left) / rect.width * 100, gy: (e.clientY - rect.top) / rect.height * 100 });
  }, [reduceMotion]);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
    setHovered(false);
  }, []);

  const [x, y] = item.point;

  return (
    /* Outer motion.div: Framer enter/exit animations + absolute positioning.
       3D tilt is applied as CSS on this same element so Framer's scale doesn't conflict. */
    <motion.div
      key={item.name}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.22 }}
      style={{
        position: 'absolute',
        left: `${(x / 620) * 100}%`,
        top: `${(y / 420) * 100}%`,
        /* -22px = half icon tile height (h-11 = 44px).
           Pins the icon tile CENTER precisely on the SVG point coordinate
           so connection lines terminate exactly at the icon center. */
        translateX: '-50%',
        translateY: '-22px',
        zIndex: 20,
      }}
    >
      {/* Inner div: CSS-only 3D tilt, separate from Framer scale so they don't conflict */}
      <div
        ref={nodeRef}
        style={{
          transform: `perspective(280px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: hovered ? 'transform 80ms ease-out' : 'transform 400ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <button
          type="button"
          aria-pressed={isSelected}
          onClick={onClick}
          onMouseMove={handleMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleLeave}
          style={{ '--node-color': item.color }}
          className={cn(
            'group flex flex-col items-center gap-2 rounded-xl p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus',
            isSelected ? 'text-white' : 'text-obsidian-muted hover:text-slate-200',
          )}
        >
          {/* Node icon tile */}
          <span
            className={cn(
              'relative flex h-11 w-11 items-center justify-center rounded-xl border text-[10px] font-semibold tracking-tight overflow-hidden',
              isSelected
                ? 'border-white/30 bg-[#1a2038]'
                : 'border-white/[0.07] bg-[#0d1118] group-hover:border-white/20',
            )}
            style={{
              color: item.color,
              boxShadow: isSelected
                ? `0 0 0 1px ${item.color}33, 0 8px 32px -10px ${item.color}88, inset 0 1px 0 rgba(255,255,255,0.12)`
                : hovered
                ? `0 0 0 1px ${item.color}22, 0 4px 16px -6px ${item.color}55`
                : 'none',
              transition: 'box-shadow 200ms ease',
            }}
          >
            {/* Inner spotlight gradient on hover */}
            {hovered && !reduceMotion && (
              <span
                className="pointer-events-none absolute inset-0 rounded-xl"
                style={{
                  background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${item.color}28 0%, transparent 65%)`,
                }}
              />
            )}
            {/* Specular top sheen */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/[0.07] to-transparent" />
            {item.iconLetter}
          </span>

          {/* Label */}
          <span className="max-w-[120px] whitespace-nowrap text-[9px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {item.name}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Surface preview card ─── */
function SurfacePreview({ item }) {
  const preview = PREVIEWS[item.name] ?? {
    surface: item.name.toLowerCase(),
    actor: `${item.name} · illustrative example`,
    message: `Illustrative view of how ${item.name} context could sit alongside team work.`,
    outcome: 'Availability depends on workspace and plan',
    icon: item.iconLetter,
  };

  return (
    <BrowserFrame address={`app.ultrakin.com/workspace/${item.name.toLowerCase().replaceAll(' ', '-')}`} className="mt-6 max-w-md">
      <div className="overflow-hidden bg-[#0d1118]/90 shadow-[0_18px_44px_-34px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.035)]">
        <div className="flex items-center justify-between border-b border-obsidian-border-soft px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-obsidian-border bg-white/[0.04] font-mono text-[8px] text-indigo-200">{preview.icon}</span>
            <span className="truncate text-[10px] font-medium text-slate-300">{preview.surface}</span>
          </div>
          <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[9px] text-obsidian-muted">
            <span className={cn('h-1.5 w-1.5 rounded-full', item.category === 'Built in' ? 'bg-emerald-300/80' : 'bg-slate-400/70')} />
            {item.category === 'Built in' ? 'Sample view' : 'Example only'}
          </span>
        </div>
        <div className="px-3.5 py-3">
          <p className="text-[9px] text-obsidian-muted">{preview.actor}</p>
          <p className="mt-1.5 text-[11px] leading-[1.55] text-slate-300">{preview.message}</p>
          <div className="mt-3 flex items-center gap-2 border-t border-obsidian-border-soft pt-2.5 text-[9px] text-indigo-100/75">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-indigo-300/10 text-[9px] text-indigo-200">↗</span>
            <span className="truncate">{preview.outcome}</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ─── Main section ─── */
export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('Built in');
  const [selected, setSelected]       = useState('Spaces');
  const [sectionRef, inView]          = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();

  const visible = INTEGRATIONS.filter((item) => item.category === selectedCat);
  const current = visible.find((item) => item.name === selected) ?? visible[0];

  const selectCategory = (category) => {
    setSelectedCat(category);
    if (!INTEGRATIONS.some((item) => item.name === selected && item.category === category)) {
      setSelected(INTEGRATIONS.find((item) => item.category === category)?.name ?? 'Spaces');
    }
  };

  return (
    <section ref={sectionRef} id="integrations" className="relative overflow-hidden bg-transparent py-20 md:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#879088]/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header with Scroll Entrance */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle"><span className="h-px w-7 bg-brand" /> BUILT IN, THEN OPEN</p>
            <h2 className="max-w-xl font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">One workspace.<br /><span className="font-display italic text-ink-muted">Room to extend.</span></h2>
          </div>
          <div className="lg:justify-self-end lg:pb-1">
            <p className="max-w-sm text-[13px] leading-6 text-ink-muted">Chat, mail, meetings, calendar, tasks, docs, and Ukin are built into one workspace. External entries are illustrative examples.</p>
            <a href="#workspace-showcase" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
              Explore the workspace <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="mt-12 border-y border-border py-4">
          <div role="group" aria-label="Explore workspace surfaces and extensions" className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button key={category} type="button" aria-pressed={selectedCat === category} onClick={() => selectCategory(category)}
                className={cn('shrink-0 rounded-full px-3 py-1.5 text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                  selectedCat === category ? 'bg-brand-soft text-brand-text' : 'text-ink-subtle hover:bg-surface-hover hover:text-ink-soft')}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Orbit map + detail */}
        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,.8fr)] lg:items-center lg:gap-12">

          {/* ── Orbit Map — wrapped in cursor-tracking TiltCard ── */}
          <TiltCard>
            <BrowserFrame
              address="app.ultrakin.com/workspace/integrations"
            >
            <div
              className="relative h-[420px] overflow-hidden"
              style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(62,68,160,0.18) 0%, rgba(15,19,28,0.92) 55%, #080b12 100%)' }}
              aria-label="Connected tools map"
            >

              {/* ── SVG layer: static paths + animated particles ── */}
              <svg
                viewBox="0 0 620 420"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label={`Connections from Ultrakin to ${selectedCat.toLowerCase()}`}
              >
                <defs>
                  {/* Gradient for base lines */}
                  <linearGradient id="orbit-line" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#9295f8" stopOpacity=".35" />
                    <stop offset="1" stopColor="#a9afbd" stopOpacity=".08" />
                  </linearGradient>
                  {/* Glow gradient for active line */}
                  <linearGradient id="orbit-line-active" x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#a5b4fc" stopOpacity="1" />
                    <stop offset="1" stopColor="#818cf8" stopOpacity="0.4" />
                  </linearGradient>
                  {/* Core radial */}
                  <radialGradient id="orbit-core">
                    <stop stopColor="#7779ee" stopOpacity=".22" />
                    <stop offset="1" stopColor="#7779ee" stopOpacity="0" />
                  </radialGradient>
                  {/* Soft glow filter for particles */}
                  <filter id="particle-blur" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="1.5" />
                  </filter>
                  {/* Stronger glow for selected particle */}
                  <filter id="particle-glow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Subtle orbit ellipses */}
                <ellipse cx={CENTER[0]} cy={CENTER[1]} rx="236" ry="152" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="1 10" />
                <ellipse cx={CENTER[0]} cy={CENTER[1]} rx="160" ry="100" fill="none" stroke="rgba(255,255,255,0.05)" />
                <circle  cx={CENTER[0]} cy={CENTER[1]} r="82" fill="url(#orbit-core)" />

                {/* Pulsing rings from center */}
                {!reduceMotion && <>
                  <PulsingRing r={52} delay={0} />
                  <PulsingRing r={52} delay={1.4} />
                </>}

                {/* Base static connection lines */}
                <AnimatePresence>
                  {visible.map((item) => {
                    const d = qPath(CENTER[0], CENTER[1], item.point[0], item.point[1]);
                    const isActive = item.name === current.name;
                    return (
                      <motion.path
                        key={item.name}
                        d={d}
                        fill="none"
                        stroke={isActive ? 'url(#orbit-line-active)' : 'url(#orbit-line)'}
                        strokeWidth={isActive ? 1.5 : 0.8}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: isActive ? 0.9 : 0.55 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    );
                  })}
                </AnimatePresence>

                {/* Flowing particle dots along each line */}
                {!reduceMotion && (
                  <AnimatePresence>
                    {visible.map((item, i) => {
                      const d = qPath(CENTER[0], CENTER[1], item.point[0], item.point[1]);
                      const isActive = item.name === current.name;
                      return (
                        <FlowingParticle
                          key={`particle-${item.name}`}
                          d={d}
                          color={isActive ? '#a5b4fc' : item.color}
                          delay={i * 0.32}
                          duration={isActive ? 1.6 : 2.4}
                          isActive={isActive}
                        />
                      );
                    })}
                  </AnimatePresence>
                )}

                {/* Endpoint dots */}
                {visible.map((item) => (
                  <circle
                    key={`dot-${item.name}`}
                    cx={item.point[0]}
                    cy={item.point[1]}
                    r={item.name === current.name ? 3.5 : 2}
                    fill={item.color}
                    fillOpacity={item.name === current.name ? 1 : 0.7}
                    style={{
                      filter: item.name === current.name ? `drop-shadow(0 0 5px ${item.color})` : 'none',
                    }}
                  />
                ))}
              </svg>

              {/* ── Center logo core ── */}
              <div
                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ filter: 'drop-shadow(0 0 24px rgba(120,122,255,0.35))' }}
              >
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[1.7rem] border border-white/[0.16] bg-[linear-gradient(145deg,#1e2540,#0d1118_68%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.16),inset_0_-1px_0_rgba(144,148,255,.15)]">
                  {/* Specular sheen */}
                  <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.09] to-transparent" />
                  <UltrakinLogo size={38} />
                </div>
              </div>

              {/* ── 3D Node buttons ── */}
              <AnimatePresence mode="popLayout">
                {visible.map((item) => (
                  <NodeButton
                    key={item.name}
                    item={item}
                    isSelected={item.name === current.name}
                    onClick={() => setSelected(item.name)}
                  />
                ))}
              </AnimatePresence>

            </div>
          </BrowserFrame>
          </TiltCard>

          {/* ── Detail panel ── */}
          <div className="relative min-h-[250px] border-l border-border pl-6 sm:pl-8 lg:min-h-[290px] lg:pl-10">
            <div aria-hidden="true" className="absolute -left-px top-0 h-8 w-px bg-brand/70" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-brand-text">{current.badge}</p>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-ink sm:text-4xl">{current.name}</h3>
                <p className="mt-4 max-w-sm text-[13px] leading-6 text-ink-muted">{current.desc}</p>
                <SurfacePreview item={current} />
                <div className="mt-8 flex items-center gap-3 text-[10px] text-ink-subtle">
                  <span className="h-px w-8 bg-border-strong" />
                  <span>{current.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile node list */}
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-0 border-t border-border sm:hidden">
              {visible.map((item) => (
                <button key={item.name} type="button" aria-pressed={item.name === current.name}
                  onClick={() => setSelected(item.name)}
                  className={cn('flex min-h-11 items-center gap-2 border-b border-border text-left text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                    item.name === current.name ? 'text-brand-text' : 'text-ink-subtle hover:text-ink-soft')}>
                  <span className="font-mono text-[9px]" style={{ color: item.color }}>{item.iconLetter}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
