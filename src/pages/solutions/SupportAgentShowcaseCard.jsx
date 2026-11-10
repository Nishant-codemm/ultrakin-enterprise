/**
 * SupportAgentShowcaseCard.jsx
 * Shows the verified support request lifecycle beneath the interactive inbox demo.
 */
import React from 'react';
import { ArrowRight, CheckCircle2, FileText, ListChecks, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { SOLUTION_META } from '../../data/solutionPageData';

const FLOW_ICONS = [Mail, MessageSquare, FileText, ListChecks, Sparkles];

export default function SupportAgentShowcaseCard() {
  const steps = SOLUTION_META['customer-support'].workflow;

  return (
    <div className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_12px_36px_-20px_rgba(17,24,39,0.22)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f0ede8] bg-[#faf9f7] px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#667085]">One customer issue · five connected steps</p>
          <h2 className="mt-1 text-sm font-semibold text-[#111827]">From first email to a reply ready for review</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-800">
          <CheckCircle2 size={13} /> SR-31 · Needs review
        </span>
      </div>

      <ol className="grid grid-cols-1 divide-y divide-[#f0ede8] px-5 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x lg:divide-y-0">
        {steps.map((step, index) => {
          const Icon = FLOW_ICONS[index];
          return (
            <li key={step.step} className="relative py-4 lg:px-3 lg:first:pl-0 lg:last:pr-0">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f2f4ff] text-[#4f46e5]">
                  <Icon size={14} aria-hidden="true" />
                </span>
                <span className="text-[10px] font-medium tabular-nums text-[#667085]">0{step.step}</span>
              </div>
              <h3 className="text-xs font-semibold leading-4 text-[#111827]">{step.title}</h3>
              <p className="mt-1 text-[11px] leading-[1.55] text-[#667085]">{step.desc}</p>
              {index < steps.length - 1 && <ArrowRight className="absolute -right-2 top-[25px] z-10 hidden bg-white text-[#98a2b3] lg:block" size={13} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f0ede8] px-5 py-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#475467">
          <span>Source · support@northwind.shop</span>
          <span>Owner · Dana Lee</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Needs review</span>
        </div>
        <p className="text-[10px] text-[#667085]">Illustrative sample · no live customer data</p>
      </div>
    </div>
  );
}
