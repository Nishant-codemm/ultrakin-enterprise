import React from 'react';
import { Cpu } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';
import UkinActionProposalCard from './UkinActionProposalCard';

export default function EventBusTelemetryDrawer() {
  const {
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

      {/* Autonomous Proposal Card (Phase 7 Section 10.6 Standard) */}
      <UkinActionProposalCard />

      {/* Live Event Bus Event Log Stream */}
      <div className="flex-1 flex flex-col rounded-xl border border-white/8 bg-[#0B0F19] p-3 space-y-2 overflow-hidden text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-emerald-400">dag.engine.topology</div>
            <div className="text-[10px] text-slate-400">tarjan: acyclic · 0 cycles detected</div>
          </div>
        </div>
      </div>

      {/* Fast Module Switcher Footer */}
      <div className="pt-2 border-t border-white/6 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">VIEWPORT:</span>
        <div className="flex flex-wrap items-center gap-1 font-mono text-[9px]">
          <button
            onClick={() => setActiveModule('chat')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'chat' ? 'bg-indigo-600 text-white' : 'hover:text-white')}
          >
            CHAT
          </button>
          <button
            onClick={() => setActiveModule('mail')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'mail' ? 'bg-sky-600 text-white' : 'hover:text-white')}
          >
            MAIL
          </button>
          <button
            onClick={() => setActiveModule('docs')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'docs' ? 'bg-emerald-600 text-white' : 'hover:text-white')}
          >
            DOCS
          </button>
          <button
            onClick={() => setActiveModule('huddle')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'huddle' ? 'bg-violet-600 text-white' : 'hover:text-white')}
          >
            CALL
          </button>
          <button
            onClick={() => setActiveModule('tasks')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'tasks' ? 'bg-amber-600 text-white' : 'hover:text-white')}
          >
            KANBAN
          </button>
          <button
            onClick={() => setActiveModule('automations')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'automations' ? 'bg-emerald-600 text-white' : 'hover:text-white')}
          >
            DAG
          </button>
        </div>
      </div>
    </div>
  );
}
