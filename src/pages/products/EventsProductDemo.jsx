/**
 * EventsProductDemo.jsx
 * Authenticated Ultrakin Events & Multi-Timezone Calendar Engine.
 * Features:
 * - Unified Workspace App Rail (Dock) with Events active
 * - CalendarEngine with Month, Week, Day, and Agenda views
 * - Interactive 380px non-blocking Event Inspector Drawer
 * - Dynamic 3-state RSVP engine (Going, Maybe, Declined) with optimistic feedback
 * - WebRTC Huddle Session bridge & live participant counter
 * - Post-call Ukin AI Synthesis card with auto-extracted action items
 * - 1-Click Action item synchronization to Kanban Sprint Board
 * - Embedded Matrix discussion thread with instant replies
 * - Real-time teammate availability & conflict detection
 * - Mouse-free keyboard navigation shortcuts (T, W, M, D, A, N, G, X, Esc)
 */
import React from 'react';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import CalendarEngine from '../../components/showcase/calendar/CalendarEngine';

export default function EventsProductDemo() {
  return (
    <div className="flex h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden relative">
      {/* ── Left Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="events" theme="dark" />

      {/* ── Master Calendar Engine Canvas ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <CalendarEngine />
      </div>
    </div>
  );
}
