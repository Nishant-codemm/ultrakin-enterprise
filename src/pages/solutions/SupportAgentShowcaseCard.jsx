/**
 * SupportAgentShowcaseCard.jsx
 * Secondary Stacked Showcase Card for /solutions/customer-support
 * Recreates the authentic Ultrakin secondary card beneath the hero:
 * "support@northwind.shop Shared Inbox · Support agent works new threads"
 */
import React from 'react';
import { CheckCircle2, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import { SOLUTION_PERSONAS } from '../../data/solutionPageData';

export default function SupportAgentShowcaseCard() {

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_4px_6px_-1px_rgba(17,24,39,0.03),0_20px_40px_-8px_rgba(17,24,39,0.08)] overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] bg-[#fafaf9] px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-[#ef4444] text-white flex items-center justify-center font-bold text-[9px]">
            U
          </div>
          <span className="text-[12.5px] font-semibold text-[#111827]">
            support@northwind.shop
          </span>
          <span className="text-[11px] text-[#667085] hidden sm:inline">
            Shared Inbox · Support agent works new threads
          </span>
        </div>

        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
          <Sparkles size={10} className="text-purple-600" />
          Autonomous CX Triage
        </span>
      </div>

      {/* Main Content Row */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <AvatarChip
            name={SOLUTION_PERSONAS.cxElena.name}
            color={SOLUTION_PERSONAS.cxElena.color}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">Elena Rostova</span>
              <span className="text-[10.5px] text-[#8c8c8c] font-mono tabular-nums">9:04 AM</span>
              <span className="text-[10px] bg-red-50 text-red-700 border border-red-200 px-1.5 py-0.2 rounded font-mono font-medium">
                P0 SLA · 15m
              </span>
            </div>
            <p className="text-xs text-[#344054] font-medium mt-0.5">
              Webhook 504 Gateway Timeout (Invoice #4821)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="w-full sm:w-auto text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <span>Agent verified gateway logs, tagged @Dana, and staged SR-28 ticket</span>
          </span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="border-t border-[#f0ede8] bg-[#faf9f7] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[#6b7280]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-[#9ca3af]" />
            Triage latency: <strong className="font-mono text-[#374151]">840ms</strong>
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck size={11} className="text-emerald-600" />
            Collision guard: <span className="text-emerald-700 font-medium">Priya active</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#9ca3af]">Linked System Record:</span>
          <span className="font-mono font-bold text-[#111827] bg-white border border-[#e5e2dc] px-1.5 py-0.2 rounded">
            SR-28
          </span>
        </div>
      </div>
    </div>
  );
}
