/**
 * CustomerSupportSolutionDemo.jsx
 * Interactive demo for /solutions/customer-support ("Customer support")
 * Illustrates a sample support workflow:
 * shared email -> team context -> tracked request -> human-reviewed reply.
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  FileText,
  ListChecks,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import SystemRecordBadge from '../../components/solution/SystemRecordBadge';

const INBOX_ITEMS = [
  {
    id: 't-jortiz',
    sender: { name: 'J. Ortiz', initials: 'JO', color: '#475569', role: 'Customer' },
    time: '9:04 AM',
    subject: 'Duplicate charge on order #4821',
    preview: 'I see two $120 charges for the same order...',
    unread: false,
    tag: 'Refund review',
    orderId: 'Order #4821',
    requestId: 'SR-31',
    owner: 'Dana Lee',
    status: 'Needs review',
  },
  {
    id: 't-setup',
    sender: { name: 'Mia Chen', initials: 'MC', color: '#059669', role: 'Customer' },
    time: 'Yesterday',
    subject: 'Setup instructions for my account',
    preview: 'Could you point me to the connection guide?',
    unread: false,
    tag: 'How-to question',
    orderId: 'Help center',
  },
  {
    id: 't-shipment',
    sender: { name: 'A. Rivera', initials: 'AR', color: '#3b82f6', role: 'Customer' },
    time: 'Yesterday',
    subject: 'Replacement shipment update',
    preview: 'Could you share the latest delivery status?',
    unread: false,
    tag: 'Order update',
    orderId: 'Order #4798',
  },
];

const INITIAL_MESSAGES = {
  't-jortiz': [
    {
      id: 'm1',
      from: { name: 'J. Ortiz', initials: 'JO', color: '#475569', role: 'Customer' },
      time: '9:04 AM',
      body: 'Hi, I was charged twice for order #4821. Both charges are $120. Could you check this for me?',
    },
    {
      id: 'm2',
      from: { name: 'Dana Lee', initials: 'DL', color: '#6366f1', role: 'Support Lead' },
      time: '9:12 AM',
      replyLabel: 'Team context · #support',
      body: 'I’m checking the order history and refund guidance before we confirm the next step.',
    },
  ],
  't-setup': [
    {
      id: 'm-s1',
      from: { name: 'Mia Chen', initials: 'MC', color: '#059669', role: 'Customer' },
      time: 'Yesterday',
      body: 'Could you point me to the setup instructions for connecting my account?',
    },
  ],
  't-shipment': [
    {
      id: 'm-l1',
      from: { name: 'A. Rivera', initials: 'AR', color: '#3b82f6', role: 'Customer' },
      time: 'Yesterday',
      body: 'Could you share the latest delivery status for my replacement order?',
    },
  ],
};

export default function CustomerSupportSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedThreadId, setSelectedThreadId] = useState('t-jortiz');
  const [threadMessages, setThreadMessages] = useState(INITIAL_MESSAGES);
  const [isLogged, setIsLogged] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const activeThread = INBOX_ITEMS.find((item) => item.id === selectedThreadId) || INBOX_ITEMS[0];
  const messages = useMemo(
    () => threadMessages[selectedThreadId] || [],
    [threadMessages, selectedThreadId]
  );

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [messages, reduceMotion]);

  // Keyboard navigation between inbox threads
  const handleKeyDown = useCallback((e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const currentIndex = INBOX_ITEMS.findIndex((item) => item.id === selectedThreadId);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % INBOX_ITEMS.length;
      setSelectedThreadId(INBOX_ITEMS[nextIndex].id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + INBOX_ITEMS.length) % INBOX_ITEMS.length;
      setSelectedThreadId(INBOX_ITEMS[prevIndex].id);
    }
  }, [selectedThreadId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim() || isSending) return;

    setIsSending(true);

    // Realistic 300ms optimistic network latency
    setTimeout(() => {
      const newMsg = {
        id: `m-${Date.now()}`,
        from: { name: 'Sam Ortiz', initials: 'SO', color: '#dc2626', role: 'Support' },
        time: 'Just now',
        replyLabel: 'Replied just now',
        body: replyText,
      };

      setThreadMessages((prev) => ({
        ...prev,
        [selectedThreadId]: [...(prev[selectedThreadId] || []), newMsg],
      }));
      setReplyText('');
      setIsSending(false);
      setToastMessage(`Sample reply added to ${activeThread.sender.name}’s thread`);
      setTimeout(() => setToastMessage(null), 2500);
    }, 300);
  };

  const handleToggleLog = () => {
    const nextState = !isLogged;
    setIsLogged(nextState);
    setToastMessage(nextState ? 'Sample request SR-31 added to Support requests' : 'Sample request removed from Support requests');
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-xs select-none font-sans relative">
      {/* ─── Unified Workspace App Rail ─── */}
      <WorkspaceAppRail activeApp="mail" />

      {/* ─── Inbox List ─── */}
      <div className="flex w-44 sm:w-52 flex-col border-r border-[#e5e2dc] bg-[#faf9f7] shrink-0">
        <div className="border-b border-[#e5e2dc] px-3 py-2.5 bg-white">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Shared Mailbox</p>
          <p className="text-xs font-semibold text-[#111827] truncate">support@northwind.shop</p>
        </div>

        <div className="divide-y divide-[#f0ede8] overflow-y-auto flex-1">
          {INBOX_ITEMS.map((item) => {
            const isSelected = item.id === selectedThreadId;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedThreadId(item.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelectedThreadId(item.id))}
                aria-pressed={isSelected}
                className={`p-2.5 cursor-pointer transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4f46e5] ${
                  isSelected
                    ? 'bg-[#fff5f5] border-l-2 border-[#ef4444]'
                    : 'hover:bg-white/80 border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 truncate">
                    {item.unread && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444] shrink-0" />
                    )}
                    <span className={`text-[11px] truncate ${isSelected ? 'font-bold text-[#111827]' : 'font-medium text-[#374151]'}`}>
                      {item.sender.name}
                    </span>
                  </div>
                  <span className={`text-[9.5px] tabular-nums ${isSelected ? 'text-[#ef4444] font-medium' : 'text-[#9ca3af]'}`}>
                    {item.time}
                  </span>
                </div>

                <p className="text-[11px] font-medium text-[#111827] truncate mt-0.5">
                  {item.subject}
                </p>
                <p className="text-[10px] text-[#6b7280] truncate mt-0.5">
                  {item.preview}
                </p>

              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Thread & Record Workflow ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-white min-w-0">
        {/* Request and approval record */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#e5e2dc] bg-[#fdfcfb] px-4 py-2.5 gap-2 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827] truncate">{activeThread.subject}</span>
              <span className="rounded bg-[#eef2ff] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#4338ca] shrink-0">
                {activeThread.tag}
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">{activeThread.orderId} · support@northwind.shop</p>
          </div>

          {/* Connected Record Action Pill */}
          {activeThread.requestId && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] text-[#667085]">{activeThread.owner} · {activeThread.status}</span>
              <SystemRecordBadge
                recordId={activeThread.requestId}
                collectionName="Support requests"
                isLogged={isLogged}
                onToggle={handleToggleLog}
                showLink={true}
              />
            </div>
          )}
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.map((m) => (
            <div key={m.id} className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AvatarChip name={m.from.name} color={m.from.color} size="xs" />
                  <span className="font-semibold text-[#111827]">{m.from.name}</span>
                  <span className="text-[10px] text-[#9ca3af]">{m.time}</span>
                </div>
                {m.replyLabel && (
                  <span className="rounded bg-white border border-[#e5e2dc] px-1.5 py-0.5 text-[9px] font-medium text-[#4b5563]">
                    {m.replyLabel}
                  </span>
                )}
              </div>
              <p className="text-[11px] leading-relaxed text-[#374151] pl-6">{m.body}</p>
            </div>
          ))}

          {selectedThreadId === 't-jortiz' && (
            <section aria-label="Related support context" className="rounded-lg border border-[#e5e2dc] bg-white p-2.5">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#667085]">Related work</p>
                <span className="text-[9px] text-[#98a2b3]">Same request</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 rounded-md bg-[#faf9f7] px-2 py-1.5">
                  <MessageSquare size={12} className="shrink-0 text-[#4f46e5]" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-[10px] text-[#344054]">#support · Check guidance before replying</span>
                  <span className="shrink-0 text-[9px] text-[#667085]">Chat</span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#faf9f7] px-2 py-1.5">
                  <FileText size={12} className="shrink-0 text-[#3156cf]" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-[10px] text-[#344054]">Refund review guidance</span>
                  <span className="shrink-0 text-[9px] text-[#667085]">Docs</span>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#faf9f7] px-2 py-1.5">
                  <ListChecks size={12} className="shrink-0 text-emerald-700" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-[10px] text-[#344054]">SR-31 · Dana Lee · Needs review</span>
                  <span className="shrink-0 text-[9px] text-[#667085]">Lists</span>
                </div>
              </div>
            </section>
          )}

          {/* AI Assist Suggestion Bar */}
          {selectedThreadId === 't-jortiz' && (
            <div className="rounded-lg border border-[#e0e7ff] bg-[#f5f7ff] p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <Sparkles size={13} className="text-[#6366f1] shrink-0" />
                <span className="text-[11px] text-[#3730a3] truncate">
                  Ukin draft · based on the email and linked support context
                </span>
              </div>
              <button
                type="button"
                onClick={() => setReplyText('Thanks for flagging the duplicate charge. Our team is reviewing the order and will follow up here with the next step.')}
                className="shrink-0 rounded bg-white border border-[#c7d2fe] px-2 py-0.5 text-[10px] font-semibold text-[#4f46e5] hover:bg-[#eef2ff] transition-colors cursor-pointer"
              >
                Insert Draft
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Interactive Reply Form */}
        <form onSubmit={handleSendReply} className="border-t border-[#e5e2dc] bg-white p-3 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              aria-label={`Reply to ${activeThread.sender.name}`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Write a sample reply to ${activeThread.sender.name}…`}
              disabled={isSending}
              className="flex-1 rounded-md border border-[#e5e2dc] bg-[#faf9f7] px-3 py-1.5 text-xs text-[#111827] focus:border-[#ef4444] focus:bg-white focus:outline-none transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSending || !replyText.trim()}
              className="flex items-center gap-1.5 rounded-md bg-[#ef4444] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#dc2626] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={12} className={isSending ? 'animate-pulse' : ''} />
              <span>{isSending ? 'Sending...' : 'Send'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Workspace Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-md"
          >
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
