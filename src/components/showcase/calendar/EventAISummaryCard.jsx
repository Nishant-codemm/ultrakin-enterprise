import React from 'react';
import { Sparkles, CheckSquare, FileText } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';

export default function EventAISummaryCard({ event }) {
  const {
    toggleEventActionItem,
    syncEventActionsToKanban,
    exportEventToLivingDoc,
    setActiveModule,
  } = useWorkspace();

  if (!event || !event.aiSummary) return null;

  const { consensus, decisions = [], actionItems = [] } = event.aiSummary;

  const handleExportDoc = () => {
    exportEventToLivingDoc(event);
    setActiveModule('docs');
  };

  const handleSyncTasks = () => {
    syncEventActionsToKanban(event);
    setActiveModule('tasks');
  };

  return (
    <div className="p-3.5 rounded-xl bg-indigo-950/25 border border-indigo-500/30 space-y-3 relative overflow-hidden backdrop-blur-xs">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
            <Sparkles className="w-3 h-3" />
          </span>
          <span className="text-xs font-semibold text-white tracking-tight">
            Ukin AI Synthesis
          </span>
        </div>
        <span className="text-[9.5px] font-mono text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-full border border-indigo-400/30">
          Audio Transcript Synthesized
        </span>
      </div>

      {/* Consensus Statement */}
      {consensus && (
        <div className="text-xs leading-relaxed text-slate-200 bg-white/[0.02] p-2.5 rounded-lg border border-white/[0.06]">
          <span className="font-semibold text-indigo-300 block mb-0.5 text-[11px] uppercase font-mono">
            Executive Consensus:
          </span>
          {consensus}
        </div>
      )}

      {/* Key Decisions */}
      {decisions.length > 0 && (
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted block">
            Key Architecture Decisions
          </span>
          <ul className="space-y-1">
            {decisions.map((dec, idx) => (
              <li key={idx} className="text-[11.5px] text-slate-300 flex items-start gap-1.5">
                <span className="text-indigo-400 font-bold">›</span>
                <span>{dec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Extracted Action Items */}
      {actionItems.length > 0 && (
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted block">
            Extracted Action Items ({actionItems.length})
          </span>
          <div className="space-y-1.5">
            {actionItems.map((act) => (
              <div
                key={act.id}
                onClick={() => toggleEventActionItem(event.id, act.id)}
                className="flex items-start gap-2 p-2 rounded-lg bg-black/40 border border-white/[0.06] hover:border-indigo-500/40 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={act.completed}
                  onChange={() => {}} // handled by parent onClick
                  className="w-3.5 h-3.5 mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className={cn(
                      'text-xs block leading-tight',
                      act.completed ? 'line-through text-slate-500' : 'text-slate-200'
                    )}
                  >
                    {act.text}
                  </span>
                  <div className="mt-1 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span>Assignee: {act.assignee}</span>
                    <span>·</span>
                    <span className="text-indigo-300">Due: {act.due}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons: 1-Click Export to Doc & Sync to Kanban */}
      <div className="pt-2 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleSyncTasks}
          className="flex-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-amber-600/20 hover:bg-amber-600/30 text-amber-200 border border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
          <span>Sync to Kanban</span>
        </button>

        <button
          type="button"
          onClick={handleExportDoc}
          className="flex-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-200 border border-indigo-500/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Export to Doc</span>
        </button>
      </div>
    </div>
  );
}
