import React, { useMemo } from 'react';
import { cn } from '../../../lib/cn';
import { CALENDAR_DAYS } from '../../../data/calendarData';

// Static 35-cell November 2026 month matrix (computed once at module load)
const MONTH_CELLS = (() => {
  const DAYS_IN_MONTH = 30;
  const list = [];
  for (let i = 26; i <= 31; i++) {
    list.push({ dayNumber: i, isCurrentMonth: false, monthIdx: -1 });
  }
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    list.push({ dayNumber: i, isCurrentMonth: true, monthIdx: 0 });
  }
  let nextDay = 1;
  while (list.length < 35) {
    list.push({ dayNumber: nextDay++, isCurrentMonth: false, monthIdx: 1 });
  }
  return Object.freeze(list);
})();

export default function CalendarMonthView({ events = [], onSelectEvent, onSlotClick }) {
  // Pre-index events by day of week for O(1) month cell lookup
  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const e of events) {
      if (!map.has(e.day)) map.set(e.day, []);
      map.get(e.day).push(e);
    }
    return map;
  }, [events]);

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 bg-obsidian-canvas text-slate-200 overflow-hidden">
      {/* ── Day of Week Headers ── */}
      <div className="grid grid-cols-7 border-b border-obsidian-border bg-obsidian-surface/60">
        {CALENDAR_DAYS.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-[10.5px] font-mono uppercase tracking-wider text-slate-400 border-r border-obsidian-border/50"
          >
            {day}
          </div>
        ))}
      </div>

      {/* ── 5x7 Month Grid ── */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
        {MONTH_CELLS.map((cell, idx) => {
          const isToday = cell.isCurrentMonth && cell.dayNumber === 12; // Nov 12
          const dayOfWeekIdx = idx % 7;

          // O(1) day events lookup
          const dayEvents = cell.isCurrentMonth
            ? eventsByDay.get(dayOfWeekIdx) || []
            : [];

          return (
            <div
              key={idx}
              onClick={() => {
                if (cell.isCurrentMonth && onSlotClick) {
                  onSlotClick(dayOfWeekIdx, 10);
                }
              }}
              className={cn(
                'min-h-[96px] border-r border-b border-obsidian-border/50 p-1.5 flex flex-col transition-colors cursor-pointer group hover:bg-white/[0.02]',
                cell.isCurrentMonth ? 'bg-transparent' : 'bg-black/40 text-slate-600',
                isToday ? 'bg-indigo-950/20' : ''
              )}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-1">
                <span
                  className={cn(
                    'w-5 h-5 flex items-center justify-center rounded-full text-xs font-semibold',
                    isToday
                      ? 'bg-indigo-600 text-white font-bold shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                      : cell.isCurrentMonth
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  )}
                >
                  {cell.dayNumber}
                </span>

                {dayEvents.length > 0 && (
                  <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400">
                    {dayEvents.length} event{dayEvents.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Event Chips */}
              <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                {dayEvents.slice(0, 2).map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(ev);
                    }}
                    className={cn(
                      'w-full text-left px-1.5 py-0.5 rounded text-[10.5px] truncate font-medium border transition-transform hover:scale-[1.01] cursor-pointer',
                      ev.category === 'engineering'
                        ? 'bg-indigo-950/60 border-indigo-500/30 text-indigo-200'
                        : ev.category === 'client'
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200'
                        : ev.category === 'standup'
                        ? 'bg-amber-950/60 border-amber-500/30 text-amber-200'
                        : 'bg-fuchsia-950/60 border-fuchsia-500/30 text-fuchsia-200'
                    )}
                  >
                    <span className="truncate">{ev.title}</span>
                  </button>
                ))}

                {dayEvents.length > 2 && (
                  <span className="text-[9.5px] font-mono text-indigo-400/80 px-1 hover:text-indigo-300">
                    +{dayEvents.length - 2} more...
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
