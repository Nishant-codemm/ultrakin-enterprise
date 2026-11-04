/**
 * MarketingSolutionDemo.jsx
 * Interactive demo for /solutions/marketing ("Marketing")
 * Recreates the verified Ultrakin workflow:
 * Product Launch Brief -> Real-Time Reviewer Comments -> Multi-Stakeholder Signoff -> Scheduled Campaign.
 */
import React, { useState } from 'react';
import {
  Megaphone,
  CheckCircle2,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';

export default function MarketingSolutionDemo() {
  const [approvedByProduct, setApprovedByProduct] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fdf2f8] text-[#ec4899]">
            <Megaphone size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Q3 Major Release Launch Brief</span>
              <span className="rounded bg-[#fdf2f8] px-1.5 py-0.5 text-[10px] font-semibold text-[#db2777]">
                Target: Oct 15
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">Lead: Chloe Martin (Product Marketing Director)</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            <AvatarChip name="Chloe Martin" color="#ec4899" size="xs" />
            <AvatarChip name="Dana Lee" color="#059669" size="xs" />
            <AvatarChip name="Eleanor Sterling" color="#475569" size="xs" />
          </div>
          <button
            onClick={() => setApprovedByProduct(!approvedByProduct)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              approvedByProduct
                ? 'bg-emerald-600 text-white'
                : 'border border-[#ec4899] bg-[#fdf2f8] text-[#db2777] hover:bg-[#fce7f3]'
            }`}
          >
            <CheckCircle2 size={12} />
            <span>{approvedByProduct ? 'Product Approved ✓' : 'Sign Off as Product Lead'}</span>
          </button>
        </div>
      </div>

      {/* ─── Two-Column Collaborative Doc & Comments ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#e5e2dc]">
        {/* Left: Living Document Content */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
          <div className="space-y-1">
            <p className="text-[10px] font-semibold text-[#ec4899] uppercase tracking-wider">Campaign Positioning</p>
            <h2 className="text-base font-bold text-[#111827]">The Workspace OS for Autonomous Teams</h2>
            <p className="text-[11px] leading-relaxed text-[#4b5563]">
              Unlike fragmented tools where chat, tickets, and docs live in isolation, Ultrakin unites human collaboration with autonomous agents inside one governed workspace.
            </p>
          </div>

          <div className="rounded-lg border border-[#f0ede8] bg-[#faf9f7] p-3 space-y-2">
            <p className="font-semibold text-[#111827] text-[11px]">Primary Launch Milestones:</p>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#374151]">1. Press embargo lifts (TechCrunch & Forbes)</span>
                <span className="font-mono text-[10px] text-emerald-600 font-semibold">Ready</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#374151]">2. Product Hunt #1 candidate assets</span>
                <span className="font-mono text-[10px] text-emerald-600 font-semibold">Uploaded</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#374151]">3. Customer webinar announcement email</span>
                <span className="font-mono text-[10px] text-amber-600 font-semibold">Scheduled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Inline Review Comments */}
        <div className="w-64 p-3 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Stakeholder Reviews</p>

          {/* Comment 1: Legal */}
          <div className="rounded-lg border border-[#e5e2dc] bg-white p-2.5 space-y-1.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <AvatarChip name="Eleanor Sterling" color="#475569" size="xs" />
                <span className="font-semibold text-[#111827]">Legal Review</span>
              </div>
              <span className="text-[9px] text-emerald-600 font-semibold">Approved</span>
            </div>
            <p className="text-[10px] text-[#4b5563]">
              Enterprise SOC 2 Type II claims validated. All trademark disclaimers present.
            </p>
          </div>

          {/* Comment 2: Product */}
          <div className={`rounded-lg border p-2.5 space-y-1.5 shadow-2xs transition-colors ${
            approvedByProduct ? 'border-emerald-200 bg-emerald-50/50' : 'border-[#e5e2dc] bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <AvatarChip name="Dana Lee" color="#059669" size="xs" />
                <span className="font-semibold text-[#111827]">Product Lead</span>
              </div>
              <span className={`text-[9px] font-semibold ${approvedByProduct ? 'text-emerald-700' : 'text-amber-600'}`}>
                {approvedByProduct ? 'Signed Off' : 'Pending'}
              </span>
            </div>
            <p className="text-[10px] text-[#4b5563]">
              {approvedByProduct
                ? 'Telemetry and release tags match v2.4 stable branch.'
                : 'Click button above to sign off as Product Lead.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
