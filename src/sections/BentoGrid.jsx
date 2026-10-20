import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Zap,
  Search,
  Shield,
  Layers,
  ArrowRight,
  Terminal,
  CheckCircle2,
  FileText,
  Mail,
  MessageSquare,
  Sparkles,
  Database,
  Cpu,
  Lock,
} from 'lucide-react';
import { cn } from '../lib/cn';
import Badge from '../components/primitives/Badge';

export default function BentoGrid() {
  const [activePipeline, setActivePipeline] = useState(1);

  const workflowSteps = [
    {
      id: 0,
      title: 'Signal Ingest',
      type: 'Chat / Email',
      icon: MessageSquare,
      desc: 'Bug reported in #client-support with logs attached',
      time: '10:14 AM',
    },
    {
      id: 1,
      title: 'Agentic Analysis',
      type: 'Ukin Agent',
      icon: Bot,
      desc: 'Correlates stack trace, searches docs, drafts remediation',
      time: '10:15 AM',
    },
    {
      id: 2,
      title: 'Action & Execution',
      type: 'Docs & Tasks',
      icon: FileText,
      desc: 'Spawns hotfix PR, updates release doc & notifies team',
      time: '10:16 AM',
    },
  ];

  return (
    <section id="platform" className="py-24 md:py-32 bg-[#07090E] border-t border-white/8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            THE ARCHITECTURAL DIFFERENCE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
            Built as one kernel. <br className="hidden sm:block" />
            <span className="text-slate-400 font-normal">Not seven apps duct-taped together.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
            Slack requires dozens of third-party webhooks that break context. Teams nests disparate Office products.
            Ultrakin connects memory, actions, and identities into a single real-time layer.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* Card 1: Main Pipeline (Large span 8) */}
          <div className="lg:col-span-8 bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-7 md:p-8 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-300 font-semibold bg-indigo-500/15 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                  <Cpu className="h-3.5 w-3.5 text-indigo-400" /> UNIFIED EVENT BUS
                </span>
                <span className="text-xs text-slate-400">Zero context switching</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                The Autonomous Execution Loop
              </h3>
              <p className="text-sm text-slate-400 mb-8 max-w-xl">
                When a customer email arrives or a colleague drops an idea in chat, Ukin extracts entities, 
                drafts action plans, and keeps every stakeholder in sync automatically.
              </p>

              {/* Interactive Pipeline Mockup */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {workflowSteps.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActivePipeline(idx)}
                    className={cn(
                      'text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer',
                      activePipeline === idx
                        ? 'border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/30'
                        : 'border-white/8 bg-[#0F172A]/50 hover:bg-[#0F172A] hover:border-white/16'
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <step.icon
                        className={cn(
                          'h-4 w-4 transition-colors',
                          activePipeline === idx ? 'text-indigo-400' : 'text-slate-400'
                        )}
                      />
                      <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                    </div>
                    <div className="font-semibold text-xs text-white mb-0.5">{step.title}</div>
                    <div className="text-[11px] text-slate-400 leading-snug">{step.desc}</div>
                  </button>
                ))}
              </div>

              {/* Live console detail */}
              <div className="bg-[#07090E] rounded-xl p-4 font-mono text-xs text-slate-300 border border-white/8 overflow-x-auto">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/8 text-slate-400 text-[11px]">
                  <span>ukin-runtime // telemetry</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    SYNCED
                  </span>
                </div>
                {activePipeline === 0 && (
                  <div className="space-y-1">
                    <div className="text-slate-400"># Ingesting webhook from SendGrid API...</div>
                    <div className="text-emerald-400">✓ Parsed incoming payload (sender: "cto@acme.inc", priority: "P0")</div>
                    <div className="text-slate-300">→ Routed to channel #incident-war-room and dispatched context to AI agent</div>
                  </div>
                )}
                {activePipeline === 1 && (
                  <div className="space-y-1">
                    <div className="text-slate-400"># Ukin Agent correlating historical signals...</div>
                    <div className="text-indigo-300">⚡ Found related PR #412 merged 2 hours ago</div>
                    <div className="text-slate-300">→ Synthesized diagnostic summary and drafted rollback plan</div>
                  </div>
                )}
                {activePipeline === 2 && (
                  <div className="space-y-1">
                    <div className="text-slate-400"># Executing task mutations...</div>
                    <div className="text-emerald-400">✓ Created Task #894: "Emergency patch release"</div>
                    <div className="text-slate-300">→ Notified on-call engineers via high-priority audio huddle</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Enterprise Universal Search (Span 4) */}
          <div className="lg:col-span-4 bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                  <Search className="h-3.5 w-3.5 text-slate-400" /> SEMANTIC SEARCH
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Ask anything across everything
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Search does not just match strings. It understands concepts across chat threads, email attachments, meeting transcripts, and docs.
              </p>

              {/* Search Bar Visual */}
              <div className="rounded-xl border border-white/8 bg-[#0F172A]/70 p-3 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 border-b border-white/8 pb-2 mb-2">
                  <Search className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-slate-200 font-medium">"What was agreed regarding the SLA policy?"</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-[#1E293B]/60 p-2.5 rounded-lg border border-white/6 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-semibold text-indigo-300 flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Master Service Agreement.pdf
                      </span>
                      <span className="text-[10px] font-mono">Page 14</span>
                    </div>
                    <p className="text-slate-300">"99.95% uptime with 1-hour priority response window for Sev-1 incidents."</p>
                  </div>
                  <div className="bg-[#1E293B]/60 p-2.5 rounded-lg border border-white/6 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span className="font-semibold text-violet-300 flex items-center gap-1">
                        <Mail className="h-3 w-3" /> Thread: Legal confirmation
                      </span>
                      <span className="text-[10px] font-mono">2 days ago</span>
                    </div>
                    <p className="text-slate-300">Signed off by Legal Counsel Elena Vance on Oct 18.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-white/8 flex items-center gap-1.5">
              <span className="text-indigo-400 font-bold">⚡</span> Instant vector embeddings with zero cold start
            </div>
          </div>

          {/* Card 3: MCP & Extensibility (Span 4) */}
          <div className="lg:col-span-4 bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-300 font-semibold bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" /> MODEL CONTEXT PROTOCOL
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Open MCP Architecture
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Connect your internal Postgres databases, custom internal CLI tools, or external SaaS APIs directly into your agents with standard MCP servers.
              </p>

              {/* Code visual */}
              <div className="bg-[#07090E] rounded-xl p-3.5 font-mono text-[11px] text-slate-300 border border-white/8 mb-4">
                <div className="text-slate-500 mb-1">// ukin.mcp.json</div>
                <div className="text-indigo-400">"mcpServers": &#123;</div>
                <div className="pl-3 text-emerald-400">"internal-crm": &#123;</div>
                <div className="pl-6 text-slate-300">"command": "npx -y @corp/mcp",</div>
                <div className="pl-6 text-amber-400">"auth": "vault:sec-99"</div>
                <div className="pl-3 text-emerald-400">&#125;</div>
                <div className="text-indigo-400">&#125;</div>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-white/8">
              Run local or cloud-hosted MCP servers with zero friction
            </div>
          </div>

          {/* Card 4: Fine-Grained Permissions & Governance (Span 4) */}
          <div className="lg:col-span-4 bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-300 font-semibold bg-violet-500/15 border border-violet-500/20 px-2.5 py-1 rounded-md">
                  <Lock className="h-3.5 w-3.5 text-violet-400" /> ENTERPRISE GOVERNANCE
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Attribute-Based Access Control
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                AI agents strictly respect employee permission boundaries. An agent will never leak finance documents to engineering or unverified guests.
              </p>

              <div className="space-y-2 mb-4">
                {[
                  { role: 'Engineering Lead', scope: 'Repos, Architecture Docs, Sentry', ok: true },
                  { role: 'Contractor / Guest', scope: 'Assigned Project Space only', ok: true },
                  { role: 'Autonomous Agent', scope: 'Inherits Invoking User Context', ok: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-white/6 bg-[#0F172A]/60 text-xs">
                    <div>
                      <div className="font-semibold text-slate-200">{item.role}</div>
                      <div className="text-[11px] text-slate-400">{item.scope}</div>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-white/8">
              Role isolation verified on every single prompt execution
            </div>
          </div>

          {/* Card 5: High-Speed Desktop & Mobile Sync (Span 4) */}
          <div className="lg:col-span-4 bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-7 shadow-xl backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 font-semibold bg-amber-500/15 border border-amber-500/20 px-2.5 py-1 rounded-md">
                  <Zap className="h-3.5 w-3.5 text-amber-400" /> CRDT REPLICATION
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Sub-20ms Sync Worldwide
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Offline-first state engine built with conflict-free replicated data types. Write offline on a flight, and it seamlessly merges upon reconnect.
              </p>

              <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/10 text-xs text-amber-200 mb-4">
                <div className="flex items-center justify-between font-mono text-[11px] text-amber-300 mb-2">
                  <span>EDGE REPLICATION LATENCY</span>
                  <span className="font-bold">14ms AVG</span>
                </div>
                <div className="h-1.5 w-full bg-amber-950/60 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-amber-400 rounded-full" />
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-400 pt-3 border-t border-white/8">
              Global edge distribution with end-to-end data integrity
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}