import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Mail,
  CheckSquare,
  Calendar,
  FileText,
  Sparkles,
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

/* ─── Mathematically Constructed Convergent Cubic Splines ─── */
/* Curves tighten naturally near the center hub [310, 210] and spread smoothly outward */
function getConvergentSpline(x, y) {
  // Cubic Bézier control points engineered for natural logarithmic convergence
  const dx = x - CENTER[0];
  const dy = y - CENTER[1];
  const cx1 = x - dx * 0.42 + (dy > 0 ? -12 : 12);
  const cy1 = y - dy * 0.32 + (dx > 0 ? 10 : -10);
  const cx2 = CENTER[0] + dx * 0.22;
  const cy2 = CENTER[1] + dy * 0.22;
  return `M ${x} ${y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${CENTER[0]} ${CENTER[1]}`;
}

function getHarmonicGuideSpline(x, y) {
  // Secondary companion spline offset for layered network depth
  const dx = x - CENTER[0];
  const dy = y - CENTER[1];
  const cx1 = x - dx * 0.48 + (dy > 0 ? 14 : -14);
  const cy1 = y - dy * 0.28 + (dx > 0 ? -12 : 12);
  const cx2 = CENTER[0] + dx * 0.18;
  const cy2 = CENTER[1] + dy * 0.18;
  return `M ${x} ${y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${CENTER[0]} ${CENTER[1]}`;
}

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

/* ─── Ultra-thin Travelling Particle Node along Vector Spline ─── */
function ConvergingParticle({ d, color, delay, isHighlighted }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;

  const dashLen = isHighlighted ? 6 : 4;
  const gapLen  = isHighlighted ? 180 : 260;
  const total   = dashLen + gapLen;

  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={isHighlighted ? 1.6 : 1.1}
      strokeLinecap="round"
      strokeDasharray={`${dashLen} ${gapLen}`}
      filter="url(#subtle-particle-glow)"
      initial={{ strokeDashoffset: total, opacity: 0 }}
      animate={{
        strokeDashoffset: [total, -total * 0.1],
        opacity: [0, isHighlighted ? 0.9 : 0.6, isHighlighted ? 0.9 : 0.6, 0],
      }}
      transition={{
        strokeDashoffset: { duration: isHighlighted ? 4.2 : 5.8, delay, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 },
        opacity: { duration: isHighlighted ? 4.2 : 5.8, delay, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4, times: [0, 0.12, 0.88, 1] },
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

/* ─── Authentic Miniature Product Previews (Cropped from real products) ─── */
function MiniatureProductPreview({ item }) {
  const name = item.name;

  // 1. Spaces (Real Chat / Spaces UI Preview)
  if (name === 'Spaces') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex min-w-0 items-center gap-1">
            <span className="font-mono text-[8px] font-bold text-[#b9bbff]">#</span>
            <span className="truncate text-[7.5px] font-semibold text-slate-200">launch-planning</span>
          </div>
          <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/20 px-1 py-0.2 text-[5.5px] font-mono text-emerald-300">
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span>3 active</span>
          </span>
        </div>
        {/* Message body */}
        <div className="my-auto flex items-start gap-1">
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-[#5c5bd6] text-[6px] font-bold text-white">
            MC
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[7px] font-semibold text-slate-200">Maya Chen</div>
            <div className="truncate text-[6px] text-slate-300 leading-tight">Launch checklist is ready</div>
          </div>
        </div>
        {/* Decision & reaction footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px]">
          <span className="rounded bg-white/[0.06] px-1 text-slate-300">🚀 5 reactions</span>
          <span className="font-mono text-[#b9bbff]">⚡ Decision linked</span>
        </div>
      </div>
    );
  }

  // 2. Mail (Real Shared Inbox UI Preview)
  if (name === 'Mail') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex min-w-0 items-center gap-1">
            <Mail className="h-2 w-2 shrink-0 text-[#c6c9ff]" />
            <span className="truncate font-mono text-[7px] text-slate-300">support@northwind</span>
          </div>
          <span className="rounded bg-indigo-500/30 px-1 font-mono text-[5.5px] font-medium text-indigo-200">1 new</span>
        </div>
        {/* Thread item */}
        <div className="my-auto min-w-0">
          <div className="truncate text-[7px] font-semibold text-slate-100">Duplicate charge #4821</div>
          <div className="truncate text-[6px] text-slate-400">Maya Chen · Billing refund</div>
        </div>
        {/* Connected ticket */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px]">
          <span className="rounded border border-emerald-500/30 bg-emerald-950/70 px-1 font-mono text-emerald-300">SR-14</span>
          <span className="font-medium text-amber-300">Refund initiated</span>
        </div>
      </div>
    );
  }

  // 3. Meetings (Real Huddle / Call UI Preview)
  if (name === 'Meetings') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-emerald-400 ring-2 ring-emerald-400/20" />
            <span className="font-mono text-[6px] font-bold tracking-wider text-emerald-300 uppercase">LIVE</span>
          </div>
          <span className="font-mono text-[6.5px] text-slate-400">12:44</span>
        </div>
        {/* Video tiles + audio waveform */}
        <div className="my-auto flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <div className="flex h-4 w-4 items-center justify-center rounded border border-emerald-400/50 bg-[#059669]/30 text-[6px] font-bold text-emerald-200 shadow-[0_0_4px_rgba(52,211,153,0.3)]">
              DL
            </div>
            <div className="flex h-4 w-4 items-center justify-center rounded border border-white/10 bg-[#dc2626]/20 text-[6px] font-bold text-slate-300">
              SO
            </div>
          </div>
          <div className="flex h-2.5 items-end gap-0.5">
            <span className="h-1.5 w-0.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="h-2.5 w-0.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:150ms]" />
            <span className="h-1 w-0.5 rounded-full bg-emerald-400 animate-pulse [animation-delay:300ms]" />
          </div>
        </div>
        {/* Live transcript note */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-300">
          <span className="truncate">Dana: 20% rollout confirmed</span>
          <span className="font-mono text-slate-500">4 in call</span>
        </div>
      </div>
    );
  }

  // 4. Tasks (Real Lists / Kanban UI Preview)
  if (name === 'Tasks') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <span className="rounded border border-emerald-500/30 bg-emerald-950/70 px-1 py-0.2 font-mono text-[5.5px] font-semibold text-emerald-300">
            IN PROGRESS
          </span>
          <span className="font-mono text-[6.5px] text-slate-400">2 active</span>
        </div>
        {/* Task row */}
        <div className="my-auto min-w-0">
          <div className="flex items-center gap-1">
            <CheckSquare className="h-2 w-2 shrink-0 text-emerald-400" />
            <span className="truncate text-[7px] font-medium text-slate-200">Process refund #4821</span>
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-[5.5px] text-slate-400">
            <span>SR-14</span> · <span>Billing</span>
          </div>
        </div>
        {/* Assignee & priority */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px]">
          <span className="rounded bg-amber-950/70 px-1 font-bold text-amber-300">P0 High</span>
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#dc2626] text-[5.5px] font-bold text-white">
            SO
          </span>
        </div>
      </div>
    );
  }

  // 5. Calendar (Real Calendar & Day Schedule UI Preview)
  if (name === 'Calendar') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <Calendar className="h-2 w-2 text-[#e1c38b]" />
            <span className="font-mono text-[6.5px] font-bold text-amber-200 uppercase">THU, OCT 24</span>
          </div>
          <span className="font-mono text-[6px] text-slate-400">3:00 PM</span>
        </div>
        {/* Event item */}
        <div className="my-auto rounded-r border-l-2 border-amber-400/80 bg-amber-500/[0.08] py-0.5 pl-1.5">
          <div className="truncate text-[7px] font-semibold text-slate-100">Quarterly client review</div>
          <div className="truncate text-[5.5px] text-slate-400">Northwind Studio</div>
        </div>
        {/* Attendee stack */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px]">
          <div className="flex -space-x-1">
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#059669] text-[5px] font-bold text-white">D</span>
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#dc2626] text-[5px] font-bold text-white">S</span>
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#5c5bd6] text-[5px] font-bold text-white">M</span>
          </div>
          <span className="font-mono text-slate-400">4 attending</span>
        </div>
      </div>
    );
  }

  // 6. Docs (Real Living Docs Editor UI Preview)
  if (name === 'Docs') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex min-w-0 items-center gap-1">
            <FileText className="h-2 w-2 shrink-0 text-[#c4b6ff]" />
            <span className="truncate text-[7px] font-medium text-slate-200">Q4 Launch Plan.doc</span>
          </div>
          <span className="rounded bg-violet-950/60 px-1 font-mono text-[5.5px] text-violet-300">Live</span>
        </div>
        {/* Document body + live cursor */}
        <div className="my-auto space-y-0.5">
          <div className="flex items-center gap-1">
            <span className="h-1 w-10 rounded bg-slate-300/80" />
            <span className="inline-flex items-center gap-0.5 rounded bg-emerald-500/20 px-0.5 text-[5px] font-mono text-emerald-200">
              <span className="h-0.5 w-0.5 rounded-full bg-emerald-400" /> Dana
            </span>
          </div>
          <div className="h-0.5 w-14 rounded bg-slate-600/60" />
          <div className="rounded border-l border-violet-400 bg-violet-500/[0.1] pl-1 text-[5.5px] text-violet-200 truncate">
            Decision: 20% rollout first
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span className="font-mono text-violet-300">3 decisions linked</span>
          <span className="text-slate-500">v2.4</span>
        </div>
      </div>
    );
  }

  // 7. Ukin Agent (Real Autonomous Agent Preview)
  if (name === 'Ukin agent') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <Sparkles className="h-2 w-2 shrink-0 text-indigo-300" />
            <span className="text-[7px] font-semibold text-indigo-200">Support Triage</span>
          </div>
          <span className="flex items-center gap-0.5 font-mono text-[5.5px] text-emerald-400">
            <span className="h-1 w-1 rounded-full bg-emerald-400" /> Active
          </span>
        </div>
        {/* Agent signal & execution */}
        <div className="my-auto rounded border border-indigo-400/20 bg-indigo-500/[0.08] p-0.5">
          <div className="truncate font-mono text-[5.5px] text-indigo-300">Signal: Support Mail</div>
          <div className="truncate text-[6.5px] font-medium text-slate-100">Created SR-14 & Refund Draft</div>
        </div>
        {/* Status */}
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px]">
          <span className="rounded bg-indigo-950/80 px-1 font-mono text-indigo-200">Autonomous</span>
          <span className="font-mono text-slate-400">MCP tools</span>
        </div>
      </div>
    );
  }

  // Extension Examples
  if (name === 'GitHub') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <GitPullRequest className="h-2 w-2 text-slate-300" />
            <span className="truncate font-mono text-[7px] text-slate-200">acme / core</span>
          </div>
          <span className="rounded border border-emerald-500/30 bg-emerald-950/70 px-1 font-mono text-[5.5px] text-emerald-300">
            Merged
          </span>
        </div>
        <div className="my-auto min-w-0">
          <div className="truncate text-[7px] font-semibold text-slate-100">PR #412: Live Telemetry</div>
          <div className="truncate text-[6px] text-slate-400">✓ 14 checks passed</div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span className="font-mono text-slate-300">main branch</span>
          <span className="font-mono text-emerald-400">Synced</span>
        </div>
      </div>
    );
  }

  if (name === 'PostHog') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <BarChart3 className="h-2 w-2 text-amber-300" />
            <span className="truncate text-[7px] font-medium text-slate-200">PostHog Analytics</span>
          </div>
          <span className="h-1 w-1 rounded-full bg-amber-400" />
        </div>
        <div className="my-auto flex items-end justify-between">
          <div>
            <div className="font-mono text-[7.5px] font-bold text-slate-100">14.2k req/s</div>
            <div className="font-mono text-[5.5px] text-emerald-400">+18.4% velocity</div>
          </div>
          <div className="flex h-2.5 items-end gap-0.5">
            <span className="h-1 w-1 rounded-sm bg-amber-400/50" />
            <span className="h-2 w-1 rounded-sm bg-amber-400/70" />
            <span className="h-2.5 w-1 rounded-sm bg-amber-400" />
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span>Enterprise cohort</span>
          <span className="font-mono text-slate-300">Live</span>
        </div>
      </div>
    );
  }

  if (name === 'MCP tools') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <Cpu className="h-2 w-2 text-teal-300" />
            <span className="truncate font-mono text-[7px] text-teal-200">MCP Gateway</span>
          </div>
          <span className="rounded border border-teal-500/30 bg-teal-950/70 px-1 font-mono text-[5.5px] text-teal-300">
            4 tools
          </span>
        </div>
        <div className="my-auto min-w-0">
          <div className="truncate text-[7px] font-medium text-slate-200">Acme CRM · Postgres</div>
          <div className="truncate text-[5.5px] text-slate-400">Vector tool connected</div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span className="font-mono text-teal-300">12ms latency</span>
          <span className="font-mono text-emerald-400">Active</span>
        </div>
      </div>
    );
  }

  if (name === 'Journeys') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <Route className="h-2 w-2 text-purple-300" />
            <span className="truncate text-[7px] font-medium text-slate-200">Journeys App</span>
          </div>
          <span className="rounded bg-purple-950/70 px-1 font-mono text-[5.5px] text-purple-300">Step 2/4</span>
        </div>
        <div className="my-auto min-w-0">
          <div className="truncate text-[7px] font-semibold text-slate-100">Enterprise Onboarding</div>
          <div className="truncate text-[5.5px] text-slate-400">Trigger → Slack → Kickoff</div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span className="font-mono text-purple-300">94% complete</span>
          <span className="text-slate-400">18 active</span>
        </div>
      </div>
    );
  }

  if (name === 'Forms') {
    return (
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
          <div className="flex items-center gap-1">
            <ClipboardList className="h-2 w-2 text-blue-300" />
            <span className="truncate text-[7px] font-medium text-slate-200">Intake Form</span>
          </div>
          <span className="font-mono text-[5.5px] text-blue-300">SR-88</span>
        </div>
        <div className="my-auto min-w-0">
          <div className="truncate text-[7px] font-semibold text-slate-100">Security Architecture</div>
          <div className="truncate text-[5.5px] text-slate-400">Northwind Traders RFP</div>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
          <span className="font-medium text-amber-300">Pending triage</span>
          <span className="font-mono text-slate-500">3 new</span>
        </div>
      </div>
    );
  }

  // Lists default
  return (
    <div className="flex h-full flex-col justify-between overflow-hidden rounded-[9px] bg-[#0b0e17] p-1.5 text-left select-none">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-1">
        <div className="flex items-center gap-1">
          <ListTodo className="h-2 w-2 text-emerald-300" />
          <span className="truncate text-[7px] font-medium text-slate-200">Lists Board</span>
        </div>
        <span className="font-mono text-[6px] text-slate-400">12 items</span>
      </div>
      <div className="my-auto min-w-0">
        <div className="truncate text-[7px] font-medium text-slate-100">SOC2 Evidence Ledger</div>
        <div className="truncate text-[5.5px] text-slate-400">Updated today by security</div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[0.06] pt-0.5 text-[5.5px] text-slate-400">
        <span className="font-mono text-emerald-300">100% verified</span>
        <span className="text-slate-400">Q4 audit</span>
      </div>
    </div>
  );
}

/* ─── 3D Subtle Node Button Component (Linear / Raycast feel) ─── */
function NodeButton({ item, isSelected, isHovered, onHover, onLeave, onClick }) {
  const nodeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [magneticTilt, setMagneticTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handleMouseMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    // Subtle magnetic response (max ±6deg)
    setMagneticTilt({
      rx: -dy * 6,
      ry: dx * 6,
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
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'absolute',
        left: `${(x / 620) * 100}%`,
        top: `${(y / 420) * 100}%`,
        translateX: '-50%',
        translateY: '-36px', // Pins center of 72px card precisely on (x, y)
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
            scale: isHovered ? 1.025 : isSelected ? 1.015 : 1,
            y: isHovered ? -3 : isSelected ? -1 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
            mass: 0.9,
          }}
          className={cn(
            'group relative flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
            isSelected ? 'text-white' : 'text-slate-300 hover:text-white',
          )}
        >
          {/* Miniature Product Window Card (116px x 72px) */}
          <div
            className={cn(
              'relative h-[72px] w-[116px] rounded-xl border text-[10px] overflow-hidden transition-all duration-200',
              isSelected
                ? 'border-indigo-400/40 bg-[#0e1220]'
                : isHovered
                ? 'border-white/25 bg-[#0c101c]'
                : 'border-white/[0.08] bg-[#090d16]/95 hover:border-white/18',
            )}
            style={{
              boxShadow: isSelected
                ? `0 0 0 1px ${item.color}33, 0 8px 24px -4px ${item.color}44, inset 0 1px 0 rgba(255,255,255,0.12)`
                : isHovered
                ? `0 0 0 1px ${item.color}22, 0 6px 18px -4px ${item.color}33, inset 0 1px 0 rgba(255,255,255,0.1)`
                : '0 4px 14px -3px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            {/* Specular gloss */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/[0.05] to-transparent" />

            {/* Live miniature product preview */}
            <MiniatureProductPreview item={item} />
          </div>

          {/* Micro label underneath with status dot */}
          <span
            className={cn(
              'mt-1 flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[8.5px] font-medium tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors',
              isSelected
                ? 'bg-indigo-950/80 text-white ring-1 ring-indigo-400/30'
                : 'bg-[#0a0d16]/85 text-slate-300 group-hover:text-white',
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.color }} />
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
  const [selected, setSelected]       = useState('Spaces');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [sectionRef, inView]          = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();
  const tilt = useContext(TiltContext);

  const visible = INTEGRATIONS.filter((item) => item.category === selectedCat);
  const current = visible.find((item) => item.name === selected) ?? visible[0];
  const hoveredItem = visible.find((item) => item.name === hoveredNode);

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
        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,.8fr)] lg:items-center lg:gap-12">

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

                {/* ── SVG layer: Layered Convergent Vector Splines & Subtle Particles ── */}
                <svg
                  viewBox="0 0 620 420"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label={`Connections from Ultrakin to ${selectedCat.toLowerCase()}`}
                >
                  <defs>
                    {/* Base subtle converging gradient */}
                    <linearGradient id="spline-base" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#818cf8" stopOpacity=".22" />
                      <stop offset="1" stopColor="#a5b4fc" stopOpacity=".08" />
                    </linearGradient>

                    {/* Active brightened spline gradient (subtle, 0.75-0.85px) */}
                    <linearGradient id="spline-active" x1="0" y1="0" x2="1" y2="1">
                      <stop stopColor="#c7d2fe" stopOpacity=".85" />
                      <stop offset="1" stopColor="#818cf8" stopOpacity=".45" />
                    </linearGradient>

                    {/* Core radial soft field */}
                    <radialGradient id="orbit-core">
                      <stop stopColor="#6366f1" stopOpacity=".16" />
                      <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>

                    {/* Subtly reduced particle glow filter (~70% reduction) */}
                    <filter id="subtle-particle-glow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="0.7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ── LAYER 1: Background Concentric Orbital Rings (0.5px - 0.65px) ── */}
                  <ConcentricOrbitalRing rx="236" ry="148" strokeDasharray="1 10" opacity={0.35} />
                  <ConcentricOrbitalRing rx="160" ry="98"  strokeDasharray="none" opacity={0.3} />
                  <ConcentricOrbitalRing rx="86"  ry="54"  strokeDasharray="2 6"  opacity={0.4} />
                  <circle cx={CENTER[0]} cy={CENTER[1]} r="78" fill="url(#orbit-core)" />

                  {/* ── LAYER 2: Middle Secondary Harmonic Splines (0.5px guide splines) ── */}
                  {visible.map((item) => {
                    const guideD = getHarmonicGuideSpline(item.point[0], item.point[1]);
                    return (
                      <path
                        key={`guide-${item.name}`}
                        d={guideD}
                        fill="none"
                        stroke="rgba(140,148,255,0.08)"
                        strokeWidth="0.5"
                        strokeDasharray="1.5 5"
                      />
                    );
                  })}

                  {/* ── LAYER 3: Foreground Primary Convergent Splines (0.65px - 0.85px) ── */}
                  <AnimatePresence>
                    {visible.map((item) => {
                      const d = getConvergentSpline(item.point[0], item.point[1]);
                      const isHovered = item.name === hoveredNode;
                      const isSelected = item.name === current.name;
                      const isHighlighted = isHovered || isSelected;

                      return (
                        <motion.path
                          key={`spline-${item.name}`}
                          d={d}
                          fill="none"
                          stroke={isHighlighted ? 'url(#spline-active)' : 'url(#spline-base)'}
                          strokeWidth={isHovered ? 0.85 : isSelected ? 0.75 : 0.65}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: isHovered ? 0.9 : isSelected ? 0.75 : (hoveredNode ? 0.16 : 0.4),
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      );
                    })}
                  </AnimatePresence>

                  {/* Flowing particle beads along convergent splines */}
                  {!reduceMotion && (
                    <AnimatePresence>
                      {visible.map((item, i) => {
                        const d = getConvergentSpline(item.point[0], item.point[1]);
                        const isHovered = item.name === hoveredNode;
                        const isSelected = item.name === current.name;
                        const isHighlighted = isHovered || isSelected;

                        return (
                          <ConvergingParticle
                            key={`particle-${item.name}`}
                            d={d}
                            color={isHighlighted ? '#c7d2fe' : item.color}
                            delay={i * 0.45}
                            isHighlighted={isHighlighted}
                          />
                        );
                      })}
                    </AnimatePresence>
                  )}

                  {/* Connection Endpoint dots */}
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
                    scale: hoveredItem ? 1.018 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  style={{
                    filter: hoveredItem
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
              {visible.map((item) => (
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
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
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
