/**
 * ProfessionalServicesSolutionDemo.jsx
 * Interactive demo for /solutions/professional-services ("Law and accounting firms")
 * Recreates the verified Ultrakin workflow:
 * Encrypted Client Vault -> Zero-Data-Retention AI Analysis -> Cryptographic Audit Trail.
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';

export default function ProfessionalServicesSolutionDemo() {
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#faf9f7] text-xs select-none font-sans relative">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-[#e5e2dc] bg-white px-4 py-2.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#475569]">
            <Scale size={15} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[#111827]">Client Vault: Apex Mergers & Acquisitions</span>
              <span className="flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                <Lock size={10} className="text-emerald-600" />
                <span>AES-256 Encrypted</span>
              </span>
            </div>
            <p className="text-[10px] text-[#6b7280]">Partner in Charge: Eleanor Sterling, CPA & JD</p>
          </div>
        </div>

        <button
          onClick={() => setShowAuditModal(!showAuditModal)}
          className="flex items-center gap-1.5 rounded-md border border-[#e5e2dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#475569] hover:bg-[#f1f5f9] transition-all cursor-pointer shadow-2xs"
        >
          <ShieldCheck size={13} className="text-emerald-600" />
          <span>{showAuditModal ? 'Hide Audit Log' : 'Inspect Regulatory Audit Log'}</span>
        </button>
      </div>

      {/* ─── Vault Documents & Private AI Review ────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden divide-x divide-[#e5e2dc]">
        {/* Left: Confidential Document Records */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white">
          <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Privileged Files Vault</p>

          <div className="space-y-2">
            <div className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#e5e2dc] text-[#475569]">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">Audited_Financial_Disclosures_2026.pdf</p>
                  <p className="text-[10px] text-[#6b7280]">Uploaded via client portal · Signed SHA-256 verified</p>
                </div>
              </div>
              <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                Verified Sealed
              </span>
            </div>

            <div className="rounded-xl border border-[#e5e2dc] bg-[#faf9f7] p-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-[#e5e2dc] text-[#475569]">
                  <FileText size={16} />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">Non_Disclosure_Agreement_Mutual.pdf</p>
                  <p className="text-[10px] text-[#6b7280]">Executed by 4 authorized signatories</p>
                </div>
              </div>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                Executed
              </span>
            </div>
          </div>

          {/* Zero Data Retention AI Callout */}
          <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[#334155] font-semibold text-[11px]">
              <Sparkles size={12} className="text-[#64748b]" />
              <span>Zero-Data-Retention Private Legal AI</span>
            </div>
            <p className="text-[10px] text-[#64748b] leading-relaxed">
              No training on client data. Ephemeral in-memory context analysis with strict attorney-client privilege isolation.
            </p>
          </div>
        </div>

        {/* Right: Real-Time Immutable Audit Stream */}
        <div className="w-72 p-3.5 space-y-3 overflow-y-auto bg-[#faf9f7] shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold text-[#9ca3af] uppercase tracking-wider">Access Ledger</p>
            <span className="text-[10px] font-mono text-emerald-600">SEC / IRS Compliant</span>
          </div>

          <div className="space-y-2 text-[10px]">
            <div className="rounded-lg border border-[#e5e2dc] bg-white p-2 space-y-0.5 shadow-2xs">
              <div className="flex justify-between font-semibold text-[#111827]">
                <span>Eleanor Sterling (Partner)</span>
                <span className="font-mono text-[9px] text-[#9ca3af]">14:22:10</span>
              </div>
              <p className="text-[#6b7280]">Decrypted & viewed Financial_Disclosures</p>
              <p className="font-mono text-[9px] text-slate-400 truncate">Hash: 8b7e21a4f09d... (2FA Verified)</p>
            </div>

            <div className="rounded-lg border border-[#e5e2dc] bg-white p-2 space-y-0.5 shadow-2xs">
              <div className="flex justify-between font-semibold text-[#111827]">
                <span>Marcus Vance (Client VP)</span>
                <span className="font-mono text-[9px] text-[#9ca3af]">11:05:40</span>
              </div>
              <p className="text-[#6b7280]">Uploaded revisions to schedule B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
