/**
 * MailAgentShowcaseCard.jsx
 * Secondary Stacked Showcase Card for /products/mail
 * Directly matching the original Ultrakin scroll-triggered card:
 * "support@northwind.studio Shared Inbox · Support agent reviews new threads"
 */
import React from 'react';
import { Bot, ShieldCheck, Sparkles } from 'lucide-react';

export default function MailAgentShowcaseCard() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_4px_6px_-1px_rgba(17,24,39,0.03),0_20px_40px_-8px_rgba(17,24,39,0.08)] overflow-hidden select-none">
      <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] bg-[#fafaf9] px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-[#2563eb] text-white flex items-center justify-center">
            <Bot size={12} aria-hidden="true" />
          </div>
          <span className="text-[12.5px] font-semibold text-[#111827]">
            support@northwind.studio
          </span>
          <span className="text-[11px] text-[#667085] hidden sm:inline">
            Shared Inbox · Agent review
          </span>
        </div>

        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles size={10} className="text-purple-600" />
          Support inbox agent
        </span>
      </div>

      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#ef4444]/10 text-[#dc2626] border border-red-200 flex items-center justify-center font-bold text-xs">
            MC
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">Maya Chen</span>
              <span className="text-[10.5px] text-[#8c8c8c] font-mono tabular-nums">9:12</span>
            </div>
            <p className="text-xs text-[#344054] font-medium">
              Two charges of $120 · order #4821
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
            <ShieldCheck size={12} className="text-amber-700" />
            Dana’s approval needed · nothing sent
          </span>
        </div>
      </div>
    </div>
  );
}
