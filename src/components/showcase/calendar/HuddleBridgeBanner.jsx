import React from 'react';
import { Video, Radio, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';

export default function HuddleBridgeBanner({ event }) {
  const { setActiveModule, setIsHuddleActive } = useWorkspace();

  if (!event || !event.isHuddle) return null;

  const handleJoinHuddle = () => {
    setIsHuddleActive(true);
    setActiveModule('huddle');
  };

  const isLive = event.isHuddleActive;

  return (
    <div
      className={cn(
        'p-3.5 rounded-xl border relative overflow-hidden transition-all',
        isLive
          ? 'bg-emerald-950/40 border-emerald-500/40 shadow-lg shadow-emerald-950/50'
          : 'bg-indigo-950/30 border-indigo-500/30'
      )}
    >
      {/* Glow highlight */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl pointer-events-none opacity-40',
          isLive ? 'bg-emerald-500' : 'bg-indigo-500'
        )}
      />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {isLive ? (
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-mono font-semibold">
                <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                SESSION IN PROGRESS
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-[10px] font-mono">
                <Video className="w-2.5 h-2.5" />
                HUDDLE ROOM READY
              </span>
            )}

            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              E2EE WebRTC
            </span>
          </div>

          <h4 className="text-xs font-semibold text-white">
            {event.huddleRoom || '/workspace/acme/events/session'}
          </h4>

          <p className="text-[11px] text-slate-300">
            {isLive
              ? `${event.huddleParticipantsCount || 4} teammates active with real-time audio transcription.`
              : 'Encrypted meeting chamber auto-provisioned for this session.'}
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleJoinHuddle}
          className={cn(
            'px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer shrink-0 active:scale-[0.98]',
            isLive
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/30 animate-pulse'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/30'
          )}
        >
          <Video className="w-3.5 h-3.5" />
          <span>{isLive ? 'Join Huddle' : 'Enter Chamber'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
