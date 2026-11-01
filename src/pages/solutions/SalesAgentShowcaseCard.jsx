/**
 * SalesAgentShowcaseCard.jsx
 * Secondary Stacked Showcase Card for /solutions/sales
 * Recreates the authentic Ultrakin secondary card beneath the hero:
 * "pipeline@northwind.shop Enterprise Pipeline · Autonomous sales agent enriches new inbound leads"
 */
import React from 'react';
import { CheckCircle2, Sparkles, Clock, TrendingUp, Building2 } from 'lucide-react';

export default function SalesAgentShowcaseCard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_4px_6px_-1px_rgba(17,24,39,0.03),0_20px_40px_-8px_rgba(17,24,39,0.08)] overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] bg-[#fafaf9] px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-[#059669] text-white flex items-center justify-center font-bold text-[9px]">
            U
          </div>
          <span className="text-[12.5px] font-semibold text-[#111827]">
            pipeline@northwind.shop
          </span>
          <span className="text-[11px] text-[#667085] hidden sm:inline">
            Enterprise Pipeline · Autonomous sales agent enriches new inbound leads
          </span>
        </div>

        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
          <Sparkles size={10} className="text-[#059669]" />
          Autonomous Deal Enrichment
        </span>
      </div>

      {/* Main Content Row */}
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-[#ecfdf5] border border-emerald-200 flex items-center justify-center text-[#059669] font-bold text-xs shrink-0">
            <Building2 size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">Meridian Systems</span>
              <span className="text-[10.5px] text-[#059669] font-mono font-bold">$120k ARR</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded font-mono font-medium">
                Fit Score: 98/100
              </span>
            </div>
            <p className="text-xs text-[#344054] font-medium mt-0.5">
              340 employees · Cloud Security · Inbound Web Form
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="w-full sm:w-auto text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
            <span>Ukin verified headcount & tech stack; staged Mutual Action Plan v3.2</span>
          </span>
        </div>
      </div>

      {/* Telemetry Footer */}
      <div className="border-t border-[#f0ede8] bg-[#faf9f7] px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-[#6b7280]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-[#9ca3af]" />
            Enrichment latency: <strong className="font-mono text-[#374151]">420ms</strong>
          </span>
          <span className="flex items-center gap-1">
            <TrendingUp size={11} className="text-emerald-600" />
            Account Executive: <span className="text-emerald-700 font-medium">Marcus Vance assigned</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#9ca3af]">Linked Opportunity:</span>
          <span className="font-mono font-bold text-[#111827] bg-white border border-[#e5e2dc] px-1.5 py-0.2 rounded">
            DEAL-409
          </span>
        </div>
      </div>
    </div>
  );
}
