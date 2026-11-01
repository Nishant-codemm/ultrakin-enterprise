/**
 * CustomerSupportSolutionDemo.jsx
 * Interactive demo for /solutions/customer-support ("Customer support")
 * Recreates the verified Ultrakin workflow:
 * Inbound Support Email -> Collision Detection -> Team Escalation -> Logged as SR-14 Record.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Send,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Bot,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function CustomerSupportSolutionDemo() {
  const [isLogged, setIsLogged] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState([
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
  ]);
  const [showToast, setShowToast] = useState(false);

  const handleSendReply = (e) => {
    e?.preventDefault();
    if (!replyText.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        from: { name: 'Sam Ortiz', initials: 'SO', color: '#dc2626', role: 'Support' },
        time: 'Just now',
        replyLabel: 'Replied just now',
        body: replyText,
      },
    ]);
    setReplyText('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleToggleLog = () => {
    setIsLogged(!isLogged);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-xs select-none font-sans relative">
      {/* ─── Workspace App Rail ─────────────────────────────────────────── */}
      <div className="flex w-12 flex-col items-center border-r border-[#e5e2dc] bg-[#1a1d21] py-3 gap-2 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ef4444] text-white font-bold text-xs shadow-sm">
          U
        </div>
        <div className="h-px w-6 bg-white/10 my-1" />
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 text-white cursor-pointer shadow-inner">
          <Mail size={14} />
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 cursor-pointer">
          <MessageSquare size={14} />
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 cursor-pointer">
          <AlertCircle size={14} />
        </div>
      </div>

      {/* ─── Inbox List ──────────────────────────────────────────────────────── */}
      <div className="flex w-48 flex-col border-r border-[#e5e2dc] bg-[#faf9f7] shrink-0">
        <div className="border-b border-[#e5e2dc] px-3 py-2.5 bg-white">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Shared Mailbox</p>
          <p className="text-xs font-semibold text-[#111827] truncate">support@northwind.shop</p>
        </div>

        <div className="divide-y divide-[#f0ede8] overflow-y-auto">
          {/* Active row */}
          <div className="bg-[#fff5f5] border-l-2 border-[#ef4444] p-2.5 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#111827]">Elena Rostova</span>
              <span className="text-[10px] text-[#ef4444] font-medium">9:04 AM</span>
            </div>
            <p className="text-[11px] font-medium text-[#111827] truncate mt-0.5">Webhook 504 Gateway Timeout</p>
            <p className="text-[10px] text-[#6b7280] truncate mt-0.5">Our production webhook failed 3 times...</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
              <span className="text-[9px] font-semibold text-[#ef4444] uppercase tracking-wide">Priya drafting</span>
            </div>
          </div>

          <div className="p-2.5 hover:bg-white/80 cursor-pointer text-[#6b7280]">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#374151]">Marcus Vance</span>
              <span className="text-[10px]">Yesterday</span>
            </div>
            <p className="text-[11px] text-[#4b5563] truncate mt-0.5">Annual invoice review request</p>
            <p className="text-[10px] text-[#9ca3af] truncate mt-0.5">Can we schedule a 10 min sync...</p>
          </div>

          <div className="p-2.5 hover:bg-white/80 cursor-pointer text-[#6b7280]">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#374151]">Lumen Health</span>
              <span className="text-[10px]">Yesterday</span>
            </div>
            <p className="text-[11px] text-[#4b5563] truncate mt-0.5">SSO provisioning query</p>
            <p className="text-[10px] text-[#9ca3af] truncate mt-0.5">Okta SAML assertion metadata attached</p>
          </div>
        </div>
      </div>

      {/* ─── Thread & Record Workflow ────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-white">
        {/* Header Bar with Collision & Escalation */}
        <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-[#fdfcfb] px-4 py-2.5 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Webhook 504 Gateway Timeout</span>
              <span className="rounded bg-[#fee2e2] px-1.5 py-0.5 text-[10px] font-semibold text-[#b91c1c]">
                P0 SLA · 15m
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">Order #4821 · support@northwind.shop</p>
          </div>

          {/* Connected Record Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleLog}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer ${
                isLogged
                  ? 'border border-[#bbf7d0] bg-[#f0fdf4] text-emerald-800 shadow-2xs'
                  : 'border border-[#e5e2dc] bg-white text-[#4b5563] hover:bg-[#f3f1ed]'
              }`}
            >
              <CheckCircle2 size={12} className={isLogged ? 'text-emerald-600' : 'text-slate-400'} />
              <span>{isLogged ? 'Logged as SR-14 in Support requests' : '+ Log as Support Request'}</span>
            </button>
          </div>
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

          {/* AI Assist Suggestion Bar */}
          <div className="rounded-lg border border-[#e0e7ff] bg-[#f5f7ff] p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={13} className="text-[#6366f1]" />
              <span className="text-[11px] text-[#3730a3]">
                Ukin drafted reply: Verified webhook retry queue cleared at 9:15 AM.
              </span>
            </div>
            <button
              onClick={() => setReplyText('Verified webhook retry queue cleared at 9:15 AM. Retries now succeeding.')}
              className="rounded bg-white border border-[#c7d2fe] px-2 py-0.5 text-[10px] font-semibold text-[#4f46e5] hover:bg-[#eef2ff] cursor-pointer"
            >
              Insert Draft
            </button>
          </div>
        </div>

        {/* Interactive Reply Form */}
        <form onSubmit={handleSendReply} className="border-t border-[#e5e2dc] bg-white p-3 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Reply to Elena or type @ to mention an engineer..."
              className="flex-1 rounded-md border border-[#e5e2dc] bg-[#faf9f7] px-3 py-1.5 text-xs text-[#111827] focus:border-[#ef4444] focus:bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1 rounded-md bg-[#ef4444] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#dc2626] transition-colors cursor-pointer"
            >
              <Send size={12} />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>

      {/* Toast Feedback */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 shadow-md"
          >
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>Support workspace record synchronized</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
