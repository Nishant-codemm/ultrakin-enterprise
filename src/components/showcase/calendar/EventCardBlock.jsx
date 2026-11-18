import React from 'react';
import { Video, Radio } from 'lucide-react';
import { cn } from '../../../lib/cn';

export default function EventCardBlock({
  event,
  onClick,
  isCompact = false,
  isDragging = false,
  onDragStart,
  onDragEnd,
  style = {},
  className = '',
}) {
  const formatTime = (hour, duration) => {
    const startH = Math.floor(hour);
    const startM = Math.round((hour - startH) * 60);
    const endHourTotal = hour + duration;
    const endH = Math.floor(endHourTotal);
    const endM = Math.round((endHourTotal - endH) * 60);

    const pad = (n) => (n < 10 ? '0' + n : n);
    const formatHour = (h, m) => {
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      return `${displayH}:${pad(m)} ${period}`;
    };

    return `${formatHour(startH, startM)} – ${formatHour(endH, endM)}`;
  };

  const getBorderColor = (category) => {
    switch (category) {
      case 'engineering':
        return 'border-l-indigo-400 border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-100';
      case 'client':
        return 'border-l-emerald-400 border-emerald-500/30 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-100';
      case 'standup':
        return 'border-l-amber-400 border-amber-500/30 bg-amber-950/40 hover:bg-amber-900/50 text-amber-100';
      case 'design':
        return 'border-l-fuchsia-400 border-fuchsia-500/30 bg-fuchsia-950/40 hover:bg-fuchsia-900/50 text-fuchsia-100';
      default:
        return 'border-l-indigo-400 border-indigo-500/30 bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-100';
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', event.id);
        if (onDragStart) onDragStart(e, event);
      }}
      onDragEnd={onDragEnd}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      style={style}
      className={cn(
        'group relative rounded-md border border-l-[3.5px] p-2 text-left cursor-pointer transition-all duration-150 select-none overflow-hidden backdrop-blur-xs',
        getBorderColor(event.category),
        isDragging ? 'opacity-40 scale-95 shadow-none' : 'hover:-translate-y-0.5 hover:shadow-lg',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400',
        className
      )}
    >
      {/* Top Header: Title & Badges */}
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <h4 className="text-[11.5px] font-semibold leading-snug truncate tracking-tight text-white group-hover:text-indigo-200 transition-colors">
          {event.title}
        </h4>
        {event.isHuddleActive ? (
          <span className="shrink-0 flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-emerald-500/25 border border-emerald-400/40 text-[9px] font-mono text-emerald-300">
            <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
            <span className="hidden sm:inline">LIVE</span>
          </span>
        ) : event.isHuddle ? (
          <Video className="w-3 h-3 text-indigo-300 shrink-0 opacity-70 group-hover:opacity-100" />
        ) : null}
      </div>

      {/* Time & Duration */}
      {!isCompact && (
        <div className="mt-1 text-[10px] font-mono text-slate-300/80 truncate">
          {formatTime(event.startHour, event.duration)}
        </div>
      )}

      {/* Bottom Bar: Attendees & RSVP state */}
      {!isCompact && (
        <div className="mt-2 flex items-center justify-between gap-1">
          {/* Avatar stack preview */}
          <div className="flex items-center -space-x-1.5 overflow-hidden">
            {(event.attendees || []).slice(0, 3).map((a, idx) => (
              <span
                key={a.id || idx}
                title={`${a.name} (${a.rsvp})`}
                className={cn(
                  'w-4 h-4 rounded-full text-[8px] font-semibold flex items-center justify-center border border-obsidian-surface',
                  a.avatarBg || 'bg-slate-700 text-white',
                  a.rsvp === 'going' ? 'ring-1 ring-emerald-400/80' : ''
                )}
              >
                {a.initials}
              </span>
            ))}
            {(event.attendees || []).length > 3 && (
              <span className="w-4 h-4 rounded-full bg-white/10 text-[8px] font-mono text-slate-300 flex items-center justify-center border border-obsidian-surface">
                +{(event.attendees.length - 3)}
              </span>
            )}
          </div>

          {/* User RSVP Chip */}
          {event.userRsvp && (
            <span
              className={cn(
                'px-1.5 py-0.2 rounded text-[9px] font-mono capitalize shrink-0',
                event.userRsvp === 'going'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : event.userRsvp === 'maybe'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-700/40 text-slate-400'
              )}
            >
              {event.userRsvp}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
