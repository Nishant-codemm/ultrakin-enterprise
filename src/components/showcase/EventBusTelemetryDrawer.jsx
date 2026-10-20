import React from 'react';
import {
  Cpu,
  Bot,
  CheckCircle2,
  Check,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';

export default function EventBusTelemetryDrawer() {
  const {
    proposalStatus,
    approveProposal,
    activeModule,
    setActiveModule,
    kanbanTasks,
  } = useWorkspace();

  return (
    <div className="hidden lg:flex flex-col h-full bg-[#07090E] border-l border-white/8 select-none p-4 space-y-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/8">
        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          KERNEL TELEMETRY
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE BUS
        </span>
      </div>

      {/* Autonomous Proposal Card */}
      <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-[#0F172A]/90 shadow-lg shadow-indigo-500/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold flex items-center gap-1">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            UKIN PROPOSAL #prop_9812
          </span>
          <span
            className={cn(
              'text-[9px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold',
              proposalStatus === 'approved'
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
            )}
          >
            {proposalStatus === 'approved' ? '✓ EXECUTED' : 'AWAITING APPROVAL'}
          </span>
        </div>

        <div>
          <div className="text-xs font-semibold text-white">
            Remediate EU Latency via PR #1042
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
            Correlates Okta ticket, Huddle transcript, and Redis Sentinel log.
          </p>
        </div>

        {/* Affected Surfaces Matrix */}
        <div className="space-y-1.5 pt-1 text-[11px] font-mono border-t border-white/6 text-slate-400">
          <div className="flex items-center justify-between">
            <span>→ Chat Thread:</span>
            <span className="text-indigo-300">#general-arch</span>
          </div>
          <div className="flex items-center justify-between">
            <span>→ Living Doc:</span>
            <span className="text-emerald-300">RFC-891 (v2.4)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>→ Kanban Task:</span>
            <span className="text-amber-300">#894 (Assigned)</span>
          </div>
        </div>

        {proposalStatus === 'approved' ? (
          <div className="py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Merged to main & notified Okta
          </div>
        ) : (
          <button
            onClick={approveProposal}
            className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/25 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" /> Approve Action Proposal
          </button>
        )}
      </div>

      {/* Live Event Bus Event Log Stream */}
      <div className="flex-1 flex flex-col rounded-xl border border-white/8 bg-[#0B0F19] p-3 space-y-2 overflow-hidden text-xs">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-white/6 pb-2">
          <span>EVENT STREAM (EVENT_BUS)</span>
          <span className="text-emerald-400">0 dropped</span>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto font-mono text-[11px] text-slate-400 pr-1">
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-sky-400">jmap.session.sync (RFC 8620)</div>
            <div className="text-[10px] text-slate-400">dkim: rsa2048 · spf: pass (198.51.100.1)</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-indigo-400">eventBus.publish('mail.received')</div>
            <div className="text-[10px] text-slate-400">from: security@okta-enterprise.com</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-emerald-400">webrtc.transcript.chunk</div>
            <div className="text-[10px] text-slate-400">speaker: "Sara Chen" (10:42 AM)</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-violet-400">crdt.merge('rfc_891')</div>
            <div className="text-[10px] text-slate-400">peers: 3 active · 12ms latency</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-amber-400">task.state.sync</div>
            <div className="text-[10px] text-slate-400">total tasks: {kanbanTasks.length} in bus</div>
          </div>
        </div>
      </div>

      {/* Fast Module Switcher Footer */}
      <div className="pt-2 border-t border-white/6 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">VIEWPORT:</span>
        <div className="flex items-center gap-1 font-mono text-[10px]">
          <button
            onClick={() => setActiveModule('chat')}
            className={cn('px-2 py-0.5 rounded cursor-pointer', activeModule === 'chat' ? 'bg-indigo-600 text-white' : 'hover:text-white')}
          >
            CHAT
          </button>
          <button
            onClick={() => setActiveModule('mail')}
            className={cn('px-2 py-0.5 rounded cursor-pointer', activeModule === 'mail' ? 'bg-sky-600 text-white' : 'hover:text-white')}
          >
            MAIL
          </button>
          <button
            onClick={() => setActiveModule('docs')}
            className={cn('px-2 py-0.5 rounded cursor-pointer', activeModule === 'docs' ? 'bg-emerald-600 text-white' : 'hover:text-white')}
          >
            DOCS
          </button>
          <button
            onClick={() => setActiveModule('huddle')}
            className={cn('px-2 py-0.5 rounded cursor-pointer', activeModule === 'huddle' ? 'bg-violet-600 text-white' : 'hover:text-white')}
          >
            CALL
          </button>
        </div>
      </div>
    </div>
  );
}
