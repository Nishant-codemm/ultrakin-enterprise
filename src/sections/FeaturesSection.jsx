import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckSquare,
  FileCheck,
  Bot,
  Search,
  Folder,
  Sparkles,
  CheckCircle2,
  Plus,
  Shield,
  FileText,
  MessageSquare,
  Video,
} from 'lucide-react';
import { cn } from '../lib/cn';
import Badge from '../components/primitives/Badge';

const MODULE_TABS = [
  { id: 'kanban', label: 'Kanban Boards', icon: CheckSquare, desc: 'Signal-driven task flow' },
  { id: 'forms',  label: 'Intake Forms',  icon: FileCheck,   desc: 'Routing external data into Spaces' },
  { id: 'agent',  label: 'Ukin Agent',    icon: Bot,         desc: 'Autonomous multi-step actions' },
  { id: 'search', label: 'Universal Search', icon: Search,   desc: 'Single-index semantic memory' },
  { id: 'files',  label: 'Files & Storage', icon: Folder,    desc: 'CRDT offline-first document vault' },
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('kanban');

  return (
    <section id="features" className="py-24 md:py-32 bg-[#0B0F19] divider-hairline relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            CROSS-MODULE COMMAND CENTER
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
            One shared kernel. <br />
            <span className="text-slate-400 font-normal">Every capability connects to every other.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            When your Kanban board is connected to your email inbox, and your docs know what happened 
            in your huddles, work stops falling through the cracks.
          </p>
        </div>

        {/* Interactive Tab Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {MODULE_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group',
                  isActive
                    ? 'bg-[#1E293B]/90 border-indigo-500/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_10px_24px_rgba(99,102,241,0.2)] ring-1 ring-indigo-500/40 active:scale-[0.98]'
                    : 'bg-[#0F172A]/60 border-white/8 hover:bg-[#0F172A] hover:border-white/16 active:scale-[0.98]'
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <tab.icon
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-200'
                    )}
                  />
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </div>
                <div>
                  <div className={cn('font-semibold text-xs mb-0.5', isActive ? 'text-white' : 'text-slate-300 group-hover:text-white')}>
                    {tab.label}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {tab.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Display Stage */}
        <div className="bg-[#07090E]/90 rounded-2xl border border-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_64px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {/* 1. KANBAN BOARD */}
            {activeTab === 'kanban' && (
              <motion.div
                key="kanban"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/8">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg text-white">Sprint 24: Core Infrastructure Pipeline</h3>
                      <Badge variant="live" dot>Live Sync</Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Tasks auto-populated from customer emails, Huddle transcripts, and GitHub commits.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">Total: 14 Tasks</span>
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors shadow-sm cursor-pointer">
                      <Plus className="h-3.5 w-3.5" /> New Task
                    </button>
                  </div>
                </div>

                {/* 3-Column Kanban Board Visual */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Column 1: Triage (from Mail & Forms) */}
                  <div className="bg-[#0F172A]/50 rounded-xl p-3.5 border border-white/6 space-y-3">
                    <div className="flex items-center justify-between font-semibold text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-amber-400" /> Triage (Inbound Signals)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">3</span>
                    </div>

                    <div className="bg-[#1E293B]/70 p-3.5 rounded-lg border border-white/8 hover:border-white/16 transition-all space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-1.5 py-0.5 rounded font-medium">
                          From Mailbox
                        </span>
                        <span className="text-slate-400">10m ago</span>
                      </div>
                      <div className="font-semibold text-xs text-slate-200">
                        Investigate intermittent SSL handshake timeouts on EU cluster
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Inbound client ticket from security@okta-enterprise.com.
                      </div>
                    </div>

                    <div className="bg-[#1E293B]/70 p-3.5 rounded-lg border border-white/8 hover:border-white/16 transition-all space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-violet-300 bg-violet-500/15 border border-violet-500/20 px-1.5 py-0.5 rounded font-medium">
                          From Intake Form
                        </span>
                        <span className="text-slate-400">1h ago</span>
                      </div>
                      <div className="font-semibold text-xs text-slate-200">
                        Request dedicated SCIM provisioning bridge
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Submitted via Enterprise Partner Form. Priority: P1.
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="bg-[#0F172A]/50 rounded-xl p-3.5 border border-white/6 space-y-3">
                    <div className="flex items-center justify-between font-semibold text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-indigo-400" /> In Progress
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">2</span>
                    </div>

                    <div className="bg-[#1E293B]/70 p-3.5 rounded-lg border border-white/8 hover:border-white/16 transition-all space-y-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-1.5 py-0.5 rounded font-medium">
                          From Huddle #18
                        </span>
                        <span className="text-slate-400">Assigned: Sara</span>
                      </div>
                      <div className="font-semibold text-xs text-slate-200">
                        Revert token caching logic & bump TTL to 3600s
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/5">
                        <span>GitHub PR #1042 linked</span>
                        <span className="text-emerald-400 font-medium">CI Passed</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Shipped / Done */}
                  <div className="bg-[#0F172A]/50 rounded-xl p-3.5 border border-white/6 space-y-3">
                    <div className="flex items-center justify-between font-semibold text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" /> Done & Notified
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">4</span>
                    </div>

                    <div className="bg-[#1E293B]/40 p-3.5 rounded-lg border border-white/6 space-y-2 opacity-80">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">
                          Closed by Commit
                        </span>
                        <span className="text-slate-400">Yesterday</span>
                      </div>
                      <div className="font-semibold text-xs text-slate-400 line-through">
                        Update Redis Sentinel cluster failover thresholds
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Auto-replied to client mail thread: "Resolved in patch 2.4.1"
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 2. FORMS & INTAKE */}
            {activeTab === 'forms' && (
              <motion.div
                key="forms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-center"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-2 py-0.5 rounded">
                    BUILT-IN DATA INTAKE
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Replace Typeform and Google Forms. Route submissions straight to your Spaces.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    Create branded intake forms for bug reports, partner applications, or design requests. 
                    When a customer submits, Ultrakin immediately spins up a channel thread and logs a Kanban task.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Zero Zapier webhooks needed
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-white/10 bg-[#0F172A]/70 space-y-3">
                  <div className="text-xs font-semibold text-white border-b border-white/8 pb-2 flex items-center justify-between">
                    <span>Live Form Preview: Enterprise Integration Request</span>
                    <span className="text-[10px] font-mono text-indigo-400">FORM_ID: #intake_902</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Company Name</label>
                      <input readOnly value="Palantir Enterprise Cloud" className="w-full bg-[#07090E] border border-white/10 rounded-lg p-2.5 text-slate-200 font-mono text-xs" />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1 font-medium">Requested Capability</label>
                      <input readOnly value="Custom On-Premises LLM Agent Sandbox" className="w-full bg-[#07090E] border border-white/10 rounded-lg p-2.5 text-slate-200 font-mono text-xs" />
                    </div>
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                      Trigger set: Routes directly to #solutions-architecture & creates P1 Task
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. UKIN AGENT ACTIONS */}
            {activeTab === 'agent' && (
              <motion.div
                key="agent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-2 py-0.5 rounded">
                    CROSS-MODULE AUTONOMY
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    An agent that takes actions, not just answers questions.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                    Ukin Agent operates across your entire workspace. It has permission to draft emails, update docs, 
                    assign Kanban tickets, and ping engineers with exact code references.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      step: '1. Ingest & Correlate',
                      title: 'Signal Ingest',
                      desc: 'Listens to emails arriving in Mail, mentions in Spaces, and alerts from GitHub commits.',
                      icon: MessageSquare,
                    },
                    {
                      step: '2. Multi-Step Execution',
                      title: 'Autonomous Synthesis',
                      desc: 'References project specs in Docs, correlates with historical PRs, and drafts resolution plans.',
                      icon: Bot,
                    },
                    {
                      step: '3. Human Confirmation',
                      title: 'Action Approval',
                      desc: 'Presents clear, one-click interactive buttons in threads before executing irreversible actions.',
                      icon: Sparkles,
                    },
                  ].map((item) => (
                    <div key={item.step} className="p-4 rounded-xl border border-white/8 bg-[#0F172A]/60 space-y-2">
                      <div className="text-[10px] font-mono uppercase text-indigo-400 font-bold">{item.step}</div>
                      <div className="font-semibold text-sm text-white">{item.title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. UNIVERSAL SEMANTIC SEARCH */}
            {activeTab === 'search' && (
              <motion.div
                key="search"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    ENTERPRISE MEMORY
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    Search every chat, doc, email, and meeting transcript simultaneously.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                    No more switching between Slack search, Gmail search, and Google Drive search. One query searches your entire company's institutional history.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-white/10 bg-[#0F172A]/70 space-y-3">
                  <div className="flex items-center gap-2 p-2.5 bg-[#07090E] rounded-lg border border-white/10 text-xs text-slate-300">
                    <Search className="h-4 w-4 text-indigo-400 flex-shrink-0" />
                    <span className="font-medium">"What was the outcome of the Q3 Kubernetes cost optimization?"</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-[#1E293B]/60 rounded-lg border border-white/8 flex items-start gap-3">
                      <Video className="h-4 w-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Meeting Transcript: Infra Architecture Huddle</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">"Decided to migrate non-prod environments to spot instances, saving $38,000 monthly."</p>
                      </div>
                    </div>
                    <div className="p-3 bg-[#1E293B]/60 rounded-lg border border-white/8 flex items-start gap-3">
                      <FileText className="h-4 w-4 text-violet-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-white">Living Doc: Q3 Cost Allocation Report</div>
                        <p className="text-slate-400 text-[11px] mt-0.5">Signed off by VP of Finance on Sept 14. Linked to Task #741.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5. FILES & STORAGE */}
            {activeTab === 'files' && (
              <motion.div
                key="files"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 text-left"
              >
                <div className="max-w-2xl">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/15 border border-amber-500/20 px-2 py-0.5 rounded">
                    CRDT-BASED ASSET VAULT
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-2">
                    Files live in the rooms where conversations happen.
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1">
                    Every Space has an integrated file repository. Offline-first CRDT synchronization means you can view, edit, and attach documents even while flying at 35,000 feet.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { name: 'System_Architecture_v4.pdf', size: '4.2 MB', room: '#architecture-rfc', icon: FileText, color: 'text-rose-400' },
                    { name: 'Figma_Tokens_Export.json', size: '140 KB', room: '#design-system', icon: Folder, color: 'text-violet-400' },
                    { name: 'SOC2_Type_II_Report.pdf', size: '8.8 MB', room: '#sec-ops', icon: Shield, color: 'text-emerald-400' },
                  ].map((f) => (
                    <div key={f.name} className="p-3.5 bg-[#0F172A]/70 rounded-xl border border-white/8 hover:border-white/16 transition-all flex items-start gap-2.5">
                      <f.icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', f.color)} />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-200 truncate">{f.name}</div>
                        <div className="text-[10px] text-slate-400">{f.size} · in {f.room}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}