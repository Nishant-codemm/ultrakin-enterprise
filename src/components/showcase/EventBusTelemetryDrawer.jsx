import React from 'react';
import { Cpu } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';
import UkinActionProposalCard from './UkinActionProposalCard';

export default function EventBusTelemetryDrawer() {
  const {
    activeModule,
    setActiveModule,
    kanbanTasks,
  } = useWorkspace();

  return (
    <div className="hidden lg:flex flex-col h-full bg-obsidian-base border-l border-obsidian-border select-none p-4 space-y-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-obsidian-border">
        <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-300 flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          WORKSPACE ACTIVITY
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          SAMPLE ACTIVITY
        </span>
      </div>

      {/* Autonomous Proposal Card (Phase 7 Section 10.6 Standard) */}
      <UkinActionProposalCard />

      {/* Illustrative workspace activity */}
      <div className="flex-1 flex flex-col rounded-xl border border-obsidian-border bg-obsidian-canvas p-3 space-y-2 overflow-hidden text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-b border-obsidian-border-soft pb-2">
          <span>RECENT ACTIVITY</span>
          <span className="text-emerald-400">Sample data</span>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto font-mono text-[11px] text-slate-400 pr-1">
          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-sky-400">Email added to workspace</div>
            <div className="text-[10px] text-slate-400">Sample inbox · Launch team</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-indigo-400">Conversation linked</div>
            <div className="text-[10px] text-slate-400">Launch planning · Maya Chen</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-emerald-400">Huddle notes ready</div>
            <div className="text-[10px] text-slate-400">Architecture sync · 10:42 AM</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-violet-400">Document updated</div>
            <div className="text-[10px] text-slate-400">Launch checklist · 3 collaborators</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-amber-400">Task moved forward</div>
            <div className="text-[10px] text-slate-400">{kanbanTasks.length} sample tasks in this workspace</div>
          </div>

          <div className="p-1.5 rounded bg-white/[0.02] border border-white/4">
            <div className="text-emerald-400">Agent suggestion ready</div>
            <div className="text-[10px] text-slate-400">Waiting for a person to review</div>
          </div>
        </div>
      </div>

      {/* Fast Module Switcher Footer */}
      <div className="pt-2 border-t border-obsidian-border-soft flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10px]">VIEWPORT:</span>
        <div role="group" aria-label="Switch workspace preview module" className="flex flex-wrap items-center gap-1 font-mono text-[9px]">
          <button
            type="button"
            aria-pressed={activeModule === 'chat'}
            onClick={() => setActiveModule('chat')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'chat' ? 'bg-indigo-600 text-white' : 'hover:text-white')}
          >
            CHAT
          </button>
          <button
            type="button"
            aria-pressed={activeModule === 'mail'}
            onClick={() => setActiveModule('mail')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'mail' ? 'bg-sky-600 text-white' : 'hover:text-white')}
          >
            MAIL
          </button>
          <button
            type="button"
            aria-pressed={activeModule === 'docs'}
            onClick={() => setActiveModule('docs')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'docs' ? 'bg-emerald-600 text-white' : 'hover:text-white')}
          >
            DOCS
          </button>
          <button
            type="button"
            aria-pressed={activeModule === 'huddle'}
            onClick={() => setActiveModule('huddle')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'huddle' ? 'bg-violet-600 text-white' : 'hover:text-white')}
          >
            CALL
          </button>
          <button
            type="button"
            aria-pressed={activeModule === 'tasks'}
            onClick={() => setActiveModule('tasks')}
            className={cn('px-1.5 py-0.5 rounded cursor-pointer active:scale-95 transition-all', activeModule === 'tasks' ? 'bg-amber-600 text-white' : 'hover:text-white')}
          >
            KANBAN
          </button>
          <button
            type="button"
            aria-pressed={activeModule === 'automations'}
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
