import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Mic,
  FileText,
  Mail,
  CheckSquare,
  Sparkles,
  ArrowRight,
  GitBranch,
  UserCheck,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  Radio,
  FileCode,
  ExternalLink,
} from 'lucide-react';
import Badge from '../components/primitives/Badge';
import Button from '../components/primitives/Button';
import { cn } from '../lib/cn';

export default function WorkflowSpotlight() {
  const [activeHuddleTab, setActiveHuddleTab] = useState('transcript');
  const [mailConverted, setMailConverted] = useState(false);

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#07090E] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
        {/* Spotlight 1: Huddle & Automated Meeting Transcripts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="indigo" size="md" icon={Video}>
              HUDDLES &amp; MEETING SYNTHESIS
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Turn meetings into assigned work <br />
              <span className="text-indigo-400">before anyone leaves the call.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Drop into an audio huddle inside any Space with a single click. As you talk, 
              Ukin transcribes the discussion in real time, extracts technical decisions, and populates your 
              team's Kanban board automatically.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero post-meeting writeups</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Automated markdown summaries are saved directly into the channel's linked living doc.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Direct Kanban task assignments</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Spoken commitments ("I'll fix the API endpoint by Thursday") automatically become tasks with assignees.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mockup: Live Huddle & Transcript Visualizer */}
          <div className="lg:col-span-7 bg-[#0B0F19] rounded-2xl border border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.6)] overflow-hidden text-left">
            {/* Huddle Window Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#0F172A]/80 text-xs">
              <div className="flex items-center gap-2.5 text-white font-semibold">
                <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span>Space Huddle: #product-architecture</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400">Duration: 18:24</span>
                <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold">
                  Recording Active
                </span>
              </div>
            </div>

            {/* Main Stage: Grid of Call Participants */}
            <div className="p-6 grid grid-cols-3 gap-3 bg-[#07090E]/80 border-b border-white/8">
              {[
                { name: 'Sara Chen', role: 'Staff Eng', speaking: true, color: 'bg-violet-600', initials: 'SC' },
                { name: 'Ravi Mehta', role: 'Lead DevOps', speaking: false, color: 'bg-emerald-600', initials: 'RM' },
                { name: 'Alex Kim', role: 'API Architect', speaking: false, color: 'bg-amber-600', initials: 'AK' },
              ].map((p) => (
                <div
                  key={p.name}
                  className={cn(
                    'p-4 rounded-xl flex flex-col items-center text-center justify-between transition-all',
                    p.speaking
                      ? 'bg-[#1E293B] ring-2 ring-indigo-500/80 shadow-lg'
                      : 'bg-[#0B0F19] border border-white/8'
                  )}
                >
                  <div className="relative mb-2">
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-sm text-white ${p.color}`}>
                      {p.initials}
                    </div>
                    {p.speaking && (
                      <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F19] flex items-center justify-center">
                        <Mic className="h-2 w-2 text-white" />
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white">{p.name}</div>
                  <div className="text-[10px] text-slate-400">{p.role}</div>
                </div>
              ))}
            </div>

            {/* Lower Half: Tabbed Live Transcript & Extracted Tasks */}
            <div className="p-5 bg-[#0B0F19] text-xs">
              <div className="flex items-center gap-3 mb-4 border-b border-white/8 pb-2">
                <button
                  type="button"
                  onClick={() => setActiveHuddleTab('transcript')}
                  className={cn(
                    'font-mono text-xs pb-1 transition-colors cursor-pointer',
                    activeHuddleTab === 'transcript'
                      ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  Live Meeting Transcript
                </button>
                <button
                  type="button"
                  onClick={() => setActiveHuddleTab('tasks')}
                  className={cn(
                    'font-mono text-xs pb-1 transition-colors flex items-center gap-1.5 cursor-pointer',
                    activeHuddleTab === 'tasks'
                      ? 'text-indigo-400 border-b-2 border-indigo-400 font-semibold'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  <span>Extracted Kanban Tasks</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                    3
                  </span>
                </button>
              </div>

              {activeHuddleTab === 'transcript' ? (
                <div className="space-y-3 font-mono text-slate-300">
                  <div className="flex gap-2">
                    <span className="text-violet-400 font-bold shrink-0">[18:12] Sara:</span>
                    <span>"The latency spikes in Redis during failovers are caused by large key unlinking."</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">[18:18] Ravi:</span>
                    <span>"I can migrate the pipeline to async UNLINK in the Rust broker by Wednesday."</span>
                  </div>
                  <div className="flex gap-2 p-2 rounded bg-violet-500/10 border border-violet-500/20 text-violet-300">
                    <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span>Ukin captured action item &rarr; Assigned to Ravi Mehta (Target: Wednesday, P1)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-[#0F172A] border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Migrate key cleanup to async UNLINK</div>
                      <div className="text-[11px] text-slate-400">Owner: Ravi Mehta · Target: Wednesday · P1</div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                      Synced
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spotlight 2: Native Domain Mail Converted Directly into Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Mockup: Native Mailbox Workspace UI */}
          <div className="lg:col-span-7 order-2 lg:order-1 bg-[#0B0F19] rounded-2xl border border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.6)] overflow-hidden text-left">
            {/* Mail Shell Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/8 bg-[#0F172A]/80 text-xs">
              <div className="flex items-center gap-2 font-bold text-white">
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Shared Workspace Mailbox (support@acme.corp)</span>
              </div>
              <Badge variant="live" size="sm">
                1 Unread Priority
              </Badge>
            </div>

            {/* Email View */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between border-b border-white/8 pb-4">
                <div>
                  <h3 className="font-bold text-sm text-white">
                    SAML SSO Certificate Expiration Warning (Oct 31)
                  </h3>
                  <div className="text-xs text-slate-400 mt-1">
                    From: <span className="font-mono text-slate-200">security@okta-enterprise.com</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">9:41 AM</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Hello Acme IT Team,<br /><br />
                Your Identity Provider X.509 certificate for the primary production tenant is scheduled 
                to expire on October 31 at 23:59 UTC. To prevent user lockout across the single-sign-on gateway, 
                please upload the rotated public key to your tenant configuration.
              </p>

              {/* In-mail Ukin Agent Action Bar */}
              <div className="p-4 rounded-xl border border-sky-500/30 bg-sky-500/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-sky-300 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-sky-400" /> Ukin Detected Security Action
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-800 px-2 py-0.5 rounded">
                    P0 Urgency
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Ukin matched this notice with your <strong className="text-white">Okta SSO Integration</strong>. 
                  Ready to create a high-priority ticket on the DevOps Kanban board and notify the security lead in #sec-ops?
                </p>

                <div className="flex items-center gap-2 pt-1">
                  {!mailConverted ? (
                    <Button
                      variant="primary"
                      size="sm"
                      iconRight={ArrowRight}
                      onClick={() => setMailConverted(true)}
                    >
                      Convert Email to Kanban Task
                    </Button>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Task #899 created &amp; assigned to David Chen (CISO)</span>
                    </div>
                  )}
                  <Button variant="ghost" size="sm">
                    Share to #sec-ops Space
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6">
            <Badge variant="indigo" size="md" icon={Mail}>
              NATIVE DOMAIN MAILBOX
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              A real mailbox on your domain. <br />
              <span className="text-sky-400">Zero copy-pasting to your task manager.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Why should client emails live isolated in Gmail or Outlook while your team plans work in Slack and Jira? 
              Ultrakin brings custom domain mailboxes directly into the unified workspace kernel.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Inbound mail becomes team context</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Customer feedback, vendor alerts, and invoices arrive where your entire team already works.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">One-click task conversions</h4>
                  <p className="text-xs text-slate-400 mt-0.5">No more forwarding emails or manually typing Jira summaries. Tasks retain the full email thread history.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spotlight 3: Living Docs with Embedded PRs & Live Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <Badge variant="indigo" size="md" icon={FileText}>
              LIVING DOCUMENTS
            </Badge>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Docs stay connected to <br />
              <span className="text-emerald-400">conversations, meetings, and decisions.</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Standard wiki pages die the moment they are written. Ultrakin Living Docs are real-time canvases: 
              they embed live Kanban tasks, sync pull request statuses from GitHub, 
              and update when decisions are made in chat.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Embedded live task cards</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Change a status in the doc, and it updates on the Kanban board immediately.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Bi-directional GitHub branch sync</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Spec documents show whether the corresponding pull request has merged or is blocked in CI.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Mockup: Living Doc Interface */}
          <div className="lg:col-span-7 bg-[#0B0F19] rounded-2xl border border-white/10 shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-6 md:p-8 text-left space-y-5">
            {/* Document Header */}
            <div className="flex items-center justify-between border-b border-white/8 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">RFC: Edge Caching &amp; Token Validation</h3>
                  <div className="text-xs text-slate-400">Linked to #architecture-rfc · Edited 4m ago</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-full">
                  2 Active Editors
                </span>
              </div>
            </div>

            {/* Document Body */}
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed font-normal">
              <p>
                This specification details relocating cryptographic signature validation from 
                origin Kubernetes clusters to Cloudflare Workers edge nodes with sub-5ms evaluation latency.
              </p>

              {/* Embedded Live Kanban Task Inside Doc */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0F172A] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                    <CheckSquare className="h-3.5 w-3.5 text-indigo-400" /> EMBEDDED KANBAN TASK
                  </span>
                  <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-full">
                    In Progress
                  </span>
                </div>
                <div className="font-semibold text-white text-xs">
                  Task #914: Implement HMAC-SHA256 edge worker test harness
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Assignee: Sara Chen</span>
                  <span className="font-mono text-indigo-400">Sprint 24 · Due Oct 29</span>
                </div>
              </div>

              {/* Embedded GitHub PR Status */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-[#0F172A] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <GitBranch className="h-4 w-4 text-emerald-400" />
                  <div>
                    <div className="font-mono text-white text-xs font-semibold">PR #482: feat(edge): add jwt-wasm validator</div>
                    <div className="text-[10px] text-slate-400">Branch: feature/wasm-jwt · All 14 CI checks passing</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded font-bold">
                  CI PASSED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
