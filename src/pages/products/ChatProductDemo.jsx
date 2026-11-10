/**
 * ChatProductDemo.jsx
 * High fidelity Chat demo for /products/chat
 * Product-page preview: a deterministic sample conversation showing how a
 * message can carry context into a tracked task.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Hash, CheckCircle2, Bookmark, Sparkles, Mail } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import { CHAT_DATA } from '../../data/productPageData';

export default function ChatProductDemo() {
  const reduceMotion = useReducedMotion();
  const [activeChannelId, setActiveChannelId] = useState('support');

  const activeChannel = CHAT_DATA.channels.find((c) => c.id === activeChannelId) || CHAT_DATA.channels[0];
  const channelMessages = CHAT_DATA.messages[activeChannelId] || [];

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
                    type="button"
                    onClick={() => setActiveChannelId(ch.id)}
                    aria-pressed={isActive}
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
                  className="flex items-center gap-2 px-2 py-1 rounded-md text-xs text-slate-400"
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
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {activeChannel.members || 12} members
          </span>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          <AnimatePresence initial={false}>
            {channelMessages.map((msg, index) => (
              <motion.div
                key={`${activeChannelId}-${msg.id}`}
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
                    msg.from?.name === 'Ukin' ? (
                      <div className="mt-1 rounded-lg border border-indigo-400/20 bg-indigo-500/[0.07] px-3 py-2.5">
                        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-indigo-300">
                          <Sparkles size={11} />
                          <span>Ukin</span>
                          <span className="text-slate-500">· workspace context</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed text-[12.5px] whitespace-pre-wrap">{msg.text}</p>
                        {msg.source && (
                          <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-md border border-white/[0.08] bg-black/20 px-2 py-1 text-[10px] text-slate-400">
                            <Mail size={11} className="shrink-0 text-indigo-300" />
                            <span className="truncate">Source · {msg.source}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-slate-300 leading-relaxed text-[12.5px] whitespace-pre-wrap">{msg.text}</p>
                    )
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
                          Tracked from this conversation
                        </span>
                        <span className="font-medium text-slate-200">{msg.task.title}</span>
                        {msg.task.assignee && (
                          <span className="mt-1 block text-[10px] text-slate-400">
                            Owner · {msg.task.assignee.name}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                        {msg.task.status}
                      </span>
                    </div>
                  )}

                  <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                    {msg.reaction && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] text-slate-300">
                        <span>{msg.reaction.emoji}</span>
                        <span className="font-mono text-[10px] tabular-nums">{msg.reaction.count}</span>
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Read-only composer keeps the product preview grounded as a sample UI. */}
        <div aria-hidden="true" className="p-3 border-t border-white/[0.08] bg-[#07090E]">
          <div className="rounded-xl bg-white/[0.05] border border-white/[0.1] px-3 py-2 text-xs text-slate-500">
            Message #{activeChannel.name}…
          </div>
        </div>
      </div>
    </div>
  );
}
