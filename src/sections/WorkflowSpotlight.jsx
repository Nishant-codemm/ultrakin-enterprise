import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CheckSquare,
  FileText,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/cn';
import BrowserFrame from '../components/BrowserFrame';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion, getSectionContentMotion } from '../lib/motion';
import { navigate } from '../lib/navigate';

/* ─── Cursor-tracking 3D tilt for any card ─── */
function TiltCard({ children, className, maxTilt = 10, style }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left)  / r.width  - 0.5;
    const dy = (e.clientY - r.top)   / r.height - 0.5;
    setTilt({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%', ...style }}
    >
      <div
        style={{
          transform: tilt.on
            ? `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(1.018)`
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: tilt.on ? 'transform 90ms ease-out' : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
          transformOrigin: '50% 50%',
          willChange: 'transform',
          position: 'relative',
          borderRadius: 'inherit',
        }}
      >
        {children}
        {tilt.on && !reduceMotion && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(165,180,252,0.1) 0%, transparent 60%)`,
              mixBlendMode: 'screen',
              zIndex: 10,
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Precision SVG Flow Connector ─── */
function FlowConnector({ reduceMotion, activePulse = false }) {
  const MAIN  = 'M1 15 C 18 15, 20 15, 36 15 S 52 15, 71 15';
  const GUIDE = 'M1 17.5 C 18 17.5, 20 17.5, 36 17.5 S 52 17.5, 71 17.5';

  return (
    <div className="relative hidden h-14 items-center justify-center sm:flex" aria-hidden="true">
      <svg viewBox="0 0 72 30" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <filter id="wf-dot-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="wf-flow-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#a5b4fc" stopOpacity="0" />
            <stop offset="35%"  stopColor="#818cf8" stopOpacity={activePulse ? 0.95 : 0.85} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Companion guide — ultra-thin */}
        <path d={GUIDE} fill="none" stroke="rgba(165,180,252,0.07)" strokeWidth="0.55" strokeDasharray="2 5" />

        {/* Base dashed track */}
        <path d={MAIN} fill="none" stroke={activePulse ? 'rgba(165,180,252,0.32)' : 'rgba(165,180,252,0.18)'} strokeWidth="0.85" strokeDasharray="2.5 4" />

        {/* Ambient glow */}
        <path d={MAIN} fill="none" stroke="url(#wf-flow-grad)" strokeWidth={activePulse ? 2.5 : 2} opacity={activePulse ? 0.35 : 0.18} />

        {/* Particle 1 — primary signal bead */}
        {!reduceMotion && (
          <motion.path
            d={MAIN}
            fill="none"
            stroke="#818cf8"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeDasharray="7 65"
            filter="url(#wf-dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.3, ease: 'linear', repeat: Infinity, repeatDelay: 0.5 }}
          />
        )}

        {/* Particle 2 — trailing echo */}
        {!reduceMotion && (
          <motion.path
            d={MAIN}
            fill="none"
            stroke="#c7d2fe"
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeDasharray="4 68"
            filter="url(#wf-dot-glow)"
            initial={{ strokeDashoffset: 72 }}
            animate={{ strokeDashoffset: [-72, -144] }}
            transition={{ duration: 1.3, ease: 'linear', repeat: Infinity, repeatDelay: 0.5, delay: 0.62 }}
          />
        )}

        {/* Center converge point */}
        <circle cx="36" cy="15" r="3.2" fill="#3156cf" />
        <circle cx="36" cy="15" r="6.5" fill="#3156cf" fillOpacity="0.1" />
        {!reduceMotion && (
          <motion.circle
            cx="36" cy="15" r="3.2"
            fill="none"
            stroke="#818cf8"
            strokeWidth="0.8"
            initial={{ scale: 1, opacity: 0.65 }}
            animate={{ scale: 3.0, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            style={{ transformOrigin: '36px 15px' }}
          />
        )}

        {/* Entry + exit anchor dots */}
        <circle cx="2"  cy="15" r="1.8" fill="rgba(165,180,252,0.4)" />
        <circle cx="70" cy="15" r="1.8" fill="rgba(165,180,252,0.4)" />
      </svg>
    </div>
  );
}

/* ─── Workflow narrative stage strip ─── */
const WORKFLOW_STAGES = [
  { id: 'signal',   label: 'Signal',   letter: 'S', icon: MessageSquareText, color: '#818cf8' },
  { id: 'context',  label: 'Context',  letter: 'C', icon: FileText,          color: '#38bdf8' },
  { id: 'agent',    label: 'Agent',    letter: 'A', icon: Sparkles,          color: '#c084fc' },
  { id: 'decision', label: 'Decision', letter: 'D', icon: Zap,               color: '#f59e0b' },
  { id: 'task',     label: 'Task',     letter: 'T', icon: CheckSquare,       color: '#10b981' },
  { id: 'outcome',  label: 'Outcome',  letter: 'O', icon: Check,             color: '#34d399' },
];

/* ─── Detailed Stage Narrative Data Model ─── */
const STAGE_CONTENT = [
  {
    id: 'signal',
    source: '#release-planning',
    sourceIcon: MessageSquareText,
    sourceTime: '10:42 AM',
    left: {
      badge: 'Signal · Inbound Event',
      badgeColor: 'bg-indigo-400/80',
      sender: 'Maya Chen',
      initials: 'MC',
      avatarBg: 'bg-indigo-500/20 text-indigo-200',
      body: 'Can someone own the SSO timeout before Thursday’s rollout? The EU tenant is still seeing retries.',
      meta: 'Detected via #release-planning · Unassigned deployment blocker',
      metaIcon: MessageSquareText,
    },
    right: {
      badge: 'Listening',
      badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
      tag: 'Ukin Ingestion Bus',
      title: 'Real-time Signal Ingestion',
      desc: 'Ukin parsed thread intent, recognized a critical release dependency with an approaching Thursday deadline, and activated context correlation.',
      fields: [
        { label: 'Priority', value: 'P0 Blocker' },
        { label: 'Target', value: 'EU Tenant SSO' },
      ],
      actionText: 'Correlate connected context',
      actionIcon: ArrowRight,
      nextStage: 1,
    },
  },
  {
    id: 'context',
    source: 'RFC-891 & EU Telemetry Cluster',
    sourceIcon: FileText,
    sourceTime: '10:43 AM',
    left: {
      badge: 'Context · Unified Memory',
      badgeColor: 'bg-sky-400/80',
      sender: 'Knowledge Graph',
      initials: 'KG',
      avatarBg: 'bg-sky-500/20 text-sky-200',
      body: 'Correlated 14 previous deployment logs with token cache TTL expiry in the regional auth proxy across Frankfurt and Dublin clusters.',
      meta: 'Linked artifact: RFC-891 Launch Plan (Sec 4.2 Auth Token Refresh)',
      metaIcon: FileText,
    },
    right: {
      badge: 'Synthesized',
      badgeClass: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
      tag: 'Memory Graph Engine',
      title: 'Root-Cause Hypothesis Formed',
      desc: 'Token cache TTL mismatch between EU and US auth replicas is causing 401 refresh retries under peak load. Recommended patch: increase cache TTL to 300s.',
      fields: [
        { label: 'Matched Incidents', value: '14 historical logs' },
        { label: 'Root Cause', value: 'Token Cache TTL (60s)' },
      ],
      actionText: 'Generate agent proposal',
      actionIcon: ArrowRight,
      nextStage: 2,
    },
  },
  {
    id: 'agent',
    source: '#release-planning',
    sourceIcon: Sparkles,
    sourceTime: '10:44 AM',
    left: {
      badge: 'Agent · Autonomous Synthesis',
      badgeColor: 'bg-violet-400/80',
      sender: 'Ukin Assistant',
      initials: 'UK',
      avatarBg: 'bg-violet-500/20 text-violet-200',
      body: 'I’ve prepared a remediation plan for the EU tenant retry spikes. Would you like me to log a blocking sprint task and assign it to Maya?',
      meta: 'Target sprint: Sprint 24 · Due Thursday 2:00 PM',
      metaIcon: CheckSquare,
    },
    right: {
      badge: 'Action Proposal',
      badgeClass: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
      tag: 'Ukin Proposal',
      title: 'Trace EU tenant retry spikes',
      desc: 'Drafted actionable Jira/Kanban task containing reproduction steps, linked telemetry traces, and proposed configuration patch.',
      fields: [
        { label: 'Owner', value: 'Maya Chen' },
        { label: 'Due', value: 'Thursday · Sprint 24' },
      ],
      actionText: 'Review and authorize plan',
      actionIcon: Zap,
      nextStage: 3,
    },
  },
  {
    id: 'decision',
    source: '#release-planning · Governance Log',
    sourceIcon: Zap,
    sourceTime: '10:45 AM',
    left: {
      badge: 'Decision · Stakeholder Signoff',
      badgeColor: 'bg-amber-400/80',
      sender: 'Alex Mercer (Lead)',
      initials: 'AM',
      avatarBg: 'bg-amber-500/20 text-amber-200',
      body: 'Approved. Maya, take this up as the primary release blocker. Let’s make sure we test against EU staging before merge.',
      meta: 'Policy check: Explicit human authorization confirmed & audited',
      metaIcon: ShieldCheck,
    },
    right: {
      badge: 'Approved',
      badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      tag: 'Human Governance Boundary',
      title: 'Consensus Log Recorded',
      desc: 'Human-in-the-loop governance verified. Ukin is authorized to dispatch work, commit backlog items, and update customer incident monitors.',
      fields: [
        { label: 'Approver', value: 'Alex Mercer (Tech Lead)' },
        { label: 'Audit Hash', value: 'sec_auth_902f4' },
      ],
      actionText: 'Dispatch task to board',
      actionIcon: CheckSquare,
      nextStage: 4,
    },
  },
  {
    id: 'task',
    source: 'Kanban Sprint Board · Active',
    sourceIcon: CheckSquare,
    sourceTime: '10:46 AM',
    left: {
      badge: 'Task · Execution Board',
      badgeColor: 'bg-emerald-400/80',
      sender: 'Sprint Backlog',
      initials: 'SB',
      avatarBg: 'bg-emerald-500/20 text-emerald-200',
      body: 'Task [TSK-891] moved to In Progress. Branch feat/eu-sso-ttl created with linked PR #1042.',
      meta: 'PR #1042: Token cache TTL recovery (14 CI checks passing)',
      metaIcon: CheckSquare,
    },
    right: {
      badge: 'In Progress',
      badgeClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-400/30',
      tag: 'Board Execution',
      title: 'TSK-891: Trace EU tenant retry spikes',
      desc: 'Remediation branch deployed to staging. Automated test suite validating token refresh under synthetic European tenant load.',
      fields: [
        { label: 'Assignee', value: 'Maya Chen' },
        { label: 'Status', value: 'In Progress (PR #1042)' },
      ],
      actionText: 'Verify resolution & telemetry',
      actionIcon: Check,
      nextStage: 5,
    },
  },
  {
    id: 'outcome',
    source: '#infra-alerts & Status Page',
    sourceIcon: Check,
    sourceTime: '11:15 AM',
    left: {
      badge: 'Outcome · Verified Delivery',
      badgeColor: 'bg-emerald-300',
      sender: 'Release Telemetry',
      initials: 'RT',
      avatarBg: 'bg-emerald-500/20 text-emerald-200',
      body: 'Patch deployed to EU cluster. Retry spikes dropped to 0.00%. All enterprise single-sign-on authentications verified.',
      meta: 'Verified outcome: Latency improved 94ms across 12k logins',
      metaIcon: Check,
    },
    right: {
      badge: 'Resolved',
      badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      tag: 'Zero Friction Delivery',
      title: 'Rollout Unblocked on Schedule',
      desc: 'Customer status brief auto-generated, changelog committed, and all 4 stakeholder channels notified with zero manual status meetings.',
      fields: [
        { label: 'Impact', value: '0.00% Error Rate' },
        { label: 'Saved Time', value: '3.5 Dev Hours' },
      ],
      actionText: 'Replay workflow from signal',
      actionIcon: RotateCcw,
      nextStage: 0,
    },
  },
];

/* ─── Stage arrow connector — SVG precision ─── */
function StageArrow({ active }) {
  return (
    <div className="relative hidden h-4 w-5 shrink-0 items-center justify-center sm:flex" aria-hidden="true">
      <svg viewBox="0 0 20 8" className="h-full w-full overflow-visible">
        <path
          d="M0 4 L16 4"
          fill="none"
          stroke={active ? 'rgba(165,180,252,0.65)' : 'rgba(165,180,252,0.2)'}
          strokeWidth="0.75"
          strokeDasharray={active ? 'none' : '2 3'}
          className="transition-all duration-300"
        />
        <polygon
          points="16,1.5 20,4 16,6.5"
          fill={active ? 'rgba(165,180,252,0.65)' : 'rgba(165,180,252,0.2)'}
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );
}

/* ─── Stage interactive pill button ─── */
function StagePill({ stage, isActive, isSelected, onClick }) {
  const Icon = stage.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9.5px] font-medium transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus',
        isSelected
          ? 'bg-brand text-white shadow-[0_2px_8px_rgba(49,86,207,0.3)] ring-1 ring-brand'
          : isActive
          ? 'bg-brand/[0.08] text-brand-text ring-1 ring-brand/15 hover:bg-brand/[0.12]'
          : 'text-ink-muted hover:text-ink hover:bg-surface-hover',
      )}
      aria-current={isSelected ? 'step' : undefined}
    >
      <Icon
        className="h-3 w-3 shrink-0"
        style={{ color: isSelected ? '#ffffff' : isActive ? stage.color : undefined }}
        aria-hidden="true"
      />
      {stage.label}
    </button>
  );
}

export default function WorkflowSpotlight() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const reduceMotion = useReducedMotion();
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });

  const currentStage = STAGE_CONTENT[activeStageIdx] || STAGE_CONTENT[0];
  const SourceIcon = currentStage.sourceIcon;
  const MetaIcon = currentStage.left.metaIcon;
  const ActionIcon = currentStage.right.actionIcon;

  return (
    <section ref={sectionRef} id="workflows" className="relative overflow-hidden bg-transparent py-20 text-ink md:py-28">

      {/* Section hairline — visual continuity */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/12 to-transparent" />

      {/* Ambient background depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[8rem] top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-brand/[0.04] blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16 lg:px-8">

        {/* ── Left: Copy + workflow strip ── */}
        <motion.div
          {...getSectionHeaderMotion(inView, reduceMotion)}
          className="max-w-lg"
        >
          <p className="mb-6 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle">
            <span className="h-px w-7 bg-brand" /> THE WORK, IN CONTEXT
          </p>
          <h2 className="font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
            A signal comes in.
            <span className="mt-1 block font-display italic text-brand-text">The work moves on.</span>
          </h2>

          {/* ── Workflow stage pipeline ── */}
          <div className="mt-10 border-t border-border pt-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[9.5px] font-medium uppercase tracking-[0.16em] text-ink-subtle">
                One workflow · signal to outcome
              </p>
              <span className="text-[9px] font-mono text-ink-subtle hidden sm:inline">
                Click any step to scrub
              </span>
            </div>
            <div
              role="list"
              aria-label="Workflow stages: Signal to Outcome"
              className="flex flex-wrap items-center gap-y-2"
            >
              {WORKFLOW_STAGES.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <div role="listitem">
                    <StagePill
                      stage={stage}
                      isActive={i <= activeStageIdx}
                      isSelected={i === activeStageIdx}
                      onClick={() => setActiveStageIdx(i)}
                    />
                  </div>
                  {i < WORKFLOW_STAGES.length - 1 && (
                    <StageArrow active={i < activeStageIdx} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Context thread legend */}
            <div className="mt-6 flex items-center gap-3">
              <svg width="28" height="8" viewBox="0 0 28 8" className="shrink-0 overflow-visible" aria-hidden="true">
                <path d="M0 4 L24 4" fill="none" stroke="rgba(129,140,248,0.45)" strokeWidth="0.7" strokeDasharray="2 3" />
                <circle cx="2"  cy="4" r="1.5" fill="rgba(129,140,248,0.65)" />
                <circle cx="24" cy="4" r="1.5" fill="rgba(129,140,248,0.65)" />
              </svg>
              <span className="text-[10px] text-ink-subtle">Context travels through every step</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Browser frame ── */}
        <motion.div
          {...getSectionContentMotion(inView, reduceMotion)}
          className="relative min-w-0"
        >
          <TiltCard maxTilt={5}>
            <BrowserFrame address="app.ultrakin.com/workflows/release-planning">
              <div className="relative overflow-hidden border border-obsidian-border bg-obsidian-canvas p-3 shadow-[0_20px_42px_-32px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.065)] sm:p-5">

                {/* Top fade */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-obsidian-surface/40 to-transparent" />

                {/* Signal source header */}
                <div className="flex items-center justify-between border-b border-obsidian-border-soft px-2 pb-3 sm:px-3">
                  <div className="flex items-center gap-2 text-[11px] font-medium text-slate-200">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-obsidian-elevated text-indigo-200">
                      <SourceIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="truncate">{currentStage.source}</span>
                  </div>

                  {/* 6-Stage mini pipeline indicator */}
                  <div className="hidden items-center gap-1 sm:flex" aria-label="Workflow pipeline">
                    {WORKFLOW_STAGES.map((stg, i) => (
                      <React.Fragment key={stg.id}>
                        <button
                          type="button"
                          onClick={() => setActiveStageIdx(i)}
                          title={`${stg.label} (Step ${i + 1})`}
                          className={cn(
                            'flex h-[18px] w-[18px] items-center justify-center rounded-sm text-[7.5px] font-semibold transition-all duration-200 cursor-pointer',
                            i === activeStageIdx
                              ? 'bg-indigo-500 text-white shadow-sm ring-1 ring-indigo-400'
                              : i < activeStageIdx
                              ? 'bg-indigo-500/25 text-indigo-200 ring-1 ring-indigo-400/30'
                              : 'bg-white/[0.04] text-obsidian-muted hover:text-slate-200',
                          )}
                        >
                          {stg.letter}
                        </button>
                        {i < WORKFLOW_STAGES.length - 1 && (
                          <span className="h-px w-1.5 bg-obsidian-border-soft" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <span className="ml-3 shrink-0 font-mono text-[9px] text-ink-subtle">{currentStage.sourceTime}</span>
                </div>

                {/* 3-col layout */}
                <div className="grid gap-4 py-5 sm:grid-cols-[minmax(0,1.08fr)_72px_minmax(0,.92fr)] sm:items-center sm:gap-2 sm:px-2 sm:py-8">

                  {/* ── Left Stage Card ── */}
                  <TiltCard maxTilt={10} className="relative rounded-xl" style={{ borderRadius: '0.75rem' }}>
                    <div
                      className={cn(
                        'relative rounded-xl border bg-obsidian-surface px-4 py-4 shadow-[0_16px_32px_-24px_rgba(0,0,0,.88),inset_0_1px_0_rgba(220,224,255,.055)] sm:min-h-[220px] sm:p-5 transition-all duration-300',
                        'border-indigo-500/30 shadow-[0_0_24px_-6px_rgba(99,102,241,0.2)]',
                      )}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`left-card-${activeStageIdx}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="flex h-full flex-col justify-between"
                        >
                          <div>
                            {/* Stage chip */}
                            <div className="mb-3 flex items-center gap-1.5">
                              <span className={cn('h-1.5 w-1.5 rounded-full', currentStage.left.badgeColor)} aria-hidden="true" />
                              <span className="text-[8px] font-semibold uppercase tracking-[0.17em] text-indigo-300/70">
                                {currentStage.left.badge}
                              </span>
                            </div>

                            {/* Author */}
                            <div className="mb-3 flex items-center gap-2.5">
                              <span className={cn('flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-semibold', currentStage.left.avatarBg)}>
                                {currentStage.left.initials}
                              </span>
                              <span className="text-[11px] font-medium text-slate-200">
                                {currentStage.left.sender}
                              </span>
                            </div>

                            {/* Body quote / statement */}
                            <p className="text-[12.5px] leading-[1.7] text-slate-300">
                              &ldquo;{currentStage.left.body}&rdquo;
                            </p>
                          </div>

                          {/* Context meta indicator */}
                          <div className="mt-4 flex items-center gap-2 border-t border-obsidian-border pt-3 text-[10px] text-ink-subtle">
                            <MetaIcon className="h-3 w-3 shrink-0 text-brand-text" aria-hidden="true" />
                            <span className="truncate">{currentStage.left.meta}</span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </TiltCard>

                  {/* ── Animated flow connector ── */}
                  <FlowConnector reduceMotion={reduceMotion} activePulse={activeStageIdx >= 1} />

                  {/* ── Right Stage Card ── */}
                  <TiltCard maxTilt={10} className="relative rounded-xl" style={{ borderRadius: '0.75rem' }}>
                    <div
                      className={cn(
                        'relative rounded-xl border bg-obsidian-base px-4 py-4 text-white shadow-[0_18px_38px_-25px_rgba(0,0,0,.72),inset_0_1px_0_rgba(220,224,255,.07)] sm:min-h-[220px] sm:px-5 sm:py-5 transition-all duration-300',
                        'border-violet-500/35 shadow-[0_0_24px_-6px_rgba(139,92,246,0.22)]',
                      )}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`right-card-${activeStageIdx}`}
                          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="flex h-full flex-col justify-between"
                        >
                          <div>
                            {/* Stage chip + status badge */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-obsidian-muted">
                                {currentStage.right.tag}
                              </span>
                              <span className={cn('rounded-full border px-2 py-0.5 text-[8.5px] font-medium', currentStage.right.badgeClass)}>
                                {currentStage.right.badge}
                              </span>
                            </div>

                            {/* Headline */}
                            <h3 className="mt-3 text-[15px] font-medium leading-snug tracking-[-0.02em] text-white">
                              {currentStage.right.title}
                            </h3>

                            {/* Description narrative */}
                            <p className="mt-2 text-[11px] leading-5 text-obsidian-muted">
                              {currentStage.right.desc}
                            </p>

                            {/* Contextual fields */}
                            <div className="mt-3 space-y-1.5 border-t border-white/[0.08] pt-2.5 text-[10px]">
                              {currentStage.right.fields.map((f) => (
                                <div key={f.label} className="flex items-center justify-between gap-3">
                                  <span className="text-obsidian-muted">{f.label}</span>
                                  <span className="font-medium text-slate-200">{f.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action button advancing narrative */}
                          <button
                            type="button"
                            onClick={() => setActiveStageIdx(currentStage.right.nextStage)}
                            className={cn(
                              'mt-4 flex min-h-9 w-full items-center justify-center gap-2 rounded-md px-3 text-[11px] font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian-base cursor-pointer',
                              activeStageIdx === 5
                                ? 'bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/25 border border-emerald-400/30'
                                : activeStageIdx === 3 || activeStageIdx === 4
                                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.35)]'
                                : 'bg-brand text-white hover:bg-brand-hover shadow-[0_4px_12px_rgba(49,86,207,0.3)]',
                            )}
                          >
                            <ActionIcon className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{currentStage.right.actionText}</span>
                          </button>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </TiltCard>

                </div>

                {/* ── Bottom: workflow breadcrumb ── */}
                <div className="flex items-center justify-between border-t border-obsidian-border-soft px-2 pt-3 text-[9px] text-ink-subtle sm:px-3">
                  <span className="flex items-center gap-1.5">
                    <span className="font-semibold text-indigo-200">
                      Step {activeStageIdx + 1}: {WORKFLOW_STAGES[activeStageIdx].label}
                    </span>
                    <ArrowRight className="h-2.5 w-2.5 text-obsidian-muted" aria-hidden="true" />
                    <span className="text-obsidian-muted">
                      {activeStageIdx < 5 ? `Next: ${WORKFLOW_STAGES[activeStageIdx + 1].label}` : 'End-to-End Complete'}
                    </span>
                  </span>
                  <span className="hidden sm:inline">Interactive Context Graph · Live Sample</span>
                </div>

              </div>
            </BrowserFrame>
          </TiltCard>
        </motion.div>

        {/* ── Micro-CTA: Inter-section discovery ── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border/70 pt-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
            <span>Telemetry and context streams connect natively across workspaces, tools, and autonomous agents.</span>
          </div>
          <button
            type="button"
            onClick={() => navigate('/products/automations')}
            className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-brand-text transition-colors hover:text-ink cursor-pointer"
          >
            <span>See automation pipeline specs</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Bottom hairline — continuity to BentoGrid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" />
    </section>
  );
}
