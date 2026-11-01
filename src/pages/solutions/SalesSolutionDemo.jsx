/**
 * SalesSolutionDemo.jsx
 * Interactive demo for /solutions/sales ("Sales")
 * Recreates the authentic Ultrakin workflow:
 * Inbound Enterprise Lead -> Ukin Deal Enrichment -> Living Mutual Action Plan -> Closed-Won Milestone.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  CheckCircle2,
  Building2,
  Sparkles,
  FileCheck,
  FileText,
  Clock,
  CheckSquare,
  Square,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';

const PIPELINE_DEALS = [
  {
    id: 'meridian',
    name: 'Meridian Systems',
    arr: '$120k',
    arrNum: 120,
    stage: 'proposal', // will move to 'closed'
    owner: { name: 'Marcus Vance', initials: 'MV', color: '#059669' },
    industry: 'Cloud Security',
    employees: '340',
    evaluation: 'Evaluating Ultrakin to replace Salesforce + Asana + Zendesk',
    decisionMaker: 'Sarah Chen (VP Eng)',
    planVersion: 'v3.2',
  },
  {
    id: 'acme',
    name: 'Acme Cloud',
    arr: '$48k',
    arrNum: 48,
    stage: 'discovery',
    owner: { name: 'Marcus Vance', initials: 'MV', color: '#059669' },
    industry: 'DevOps Tooling',
    employees: '120',
    evaluation: 'Evaluating Chat & Docs for 45 engineers',
    decisionMaker: 'David Ross (CTO)',
    planVersion: 'v1.0',
  },
  {
    id: 'helix',
    name: 'Helix Bio',
    arr: '$64k',
    arrNum: 64,
    stage: 'discovery',
    owner: { name: 'Priya K.', initials: 'PK', color: '#dc2626' },
    industry: 'Biotech',
    employees: '210',
    evaluation: 'SOC 2 compliant workspace requirements',
    decisionMaker: 'Dr. Evelyn Ward',
    planVersion: 'v1.1',
  },
  {
    id: 'apex',
    name: 'Apex Logistics',
    arr: '$90k',
    arrNum: 90,
    stage: 'closed',
    owner: { name: 'Marcus Vance', initials: 'MV', color: '#059669' },
    industry: 'Supply Chain',
    employees: '580',
    evaluation: 'Enterprise rollout across dispatch and support',
    decisionMaker: 'Ray Kowalski (COO)',
    planVersion: 'Final Executed',
  },
  {
    id: 'verve',
    name: 'Verve Commerce',
    arr: '$210k',
    arrNum: 210,
    stage: 'closed',
    owner: { name: 'Marcus Vance', initials: 'MV', color: '#059669' },
    industry: 'E-commerce Platform',
    employees: '890',
    evaluation: 'Full workspace migration completed in Q3',
    decisionMaker: 'Claire Beaumont (VP Product)',
    planVersion: 'Final Executed',
  },
];

export default function SalesSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [isClosed, setIsClosed] = useState(false);
  const [selectedDealId, setSelectedDealId] = useState('meridian');
  const [showNotification, setShowNotification] = useState(false);
  const [checkedMilestones, setCheckedMilestones] = useState({
    tech: true,
    sec: true,
    legal: false,
    msa: false,
  });

  const selectedDeal = PIPELINE_DEALS.find((d) => d.id === selectedDealId) || PIPELINE_DEALS[0];
  const isSelectedMeridian = selectedDealId === 'meridian';
  const effectiveStage = isSelectedMeridian && isClosed ? 'closed' : selectedDeal.stage;

  const handleToggleClose = () => {
    if (!isClosed) {
      setIsClosed(true);
      setCheckedMilestones({ tech: true, sec: true, legal: true, msa: true });
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3500);
    } else {
      setIsClosed(false);
      setCheckedMilestones({ tech: true, sec: true, legal: false, msa: false });
    }
  };

  const toggleMilestone = (key) => {
    setCheckedMilestones((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white text-xs select-none font-sans relative">
      {/* ─── Unified Workspace App Rail ─── */}
      <WorkspaceAppRail activeApp="lists" />

      {/* ─── Main Pipeline & Workspace Canvas ─── */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#faf9f7] min-w-0">
        {/* Header: Pipeline Stats & Live Rollup */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 gap-2 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ecfdf5] text-[#059669] shrink-0">
              <TrendingUp size={15} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#111827]">Q4 Enterprise Pipeline</span>
                <span className="rounded bg-[#f0fdf4] border border-[#bbf7d0] px-2 py-0.5 text-[10px] font-bold text-[#059669] font-mono">
                  {isClosed ? '$540k Closed ARR (+120k)' : '$420k Closed ARR'}
                </span>
              </div>
              <p className="text-[10px] text-[#6b7280]">Owner: Marcus Vance (Enterprise AE) · Inbound SLA: 15m</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleClose}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                isClosed
                  ? 'bg-slate-100 text-[#374151] hover:bg-slate-200 border border-[#e5e2dc]'
                  : 'bg-[#059669] text-white hover:bg-[#047857]'
              }`}
            >
              {isClosed ? (
                <>
                  <Clock size={12} />
                  <span>Reset Deal</span>
                </>
              ) : (
                <>
                  <FileCheck size={12} />
                  <span>Advance Deal ($120k ARR)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── Two-Pane: Left Pipeline Kanban / Right Living Deal Room ─── */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Left: Pipeline Kanban Stages */}
          <div className="flex w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-[#e5e2dc] divide-x divide-[#f0ede8] overflow-x-auto p-3 gap-2 bg-[#faf9f7] shrink-0">
            {/* Stage 1: Discovery */}
            <div className="flex-1 min-w-[125px] space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">Discovery</span>
                <span className="rounded-full bg-slate-200/70 px-1.5 py-0.2 text-[9.5px] font-bold text-slate-700">2</span>
              </div>

              {/* Acme Cloud Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDealId('acme')}
                className={`rounded-lg border bg-white p-2.5 shadow-2xs space-y-1 cursor-pointer transition-colors ${
                  selectedDealId === 'acme' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#e5e2dc] hover:bg-white/80'
                }`}
              >
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

              {/* Helix Bio Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDealId('helix')}
                className={`rounded-lg border bg-white p-2.5 shadow-2xs space-y-1 cursor-pointer transition-colors ${
                  selectedDealId === 'helix' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#e5e2dc] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Helix Bio</span>
                  <span className="font-mono text-[10px] text-[#059669] font-bold">$64k</span>
                </div>
                <p className="text-[10px] text-[#6b7280]">Security review pending</p>
              </div>
            </div>

            {/* Stage 2: Proposal & MAP (Active Focus) */}
            <div className="flex-1 min-w-[135px] space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-semibold text-[#6b7280] uppercase tracking-wider">Proposal</span>
                <span className="rounded-full bg-slate-200/70 px-1.5 py-0.2 text-[9.5px] font-bold text-slate-700">
                  {!isClosed ? '1' : '0'}
                </span>
              </div>

              {!isClosed && (
                <motion.div
                  layoutId="meridian-deal-card"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDealId('meridian')}
                  className={`rounded-lg border-2 bg-[#f0fdf4] p-2.5 shadow-xs space-y-1.5 cursor-pointer ${
                    selectedDealId === 'meridian' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#bbf7d0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827]">Meridian Systems</span>
                    <span className="font-mono text-[10.5px] text-[#059669] font-bold">$120k</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium">
                    <Sparkles size={11} className="text-[#059669]" />
                    <span>Proposal doc reviewed</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-100">
                    <AvatarChip name="Marcus Vance" color="#059669" size="xs" />
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wide">
                      Ready to Sign
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Stage 3: Closed Won */}
            <div className="flex-1 min-w-[135px] space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-semibold text-[#059669] uppercase tracking-wider">Closed Won</span>
                <span className="rounded-full bg-[#ecfdf5] border border-emerald-200 px-1.5 py-0.2 text-[9.5px] font-bold text-[#059669]">
                  {isClosed ? '3' : '2'}
                </span>
              </div>

              {isClosed && (
                <motion.div
                  layoutId="meridian-deal-card"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDealId('meridian')}
                  className={`rounded-lg border-2 bg-[#ecfdf5] p-2.5 shadow-xs space-y-1.5 cursor-pointer ${
                    selectedDealId === 'meridian' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#bbf7d0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#111827]">Meridian Systems</span>
                    <span className="font-mono text-[10.5px] text-[#059669] font-bold">$120k</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-800 font-medium">
                    <CheckCircle2 size={11} className="text-emerald-600" />
                    <span>Contract Executed</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200 text-[9px] text-emerald-700 font-medium">
                    <span>Handoff to CS</span>
                    <span>Today</span>
                  </div>
                </motion.div>
              )}

              {/* Apex Logistics Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDealId('apex')}
                className={`rounded-lg border bg-white p-2.5 shadow-2xs space-y-1 cursor-pointer transition-colors opacity-80 ${
                  selectedDealId === 'apex' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#e5e2dc] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Apex Logistics</span>
                  <span className="font-mono text-[10px] text-[#059669] font-bold">$90k</span>
                </div>
                <p className="text-[10px] text-[#6b7280]">Deployed in October</p>
              </div>

              {/* Verve Commerce Card */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setSelectedDealId('verve')}
                className={`rounded-lg border bg-white p-2.5 shadow-2xs space-y-1 cursor-pointer transition-colors opacity-80 ${
                  selectedDealId === 'verve' ? 'border-[#059669] ring-1 ring-[#059669]' : 'border-[#e5e2dc] hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#111827]">Verve Commerce</span>
                  <span className="font-mono text-[10px] text-[#059669] font-bold">$210k</span>
                </div>
                <p className="text-[10px] text-[#6b7280]">Enterprise multi-tenant</p>
              </div>
            </div>
          </div>

          {/* Right: Living Deal Room & Collaborative Proposal */}
          <div className="flex-1 p-3.5 space-y-3 overflow-y-auto bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 size={15} className="text-[#059669]" />
                <span className="font-bold text-[#111827] text-xs">Deal Context: {selectedDeal.name}</span>
              </div>
              <StatusBadge
                variant={effectiveStage === 'closed' ? 'success' : 'enabled'}
                text={effectiveStage === 'closed' ? 'Closed Won' : 'Proposal Review'}
              />
            </div>

            {/* Ukin Autonomous Intelligence Brief */}
            <div className="rounded-lg border border-[#dbeafe] bg-[#eff6ff] p-2.5 space-y-1">
              <div className="flex items-center gap-1.5 text-[#1e40af] font-semibold text-[11px]">
                <Sparkles size={12} className="text-[#2563eb]" />
                <span>Ukin Account Intelligence</span>
              </div>
              <p className="text-[10px] text-[#1e40af] leading-relaxed">
                {selectedDeal.employees} employees · {selectedDeal.industry} · {selectedDeal.evaluation}. Key stakeholder: {selectedDeal.decisionMaker}.
              </p>
            </div>

            {/* Collaborative Living Proposal Preview */}
            <div className="rounded-lg border border-[#e5e2dc] bg-[#faf9f7] p-2.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#111827] font-semibold text-[11px]">
                  <FileText size={12} className="text-[#059669]" />
                  <span>Mutual Action Plan ({selectedDeal.planVersion})</span>
                </div>
                <span className="text-[10px] font-mono text-[#059669] font-bold">{selectedDeal.arr} ARR</span>
              </div>

              {/* Interactive Milestones Checklist */}
              <div className="space-y-1.5 pt-1 text-[11px]">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleMilestone('tech')}
                  className="flex items-center gap-2 text-[#374151] cursor-pointer"
                >
                  {checkedMilestones.tech ? (
                    <CheckSquare size={13} className="text-[#059669] shrink-0" />
                  ) : (
                    <Square size={13} className="text-[#9ca3af] shrink-0" />
                  )}
                  <span className={checkedMilestones.tech ? 'line-through text-[#6b7280]' : ''}>
                    Technical discovery & architecture signoff
                  </span>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleMilestone('sec')}
                  className="flex items-center gap-2 text-[#374151] cursor-pointer"
                >
                  {checkedMilestones.sec ? (
                    <CheckSquare size={13} className="text-[#059669] shrink-0" />
                  ) : (
                    <Square size={13} className="text-[#9ca3af] shrink-0" />
                  )}
                  <span className={checkedMilestones.sec ? 'line-through text-[#6b7280]' : ''}>
                    SOC 2 Type II & Security questionnaire completed
                  </span>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleMilestone('legal')}
                  className="flex items-center gap-2 text-[#374151] cursor-pointer"
                >
                  {checkedMilestones.legal ? (
                    <CheckSquare size={13} className="text-[#059669] shrink-0" />
                  ) : (
                    <Square size={13} className="text-[#9ca3af] shrink-0" />
                  )}
                  <span className={checkedMilestones.legal ? 'line-through text-[#6b7280]' : ''}>
                    Legal redlines approved by General Counsel
                  </span>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleMilestone('msa')}
                  className="flex items-center gap-2 text-[#374151] cursor-pointer"
                >
                  {checkedMilestones.msa ? (
                    <CheckSquare size={13} className="text-[#059669] shrink-0" />
                  ) : (
                    <Square size={13} className="text-[#9ca3af] shrink-0" />
                  )}
                  <span className={checkedMilestones.msa ? 'line-through text-[#6b7280]' : ''}>
                    Master Services Agreement signed via native crypto ledger
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Closed-Won Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            className="absolute bottom-3 right-3 z-30 flex items-center gap-2.5 rounded-lg border border-emerald-300 bg-[#ecfdf5] px-3.5 py-2.5 text-xs font-semibold text-emerald-900 shadow-lg"
          >
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Deal Won: Meridian Systems ($120k ARR)</p>
              <p className="text-[10px] font-normal text-emerald-700">Notification posted to #sales-wins · Handoff staged in Lists</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
