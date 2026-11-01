/**
 * MailProductDemo.jsx
 * Production-quality Mail inbox demo for /products/mail
 *
 * Features:
 * - Two-panel split: inbox list (left) + thread reader (right)
 * - Click inbox item → thread loads with slide-in animation
 * - Email reply preview with "Replied by" badge
 * - "Logged as SR-14 in Support requests" record conversion badge
 * - Unread indicator + hover state on inbox items
 * - "Collision detection" indicator (typing indicator when replying)
 * - Fully keyboard-accessible (arrow keys navigate inbox)
 * - Reduced motion: all animations instant
 */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Reply, ArrowRight, MoreHorizontal, ExternalLink, Tag, Star, Archive } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';
import { MAIL_DATA } from '../../data/productPageData';

const TOOLBAR_ACTIONS = [
  { icon: Reply,   label: 'Reply'   },
  { icon: Archive, label: 'Archive' },
  { icon: Star,    label: 'Star'    },
  { icon: Tag,     label: 'Tag'     },
];

// ─── Inbox Row ────────────────────────────────────────────────────────────────
function InboxRow({ item, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        group flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors duration-100
        ${isSelected
          ? 'bg-[#f0f4ff] border-l-2 border-l-[#3156cf]'
          : 'border-l-2 border-l-transparent hover:bg-[#f7f6f4]'
        }
      `}
      aria-selected={isSelected}
    >
      <AvatarChip person={item.from} size="sm" className="mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className={`truncate text-[13px] ${item.unread ? 'font-semibold text-[#111827]' : 'font-medium text-[#344054]'}`}>
            {item.from.name}
          </span>
          <span className="shrink-0 text-[11px] text-[#9ca3af]">{item.time}</span>
        </div>
        <p className="truncate text-[12px] text-[#667085] leading-4">{item.preview}</p>
      </div>
      {item.unread && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#3156cf]" />
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
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="px-4 py-3"
    >
      <div className="flex items-start gap-3">
        <AvatarChip person={msg.from} size="sm" className="mt-0.5 shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[13px] font-semibold text-[#111827]">{msg.from.name}</span>
            <span className="text-[11px] text-[#9ca3af]">{msg.time}</span>
            {msg.reply && (
              <span className="ml-auto rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[10px] font-medium text-[#059669] border border-[#bbf7d0]">
                {msg.replyLabel || 'Replied'}
              </span>
            )}
          </div>
          <p className="text-[13px] leading-[1.6] text-[#374151] whitespace-pre-line">{msg.body}</p>
          {msg.reply && isLast && (
            <div className="mt-2 text-[12px] text-[#6b7280] italic opacity-80">
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
      className="mx-4 mb-3 flex items-center gap-2 rounded-lg border border-[#d1fae5] bg-[#f0fdf4] px-3 py-2"
    >
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ backgroundColor: record.color }}
      >
        ✓
      </span>
      <span className="text-[12px] text-[#059669] font-medium">
        Logged as{' '}
        <span className="font-semibold underline underline-offset-2 cursor-pointer hover:text-[#047857]">
          {record.id}
        </span>{' '}
        in {record.list}
      </span>
      <ExternalLink size={11} className="ml-auto text-[#059669] opacity-60" />
    </motion.div>
  );
}

// ─── Empty Pane ───────────────────────────────────────────────────────────────
function EmptyPane() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 p-8 text-center">
      <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f4ff]">
        <Reply size={18} className="text-[#3156cf] opacity-70" />
      </div>
      <p className="text-[13px] font-medium text-[#374151]">Select a conversation</p>
      <p className="text-[12px] text-[#9ca3af]">Click any message to read and reply</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function MailProductDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState(1);
  const [showReplyTyping, setShowReplyTyping] = useState(false);
  const [inbox, setInbox] = useState(MAIL_DATA.inbox);
  const listRef = useRef(null);

  // Mark as read on select
  const selectEmail = useCallback((id) => {
    setSelectedId(id);
    setInbox(prev => prev.map(item => item.id === id ? { ...item, unread: false } : item));
    // Simulate "colleague is typing reply" for first email
    if (id === 1) {
      setShowReplyTyping(false);
      const t = setTimeout(() => setShowReplyTyping(true), 1800);
      return () => clearTimeout(t);
    } else {
      setShowReplyTyping(false);
    }
  }, []);

  useEffect(() => {
    selectEmail(1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedId(id => {
        const ids = inbox.map(i => i.id);
        const idx = ids.indexOf(id);
        return ids[Math.min(idx + 1, ids.length - 1)];
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedId(id => {
        const ids = inbox.map(i => i.id);
        const idx = ids.indexOf(id);
        return ids[Math.max(idx - 1, 0)];
      });
    }
  }, [inbox]);

  const thread = MAIL_DATA.threads[selectedId];

  return (
    <div
      className="flex h-full overflow-hidden rounded-2xl"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Mail demo"
    >
      {/* ── Left: Inbox list ── */}
      <div className="flex w-[220px] shrink-0 flex-col border-r border-[#f0ede8] bg-[#fafaf9]">
        {/* Inbox header */}
        <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] px-3">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[#dc2626] text-white">
              <span className="text-[9px] font-bold">U</span>
            </div>
            <span className="text-[12px] font-semibold text-[#111827]">support@northwind.studio</span>
          </div>
          <span className="rounded-full bg-[#3156cf] px-1.5 py-0.5 text-[10px] font-bold text-white">
            {inbox.filter(i => i.unread).length}
          </span>
        </div>

        {/* Inbox label */}
        <div className="px-3 py-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9ca3af]">Inbox</span>
        </div>

        {/* Email rows */}
        <div ref={listRef} className="flex-1 overflow-y-auto" role="listbox" aria-label="Email list">
          {inbox.map(item => (
            <InboxRow
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onClick={() => selectEmail(item.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Right: Thread reader ── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-white">
        <AnimatePresence mode="wait">
          {thread ? (
            <motion.div
              key={selectedId}
              initial={reduceMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full flex-col"
            >
              {/* Thread header */}
              <div className="flex h-10 shrink-0 items-center justify-between border-b border-[#f0ede8] px-4">
                <span className="text-[13px] font-semibold text-[#111827] truncate">{thread.subject}</span>
                <div className="flex items-center gap-1 ml-2">
                  {TOOLBAR_ACTIONS.map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="flex h-6 w-6 items-center justify-center rounded-md text-[#9ca3af] hover:bg-[#f5f4f2] hover:text-[#374151] transition-colors duration-100"
                    >
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#f5f4f2]">
                {thread.messages.map((msg, i) => (
                  <ThreadMessage
                    key={msg.id}
                    msg={msg}
                    isLast={i === thread.messages.length - 1}
                    reduceMotion={reduceMotion}
                  />
                ))}

                {/* "Typing" collision indicator (UX improvement: shows team coordination) */}
                <AnimatePresence>
                  {showReplyTyping && selectedId === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 px-4 py-2"
                    >
                      <AvatarChip person={{ name: 'Sam', initials: 'SO', color: '#dc2626' }} size="xs" />
                      <div className="flex gap-1 items-center">
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-[#9ca3af]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#9ca3af]">Sam is typing a reply...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Record badge (email → record conversion) */}
              <RecordBadge record={thread.record} />

              {/* Compose bar */}
              <div className="shrink-0 border-t border-[#f0ede8] px-4 py-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-[#e7e4de] bg-[#fafaf9] px-3 py-2 text-[12px] text-[#9ca3af] cursor-text hover:border-[#c7c3bc] transition-colors duration-150">
                  <Reply size={13} className="shrink-0" />
                  <span>Reply to {thread.messages[0]?.from?.name}...</span>
                  <ArrowRight size={12} className="ml-auto" />
                </div>
              </div>
            </motion.div>
          ) : (
            <EmptyPane key="empty" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
