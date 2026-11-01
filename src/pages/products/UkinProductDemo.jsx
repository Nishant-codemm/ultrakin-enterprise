/**
 * UkinProductDemo.jsx
 * Contextual Workspace AI Super-Agent preview for /products/ukin
 * Features:
 * - Conversational AI interface showing grounded workspace context recall
 * - Citations & provenance chips linking directly to source channels (#launch-planning) and Docs
 * - Pre-generated draft actions (Email follow-up to Maya Chen)
 * - Interactive input prompt: user can send real questions and receive animated responses with sources!
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, Send, Hash, FileText, CheckCircle2, ArrowRight, CornerDownLeft } from 'lucide-react';
import TypewriterText from '../../components/product/TypewriterText';
import { UKIN_DATA } from '../../data/productPageData';

export default function UkinProductDemo() {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState(UKIN_DATA.initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim().toLowerCase();
    const userMsg = { id: Date.now(), role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = UKIN_DATA.cannedResponses.default;
      let sources = [{ label: '#general', type: 'channel' }];

      if (userText.includes('meeting') || userText.includes('call')) {
        replyText = UKIN_DATA.cannedResponses.meeting;
        sources = [{ label: 'Quarterly client review', type: 'doc' }];
      } else if (userText.includes('summary')) {
        replyText = UKIN_DATA.cannedResponses.summary;
        sources = [{ label: '#support-ops', type: 'channel' }];
      } else if (userText.includes('status') || userText.includes('refund') || userText.includes('sr-14')) {
        replyText = UKIN_DATA.cannedResponses.status;
        sources = [{ label: 'SR-14', type: 'record' }];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'ai',
          text: replyText,
          sources,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden relative">
      {/* Header */}
      <div className="h-10 shrink-0 border-b border-white/[0.08] bg-[#0B0F19] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-purple-600/30 text-purple-300 border border-purple-500/40 flex items-center justify-center">
            <Sparkles size={12} />
          </div>
          <span className="text-xs font-bold text-slate-100">Ukin Workspace Intelligence</span>
        </div>
        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
          Grounded Context
        </span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-[#0F172A] border border-white/[0.08] text-slate-200'
              }`}
            >
              {msg.role === 'ai' && (
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 mb-1">
                  <Sparkles size={11} /> Ukin Response
                </div>
              )}

              <p className="whitespace-pre-wrap">{msg.text}</p>

              {/* Draft snippet if present */}
              {msg.draft && (
                <div className="mt-2 p-2.5 rounded-lg bg-black/40 border border-white/[0.08] text-[11px] text-slate-300 font-sans space-y-1">
                  <div className="text-[10px] font-mono text-slate-400">To: {msg.draft.to}</div>
                  <div className="text-[10px] font-mono text-slate-400">Subject: {msg.draft.subject}</div>
                  <div className="mt-1 pt-1 border-t border-white/[0.06] whitespace-pre-line text-slate-200">
                    {msg.draft.body}
                  </div>
                </div>
              )}

              {/* Provenance source chips */}
              {msg.sources && (
                <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-mono text-slate-400">Sources:</span>
                  {msg.sources.map((s, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono text-indigo-300 hover:bg-white/[0.1] cursor-pointer"
                    >
                      {s.type === 'channel' ? <Hash size={9} /> : <FileText size={9} />}
                      {s.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-purple-400 p-2">
            <Sparkles size={12} className="animate-spin" />
            <span className="font-mono text-[11px]">Searching channels & documents...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/[0.08] bg-[#0B0F19]">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.1] px-3 py-2 focus-within:border-purple-500/50 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Ukin anything (e.g. 'summary', 'meeting', 'status')..."
            className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send size={12} />
          </button>
        </div>
      </form>
    </div>
  );
}
