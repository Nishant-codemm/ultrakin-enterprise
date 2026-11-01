/**
 * EventsProductDemo.jsx
 * Calendar & Event synchronization preview for /products/events
 * Features:
 * - 5-day week calendar overview with scheduled team sessions
 * - Featured Event inspector: "Quarterly Client Review"
 * - Interactive RSVP selector: Going / Maybe / No with real-time attendee badge count updating
 * - Automated recording & transcript distribution indicator
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Video, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import { EVENTS_DATA, PERSONAS } from '../../data/productPageData';

export default function EventsProductDemo() {
  const [selectedRsvp, setSelectedRsvp] = useState('Going');
  const [attendeeCount, setAttendeeCount] = useState(4);

  const handleRsvp = (status) => {
    setSelectedRsvp(status);
    if (status === 'Going') setAttendeeCount(4);
    else if (status === 'Maybe') setAttendeeCount(3);
    else setAttendeeCount(3);
  };

  return (
    <div className="flex h-full w-full bg-[#fbfaf8] text-[#111827] select-none overflow-hidden">
      {/* ── Left Calendar Grid ── */}
      <div className="flex-1 flex flex-col border-r border-[#e7e4de] p-3 overflow-hidden">
        {/* Calendar Nav Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-[#d97706]" />
            <span className="text-xs font-bold text-[#111827]">November 2026</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#667085] font-mono">
            <span>Week 46</span>
          </div>
        </div>

        {/* 5 Day Headers */}
        <div className="grid grid-cols-5 gap-1.5 text-center pb-1.5 border-b border-[#e7e4de]">
          {EVENTS_DATA.days.map((day, idx) => (
            <div key={day} className="text-[11px]">
              <span className="text-[#667085] font-mono block text-[10px]">{day}</span>
              <span className={`inline-block font-semibold mt-0.5 ${idx === 3 ? 'text-[#3156cf]' : 'text-[#111827]'}`}>
                {10 + idx}
              </span>
            </div>
          ))}
        </div>

        {/* Day Slots */}
        <div className="flex-1 grid grid-cols-5 gap-1.5 pt-2 relative overflow-y-auto">
          {EVENTS_DATA.days.map((day, dayIdx) => {
            const dayEvents = EVENTS_DATA.events.filter((e) => e.day === dayIdx);
            return (
              <div key={day} className="flex flex-col gap-1.5 bg-slate-100/50 rounded-lg p-1 min-h-[160px]">
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`p-1.5 rounded-md border text-[10.5px] leading-tight font-medium ${
                      ev.featured
                        ? 'bg-[#3156cf] text-white border-[#284ab3] shadow-sm'
                        : 'bg-white border-[#e7e4de] text-[#344054]'
                    }`}
                  >
                    <span className="block truncate font-semibold">{ev.title}</span>
                    <span className={`text-[9px] block font-mono mt-0.5 ${ev.featured ? 'text-blue-100' : 'text-[#667085]'}`}>
                      {ev.startHour}:00 PM
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Event Details Panel ── */}
      <div className="w-[200px] sm:w-[220px] shrink-0 bg-[#fffefd] flex flex-col justify-between p-4">
        <div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#d97706] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-block mb-2">
            Selected Event
          </span>

          <h3 className="text-sm font-bold text-[#111827] leading-snug">
            {EVENTS_DATA.featured.title}
          </h3>

          <div className="mt-3 space-y-1.5 text-xs text-[#667085]">
            <div className="flex items-center gap-2">
              <Clock size={12} className="text-[#d97706]" />
              <span className="text-[11px]">{EVENTS_DATA.featured.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-[#3156cf]" />
              <span className="text-[11px]">Northwind Studio · Huddle #1</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={12} className="text-emerald-600" />
              <span className="text-[11px] font-semibold text-[#111827]">
                {attendeeCount} people going
              </span>
            </div>
          </div>

          {/* Attendee Avatars */}
          <div className="mt-3 flex -space-x-1.5">
            {EVENTS_DATA.featured.attendees.map((a, i) => (
              <AvatarChip key={i} person={a} size="xs" showRing />
            ))}
          </div>

          {/* RSVP Selector */}
          <div className="mt-4 pt-3 border-t border-[#e7e4de]">
            <span className="text-[10px] font-mono uppercase text-[#667085] block mb-1.5">Your RSVP:</span>
            <div className="grid grid-cols-3 gap-1">
              {['Going', 'Maybe', 'No'].map((status) => {
                const active = selectedRsvp === status;
                return (
                  <button
                    key={status}
                    onClick={() => handleRsvp(status)}
                    className={`py-1 text-[11px] rounded font-medium transition-all ${
                      active
                        ? 'bg-[#111827] text-white shadow-sm'
                        : 'bg-[#f6f5f2] text-[#344054] hover:bg-[#eeece7]'
                    }`}
                  >
                    {status}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Auto distribution footer */}
        <div className="pt-2 border-t border-[#e7e4de] text-[10px] text-emerald-700 bg-emerald-50/60 p-2 rounded-lg border border-emerald-200">
          <span className="font-semibold block">⚡ Auto-distribute</span>
          Recording & notes sync to all attendees after call.
        </div>
      </div>
    </div>
  );
}
