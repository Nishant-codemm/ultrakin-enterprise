import React, { memo } from 'react';
import { Sparkles, CheckCircle2, CheckSquare, FileText } from 'lucide-react';

/**
 * HuddleAISynthesisCard
 * Real-time synthesis card demonstrating Ukin AI converting live speech commitments
 * into structured work tickets and living RFC documentation.
 */
function HuddleAISynthesisCardComponent({
  currentScenario,
  taskSynced,
  docSynced,
  onSyncTask,
  onSyncDoc,
}) {
  return (
    <div className="p-3.5 rounded-xl border border-indigo-500/30 bg-[#0F172A]/90 shadow-xl space-y-2.5">
      {/* Header: AI Badge & Confidence Metric */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" aria-hidden="true" />
          Ukin AI Synthesis · Spoken Commitment Detected
        </span>
        <span 
          className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-1.5 py-0.5 rounded"
          title="Speech-to-Intent Confidence Level"
        >
          CONFIDENCE: {currentScenario?.confidence || '99.2%'}
        </span>
      </div>

      {/* Spoken Utterance Snippet */}
      <p className="text-xs text-white font-medium italic">
        "{currentScenario?.text || 'Review the launch checklist and share the rollout notes with the team'}"
      </p>

      {/* 1-Click Actions: Sync to Kanban and Synthesize into Living RFC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
        {taskSynced ? (
          <div className="py-2 px-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Synced to Sprint 24 Board
          </div>
        ) : (
          <button
            type="button"
            onClick={onSyncTask}
            className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
          >
            <CheckSquare className="w-3.5 h-3.5" />
            1-Click Sync to Kanban
          </button>
        )}

        {docSynced ? (
          <div className="py-2 px-3 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Decision Injected in Living Doc
          </div>
        ) : (
          <button
            type="button"
            onClick={onSyncDoc}
            className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.1] text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Synthesize into Living RFC
          </button>
        )}
      </div>
    </div>
  );
}

export const HuddleAISynthesisCard = memo(HuddleAISynthesisCardComponent);
export default HuddleAISynthesisCard;
