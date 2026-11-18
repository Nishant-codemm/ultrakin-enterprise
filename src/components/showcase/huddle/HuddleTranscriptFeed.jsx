import React, { memo } from 'react';
import { Radio, Activity, FileText } from 'lucide-react';
import { cn } from '../../../lib/cn';

/**
 * HuddleTranscriptFeed
 * Speech-to-text transcript panel rendering speaker logs with Whisper v3 latency tags.
 * Refined for visual calm, high typographic contrast, and effortless legibility.
 */
function HuddleTranscriptFeedComponent({
  transcript,
  onSimulateNextSpeech,
  onNavigateToDocs,
}) {
  return (
    <aside className="lg:col-span-5 flex flex-col h-full rounded-xl border border-white/[0.08] bg-[#0B0F19] overflow-hidden shadow-xl min-h-[360px] select-none">
      {/* Header */}
      <div className="p-3 border-b border-white/[0.08] bg-[#0F172A]/70 flex items-center justify-between">
        <span className="text-xs font-semibold text-white flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          Live Huddle Transcript
        </span>
        <span 
          className="text-[10px] font-mono text-slate-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.08]"
          title="Streaming Audio Transcription Model"
        >
          Whisper v3 · 48kHz
        </span>
      </div>

      {/* Transcript Message Feed */}
      <div 
        className="flex-1 p-3 space-y-2.5 overflow-y-auto text-xs"
        role="log"
        aria-live="polite"
        aria-label="Live meeting utterances"
      >
        {transcript.map((t) => (
          <div
            key={t.id}
            className={cn(
              'p-2.5 rounded-lg border transition-all duration-150',
              t.isAgent
                ? 'bg-indigo-500/10 border-indigo-500/25'
                : 'bg-[#0F172A]/40 border-white/[0.05]',
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 truncate">
                <span className="font-semibold text-white truncate text-xs">{t.speaker}</span>
                <span className="text-[10px] text-slate-400 font-mono">({t.role})</span>
                {!t.isAgent && (
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    Speaker
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono text-slate-400 shrink-0">{t.time}</span>
            </div>
            <p className="text-slate-200 leading-relaxed text-xs">{t.text}</p>
          </div>
        ))}
      </div>

      {/* Next Utterance Simulator & RFC Continuity */}
      <div className="p-3 border-t border-white/[0.08] bg-[#0F172A]/30 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10.5px] text-slate-400 font-mono">Simulate speech cadence:</span>
          <button
            type="button"
            onClick={onSimulateNextSpeech}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded px-1"
          >
            <Activity className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Next Utterance →</span>
          </button>
        </div>

        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span>Context retained in Space</span>
          </span>
          <button
            type="button"
            onClick={onNavigateToDocs}
            className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-400 rounded px-1"
          >
            <FileText className="w-3 h-3" />
            <span>Jump to RFC Document →</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

export const HuddleTranscriptFeed = memo(HuddleTranscriptFeedComponent);
export default HuddleTranscriptFeed;
