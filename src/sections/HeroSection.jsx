import React from 'react';
import {
  MessageSquare,
  Mail,
  FileText,
  Video,
  ArrowRight,
  Shield,
  Sparkles,
  Terminal,
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
    <section id="hero" className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-[#07090E]">
      {/* Ambient Radial Atmospheric Depth */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full blur-[140px] opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.2) 35%, rgba(7,9,14,0) 70%)',
        }}
      />

      {/* Subtle Hairline Vector Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <Badge
            variant="indigo"
            size="md"
            dot
            className="border-indigo-500/30 bg-gradient-to-r from-indigo-500/15 via-purple-500/10 to-indigo-500/15 backdrop-blur-md shadow-[0_0_24px_rgba(99,102,241,0.25)] py-1.5 px-4"
          >
            <span className="font-semibold text-indigo-300 tracking-wider">ULTRAKIN 2.0</span>
            <span className="text-white/30 mx-1.5">|</span>
            <span className="text-slate-300 font-normal">The Autonomous Workspace Kernel for Enterprise</span>
          </Badge>
        </div>

        {/* Hero Display Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-[-0.035em] text-white leading-[1.03]">
            The Autonomous Workspace for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#38BDF8]">
              Fast Teams.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto font-normal leading-relaxed tracking-[-0.01em]">
            One sovereign surface uniting decentralized chat, living docs, custom domain email,
            and live meeting huddles. Powered by an in-memory event bus that synthesizes conversations
            into executed work.
          </p>

          {/* Dual Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              className="w-full sm:w-auto text-base px-8 h-12 shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_10px_28px_-6px_rgba(99,102,241,0.5),0_2px_8px_rgba(99,102,241,0.3)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.3)_inset,0_14px_36px_-6px_rgba(99,102,241,0.65)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer"
              onClick={() => window.open('https://app.ultrakin.com/auth', '_blank')}
            >
              Start Free Workspace
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-base px-6 h-12 bg-white/[0.04] backdrop-blur-md border border-white/12 hover:bg-white/[0.08] hover:border-white/20 text-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all cursor-pointer"
              icon={Terminal}
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Architecture &amp; Pricing
            </Button>
          </div>

          {/* Enterprise Trust Credentials Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-xs font-medium text-slate-400">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/6">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/6">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>SAML 2.0 / SCIM Ready</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/6">
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>99.99% Uptime SLA</span>
            </div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.02] border border-white/6">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Megolm E2E Encrypted</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            100% PURE-CODE INTERACTIVE APPLICATION FRAME (Zero External Video Files)
           ========================================================================= */}
        <div
          className="mt-12 lg:mt-16 relative"
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
              transform: 'rotateX(2.2deg) translateZ(0)',
              transformStyle: 'preserve-3d',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.12), 0 20px 50px -10px rgba(0,0,0,0.9), 0 40px 100px -20px rgba(0,0,0,0.95), 0 0 80px -15px rgba(99,102,241,0.22)',
            }}
          >
            {/* Specular Screen Glass Reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-44 z-20 opacity-30 select-none overflow-hidden"
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

              {/* Module Simulation Selector Tabs */}
              <div className="flex items-center gap-1 bg-[#07090E]/80 p-1 rounded-lg border border-white/8 shadow-inner">
                <button
                  type="button"
                  onClick={() => setActiveModule('chat')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'chat'
                      ? 'bg-indigo-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Spaces Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('mail')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'mail'
                      ? 'bg-sky-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Domain Mail</span>
                  {unreadEmailCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('docs')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'docs'
                      ? 'bg-emerald-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Living Docs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('huddle')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'huddle'
                      ? 'bg-violet-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Live Huddle</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('tasks')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'tasks'
                      ? 'bg-amber-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Kanban</span>
                  {kanbanTasks.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('automations')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'automations'
                      ? 'bg-emerald-600 text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">DAG Automations</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
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

                {/* Spaces List */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 flex items-center justify-between">
                    <span>Spaces</span>
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

                {/* Active Huddle Banner */}
                <div className="mt-4 pt-3 border-t border-white/6">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Live Huddle
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

                {/* Living Docs Navigation */}
                <div className="mt-4 pt-3 border-t border-white/6 space-y-1">
                  <div className="px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Living Docs
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
                    Automations
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
                    <GitBranch className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span className="truncate">P0 Escalations DAG</span>
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
                      <span className="truncate">security@okta-enterprise.com</span>
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
                {activeModule === 'mail' && <DomainMailboxEngine />}
                {activeModule === 'docs' && <LivingDocEditor />}
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
  );
}

export default function HeroSection() {
  return <HeroWorkspaceContent />;
}
