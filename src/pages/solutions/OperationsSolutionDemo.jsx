/**
 * OperationsSolutionDemo.jsx
 * Interactive demo for /solutions/operations ("Operations")
 * Recreates the verified Ultrakin workflow:
 * Procurement Request -> Automated Threshold Branching -> Executive Signoff -> Immutable Asset Ledger.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Workflow,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function OperationsSolutionDemo() {
  const [approved, setApproved] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fef3c7] text-[#d97706]">
            <Workflow size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Procurement Approval Flow: PR-204</span>
              <StatusBadge variant={approved ? 'success' : 'approval'} text={approved ? 'Approved & Dispatched' : 'Awaiting VP Signoff'} />
            </div>
            <p className="text-[10px] text-[#6b7280]">Workflow: Hardware & Cloud Infrastructure Orders &gt; $10,000</p>
          </div>
        </div>

        <button
          onClick={() => setApproved(!approved)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            approved
              ? 'bg-slate-100 text-[#374151] hover:bg-slate-200'
              : 'bg-[#d97706] text-white hover:bg-[#b45309] shadow-sm'
          }`}
        >
          <CheckCircle2 size={13} />
          <span>{approved ? 'Revoke Approval' : 'Approve Order ($12,400)'}</span>
        </button>
      </div>

      {/* ─── Visual Pipeline Canvas ─────────────────────────────────────────── */}
      <div className="flex flex-1 p-4 gap-4 overflow-y-auto">
        {/* Step 1: Request Card */}
        <div className="flex-1 flex flex-col justify-between rounded-xl border border-[#e5e2dc] bg-white p-3.5 shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Step 1 · Input</span>
              <span className="rounded bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] font-mono text-[#374151]">Form Submitted</span>
            </div>
            <p className="font-semibold text-[#111827] text-sm">Server Fleet Expansion</p>
            <p className="text-[11px] text-[#4b5563]">Requested by Devin Zhao (Engineering Lead) for Q4 capacity reserves.</p>
            <div className="rounded bg-[#faf9f7] border border-[#e5e2dc] p-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6b7280]">Vendor:</span>
                <span className="font-medium text-[#111827]">Dell Enterprise Cloud</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-[#6b7280]">Amount:</span>
                <span className="font-mono font-bold text-[#111827]">$12,400 USD</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 pt-2 text-[10px] text-emerald-600 font-medium">
            <CheckCircle2 size={12} />
            <span>Form validation passed</span>
          </div>
        </div>

        {/* Step 2: Automated Branching Rule */}
        <div className="flex-1 flex flex-col justify-between rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-3.5 shadow-2xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#3b82f6] uppercase tracking-wider">Step 2 · Rule Engine</span>
              <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-mono text-[#1e40af]">Automated</span>
            </div>
            <p className="font-semibold text-[#1e3a8a] text-sm">Threshold Verification</p>
            <p className="text-[11px] text-[#2563eb]">
              Amount &gt; $10,000 threshold requires VP approval. Lower tiers auto-approve.
            </p>
            <div className="rounded bg-white/80 border border-[#bfdbfe] p-2 space-y-1 text-[11px]">
              <div className="flex items-center gap-1 text-[#1e40af]">
                <Sparkles size={11} />
                <span>Budget allocated in Q4 Capex (92% available)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#2563eb] font-medium pt-2">
            <ArrowRight size={12} />
            <span>Routed to Sarah Jenkins (COO)</span>
          </div>
        </div>

        {/* Step 3: Executive Signoff Card */}
        <div className={`flex-1 flex flex-col justify-between rounded-xl border p-3.5 shadow-2xs transition-colors ${
          approved ? 'border-[#bbf7d0] bg-[#f0fdf4]' : 'border-[#fde68a] bg-[#fffbeb]'
        }`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#d97706] uppercase tracking-wider">Step 3 · Signoff</span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {approved ? 'Signed' : 'Pending'}
              </span>
            </div>
            <p className="font-semibold text-[#111827] text-sm">COO Executive Review</p>
            <div className="flex items-center gap-2 pt-1">
              <AvatarChip name="Sarah Jenkins" color="#d97706" size="sm" />
              <div>
                <p className="font-medium text-[#111827]">Sarah Jenkins</p>
                <p className="text-[10px] text-[#6b7280]">VP of Business Operations</p>
              </div>
            </div>
            <p className="text-[11px] text-[#4b5563] pt-1">
              {approved
                ? 'Order approved with cryptographic timestamp logged in workspace ledger.'
                : 'Click button above to simulate executive approval.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-2 text-[10px] font-medium text-[#4b5563]">
            <ShieldCheck size={12} className={approved ? 'text-emerald-600' : 'text-slate-400'} />
            <span>{approved ? 'Ledger Entry #PR-204 committed' : 'Zero-trust audit enabled'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
