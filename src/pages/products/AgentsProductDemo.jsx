/**
 * AgentsProductDemo.jsx
 * Autonomous AI Agent with Human-in-the-Loop guardrails preview for /products/agents
 * Features:
 * - Agent profile card: Role, boundaries, authorized tools (Read, Create, Propose)
 * - Live agent activity execution log
 * - Interactive Action Proposal Card:
 *   - Shows proposed email reply to Maya Chen with low risk score
 *   - User can click [Approve] or [Decline]
 *   - Approving triggers instant dispatch with green confirmation badge
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bot, ShieldCheck, CheckCircle2, XCircle, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import StatusBadge from '../../components/product/StatusBadge';
import { AGENTS_DATA } from '../../data/productPageData';

export default function AgentsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [proposalStatus, setProposalStatus] = useState('pending'); // 'pending' | 'approved' | 'declined'

  return (
    <div className="flex flex-col h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden p-3.5 space-y-3">
      {/* ── Agent Profile Header ── */}
      <div className="rounded-xl border border-white/[0.08] bg-[#0F172A] p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center">
            <Bot size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-slate-100">{AGENTS_DATA.agent.name}</h3>
              <StatusBadge status="enabled" label="Active" showDot />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{AGENTS_DATA.agent.role}</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {AGENTS_DATA.agent.tools.map((t) => (
            <span
              key={t.name}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                t.status === 'approval'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
              }`}
            >
              {t.name} {t.status === 'approval' ? '⏳' : '✓'}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main Execution & Proposal Body ── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0">
        {/* Left: Execution Telemetry */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0B0F19] p-3 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-slate-400 mb-2 pb-1.5 border-b border-white/[0.08]">
              <Terminal size={12} className="text-indigo-400" />
              <span>Real-time Agent Telemetry</span>
            </div>

            <div className="space-y-2">
              {AGENTS_DATA.activityLog.map((log) => (
                <div key={log.id} className="text-xs p-2 rounded-lg bg-white/[0.03] border border-white/[0.04]">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                    <span>{log.time}</span>
                    <span className="text-indigo-400">{log.type}</span>
                  </div>
                  <p className="text-slate-300 text-[11.5px] leading-relaxed">{log.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-emerald-400">
            <span>● Awaiting Human Gate</span>
            <span>Policy: Enforced</span>
          </div>
        </div>

        {/* Right: Human Approval Gate Card */}
        <div className="rounded-xl border border-indigo-500/30 bg-[#0F172A] p-3.5 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={11} /> Approval Required
              </span>
              <span className="text-[10px] font-mono text-slate-400">Risk: Low</span>
            </div>

            <h4 className="text-xs font-bold text-slate-100 mb-1">
              {AGENTS_DATA.proposal.action}
            </h4>
            <span className="text-[10px] font-mono text-slate-500 block mb-2">
              Linked Record: {AGENTS_DATA.proposal.record}
            </span>

            <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed italic">
              "{AGENTS_DATA.proposal.preview}"
            </div>
          </div>

          <div className="pt-3 border-t border-white/[0.08]">
            <AnimatePresence mode="wait">
              {proposalStatus === 'pending' && (
                <motion.div
                  key="buttons"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <button
                    onClick={() => setProposalStatus('approved')}
                    className="flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 size={13} /> Approve Action
                  </button>
                  <button
                    onClick={() => setProposalStatus('declined')}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                </motion.div>
              )}

              {proposalStatus === 'approved' && (
                <motion.div
                  key="approved"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-emerald-400" /> Action Dispatched & Email Sent
                  </span>
                  <button
                    onClick={() => setProposalStatus('pending')}
                    className="text-[10px] underline text-emerald-400 hover:text-emerald-300 ml-2"
                  >
                    Reset
                  </button>
                </motion.div>
              )}

              {proposalStatus === 'declined' && (
                <motion.div
                  key="declined"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-2 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center justify-between"
                >
                  <span className="flex items-center gap-1.5">
                    <XCircle size={14} className="text-rose-400" /> Action Cancelled
                  </span>
                  <button
                    onClick={() => setProposalStatus('pending')}
                    className="text-[10px] underline text-rose-400 hover:text-rose-300 ml-2"
                  >
                    Reset
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
