import React, { useMemo } from 'react';
import { CALENDAR_HOURS } from '../../../data/calendarData';
import EventCardBlock from './EventCardBlock';
import { Clock } from 'lucide-react';

export default function CalendarDayView({
  events = [],
  onSelectEvent,
  onSlotClick,
  selectedDay = 3, // Thursday (today)
}) {
  const dayEvents = useMemo(() => events.filter((e) => e.day === selectedDay), [events, selectedDay]);

  const eventsByHour = useMemo(() => {
    const map = new Map();
    for (const e of dayEvents) {
      const h = Math.floor(e.startHour);
      if (!map.has(h)) map.set(h, []);
      map.get(h).push(e);
    }
    return map;
  }, [dayEvents]);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-obsidian-canvas text-slate-200 overflow-hidden">
      {/* ── Day Header ── */}
      <div className="p-3 border-b border-obsidian-border bg-obsidian-surface/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 flex flex-col items-center justify-center font-bold">
            <span className="text-[9px] uppercase font-mono tracking-wider">Thu</span>
            <span className="text-base leading-none">12</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Thursday, November 12, 2026</h3>
            <p className="text-xs text-slate-400">
              {dayEvents.length} scheduled session{dayEvents.length !== 1 ? 's' : ''} today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <Clock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active work window: 09:00 – 18:00 PST</span>
        </div>
      </div>

      {/* ── Single Day Hourly Track ── */}
      <div className="flex-1 overflow-y-auto relative scrollbar-thin">
        {/* Simulated Current Time Indicator (Red line at 15:15) */}
        <div
          className="absolute left-[70px] right-0 z-20 pointer-events-none flex items-center"
          style={{ top: `${(15.25 - 8) * 80}px` }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 -ml-1.5 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
          <div className="h-[2px] w-full bg-rose-500/70" />
        </div>

        <div className="grid grid-cols-[70px_1fr] min-w-[500px]">
          {CALENDAR_HOURS.map((hour) => {
            const formatH = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
            const slotEvents = eventsByHour.get(hour) || [];

            return (
              <React.Fragment key={hour}>
                {/* Time Gutter */}
                <div className="h-20 border-r border-b border-obsidian-border/70 pr-3 pt-2 text-right text-xs font-mono text-slate-500 select-none">
                  {formatH}
                </div>

                {/* Day Slot */}
                <div
                  onClick={(e) => {
                    if (e.target === e.currentTarget && onSlotClick) {
                      onSlotClick(selectedDay, hour);
                    }
                  }}
                  className="h-20 border-b border-obsidian-border/50 p-2 relative hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <span className="opacity-0 group-hover:opacity-40 text-xs font-mono text-slate-500 absolute top-2 right-3 pointer-events-none transition-opacity">
                    Click to schedule
                  </span>

                  <div className="flex flex-col gap-1.5 relative z-10 max-w-xl">
                    {slotEvents.map((ev) => (
                      <EventCardBlock
                        key={ev.id}
                        event={ev}
                        onClick={() => onSelectEvent(ev)}
                      />
                    ))}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
