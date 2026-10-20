import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Shield,
  Bot,
  Copy,
  Check,
  CheckCircle2,
  Code2,
  Users,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';

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
  const [localReactions, setLocalReactions] = useState({});
  const messagesEndRef = useRef(null);

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
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleReaction = (msgId, emoji) => {
    setLocalReactions((prev) => {
      const key = `${msgId}_${emoji}`;
      return { ...prev, [key]: (prev[key] || 0) + 1 };
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, isAgentTyping]);

  return (
    <div className="flex flex-col h-full bg-[#0B0F19] text-slate-200">
      {/* Channel Header Bar */}
      <div className="h-12 px-4 border-b border-white/8 bg-[#0F172A]/70 flex items-center justify-between select-none">
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
            <span className="hidden sm:inline">Megolm E2EE</span>
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 pl-2">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>28</span>
          </span>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs sm:text-sm">
        {activeMessages.map((msg) => (
          <div key={msg.id} className="group flex items-start gap-3 transition-colors hover:bg-white/[0.02] p-2 rounded-xl -mx-2">
            {/* Avatar */}
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white flex-shrink-0 shadow-sm', msg.avatarBg)}>
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
                <span className="text-[10px] text-slate-400 ml-auto">{msg.time}</span>
              </div>

              {/* Text */}
              <div className="text-slate-300 text-xs sm:text-[13px] leading-relaxed break-words">
                {msg.text}
              </div>

              {/* Code snippet if present */}
              {msg.code && (
                <div className="mt-2 rounded-lg bg-[#07090E] border border-white/8 overflow-hidden font-mono text-xs">
                  <div className="px-3 py-1.5 bg-[#0F172A]/80 border-b border-white/6 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1.5 text-indigo-300">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" /> redis.sentinel.conf
                    </span>
                    <button
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
                <div className="mt-3 p-3.5 rounded-xl border border-indigo-500/30 bg-[#0F172A]/90 shadow-lg shadow-indigo-500/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-indigo-400" />
                      <span className="font-semibold text-xs text-white">Action Proposal #prop_9812</span>
                    </div>
                    <span className={cn(
                      'text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold',
                      proposalStatus === 'approved'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                    )}>
                      {proposalStatus === 'approved' ? '✓ Approved & Executed' : 'Awaiting Confirmation'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-snug">
                    Revert caching regression and bump TTL to 3600s in EU-West-1. Syncs task status to Sprint 24 Kanban and updates Living Doc RFC.
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-white/6 text-[11px]">
                    {proposalStatus === 'approved' ? (
                      <div className="flex items-center justify-between w-full text-emerald-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Deployed to cluster-eu-04 (10:43 AM)
                        </span>
                        <button
                          onClick={() => setActiveModule('docs')}
                          className="text-xs font-mono text-indigo-300 hover:text-indigo-200 underline cursor-pointer"
                        >
                          View Linked RFC →
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 w-full">
                        <button
                          onClick={approveProposal}
                          className="flex-1 py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-indigo-500/25 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve & Execute (1-Click)
                        </button>
                        <button
                          onClick={() => setActiveModule('docs')}
                          className="py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs border border-white/8 cursor-pointer"
                        >
                          Inspect RFC
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Reaction Badges */}
              {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                <div className="flex items-center gap-1.5 pt-1">
                  {Object.entries(msg.reactions).map(([emoji, count]) => {
                    const extra = localReactions[`${msg.id}_${emoji}`] || 0;
                    return (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(msg.id, emoji)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#07090E] border border-white/8 hover:border-indigo-500/40 text-[11px] text-slate-300 transition-all cursor-pointer"
                      >
                        <span>{emoji}</span>
                        <span className="font-mono text-[10px] text-slate-400 font-semibold">{count + extra}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isAgentTyping && (
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 animate-pulse">
            <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Ukin Agent is analyzing workspace telemetry and drafting proposal...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="px-4 py-2 border-t border-white/6 bg-[#07090E]/60 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex-shrink-0">
          QUICK SIM:
        </span>
        <button
          onClick={() => sendMessage('@ukin run cluster latency diagnostic')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-600/30 text-indigo-300 border border-white/8 hover:border-indigo-500/40 text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          @ukin run latency check
        </button>
        <button
          onClick={() => sendMessage('/task create hotfix PR #1042 deployment')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-indigo-600/30 text-indigo-300 border border-white/8 hover:border-indigo-500/40 text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          /task create hotfix
        </button>
        <button
          onClick={() => sendMessage('Can someone ping Sara on the Huddle call?')}
          className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/8 text-[11px] flex-shrink-0 transition-all cursor-pointer"
        >
          Ping on Huddle
        </button>
      </div>

      {/* Message Input Box */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/8 bg-[#0F172A]/70 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message #${currentChannelObj.name} or mention @ukin for autonomous execution...`}
          className="flex-1 bg-[#07090E] border border-white/10 focus:border-indigo-500/60 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className={cn(
            'p-2.5 rounded-xl transition-all flex items-center justify-center cursor-pointer',
            inputText.trim()
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
              : 'bg-white/5 text-slate-400 cursor-not-allowed'
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
