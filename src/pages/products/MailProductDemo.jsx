/**
 * MailProductDemo.jsx
 * Production-Quality Mail Experience Inspired by Original Ultrakin
 *
 * Workflow Story:
 * Customer Signal -> Team Collaboration -> Shared Ownership -> Workspace Record
 *
 * Architecture:
 * - Left Workspace App Rail (Blue U, Lavender Chat, Teal Calls, Active Red Mail roundel, Blue Docs, Green Lists, Fuchsia Automations)
 * - Domain Header (support@northwind.studio + gray Inbox badge)
 * - Left Queue: Maya Chen (coral unread dot, warm peach #fff5f5 selection), Lumen Health, Dana Lee, Sam Ortiz
 * - Right Active Thread: Customer Inquiry -> Team Reply Container (with "Replied by Priya" badge) -> "✓ Logged as SR-14 in Support requests"
 * - Live Collision Alert: "Sam Ortiz is viewing this thread"
 * - Interactive Smart Suggestions & Optimistic Composer
 * - Full Keyboard Navigation (ArrowUp / ArrowDown)
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Video,
  FileText,
  CheckSquare,
  Zap,
  Check,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Clock,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import { PERSONAS } from '../../data/productPageData';

// ─── Workspace App Rail Roundels ─────────────────────────────────────────────
const WORKSPACE_RAIL_ITEMS = [
  { id: 'chat',        icon: MessageSquare, label: 'Chat',        color: '#a855f7', bg: 'bg-[#a855f7]/15 text-[#9333ea]' },
  { id: 'calls',       icon: Video,         label: 'Calls',       color: '#14b8a6', bg: 'bg-[#14b8a6]/15 text-[#0d9488]' },
  { id: 'mail',        icon: Mail,          label: 'Mail',        color: '#dc2626', bg: 'bg-[#dc2626] text-white', active: true },
  { id: 'docs',        icon: FileText,      label: 'Docs',        color: '#0284c7', bg: 'bg-[#0284c7]/15 text-[#0369a1]' },
  { id: 'lists',       icon: CheckSquare,   label: 'Lists',       color: '#10b981', bg: 'bg-[#10b981]/15 text-[#047857]' },
  { id: 'automations', icon: Zap,           label: 'Automations', color: '#c026d3', bg: 'bg-[#c026d3]/15 text-[#a21caf]' },
];

// ─── Mail Queue Dataset matching Original Reference ─────────────────────────
const INITIAL_INBOX = [
  {
    id: 1,
    from: PERSONAS.maya,
    name: 'Maya Chen',
    time: 'Now',
    subject: 'Charged twice for October',
    preview: 'Charged twice for Octo...',
    unread: true,
  },
  {
    id: 2,
    from: PERSONAS.lumen,
    name: 'Lumen Health',
    time: '9:12',
    subject: 'Re: Invoice 1182',
    preview: 'Re: Invoice 1182',
    unread: false,
  },
  {
    id: 3,
    from: PERSONAS.dana,
    name: 'Dana Lee',
    time: 'Yesterday',
    subject: 'Weekly numbers',
    preview: 'Weekly numbers',
    unread: false,
  },
  {
    id: 4,
    from: PERSONAS.sam,
    name: 'Sam Ortiz',
    time: 'Yesterday',
    subject: 'Onboarding checklist',
    preview: 'Onboarding check...',
    unread: false,
  },
];

const THREADS = {
  1: {
    subject: 'Charged twice for October',
    senderEmail: 'maya@northwind.studio',
    time: '9:04 AM',
    customerMessage:
      'Hi, I was charged twice for October — order #4821. Can you please check and process a refund? My billing statement shows two separate charges of $49.',
    reply: {
      author: 'Priya K',
      authorLabel: 'Replied by Priya',
      time: '9:18 AM',
      body:
        'Hi Maya, sorry about that. We have refunded the duplicate charge and it will show in 3 to 5 days.',
    },
    record: {
      id: 'SR-14',
      list: 'Support requests',
      status: 'In Progress',
      assignee: 'Priya K',
    },
  },
  2: {
    subject: 'Re: Invoice 1182',
    senderEmail: 'billing@lumenhealth.co',
    time: '9:12 AM',
    customerMessage:
      'Please find the revised payment schedule attached for Invoice 1182. Let us know if you need any adjustments.',
    reply: null,
    record: null,
  },
  3: {
    subject: 'Weekly numbers',
    senderEmail: 'dana@northwind.studio',
    time: 'Yesterday',
    customerMessage:
      'Weekly active organizations grew by 18% this sprint. Support ticket resolution time is down to 22 minutes.',
    reply: null,
    record: null,
  },
  4: {
    subject: 'Onboarding checklist',
    senderEmail: 'sam@northwind.studio',
    time: 'Yesterday',
    customerMessage:
      'Here is the checklist for our new customer success cohort joining next Monday. Please review permissions.',
    reply: null,
    record: null,
  },
};

export default function MailProductDemo() {
  const reduceMotion = useReducedMotion();
  const [inbox, setInbox] = useState(INITIAL_INBOX);
  const [selectedId, setSelectedId] = useState(1);
  const [threads, setThreads] = useState(THREADS);
  const [showCollisionAlert, setShowCollisionAlert] = useState(true);
  const [hoveredRecord, setHoveredRecord] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const selectedThread = threads[selectedId];

  // Keyboard navigation across inbox list
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedId((current) => {
          const ids = inbox.map((item) => item.id);
          const nextIndex = Math.min(ids.indexOf(current) + 1, ids.length - 1);
          return ids[nextIndex];
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedId((current) => {
          const ids = inbox.map((item) => item.id);
          const prevIndex = Math.max(ids.indexOf(current) - 1, 0);
          return ids[prevIndex];
        });
      }
    },
    [inbox]
  );

  const handleSelectEmail = (id) => {
    setSelectedId(id);
    setInbox((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item))
    );
  };

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyInput.trim() || isSending) return;

    setIsSending(true);
    setTimeout(() => {
      setThreads((prev) => {
        const cur = prev[selectedId];
        return {
          ...prev,
          [selectedId]: {
            ...cur,
            reply: {
              author: 'You',
              authorLabel: 'Replied by You',
              time: 'Just now',
              body: replyInput.trim(),
            },
          },
        };
      });

      setReplyInput('');
      setIsSending(false);
      setToastMessage('Reply sent · Logged in workspace');
      setTimeout(() => setToastMessage(null), 3000);
    }, 380);
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Interactive shared mail workspace"
      className="flex h-full w-full bg-white select-none overflow-hidden relative focus:outline-none"
    >
      {/* ── 1. Unified Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="mail" />

      {/* ── 2. The Main Email Application Surface ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* App Header Bar matching screenshot: support@northwind.studio Inbox */}
        <div className="h-10 shrink-0 border-b border-[#f0ede8] px-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[13px] font-semibold text-[#111827] truncate tracking-tight">
              support@northwind.studio
            </span>
            <span className="text-[11px] text-[#8c8c8c] font-sans">Inbox</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live DNS Sync
            </span>
          </div>
        </div>

        {/* ── 3. Dual-Column Inbox & Thread Layout ── */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Column: Shared Queue List */}
          <div className="w-[195px] sm:w-[215px] shrink-0 border-r border-[#f0ede8] bg-white flex flex-col overflow-y-auto">
            {inbox.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectEmail(item.id)}
                  className={`group relative flex items-start gap-2.5 px-3 py-3 text-left transition-colors cursor-pointer border-b border-[#f6f5f2] ${
                    isSelected
                      ? 'bg-[#fff5f5] text-[#111827]'
                      : 'hover:bg-[#faf9f7] text-[#344054]'
                  }`}
                >
                  {/* Active row indicator accent */}
                  {isSelected && (
                    <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#dc2626]" />
                  )}

                  {/* Red/Coral Unread Dot */}
                  <div className="pt-1 shrink-0 w-2.5">
                    {item.unread && (
                      <span className="block h-2 w-2 rounded-full bg-[#ef4444] shadow-[0_0_6px_rgba(239,68,68,0.5)]" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`truncate text-[12.5px] ${
                          isSelected || item.unread
                            ? 'font-bold text-[#111827]'
                            : 'font-medium text-[#344054]'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="shrink-0 text-[10px] font-mono tabular-nums text-[#8c8c8c]">
                        {item.time}
                      </span>
                    </div>

                    <p className="truncate text-[11.5px] text-[#667085] leading-snug">
                      {item.preview}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Thread & Record Conversion */}
          <div className="flex-1 flex flex-col overflow-y-auto p-4 bg-white relative">
            <AnimatePresence mode="wait">
              {selectedThread ? (
                <motion.div
                  key={selectedId}
                  initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3.5 flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Customer Inquiry Header */}
                    <div>
                      <h4 className="text-[13.5px] font-bold text-[#111827] leading-tight mb-1">
                        {selectedThread.subject}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-[#8c8c8c] font-mono">
                        <span>{selectedThread.senderEmail}</span>
                        <span>·</span>
                        <span>{selectedThread.time}</span>
                      </div>
                    </div>

                    {/* Customer Message Body */}
                    <div className="text-[12.5px] leading-[1.65] text-[#374151] pt-1 border-t border-[#f0ede8]">
                      {selectedThread.customerMessage}
                    </div>

                    {/* Team Reply Container matching screenshot structure */}
                    {selectedThread.reply && (
                      <div className="rounded-xl border border-[#e7e4de] bg-[#fafaf9] p-3 shadow-2xs space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#8c8c8c]">
                            Reply
                          </span>
                          <span className="text-[10px] font-semibold text-[#059669] bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 rounded-full">
                            {selectedThread.reply.authorLabel}
                          </span>
                        </div>
                        <p className="text-[12px] leading-relaxed text-[#111827]">
                          {selectedThread.reply.body}
                        </p>
                      </div>
                    )}

                    {/* The Core Workflow Anchor: Logged as SR-14 */}
                    {selectedThread.record && (
                      <div className="relative">
                        <div
                          onMouseEnter={() => setHoveredRecord(true)}
                          onMouseLeave={() => setHoveredRecord(false)}
                          className="flex items-center gap-2 rounded-lg bg-[#f0fdf4] border border-[#d1fae5] px-3 py-1.5 cursor-pointer shadow-2xs transition-colors hover:bg-emerald-100/60"
                        >
                          <span className="h-4 w-4 rounded-full bg-[#059669] text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                            ✓
                          </span>
                          <span className="text-[11.5px] text-[#059669] font-medium">
                            Logged as{' '}
                            <span className="font-bold underline underline-offset-2">
                              {selectedThread.record.id}
                            </span>{' '}
                            in {selectedThread.record.list}
                          </span>
                          <ExternalLink size={10} className="ml-auto text-[#059669] opacity-70" />
                        </div>

                        {/* Interactive Tooltip Card showing linked record */}
                        <AnimatePresence>
                          {hoveredRecord && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              className="absolute left-0 bottom-full mb-1.5 w-64 rounded-xl bg-[#111827] text-white p-2.5 text-xs shadow-xl z-20 border border-slate-700"
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                                <span>Ticket {selectedThread.record.id}</span>
                                <span className="text-emerald-400">In Sprint #44</span>
                              </div>
                              <p className="font-semibold text-slate-100 text-[11.5px] mb-1">
                                Duplicate charge order #4821
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10 font-mono">
                                <span>Assignee: {selectedThread.record.assignee}</span>
                                <span>SLA: 4h (Met ✓)</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Bottom Interactive Composer with Collision Guard */}
                  <div className="pt-2 border-t border-[#f0ede8] space-y-2">
                    {/* Live Collision Guard Indicator */}
                    {showCollisionAlert && selectedId === 1 && (
                      <div className="flex items-center gap-1.5 text-[10.5px] text-[#059669] bg-[#f0fdf4] px-2.5 py-1 rounded-md border border-[#d1fae5]">
                        <AvatarChip person={PERSONAS.sam} size="xs" />
                        <span className="font-medium">
                          Sam Ortiz is viewing this thread (Collision Guard active)
                        </span>
                      </div>
                    )}

                    {/* Quick Reply Form */}
                    <form onSubmit={handleSendReply} className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder={`Reply to ${selectedThread.senderEmail}...`}
                        className="flex-1 bg-[#faf9f7] border border-[#e7e4de] focus:border-[#dc2626] rounded-lg px-2.5 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!replyInput.trim() || isSending}
                        className="h-8 px-3 rounded-lg bg-[#111827] hover:bg-[#1f2937] text-white text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer shrink-0"
                      >
                        {isSending ? (
                          <span className="text-[10.5px]">Sending...</span>
                        ) : (
                          <>
                            <span>Send</span>
                            <Send size={11} />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Floating Toast Notification */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute bottom-16 right-4 flex items-center gap-1.5 rounded-lg bg-[#111827] text-white px-3 py-1.5 text-xs font-medium shadow-xl z-20 border border-slate-700"
                >
                  <Check size={12} className="text-emerald-400" />
                  <span>{toastMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}