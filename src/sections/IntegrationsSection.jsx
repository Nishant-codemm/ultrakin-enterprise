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
    // Ultra subtle, premium tilt (max ±3deg)
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

/* ─── Product Icon & Badge Mapping matching the Navigation Mega-Menu ─── */
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
/* Mathematically engineered cubic Béziers that merge gracefully into shared conduits
   before reaching the central hub [310, 210], avoiding X-crossings and radiating spikes */

// Artery 1: Spaces branch into West Merge Junction [242, 192]
const PATH_SPACES_TO_WEST_MERGE = "M 112 78 C 160 110, 195 155, 242 192";
const PATH_SPACES_GUIDE = "M 112 78 C 152 118, 188 162, 236 198";

// Artery 2: Ukin Agent branch into West Merge Junction [242, 192]
const PATH_UKIN_TO_WEST_MERGE = "M 112 340 C 160 308, 195 245, 242 192";
const PATH_UKIN_GUIDE = "M 112 340 C 152 300, 188 238, 236 186";

// Artery 3: Mail branch converging into West Trunk [258, 198]
const PATH_MAIL_TO_WEST_TRUNK = "M 310 50 C 300 108, 275 160, 258 198";
const PATH_MAIL_GUIDE = "M 310 50 C 318 108, 290 160, 268 202";

// Consolidated Western Trunk (from West Junction [242, 192] into Hub Core [310, 210])
const PATH_WEST_TRUNK_INTO_HUB = "M 242 192 C 265 204, 288 209, 310 210";
const PATH_WEST_TRUNK_GUIDE = "M 236 198 C 260 208, 285 212, 310 210";

// Consolidated Eastern Trunk (from Hub Core [310, 210] to East Divergence Fork [415, 258])
const PATH_HUB_INTO_EAST_FORK = "M 310 210 C 335 212, 375 228, 415 258";
const PATH_HUB_EAST_GUIDE = "M 310 210 C 340 216, 380 234, 420 264";

// Artery 4: East Divergence Fork [415, 258] smoothly flowing into Calendar [505, 340]
const PATH_EAST_FORK_TO_CALENDAR = "M 415 258 C 445 285, 475 315, 505 340";
const PATH_CALENDAR_GUIDE = "M 420 264 C 450 292, 480 320, 505 340";

// Artery 5: Docs branch converging into East Fork [415, 258]
const PATH_DOCS_TO_EAST_FORK = "M 310 362 C 325 315, 365 275, 415 258";
const PATH_DOCS_GUIDE = "M 310 362 C 318 315, 355 275, 410 254";

// Artery 6: Hub [310, 210] branching rightward into Tasks [548, 210]
const PATH_HUB_TO_TASKS = "M 310 210 C 365 210, 450 210, 548 210";
const PATH_TASKS_GUIDE = "M 310 210 C 365 216, 450 216, 548 210";

// Artery 7: Hub [310, 210] branching northeast into Meetings [510, 78]
const PATH_HUB_TO_MEETINGS = "M 310 210 C 345 190, 420 145, 510 78";
const PATH_MEETINGS_GUIDE = "M 310 210 C 352 195, 428 152, 510 78";

// Inter-Panel Converging Bridge 1 (Calendar [505, 340] toward right detail panel edge [620, 390])
const PATH_CALENDAR_TO_BRIDGE_EDGE = "M 505 340 C 545 358, 580 375, 620 390";

// Inter-Panel Converging Bridge 2 (Tasks lower contour [548, 230] converging into Bridge Edge [620, 390])
const PATH_TASKS_TO_BRIDGE_EDGE = "M 548 230 C 575 285, 598 345, 620 390";

/* ─── The Master Traveling Artery (Spaces → Hub → Calendar → Bridge) ─── */
/* The continuous topological spine traced in the reference illustration */
const PATH_MASTER_CONVERGENCE_SPINE = "M 112 78 C 160 110, 195 155, 242 192 C 265 204, 288 209, 310 210 C 335 212, 375 228, 415 258 C 445 285, 475 315, 505 340 C 545 358, 580 375, 620 390";

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
      strokeWidth={1.8}
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

/* ─── Delicate Concentric Orbital Ring ─── */
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
          {/* The Outer Node Box (48px x 48px) with Specular Rim & Glow */}
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
            {/* Inner Product Icon Badge — exact style from navigation menu */}
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

/* ─── Main Integrations Section Component ─── */
export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('Built in');
  const [selected, setSelected]       = useState('Calendar');
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

  // Determine which topological arteries are highlighted based on active selection
  const isSpacesActive   = activeNode === 'Spaces';
  const isUkinActive     = activeNode === 'Ukin agent';
  const isMailActive     = activeNode === 'Mail';
  const isCalendarActive = activeNode === 'Calendar';
  const isTasksActive    = activeNode === 'Tasks';
  const isMeetingsActive = activeNode === 'Meetings';
  const isDocsActive     = activeNode === 'Docs';

  // Master artery lights up when connected nodes are active
  const isMasterSpineActive = isSpacesActive || isCalendarActive || isUkinActive;

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

          {/* ── Inter-Panel Converging Vector Extension (Desktop) ── */}
          {/* Bridge splines seamlessly travel from Calendar / Tasks across to the right detail panel */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block z-10 overflow-visible">
            <svg viewBox="0 0 1000 480" className="absolute inset-0 h-full w-full overflow-visible">
              <defs>
                <linearGradient id="bridge-spline-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
                  <stop offset="45%" stopColor="#a5b4fc" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="bridge-guide-gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Primary Bridge Spline sweeping out from Calendar toward Right Panel */}
              <path
                d="M 520 405 C 570 422, 610 435, 660 442 C 720 450, 790 445, 870 435"
                fill="none"
                stroke="url(#bridge-spline-gradient)"
                strokeWidth={isCalendarActive ? 0.95 : 0.65}
                className="transition-all duration-300"
              />
              {/* Secondary Guide Spline converging into the Bridge */}
              <path
                d="M 548 300 C 585 365, 625 418, 660 442 C 720 450, 785 448, 860 440"
                fill="none"
                stroke="url(#bridge-guide-gradient)"
                strokeWidth="0.5"
                strokeDasharray="2 6"
              />
            </svg>
          </div>

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
                      <stop stopColor="#818cf8" stopOpacity=".28" />
                      <stop offset="1" stopColor="#a5b4fc" stopOpacity=".12" />
                    </linearGradient>

                    {/* Active highlighted topology gradient */}
                    <linearGradient id="topo-spline-active" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#c7d2fe" stopOpacity=".95" />
                      <stop offset="1" stopColor="#818cf8" stopOpacity=".55" />
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
                  <ConcentricOrbitalRing rx="236" ry="148" strokeDasharray="1 10" opacity={0.3} />
                  <ConcentricOrbitalRing rx="160" ry="98"  strokeDasharray="none" opacity={0.25} />
                  <ConcentricOrbitalRing rx="86"  ry="54"  strokeDasharray="2 6"  opacity={0.35} />
                  <circle cx={CENTER[0]} cy={CENTER[1]} r="78" fill="url(#orbit-core)" />

                  {/* ── LAYER 2: Harmonic Parallel Flowlines (Multi-track rail corridor) ── */}
                  <g opacity={0.55}>
                    <path d={PATH_SPACES_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_UKIN_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_MAIL_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_WEST_TRUNK_GUIDE} fill="none" stroke="rgba(140,148,255,0.14)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_HUB_EAST_GUIDE} fill="none" stroke="rgba(140,148,255,0.14)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_CALENDAR_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_DOCS_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_TASKS_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                    <path d={PATH_MEETINGS_GUIDE} fill="none" stroke="rgba(140,148,255,0.12)" strokeWidth="0.5" strokeDasharray="2 6" />
                  </g>

                  {/* ── LAYER 3: Primary Converging Topology Artery Network ── */}
                  {/* Western Convergence: Spaces + Ukin + Mail merge into West Trunk */}
                  <path
                    d={PATH_SPACES_TO_WEST_MERGE}
                    fill="none"
                    stroke={isSpacesActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isSpacesActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_UKIN_TO_WEST_MERGE}
                    fill="none"
                    stroke={isUkinActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isUkinActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_MAIL_TO_WEST_TRUNK}
                    fill="none"
                    stroke={isMailActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isMailActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_WEST_TRUNK_INTO_HUB}
                    fill="none"
                    stroke={isMasterSpineActive || isMailActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isMasterSpineActive || isMailActive ? 0.95 : 0.75}
                    className="transition-all duration-300"
                  />

                  {/* Eastern Divergence: Hub splits smoothly into Tasks, Meetings, Docs, Calendar */}
                  <path
                    d={PATH_HUB_INTO_EAST_FORK}
                    fill="none"
                    stroke={isMasterSpineActive || isDocsActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isMasterSpineActive || isDocsActive ? 0.95 : 0.75}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_EAST_FORK_TO_CALENDAR}
                    fill="none"
                    stroke={isCalendarActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isCalendarActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_DOCS_TO_EAST_FORK}
                    fill="none"
                    stroke={isDocsActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isDocsActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_HUB_TO_TASKS}
                    fill="none"
                    stroke={isTasksActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isTasksActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_HUB_TO_MEETINGS}
                    fill="none"
                    stroke={isMeetingsActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isMeetingsActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />

                  {/* Inter-Panel Converging Bridge toward Right Edge */}
                  <path
                    d={PATH_CALENDAR_TO_BRIDGE_EDGE}
                    fill="none"
                    stroke={isCalendarActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isCalendarActive ? 0.95 : 0.65}
                    className="transition-all duration-300"
                  />
                  <path
                    d={PATH_TASKS_TO_BRIDGE_EDGE}
                    fill="none"
                    stroke={isTasksActive ? 'url(#topo-spline-active)' : 'url(#topo-spline-base)'}
                    strokeWidth={isTasksActive ? 0.85 : 0.55}
                    className="transition-all duration-300"
                  />

                  {/* ── Continuous Travelling Photon Bead across the Converged Topological Spine ── */}
                  {!reduceMotion && (
                    <ConvergingPhotonNode
                      d={PATH_MASTER_CONVERGENCE_SPINE}
                      color="#c7d2fe"
                      duration={6.8}
                    />
                  )}

                  {/* Topological Merge Junction Dots (Engineering nodes where tracks fuse) */}
                  <circle cx="242" cy="192" r="2.2" fill="#818cf8" fillOpacity="0.8" />
                  <circle cx="415" cy="258" r="2.2" fill="#818cf8" fillOpacity="0.8" />
                  <circle cx="620" cy="390" r="2.4" fill="#a5b4fc" fillOpacity="0.9" />

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
