import React, { memo } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Share2,
  PhoneOff,
  Hand,
} from 'lucide-react';
import { cn } from '../../../lib/cn';

const HUDDLE_REACTIONS = ['👏', '👍', '🚀', '💡', '🔥'];

/**
 * HuddleControlBar
 * Bottom media dock providing audio/video controls, reactions, and hotkey triggers.
 */
function HuddleControlBarComponent({
  huddleMuted,
  cameraEnabled,
  screenShareActive,
  handRaised,
  onToggleMute,
  onToggleCamera,
  onToggleScreenShare,
  onToggleHandRaise,
  onSendReaction,
  onLeaveCall,
}) {
  return (
    <footer className="h-14 px-4 sm:px-6 border-t border-white/[0.08] bg-[#0B0F19]/95 backdrop-blur-md flex items-center justify-between gap-3 relative z-20">
      {/* Left: Quick In-Call Reaction Emojis & Hand Raise */}
      <div className="hidden sm:flex items-center gap-1">
        {HUDDLE_REACTIONS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            onClick={() => onSendReaction(emoji)}
            title={`React ${emoji}`}
            aria-label={`Send ${emoji} reaction`}
            className="h-8 w-8 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.06] text-sm flex items-center justify-center transition-transform hover:scale-115 active:scale-95 cursor-pointer"
          >
            {emoji}
          </button>
        ))}

        <button
          type="button"
          onClick={onToggleHandRaise}
          title={handRaised ? 'Lower Hand (H)' : 'Raise Hand (H)'}
          aria-label={handRaised ? 'Lower Hand' : 'Raise Hand'}
          aria-pressed={handRaised}
          className={cn(
            'h-8 px-2.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer',
            handRaised
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
              : 'bg-white/[0.04] border-white/[0.08] text-slate-300 hover:bg-white/[0.08]',
          )}
        >
          <Hand className="w-3.5 h-3.5" />
          <span className="text-[11px] font-semibold">{handRaised ? 'Hand Raised' : 'Raise'}</span>
          <span className="text-[9px] font-mono text-slate-500">(H)</span>
        </button>
      </div>

      {/* Center/Right: Core WebRTC Media Control Dock */}
      <div className="flex items-center gap-2 mx-auto sm:mx-0">
        {/* Mute Button */}
        <button
          type="button"
          onClick={onToggleMute}
          title={huddleMuted ? 'Unmute (M)' : 'Mute (M)'}
          aria-label={huddleMuted ? 'Unmute microphone' : 'Mute microphone'}
          aria-pressed={huddleMuted}
          className={cn(
            'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
            huddleMuted
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
          )}
        >
          {huddleMuted ? (
            <MicOff className="w-4 h-4 text-rose-400" />
          ) : (
            <Mic className="w-4 h-4 text-emerald-400" />
          )}
          <span className="hidden sm:inline">{huddleMuted ? 'Muted' : 'Mute'}</span>
          <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(M)</span>
        </button>

        {/* Camera Button */}
        <button
          type="button"
          onClick={onToggleCamera}
          title={cameraEnabled ? 'Turn off video (V)' : 'Turn on video (V)'}
          aria-label={cameraEnabled ? 'Turn off video' : 'Turn on video'}
          aria-pressed={cameraEnabled}
          className={cn(
            'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
            cameraEnabled
              ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
          )}
        >
          {cameraEnabled ? (
            <Video className="w-4 h-4 text-sky-400" />
          ) : (
            <VideoOff className="w-4 h-4 text-slate-400" />
          )}
          <span className="hidden sm:inline">{cameraEnabled ? 'Video On' : 'Video'}</span>
          <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(V)</span>
        </button>

        {/* Screen Share Button */}
        <button
          type="button"
          onClick={onToggleScreenShare}
          title={screenShareActive ? 'Stop sharing screen (S)' : 'Share screen (S)'}
          aria-label={screenShareActive ? 'Stop sharing screen' : 'Share screen'}
          aria-pressed={screenShareActive}
          className={cn(
            'p-2 sm:px-3 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold',
            screenShareActive
              ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
              : 'bg-white/[0.06] border-white/[0.1] text-white hover:bg-white/[0.1]',
          )}
        >
          <Share2 className="w-4 h-4 text-slate-300" />
          <span className="hidden sm:inline">{screenShareActive ? 'Stop Sharing' : 'Share'}</span>
          <span className="text-[9px] font-mono text-slate-500 hidden sm:inline">(S)</span>
        </button>

        {/* Leave Call Button */}
        <button
          type="button"
          onClick={onLeaveCall}
          aria-label="Leave Huddle"
          className="p-2 sm:px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all cursor-pointer"
        >
          <PhoneOff className="w-4 h-4" />
          <span>Leave</span>
        </button>
      </div>
    </footer>
  );
}

export const HuddleControlBar = memo(HuddleControlBarComponent);
export default HuddleControlBar;
