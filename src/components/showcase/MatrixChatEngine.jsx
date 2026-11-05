import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Shield,
  Bot,
  Copy,
  Check,
  CheckCheck,
  CheckCircle2,
  Code2,
  Users,
  AtSign,
  Terminal,
  ArrowDown,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

const QUICK_EMOJIS = ['👍', '🚀', '❤️', '👀'];

export default function MatrixChatEngine() {
  const {
    activeChannel,
    channels,
    activeMessages,
    sendMessage,
    isAgentTyping,
    proposalStatus,
    approveProposal,
    setActiveModule,
  } = useWorkspace();

  const [inputText, setInputText] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [copiedMsgId, setCopiedMsgId] = useState(null);
  const [userReactions, setUserReactions] = useState({});
  const [showNewMessagesPill, setShowNewMessagesPill] = useState(false);
  const [prevChannel, setPrevChannel] = useState(activeChannel);

  // Synchronously adjust state during render on channel switch (React recommended pattern)
  if (prevChannel !== activeChannel) {
    setPrevChannel(activeChannel);
    setShowNewMessagesPill(false);
  }

  const scrollContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isNearBottomRef = useRef(true);
  const prevMessagesLengthRef = useRef(activeMessages.length);
  const prevChannelRef = useRef(activeChannel);
  const copyTimerRef = useRef(null);
  const copyMsgTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      if (copyMsgTimerRef.current) clearTimeout(copyMsgTimerRef.current);
    };
  }, []);

  const currentChannelObj = channels.find((c) => c.id === activeChannel) || channels[0];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeId(id);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleCopyMessageText = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedMsgId(id);
    if (copyMsgTimerRef.current) clearTimeout(copyMsgTimerRef.current);
    copyMsgTimerRef.current = setTimeout(() => setCopiedMsgId(null), 1800);
  };

  const toggleReaction = (msgId, emoji) => {
    const key = `${msgId}_${emoji}`;
    setUserReactions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Monitor user scroll position: if near bottom (<80px), keep auto-scroll active; if scrolled up, preserve reading position
  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isNear = distanceFromBottom < 80;
    isNearBottomRef.current = isNear;
    if (isNear) {
      setShowNewMessagesPill(false);
    }
  };

  const scrollToBottom = (behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
    setShowNewMessagesPill(false);
    isNearBottomRef.current = true;
  };

  // Guarded auto-scroll: only scrolls if user is near bottom; otherwise reveals "New messages" pill
  useEffect(() => {
    if (activeChannel !== prevChannelRef.current) {
      prevChannelRef.current = activeChannel;
      isNearBottomRef.current = true;
      messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
      return;
    }

    const isNewMessage = activeMessages.length > prevMessagesLengthRef.current;
    prevMessagesLengthRef.current = activeMessages.length;

    if (isNearBottomRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (isNewMessage) {
      setShowNewMessagesPill(true);
    }
  }, [activeMessages, activeChannel, isAgentTyping]);

  return (
    <div className="flex flex-col h-full bg-obsidian-canvas text-slate-200">
      {/* Channel Header Bar */}
      <div className="h-12 px-4 border-b border-obsidian-border bg-obsidian-surface/70 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-slate-400 font-mono text-sm">#</span>
          <span className="font-semibold text-sm text-white truncate">{currentChannelObj.name}</span>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-slate-600" />
          <span className="hidden sm:inline-block text-xs text-slate-400 truncate max-w-xs md:max-w-md">
            {currentChannelObj.topic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Spaces</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 pl-2">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>28</span>
          </span>
        </div>
      </div>

      {/* Message Stream */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-1 font-sans text-xs sm:text-sm relative"
      >
        {activeMessages.map((msg, idx) => {
          const prevMsg = idx > 0 ? activeMessages[idx - 1] : null;
          // Enterprise grouping: consecutive messages from the same sender cluster together
          const isConsecutive =
            prevMsg &&
            prevMsg.sender === msg.sender &&
            !msg.proposalId &&
            !prevMsg.proposalId &&
            !msg.code &&
            !prevMsg.code;

          // Compute reactions with user toggle support
          const allEmojis = Array.from(
            new Set([
              ...Object.keys(msg.reactions || {}),
              ...Object.keys(userReactions)
                .filter((k) => k.startsWith(`${msg.id}_`) && userReactions[k])
                .map((k) => k.replace(`${msg.id}_`, '')),
            ])
          );

          if (isConsecutive) {
            return (
              <div
                key={msg.id}
                className="group/msg relative flex items-start pl-11 pr-2 py-1 -mx-2 rounded-lg transition-colors hover:bg-white/[0.03]"
              >
                {/* Gutter hover timestamp (Slack/Discord convention) */}
                <span className="absolute left-2 top-1 text-[10px] text-slate-500 opacity-0 group-hover/msg:opacity-100 transition-opacity font-mono select-none pointer-events-none">
                  {msg.time}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="text-slate-300 text-xs sm:text-[13px] leading-relaxed break-words">
                    {msg.text}
                  </div>

                  {/* Reaction Badges */}
                  {allEmojis.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {allEmojis.map((emoji) => {
                        const isUserReacted = Boolean(userReactions[`${msg.id}_${emoji}`]);
                        const baseCount = msg.reactions?.[emoji] || 0;
                        const count = baseCount + (isUserReacted ? 1 : 0);
                        if (count <= 0) return null;

                        return (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => toggleReaction(msg.id, emoji)}
                            className={cn(
                              'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] transition-all cursor-pointer select-none',
                              isUserReacted
                                ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-200 shadow-xs'
                                : 'bg-obsidian-base border border-obsidian-border hover:border-slate-600 text-slate-300'
                            )}
                          >
                            <span>{emoji}</span>
                            <span className="font-mono text-[10px] font-semibold">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Floating Quick Action Toolbar */}
                <div className="absolute right-2 -top-3.5 hidden group-hover/msg:flex items-center gap-0.5 bg-obsidian-surface border border-obsidian-border-medium rounded-lg px-1.5 py-0.5 shadow-lg shadow-black/40 z-20">
                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => toggleReaction(msg.id, emoji)}
                      className="p-1 hover:bg-white/10 rounded text-xs transition-colors cursor-pointer"
                      title={`React with ${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                  <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => handleCopyMessageText(msg.text, msg.id)}
                    className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy message"
                  >
                    {copiedMsgId === msg.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={msg.id}
              className="group/msg relative flex items-start gap-3 transition-colors hover:bg-white/[0.03] p-2 rounded-xl -mx-2 mt-2.5 first:mt-0"
            >
              {/* Avatar */}
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white flex-shrink-0 shadow-sm select-none',
                  msg.avatarBg
                )}
              >
                {msg.avatar}
              </div>

              <div className="flex-1 min-w-0 space-y-1.5">
                {/* Header */}
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold text-xs text-white">{msg.sender}</span>
                  {msg.role && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {msg.role}
                    </span>
                  )}
                  {msg.isAgent && (
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold">
                      AUTONOMOUS
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 ml-auto flex items-center gap-1.5">
                    {msg.sender === 'You' && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <CheckCheck className="w-3 h-3 shrink-0" />
                        <span className="hidden sm:inline">Delivered</span>
                      </span>
                    )}
                    <span>{msg.time}</span>
                  </span>
                </div>

                {/* Text */}
                <div className="text-slate-300 text-xs sm:text-[13px] leading-relaxed break-words">
                  {msg.text}
                </div>

                {/* Code snippet if present */}
                {msg.code && (
                  <div className="mt-2 rounded-lg bg-obsidian-base border border-obsidian-border overflow-hidden font-mono text-xs">
                    <div className="px-3 py-1.5 bg-obsidian-surface/80 border-b border-obsidian-border-soft flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1.5 text-indigo-300">
                        <Code2 className="w-3.5 h-3.5 text-indigo-400" /> redis.sentinel.conf
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCode(msg.code, msg.id)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                      >
                        {copiedCodeId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3 text-indigo-200 overflow-x-auto text-[11px] leading-relaxed">
                      <code>{msg.code}</code>
                    </pre>
                  </div>
                )}

                {/* Embedded Ukin Action Proposal Card if present */}
                {msg.proposalId && (
                  <div className="mt-3 p-3.5 rounded-xl border border-indigo-500/30 bg-obsidian-surface/90 shadow-lg shadow-indigo-500/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-indigo-400" />
                        <span className="font-semibold text-xs text-white">Action Proposal #prop_9812</span>
                      </div>
                      <span
                        className={cn(
                          'text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold',
                          proposalStatus === 'approved'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                        )}
                      >
                        {proposalStatus === 'approved' ? '✓ Approved & Executed' : 'Awaiting Confirmation'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-snug">
                      Revert caching regression and bump TTL to 3600s in EU-West-1. Syncs task status to Sprint 24 Kanban and updates Living Doc RFC.
                    </p>

                    <div className="flex items-center gap-2 pt-1 border-t border-obsidian-border-soft text-[11px]">
                      {proposalStatus === 'approved' ? (
                        <div className="flex items-center justify-between w-full text-emerald-400">
                          <span className="flex items-center gap-1.5 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Deployed to cluster-eu-04 (10:43 AM)
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveModule('docs')}
                            className="text-xs font-mono text-indigo-300 hover:text-indigo-200 underline cursor-pointer"
                          >
                            View Linked RFC →
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 w-full">
                          <button
                            type="button"
                            onClick={approveProposal}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve &amp; Execute (1-Click)
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveModule('docs')}
                            className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-obsidian-border cursor-pointer"
                          >
                            Inspect RFC
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Reaction Badges */}
                {allEmojis.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {allEmojis.map((emoji) => {
                      const isUserReacted = Boolean(userReactions[`${msg.id}_${emoji}`]);
                      const baseCount = msg.reactions?.[emoji] || 0;
                      const count = baseCount + (isUserReacted ? 1 : 0);
                      if (count <= 0) return null;

                      return (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => toggleReaction(msg.id, emoji)}
                          className={cn(
                            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] transition-all cursor-pointer select-none',
                            isUserReacted
                              ? 'bg-indigo-500/20 border border-indigo-500/50 text-indigo-200 shadow-xs'
                              : 'bg-obsidian-base border border-obsidian-border hover:border-slate-600 text-slate-300'
                          )}
                        >
                          <span>{emoji}</span>
                          <span className="font-mono text-[10px] font-semibold">{count}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Floating Quick Action Toolbar */}
              <div className="absolute right-2 -top-3.5 hidden group-hover/msg:flex items-center gap-0.5 bg-obsidian-surface border border-obsidian-border-medium rounded-lg px-1.5 py-0.5 shadow-lg shadow-black/40 z-20">
                {QUICK_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => toggleReaction(msg.id, emoji)}
                    className="p-1 hover:bg-white/10 rounded text-xs transition-colors cursor-pointer"
                    title={`React with ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
                <div className="w-[1px] h-3 bg-white/10 mx-0.5" />
                <button
                  type="button"
                  onClick={() => handleCopyMessageText(msg.text, msg.id)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy message"
                >
                  {copiedMsgId === msg.id ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}

        {/* Real Product Typing Indicator */}
        {isAgentTyping && (
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-obsidian-surface/80 border border-obsidian-border text-xs w-fit shadow-xs animate-in fade-in duration-200">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-xs text-white">Ukin Agent</span>
            <span className="text-slate-400 text-xs">is analyzing workspace telemetry</span>
            <span className="inline-flex items-center gap-1 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
            </span>
          </div>
        )}

        {/* Floating New Messages Pill (Slack/Linear/Discord pattern) */}
        {showNewMessagesPill && (
          <div className="sticky bottom-2 flex justify-center z-30 pointer-events-none">
            <button
              type="button"
              onClick={() => scrollToBottom('smooth')}
              aria-label="Scroll to newest messages"
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-black/50 border border-indigo-400/30 transition-all cursor-pointer active:scale-95"
            >
              <ArrowDown className="w-3.5 h-3.5" />
              <span>New messages below</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 border-t border-obsidian-border-soft bg-obsidian-base/60 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex-shrink-0">
          QUICK SIM:
        </span>
        <button
          type="button"
          onClick={() => sendMessage('@ukin run cluster latency diagnostic')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-600/30 text-indigo-300 border border-obsidian-border hover:border-indigo-500/40 text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          @ukin run latency check
        </button>
        <button
          type="button"
          onClick={() => sendMessage('/task create hotfix PR #1042 deployment')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-600/30 text-indigo-300 border border-obsidian-border hover:border-indigo-500/40 text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          /task create hotfix
        </button>
        <button
          type="button"
          onClick={() => sendMessage('Can someone ping Sara on the Huddle call?')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-obsidian-border text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          Ping on Huddle
        </button>
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-obsidian-border bg-obsidian-surface/70 space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            aria-label={`Message #${currentChannelObj.name}`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message #${currentChannelObj.name} or type @ukin for autonomous actions...`}
            className="flex-1 bg-obsidian-base border border-obsidian-border-medium focus:border-indigo-500/60 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-sans"
          />
          <button
            aria-label="Send message"
            type="submit"
            disabled={!inputText.trim()}
            className={cn(
              'p-2.5 rounded-lg transition-all flex items-center justify-center cursor-pointer active:scale-95',
              inputText.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white/5 text-slate-400 cursor-not-allowed'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        {/* Action Accessory Bar */}
        <div className="flex items-center justify-between px-1 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setInputText((prev) => (prev ? `${prev} @ukin ` : '@ukin '))}
              className="inline-flex items-center gap-1 hover:text-indigo-300 transition-colors cursor-pointer"
              title="Mention @ukin"
            >
              <AtSign className="w-3 h-3 text-indigo-400" />
              <span>@ukin</span>
            </button>
            <button
              type="button"
              onClick={() => setInputText((prev) => (prev ? `${prev} /task ` : '/task '))}
              className="inline-flex items-center gap-1 hover:text-indigo-300 transition-colors cursor-pointer"
              title="Run /task command"
            >
              <Terminal className="w-3 h-3 text-indigo-400" />
              <span>/task</span>
            </button>
          </div>
          <span className="hidden sm:inline text-[10px] text-slate-500">
            Press <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">↵ Enter</kbd> to send
          </span>
        </div>
      </form>
    </div>
  );
}
