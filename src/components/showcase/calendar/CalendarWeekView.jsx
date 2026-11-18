import React, { useState } from 'react';
import { cn } from '../../../lib/cn';
import { CALENDAR_DAYS, CALENDAR_HOURS } from '../../../data/calendarData';
import EventCardBlock from './EventCardBlock';

export default function CalendarWeekView({
  events = [],
  onSelectEvent,
  onSlotClick,
  onRescheduleEvent,
}) {
  const [draggedEventId, setDraggedEventId] = useState(null);
  const [dragOverCell, setDragOverCell] = useState(null); // { day, hour }

  const handleDragOver = (e, dayIdx, hour) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCell({ day: dayIdx, hour });
  };

  const handleDragLeave = () => {
    setDragOverCell(null);
  };

  const handleDrop = (e, dayIdx, hour) => {
    e.preventDefault();
    const eventId = e.dataTransfer.getData('text/plain') || draggedEventId;
    if (eventId && onRescheduleEvent) {
      onRescheduleEvent(eventId, dayIdx, hour);
    }
    setDraggedEventId(null);
    setDragOverCell(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden bg-obsidian-canvas text-slate-200">
      {/* ── Day Columns Header ── */}
      <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-obsidian-border bg-obsidian-surface/60 sticky top-0 z-10 backdrop-blur-md">
        {/* Timezone corner spacer */}
        <div className="p-2 border-r border-obsidian-border text-[10px] font-mono text-slate-500 text-center flex items-center justify-center">
          PST
        </div>
        {CALENDAR_DAYS.map((day, idx) => {
          const isToday = idx === 3; // Thu 12 Nov is simulated as active today
          return (
            <div
              key={day}
              className={cn(
                'py-2 px-1 text-center border-r border-obsidian-border/60 transition-colors',
                isToday ? 'bg-indigo-950/20' : ''
              )}
            >
              <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                {day}
              </span>
              <span
                className={cn(
                  'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold mt-0.5',
                  isToday
                    ? 'bg-indigo-600 text-white shadow-[0_0_10px_rgba(99,102,241,0.6)] font-bold'
                    : 'text-slate-200'
                )}
              >
                {9 + idx}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Scrollable Hourly Grid Area ── */}
      <div className="flex-1 overflow-y-auto relative scrollbar-thin">
        {/* Hourly Rows */}
        <div className="grid grid-cols-[60px_repeat(7,1fr)] min-w-[700px] relative">
          {CALENDAR_HOURS.map((hour) => {
            const formatH = hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`;
            return (
              <React.Fragment key={hour}>
                {/* Time Gutter Label */}
                <div className="h-20 border-r border-b border-obsidian-border/70 pr-2 pt-1 text-right text-[10.5px] font-mono text-slate-500 select-none">
                  {formatH}
                </div>

                {/* 7 Day Slot Cells */}
                {CALENDAR_DAYS.map((_, dayIdx) => {
                  const isDragTarget =
                    dragOverCell && dragOverCell.day === dayIdx && dragOverCell.hour === hour;
                  const isTodayCol = dayIdx === 3;

                  // Find events matching this slot
                  const slotEvents = events.filter(
                    (e) => e.day === dayIdx && Math.floor(e.startHour) === hour
                  );

                  return (
                    <div
                      key={dayIdx}
                      onDragOver={(e) => handleDragOver(e, dayIdx, hour)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, dayIdx, hour)}
                      onClick={(e) => {
                        // Prevent slot click if event itself was clicked
                        if (e.target === e.currentTarget && onSlotClick) {
                          onSlotClick(dayIdx, hour);
                        }
                      }}
                      className={cn(
                        'h-20 border-r border-b border-obsidian-border/50 relative p-1 transition-colors duration-150 group/slot cursor-pointer',
                        isTodayCol ? 'bg-indigo-950/10' : '',
                        isDragTarget ? 'bg-indigo-600/20 border-indigo-500/60 ring-1 ring-indigo-400' : 'hover:bg-white/[0.02]'
                      )}
                    >
                      {/* Sub-hour hover guide */}
                      <span className="opacity-0 group-hover/slot:opacity-40 text-[9px] font-mono text-slate-500 absolute top-1 right-1 pointer-events-none transition-opacity">
                        +
                      </span>

                      {/* Event Cards inside this slot */}
                      <div className="flex flex-col gap-1 w-full h-full relative z-10">
                        {slotEvents.map((ev) => (
                          <EventCardBlock
                            key={ev.id}
                            event={ev}
                            onClick={() => onSelectEvent(ev)}
                            onDragStart={() => setDraggedEventId(ev.id)}
                            onDragEnd={() => setDraggedEventId(null)}
                            isDragging={draggedEventId === ev.id}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
