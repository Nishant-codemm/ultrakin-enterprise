/**
 * SalesSolutionDemo.jsx
 * Interactive demo for /solutions/sales ("Sales")
 * Recreates the verified Ultrakin workflow:
 * Inbound Enterprise Lead -> Ukin Deal Enrichment -> Collaborative Proposal -> Closed-Won Milestone.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Building,
  User,
  Sparkles,
  ArrowRight,
  FileCheck,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function SalesSolutionDemo() {
  const [stage, setStage] = useState('proposal'); // 'discovery', 'proposal', 'closed'
  const [showNotification, setShowNotification] = useState(false);

  const handleAdvance = () => {
    if (stage === 'proposal') {
      setStage('closed');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      setStage('proposal');
    }
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header: Pipeline Stats & Controls ───────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#059669]">
            <TrendingUp size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Q4 Enterprise Pipeline</span>
              <span className="rounded bg-[#f0fdf4] px-1.5 py-0.5 text-[10px] font-semibold text-[#059669]">
                {stage === 'closed' ? '$540k Closed ARR' : '$420k Closed ARR'}
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">Owner: Marcus Vance (Enterprise AE)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAdvance}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              stage === 'closed'
                ? 'bg-slate-100 text-[#374151] hover:bg-slate-200'
                : 'bg-[#059669] text-white hover:bg-[#047857] shadow-sm'
            }`}
          >
            {stage === 'closed' ? (
              <>
                <Clock size={12} />
                <span>Reset to Proposal</span>
              </>
            ) : (
              <>
                <FileCheck size={12} />
                <span>Close Deal ($120k ARR)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─── Pipeline Board & Active Deal Room ───────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Kanban Pipeline Stages */}
        <div className="flex w-3/5 border-r border-[#e5e2dc] divide-x divide-[#f0ede8] overflow-x-auto p-3 gap-2">
          {/* Stage 1: Discovery */}
          <div className="flex-1 min-w-[120px] space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">Discovery</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">2</span>
            </div>

            <div className="rounded-lg border border-[#e5e2dc] bg-white p-2.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#111827]">Acme Cloud</span>
                <span className="font-mono text-[10px] text-[#059669] font-bold">$48k</span>
              </div>
              <p className="text-[10px] text-[#6b7280]">Inbound form qualification</p>
              <div className="flex items-center gap-1 text-[9px] text-[#9ca3af]">
                <Clock size={10} />
                <span>Demo booked for Thu</span>
              </div>
            </div>

            <div className="rounded-lg border border-[#e5e2dc] bg-white p-2.5 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#111827]">Helix Bio</span>
                <span className="font-mono text-[10px] text-[#059669] font-bold">$64k</span>
              </div>
              <p className="text-[10px] text-[#6b7280]">Security review pending</p>
            </div>
          </div>

          {/* Stage 2: Mutual Proposal (Active Spotlight Card) */}
          <div className="flex-1 min-w-[130px] space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">Proposal</span>
              <span className="rounded-full bg-slate-100 px-1.5 py-0.2 text-[10px] font-bold text-slate-600">
                {stage === 'proposal' ? '1' : '0'}
              </span>
            </div>

            {stage === 'proposal' && (
              <motion.div
                layoutId="meridian-card"
                className="rounded-lg border-2 border-[#059669] bg-[#f0fdf4] p-2.5 shadow-xs space-y-1.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Meridian Systems</span>
                  <span className="font-mono text-[10px] text-[#059669] font-bold">$120k</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-800">
                  <Sparkles size={11} className="text-[#059669]" />
                  <span>Proposal doc reviewed</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-100">
                  <AvatarChip name="Marcus Vance" color="#059669" size="xs" />
                  <span className="text-[9px] font-semibold text-emerald-700 uppercase">Ready to Sign</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Stage 3: Closed Won */}
          <div className="flex-1 min-w-[130px] space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-semibold text-[#059669] uppercase tracking-wider">Closed Won</span>
              <span className="rounded-full bg-[#ecfdf5] px-1.5 py-0.2 text-[10px] font-bold text-[#059669]">
                {stage === 'closed' ? '4' : '3'}
              </span>
            </div>

            {stage === 'closed' && (
              <motion.div
                layoutId="meridian-card"
                className="rounded-lg border border-[#bbf7d0] bg-[#ecfdf5] p-2.5 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Meridian Systems</span>
                  <span className="font-mono text-[10px] text-[#059669] font-bold">$120k</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium">
                  <CheckCircle2 size={11} className="text-emerald-600" />
                  <span>Contract Executed</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-emerald-100 text-[9px] text-emerald-700">
                  <span>Handoff to CS</span>
                  <span>Today</span>
                </div>
              </motion.div>
            )}

            <div className="rounded-lg border border-[#e5e2dc] bg-white p-2.5 shadow-2xs space-y-1 opacity-70">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#111827]">Apex Logistics</span>
                <span className="font-mono text-[10px] text-[#059669] font-bold">$90k</span>
              </div>
              <p className="text-[10px] text-[#6b7280]">Deployed in October</p>
            </div>
          </div>
        </div>

        {/* Right: Living Deal Room & AI Brief */}
        <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building size={14} className="text-[#6b7280]" />
              <span className="font-semibold text-[#111827]">Deal Context: Meridian Systems</span>
            </div>
            <StatusBadge variant={stage === 'closed' ? 'success' : 'enabled'} text={stage === 'closed' ? 'Closed Won' : 'In Review'} />
          </div>

          {/* AI Intelligence Brief */}
          <div className="rounded-lg border border-[#dbeafe] bg-[#eff6ff] p-2.5 space-y-1">
            <div className="flex items-center gap-1.5 text-[#1e40af] font-semibold text-[11px]">
              <Sparkles size={12} />
              <span>Ukin Account Intelligence</span>
            </div>
            <p className="text-[10px] text-[#3b82f6] leading-relaxed">
              340 employees · Cloud Security vertical · Evaluating Ultrakin to replace Slack + Asana + Zendesk across customer-facing teams.
            </p>
          </div>

          {/* Collaborative Living Proposal Preview */}
          <div className="rounded-lg border border-[#e5e2dc] bg-[#faf9f7] p-2.5 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#111827] font-semibold text-[11px]">
                <FileText size={12} className="text-[#059669]" />
                <span>Mutual Action Plan (v3.2)</span>
              </div>
              <span className="text-[10px] text-[#9ca3af]">Signed by VP Eng</span>
            </div>
            <div className="space-y-1 text-[11px] text-[#4b5563]">
              <div className="flex items-center justify-between">
                <span>Tier: Enterprise Dedicated Cloud</span>
                <span className="font-mono font-semibold text-[#111827]">$120,000 / yr</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Seat Count: 180 seats + Ukin Pro</span>
                <span className="text-emerald-700 font-semibold">Approved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Closed-Won Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-3 right-3 z-30 flex items-center gap-2 rounded-lg border border-emerald-300 bg-[#ecfdf5] px-3.5 py-2.5 text-xs font-semibold text-emerald-900 shadow-lg"
          >
            <CheckCircle2 size={16} className="text-emerald-600" />
            <div>
              <p className="font-bold">Deal Won: Meridian Systems ($120k ARR)</p>
              <p className="text-[10px] font-normal text-emerald-700">Notification posted to #sales-wins channel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
