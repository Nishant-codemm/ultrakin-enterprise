/**
 * EducationSolutionDemo.jsx
 * Interactive demo for /solutions/education ("Schools and tutoring")
 * Recreates the verified Ultrakin workflow:
 * Class Event RSVP card in #ap-physics channel -> Live Video Lecture -> AI Recording & Class Notes.
 */
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Play,
  Pause,
  Download,
  Check,
  Users,
  Sparkles,
  Share2,
  Volume2,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';

export default function EducationSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [activeChannel, setActiveChannel] = useState('ap-physics');
  const [rsvpState, setRsvpState] = useState('going'); // 'going', 'maybe', 'none'
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress] = useState(38);
  const [copiedLink, setCopiedLink] = useState(false);

  const channels = [
    { id: 'general', name: 'general', unread: false },
    { id: 'ap-physics', name: 'ap-physics', unread: true, active: true },
    { id: 'calculus-prep', name: 'calculus-prep', unread: false },
    { id: 'announcements', name: 'announcements', unread: false },
  ];

  const channelContent = {
    general: {
      title: 'Study Hall: Weekly Problem Clinic',
      schedule: 'Wednesday 4:00 PM – 4:45 PM · Prof. David Chen · Open Huddle',
      recap: 'Study Hall Notes & Recording',
      takeaways: ['Bring questions from this week’s problem set.', 'Review the worked examples in the class notes.', 'Next study hall: Wednesday at 4:00 PM.'],
      studentNote: 'I added the questions I want to review to the class thread.',
    },
    'ap-physics': {
      title: 'AP Physics: Mechanics & Orbital Motion',
      schedule: 'Tuesday 3:00 PM – 3:45 PM · Prof. David Chen · Room 402 + Video Huddle',
      recap: 'Class Recording & AI Recap',
      takeaways: [
        'Kepler’s Third Law Derivation: $T^2 ∝ r^3$ demonstrated via centripetal balance equation.',
        'Orbital Velocity Shortcut: $v = √(GM/r)$ applies to circular geostationary orbits.',
        'Homework Due Friday: Problem set 4, questions 3–9.',
      ],
      studentNote: 'Thank you Prof. Chen! The diagram in the recap notes makes question 4 easier to follow.',
    },
    'calculus-prep': {
      title: 'Calculus Prep: Integration Review',
      schedule: 'Thursday 2:00 PM – 2:45 PM · Prof. David Chen · Video Huddle',
      recap: 'Integration Review Notes & Recording',
      takeaways: ['Compare substitution and integration by parts.', 'Work through the area-under-the-curve examples.', 'Practice set 6 is due Friday.'],
      studentNote: 'I’ll revisit the worked integration example before the practice set is due.',
    },
    announcements: {
      title: 'Week 6: Class & Office Hour Schedule',
      schedule: 'Posted Monday · Prof. David Chen · STEM Prep Academy',
      recap: 'Week 6 Schedule Notes',
      takeaways: ['AP Physics meets Tuesday at 3:00 PM.', 'Calculus Prep meets Thursday at 2:00 PM.', 'Use #general to share questions before study hall.'],
      studentNote: 'Thanks — I’ve added the updated class times to my calendar.',
    },
  };
  const selectedChannel = channelContent[activeChannel] || channelContent['ap-physics'];

  const attendees = [
    { name: 'David Chen', role: 'Host / Tutor', initials: 'DC', color: '#3b82f6' },
    { name: 'Maya Chen', role: 'Student', initials: 'MC', color: '#5c5bd6' },
    { name: 'Sam Ortiz', role: 'Student', initials: 'SO', color: '#dc2626' },
    { name: 'Dana Lee', role: 'Student', initials: 'DL', color: '#059669' },
    { name: 'Priya K', role: 'Student', initials: 'PK', color: '#c026d3' },
  ];

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-xs select-none font-sans">
      {/* ─── Unified Workspace App Rail ─── */}
      <WorkspaceAppRail activeApp="calls" theme="dark" />

      {/* ─── Channel & Class Sidebar ─── */}
      <div className="hidden sm:flex w-40 flex-col border-r border-[#e5e2dc] bg-[#f8f7f5] py-3 px-2 shrink-0">
        <div className="px-2 mb-3">
          <p className="text-[10px] font-semibold tracking-wider text-[#9ca3af] uppercase">Academy Workspace</p>
          <p className="text-xs font-semibold text-[#111827] truncate">STEM Prep Academy</p>
        </div>

        <div className="space-y-0.5">
          <p className="px-2 text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1">Classes</p>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChannel(ch.id);
                setRsvpState('going');
                setIsPlaying(false);
              }}
              className={`flex w-full items-center justify-between px-2 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                activeChannel === ch.id
                  ? 'bg-white font-semibold text-[#111827] shadow-xs'
                  : 'text-[#4b5563] hover:bg-white/60'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <span className="text-[#9ca3af]">#</span>
                <span className="truncate">{ch.name}</span>
              </span>
              {ch.id === 'ap-physics' && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#3b82f6]" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-4 px-2 space-y-2">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Tutors & Students</p>
          <div className="space-y-1.5">
            {attendees.slice(0, 3).map((u, i) => (
              <div key={i} className="flex items-center gap-2 text-[#4b5563]">
                <AvatarChip name={u.name} color={u.color} size="xs" showRing={false} />
                <span className="truncate text-[11px]">{u.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Main Class Room & Event Feed ────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-[#faf9f7]">
        {/* Room Header */}
        <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#111827]"># {activeChannel}</span>
            <span className="rounded-full bg-[#eff6ff] px-2 py-0.5 text-[10px] font-medium text-[#2563eb]">
              Semester 1 · Fall 2026
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {attendees.map((a, i) => (
                <AvatarChip key={i} name={a.name} color={a.color} size="xs" />
              ))}
            </div>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 rounded border border-[#e5e2dc] bg-white px-2 py-1 text-[11px] text-[#4b5563] hover:bg-[#f3f1ed] cursor-pointer"
            >
              {copiedLink ? <Check size={11} className="text-emerald-600" /> : <Share2 size={11} />}
              <span>{copiedLink ? 'Copied' : 'Invite'}</span>
            </button>
          </div>
        </div>

        {/* Feed content */}
        <div className="p-4 space-y-3.5">
          {/* 1. Host Event Card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-[#dbeafe] bg-white p-3.5 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff6ff] text-[#2563eb] shrink-0">
                  <Calendar size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#111827] text-sm">
                      {selectedChannel.title}
                    </span>
                    <span className="rounded bg-[#ecfdf5] px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Live Class
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#6b7280]">
                    {selectedChannel.schedule}
                  </p>
                </div>
              </div>
            </div>

            {/* Attendance & RSVP Row */}
            <div className="mt-3 flex items-center justify-between border-t border-[#f1f5f9] pt-3">
              <div className="flex items-center gap-2 text-[#6b7280]">
                <Users size={13} />
                <span className="text-[11px]">
                  {rsvpState === 'going' ? '5 of 5 enrolled attending' : '4 of 5 enrolled attending'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setRsvpState('going')}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer ${
                    rsvpState === 'going'
                      ? 'bg-[#3b82f6] text-white shadow-2xs'
                      : 'border border-[#e5e2dc] bg-white text-[#4b5563] hover:bg-[#f3f1ed]'
                  }`}
                >
                  <Check size={12} />
                  <span>Going</span>
                </button>
                <button
                  onClick={() => setRsvpState('maybe')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                    rsvpState === 'maybe'
                      ? 'bg-[#e5e7eb] text-[#111827]'
                      : 'border border-[#e5e2dc] bg-white text-[#4b5563] hover:bg-[#f3f1ed]'
                  }`}
                >
                  Maybe
                </button>
              </div>
            </div>
          </motion.div>

          {/* 2. Recording & AI Class Notes Package (Verified from Ultrakin Workflow) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.08 }}
            className="rounded-xl border border-[#e5e2dc] bg-white p-3.5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ede9fe] text-[#7c3aed]">
                  <Sparkles size={13} />
                </div>
                <span className="font-semibold text-[#111827]">
                  {selectedChannel.recap}
                </span>
                <span className="text-[10px] text-[#9ca3af]">Generated immediately after session</span>
              </div>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-[#3b82f6] hover:underline cursor-pointer">
                <Download size={12} />
                <span>Download Notes (.pdf)</span>
              </button>
            </div>

            {/* Audio/Video Scrubber Player */}
            <div className="rounded-lg bg-[#f9fafb] border border-[#e5e7eb] p-2.5 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111827] text-white hover:bg-black transition-colors cursor-pointer shrink-0"
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} className="ml-0.5" />}
              </button>

              <div className="flex-1">
                <div className="flex justify-between text-[10px] text-[#6b7280] mb-1 font-mono">
                  <span>{isPlaying ? '18:42' : '15:20'}</span>
                  <span>42:15 total</span>
                </div>
                <div className="relative h-1.5 w-full rounded-full bg-[#e5e7eb] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#3b82f6] rounded-full"
                    style={{ width: `${playProgress}%` }}
                    animate={{ width: isPlaying ? '52%' : '38%' }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#4b5563] text-[11px] font-medium bg-white border border-[#e5e7eb] rounded px-2 py-0.5 shrink-0">
                <Volume2 size={12} />
                <span>1.25x</span>
              </div>
            </div>

            {/* Key takeaways bullet points */}
            <div className="rounded-lg bg-[#f8fafc] border border-[#e2e8f0] p-2.5 space-y-1.5">
              <p className="text-[11px] font-semibold text-[#334155]">Key Lecture Takeaways:</p>
              <ul className="text-[11px] text-[#475569] space-y-1 list-disc list-inside">
                {selectedChannel.takeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
              </ul>
            </div>

            {/* Student discussion inline */}
            <div className="flex items-start gap-2.5 pt-1">
              <AvatarChip name="Maya Chen" color="#5c5bd6" size="xs" />
              <div className="flex-1 rounded-lg bg-[#f3f4f6] px-3 py-2 text-[11px]">
                <p className="font-semibold text-[#111827]">Maya Chen <span className="font-normal text-[#9ca3af] text-[10px]">3:48 PM</span></p>
                <p className="text-[#374151] mt-0.5">{selectedChannel.studentNote}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
