import React from 'react';
import { cn } from '../../../lib/cn';
import { CALENDAR_DAYS } from '../../../data/calendarData';

export default function CalendarMonthView({ events = [], onSelectEvent, onSlotClick }) {
  // Generate a standard 35-cell November 2026 month matrix
  // Nov 1 starts on Sunday (col 6), so Oct 26-31 fill preceding cells
  const DAYS_IN_MONTH = 30;

  const cells = [];
  // Previous month trailing
  for (let i = 26; i <= 31; i++) {
    cells.push({ dayNumber: i, isCurrentMonth: false, monthIdx: -1 });
  }
  // Current month
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    cells.push({ dayNumber: i, isCurrentMonth: true, monthIdx: 0 });
  }
  // Next month leading to complete 35 cells
  let nextDay = 1;
  while (cells.length < 35) {
    cells.push({ dayNumber: nextDay++, isCurrentMonth: false, monthIdx: 1 });
  }

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
        {cells.map((cell, idx) => {
          const isToday = cell.isCurrentMonth && cell.dayNumber === 12; // Nov 12
          const dayOfWeekIdx = idx % 7;

          // Filter events matching this day
          const dayEvents = cell.isCurrentMonth
            ? events.filter((e) => e.day === dayOfWeekIdx)
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
