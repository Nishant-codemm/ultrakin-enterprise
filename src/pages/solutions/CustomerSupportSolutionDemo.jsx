/**
 * CustomerSupportSolutionDemo.jsx
 * Interactive demo for /solutions/customer-support ("Customer support")
 * Recreates the authentic Ultrakin workflow:
 * Customer Signal -> Collision Guardrail -> In-Context Escalation -> System Record (SR-28).
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Clock,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import CollisionPresenceBanner from '../../components/solution/CollisionPresenceBanner';
import SystemRecordBadge from '../../components/solution/SystemRecordBadge';

const INBOX_ITEMS = [
  {
    id: 't-elena',
    sender: { name: 'Elena Rostova', initials: 'ER', color: '#ef4444', role: 'Customer' },
    time: '9:04 AM',
    subject: 'Webhook 504 Gateway Timeout',
    preview: 'Our production webhook failed three times with 504...',
    unread: true,
    hasCollision: true,
    tag: 'P0 SLA · 15m',
    orderId: 'Order #4821',
  },
  {
    id: 't-marcus',
    sender: { name: 'Marcus Vance', initials: 'MV', color: '#059669', role: 'Enterprise AE' },
    time: 'Yesterday',
    subject: 'Annual invoice review request',
    preview: 'Can we schedule a 10 min sync to review the new tier?',
    unread: false,
    hasCollision: false,
    tag: 'Sales Sync',
    orderId: 'Account #9120',
  },
  {
    id: 't-lumen',
    sender: { name: 'Lumen Health', initials: 'LH', color: '#3b82f6', role: 'Customer' },
    time: 'Yesterday',
    subject: 'SSO provisioning query',
    preview: 'Okta SAML assertion metadata attached for review.',
    unread: false,
    hasCollision: false,
    tag: 'Security',
    orderId: 'Ticket #1042',
  },
];

const INITIAL_MESSAGES = {
  't-elena': [
    {
      id: 'm1',
      from: { name: 'Elena Rostova', initials: 'ER', color: '#ef4444', role: 'Customer' },
      time: '9:04 AM',
      body: 'Hi team, our production webhook failed three times with 504 Gateway Timeout on invoice #4821. Can someone review the gateway logs?',
    },
    {
      id: 'm2',
      from: { name: 'Sam Ortiz', initials: 'SO', color: '#dc2626', role: 'Support' },
      time: '9:12 AM',
      replyLabel: 'Replied by Priya (Support Lead)',
      body: 'Hi Elena! Looking into this now. Looping in @Dana from Systems to trace the endpoint latency.',
    },
    {
      id: 'm3',
      from: { name: 'Dana Lee', initials: 'DL', color: '#6366f1', role: 'Systems Eng' },
      time: '9:15 AM',
      replyLabel: 'Internal Note',
      body: 'Replica lag resolved on webhook cluster us-east-2. Retries cleared and ping latency dropped back to 34ms.',
    },
  ],
  't-marcus': [
    {
      id: 'm-m1',
      from: { name: 'Marcus Vance', initials: 'MV', color: '#059669', role: 'Enterprise AE' },
      time: 'Yesterday',
      body: 'Can we schedule a 10 min sync to review the new enterprise pricing tier for Meridian Systems?',
    },
  ],
  't-lumen': [
    {
      id: 'm-l1',
      from: { name: 'Lumen Health', initials: 'LH', color: '#3b82f6', role: 'Customer' },
      time: 'Yesterday',
      body: 'Okta SAML assertion metadata attached. We are ready to verify user sync in the staging tenant.',
    },
  ],
};

export default function CustomerSupportSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedThreadId, setSelectedThreadId] = useState('t-elena');
  const [threadMessages, setThreadMessages] = useState(INITIAL_MESSAGES);
  const [isLogged, setIsLogged] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const messagesEndRef = useRef(null);

  const activeThread = INBOX_ITEMS.find((item) => item.id === selectedThreadId) || INBOX_ITEMS[0];
  const messages = threadMessages[selectedThreadId] || [];

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
      setToastMessage('Reply dispatched to Elena Rostova');
      setTimeout(() => setToastMessage(null), 2500);
    }, 300);
  };

  const handleToggleLog = () => {
    const nextState = !isLogged;
    setIsLogged(nextState);
    setToastMessage(nextState ? 'Logged as SR-28 in Support requests' : 'Removed from Support requests');
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
                onKeyDown={(e) => e.key === 'Enter' && setSelectedThreadId(item.id)}
                className={`p-2.5 cursor-pointer transition-colors relative ${
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

                {item.hasCollision && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ef4444] animate-pulse" />
                    <span className="text-[9px] font-semibold text-[#ef4444] uppercase tracking-wide">
                      Priya drafting
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── Thread & Record Workflow ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-white min-w-0">
        {/* Header Bar with Collision & Escalation */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#e5e2dc] bg-[#fdfcfb] px-4 py-2.5 gap-2 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827] truncate">{activeThread.subject}</span>
              <span className="rounded bg-[#fee2e2] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#b91c1c] shrink-0">
                {activeThread.tag}
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">{activeThread.orderId} · support@northwind.shop</p>
          </div>

          {/* Connected Record Action Pill */}
          <SystemRecordBadge
            recordId="SR-28"
            collectionName="Support requests"
            isLogged={isLogged}
            onToggle={handleToggleLog}
            showLink={true}
          />
        </div>

        {/* Collision Presence Guardrail */}
        {activeThread.hasCollision && (
          <div className="px-4 pt-2.5">
            <CollisionPresenceBanner
              agent={{ name: 'Priya K.', initials: 'PK', color: '#dc2626', role: 'Support Lead' }}
              action="is drafting a reply..."
            />
          </div>
        )}

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

          {/* AI Assist Suggestion Bar */}
          {selectedThreadId === 't-elena' && (
            <div className="rounded-lg border border-[#e0e7ff] bg-[#f5f7ff] p-2.5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 truncate">
                <Sparkles size={13} className="text-[#6366f1] shrink-0" />
                <span className="text-[11px] text-[#3730a3] truncate">
                  Ukin drafted reply: Verified webhook retry queue cleared at 9:15 AM. Retries now succeeding.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setReplyText('Verified webhook retry queue cleared at 9:15 AM. Retries now succeeding.')}
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
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeThread.sender.name} or type @ to mention an engineer...`}
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
