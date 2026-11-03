import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  CheckSquare,
  Calendar,
  FileText,
  Sparkles,
  MessageSquare,
  Video,
  GitPullRequest,
  BarChart3,
  Cpu,
  Route,
  ClipboardList,
  ListTodo,
} from 'lucide-react';
import { cn } from '../lib/cn';
import BrowserFrame from '../components/BrowserFrame';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { useReveal } from '../lib/useReveal';

/* ─── 3D Tilt Context for synchronized perspective parallax ─── */
const TiltContext = createContext({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

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
    const dx = (e.clientX - rect.left) / rect.width;
    const dy = (e.clientY - rect.top) / rect.height;
    // Ultra subtle, premium tilt (max ±3.5deg)
    setTilt({
      rx: (0.5 - dy) * 3.5,
      ry: (dx - 0.5) * 4.5,
      gx: dx * 100,
      gy: dy * 100,
      active: true,
    });
  }, [reduceMotion]);

  const handleLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  }, []);

  return (
    <TiltContext.Provider value={tilt}>
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
        <div
          style={{
            transform: tilt.active
              ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.006)`
              : 'rotateX(0.8deg) rotateY(-1deg) scale(1)',
            transition: tilt.active
              ? 'transform 120ms ease-out'
              : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
            transformOrigin: '50% 50%',
            willChange: 'transform',
            borderRadius: '1.25rem',
          }}
        >
          {children}

          {/* Soft edge spotlight */}
          {tilt.active && !reduceMotion && (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-[1.25rem] opacity-0 transition-opacity duration-300"
              style={{
                opacity: tilt.active ? 1 : 0,
                background: `radial-gradient(
                  circle at ${tilt.gx}% ${tilt.gy}%,
                  rgba(140,148,255,0.08) 0%,
                  transparent 50%
                )`,
                mixBlendMode: 'screen',
              }}
            />
          )}
        </div>
      </div>
    </TiltContext.Provider>
  );
}

const CATEGORIES = ['Built in', 'Extension examples'];

/* ─── Product Icon & Badge Mapping matching Navigation Mega-Menu ─── */
const PRODUCT_ICON_CONFIG = {
  Spaces:      { icon: MessageSquare, bg: 'bg-[#5c5bd6]', glow: '#5c5bd6' },
  Mail:        { icon: Mail,          bg: 'bg-[#dc2626]', glow: '#dc2626' },
  Meetings:    { icon: Video,         bg: 'bg-[#059669]', glow: '#059669' },
  Tasks:       { icon: CheckSquare,   bg: 'bg-[#10b981]', glow: '#10b981' },
  Calendar:    { icon: Calendar,      bg: 'bg-[#d97706]', glow: '#d97706' },
  Docs:        { icon: FileText,      bg: 'bg-[#2563eb]', glow: '#2563eb' },
  'Ukin agent':{ icon: Sparkles,      bg: 'bg-[#8b5cf6]', glow: '#8b5cf6' },
  GitHub:      { icon: GitPullRequest,bg: 'bg-[#24292f]', glow: '#64748b' },
  PostHog:     { icon: BarChart3,     bg: 'bg-[#ea580c]', glow: '#ea580c' },
  'MCP tools': { icon: Cpu,           bg: 'bg-[#0284c7]', glow: '#0284c7' },
  Journeys:    { icon: Route,         bg: 'bg-[#c026d3]', glow: '#c026d3' },
  Forms:       { icon: ClipboardList, bg: 'bg-[#2563eb]', glow: '#2563eb' },
  Lists:       { icon: ListTodo,      bg: 'bg-[#10b981]', glow: '#10b981' },
};

const INTEGRATIONS = [
  { name: 'Spaces',     category: 'Built in',          badge: 'Conversations',                      desc: 'Spaces, direct messages, and huddles are where team signals arrive.',                        color: '#b9bbff', iconLetter: 'SP',  point: [112, 78]  },
  { name: 'Mail',       category: 'Built in',          badge: 'Business · shared mailbox',          desc: 'Route customer email into owned work and connected threads.',                               color: '#c6c9ff', iconLetter: 'ML',  point: [310, 50]  },
  { name: 'Meetings',   category: 'Built in',          badge: 'Live collaboration',                  desc: 'Meet, capture the important context, and carry the next step forward.',                     color: '#aeb3ff', iconLetter: 'MT',  point: [510, 78]  },
  { name: 'Tasks',      category: 'Built in',          badge: 'Follow-through',                     desc: 'Give every next step an owner and a place to move toward done.',                            color: '#a6d4c4', iconLetter: 'TK',  point: [548, 210] },
  { name: 'Calendar',   category: 'Built in',          badge: 'Time and availability',              desc: 'Keep schedules and team availability inside the same workspace.',                           color: '#e1c38b', iconLetter: 'CA',  point: [505, 340] },
  { name: 'Docs',       category: 'Built in',          badge: 'Shared context',                     desc: 'Keep knowledge close to the work and decisions it informs.',                               color: '#c4b6ff', iconLetter: 'DC',  point: [310, 362] },
  { name: 'Ukin agent', category: 'Built in',          badge: 'Intelligence across the workspace',  desc: 'Ukin works across workspace context to surface and move work forward.',                     color: '#d0d2ff', iconLetter: 'UK',  point: [112, 340] },
  { name: 'GitHub',     category: 'Extension examples',badge: 'Illustrative · developer tools',    desc: 'An example of how developer-tool context sits alongside team work.',                        color: '#c0c6d2', iconLetter: 'GH',  point: [126, 82]  },
  { name: 'PostHog',    category: 'Extension examples',badge: 'Illustrative · product analytics',  desc: 'An example of keeping product analytics context close to team work.',                       color: '#e9b18a', iconLetter: 'PH',  point: [494, 70]  },
  { name: 'MCP tools',  category: 'Extension examples',badge: 'Illustrative · external tools',     desc: 'An example of connecting approved external tools through MCP.',                             color: '#a8c9c2', iconLetter: 'MCP', point: [550, 206] },
  { name: 'Journeys',   category: 'Extension examples',badge: 'Illustrative · app ecosystem',      desc: 'An example of extending the workspace with an installable app.',                           color: '#c6b5f2', iconLetter: 'JR',  point: [490, 344] },
  { name: 'Forms',      category: 'Extension examples',badge: 'Illustrative · structured intake',  desc: 'An example of bringing structured requests into the team workspace.',                       color: '#a8c1ec', iconLetter: 'FM',  point: [142, 348] },
  { name: 'Lists',      category: 'Extension examples',badge: 'Illustrative · lightweight tracking',desc: 'An example of adding lightweight tracking alongside team work.',                           color: '#b5d3a5', iconLetter: 'LS',  point: [98, 212] },
];

const CENTER = [310, 210];

/* ─── CONVERGING VECTOR TOPOLOGY SYSTEM ─── */
/* Mathematically engineered cubic Béziers matching the reference illustration.
   Hero Cross-Sectional Arc enters from top-left, passes smoothly through Spaces [112, 78],
   sweeps gracefully across above the hub [310, 168], passes right through Tasks [548, 210],
   and exits toward the right information panel at [660, 238]. */

// 1. Signature Hero Cross-Sectional Arc (Spaces → Hub Crest → Tasks → Right Panel)
const PATH_HERO_CROSS_SECTION = 'M -30 40 C 40 55, 80 68, 112 78 C 165 94, 230 148, 310 168 C 390 188, 475 204, 548 210 C 585 214, 620 224, 660 238';

// 2. Harmonic Parallel Guide Spline (converges alongside Hero Arc)
const PATH_HERO_GUIDE = 'M -20 46 C 45 60, 84 72, 112 78 C 168 98, 235 152, 310 174 C 385 192, 470 208, 548 210 C 585 218, 620 228, 660 242';

// 3. Converging Feeder Branches for Built-In Nodes
const FEEDER_PATHS = {
  Mail:         'M 310 50 C 310 95, 310 135, 310 168',
  Meetings:     'M 510 78 C 450 110, 380 145, 310 168',
  Calendar:     'M 505 340 C 450 310, 380 270, 310 252',
  Docs:         'M 310 362 C 310 325, 310 285, 310 252',
  'Ukin agent': 'M 112 340 C 165 310, 235 270, 310 252',
  // Extension Examples Feeder Branches
  GitHub:       'M 126 82 C 175 105, 240 150, 310 168',
  PostHog:      'M 494 70 C 440 105, 380 145, 310 168',
  'MCP tools':  'M 550 206 C 480 208, 410 210, 354 210',
  Journeys:     'M 490 344 C 440 310, 380 270, 310 252',
  Forms:        'M 142 348 C 190 315, 250 270, 310 252',
  Lists:        'M 98 212 C 160 212, 220 210, 266 210',
};

const PREVIEWS = {
  Spaces:      { surface: 'launch-planning',       actor: 'Maya Chen',       message: 'The handoff is ready for review. I linked the launch checklist here.',          outcome: 'Decision captured in the launch brief',     icon: 'SC' },
  Mail:        { surface: 'shared inbox',           actor: 'Customer success',message: 'We need to move our onboarding session to Thursday.',                           outcome: 'Reply drafted · follow-up assigned',        icon: 'ML' },
  Meetings:    { surface: 'product sync · 10:30',   actor: 'Huddle notes',    message: 'The team agreed to keep the beta invite-only through launch week.',              outcome: 'Summary ready for the team',                icon: 'MT' },
  Tasks:       { surface: 'launch checklist',       actor: 'Jon Bell',        message: 'Review beta onboarding flow',                                                   outcome: 'In progress · due today',                   icon: 'TK' },
  Calendar:    { surface: 'team calendar',          actor: 'Next up · 2:30 PM',message: 'Beta readiness review · 4 attendees',                                          outcome: 'Agenda linked to launch planning',          icon: 'CA' },
  Docs:        { surface: 'launch brief',           actor: 'Updated just now', message: 'Beta scope, owners, and launch criteria in one shared document.',              outcome: 'Connected to 3 decisions',                  icon: 'DC' },
  'Ukin agent':{ surface: 'workspace signal',       actor: 'Ukin noticed',    message: 'The same onboarding question came up in three conversations this week.',        outcome: 'Suggested: add it to the launch brief',     icon: 'UK' },
  GitHub:      { surface: 'acme/core-repo',         actor: 'PR #412 merged',  message: 'feat: add telemetry streaming and webhook verification',                        outcome: '14 checks passed · released to staging',   icon: 'GH' },
  PostHog:     { surface: 'product telemetry',      actor: 'Retention metric',message: 'Activation velocity increased 18.4% across the enterprise cohort.',             outcome: 'Report synced to executive dashboard',     icon: 'PH' },
  'MCP tools': { surface: 'mcp-gateway',            actor: 'System agent',    message: 'Acme CRM, Postgres, and Vector store tools initialized over MCP.',              outcome: 'Authenticated · 12ms latency',             icon: 'MC' },
  Journeys:    { surface: 'customer-lifecycle',     actor: 'Journey engine',  message: 'Customer moved to Enterprise Tier milestone after contract execution.',          outcome: 'Triggered kickoff workflow',                icon: 'JR' },
  Forms:       { surface: 'intake-gateway',         actor: 'Request intake',  message: 'New enterprise security review submitted by Northwind Traders.',                outcome: 'Triage ticket SR-88 created',               icon: 'FM' },
  Lists:       { surface: 'asset-tracker',          actor: 'Operations team', message: 'SOC2 Type II compliance evidence checklist updated for Q4.',                    outcome: '12 items verified · audit ready',           icon: 'LS' },
};

/* ─── Ultra-thin Travelling Photon Bead along Master Topological Spine ─── */
function ConvergingPhotonNode({ d, color, duration = 6.8 }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeDasharray="6 380"
      filter="url(#subtle-particle-glow)"
      initial={{ strokeDashoffset: 386, opacity: 0 }}
      animate={{
        strokeDashoffset: [386, -38],
        opacity: [0, 0.95, 0.95, 0],
      }}
      transition={{
        strokeDashoffset: { duration, repeat: Infinity, ease: 'linear', repeatDelay: 0.6 },
        opacity: { duration, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6, times: [0, 0.1, 0.9, 1] },
      }}
    />
  );
}

/* ─── Reusable Concentric Orbital Ring Component ─── */
function ConcentricOrbitalRing({ rx, ry, strokeDasharray, opacity }) {
  const tilt = useContext(TiltContext);
  return (
    <ellipse
      cx={CENTER[0] + (tilt.active ? (tilt.gx - 50) * 0.05 : 0)}
      cy={CENTER[1] + (tilt.active ? (tilt.gy - 50) * 0.04 : 0)}
      rx={rx}
      ry={ry}
      fill="none"
      stroke="rgba(165,180,252,0.15)"
      strokeWidth="0.65"
      strokeDasharray={strokeDasharray}
      style={{ opacity, transition: 'stroke 300ms ease' }}
    />
  );
}

/* ─── Reusable Topology Spline Branch Component ─── */
function TopologySpline({ d, isActive, isGuide = false }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={isActive ? 'url(#topo-spline-active)' : isGuide ? 'rgba(140,148,255,0.10)' : 'rgba(140,148,255,0.14)'}
      strokeWidth={isActive ? 0.85 : 0.52}
      strokeDasharray={isActive ? 'none' : isGuide ? '2 6' : '2 5'}
      className="transition-all duration-300"
    />
  );
}

/* ─── Reusable Hub Spoke Line Component ─── */
function HubSpoke({ x2, y2, isActive }) {
  return (
    <line
      x1={CENTER[0]}
      y1={CENTER[1]}
      x2={x2}
      y2={y2}
      stroke={isActive ? 'url(#topo-spline-active)' : 'rgba(140,148,255,0.11)'}
      strokeWidth={isActive ? 0.85 : 0.52}
      strokeDasharray={isActive ? 'none' : '3 6'}
      className="transition-all duration-300"
    />
  );
}

/* ─── 3D Magnetic Node Button with Authentic Product Icon Badge ─── */
function NodeButton({ item, isSelected, isHovered, onHover, onLeave, onClick }) {
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [magneticTilt, setMagneticTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const iconConfig = PRODUCT_ICON_CONFIG[item.name] || {
    icon: Sparkles,
    bg: 'bg-indigo-600',
    glow: '#6366f1',
  };
  const Icon = iconConfig.icon;

  const handleMouseMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setMagneticTilt({
      rx: -dy * 5,
      ry: dx * 5,
      gx: ((e.clientX - rect.left) / rect.width) * 100,
      gy: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, [reduceMotion]);

  const handleMouseLeave = useCallback(() => {
    setMagneticTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
    onLeave();
  }, [onLeave]);

  const [x, y] = item.point;

  return (
    <motion.div
      key={item.name}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        left: `${(x / 620) * 100}%`,
        top: `${(y / 420) * 100}%`,
        translateX: '-50%',
        translateY: '-24px', // Pins center of 48px icon box precisely on (x, y)
        zIndex: isSelected ? 30 : isHovered ? 25 : 20,
      }}
    >
      <div
        ref={nodeRef}
        style={{
          transform: `perspective(360px) rotateX(${magneticTilt.rx}deg) rotateY(${magneticTilt.ry}deg)`,
          transition: isHovered ? 'transform 100ms ease-out' : 'transform 450ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <motion.button
          type="button"
          aria-pressed={isSelected}
          onClick={onClick}
          onMouseMove={handleMouseMove}
          onMouseEnter={onHover}
          onMouseLeave={handleMouseLeave}
          animate={{
            scale: isHovered ? 1.05 : isSelected ? 1.03 : 1,
            y: isHovered ? -3 : isSelected ? -1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
            mass: 0.9,
          }}
          className={cn(
            'group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 cursor-pointer',
            isSelected ? 'text-white' : 'text-slate-300 hover:text-white',
          )}
        >
          {/* Outer Node Box (48px x 48px) with Specular Rim & Glow */}
          <div
            className={cn(
              'relative flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border transition-all duration-200 overflow-hidden',
              isSelected
                ? 'border-white/35 bg-[#141b2b]'
                : isHovered
                ? 'border-white/25 bg-[#101524]'
                : 'border-white/[0.09] bg-[#0c1018]/90 hover:border-white/20',
            )}
            style={{
              boxShadow: isSelected
                ? `0 0 0 1px ${iconConfig.glow}44, 0 8px 24px -4px ${iconConfig.glow}66, inset 0 1px 0 rgba(255,255,255,0.18)`
                : isHovered
                ? `0 0 0 1px ${iconConfig.glow}33, 0 6px 18px -4px ${iconConfig.glow}44, inset 0 1px 0 rgba(255,255,255,0.12)`
                : '0 4px 12px -3px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Inner Product Icon Badge */}
            <div
              className={cn(
                'flex h-[32px] w-[32px] items-center justify-center rounded-[9px] shadow-[0_1px_3px_rgba(0,0,0,0.35)] transition-transform duration-150 group-hover:scale-105',
                iconConfig.bg,
              )}
            >
              <Icon size={17} strokeWidth={2} className="text-white shrink-0" />
            </div>

            {/* Specular gloss top sheen */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[14px] bg-gradient-to-b from-white/[0.08] to-transparent" />
          </div>

          {/* Node Label */}
          <span
            className={cn(
              'whitespace-nowrap text-[9.5px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors',
              isSelected ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white',
            )}
          >
            {item.name}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Surface preview card (Detail Panel) ─── */
function SurfacePreview({ item }) {
  const preview = PREVIEWS[item.name] ?? {
    surface: item.name.toLowerCase(),
    actor: `${item.name} · connected view`,
    message: `Connected view of how ${item.name} context sits alongside team work.`,
    outcome: 'Integrated into workspace context',
    icon: item.iconLetter,
  };

  return (
    <BrowserFrame address={`app.ultrakin.com/workspace/${item.name.toLowerCase().replaceAll(' ', '-')}`} className="mt-6 max-w-md">
      <div className="overflow-hidden bg-[#0d1118]/90 shadow-[0_18px_44px_-34px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.035)]">
        {/* Surface Header */}
        <div className="flex items-center justify-between border-b border-obsidian-border-soft px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-obsidian-border bg-white/[0.04] font-mono text-[8px] text-indigo-200">
              {preview.icon}
            </span>
            <span className="truncate text-[10px] font-medium text-slate-300">{preview.surface}</span>
          </div>
          <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[9px] text-obsidian-muted">
            <span className={cn('h-1.5 w-1.5 rounded-full', item.category === 'Built in' ? 'bg-emerald-300/80' : 'bg-slate-400/70')} />
            {item.category === 'Built in' ? 'Sample view' : 'Example only'}
          </span>
        </div>

        {/* Content Body */}
        <div className="px-3.5 py-3.5">
          <div className="flex items-center gap-1.5 text-[8.5px] uppercase tracking-[0.14em] text-obsidian-muted">
            <span>Context</span>
            <span className="text-obsidian-border">·</span>
            <span className="text-slate-400">{preview.actor}</span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-[1.6] text-slate-200">{preview.message}</p>
          <div className="mt-3.5 flex items-center gap-2 border-t border-obsidian-border-soft pt-2.5 text-[9.5px] text-indigo-100/85">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-300/10 text-[9px] text-indigo-200">↗</span>
            <span className="truncate">{preview.outcome}</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ─── Main Integrations Section Component ─── */
export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('Built in');
  const [selected, setSelected]       = useState('Spaces');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [sectionRef, inView]          = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();
  const tilt = useContext(TiltContext);

  const visible = INTEGRATIONS.filter((item) => item.category === selectedCat);
  const current = visible.find((item) => item.name === selected) ?? visible[0];
  const activeNode = hoveredNode || selected;

  const selectCategory = (category) => {
    setSelectedCat(category);
    if (!INTEGRATIONS.some((item) => item.name === selected && item.category === category)) {
      setSelected(INTEGRATIONS.find((item) => item.category === category)?.name ?? 'Spaces');
    }
  };

  // Master Hero Arc illuminates when Spaces or Tasks is hovered/selected
  const isSpacesActive   = activeNode === 'Spaces';
  const isTasksActive    = activeNode === 'Tasks';
  const isMasterSpineActive = isSpacesActive || isTasksActive;

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
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle">
              <span className="h-px w-7 bg-brand" /> BUILT IN, THEN OPEN
            </p>
            <h2 className="max-w-xl font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
              One workspace.<br />
              <span className="font-display italic text-ink-muted">Room to extend.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pb-1">
            <p className="max-w-sm text-[13px] leading-6 text-ink-muted">
              Chat, mail, meetings, calendar, tasks, docs, and Ukin are built into one workspace. External entries are illustrative examples.
            </p>
            <a href="#workspace-showcase" className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus">
              Explore the workspace <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="mt-12 border-y border-border py-4">
          <div role="group" aria-label="Explore workspace surfaces and extensions" className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCat === category}
                onClick={() => selectCategory(category)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                  selectedCat === category ? 'bg-brand-soft text-brand-text font-medium' : 'text-ink-subtle hover:bg-surface-hover hover:text-ink-soft',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Orbit map + detail */}
        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,.8fr)] lg:items-center lg:gap-12 relative">

          {/* ── Orbit Map — wrapped in cursor-tracking TiltCard ── */}
          <TiltCard>
            <BrowserFrame address="app.ultrakin.com/workspace/integrations">
              <div
                className="relative h-[430px] overflow-hidden select-none"
                style={{
                  background: tilt.active
                    ? `radial-gradient(ellipse 85% 75% at ${tilt.gx}% ${tilt.gy}%, rgba(55,62,150,0.16) 0%, rgba(15,19,28,0.94) 55%, #080b12 100%)`
                    : 'radial-gradient(ellipse 80% 70% at 50% 48%, rgba(50,56,140,0.14) 0%, rgba(15,19,28,0.94) 55%, #080b12 100%)',
                  transition: tilt.active ? 'none' : 'background 600ms ease',
                }}
                aria-label="Connected tools map"
              >

                {/* ── SVG layer: CONVERGING VECTOR TOPOLOGY SYSTEM ── */}
                <svg
                  viewBox="0 0 620 420"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label={`Connected vector topology for ${selectedCat.toLowerCase()}`}
                >
                  <defs>
                    {/* Subtle base spline gradient */}
                    <linearGradient id="topo-spline-base" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#818cf8" stopOpacity=".38" />
                      <stop offset="1" stopColor="#a5b4fc" stopOpacity=".24" />
                    </linearGradient>

                    {/* Active highlighted topology gradient */}
                    <linearGradient id="topo-spline-active" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#c7d2fe" stopOpacity=".95" />
                      <stop offset="1" stopColor="#818cf8" stopOpacity=".65" />
                    </linearGradient>

                    {/* Core radial soft field */}
                    <radialGradient id="orbit-core">
                      <stop stopColor="#6366f1" stopOpacity=".16" />
                      <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>

                    {/* Subtle particle glow */}
                    <filter id="subtle-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="0.7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ── LAYER 1: Background Concentric Orbital Rings ── */}
                  <ConcentricOrbitalRing rx="270" ry="120" strokeDasharray="2 8" opacity={0.22} />
                  <ConcentricOrbitalRing rx="190" ry="85"  strokeDasharray="none" opacity={0.25} />
                  <ConcentricOrbitalRing rx="86"  ry="54"  strokeDasharray="2 6"  opacity={0.32} />
                  <circle cx={CENTER[0]} cy={CENTER[1]} r="80" fill="url(#orbit-core)" />

                  {/* ── LAYER 2: Delicate Radial Spokes from Hub to Nodes ── */}
                  <g>
                    {visible.map((item) => (
                      <HubSpoke
                        key={`spoke-${item.name}`}
                        x2={item.point[0]}
                        y2={item.point[1]}
                        isActive={item.name === activeNode}
                      />
                    ))}
                  </g>

                  {/* ── LAYER 3: Harmonic Converging Guide Splines ── */}
                  <g opacity={0.62}>
                    {/* Parallel companion along Hero Arc */}
                    <TopologySpline d={PATH_HERO_GUIDE} isActive={false} isGuide={true} />
                    {/* Converging feeder branches from perimeter nodes toward central hub crest/root */}
                    {visible.map((item) => {
                      const feederD = FEEDER_PATHS[item.name];
                      if (!feederD) return null;
                      return (
                        <TopologySpline
                          key={`feeder-guide-${item.name}`}
                          d={feederD}
                          isActive={false}
                          isGuide={true}
                        />
                      );
                    })}
                  </g>

                  {/* ── LAYER 4: The Hero Cross-Sectional Vector Arc (Spaces → Hub Crest → Tasks → Right) ── */}
                  <path
                    d={PATH_HERO_CROSS_SECTION}
                    data-workline-anchor="integration-spine"
                    fill="none"
                    stroke={isMasterSpineActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isMasterSpineActive ? 1.55 : 1.15}
                    className="transition-all duration-300"
                  />

                  {/* Active highlight for currently hovered / selected perimeter feeder spline */}
                  {visible.map((item) => {
                    const feederD = FEEDER_PATHS[item.name];
                    const isActive = item.name === activeNode;
                    if (!feederD || !isActive) return null;
                    return (
                      <path
                        key={`active-feeder-${item.name}`}
                        d={feederD}
                        fill="none"
                        stroke="url(#topo-spline-active)"
                        strokeWidth={0.88}
                        className="transition-all duration-300"
                      />
                    );
                  })}

                  {/* ── LAYER 5: Continuous Travelling Photon Bead along Hero Cross-Sectional Arc ── */}
                  {!reduceMotion && (
                    <ConvergingPhotonNode
                      d={PATH_HERO_CROSS_SECTION}
                      color="#c7d2fe"
                      duration={6.5}
                    />
                  )}

                  {/* Connection Endpoint dots under node centers */}
                  {visible.map((item) => {
                    const isHovered = item.name === hoveredNode;
                    const isSelected = item.name === current.name;
                    return (
                      <circle
                        key={`dot-${item.name}`}
                        cx={item.point[0]}
                        cy={item.point[1]}
                        r={isHovered ? 3.5 : isSelected ? 2.8 : 1.8}
                        fill={item.color}
                        fillOpacity={isHovered ? 0.95 : isSelected ? 0.85 : 0.55}
                        style={{
                          transition: 'r 200ms ease, fill-opacity 200ms ease',
                        }}
                      />
                    );
                  })}
                </svg>

                {/* ── Center logo core (Responds smoothly to hover) ── */}
                <motion.div
                  className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: hoveredNode ? 1.018 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  style={{
                    filter: hoveredNode
                      ? 'drop-shadow(0 0 28px rgba(120,122,255,0.45))'
                      : 'drop-shadow(0 0 20px rgba(120,122,255,0.25))',
                    transition: 'filter 350ms ease',
                  }}
                >
                  <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[1.7rem] border border-white/[0.16] bg-[linear-gradient(145deg,#1e2540,#0d1118_68%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.16),inset_0_-1px_0_rgba(144,148,255,.15)]">
                    {/* Specular sheen */}
                    <span className="pointer-events-none absolute inset-x-2 top-1.5 h-1/3 rounded-t-2xl bg-gradient-to-b from-white/[0.09] to-transparent" />
                    <UltrakinLogo size={38} />
                  </div>
                </motion.div>

                {/* ── Surrounding Miniature Product Nodes ── */}
                <AnimatePresence mode="popLayout">
                  {visible.map((item) => (
                    <NodeButton
                      key={item.name}
                      item={item}
                      isSelected={item.name === current.name}
                      isHovered={item.name === hoveredNode}
                      onHover={() => setHoveredNode(item.name)}
                      onLeave={() => setHoveredNode(null)}
                      onClick={() => setSelected(item.name)}
                    />
                  ))}
                </AnimatePresence>

              </div>
            </BrowserFrame>
          </TiltCard>

          {/* ── Detail panel ── */}
          <div className="relative min-h-[250px] border-l border-border pl-6 sm:pl-8 lg:min-h-[290px] lg:pl-10">
            {/* Top border hairline accent */}
            <div aria-hidden="true" className="absolute -left-px top-0 h-8 w-px bg-brand/70" />

            {/* Optical receiver bead aligned with incoming trajectory from vector diagram */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-[3px] top-[148px] h-1.5 w-1.5 rounded-full bg-brand/60 ring-2 ring-page transition-all duration-300"
            />

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

            {/* Mobile node list (accessible fallback) */}
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-0 border-t border-border sm:hidden">
              {visible.map((item) => {
                const conf = PRODUCT_ICON_CONFIG[item.name];
                const ItemIcon = conf?.icon || Sparkles;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={item.name === current.name}
                    onClick={() => setSelected(item.name)}
                    className={cn(
                      'flex min-h-11 items-center gap-2 border-b border-border text-left text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
                      item.name === current.name ? 'text-brand-text font-medium' : 'text-ink-subtle hover:text-ink-soft',
                    )}
                  >
                    <span className={cn('flex h-5 w-5 items-center justify-center rounded-md text-white', conf?.bg || 'bg-brand')}>
                      <ItemIcon size={11} />
                    </span>
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
