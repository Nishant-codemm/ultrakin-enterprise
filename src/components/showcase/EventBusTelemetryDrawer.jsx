import React, { memo, useState } from 'react';
import {
  Cpu,
  ShieldCheck,
  Radio,
  CheckCircle2,
  Database,
  Server,
  Activity,
  Pause,
  Play,
  Copy,
  Check,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';
import UkinActionProposalCard from './UkinActionProposalCard';

const MODULE_SWITCHERS = [
  { id: 'chat', label: 'CHAT', activeClass: 'bg-indigo-600 text-white' },
  { id: 'mail', label: 'MAIL', activeClass: 'bg-sky-600 text-white' },
  { id: 'docs', label: 'DOCS', activeClass: 'bg-emerald-600 text-white' },
  { id: 'huddle', label: 'CALL', activeClass: 'bg-violet-600 text-white' },
  { id: 'tasks', label: 'KANBAN', activeClass: 'bg-amber-600 text-white' },
  { id: 'automations', label: 'DAG', activeClass: 'bg-emerald-600 text-white' },
];

const SAMPLE_EVENTS = [
  {
    id: 'evt_9821_a',
    timestamp: '10:42:18 UTC',
    topic: 'bus.matrix.msg.inbound',
    category: 'matrix',
    badgeClass: 'text-indigo-300 border-indigo-400/30 bg-indigo-500/10',
    title: 'Incident thread #891 ingested',
    summary: '#infra-alerts · Database failover thread parsed into incident log',
    latency: '11ms',
    traceId: 'trc_9821_fa28',
    sha256: '8f3b20e1...4c21',
    policy: 'zero_retention_enforced',
  },
  {
    id: 'evt_9820_b',
    timestamp: '10:42:14 UTC',
    topic: 'bus.agent.eval.passed',
    category: 'agent',
    badgeClass: 'text-violet-300 border-violet-400/30 bg-violet-500/10',
    title: 'Ukin boundary policy check OK',
    summary: 'Autonomous context correlation verified within tenant data boundary',
    latency: '18ms',
    traceId: 'trc_9820_cb19',
    sha256: '9a4c11f7...8d32',
    policy: 'tenant_isolation_verified',
  },
  {
    id: 'evt_9819_c',
    timestamp: '10:41:59 UTC',
    topic: 'bus.mail.thread.synced',
    category: 'mail',
    badgeClass: 'text-sky-300 border-sky-400/30 bg-sky-500/10',
    title: 'SOC-2 audit agreement attached',
    summary: 'security@acme.com · Redline diff extracted into living brief',
    latency: '14ms',
    traceId: 'trc_9819_e082',
    sha256: '4e7d55c2...1b90',
    policy: 'dkim_verified_passed',
  },
  {
    id: 'evt_9818_d',
    timestamp: '10:41:30 UTC',
    topic: 'bus.task.kanban.created',
    category: 'task',
    badgeClass: 'text-amber-300 border-amber-400/30 bg-amber-500/10',
    title: 'P0 rollout blocker queued',
    summary: 'Sprint 24 · Assigned to @sara with verified deployment checklist',
    latency: '9ms',
    traceId: 'trc_9818_aa44',
    sha256: '1c8e90d3...7f55',
    policy: 'human_review_required',
  },
  {
    id: 'evt_9817_e',
    timestamp: '10:40:55 UTC',
    topic: 'bus.crdt.doc.mutation',
    category: 'docs',
    badgeClass: 'text-emerald-300 border-emerald-400/30 bg-emerald-500/10',
    title: 'Living spec RFC-402 signed off',
    summary: 'Vector clock [sara:48, ukin:12, elena:3] converged across 3 peers',
    latency: '6ms',
    traceId: 'trc_9817_dd12',
    sha256: '7b2a64c0...9e81',
    policy: 'immutable_audit_logged',
  },
];

function EventBusTelemetryDrawer() {
  const {
    activeModule,
    setActiveModule,
    activeChannel,
    kanbanTasks,
  } = useWorkspace();

  const [activeTab, setActiveTab] = useState('stream'); // 'stream' | 'inspector'
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [copiedTraceId, setCopiedTraceId] = useState(null);

  const filteredEvents = SAMPLE_EVENTS.filter((evt) => {
    if (filterCategory === 'all') return true;
    return evt.category === filterCategory;
  });

  const handleCopyTrace = (traceId) => {
    navigator.clipboard?.writeText(traceId);
    setCopiedTraceId(traceId);
    setTimeout(() => setCopiedTraceId(null), 1800);
  };

  return (
    <div className="hidden lg:flex flex-col h-full bg-obsidian-base border-l border-obsidian-border select-none p-3.5 space-y-3.5 text-slate-200">
      {/* ── Top Header Bar with Dual-Mode Segmented Tabs (Phase 6 Inspector Standard) ── */}
      <div className="flex items-center justify-between pb-2.5 border-b border-obsidian-border">
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-obsidian-surface/90 border border-obsidian-border p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab('stream')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-mono font-medium transition-all cursor-pointer',
              activeTab === 'stream'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Activity className="w-3 h-3 text-indigo-300" />
            <span>Event Bus</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inspector')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-mono font-medium transition-all cursor-pointer',
              activeTab === 'inspector'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Cpu className="w-3 h-3 text-indigo-300" />
            <span>Inspector</span>
          </button>
        </div>

        {/* Live Status Diode + Pause Button */}
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
            <span className={cn('w-1.5 h-1.5 rounded-full bg-emerald-400', !isPaused && 'animate-pulse')} />
            <span>{isPaused ? 'PAUSED' : 'LIVE'}</span>
          </span>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume stream' : 'Pause stream'}
            className="p-1 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isPaused ? 'Resume stream' : 'Pause stream'}
          >
            {isPaused ? <Play className="w-2.5 h-2.5 text-emerald-400" /> : <Pause className="w-2.5 h-2.5" />}
          </button>
        </div>
      </div>

      {/* Autonomous Action Proposal Card */}
      <UkinActionProposalCard />

      {/* ── Main Drawer Body (Stream vs Inspector) ── */}
      {activeTab === 'stream' ? (
        <div className="flex-1 flex flex-col rounded-xl border border-obsidian-border bg-obsidian-canvas p-3 space-y-2 overflow-hidden text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-h-0">
          {/* Stream Filter Toolbar */}
          <div className="flex items-center justify-between border-b border-obsidian-border-soft pb-2 text-[10px] font-mono">
            <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              IN-MEMORY TELEMETRY
            </span>
            <div className="flex items-center gap-1">
              {['all', 'agent', 'matrix', 'task'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    'px-1.5 py-0.5 rounded uppercase text-[9px] font-mono transition-colors cursor-pointer',
                    filterCategory === cat
                      ? 'bg-white/10 text-white font-semibold'
                      : 'text-slate-500 hover:text-slate-300'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Event Stream List */}
          <div className="flex-1 space-y-2 overflow-y-auto font-mono text-[11px] pr-1 scrollbar-thin">
            {filteredEvents.map((evt) => {
              const isSelected = selectedEventId === evt.id;
              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEventId(isSelected ? null : evt.id)}
                  className={cn(
                    'p-2 rounded-lg border transition-all cursor-pointer',
                    isSelected
                      ? 'bg-indigo-950/30 border-indigo-500/40 shadow-[0_2px_8px_rgba(99,102,241,0.15)]'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                  )}
                >
                  {/* Event Topic & Time */}
                  <div className="flex items-center justify-between text-[9.5px] pb-1">
                    <span className={cn('px-1.5 py-0.2 rounded border font-medium truncate max-w-[170px]', evt.badgeClass)}>
                      {evt.topic}
                    </span>
                    <span className="text-slate-500">{evt.timestamp.split(' ')[0]}</span>
                  </div>

                  {/* Title & Summary */}
                  <div className="mt-1 text-slate-200 font-sans font-medium text-[11px] leading-tight">
                    {evt.title}
                  </div>
                  <div className="mt-0.5 text-slate-400 text-[10px] font-sans truncate">
                    {evt.summary}
                  </div>

                  {/* Expandable Verified Payload Inspector */}
                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-obsidian-border-soft space-y-1 text-[9.5px] font-mono bg-black/40 p-2 rounded">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Latency:</span>
                        <span className="text-emerald-400 font-semibold">{evt.latency}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Boundary:</span>
                        <span className="text-sky-300">{evt.policy}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Trace ID:</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyTrace(evt.traceId);
                          }}
                          className="flex items-center gap-1 text-slate-300 hover:text-white"
                          title="Copy trace ID"
                        >
                          <span>{evt.traceId}</span>
                          {copiedTraceId === evt.traceId ? (
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-2.5 h-2.5" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>SHA-256:</span>
                        <span className="text-slate-500 font-mono text-[8.5px]">{evt.sha256}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Context Inspector View (Phase 6 Realism & Governance Standards) ── */
        <div className="flex-1 flex flex-col rounded-xl border border-obsidian-border bg-obsidian-canvas p-3 space-y-3 overflow-y-auto text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-h-0">
          <div className="flex items-center justify-between border-b border-obsidian-border-soft pb-2 text-[10px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Server className="w-3 h-3 text-indigo-400" />
              WORKSPACE CONTEXT DESCRIPTOR
            </span>
            <span className="text-emerald-400">Active Node</span>
          </div>

          {/* Organization & Tenant */}
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Tenant Identity</div>
            <div className="font-semibold text-white text-[12px] flex items-center justify-between">
              <span>Acme Corporation</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/20 text-[9px] font-mono text-emerald-300 font-normal">
                Verified Enterprise
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              ID: <span className="text-slate-300">acme_prod_eu01</span> · Region: <span className="text-slate-300">eu-central-1</span>
            </div>
          </div>

          {/* Active Surface & Room */}
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Active Channel / Room</div>
            <div className="font-semibold text-sky-300 text-[11px] font-mono flex items-center justify-between">
              <span>#{activeChannel}</span>
              <span className="text-[9px] font-mono text-slate-400 font-normal">Olm/Megolm Ratchet</span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">
              Surface: <span className="text-white uppercase font-bold">{activeModule}</span> · {kanbanTasks.length} tasks registered
            </div>
          </div>

          {/* Security & Cryptographic Guarantees */}
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1.5">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Compliance Guarantees
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[9.5px] font-mono">
              <div className="p-1 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block">AI Retention:</span>
                <span className="text-emerald-300 font-bold">Zero-Retention</span>
              </div>
              <div className="p-1 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block">Encryption:</span>
                <span className="text-sky-300 font-bold">TLS 1.3 + E2EE</span>
              </div>
              <div className="p-1 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block">SAML / SCIM:</span>
                <span className="text-indigo-300 font-bold">Enforced</span>
              </div>
              <div className="p-1 rounded bg-black/40 border border-white/5">
                <span className="text-slate-500 block">Audit Export:</span>
                <span className="text-amber-300 font-bold">SIEM Webhook</span>
              </div>
            </div>
          </div>

          {/* CRDT Vector Clock Metadata */}
          <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1 text-[10px] font-mono">
            <div className="text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Database className="w-3 h-3 text-violet-400" />
              CRDT Vector Consensus
            </div>
            <div className="text-slate-300 text-[9.5px]">
              Clocks: <span className="text-violet-300">[sara:48, ukin:12, elena:3]</span>
            </div>
            <div className="text-[9px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              <span>Consensus reached · 0 conflict forks</span>
            </div>
          </div>
        </div>
      )}

      {/* Fast Module Switcher Footer */}
      <div className="pt-2 border-t border-obsidian-border-soft flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">VIEWPORT:</span>
        <div role="group" aria-label="Switch workspace preview module" className="flex flex-wrap items-center gap-1 font-mono text-[9px]">
          {MODULE_SWITCHERS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeModule === item.id}
              onClick={() => setActiveModule(item.id)}
              className={cn(
                'px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all',
                activeModule === item.id ? item.activeClass : 'hover:text-white'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(EventBusTelemetryDrawer);
