import React, { memo } from 'react';
import { Mic, MicOff, Bot, Volume2 } from 'lucide-react';
import { StudioAudioWaveform } from './StudioAudioWaveform';
import { cn } from '../../../lib/cn';

/**
 * HuddleParticipantTile
 * Single participant tile representing a connected SFU audio stream.
 */
function HuddleParticipantTileComponent({
  participant,
  isSpeakingNow,
  isMuted,
  onFocusSpeaker,
  reduceMotion,
}) {
  return (
    <button
      type="button"
      onClick={() => onFocusSpeaker(participant.name)}
      aria-label={`Focus audio on ${participant.name}${isSpeakingNow ? ' (currently speaking)' : ''}`}
      aria-pressed={isSpeakingNow}
      className={cn(
        'relative p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between text-center cursor-pointer group',
        isSpeakingNow
          ? 'border-emerald-500/60 bg-[#0F172A]/95 shadow-[0_0_24px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/40'
          : 'border-white/[0.06] bg-[#0B0F19]/70 hover:border-white/[0.14] hover:bg-[#0F172A]/50',
      )}
    >
      {/* Speaking Radiant Wave Pulse */}
      {isSpeakingNow && !reduceMotion && (
        <span 
          className="pointer-events-none absolute -inset-1 rounded-2xl border border-emerald-400/40 animate-ping opacity-30" 
          aria-hidden="true"
        />
      )}

      {/* Top Status Bar: Speaking Indicator & Mic State */}
      <div className="w-full flex items-center justify-between mb-1.5 text-[9px] font-mono">
        <span
          className={cn(
            'px-1.5 py-0.2 rounded-full flex items-center gap-1',
            isSpeakingNow
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-500 bg-white/[0.03]',
          )}
        >
          {isSpeakingNow && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
          {isSpeakingNow ? 'SPEAKING' : participant.isAgent ? 'AI SCRIBE' : 'IDLE'}
        </span>

        <span className="text-slate-400">
          {isMuted ? (
            <MicOff className="w-2.5 h-2.5 text-rose-400/80" aria-label="Muted" />
          ) : (
            <Mic className="w-2.5 h-2.5 text-emerald-400/80" aria-label="Unmuted" />
          )}
        </span>
      </div>

      {/* Avatar with Specular Halo */}
      <div className="relative my-1">
        <div
          className={cn(
            'w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-md bg-gradient-to-tr transition-transform duration-200',
            participant.color,
            isSpeakingNow && 'scale-105 shadow-[0_0_16px_rgba(16,185,129,0.4)]',
          )}
        >
          {participant.isAgent ? (
            <Bot className="w-5 h-5 text-white animate-pulse" aria-label="AI Assistant" />
          ) : (
            participant.initials
          )}
        </div>

        {/* Microphone status pill */}
        <span
          className={cn(
            'absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#07090E] text-[8px]',
            isSpeakingNow
              ? 'bg-emerald-500 text-white shadow-sm'
              : isMuted
              ? 'bg-rose-500/90 text-white'
              : 'bg-slate-700 text-slate-300',
          )}
          aria-hidden="true"
        >
          {isSpeakingNow ? (
            <Volume2 className="h-2.5 w-2.5" />
          ) : isMuted ? (
            <MicOff className="h-2.5 w-2.5" />
          ) : (
            <Mic className="h-2.5 w-2.5 opacity-60" />
          )}
        </span>
      </div>

      {/* Participant Name & Role */}
      <div className="w-full mt-1">
        <span className="font-semibold text-[11px] text-white block truncate">
          {participant.name}
        </span>
        <span className="text-[9px] text-slate-400 block truncate font-mono">
          {participant.role.split('·')[0]}
        </span>
      </div>

      {/* Live Procedural Audio Equalizer */}
      <div className="mt-2 w-full flex items-center justify-center">
        <StudioAudioWaveform
          isSpeaking={isSpeakingNow}
          isMuted={isMuted}
          reduceMotion={reduceMotion}
        />
      </div>
    </button>
  );
}

export const HuddleParticipantTile = memo(HuddleParticipantTileComponent);
export default HuddleParticipantTile;
