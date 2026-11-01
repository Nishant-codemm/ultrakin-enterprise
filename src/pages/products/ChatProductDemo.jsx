/**
 * ChatProductDemo.jsx
 * High fidelity Chat demo for /products/chat
 * Tier-1 Production Upgrades:
 * - Live collaborator typing indicator with 3 phase-delayed bouncing wave dots
 * - Interactive emoji reaction dock on message hover (+, 👍, ❤️, 🚀, 👀)
 * - Spring-loaded reaction counter increments with micro-bounce
 * - Dynamic Decision Captured and Linked Task cards
 * - Respects useReducedMotion
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Hash, Send, Smile, Paperclip, CheckCircle2, Bookmark, ArrowRight, Plus } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import { CHAT_DATA, PERSONAS } from '../../data/productPageData';

const EMOJI_PALETTE = ['👍', '❤️', '🚀', '👀', '🎉'];

export default function ChatProductDemo() {
  const reduceMotion = useReducedMotion();
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messages, setMessages] = useState(CHAT_DATA.messages);
  const [inputText, setInputText] = useState('');
  const [reactions, setReactions] = useState({});
  const [isColleagueTyping, setIsColleagueTyping] = useState(false);
  const [activeHoverMessageId, setActiveHoverMessageId] = useState(null);
  const messagesEndRef = useRef(null);

  const activeChannel = CHAT_DATA.channels.find((c) => c.id === activeChannelId) || CHAT_DATA.channels[0];
  const channelMessages = messages[activeChannelId] || [];

  // Simulate periodic typing from team member
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsColleagueTyping(true);
      const stopTimer = setTimeout(() => setIsColleagueTyping(false), 3800);
      return () => clearTimeout(stopTimer);
    }, 2800);

    return () => clearTimeout(timer);
  }, [activeChannelId]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now(),
      from: { name: 'You', initials: 'ME', color: '#3156cf', role: 'Product Lead' },
      text: inputText.trim(),
      time: 'Just now',
      type: 'text',
    };

    setMessages((prev) => ({
      ...prev,
      [activeChannelId]: [...(prev[activeChannelId] || []), newMsg],
    }));
    setInputText('');
  };

  const addReaction = (msgId, emoji) => {
    const key = `${msgId}_${emoji}`;
    setReactions((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));
    setActiveHoverMessageId(null);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [channelMessages.length, isColleagueTyping]);

  return (
    <div className="flex h-full w-full overflow-hidden bg-[#0B0F19] text-slate-200 select-none">
      {/* ── Unified Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="chat" theme="dark" />

      {/* ── Left Sidebar (Channels & DMs) ── */}
      <div className="hidden xs:flex w-[140px] sm:w-[190px] shrink-0 border-r border-white/[0.08] bg-[#07090E] flex flex-col justify-between p-3">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Channels</span>
              <span className="text-[10px] text-slate-500 font-mono">4</span>
            </div>
            <div className="space-y-0.5">
              {CHAT_DATA.channels.map((ch) => {
                const isActive = ch.id === activeChannelId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannelId(ch.id)}
                    className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg text-left text-xs transition-colors duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600/25 text-indigo-300 font-semibold border border-indigo-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Hash size={13} className={isActive ? 'text-indigo-400' : 'text-slate-500'} />
                      <span className="truncate">{ch.name}</span>
                    </span>
                    {ch.unread > 0 && !isActive && (
                      <span className="flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white tabular-nums">
                        {ch.unread}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="px-2 mb-1.5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Direct Messages</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-1">
              {CHAT_DATA.dms.map((dm) => (
                <div
                  key={dm.id}
                  className="flex items-center gap-2 px-2 py-1 rounded-md text-xs text-slate-400 hover:text-slate-200 hover:bg-white/[0.03] cursor-pointer"
                >
                  <AvatarChip person={dm.person} size="xs" online={dm.online} />
                  <span className="truncate">{dm.person.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* User profile mini footer */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/[0.08] px-1">
          <AvatarChip person={{ name: 'You', initials: 'ME', color: '#3156cf' }} size="xs" online />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium text-slate-200 truncate">Your Workspace</p>
            <p className="text-[10px] text-emerald-400 font-mono">Connected</p>
          </div>
        </div>
      </div>

      {/* ── Main Message Pane ── */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#0B0F19]">
        {/* Header */}
        <div className="h-10 shrink-0 border-b border-white/[0.08] flex items-center justify-between px-4 bg-[#0B0F19]/90 backdrop-blur">
          <div className="flex items-center gap-2">
            <Hash size={14} className="text-indigo-400" />
            <span className="text-xs font-semibold text-slate-100">{activeChannel.name}</span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              · {activeChannel.members || 12} members
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            ● Decisions Synced
          </span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          <AnimatePresence initial={false}>
            {channelMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                onMouseEnter={() => setActiveHoverMessageId(msg.id)}
                onMouseLeave={() => setActiveHoverMessageId(null)}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group relative flex items-start gap-3 text-xs p-1 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                {msg.from ? (
                  <AvatarChip person={msg.from} size="sm" className="mt-0.5 shrink-0" />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shrink-0">
                    <Bookmark size={13} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {msg.from && (
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-slate-200 text-[12px]">{msg.from.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono tabular-nums">{msg.time}</span>
                    </div>
                  )}

                  {msg.type === 'text' && (
                    <p className="text-slate-300 leading-relaxed text-[12.5px] whitespace-pre-wrap">{msg.text}</p>
                  )}

                  {msg.type === 'decision' && (
                    <div className="mt-1 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-200 text-xs flex items-start gap-2 shadow-xs">
                      <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-emerald-300 block mb-0.5">Decision Captured</span>
                        <span>{msg.text}</span>
                        <div className="mt-1 text-[10px] text-emerald-400/70 font-mono">
                          Saved by {msg.author?.name || 'Sam'} · Synced to Docs
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.type === 'event_card' && (
                    <div className="mt-1 p-2.5 rounded-xl border border-indigo-500/30 bg-indigo-950/20 text-indigo-200 text-xs shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-semibold text-indigo-300">{msg.event.title}</span>
                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
                          RSVP
                        </span>
                      </div>
                      <p className="text-slate-400 text-[11px] mb-2">{msg.event.time}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">Attendees:</span>
                        <div className="flex -space-x-1.5">
                          {msg.event.going.map((p, i) => (
                            <AvatarChip key={i} person={p} size="xs" showRing />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.type === 'task' && (
                    <div className="mt-1 p-2.5 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-200 text-xs flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                          Generated Task
                        </span>
                        <span className="font-medium text-slate-200">{msg.task.title}</span>
                      </div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                        {msg.task.status}
                      </span>
                    </div>
                  )}

                  {/* Emoji Reactions Badges */}
                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    {msg.reaction && (
                      <button
                        onClick={() => addReaction(msg.id, msg.reaction.emoji)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-[11px] text-slate-300 transition-colors cursor-pointer"
                      >
                        <span>{msg.reaction.emoji}</span>
                        <span className="font-mono text-[10px] tabular-nums">
                          {msg.reaction.count + (reactions[`${msg.id}_${msg.reaction.emoji}`] || 0)}
                        </span>
                      </button>
                    )}

                    {/* Any dynamically added reactions */}
                    {EMOJI_PALETTE.map((emoji) => {
                      const count = reactions[`${msg.id}_${emoji}`];
                      if (!count || (msg.reaction && msg.reaction.emoji === emoji)) return null;
                      return (
                        <motion.button
                          key={emoji}
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          onClick={() => addReaction(msg.id, emoji)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-[11px] text-indigo-200 transition-colors cursor-pointer"
                        >
                          <span>{emoji}</span>
                          <span className="font-mono text-[10px] tabular-nums">{count}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Micro Hover Reaction Dock */}
                <AnimatePresence>
                  {activeHoverMessageId === msg.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 4 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute right-2 -top-2 flex items-center gap-1 bg-[#1E293B] border border-white/[0.12] rounded-full px-1.5 py-0.5 shadow-md z-10"
                    >
                      {EMOJI_PALETTE.map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addReaction(msg.id, emoji)}
                          className="hover:scale-125 transition-transform text-xs p-1 cursor-pointer"
                          title={`React with ${emoji}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Live Colleague Typing Wave Indicator */}
          <AnimatePresence>
            {isColleagueTyping && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-xs text-slate-400 pl-1"
              >
                <AvatarChip person={PERSONAS.priya} size="xs" />
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                  <span className="text-[10.5px] font-mono text-indigo-300 ml-1">Priya is drafting a reply...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-white/[0.08] bg-[#07090E]">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.1] px-3 py-2 focus-within:border-indigo-500/50 transition-colors">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message #${activeChannel.name}...`}
              className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all cursor-pointer"
            >
              <Send size={12} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
