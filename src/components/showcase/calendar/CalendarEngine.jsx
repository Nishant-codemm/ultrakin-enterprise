import React, { useEffect, useMemo, useState } from 'react';
import { useWorkspace } from '../../../context/useWorkspace';
import CalendarHeader from './CalendarHeader';
import CalendarWeekView from './CalendarWeekView';
import CalendarMonthView from './CalendarMonthView';
import CalendarDayView from './CalendarDayView';
import CalendarAgendaView from './CalendarAgendaView';
import EventInspectorDrawer from './EventInspectorDrawer';
import NewEventModal from './NewEventModal';

export default function CalendarEngine() {
  const {
    calendarEvents,
    calendarView,
    setCalendarView,
    calendarCategoryFilter,
    activeCalendarEvent,
    openEventDrawer,
    openNewEventModal,
    rescheduleCalendarEvent,
    updateEventRsvp,
  } = useWorkspace();

  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  // Filter events based on active category checkboxes
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter((e) => {
      if (!e.category) return true;
      return calendarCategoryFilter[e.category] !== false;
    });
  }, [calendarEvents, calendarCategoryFilter]);

  // Global Keyboard Shortcuts for Calendar (Ergonomic mouse-free experience)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      switch (e.key.toLowerCase()) {
        case 't':
          e.preventDefault();
          setCurrentWeekOffset(0);
          break;
        case 'w':
          e.preventDefault();
          setCalendarView('week');
          break;
        case 'm':
          e.preventDefault();
          setCalendarView('month');
          break;
        case 'd':
          e.preventDefault();
          setCalendarView('day');
          break;
        case 'a':
          e.preventDefault();
          setCalendarView('agenda');
          break;
        case 'n':
          e.preventDefault();
          openNewEventModal();
          break;
        case 'g':
          if (activeCalendarEvent) {
            e.preventDefault();
            updateEventRsvp(activeCalendarEvent.id, 'going');
          }
          break;
        case 'x':
          if (activeCalendarEvent) {
            e.preventDefault();
            updateEventRsvp(activeCalendarEvent.id, 'declined');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCalendarView, openNewEventModal, activeCalendarEvent, updateEventRsvp]);

  const handleSlotClick = (_dayIdx, _hour) => {
    openNewEventModal();
  };

  const handlePrev = () => {
    setCurrentWeekOffset((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentWeekOffset((prev) => prev + 1);
  };

  const handleToday = () => {
    setCurrentWeekOffset(0);
  };

  const currentDateText = useMemo(() => {
    if (currentWeekOffset === 0) return 'November 2026 · Week 46';
    if (currentWeekOffset > 0) return `November 2026 · Week ${46 + currentWeekOffset}`;
    return `November 2026 · Week ${46 + currentWeekOffset}`;
  }, [currentWeekOffset]);

  return (
    <div className="flex-1 flex flex-col h-full bg-obsidian-canvas text-slate-200 select-none overflow-hidden relative">
      {/* ── Calendar Navigation Header ── */}
      <CalendarHeader
        currentDateText={currentDateText}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
      />

      {/* ── Main Viewport Split (Grid Canvas + Contextual Inspector Drawer) ── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Main Grid Canvas */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {calendarView === 'week' && (
            <CalendarWeekView
              events={filteredEvents}
              onSelectEvent={openEventDrawer}
              onSlotClick={handleSlotClick}
              onRescheduleEvent={rescheduleCalendarEvent}
            />
          )}

          {calendarView === 'month' && (
            <CalendarMonthView
              events={filteredEvents}
              onSelectEvent={openEventDrawer}
              onSlotClick={handleSlotClick}
            />
          )}

          {calendarView === 'day' && (
            <CalendarDayView
              events={filteredEvents}
              onSelectEvent={openEventDrawer}
              onSlotClick={handleSlotClick}
            />
          )}

          {calendarView === 'agenda' && (
            <CalendarAgendaView
              events={filteredEvents}
              onSelectEvent={openEventDrawer}
            />
          )}
        </div>

        {/* ── Contextual Level 4 Inspector Drawer ── */}
        <EventInspectorDrawer />
      </div>

      {/* ── Event Creation Modal ── */}
      <NewEventModal />
    </div>
  );
}
