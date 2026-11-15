import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, Zap } from 'lucide-react';

/**
 * HuddleSharedCanvas
 * Shared RFC and artifact workspace canvas with live multiplayer cursors.
 */
function HuddleSharedCanvasComponent({
  screenShareActive,
  onToggleScreenShare,
  reduceMotion,
}) {
  return (
    <div className="flex-1 min-h-[220px] rounded-xl border border-white/[0.08] bg-[#060810] p-3.5 flex flex-col justify-between shadow-2xl relative overflow-hidden">
      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs">
        <div className="flex items-center gap-2 text-slate-200">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-semibold text-[11px] text-white">
            Shared Canary RFC · PR #1042 Rollout Sequence
          </span>
          <span className="text-[9px] font-mono text-emerald-300 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
            EU-04 LIVE
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono text-slate-400">Collaborative Mode</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" aria-hidden="true" />
        </div>
      </div>

      {/* Living Document Content with Live Multiplayer Cursors */}
      <div className="relative py-2.5 space-y-2 text-[11px] font-mono text-slate-300">
        <div className="p-2 rounded bg-white/[0.02] border border-white/[0.04] space-y-1">
          <div className="text-slate-400 flex items-center justify-between">
            <span># Canary Rollout Checklist · Target Pods: 24/24</span>
            <span className="text-emerald-400">100% Canary Healthy</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>Token refresh TTL updated to 3600s in Redis Sentinel</span>
          </div>
          <div className="text-emerald-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            <span>PR #1042 automated integration suite passed (14/14 checks)</span>
          </div>
          <div className="text-indigo-300 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-indigo-400 animate-pulse" />
            <span>Rollout checks verified by Sara Chen & Alex Mercer</span>
          </div>
        </div>

        {/* Floating Multiplayer Cursor 1 (Sara Chen - Infra) */}
        <motion.div
          className="absolute pointer-events-none z-10 flex items-center gap-1"
          animate={
            reduceMotion
              ? { left: '42%', top: '35%' }
              : {
                  left: ['38%', '46%', '40%', '38%'],
                  top: ['30%', '38%', '34%', '30%'],
                }
          }
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 drop-shadow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <span className="text-[9px] font-sans font-semibold bg-emerald-500/90 text-white px-1.5 py-0.5 rounded shadow-sm">
            Sara Chen
          </span>
        </motion.div>

        {/* Floating Multiplayer Cursor 2 (Alex Mercer - CTO) */}
        <motion.div
          className="absolute pointer-events-none z-10 flex items-center gap-1"
          animate={
            reduceMotion
              ? { left: '72%', top: '65%' }
              : {
                  left: ['75%', '68%', '74%', '75%'],
                  top: ['62%', '70%', '64%', '62%'],
                }
          }
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <svg className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 drop-shadow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36z" />
          </svg>
          <span className="text-[9px] font-sans font-semibold bg-indigo-500/90 text-white px-1.5 py-0.5 rounded shadow-sm">
            Alex Mercer
          </span>
        </motion.div>
      </div>

      {/* Bottom Status & Presentation Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08] text-[10px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Synced with Space #architecture-rfc
        </span>
        <button
          type="button"
          onClick={onToggleScreenShare}
          className="text-indigo-400 hover:text-indigo-300 underline cursor-pointer transition-colors"
        >
          {screenShareActive ? 'Close Presentation Mode' : 'Present Screen to Room'}
        </button>
      </div>
    </div>
  );
}

export const HuddleSharedCanvas = memo(HuddleSharedCanvasComponent);
export default HuddleSharedCanvas;
