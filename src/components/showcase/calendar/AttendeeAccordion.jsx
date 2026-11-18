import React, { useState } from 'react';
import { ChevronDown, ChevronRight, UserPlus, Clock } from 'lucide-react';
import { cn } from '../../../lib/cn';
import { CALENDAR_PERSONAS } from '../../../data/calendarData';

export default function AttendeeAccordion({ attendees = [], eventId, onAddAttendee }) {
  const [openSection, setOpenSection] = useState('going');
  const [inviteInput, setInviteInput] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const goingList = attendees.filter((a) => a.rsvp === 'going');
  const maybeList = attendees.filter((a) => a.rsvp === 'maybe');
  const declinedList = attendees.filter((a) => a.rsvp === 'declined');
  const pendingList = attendees.filter((a) => !a.rsvp || a.rsvp === 'pending');

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteInput.trim()) return;

    // Check if matches known persona name or email
    const match = Object.values(CALENDAR_PERSONAS).find(
      (p) =>
        p.email.toLowerCase() === inviteInput.trim().toLowerCase() ||
        p.name.toLowerCase().includes(inviteInput.trim().toLowerCase())
    );

    const newAttendee = match || {
      id: 'usr_guest_' + Date.now(),
      name: inviteInput.trim(),
      initials: inviteInput.trim().slice(0, 2).toUpperCase(),
      email: inviteInput.trim().includes('@') ? inviteInput.trim() : `${inviteInput.trim().toLowerCase()}@acmecorp.com`,
      role: 'Invited Guest',
      avatarBg: 'bg-indigo-700',
      timezone: 'PST (UTC-8)',
      status: 'offline',
    };

    onAddAttendee(eventId, newAttendee);
    setInviteInput('');
    setIsInviting(false);
  };

  const SECTIONS = [
    { id: 'going', label: 'Going', count: goingList.length, items: goingList, dotColor: 'bg-emerald-400' },
    { id: 'maybe', label: 'Maybe', count: maybeList.length, items: maybeList, dotColor: 'bg-amber-400' },
    { id: 'pending', label: 'Awaiting Response', count: pendingList.length, items: pendingList, dotColor: 'bg-slate-400' },
    { id: 'declined', label: 'Declined', count: declinedList.length, items: declinedList, dotColor: 'bg-rose-400' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted">
          Attendees ({attendees.length})
        </span>
        <button
          type="button"
          onClick={() => setIsInviting((prev) => !prev)}
          className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors cursor-pointer"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Add Guest</span>
        </button>
      </div>

      {/* Inline Quick Guest Invite Form */}
      {isInviting && (
        <form onSubmit={handleInviteSubmit} className="p-2 rounded-lg bg-black/40 border border-indigo-500/30 flex items-center gap-2">
          <input
            type="text"
            autoFocus
            value={inviteInput}
            onChange={(e) => setInviteInput(e.target.value)}
            placeholder="Search teammate or email..."
            className="flex-1 px-2.5 py-1 text-xs rounded bg-white/[0.04] border border-white/[0.08] text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="px-2.5 py-1 text-xs font-semibold rounded bg-indigo-600 hover:bg-indigo-500 text-white shrink-0 cursor-pointer"
          >
            Invite
          </button>
        </form>
      )}

      {/* Categorized Status Groups */}
      <div className="space-y-1 rounded-xl bg-black/30 border border-white/[0.06] p-1 overflow-hidden">
        {SECTIONS.map((sec) => {
          if (sec.count === 0 && sec.id === 'declined') return null;
          const isOpen = openSection === sec.id;

          return (
            <div key={sec.id} className="rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : sec.id)}
                className="w-full px-2.5 py-1.5 flex items-center justify-between text-xs font-medium text-slate-300 hover:bg-white/[0.04] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', sec.dotColor)} />
                  <span>{sec.label}</span>
                  <span className="text-[10px] font-mono text-slate-500">({sec.count})</span>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {isOpen && (
                <div className="px-2 pb-2 pt-0.5 space-y-1.5">
                  {sec.items.map((person) => (
                    <div
                      key={person.id}
                      className="flex items-center justify-between p-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={cn(
                            'w-6 h-6 rounded-full text-[9px] font-bold flex items-center justify-center text-white shrink-0',
                            person.avatarBg || 'bg-slate-700'
                          )}
                        >
                          {person.initials}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-medium text-white truncate text-[11.5px]">
                              {person.name}
                            </span>
                            {person.isOrganizer && (
                              <span className="px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[8.5px] font-mono">
                                Host
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 block truncate">
                            {person.role || person.email}
                          </span>
                        </div>
                      </div>

                      {/* Timezone pill */}
                      {person.timezone && (
                        <div className="hidden sm:flex items-center gap-1 text-[9.5px] font-mono text-slate-400 shrink-0">
                          <Clock className="w-2.5 h-2.5 text-slate-500" />
                          <span>{person.timezone.split(' ')[0]}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
