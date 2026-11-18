import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Video,
  X,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../../lib/cn';
import { useWorkspace } from '../../../context/useWorkspace';
import { CALENDAR_PERSONAS, CALENDAR_DAYS } from '../../../data/calendarData';

export default function NewEventModal() {
  const {
    isNewEventModalOpen,
    closeNewEventModal,
    createCalendarEvent,
  } = useWorkspace();

  const [title, setTitle] = useState('');
  const [day, setDay] = useState(3); // default Thursday
  const [startHour, setStartHour] = useState(15.0); // 3:00 PM
  const [duration, setDuration] = useState(1.0);
  const [isHuddle, setIsHuddle] = useState(true);
  const [isInstant, setIsInstant] = useState(false);
  const [recurrence, setRecurrence] = useState('Weekly on Thursday');
  const [category, setCategory] = useState('engineering');
  const [description, setDescription] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState([
    CALENDAR_PERSONAS.sara,
    CALENDAR_PERSONAS.alex,
  ]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNewEventModalOpen) {
        closeNewEventModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isNewEventModalOpen, closeNewEventModal]);

  if (!isNewEventModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    createCalendarEvent({
      title: title.trim(),
      day: Number(day),
      startHour: Number(startHour),
      duration: Number(duration),
      isHuddle,
      isHuddleActive: isInstant,
      recurrence,
      category,
      description: description.trim() || 'Review agenda and collaborative priorities.',
      attendees: selectedAttendees.map((att, i) => ({
        ...att,
        rsvp: i === 0 ? 'going' : 'pending',
        isOrganizer: i === 0,
      })),
    });

    closeNewEventModal();
  };

  const toggleAttendee = (persona) => {
    if (selectedAttendees.some((a) => a.id === persona.id)) {
      if (persona.id === CALENDAR_PERSONAS.sara.id) return; // don't remove self
      setSelectedAttendees((prev) => prev.filter((a) => a.id !== persona.id));
    } else {
      setSelectedAttendees((prev) => [...prev, persona]);
    }
  };

  // Simulated collision detection
  const hasConflict = day === 1 && startHour === 11.0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-event-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl bg-obsidian-surface border border-obsidian-border shadow-2xl overflow-hidden flex flex-col text-slate-200 animate-in zoom-in-95 duration-200"
      >
        {/* ── Modal Header ── */}
        <div className="px-5 py-3.5 border-b border-obsidian-border flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <Calendar className="w-4 h-4" />
            </div>
            <h2 id="new-event-title" className="text-sm font-semibold text-white">
              Schedule New Event
            </h2>
          </div>
          <button
            type="button"
            onClick={closeNewEventModal}
            aria-label="Close dialog"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ── Form Body ── */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[75vh]">
          {/* Title Input */}
          <div>
            <label htmlFor="evt-title" className="block text-xs font-medium text-slate-300 mb-1.5">
              Event Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="evt-title"
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Q4 EU Cluster Architecture Sync"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Day & Start Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-day" className="block text-xs font-medium text-slate-300 mb-1.5">
                Day of Week
              </label>
              <select
                id="evt-day"
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {CALENDAR_DAYS.map((d, idx) => (
                  <option key={d} value={idx} className="bg-obsidian-surface text-white">
                    {d} (Nov {9 + idx})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="evt-start" className="block text-xs font-medium text-slate-300 mb-1.5">
                Start Time
              </label>
              <select
                id="evt-start"
                value={startHour}
                onChange={(e) => setStartHour(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {[9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 14.5, 15, 15.5, 16, 17].map((h) => {
                  const hour = Math.floor(h);
                  const min = h % 1 === 0 ? '00' : '30';
                  const label = `${hour > 12 ? hour - 12 : hour}:${min} ${hour >= 12 ? 'PM' : 'AM'}`;
                  return (
                    <option key={h} value={h} className="bg-obsidian-surface text-white">
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Duration Presets */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Duration</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: '15 min', val: 0.25 },
                { label: '30 min', val: 0.5 },
                { label: '45 min', val: 0.75 },
                { label: '60 min', val: 1.0 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setDuration(p.val)}
                  className={cn(
                    'py-1 text-xs rounded-md font-medium border transition-all cursor-pointer text-center',
                    duration === p.val
                      ? 'bg-indigo-600 text-white border-indigo-500 font-semibold shadow-xs'
                      : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:bg-white/[0.08]'
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Recurrence */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="evt-cat" className="block text-xs font-medium text-slate-300 mb-1.5">
                Category
              </label>
              <select
                id="evt-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="engineering" className="bg-obsidian-surface text-white">Engineering</option>
                <option value="client" className="bg-obsidian-surface text-white">Client & SLA</option>
                <option value="standup" className="bg-obsidian-surface text-white">Standup</option>
                <option value="design" className="bg-obsidian-surface text-white">Design System</option>
              </select>
            </div>

            <div>
              <label htmlFor="evt-rec" className="block text-xs font-medium text-slate-300 mb-1.5">
                Recurrence
              </label>
              <select
                id="evt-rec"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="None" className="bg-obsidian-surface text-white">Does not repeat</option>
                <option value="Daily" className="bg-obsidian-surface text-white">Daily</option>
                <option value="Weekly on Thursday" className="bg-obsidian-surface text-white">Weekly on Thursday</option>
                <option value="Bi-weekly" className="bg-obsidian-surface text-white">Bi-weekly</option>
                <option value="Monthly" className="bg-obsidian-surface text-white">Monthly</option>
              </select>
            </div>
          </div>

          {/* Meeting Type & WebRTC Bridge Toggle */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-white">
                  Native WebRTC Huddle Chamber
                </span>
              </div>
              <input
                type="checkbox"
                id="is-huddle"
                checked={isHuddle}
                onChange={(e) => setIsHuddle(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-slate-400">
              Auto-provisions encrypted audio room with real-time speech transcription & AI notes.
            </p>

            {isHuddle && (
              <label className="flex items-center gap-2 pt-2 border-t border-white/[0.06] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isInstant}
                  onChange={(e) => setIsInstant(e.target.checked)}
                  className="w-3.5 h-3.5 rounded text-emerald-500"
                />
                <span className="text-[11.5px] text-emerald-300 font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Start Huddle immediately (Alert attendees now)
                </span>
              </label>
            )}
          </div>

          {/* Attendees Selection & Collision Feedback */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Invite Teammates</label>
              {hasConflict ? (
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  1 conflict detected
                </span>
              ) : (
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  All invitees available
                </span>
              )}
            </div>

            {/* Selected Avatars */}
            <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-black/40 border border-white/[0.08] min-h-[38px]">
              {selectedAttendees.map((att) => (
                <span
                  key={att.id}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.08] text-xs text-white"
                >
                  <span className={cn('w-3.5 h-3.5 rounded-full text-[8px] flex items-center justify-center font-bold', att.avatarBg)}>
                    {att.initials}
                  </span>
                  <span className="text-[11px]">{att.name}</span>
                  {att.id !== CALENDAR_PERSONAS.sara.id && (
                    <button
                      type="button"
                      onClick={() => toggleAttendee(att)}
                      className="hover:text-rose-400 text-slate-400 cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>

            {/* Quick Picker Roster */}
            <div className="mt-2 flex flex-wrap gap-1">
              {Object.values(CALENDAR_PERSONAS).map((p) => {
                const isSelected = selectedAttendees.some((a) => a.id === p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleAttendee(p)}
                    className={cn(
                      'px-2 py-0.5 text-[10.5px] rounded-md transition-all cursor-pointer flex items-center gap-1',
                      isSelected
                        ? 'bg-indigo-600/30 border border-indigo-500/40 text-indigo-200'
                        : 'bg-white/[0.03] text-slate-400 hover:text-slate-200'
                    )}
                  >
                    <span>+</span>
                    <span>{p.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description / Agenda */}
          <div>
            <label htmlFor="evt-desc" className="block text-xs font-medium text-slate-300 mb-1.5">
              Agenda & Context
            </label>
            <textarea
              id="evt-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline topics, questions, or linked RFC documents..."
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/[0.12] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-obsidian-border flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={closeNewEventModal}
              className="px-3.5 py-1.5 text-xs rounded-lg font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn(
                'px-4 py-1.5 text-xs font-semibold rounded-lg text-white transition-all shadow-md cursor-pointer active:scale-[0.98]',
                isInstant
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25'
              )}
            >
              {isInstant ? 'Start Huddle Now' : 'Schedule Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
