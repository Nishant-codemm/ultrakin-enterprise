import React, { memo } from 'react';
import { Sparkles, CheckCircle2, CheckSquare, FileText } from 'lucide-react';

/**
 * HuddleAISynthesisCard
 * Real-time synthesis card demonstrating Ukin AI converting live speech commitments
 * into structured work tickets and living RFC documentation.
 * Refined for visual calm, high typographic contrast, and clear action affordances.
 */
function HuddleAISynthesisCardComponent({
  currentScenario,
  taskSynced,
  docSynced,
  onSyncTask,
  onSyncDoc,
}) {
  return (
    <div className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0F172A] shadow-lg space-y-2.5 select-none">
      {/* Header: AI Badge & Confidence Metric */}
      <div className="flex items-center justify-between">
        <span className="text-[10.5px] font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
          Ukin AI Synthesis · Spoken Commitment Detected
        </span>
        <span 
          className="text-[9.5px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 rounded-full"
          title="Speech-to-Intent Confidence Level"
        >
          {currentScenario?.confidence || '99.2%'} CONFIDENCE
        </span>
      </div>

      {/* Spoken Utterance Snippet */}
      <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2.5">
        <p className="text-xs text-slate-100 font-medium italic leading-relaxed">
          "{currentScenario?.text || 'Review the launch checklist and share the rollout notes with the team'}"
        </p>
      </div>

      {/* 1-Click Actions: Sync to Kanban and Synthesize into Living RFC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
        {taskSynced ? (
          <div className="py-2 px-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Synced to Sprint 24 Board</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onSyncTask}
            className="py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <CheckSquare className="w-3.5 h-3.5 shrink-0" />
            <span>Sync to Kanban</span>
          </button>
        )}

        {docSynced ? (
          <div className="py-2 px-3 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>Injected in Living Doc</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onSyncDoc}
            className="py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>Synthesize into Living RFC</span>
          </button>
        )}
      </div>
    </div>
  );
}

export const HuddleAISynthesisCard = memo(HuddleAISynthesisCardComponent);
export default HuddleAISynthesisCard;
