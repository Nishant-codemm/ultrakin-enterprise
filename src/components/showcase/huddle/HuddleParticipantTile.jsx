import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Bot, Volume2 } from 'lucide-react';
import { StudioAudioWaveform } from './StudioAudioWaveform';
import { cn } from '../../../lib/cn';

/**
 * HuddleParticipantTile
 * Single participant tile representing a connected SFU audio stream.
 * Refined for visual calm, clear hierarchy, and restrained speaking indicators.
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
        'relative p-2.5 rounded-xl border transition-all duration-200 flex flex-col items-center justify-between text-center cursor-pointer group select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
        isSpeakingNow
          ? 'border-emerald-500/40 bg-[#0F172A]/90 ring-1 ring-emerald-500/20'
          : 'border-white/[0.06] bg-[#0B0F19]/60 hover:border-white/[0.12] hover:bg-[#0F172A]/40',
      )}
    >
      {/* Voice Activity Organic Breathing Glow */}
      {isSpeakingNow && !reduceMotion && (
        <motion.span
          animate={{ scale: [1, 1.025, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -inset-0.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 blur-xs -z-10"
          aria-hidden="true"
        />
      )}
      {/* Top Status Bar: Speaking Indicator & Mic State */}
      <div className="w-full flex items-center justify-between mb-1.5 text-[9.5px] font-mono">
        <span
          className={cn(
            'px-1.5 py-0.5 rounded-full flex items-center gap-1 font-medium',
            isSpeakingNow
              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25'
              : participant.isAgent
              ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
              : 'text-slate-500 bg-white/[0.03]',
          )}
        >
          {isSpeakingNow && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          {isSpeakingNow ? 'SPEAKING' : participant.isAgent ? 'AI SCRIBE' : 'IDLE'}
        </span>

        <span className="text-slate-400">
          {isMuted ? (
            <MicOff className="w-3 h-3 text-rose-400/80" aria-label="Muted" />
          ) : (
            <Mic className="w-3 h-3 text-emerald-400/80" aria-label="Unmuted" />
          )}
        </span>
      </div>

      {/* Avatar Chassis */}
      <div className="relative my-1">
        <div
          className={cn(
            'w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs text-white shadow-sm bg-gradient-to-tr transition-transform duration-200',
            participant.color,
            isSpeakingNow && 'scale-105 ring-2 ring-emerald-400/40',
          )}
        >
          {participant.isAgent ? (
            <Bot className="w-5 h-5 text-white" aria-label="AI Assistant" />
          ) : (
            participant.initials
          )}
        </div>

        {/* Microphone / Volume status pill */}
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

      {/* Participant Name & Role with Enhanced Hierarchy */}
      <div className="w-full mt-1.5">
        <span className="font-semibold text-xs text-white block truncate tracking-tight">
          {participant.name}
        </span>
        <span className="text-[10px] text-slate-400 block truncate font-mono mt-0.5">
          {participant.role}
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
