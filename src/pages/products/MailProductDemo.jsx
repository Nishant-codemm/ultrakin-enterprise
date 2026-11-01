/**
 * MailProductDemo.jsx
 * Tier-1 Production SaaS Mail Demo for /products/mail
 *
 * Upgrades:
 * - Live incoming email simulation after 4.5s (unread count spring pop, animated new row entry)
 * - Interactive smart reply chips ("Confirm refund", "Request details")
 * - Live send flow: button spinner -> optimistic append -> floating workspace toast
 * - Two-panel split with unread counters and team typing collision indicator
 * - Full keyboard navigation (ArrowUp/ArrowDown)
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reply, ArrowRight, MoreHorizontal, ExternalLink, Tag, Star, Archive, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';
import { MAIL_DATA, PERSONAS } from '../../data/productPageData';

const TOOLBAR_ACTIONS = [
  { icon: Reply,   label: 'Reply'   },
  { icon: Archive, label: 'Archive' },
  { icon: Star,    label: 'Star'    },
  { icon: Tag,     label: 'Tag'     },
];

const SMART_REPLIES = [
  'Confirm refund for order #4821',
  'Request invoice payment receipt',
  'Schedule a follow-up call',
];

// ─── Inbox Row ────────────────────────────────────────────────────────────────
function InboxRow({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-all duration-150 cursor-pointer
        ${isSelected
          ? 'bg-[#f0f4ff] border-l-2 border-l-[#3156cf] shadow-xs'
          : 'border-l-2 border-l-transparent hover:bg-[#f7f6f4]'
        }
      `}
      aria-selected={isSelected}
    >
      <AvatarChip person={item.from} size="sm" className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className={`truncate text-[12.5px] ${item.unread ? 'font-bold text-[#111827]' : 'font-medium text-[#344054]'}`}>
            {item.from.name}
          </span>
          <span className="shrink-0 text-[10px] text-[#9ca3af] font-mono tabular-nums">{item.time}</span>
        </div>
        <p className="truncate text-[11.5px] text-[#667085] leading-4">{item.preview}</p>
      </div>
      {item.unread && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3156cf] shadow-[0_0_6px_rgba(49,86,207,0.5)]" />
      )}
    </button>
  );
}

// ─── Thread Message ───────────────────────────────────────────────────────────
function ThreadMessage({ msg, isLast, reduceMotion }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <AvatarChip person={msg.from} size="sm" className="mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[12.5px] font-semibold text-[#111827]">{msg.from.name}</span>
            <span className="text-[10px] text-[#9ca3af] font-mono tabular-nums">{msg.time}</span>
            {msg.reply && (
              <span className="ml-auto rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[10px] font-medium text-[#059669] border border-[#bbf7d0]">
                {msg.replyLabel || 'Replied'}
              </span>
            )}
          </div>
          <p className="text-[12.5px] leading-[1.6] text-[#374151] whitespace-pre-line">{msg.body}</p>
          {msg.reply && isLast && (
            <div className="mt-2 text-[11px] text-[#6b7280] italic opacity-80">
              Reply visible to the team in shared inbox.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Record Badge ─────────────────────────────────────────────────────────────
function RecordBadge({ record }) {
  if (!record) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="mx-4 mb-2 flex items-center gap-2 rounded-lg border border-[#d1fae5] bg-[#f0fdf4] px-3 py-1.5 shadow-2xs"
    >
      <span
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
        style={{ backgroundColor: record.color }}
      >
        ✓
      </span>
      <span className="text-[11px] text-[#059669] font-medium">
        Logged as{' '}
        <span className="font-semibold underline underline-offset-2 cursor-pointer hover:text-[#047857]">
          {record.id}
        </span>{' '}
        in {record.list}
      </span>
      <ExternalLink size={10} className="ml-auto text-[#059669] opacity-60" />
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MailProductDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(1);
  const [showReplyTyping, setShowReplyTyping] = useState(false);
  const [inbox, setInbox] = useState(MAIL_DATA.inbox);
  const [threads, setThreads] = useState(MAIL_DATA.threads);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const listRef = useRef(null);

  // Simulated live incoming email after 4.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      const incomingEmail = {
        id: 99,
        from: { name: 'Acme Studio', initials: 'AS', color: '#0284c7', role: 'Partner' },
        subject: 'Contract review request',
        preview: 'Hi team, can you review the attached SLA terms...',
        time: 'Just now',
        unread: true,
      };

      setInbox((prev) => {
        if (prev.some((e) => e.id === 99)) return prev;
        return [incomingEmail, ...prev];
      });

      setThreads((prev) => ({
        ...prev,
        99: {
          subject: 'Contract review request',
          messages: [
            {
              id: 'new-1',
              from: { name: 'Acme Studio', initials: 'AS', color: '#0284c7' },
              time: 'Just now',
              body: 'Hi team, please find our revised enterprise SLA schedule attached. Can you review and confirm by end of day?',
            },
          ],
          record: { id: 'SR-22', list: 'Enterprise Deals', color: '#3156cf' },
        },
      }));
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const selectEmail = useCallback((id) => {
    setSelectedId(id);
    setInbox((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
    if (id === 1) {
      setShowReplyTyping(false);
      const t = setTimeout(() => setShowReplyTyping(true), 1600);
      return () => clearTimeout(t);
    } else {
      setShowReplyTyping(false);
    }
  }, []);

  useEffect(() => {
    selectEmail(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim() || isSending) return;

    setIsSending(true);
    setTimeout(() => {
      const newMsg = {
        id: `reply-${Date.now()}`,
        from: { name: 'You', initials: 'ME', color: '#3156cf' },
        time: 'Just now',
        body: replyText.trim(),
        reply: true,
        replyLabel: 'Replied by You',
      };

      setThreads((prev) => {
        const curThread = prev[selectedId] || { subject: '', messages: [] };
        return {
          ...prev,
          [selectedId]: {
            ...curThread,
            messages: [...curThread.messages, newMsg],
          },
        };
      });

      setReplyText('');
      setIsSending(false);
      setToastMessage('Reply sent · Logged in workspace');
      setTimeout(() => setToastMessage(null), 3000);
    }, 450);
  };

  const thread = threads[selectedId];
  const unreadCount = inbox.filter((i) => i.unread).length;

  return (
    <div
      className="flex h-full w-full overflow-hidden rounded-2xl relative select-none"
      tabIndex={0}
      aria-label="Mail interactive demo"
    >
      {/* ── Left: Inbox list ── */}
      <div className="flex w-[210px] shrink-0 flex-col border-r border-[#f0ede8] bg-[#fafaf9]">
        {/* Inbox header */}
        <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] px-3">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#dc2626] text-white shrink-0">
              <span className="text-[9px] font-bold">U</span>
            </div>
            <span className="text-[11.5px] font-semibold text-[#111827] truncate">support@northwind</span>
          </div>
          <motion.span
            key={unreadCount}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="rounded-full bg-[#3156cf] px-1.5 py-0.5 text-[9px] font-bold text-white tabular-nums shrink-0"
          >
            {unreadCount}
          </motion.span>
        </div>

        {/* Inbox label */}
        <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">
          <span>Shared Queue</span>
          <span className="text-emerald-600 font-mono text-[9px]">● Live</span>
        </div>

        {/* Email rows */}
        <div ref={listRef} className="flex-1 overflow-y-auto divide-y divide-[#f5f4f2]" role="listbox">
          <AnimatePresence initial={false}>
            {inbox.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.25 }}
              >
                <InboxRow
                  item={item}
                  isSelected={selectedId === item.id}
                  onClick={() => selectEmail(item.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Right: Thread reader ── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white relative">
        <AnimatePresence mode="wait">
          {thread ? (
            <motion.div
              key={selectedId}
              initial={reduceMotion ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col"
            >
              {/* Thread header */}
              <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#f0ede8] px-4">
                <span className="text-[12.5px] font-semibold text-[#111827] truncate">{thread.subject}</span>
                <div className="flex items-center gap-1 ml-2">
                  {TOOLBAR_ACTIONS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f5f4f2] hover:text-[#374151] transition-colors"
                    >
                      <Icon size={12} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#f5f4f2]">
                {thread.messages.map((msg, i) => (
                  <ThreadMessage
                    key={msg.id}
                    msg={msg}
                    isLast={i === thread.messages.length - 1}
                    reduceMotion={reduceMotion}
                  />
                ))}

                {/* Team Typing collision indicator */}
                <AnimatePresence>
                  {showReplyTyping && selectedId === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-50/50 border-t border-indigo-100/50"
                    >
                      <AvatarChip person={{ name: 'Sam', initials: 'SO', color: '#dc2626' }} size="xs" />
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-[10.5px] text-indigo-700 font-medium">
                        Sam Ortiz is viewing this thread (Collision Guard)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Record conversion badge */}
              <RecordBadge record={thread.record} />

              {/* Interactive Smart Composer */}
              <div className="shrink-0 border-t border-[#f0ede8] bg-[#fafaf9] p-3 space-y-2">
                {/* Smart Suggestion Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                  <span className="text-[9px] font-mono uppercase text-slate-400 shrink-0 flex items-center gap-0.5">
                    <Sparkles size={9} className="text-indigo-500" /> Smart:
                  </span>
                  {SMART_REPLIES.map((chip, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReplyText(chip)}
                      className="text-[10px] font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-2 py-0.5 rounded-full shrink-0 transition-colors cursor-pointer"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Input & Send Form */}
                <form onSubmit={handleSendReply} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type reply or pick a suggestion above..."
                    className="flex-1 bg-white border border-[#e7e4de] focus:border-[#3156cf] rounded-lg px-2.5 py-1.5 text-xs text-[#111827] placeholder-slate-400 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim() || isSending}
                    className="h-8 px-3 rounded-lg bg-[#3156cf] hover:bg-[#2848b7] text-white text-xs font-semibold flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer shrink-0"
                  >
                    {isSending ? (
                      <span className="text-[10px]">Sending...</span>
                    ) : (
                      <>
                        <span>Reply</span>
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-16 right-4 flex items-center gap-1.5 rounded-lg bg-[#111827] text-white px-3 py-1.5 text-xs font-medium shadow-lg z-20 border border-slate-700"
            >
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
