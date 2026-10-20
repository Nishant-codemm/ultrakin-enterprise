import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  KeyRound,
  Users,
  FileCheck,
  Globe,
  ArrowRight,
  CheckCircle2,
  X,
  Download,
  Server,
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';

const TRUST_ITEMS = [
  {
    id: 'soc2',
    icon: Shield,
    label: 'SOC 2 Type II Certified',
    desc: 'Audited annually across Security, Availability, and Confidentiality trust service principles.',
    auditor: 'A-LIGN & Ernst & Young LLC (2026)',
    sha: 'SHA-256: 9b18c07e2a419f048d21b0e149c0d1',
    scope: 'Unified in-memory event bus, Matrix E2EE chat, Living Docs CRDT, and JMAP mail proxy.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    id: 'gdpr',
    icon: Globe,
    label: 'GDPR & Regional Data Residency',
    desc: 'Pin tenant data exclusively to Frankfurt (eu-central-1) or US-East with zero cross-border replication.',
    auditor: 'Bird & Bird European Privacy Council',
    sha: 'DPA Ref: EU-2026-GDPR-7741',
    scope: 'Automated right-to-be-forgotten, localized backup snapshots, and strict DPA covenants.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    id: 'cmek',
    icon: Lock,
    label: 'End-to-End Encryption & CMEK',
    desc: 'AES-256 at rest, TLS 1.3 in transit, and customer-managed keys via AWS KMS / HashiCorp Vault.',
    auditor: 'Trail of Bits Cryptography Review',
    sha: 'FIPS 140-3 Hardware Enclave Level 3',
    scope: 'Megolm double-ratchet E2EE for spaces, envelopes for living docs, and S/MIME email signing.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/20',
  },
  {
    id: 'saml',
    icon: KeyRound,
    label: 'SSO & SAML 2.0 / OIDC',
    desc: 'Enterprise single sign-on with Okta, Microsoft Entra ID (Azure AD), Google Workspace, and Ping.',
    auditor: 'Enterprise Identity Federation Certified',
    sha: 'IdP Metadata: SP-Initiated & IdP-Initiated',
    scope: 'Just-in-time (JIT) provisioning, forced MFA policies, and centralized session revocation.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  {
    id: 'scim',
    icon: Users,
    label: 'SCIM 2.0 Automated Lifecycle',
    desc: 'Instant user onboarding, automated department group mapping, and immediate offboarding de-provisioning.',
    auditor: 'RFC 7644 SCIM Conformance Verified',
    sha: 'API v2 /scim/v2/Users & /Groups',
    scope: 'Attribute-based access control (ABAC) with sub-second synchronization from Okta/Entra.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
  },
  {
    id: 'audit',
    icon: FileCheck,
    label: 'Immutable SIEM Audit Streaming',
    desc: 'Tamper-evident operational audit logs streamed in real time to Splunk, Datadog, or Amazon S3 buckets.',
    auditor: 'FINRA Rule 4511 & SEC 17a-4 Compliant',
    sha: 'WORM (Write Once, Read Many) Storage Protocol',
    scope: 'Export every login, message edit, document export, and JMAP dispatch with actor IP provenance.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

export default function SecuritySection() {
  const { openDemoDrawer, addToast } = useWorkspace();
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="security" className="py-24 md:py-32 bg-[#0B0F19] divider-hairline relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-center">
          {/* Left text */}
          <div>
            <p className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ENTERPRISE SECURITY & COMPLIANCE
            </p>
            <h2 className="text-4xl md:text-[48px] font-bold leading-[1.04] tracking-[-0.025em] text-white mb-5">
              Security that IT teams<br />actually trust.
            </h2>
            <p className="text-lg leading-[1.65] text-slate-300 mb-8 font-normal">
              Ultrakin is built for organizations where compliance is non-negotiable. SOC 2 Type II audited, GDPR compliant, and designed to meet enterprise procurement checklists without slowing your team down.
            </p>

            {/* Regional Residency Telemetry */}
            <div className="p-4 rounded-xl border border-white/8 bg-[#07090E]/90 mb-8 space-y-3">
              <div className="text-xs font-semibold text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  Sovereign Data Residency Regions
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Zero Cross-Border Sync
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-[#0F172A]/80 border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center">
                  <div className="text-white font-bold">EU-Central</div>
                  <div className="text-slate-400 text-[10px]">Frankfurt · 18ms</div>
                </div>
                <div className="p-2 rounded-lg bg-[#0F172A]/80 border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center">
                  <div className="text-white font-bold">US-East</div>
                  <div className="text-slate-400 text-[10px]">N. Virginia · 12ms</div>
                </div>
                <div className="p-2 rounded-lg bg-[#0F172A]/80 border border-white/6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] text-center">
                  <div className="text-white font-bold">APAC</div>
                  <div className="text-slate-400 text-[10px]">Tokyo · 42ms</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {[
                '99.95% uptime financial SLA guaranteed',
                'Dedicated Technical Account Manager & 24/7 SLA',
                'Custom data retention policies & CMEK support',
                'Isolated tenant databases & private VPC options',
              ].map(item => (
                <div key={item} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <button
              onClick={openDemoDrawer}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer group"
            >
              Request Custom Enterprise Security Packet & NDA
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: compliance interactive cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => setSelectedItem(item)}
                className="rounded-2xl border border-white/8 bg-[#07090E]/80 backdrop-blur-md p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_32px_rgba(0,0,0,0.6)] hover:border-indigo-500/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_20px_48px_-8px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-10 w-10 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} strokeWidth={1.7} />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-300 flex items-center gap-1">
                    Inspect <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {item.label}
                </h4>
                <p className="text-xs leading-relaxed text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Verification Inspector Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-lg rounded-2xl bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/12 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.85)] text-slate-200 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${selectedItem.bg} border ${selectedItem.border} flex items-center justify-center`}>
                    <selectedItem.icon className={`w-5 h-5 ${selectedItem.color}`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{selectedItem.label}</h3>
                    <p className="text-xs text-slate-400">Official Compliance Specification</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="font-semibold text-slate-300">Auditing Authority / Standard:</span>
                  <p className="text-slate-400 mt-0.5">{selectedItem.auditor}</p>
                </div>

                <div>
                  <span className="font-semibold text-slate-300">Architecture Scope:</span>
                  <p className="text-slate-400 mt-0.5">{selectedItem.scope}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#07090E] border border-white/6 font-mono text-[11px] space-y-1">
                  <div className="text-slate-400">Cryptographic Verification:</div>
                  <div className="text-indigo-300 break-all">{selectedItem.sha}</div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/8">
                <button
                  onClick={() => {
                    addToast('Security Summary Downloaded', `Generated verifiable audit overview for ${selectedItem.label}.`, 'info');
                    setSelectedItem(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-400" />
                  Download Summary PDF
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    openDemoDrawer();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-indigo-500/25"
                >
                  Request Full Audit Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
