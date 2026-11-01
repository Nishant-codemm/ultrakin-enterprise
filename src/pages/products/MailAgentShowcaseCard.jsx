/**
 * MailAgentShowcaseCard.jsx
 * Secondary Stacked Showcase Card for /products/mail
 * Directly matching the original Ultrakin scroll-triggered card:
 * "support@northwind.shop Shared Inbox · Support agent works new threads"
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Bot, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import { PERSONAS } from '../../data/productPageData';

export default function MailAgentShowcaseCard() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_4px_6px_-1px_rgba(17,24,39,0.03),0_20px_40px_-8px_rgba(17,24,39,0.08)] overflow-hidden select-none">
      <div className="flex h-10 items-center justify-between border-b border-[#f0ede8] bg-[#fafaf9] px-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-md bg-[#2563eb] text-white flex items-center justify-center font-bold text-[9px]">
            U
          </div>
          <span className="text-[12.5px] font-semibold text-[#111827]">
            support@northwind.shop
          </span>
          <span className="text-[11px] text-[#667085] hidden sm:inline">
            Shared Inbox · Support agent works new threads
          </span>
        </div>

        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <Sparkles size={10} className="text-purple-600" />
          Background Triage Agent
        </span>
      </div>

      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-[#ef4444]/10 text-[#dc2626] border border-red-200 flex items-center justify-center font-bold text-xs">
            JO
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#111827]">J. Ortiz</span>
              <span className="text-[10.5px] text-[#8c8c8c] font-mono tabular-nums">9:12</span>
            </div>
            <p className="text-xs text-[#344054] font-medium">
              Charged twice, order #4821
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium">
            <CheckCircle2 size={12} className="text-emerald-600" />
            Agent prepared refund draft & matched order in Shopify
          </span>
        </div>
      </div>
    </div>
  );
}
