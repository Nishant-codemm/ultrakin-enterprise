import React from 'react';
import { Clock, Radio, Video, ArrowRight } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';

export default function CalendarAgendaView({ events = [], onSelectEvent }) {
  const { updateEventRsvp, openEventDrawer } = useWorkspace();

  const sortedEvents = [...events].sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    return a.startHour - b.startHour;
  });

  const getDayName = (dayIdx) => {
    switch (dayIdx) {
      case 0: return 'Monday, Nov 9';
      case 1: return 'Tuesday, Nov 10';
      case 2: return 'Wednesday, Nov 11';
      case 3: return 'Thursday, Nov 12 (Today)';
      case 4: return 'Friday, Nov 13';
      default: return 'Weekend';
    }
  };

  const formatTime = (hour, duration) => {
    const startH = Math.floor(hour);
    const startM = Math.round((hour - startH) * 60);
    const endH = Math.floor(hour + duration);
    const endM = Math.round((hour + duration - endH) * 60);
    const pad = (n) => (n < 10 ? '0' + n : n);
    const f = (h, m) => `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
    return `${f(startH, startM)} – ${f(endH, endM)}`;
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-obsidian-canvas text-slate-200 overflow-y-auto p-4 sm:p-6">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div>
          <h3 className="text-base font-semibold text-white">Upcoming Team Agenda</h3>
          <p className="text-xs text-slate-400">
            {events.length} sessions scheduled across your subscribed spaces
          </p>
        </div>

        <div className="space-y-4">
          {sortedEvents.map((ev) => {
            const isToday = ev.day === 3;
            return (
              <div
                key={ev.id}
                onClick={() => onSelectEvent(ev)}
                className={cn(
                  'group p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-obsidian-surface/80 hover:bg-obsidian-surface hover:border-indigo-500/40 hover:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4',
                  isToday ? 'border-indigo-500/30 ring-1 ring-indigo-500/20' : 'border-obsidian-border'
                )}
              >
                {/* Left: Day & Title */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={cn(
                      'w-11 h-11 rounded-xl flex flex-col items-center justify-center font-bold shrink-0 border',
                      isToday
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                        : 'bg-white/[0.04] text-slate-300 border-white/[0.08]'
                    )}
                  >
                    <span className="text-[9px] font-mono uppercase">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][ev.day] || 'Day'}
                    </span>
                    <span className="text-sm leading-none mt-0.5">{9 + ev.day}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {ev.title}
                      </h4>
                      {ev.isHuddleActive && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9.5px] font-mono text-emerald-300 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-400" />
                          LIVE SESSION
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                      <span className="flex items-center gap-1 font-mono text-[11.5px]">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {formatTime(ev.startHour, ev.duration)}
                      </span>
                      <span>·</span>
                      <span className="text-slate-300">{getDayName(ev.day)}</span>
                      {ev.recurrence && (
                        <>
                          <span>·</span>
                          <span className="text-indigo-300/80 font-mono text-[11px]">{ev.recurrence}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Attendees, RSVP & Join CTA */}
                <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-obsidian-border-soft">
                  {/* Attendees Stack */}
                  <div className="flex items-center -space-x-1.5" title="Attendees">
                    {(ev.attendees || []).slice(0, 4).map((a, i) => (
                      <span
                        key={a.id || i}
                        className={cn(
                          'w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-obsidian-surface text-white',
                          a.avatarBg || 'bg-slate-700'
                        )}
                        title={`${a.name} (${a.rsvp})`}
                      >
                        {a.initials}
                      </span>
                    ))}
                  </div>

                  {/* Quick RSVP Toggles */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/[0.08]"
                  >
                    {[
                      { id: 'going', label: 'Yes' },
                      { id: 'maybe', label: 'Maybe' },
                      { id: 'declined', label: 'No' },
                    ].map((opt) => {
                      const isActive = ev.userRsvp === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => updateEventRsvp(ev.id, opt.id)}
                          className={cn(
                            'px-2 py-0.8 text-[11px] rounded font-medium transition-all cursor-pointer',
                            isActive
                              ? opt.id === 'going'
                                ? 'bg-indigo-600 text-white font-semibold'
                                : opt.id === 'maybe'
                                ? 'bg-amber-600 text-white font-semibold'
                                : 'bg-rose-600 text-white font-semibold'
                              : 'text-slate-400 hover:text-white hover:bg-white/5'
                          )}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Join Huddle or Inspect */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEventDrawer(ev);
                    }}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer',
                      ev.isHuddleActive
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 animate-pulse'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1]'
                    )}
                  >
                    {ev.isHuddleActive ? (
                      <>
                        <Video className="w-3.5 h-3.5" />
                        <span>Join</span>
                      </>
                    ) : (
                      <>
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
