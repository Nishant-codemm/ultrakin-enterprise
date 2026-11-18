import React, { useEffect } from 'react';
import {
  Calendar,
  Clock,
  FileText,
  Link2,
  Repeat,
  X,
  Share2,
} from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';
import HuddleBridgeBanner from './HuddleBridgeBanner';
import RSVPButtonGroup from './RSVPButtonGroup';
import AttendeeAccordion from './AttendeeAccordion';
import EventAISummaryCard from './EventAISummaryCard';
import EventDiscussionThread from './EventDiscussionThread';

export default function EventInspectorDrawer() {
  const {
    isEventDrawerOpen,
    closeEventDrawer,
    activeCalendarEvent: event,
    updateEventRsvp,
    addEventAttendee,
    addToast,
    setActiveModule,
  } = useWorkspace();

  // Handle Escape key to dismiss drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isEventDrawerOpen) {
        closeEventDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEventDrawerOpen, closeEventDrawer]);

  if (!isEventDrawerOpen || !event) return null;

  const formatTime = (hour, duration) => {
    const startH = Math.floor(hour);
    const startM = Math.round((hour - startH) * 60);
    const endH = Math.floor(hour + duration);
    const endM = Math.round((hour + duration - endH) * 60);
    const pad = (n) => (n < 10 ? '0' + n : n);
    const f = (h, m) => `${h > 12 ? h - 12 : h === 0 ? 12 : h}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
    return `${f(startH, startM)} – ${f(endH, endM)}`;
  };

  const getDayLabel = (dayIdx) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return `${days[dayIdx] || 'Day'}, Nov ${9 + dayIdx}, 2026`;
  };

  const handleShareLink = () => {
    addToast(
      'Event link copied',
      `Direct link to "${event.title}" copied to clipboard.`,
      'info'
    );
  };

  return (
    <aside
      role="region"
      aria-label="Event Details Inspector"
      className="w-full lg:w-[380px] shrink-0 border-l border-obsidian-border bg-obsidian-surface flex flex-col h-full overflow-hidden select-none animate-in slide-in-from-right-4 duration-200 z-30"
    >
      {/* ── Drawer Header ── */}
      <div className="p-4 border-b border-obsidian-border flex items-start justify-between gap-3 bg-white/[0.02]">
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider',
                event.category === 'engineering'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : event.category === 'client'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : event.category === 'standup'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30'
              )}
            >
              {event.category}
            </span>

            {event.recurrence && (
              <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                <Repeat className="w-2.5 h-2.5 text-slate-500" />
                <span>{event.recurrence}</span>
              </span>
            )}
          </div>

          <h3 className="text-sm sm:text-base font-bold text-white leading-snug tracking-tight">
            {event.title}
          </h3>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleShareLink}
            title="Copy share link"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={closeEventDrawer}
            aria-label="Close inspector drawer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Drawer Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
        {/* Date, Time & Recurrence Info */}
        <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.06] space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="font-medium text-white">{getDayLabel(event.day)}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-mono text-[11.5px] text-slate-200">
              {formatTime(event.startHour, event.duration)} ({event.duration * 60}m)
            </span>
          </div>
        </div>

        {/* WebRTC Huddle Room Launch Card */}
        <HuddleBridgeBanner event={event} />

        {/* Interactive RSVP Selector */}
        <RSVPButtonGroup
          currentRsvp={event.userRsvp}
          onUpdateRsvp={updateEventRsvp}
          eventId={event.id}
        />

        {/* Categorized Attendees Accordion with Add Guest */}
        <AttendeeAccordion
          attendees={event.attendees || []}
          eventId={event.id}
          onAddAttendee={addEventAttendee}
        />

        {/* Description / Markdown Agenda */}
        {event.description && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted block">
              Agenda & Context
            </span>
            <p className="text-xs text-slate-300 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/[0.04]">
              {event.description}
            </p>
          </div>
        )}

        {/* Linked Cross-Module Assets */}
        {(event.linkedDoc || event.linkedTask) && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted block">
              Connected Workspace Assets
            </span>
            <div className="space-y-1.5">
              {event.linkedDoc && (
                <button
                  type="button"
                  onClick={() => setActiveModule('docs')}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-300 text-xs hover:bg-emerald-950/40 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{event.linkedDoc.title}</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-emerald-400/80 shrink-0">Open Doc →</span>
                </button>
              )}
              {event.linkedTask && (
                <button
                  type="button"
                  onClick={() => setActiveModule('tasks')}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-amber-950/20 border border-amber-500/20 text-amber-300 text-xs hover:bg-amber-950/40 transition-colors cursor-pointer text-left"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Link2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{event.linkedTask.title}</span>
                  </div>
                  <span className="text-[9.5px] font-mono text-amber-400/80 shrink-0">Sprint Board →</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Post-Call Ukin AI Intelligence & Action Items */}
        <EventAISummaryCard event={event} />

        {/* Embedded Matrix Discussion Timeline */}
        <EventDiscussionThread event={event} />
      </div>
    </aside>
  );
}
