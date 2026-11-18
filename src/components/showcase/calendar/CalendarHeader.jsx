import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe,
  Plus,
} from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';

export default function CalendarHeader({
  currentDateText = 'November 2026 · Week 46',
  onPrev,
  onNext,
  onToday,
}) {
  const {
    calendarView,
    setCalendarView,
    calendarCategoryFilter,
    setCalendarCategoryFilter,
    openNewEventModal,
  } = useWorkspace();

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

  const VIEWS = [
    { id: 'month', label: 'Month', shortcut: 'M' },
    { id: 'week', label: 'Week', shortcut: 'W' },
    { id: 'day', label: 'Day', shortcut: 'D' },
    { id: 'agenda', label: 'Agenda', shortcut: 'A' },
  ];

  const CATEGORIES = [
    { id: 'engineering', label: 'Engineering Architecture', color: 'bg-indigo-500' },
    { id: 'client', label: 'Client & SLA Reviews', color: 'bg-emerald-500' },
    { id: 'standup', label: 'Team Standups', color: 'bg-amber-500' },
    { id: 'design', label: 'Design System Reviews', color: 'bg-fuchsia-500' },
  ];

  const toggleCategory = (catId) => {
    setCalendarCategoryFilter((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  return (
    <div className="px-4 py-3 bg-obsidian-surface/90 border-b border-obsidian-border flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 select-none backdrop-blur-md">
      {/* ── Left: Date Navigator & Timezone Clocks ── */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onToday}
          className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/[0.05] border border-white/[0.1] text-slate-200 hover:bg-white/[0.1] hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
          title="Jump to today (Shortcut: T)"
        >
          <CalendarIcon className="w-3.5 h-3.5 text-indigo-400" />
          <span>Today</span>
          <kbd className="hidden sm:inline font-mono text-[9px] text-slate-400 bg-white/[0.06] px-1 py-0.2 rounded border border-white/[0.08]">
            T
          </kbd>
        </button>

        <div className="flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] rounded-md p-0.5">
          <button
            type="button"
            onClick={onPrev}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Previous period (Shortcut: ←)"
            aria-label="Previous period"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
            title="Next period (Shortcut: →)"
            aria-label="Next period"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <span className="text-xs sm:text-sm font-semibold tracking-tight text-white flex items-center gap-2">
          {currentDateText}
        </span>

        {/* Global Multi-Timezone Pill HUD */}
        <div className="hidden xl:flex items-center gap-2.5 px-2.5 py-0.8 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10.5px] font-mono text-slate-400">
          <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
          <span className="flex items-center gap-1">
            <span className="text-slate-200 font-medium">15:00</span>
            <span className="text-slate-500">PST</span>
          </span>
          <span className="text-white/10" aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <span className="text-slate-300">00:00</span>
            <span className="text-slate-500">CET</span>
          </span>
          <span className="text-white/10" aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <span className="text-slate-300">04:30</span>
            <span className="text-slate-500">IST</span>
          </span>
        </div>
      </div>

      {/* ── Right: View Switcher, Filter & New Event CTA ── */}
      <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-2.5">
        {/* Category Filter Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterMenuOpen((prev) => !prev)}
            aria-expanded={filterMenuOpen}
            aria-label="Filter calendar events"
            className={cn(
              'px-2.5 py-1 text-xs font-medium rounded-md border transition-all flex items-center gap-1.5 cursor-pointer',
              filterMenuOpen
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40 shadow-xs'
                : 'bg-white/[0.04] text-slate-300 border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
            )}
          >
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {filterMenuOpen && (
            <div
              className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-obsidian-surface border border-obsidian-border p-2 shadow-2xl z-40 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150"
              role="menu"
            >
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-obsidian-muted border-b border-obsidian-border-soft mb-1">
                Event Categories
              </div>
              {CATEGORIES.map((cat) => {
                const isChecked = calendarCategoryFilter[cat.id] !== false;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-white/[0.06] transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', cat.color)} />
                      <span className="text-slate-300 text-[11.5px]">{cat.label}</span>
                    </div>
                    <span className={cn(
                      'w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] border',
                      isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/20 bg-transparent'
                    )}>
                      {isChecked && '✓'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* View Switcher Segmented Control */}
        <div
          role="radiogroup"
          aria-label="Calendar view selector"
          className="flex items-center p-0.5 rounded-lg bg-black/40 border border-white/[0.08]"
        >
          {VIEWS.map((v) => {
            const isSelected = calendarView === v.id;
            return (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setCalendarView(v.id)}
                className={cn(
                  'px-2.5 py-1 text-xs rounded-md font-medium transition-all duration-150 cursor-pointer flex items-center gap-1',
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                )}
              >
                <span>{v.label}</span>
                <span className="hidden md:inline text-[9px] opacity-60 font-mono">
                  {v.shortcut}
                </span>
              </button>
            );
          })}
        </div>

        {/* Primary CTA: Schedule Meeting */}
        <button
          type="button"
          onClick={openNewEventModal}
          className="px-3 py-1 text-xs font-semibold rounded-md bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/40 shadow-[0_2px_12px_rgba(99,102,241,0.35)] transition-all flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-[0.98]"
          title="Schedule new event (Shortcut: N)"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Schedule</span>
          <kbd className="hidden sm:inline font-mono text-[9px] bg-white/20 px-1 py-0.2 rounded text-white/90">
            N
          </kbd>
        </button>
      </div>
    </div>
  );
}
