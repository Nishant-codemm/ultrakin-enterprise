/**
 * EcommerceSolutionDemo.jsx
 * Interactive demo for /solutions/ecommerce ("Online stores")
 * Recreates the verified Ultrakin workflow:
 * Inbound Customer Exchange Email -> Real-Time Shopify Sync -> 1-Click Return Slip & Inventory Hold.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ShoppingBag,
  CheckCircle2,
  Package,
  Truck,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function EcommerceSolutionDemo() {
  const reduceMotion = useReducedMotion();
  const [returnIssued, setReturnIssued] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fef3c7] text-[#f59e0b]">
            <ShoppingBag size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Order #8821 · Size Exchange Request</span>
              <StatusBadge variant={returnIssued ? 'success' : 'enabled'} text={returnIssued ? 'Return Slip Sent' : 'Awaiting Action'} />
            </div>
            <p className="text-[10px] text-[#6b7280]">Customer: Maya Chen · Lifetime Spend: $480 (VIP Tier)</p>
          </div>
        </div>

        <button
          onClick={() => setReturnIssued(!returnIssued)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
            returnIssued
              ? 'bg-emerald-600 text-white'
              : 'bg-[#f59e0b] text-white hover:bg-[#d97706] shadow-sm'
          }`}
        >
          <RotateCcw size={12} />
          <span>{returnIssued ? 'Return Slip Active (USPS 9400)' : 'Generate Return Label & Hold Size L'}</span>
        </button>
      </div>

      {/* ─── Two-Column Message & Shopify Sync ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row flex-1 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[#e5e2dc]">
        {/* Left: Customer Email */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
          <div className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AvatarChip name="Maya Chen" color="#5c5bd6" size="xs" />
                <span className="font-semibold text-[#111827]">Maya Chen</span>
                <span className="text-[10px] text-[#9ca3af]">9:42 AM</span>
              </div>
              <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[9px] font-bold text-amber-800">VIP BUYER</span>
            </div>
            <p className="text-[11px] text-[#374151] pl-6 leading-relaxed">
              "Hi! I received the Merino Wool Crewneck in Medium yesterday, but it’s a bit snug around the shoulders. Could I exchange it for a Large instead? Thank you!"
            </p>
          </div>

          <div className="rounded-lg border border-[#fef3c7] bg-[#fffbeb] p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900">
              <Sparkles size={13} className="text-[#f59e0b]" />
              <span className="text-[11px]">
                Warehouse inventory check: 14 units of Size L in stock at NJ Fulfillment Center.
              </span>
            </div>
          </div>
        </div>

        {/* Right: Shopify Live Order Context */}
        <div className="w-72 p-3.5 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Shopify Live Telemetry</p>
            <span className="font-mono text-[10px] text-emerald-600 font-bold">Connected</span>
          </div>

          <div className="rounded-xl border border-[#e5e2dc] bg-white p-3 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-semibold text-[#111827]">Merino Wool Crewneck</span>
              <span className="font-mono font-bold text-[#111827]">$140 USD</span>
            </div>

            <div className="space-y-1 text-[11px] text-[#4b5563]">
              <div className="flex justify-between">
                <span>Ordered Item:</span>
                <span className="font-medium text-[#111827]">Size M / Charcoal</span>
              </div>
              <div className="flex justify-between">
                <span>Requested Swap:</span>
                <span className="font-semibold text-[#f59e0b]">Size L / Charcoal</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Carrier:</span>
                <span className="font-medium text-[#111827]">USPS Priority Mail</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span className="text-[#6b7280]">Return Policy Status:</span>
              <span className="font-semibold text-emerald-700">Eligible (Day 2 of 30)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
