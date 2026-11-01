/**
 * AgenciesSolutionDemo.jsx
 * Interactive demo for /solutions/agencies ("Agencies and studios")
 * Recreates the verified Ultrakin workflow:
 * Branded Client Guest Channel -> Design Deliverable Review -> Scope Guard Change Order Approval.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Palette,
  CheckCircle2,
  FileCheck,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function AgenciesSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [scopeApproved, setScopeApproved] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e0f2fe] text-[#0284c7]">
            <Palette size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">#client-verve-brand-refresh</span>
              <span className="rounded bg-[#f0f9ff] px-2 py-0.5 text-[10px] font-semibold text-[#0369a1] border border-[#bae6fd]">
                External Guest Space
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">Client: Verve Consumer Tech · Agency Lead: Julian Vance</p>
          </div>
        </div>

        <button
          onClick={() => setScopeApproved(!scopeApproved)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            scopeApproved
              ? 'bg-emerald-600 text-white'
              : 'bg-[#0284c7] text-white hover:bg-[#0369a1] shadow-sm'
          }`}
        >
          <CheckCircle2 size={13} />
          <span>{scopeApproved ? 'Change Order Approved (+$4,200)' : 'Client Sign: Change Order #12'}</span>
        </button>
      </div>

      {/* ─── Two-Column Channel & Scope Guard ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#e5e2dc]">
        {/* Left: Client Conversation & Deliverables */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
          <div className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarChip name="Sarah Jenkins" color="#d97706" size="xs" />
                <span className="font-semibold text-[#111827]">Sarah Jenkins (Client VP)</span>
                <span className="rounded bg-slate-200 px-1.5 py-0.2 text-[9px] font-bold text-slate-700">CLIENT GUEST</span>
              </div>
              <span className="text-[10px] text-[#9ca3af]">10:14 AM</span>
            </div>
            <p className="text-[11px] text-[#374151] pl-6 leading-relaxed">
              "We love the 3D typography direction! Can we also add an animated packaging mockup for the European launch by next Wednesday?"
            </p>
          </div>

          <div className="rounded-xl border border-[#e0f2fe] bg-[#f0f9ff] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarChip name="Julian Vance" color="#0284c7" size="xs" />
                <span className="font-semibold text-[#111827]">Julian Vance (Agency Partner)</span>
              </div>
              <span className="text-[10px] text-[#9ca3af]">10:20 AM</span>
            </div>
            <p className="text-[11px] text-[#0369a1] pl-6 leading-relaxed">
              "Glad you love it Sarah! The 3D packaging mockup is outside our original Scope of Work, but our 3D animator is available. I’ve attached Change Order #12 right here."
            </p>
          </div>
        </div>

        {/* Right: Scope Guard Card */}
        <div className="w-68 p-3.5 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Scope Protection</p>

          <div className={`rounded-xl border p-3 space-y-2 shadow-2xs transition-colors ${
            scopeApproved ? 'border-emerald-200 bg-emerald-50/60' : 'border-[#e5e2dc] bg-white'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#111827]">Change Order #12</span>
              <StatusBadge variant={scopeApproved ? 'success' : 'approval'} text={scopeApproved ? 'Approved' : 'Pending Client'} />
            </div>

            <div className="space-y-1 text-[11px] text-[#4b5563] pt-1">
              <div className="flex justify-between">
                <span>Deliverable:</span>
                <span className="font-medium text-[#111827]">3D Packaging Assets</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline:</span>
                <span className="font-medium text-[#111827]">+3 Days Delivery</span>
              </div>
              <div className="flex justify-between font-semibold text-[#111827] pt-1 border-t border-slate-100">
                <span>Additional Fee:</span>
                <span className="font-mono text-[#0284c7]">+$4,200 USD</span>
              </div>
            </div>

            <p className="text-[10px] text-[#6b7280] pt-1">
              {scopeApproved
                ? 'Client signature captured. Invoice auto-generated in QuickBooks.'
                : 'Click button above to simulate client approval.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
