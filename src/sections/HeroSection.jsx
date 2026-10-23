import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  AtSign,
  Bot,
  FolderOpen,
  MessageSquare,
  Mail,
  FileText,
  Video,
  ArrowRight,
  Shield,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Radio,
  CheckCircle2,
  CheckSquare,
  GitBranch,
} from 'lucide-react';
import Button from '../components/primitives/Button';
import Badge from '../components/primitives/Badge';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { cn } from '../lib/cn';
import { useWorkspace } from '../context/WorkspaceContext';
import MatrixChatEngine from '../components/showcase/MatrixChatEngine';
import DomainMailboxEngine from '../components/showcase/DomainMailboxEngine';
import LivingDocEditor from '../components/showcase/LivingDocEditor';
import HuddleSimulator from '../components/showcase/HuddleSimulator';
import KanbanTaskBoard from '../components/showcase/KanbanTaskBoard';
import VisualAutomationsCanvas from '../components/showcase/VisualAutomationsCanvas';
import EventBusTelemetryDrawer from '../components/showcase/EventBusTelemetryDrawer';
import WorkspaceToastContainer from '../components/showcase/WorkspaceToastContainer';

export function HeroThreadsView() {
  const { activeChannel, activeMessages, channels, setActiveChannel, huddleTranscript, setActiveModule } = useWorkspace();
  const channel = channels.find((item) => item.id === activeChannel) || channels[0];

  return (
    <div className="flex min-h-[580px] flex-col bg-[#0B0F19] text-slate-200">
      <div className="flex min-h-12 items-center justify-between border-b border-white/8 bg-[#0F172A]/70 px-4">
        <div className="flex items-center gap-2"><AtSign className="h-4 w-4 text-indigo-300" /><span className="text-sm font-semibold text-white">Threads</span><span className="text-xs text-slate-500">· Workspace context</span></div>
        <span className="text-[10px] text-slate-500">{activeMessages.length + 1} updates</span>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[#07090E]/70 p-3 md:border-b-0 md:border-r">
          <p className="px-2 py-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">Recent threads</p>
          {channels.map((item) => <button key={item.id} type="button" onClick={() => setActiveChannel(item.id)} aria-current={activeChannel === item.id ? 'page' : undefined} className={cn('mb-1 w-full rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-white/[0.05]', activeChannel === item.id ? 'bg-indigo-500/15 text-indigo-100' : 'text-slate-400')}><span className="block truncate text-xs font-medium">{item.name.replaceAll('-', ' ')}</span><span className="mt-1 block truncate text-[10px] text-slate-500">{item.topic}</span></button>)}
        </aside>
        <div className="min-w-0 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-3 border-b border-white/8 pb-4"><div><p className="text-[10px] font-mono uppercase tracking-wider text-indigo-300">Connected discussion</p><h2 className="mt-1 text-base font-semibold text-white">#{channel.name}</h2><p className="mt-1 text-xs text-slate-500">{channel.topic}</p></div><span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-2 py-1 text-[9px] text-emerald-200">Context retained</span></div>
          <div className="mt-5 space-y-4">
            {activeMessages.map((message) => <article key={message.id} className="flex gap-3"><span className={cn('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white', message.avatarBg)}>{message.avatar}</span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline gap-x-2"><span className="text-xs font-medium text-white">{message.sender}</span><span className="text-[10px] text-slate-500">{message.time}</span></div><p className="mt-1 text-xs leading-5 text-slate-300">{message.text}</p></div></article>)}
            <article className="flex gap-3 rounded-lg border border-violet-400/15 bg-violet-400/[0.04] p-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-[10px] font-semibold text-violet-200">UK</span><div><div className="flex items-baseline gap-2"><span className="text-xs font-medium text-white">Ukin connected the Huddle</span><span className="text-[10px] text-slate-500">{huddleTranscript.at(-1)?.time || '10:42 AM'}</span></div><p className="mt-1 text-xs leading-5 text-slate-300">{huddleTranscript.find((entry) => entry.isAgent)?.text || 'A Huddle commitment is linked to this conversation.'}</p></div></article>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4"><p className="text-[10px] text-slate-500">Messages and meeting commitments stay in one reviewable thread.</p><button type="button" onClick={() => setActiveModule('chat')} className="rounded-md border border-white/10 px-3 py-2 text-xs text-slate-300 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">Open in Chat <ArrowRight className="ml-1 inline h-3 w-3" /></button></div>
        </div>
      </div>
    </div>
  );
}

export function HeroFilesView() {
  const { setActiveModule, docChecklists, kanbanTasks } = useWorkspace();
  const [selectedFile, setSelectedFile] = useState('RFC-891');
  const files = [
    { id: 'RFC-891', name: 'Redis Sentinel Latency Hardening & Token Caching', type: 'Living Doc', updated: '10:48 AM', owner: 'Alex Mercer', icon: FileText, destination: 'docs' },
    { id: 'PR #1042', name: 'Token cache TTL recovery', type: 'Code review · 14 checks', updated: '10:44 AM', owner: 'Sara Chen', icon: GitBranch, destination: 'tasks' },
    { id: 'Huddle #18', name: 'Architecture sync transcript', type: 'Meeting transcript · 18 min', updated: '10:42 AM', owner: 'Ukin Scribe', icon: Video, destination: 'huddle' },
    { id: 'Sprint 24', name: 'EU cluster recovery checklist', type: `${docChecklists.length} checklist items`, updated: '10:40 AM', owner: kanbanTasks.find((task) => task.id === 'tsk_2')?.assignee || 'Sara Chen', icon: CheckSquare, destination: 'tasks' },
  ];
  const selected = files.find((file) => file.id === selectedFile) || files[0];
  const FileIcon = selected.icon;

  return (
    <div className="flex min-h-[580px] flex-col bg-[#0B0F19] text-slate-200">
      <div className="flex min-h-12 items-center justify-between border-b border-white/8 bg-[#0F172A]/70 px-4"><div className="flex items-center gap-2"><FolderOpen className="h-4 w-4 text-indigo-300" /><span className="text-sm font-semibold text-white">Files</span><span className="text-xs text-slate-500">· Acme Platform Team</span></div><span className="text-[10px] text-slate-500">Shared workspace</span></div>
      <div className="grid flex-1 md:grid-cols-[minmax(0,1.15fr)_minmax(240px,.85fr)]">
        <div className="min-w-0 border-b border-white/8 p-4 md:border-b-0 md:border-r sm:p-6"><div className="mb-4 grid grid-cols-[minmax(0,1fr)_72px] gap-3 border-b border-white/8 px-2 pb-2 text-[9px] font-mono uppercase tracking-wider text-slate-500 sm:grid-cols-[minmax(0,1fr)_100px_84px]"><span>Name</span><span>Updated</span><span className="hidden sm:block">Owner</span></div>{files.map((file) => { const Icon = file.icon; return <button key={file.id} type="button" onClick={() => setSelectedFile(file.id)} aria-pressed={selectedFile === file.id} className={cn('grid w-full grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-md border-b border-white/[0.045] px-2 py-3 text-left transition-colors hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:grid-cols-[minmax(0,1fr)_100px_84px]', selectedFile === file.id && 'bg-indigo-400/[0.07]')}><span className="flex min-w-0 items-center gap-2.5"><Icon className="h-4 w-4 shrink-0 text-slate-400" /><span className="min-w-0"><span className="block truncate text-xs font-medium text-slate-200">{file.name}</span><span className="mt-1 block truncate text-[10px] text-slate-500">{file.type}</span></span></span><span className="text-[10px] text-slate-500">{file.updated}</span><span className="hidden truncate text-[10px] text-slate-500 sm:block">{file.owner}</span></button>; })}</div>
        <aside className="flex flex-col p-4 sm:p-6"><p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">File preview</p><div className="mt-4 rounded-xl border border-white/8 bg-[#07090E] p-4"><div className="flex items-center gap-3 border-b border-white/8 pb-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-400/10"><FileIcon className="h-4 w-4 text-indigo-200" /></span><div className="min-w-0"><p className="truncate text-xs font-medium text-white">{selected.name}</p><p className="mt-1 text-[10px] text-slate-500">{selected.type} · {selected.updated}</p></div></div><p className="mt-4 text-xs leading-5 text-slate-400">This workspace item is linked to the EU cluster recovery. Its discussion, decisions, and follow-up remain connected across Ultrakin.</p><div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-400/10 bg-emerald-400/[0.04] px-3 py-2 text-[10px] text-emerald-200"><CheckCircle2 className="h-3.5 w-3.5" />Shared with Acme Platform Team</div></div><button type="button" onClick={() => setActiveModule(selected.destination)} className="mt-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300">Open linked {selected.destination === 'huddle' ? 'Huddle' : selected.destination === 'docs' ? 'Doc' : 'Task'} <ArrowRight className="h-3.5 w-3.5" /></button></aside>
      </div>
    </div>
  );
}

function HeroWorkflowPreview() {
  const reduceMotion = useReducedMotion();
  const float = (delay = 0, distance = 5) => reduceMotion ? {} : {
    animate: { y: [0, -distance, 0] },
    transition: { duration: 7, delay, repeat: Infinity, ease: 'easeInOut' },
  };

  return (
    <div className="pointer-events-none relative mx-auto h-[310px] w-full max-w-[440px] select-none sm:h-[340px]" aria-hidden="true">
      <motion.div
        className="absolute inset-[5%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(124,94,255,.27),rgba(99,102,241,.09)_44%,transparent_74%)] blur-3xl"
        animate={reduceMotion ? undefined : { opacity: [0.55, 0.8, 0.55], scale: [0.98, 1.03, 0.98] }}
        transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <svg viewBox="0 0 440 340" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M300 88 C340 101 357 118 367 142" fill="none" stroke="rgba(165,180,252,.32)" strokeWidth="1.2" strokeDasharray="2 5" />
        <path d="M355 198 C337 222 318 234 292 254" fill="none" stroke="rgba(165,180,252,.32)" strokeWidth="1.2" strokeDasharray="2 5" />
        <circle cx="300" cy="88" r="2.5" fill="rgba(165,180,252,.7)" />
        <circle cx="292" cy="254" r="2.5" fill="rgba(165,180,252,.7)" />
      </svg>

      <motion.div {...float(0, 4)} style={{ rotate: -1.2 }} className="absolute left-[2%] top-[24%] z-20 w-[77%] rounded-xl border border-white/[0.15] bg-[#141925]/90 p-3.5 shadow-[0_22px_52px_-28px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl sm:left-[4%] sm:w-[75%] sm:p-4">
        <div className="flex items-center gap-2 text-[9px] text-slate-400"><MessageSquare className="h-3.5 w-3.5 text-indigo-300" /># launch-planning <span className="ml-auto text-slate-600">9:14</span></div>
        <p className="mt-2 text-[11px] leading-5 text-slate-200 sm:text-xs">“Keep the rollout decisions together?”</p>
        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-slate-500"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-violet-500/35 text-[7px] text-violet-100">MC</span>Maya Chen <span className="text-slate-700">·</span> 3 replies</div>
      </motion.div>

      <motion.div {...float(0.7, 5)} style={{ rotate: 1.5 }} className="absolute right-[1%] top-[42%] z-30 w-[64%] rounded-xl border border-emerald-300/[0.17] bg-[#111a20]/92 p-3 shadow-[0_22px_52px_-28px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl sm:right-0 sm:w-[61%] sm:p-3.5">
        <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-400/10 text-emerald-200"><FileText className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="truncate text-[10px] font-medium text-slate-100">Launch handoff guide</p><div className="mt-1.5 space-y-1"><span className="block h-1 w-[88%] rounded bg-white/[0.12]" /><span className="block h-1 w-[64%] rounded bg-white/[0.08]" /></div></div></div>
      </motion.div>

      <motion.div {...float(1.4, 4)} style={{ rotate: -0.6 }} className="absolute bottom-[3%] left-[12%] z-40 w-[69%] rounded-xl border border-amber-300/[0.16] bg-[#151820]/95 p-3 shadow-[0_22px_52px_-28px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.07)] backdrop-blur-xl sm:left-[16%] sm:w-[66%] sm:p-3.5">
        <div className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-400/10 text-amber-200"><CheckSquare className="h-3.5 w-3.5" /></span><div className="min-w-0"><p className="truncate text-[10px] font-medium text-slate-100">Review rollout checklist</p><p className="mt-0.5 text-[9px] text-slate-400">Maya Chen <span className="px-1 text-slate-700">·</span> Due Thu</p></div><CheckCircle2 className="ml-auto h-3.5 w-3.5 shrink-0 text-emerald-300" /></div>
      </motion.div>

      <motion.div {...float(2.1, 3)} style={{ rotate: 1 }} className="absolute right-[2%] top-[4%] z-50 rounded-lg border border-indigo-300/[0.18] bg-[#171827]/95 px-3 py-2.5 shadow-[0_16px_38px_-22px_rgba(0,0,0,.95),0_0_22px_-14px_rgba(129,140,248,.48)] backdrop-blur-xl">
        <div className="flex items-center gap-2 text-[9px] font-medium text-indigo-100"><span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-400/15 text-indigo-200"><Sparkles className="h-3 w-3" /></span>Pattern found <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /></div>
        <p className="mt-1.5 pl-7 text-[8px] text-slate-400">3 repeated mentions</p>
      </motion.div>
    </div>
  );
}

function HeroWorkspaceContent() {
  const {
    activeModule,
    setActiveModule,
    activeChannel,
    setActiveChannel,
    channels,
    emails,
    kanbanTasks,
  } = useWorkspace();

  const unreadEmailCount = emails.filter((e) => e.unread).length;

  return (
    <>
    <section id="hero" className="relative overflow-hidden bg-[#07090E] pt-20 pb-14 md:pt-24 md:pb-16">
      {/* Quiet brand glow */}
      <div
        className="pointer-events-none absolute -top-32 right-[-12%] h-[620px] w-[820px] rounded-full blur-[140px] opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99,102,241,0.28) 0%, rgba(139,92,246,0.12) 38%, rgba(7,9,14,0) 72%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,.92fr)] lg:gap-12 xl:gap-16">
          <div className="max-w-[700px]">
            <div className="mb-5">
              <Badge
                variant="indigo"
                size="md"
                dot
                className="border-indigo-500/30 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-indigo-500/15 px-3 py-1"
              >
                <span className="font-semibold text-indigo-300 tracking-wider">ULTRAKIN</span>
                <span className="text-white/30 mx-1.5">|</span>
                <span className="text-slate-300 font-normal">People, tools, and agents in one app</span>
              </Badge>
            </div>

            <h1 className="max-w-[680px] font-display text-[clamp(2.6rem,4.5vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.045em] text-white">
              <span className="block">The autonomous</span>
              <span className="block">workspace for</span>
              <span className="block bg-gradient-to-r from-[#818CF8] to-[#38BDF8] bg-clip-text text-transparent">fast teams.</span>
            </h1>

            <p className="mt-5 max-w-[540px] text-[17px] leading-7 tracking-[-0.01em] text-slate-300/85 sm:text-[18px]">
              Chat, mail, docs, huddles, and tasks—connected by agents that carry context into what happens next.
            </p>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button
                variant="primary"
                size="lg"
                iconRight={ArrowRight}
                className="w-full sm:w-auto text-[15px] px-7 h-12 shadow-[0_0_0_1px_rgba(255,255,255,0.16)_inset,0_8px_22px_-7px_rgba(99,102,241,0.42)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.22)_inset,0_11px_28px_-7px_rgba(99,102,241,0.5)]"
                onClick={() => window.open('https://app.ultrakin.com/auth', '_blank', 'noopener,noreferrer')}
              >
                Start free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto text-[15px] px-6 h-12 bg-white/[0.035] border border-white/10 text-slate-200 hover:bg-white/[0.07]"
                iconRight={ArrowRight}
                onClick={() => document.getElementById('workspace-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See how it works
              </Button>
            </div>

          </div>

          <HeroWorkflowPreview />
        </div>
      </div>
    </section>

    <section id="workspace-showcase" className="relative border-t border-white/[0.06] bg-[#07090E] pb-20 pt-14 md:pb-24 md:pt-18">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-8 flex items-end justify-between gap-6">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.035em] text-white sm:text-3xl">Everything in one workspace</h2>
        </header>
        {/* =========================================================================
            100% PURE-CODE INTERACTIVE APPLICATION FRAME (Zero External Video Files)
           ========================================================================= */}
        <div
          className="mt-6 lg:mt-8 relative"
          style={{
            perspective: '1400px',
          }}
        >
          {/* Dynamic Ambient Backglow matching active module */}
          <div
            className={cn(
              'pointer-events-none absolute -inset-4 sm:-inset-8 rounded-3xl blur-3xl opacity-35 transition-all duration-700 -z-10',
              activeModule === 'chat' && 'bg-gradient-to-b from-indigo-500/30 via-indigo-600/10 to-transparent',
              activeModule === 'mail' && 'bg-gradient-to-b from-sky-500/30 via-sky-600/10 to-transparent',
              activeModule === 'docs' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent',
              activeModule === 'huddle' && 'bg-gradient-to-b from-violet-500/30 via-violet-600/10 to-transparent',
              activeModule === 'tasks' && 'bg-gradient-to-b from-amber-500/30 via-amber-600/10 to-transparent',
              activeModule === 'automations' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent'
            )}
          />

          {/* Floating Contextual Badge 1: Megolm E2EE Security */}
          <div className="absolute -top-4 -right-1 sm:-top-5 sm:right-6 lg:-right-4 z-40 select-none">
            <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#0B0F19]/90 backdrop-blur-xl border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(16,185,129,0.18)] ring-1 ring-white/5 transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                  <span>Megolm E2EE Protocol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Zero-Knowledge Tenant Boundary</div>
              </div>
            </div>
          </div>

          {/* Floating Contextual Badge 2: Ukin Autonomous Agent Action */}
          <div className="hidden sm:block absolute top-1/3 -left-3 lg:-left-6 z-40 select-none">
            <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#0B0F19]/90 backdrop-blur-xl border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(99,102,241,0.22)] ring-1 ring-white/5 transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                  <span>Ukin Sentinel Auto-Triage</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">PR #419</span>
                </div>
                <div className="text-[10px] text-slate-400">Correlated #incident-ops &amp; drafted patch</div>
              </div>
            </div>
          </div>

          {/* Floating Contextual Badge 3: In-Memory Event Bus Telemetry */}
          <div className="absolute -bottom-4 right-3 sm:-bottom-5 sm:right-8 lg:right-6 z-40 select-none">
            <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#0B0F19]/90 backdrop-blur-xl border border-white/12 shadow-[0_12px_32px_rgba(0,0,0,0.6),0_0_16px_rgba(56,189,248,0.18)] ring-1 ring-white/5 transition-transform duration-300 hover:scale-105">
              <div className="w-6 h-6 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                  <span>Unified Event Bus</span>
                  <span className="text-[9px] font-mono text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.2 rounded">0.8ms</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Chat · Docs · Mail · Huddles in Sync</div>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl border border-white/12 bg-[#0B0F19] transition-transform duration-700 ease-out hover:rotate-x-0 overflow-hidden relative group/showcase"
            style={{
              transform: 'rotateX(0.7deg) translateZ(0)',
              transformStyle: 'preserve-3d',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.12), 0 20px 50px -10px rgba(0,0,0,0.9), 0 40px 100px -20px rgba(0,0,0,0.95), 0 0 80px -15px rgba(99,102,241,0.22)',
            }}
          >
            {/* Specular Screen Glass Reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-44 z-20 opacity-[0.16] select-none overflow-hidden"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 30%, transparent 100%)',
              }}
            />

            {/* Window Chrome Title Bar */}
            <div className="h-11 px-4 bg-[#0F172A]/90 border-b border-white/8 flex items-center justify-between select-none relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.3)]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                  app.ultrakin.com/workspace/acme-eng
                  {activeModule === 'chat' ? `#${activeChannel}` : `/${activeModule}`}
                </span>
              </div>

              <div className="hidden items-center gap-3 md:flex">
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span className="hidden md:inline">Kernel Synced</span> (0.8ms)
                </span>
              </div>
            </div>

            {/* Application Workspace Shell (64px Rail + 220px Sidebar + Main Viewport + 340px Drawer) */}
            <div className="grid grid-cols-1 md:grid-cols-[64px_220px_1fr] lg:grid-cols-[64px_220px_1fr_340px] min-h-[620px] bg-[#07090E]">
              {/* 1. 64px Workspace Left Rail */}
              <div className="hidden md:flex flex-col items-center py-4 bg-[#07090E] border-r border-white/6 gap-4 select-none">
                {/* Active Workspace Squircle */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-transform hover:scale-105 drop-shadow-[0_0_12px_rgba(99,102,241,0.5)]"
                  title="Ultrakin Enterprise Workspace"
                >
                  <UltrakinLogo size={36} id="uk-rail-logo-grad" />
                </div>

                <div className="w-8 h-[1px] bg-white/10" />

                {/* Module Quick Switchers */}
                <button
                  type="button"
                  onClick={() => setActiveModule('chat')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'chat'
                      ? 'bg-white/15 text-indigo-400 border border-indigo-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Matrix Spaces Chat"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>

                <button type="button" onClick={() => setActiveModule('threads')} className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer', activeModule === 'threads' ? 'bg-white/15 text-indigo-300 border border-indigo-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5')} title="Threads" aria-label="Threads">
                  <AtSign className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('mail')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'mail'
                      ? 'bg-white/15 text-sky-400 border border-sky-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Custom Domain Email"
                >
                  <Mail className="w-5 h-5" />
                  {unreadEmailCount > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('docs')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'docs'
                      ? 'bg-white/15 text-emerald-400 border border-emerald-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="TipTap Living Docs"
                >
                  <FileText className="w-5 h-5" />
                </button>

                <button type="button" onClick={() => setActiveModule('files')} className={cn('w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer', activeModule === 'files' ? 'bg-white/15 text-indigo-300 border border-indigo-400/30' : 'text-slate-400 hover:text-white hover:bg-white/5')} title="Files" aria-label="Files">
                  <FolderOpen className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('huddle')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'huddle'
                      ? 'bg-white/15 text-violet-400 border border-violet-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="WebRTC Huddle"
                >
                  <Video className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('tasks')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer relative',
                    activeModule === 'tasks'
                      ? 'bg-white/15 text-amber-400 border border-amber-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Sprint Kanban Board"
                >
                  <CheckSquare className="w-5 h-5" />
                  {kanbanTasks.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('automations')}
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer',
                    activeModule === 'automations'
                      ? 'bg-white/15 text-emerald-400 border border-emerald-400/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                  title="Visual Automations DAG"
                >
                  <GitBranch className="w-5 h-5" />
                </button>

                <div className="mt-auto flex flex-col items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-semibold border border-indigo-500/30"
                    title="Sara Chen (Principal Infra Engineer)"
                  >
                    SC
                  </div>
                </div>
              </div>

              {/* 2. 220px Contextual Sidebar */}
              <div className="hidden md:flex flex-col bg-[#0B0F19] border-r border-white/6 p-3 select-none text-xs">
                {/* Workspace Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/6 mb-3">
                  <div className="font-semibold text-white truncate flex items-center gap-1.5">
                    <UltrakinLogo size={14} id="uk-sidebar-header-grad" className="shrink-0" />
                    <span>Acme Platform Team</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>

                {/* Chat and Spaces */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Chat</span>
                    <span className="text-[10px] text-slate-600">Matrix E2EE</span>
                  </div>

                  {channels.map((ch) => {
                    const isSelected = activeModule === 'chat' && activeChannel === ch.id;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => {
                          setActiveChannel(ch.id);
                          setActiveModule('chat');
                        }}
                        className={cn(
                          'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer text-left',
                          isSelected
                            ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        )}
                      >
                        <span className="flex items-center gap-2 truncate">
                          <span className={isSelected ? 'text-indigo-400' : 'text-slate-500'}>#</span>
                          <span className="truncate">{ch.name}</span>
                        </span>
                        {ch.isAlert ? (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                        ) : ch.unread > 0 ? (
                          <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold shrink-0">
                            {ch.unread}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <button type="button" onClick={() => setActiveModule('threads')} className={cn('mt-3 w-full flex items-center gap-2 px-2.5 py-2 rounded-md font-medium text-left transition-colors cursor-pointer', activeModule === 'threads' ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5')}>
                  <AtSign className="h-3.5 w-3.5" /> Threads <span className="ml-auto text-[10px] text-slate-500">3</span>
                </button>

                {/* Active Huddle Banner */}
                <div className="mt-4 pt-3 border-t border-white/6">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Huddles
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('huddle')}
                    className={cn(
                      'w-full p-2 rounded-lg border text-emerald-300 flex items-center justify-between mt-1 cursor-pointer transition-colors',
                      activeModule === 'huddle'
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 shadow-sm'
                        : 'bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/15'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
                      <span className="font-semibold text-xs truncate">Sprint Architecture Sync</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-200 font-mono shrink-0">
                      4 online
                    </span>
                  </button>
                </div>

                {/* Docs and Files Navigation */}
                <div className="mt-4 pt-3 border-t border-white/6 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Docs
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('docs')}
                    className={cn(
                      'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                      activeModule === 'docs'
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    )}
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">Q4 EU Cluster RFC</span>
                  </button>
                  <button type="button" onClick={() => setActiveModule('files')} className={cn('w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer', activeModule === 'files' ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5')}>
                    <FolderOpen className="w-3.5 h-3.5 shrink-0 text-slate-400" /><span className="truncate">Files</span><span className="ml-auto text-[10px] text-slate-500">4</span>
                  </button>
                </div>

                {/* Kanban Tasks Navigation */}
                <div className="mt-3 pt-3 border-t border-white/6 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Tasks</span>
                    <span className="text-[10px] text-amber-400 font-bold font-mono">{kanbanTasks.length}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('tasks')}
                    className={cn(
                      'w-full flex items-center justify-between px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                      activeModule === 'tasks'
                        ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    )}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CheckSquare className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                      <span className="truncate">Sprint 24 Board</span>
                    </div>
                  </button>
                </div>

                {/* Visual Automations Navigation */}
                <div className="mt-3 pt-3 border-t border-white/6 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Agents
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('automations')}
                    className={cn(
                      'w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-left truncate transition-colors cursor-pointer',
                      activeModule === 'automations'
                        ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    )}
                  >
                    <Bot className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">Ukin workflows</span>
                  </button>
                </div>

                {/* Native Mailbox Counter */}
                <div className="mt-auto pt-3 border-t border-white/6">
                  <button
                    type="button"
                    onClick={() => setActiveModule('mail')}
                    className={cn(
                      'w-full flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer',
                      activeModule === 'mail'
                        ? 'bg-sky-600/20 text-sky-300 border border-sky-500/30'
                        : 'text-slate-400 hover:bg-white/5'
                    )}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">Domain Mail</span>
                    </span>
                    {unreadEmailCount > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold shrink-0">
                        {unreadEmailCount} new
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* 3. Main Multi-Mode Interactive Canvas (Sprint Week 2-6 Engines) */}
              <div className="flex flex-col bg-[#07090E] min-h-[580px] overflow-hidden relative">
                {activeModule === 'chat' && <MatrixChatEngine />}
                {activeModule === 'threads' && <HeroThreadsView />}
                {activeModule === 'mail' && <DomainMailboxEngine />}
                {activeModule === 'docs' && <LivingDocEditor />}
                {activeModule === 'files' && <HeroFilesView />}
                {activeModule === 'huddle' && <HuddleSimulator />}
                {activeModule === 'tasks' && <KanbanTaskBoard />}
                {activeModule === 'automations' && <VisualAutomationsCanvas />}
              </div>

              {/* 4. 340px Contextual Secondary Drawer: Kernel Telemetry & Ukin Action Engine */}
              <EventBusTelemetryDrawer />
            </div>

            {/* Reactive Telemetry Toast Container */}
            <WorkspaceToastContainer />
          </div>
        </div>

        {/* 4-Pillar Bento Jump Links Hub (Slack Enterprise Reverse-Engineered Standard) */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveModule('chat')}
            className={cn(
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group relative overflow-hidden',
              activeModule === 'chat'
                ? 'bg-[#1E293B]/90 border-indigo-500/50 shadow-[0_8px_24px_rgba(99,102,241,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-indigo-500/30'
                : 'bg-[#0F172A]/50 border-white/8 hover:bg-[#0F172A]/80 hover:border-white/16'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <MessageSquare className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-sm font-semibold text-white">01. Matrix Spaces Chat</div>
            <div className="text-xs text-slate-400 mt-1">Decentralized, E2EE team discussions with automated proposal cards.</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('mail')}
            className={cn(
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group relative overflow-hidden',
              activeModule === 'mail'
                ? 'bg-[#1E293B]/90 border-sky-500/50 shadow-[0_8px_24px_rgba(56,189,248,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-sky-500/30'
                : 'bg-[#0F172A]/50 border-white/8 hover:bg-[#0F172A]/80 hover:border-white/16'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Mail className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-sm font-semibold text-white">02. Native Domain Mail</div>
            <div className="text-xs text-slate-400 mt-1">Custom domain inboxes with 1-click conversion into Kanban tasks.</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('docs')}
            className={cn(
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group relative overflow-hidden',
              activeModule === 'docs'
                ? 'bg-[#1E293B]/90 border-emerald-500/50 shadow-[0_8px_24px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-emerald-500/30'
                : 'bg-[#0F172A]/50 border-white/8 hover:bg-[#0F172A]/80 hover:border-white/16'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-sm font-semibold text-white">03. TipTap Living Docs</div>
            <div className="text-xs text-slate-400 mt-1">CRDT collaborative specs with peer presence and live progress bars.</div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('huddle')}
            className={cn(
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group relative overflow-hidden',
              activeModule === 'huddle'
                ? 'bg-[#1E293B]/90 border-violet-500/50 shadow-[0_8px_24px_rgba(139,92,246,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-violet-500/30'
                : 'bg-[#0F172A]/50 border-white/8 hover:bg-[#0F172A]/80 hover:border-white/16'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <Video className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="text-sm font-semibold text-white">04. Live Huddle Transcripts</div>
            <div className="text-xs text-slate-400 mt-1">Instant WebRTC meetings with speech-to-text task extraction.</div>
          </button>
        </div>
      </div>
    </section>
    </>
  );
}

export default function HeroSection() {
  return <HeroWorkspaceContent />;
}
