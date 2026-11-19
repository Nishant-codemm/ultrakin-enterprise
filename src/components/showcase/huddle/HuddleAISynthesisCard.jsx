import React, { useState, useEffect, useRef, memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, CheckCircle2, CheckSquare, FileText } from 'lucide-react';

/**
 * HuddleAISynthesisCard
 * Real-time synthesis card demonstrating Ukin AI converting live speech commitments
 * into structured work tickets and living RFC documentation.
 * Features a 350ms intent parsing shimmer state between utterances before crossfading.
 */
function HuddleAISynthesisCardComponent({
  currentScenario,
  taskSynced,
  docSynced,
  onSyncTask,
  onSyncDoc,
}) {
  const [displayedScenario, setDisplayedScenario] = useState(currentScenario);
  const [isParsing, setIsParsing] = useState(false);
  const prevScenarioTextRef = useRef(currentScenario?.text);

  useEffect(() => {
    if (prevScenarioTextRef.current !== currentScenario?.text) {
      prevScenarioTextRef.current = currentScenario?.text;
      setIsParsing(true);
      const timer = setTimeout(() => {
        setDisplayedScenario(currentScenario);
        setIsParsing(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentScenario]);

  return (
    <AnimatePresence mode="wait">
      {isParsing ? (
        <motion.div
          key="parsing-shimmer-state"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="p-3.5 rounded-xl border border-sky-500/25 bg-[#0F172A] shadow-lg select-none min-h-[148px] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-mono uppercase tracking-wider text-sky-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-spin" aria-hidden="true" />
              Ukin parsing semantic commitment...
            </span>
            <span className="text-[9.5px] font-mono text-sky-300 bg-sky-500/15 border border-sky-500/25 px-2 py-0.5 rounded-full animate-pulse">
              EXTRACTING INTENT
            </span>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-black/40 border border-white/[0.04] p-2.5 my-1">
            <div className="h-3 w-3/4 rounded bg-white/[0.08] animate-pulse mb-1.5" />
            <div className="h-2.5 w-1/2 rounded bg-white/[0.04] animate-pulse" />
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-sky-400/15 to-transparent pointer-events-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
            <div className="h-8 rounded-lg bg-white/[0.03] border border-white/[0.04] animate-pulse" />
            <div className="h-8 rounded-lg bg-white/[0.03] border border-white/[0.04] animate-pulse" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={displayedScenario?.text || 'commitment-card'}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          transition={{ duration: 0.2 }}
          className="p-3.5 rounded-xl border border-white/[0.08] bg-[#0F172A] shadow-lg space-y-2.5 select-none"
        >
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
              {displayedScenario?.confidence || '99.2%'} CONFIDENCE
            </span>
          </div>

          {/* Spoken Utterance Snippet */}
          <div className="rounded-lg bg-black/30 border border-white/[0.04] p-2.5">
            <p className="text-xs text-slate-100 font-medium italic leading-relaxed">
              "{displayedScenario?.text || 'Review the launch checklist and share the rollout notes with the team'}"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const HuddleAISynthesisCard = memo(HuddleAISynthesisCardComponent);
export default HuddleAISynthesisCard;
