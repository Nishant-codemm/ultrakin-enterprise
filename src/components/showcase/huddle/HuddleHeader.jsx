import React, { memo } from 'react';
import { Wifi, Hand, ShieldCheck } from 'lucide-react';

/**
 * HuddleHeader
 * Top navigation and session telemetry bar for the active Huddle room.
 */
function HuddleHeaderComponent({
  channelName = '#architecture-rfc',
  formattedCallTime,
  handRaised = false,
  participantCount = 4,
  isCallActive = true,
}) {
  return (
    <header className="h-12 px-4 border-b border-white/[0.08] bg-[#0B0F19]/90 backdrop-blur-md flex items-center justify-between select-none relative z-20">
      {/* Left: Active Room & Session Duration */}
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className={`relative inline-flex rounded-full h-2 w-2 ${isCallActive ? 'bg-emerald-400' : 'bg-slate-500'}`} />
        </span>
        <div className="flex items-center gap-1.5 truncate">
          <span className="font-semibold text-xs text-white truncate">
            {isCallActive ? `Live Huddle: ${channelName}` : `Concluded Huddle: ${channelName}`}
          </span>
          <span className="text-[10px] text-slate-500" aria-hidden="true">·</span>
          <span 
            className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded border tabular-nums ${
              isCallActive 
                ? 'text-rose-300 bg-rose-500/10 border-rose-500/25' 
                : 'text-slate-400 bg-white/[0.04] border-white/[0.08]'
            }`}
            title={isCallActive ? "Active Recording & Audio Stream" : "Call Concluded"}
          >
            {isCallActive ? (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
                ● REC {formattedCallTime}
              </>
            ) : (
              '● Call ended'
            )}
          </span>
        </div>
        <span 
          className="hidden md:inline-flex items-center gap-1 text-[10px] font-mono text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded"
          title="Audio Engine: 48kHz Stereo Opus HD Codec"
        >
          <Wifi className="w-3 h-3 text-sky-400" />
          Opus 48kHz HD
        </span>
      </div>

      {/* Right: Security & Session Status Indicators */}
      <div className="flex items-center gap-2 shrink-0">
        {isCallActive && handRaised && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded animate-pulse">
            <Hand className="w-3 h-3 text-amber-400" /> 1 Hand Raised
          </span>
        )}
        <span 
          className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded"
          title="Enterprise End-to-End Encryption Enabled"
        >
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          E2EE 256-bit
        </span>
        <div className="flex items-center gap-1.5 pl-2 border-l border-white/[0.08]">
          <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-emerald-400' : 'bg-slate-500'}`} aria-hidden="true" />
          <span className="text-xs text-slate-300 font-medium">
            {isCallActive ? `${participantCount} in room` : 'Session archived'}
          </span>
        </div>
      </div>
    </header>
  );
}

export const HuddleHeader = memo(HuddleHeaderComponent);
export default HuddleHeader;
