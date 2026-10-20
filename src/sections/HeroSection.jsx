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
} from 'lucide-react';
import Button from '../components/primitives/Button';
import Badge from '../components/primitives/Badge';
import { cn } from '../lib/cn';
import { useWorkspace } from '../context/WorkspaceContext';
import MatrixChatEngine from '../components/showcase/MatrixChatEngine';
import DomainMailboxEngine from '../components/showcase/DomainMailboxEngine';
import LivingDocEditor from '../components/showcase/LivingDocEditor';
import HuddleSimulator from '../components/showcase/HuddleSimulator';
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
  } = useWorkspace();

  const unreadEmailCount = emails.filter((e) => e.unread).length;

  return (
    <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 bg-[#07090E]">
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
          <Badge variant="indigo" size="md" dot className="border-indigo-500/30 bg-indigo-500/10 py-1 px-3.5">
            <span className="font-semibold text-indigo-300">ULTRAKIN 2.0</span>
            <span className="text-slate-400 mx-1">·</span>
            <span className="text-slate-300">The Autonomous Workspace Kernel</span>
          </Badge>
        </div>

        {/* Hero Display Typography */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
            The Autonomous Workspace for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#818CF8] to-[#38BDF8]">
              Fast Teams.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            One sovereign surface for decentralized chat, living docs, native custom domain email,
            and live meeting huddles. Built on an in-memory event bus that synthesizes conversations
            into executed work.
          </p>

          {/* Dual Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              iconRight={ArrowRight}
              className="w-full sm:w-auto text-base px-8 h-12 shadow-[0_4px_24px_rgba(99,102,241,0.45)]"
              onClick={() => window.open('https://app.ultrakin.com/auth', '_blank')}
            >
              Start Free Workspace
            </Button>

            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto text-base px-6 h-12"
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
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>SOC 2 Type II Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>SAML 2.0 / SCIM Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>99.99% Uptime SLA</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span>Megolm E2E Encrypted</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            100% PURE-CODE INTERACTIVE APPLICATION FRAME (Zero External Video Files)
           ========================================================================= */}
        <div className="mt-12 lg:mt-16 relative">
          {/* Subtle Outer Specular Glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-indigo-500/20 via-white/5 to-transparent blur-sm -z-10" />

          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] shadow-[0_24px_64px_-12px_rgba(0,0,0,0.85)] overflow-hidden relative">
            {/* Window Chrome Title Bar */}
            <div className="h-11 px-4 bg-[#0F172A]/90 border-b border-white/8 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                  app.ultrakin.com/workspace/acme-eng
                  {activeModule === 'chat' ? `#${activeChannel}` : `/${activeModule}`}
                </span>
              </div>

              {/* Module Simulation Selector Tabs */}
              <div className="flex items-center gap-1 bg-[#07090E]/60 p-1 rounded-lg border border-white/6">
                <button
                  type="button"
                  onClick={() => setActiveModule('chat')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'chat'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
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
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Domain Mail</span>
                  {unreadEmailCount > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-300" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveModule('docs')}
                  className={cn(
                    'px-2.5 sm:px-3 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer',
                    activeModule === 'docs'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
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
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <Video className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Live Huddle</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                {/* Active Workspace Squircles */}
                <div
                  className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_12px_rgba(99,102,241,0.5)] cursor-pointer"
                  title="Acme Platform Team Workspace"
                >
                  AC
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
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
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

              {/* 3. Main Multi-Mode Interactive Canvas (Sprint Week 2 Engines) */}
              <div className="flex flex-col bg-[#07090E] min-h-[580px] overflow-hidden relative">
                {activeModule === 'chat' && <MatrixChatEngine />}
                {activeModule === 'mail' && <DomainMailboxEngine />}
                {activeModule === 'docs' && <LivingDocEditor />}
                {activeModule === 'huddle' && <HuddleSimulator />}
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
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group',
              activeModule === 'chat'
                ? 'bg-[#1E293B]/80 border-indigo-500/40 shadow-[0_8px_24px_rgba(99,102,241,0.2)]'
                : 'bg-[#0F172A]/40 border-white/8 hover:bg-[#0F172A]/70 hover:border-white/15'
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
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group',
              activeModule === 'mail'
                ? 'bg-[#1E293B]/80 border-sky-500/40 shadow-[0_8px_24px_rgba(56,189,248,0.2)]'
                : 'bg-[#0F172A]/40 border-white/8 hover:bg-[#0F172A]/70 hover:border-white/15'
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
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group',
              activeModule === 'docs'
                ? 'bg-[#1E293B]/80 border-emerald-500/40 shadow-[0_8px_24px_rgba(16,185,129,0.2)]'
                : 'bg-[#0F172A]/40 border-white/8 hover:bg-[#0F172A]/70 hover:border-white/15'
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
              'p-4 rounded-xl text-left transition-all duration-200 border cursor-pointer group',
              activeModule === 'huddle'
                ? 'bg-[#1E293B]/80 border-violet-500/40 shadow-[0_8px_24px_rgba(139,92,246,0.2)]'
                : 'bg-[#0F172A]/40 border-white/8 hover:bg-[#0F172A]/70 hover:border-white/15'
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
