import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';

/**
 * HuddleSharedCanvas
 * Shared RFC and artifact workspace canvas with live multiplayer cursors.
 * Refined for high text contrast, calm purposeful cursor motion, and zero visual clutter.
 */
function HuddleSharedCanvasComponent({
  screenShareActive,
  onToggleScreenShare,
  reduceMotion,
}) {
  return (
    <div className="flex-1 min-h-[220px] rounded-xl border border-white/[0.08] bg-[#060810] p-3.5 flex flex-col justify-between shadow-xl relative overflow-hidden select-none">
      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-xs text-white">
            Shared Canary RFC · PR #1042 Rollout Sequence
          </span>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/25">
            EU-04 LIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400">Multiplayer Active</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400" aria-hidden="true" />
        </div>
      </div>

      {/* Living Document Content with Anchored Multiplayer Cursors */}
      <div className="relative py-2.5 space-y-2.5 text-xs font-mono text-slate-300">
        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] space-y-2">
          <div className="text-slate-400 flex items-center justify-between text-[11px] pb-1 border-b border-white/[0.04]">
            <span># Target Pods: 24/24 (Production Canary)</span>
            <span className="text-emerald-400 font-semibold">100% Canary Healthy</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-200">Token refresh TTL updated to 3600s in Redis Sentinel</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-200">PR #1042 automated integration suite passed (14/14 checks)</span>
          </div>
          <div className="text-indigo-300 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span className="text-slate-200">Rollout checks verified by Sara Chen & Alex Mercer</span>
          </div>
        </div>

        {/* Anchored Multiplayer Cursor 1 (Sara Chen - Principal Infra Lead) */}
        <motion.div
          className="absolute pointer-events-none z-10 flex items-center gap-1.5"
          style={{ left: '44%', top: '38%' }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 6, 0],
                  y: [0, 3, 0],
                }
          }
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 drop-shadow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <span className="text-[9.5px] font-sans font-semibold bg-emerald-600 text-white px-1.5 py-0.5 rounded shadow-sm">
            Sara Chen
          </span>
        </motion.div>

        {/* Anchored Multiplayer Cursor 2 (Alex Mercer - CTO) */}
        <motion.div
          className="absolute pointer-events-none z-10 flex items-center gap-1.5"
          style={{ left: '72%', top: '68%' }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -6, 0],
                  y: [0, 3, 0],
                }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        >
          <svg className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 drop-shadow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <span className="text-[9.5px] font-sans font-semibold bg-indigo-600 text-white px-1.5 py-0.5 rounded shadow-sm">
            Alex Mercer
          </span>
        </motion.div>
      </div>

      {/* Bottom Status & Presentation Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[11px] text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Synced with Space #architecture-rfc
        </span>
        <button
          type="button"
          onClick={onToggleScreenShare}
          className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors"
        >
          <Share2 className="w-3 h-3" />
          <span>{screenShareActive ? 'Stop Presentation' : 'Present Screen to Room'}</span>
        </button>
      </div>
    </div>
  );
}

export const HuddleSharedCanvas = memo(HuddleSharedCanvasComponent);
export default HuddleSharedCanvas;
