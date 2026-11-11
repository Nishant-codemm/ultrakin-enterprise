import React, { useState } from 'react';
import {
  AtSign,
  ArrowRight,
  CheckCircle2,
  Paperclip,
  Radio,
  Rocket,
  Search,
  Send,
  Sparkles,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { useWorkspace } from '../../context/useWorkspace';
import { FOCUS_RING_OBSIDIAN } from '../../lib/interaction';

export default function HeroThreadsView() {
  const {
    activeChannel,
    activeMessages,
    channels,
    setActiveChannel,
    huddleTranscript,
    setActiveModule,
  } = useWorkspace();

  const channel = channels.find((item) => item.id === activeChannel) || channels[0];
  const [reactions, setReactions] = useState({
    msg_1: { thumbs: 3, rocket: 2, reacted: false },
    msg_2: { thumbs: 4, rocket: 1, reacted: true },
    ukin: { thumbs: 5, rocket: 4, reacted: true },
  });
  const [filterQuery, setFilterQuery] = useState('');
  const [replyText, setReplyText] = useState('');

  const toggleReaction = (id, type) => {
    setReactions((prev) => {
      const current = prev[id] || { thumbs: 0, rocket: 0, reacted: false };
      const isReacted = current.reacted;
      return {
        ...prev,
        [id]: {
          ...current,
          [type]: isReacted ? Math.max(0, current[type] - 1) : current[type] + 1,
          reacted: !isReacted,
        },
      };
    });
  };

  const filteredChannels = channels.filter(
    (c) =>
      c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      c.topic.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-[580px] flex-col bg-obsidian-canvas text-slate-200">
      {/* ── Threads Command Header ── */}
      <div className="flex min-h-12 items-center justify-between border-b border-obsidian-border bg-obsidian-surface/70 px-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-300">
            <AtSign className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold tracking-tight text-white">Threads & Discussions</span>
          <span className="hidden items-center gap-1.5 text-[11px] text-obsidian-muted sm:inline-flex">
            · <Radio className="h-2.5 w-2.5 text-emerald-400 animate-pulse" aria-hidden="true" />
            Active Incident Channel
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 font-mono text-[9.5px] font-medium text-emerald-300">
            Zero Data Retention
          </span>
          <span className="font-mono text-[10px] text-obsidian-muted">
            {activeMessages.length + 1} updates
          </span>
        </div>
      </div>

      <div className="grid flex-1 md:grid-cols-[230px_minmax(0,1fr)]">
        {/* ── Left Sidebar: Thread Streams ── */}
        <aside className="flex flex-col border-b border-obsidian-border bg-obsidian-base/70 p-3 md:border-b-0 md:border-r">
          <div className="relative mb-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-obsidian-muted" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter threads…"
              className="w-full rounded-md border border-obsidian-border bg-obsidian-canvas/60 py-1 pl-7 pr-2 text-[11px] text-slate-200 placeholder:text-obsidian-muted/70 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between px-1.5 py-1">
            <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-obsidian-muted">
              Live channels
            </p>
            <span className="font-mono text-[9px] text-obsidian-muted">{filteredChannels.length} active</span>
          </div>

          <div className="space-y-0.5 overflow-y-auto">
            {filteredChannels.map((item) => {
              const isSelected = activeChannel === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveChannel(item.id)}
                  aria-current={isSelected ? 'page' : undefined}
                  className={cn(
                    'group relative w-full rounded-lg px-2.5 py-2 text-left transition-all cursor-pointer',
                    FOCUS_RING_OBSIDIAN,
                    isSelected
                      ? 'bg-indigo-500/15 border-l-2 border-indigo-400 text-indigo-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                      : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="block truncate text-xs font-medium">
                      #{item.name.replaceAll('-', ' ')}
                    </span>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                    )}
                  </div>
                  <span className="mt-0.5 block truncate text-[10px] text-obsidian-muted">
                    {item.topic}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ── Right Content: Thread Discussion Stream ── */}
        <div className="flex flex-col min-w-0 p-4 sm:p-5">
          {/* Thread header */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-obsidian-border pb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                  Connected Stream
                </span>
                <span className="text-obsidian-muted">·</span>
                <span className="font-mono text-[10px] text-obsidian-muted">Channel: #{channel.name}</span>
              </div>
              <h2 className="mt-1 text-sm font-semibold tracking-tight text-white sm:text-base">
                #{channel.name} — Incident Review & Automated Synthesis
              </h2>
              <p className="mt-0.5 text-xs text-obsidian-muted">{channel.topic}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex h-5 items-center gap-1 rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 font-mono text-[9px] text-emerald-200">
                <CheckCircle2 className="h-2.5 w-2.5" /> Context Retained
              </span>
            </div>
          </div>

          {/* Messages scroll river */}
          <div className="mt-4 flex-1 space-y-3.5 overflow-y-auto">
            {activeMessages.map((message) => {
              const msgReactions = reactions[message.id] || { thumbs: 2, rocket: 1, reacted: false };
              return (
                <article
                  key={message.id}
                  className="group relative flex gap-3 rounded-lg p-2 transition-colors hover:bg-white/[0.02]"
                >
                  <span
                    className={cn(
                      'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-semibold text-white shadow-xs',
                      message.avatarBg,
                    )}
                  >
                    {message.avatar}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-xs font-medium text-white">{message.sender}</span>
                      <span className="font-mono text-[9.5px] text-obsidian-muted">{message.time}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-300">{message.text}</p>

                    {/* Reaction Bar */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleReaction(message.id, 'thumbs')}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-medium transition-all cursor-pointer',
                          msgReactions.reacted
                            ? 'border-indigo-400/40 bg-indigo-500/15 text-indigo-200'
                            : 'border-white/10 bg-white/[0.03] text-obsidian-muted hover:text-slate-200',
                        )}
                      >
                        <ThumbsUp className="h-2.5 w-2.5" />
                        <span>{msgReactions.thumbs}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleReaction(message.id, 'rocket')}
                        className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[9.5px] font-medium text-obsidian-muted hover:text-slate-200 transition-all cursor-pointer"
                      >
                        <Rocket className="h-2.5 w-2.5" />
                        <span>{msgReactions.rocket}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Ukin Autonomous Agent Action Card */}
            <article className="relative overflow-hidden rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-500/[0.07] via-violet-500/[0.02] to-transparent p-3.5 shadow-[0_4px_16px_rgba(139,92,246,0.06)]">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-[10px] font-bold text-violet-200 ring-1 ring-violet-400/30">
                  UK
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">Ukin Kernel</span>
                      <span className="inline-flex items-center gap-1 rounded bg-violet-400/15 px-1.5 py-0.5 font-mono text-[9px] font-medium text-violet-200">
                        <Sparkles className="h-2 w-2" /> AI Synthesis Engine
                      </span>
                    </div>
                    <span className="font-mono text-[9.5px] text-obsidian-muted">
                      {huddleTranscript.at(-1)?.time || '10:42 AM'}
                    </span>
                  </div>

                  <p className="mt-1.5 text-xs leading-5 text-slate-300">
                    {huddleTranscript.find((entry) => entry.isAgent)?.text ||
                      'Huddle audio commitments have been synchronized with the live thread. 3 follow-up actions dispatched to Linear.'}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-violet-400/15">
                    <span className="font-mono text-[9px] text-violet-200/80">
                      SLA: 99.99% Target Protected · Recovery: 3.4m
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveModule('huddle')}
                      className="ml-auto inline-flex items-center gap-1 font-mono text-[9.5px] font-medium text-indigo-300 hover:text-indigo-200 transition-colors cursor-pointer"
                    >
                      Inspect Huddle Transcript <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Quick reply bar dock */}
          <div className="mt-4 border-t border-obsidian-border pt-3">
            <div className="flex items-center gap-2 rounded-xl border border-obsidian-border bg-obsidian-base/60 p-2 focus-within:border-indigo-400/40">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-obsidian-muted hover:text-slate-200 cursor-pointer">
                <Paperclip className="h-3.5 w-3.5" />
              </span>
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder={`Reply in #${channel.name}… (Markdown supported)`}
                className="flex-1 bg-transparent text-xs text-slate-200 placeholder:text-obsidian-muted/60 focus:outline-none"
              />
              <span className="hidden font-mono text-[9px] text-obsidian-muted sm:inline-block">
                ⌘ ↵
              </span>
              <button
                type="button"
                onClick={() => {
                  if (replyText.trim()) setReplyText('');
                }}
                aria-label="Send reply"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-500 cursor-pointer"
              >
                <Send className="h-3 w-3" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-obsidian-muted">
              <span>Messages & meeting commitments stay in one reviewable thread.</span>
              <button
                type="button"
                onClick={() => setActiveModule('chat')}
                className="text-indigo-300 hover:text-indigo-200 transition-colors cursor-pointer"
              >
                Open in Full Chat Engine →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
