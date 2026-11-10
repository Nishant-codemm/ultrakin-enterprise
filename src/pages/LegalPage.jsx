import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Download, ShieldCheck } from 'lucide-react';
import { navigate } from '../lib/navigate';

const LEGAL_TABS = [
  { id: 'privacy', label: 'Privacy Policy', path: '/privacy' },
  { id: 'terms', label: 'Terms of Service', path: '/terms' },
  { id: 'dpa', label: 'Data Processing (DPA)', path: '/dpa' },
  { id: 'subprocessors', label: 'Subprocessors', path: '/subprocessors' },
  { id: 'soc2', label: 'SOC 2 Type II', path: '/soc2' },
];

const SUBPROCESSORS_DATA = [
  { name: 'Amazon Web Services (AWS)', role: 'Cloud Infrastructure & Storage', location: 'United States & Germany (EU)', transfer: 'Encrypted at rest & in transit' },
  { name: 'Cloudflare, Inc.', role: 'DDoS Protection & Edge Caching', location: 'Global Edge Network', transfer: 'Network telemetry & encrypted traffic' },
  { name: 'OpenAI, LLC', role: 'LLM Inference (Zero Data Retention Agreement)', location: 'United States', transfer: 'Contextual prompts (no training permitted)' },
  { name: 'PostHog, Inc.', role: 'Product Telemetry (Self-hosted Option available)', location: 'EU (Frankfurt) Cloud', transfer: 'Aggregated pseudonymous usage metrics' },
  { name: 'Twilio SendGrid', role: 'Transactional Email Dispatch', location: 'United States', transfer: 'Workspace notification emails & auth tokens' },
];

export default function LegalPage() {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/privacy' : '/privacy';
  const matchedTab = LEGAL_TABS.find((t) => t.path === currentPath)?.id;
  const [selectedTab, setSelectedTab] = useState(null);

  const activeTab = selectedTab || matchedTab || 'privacy';

  const handleTabClick = (tab) => {
    setSelectedTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="min-h-screen bg-page pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        
        {/* Back navigation & header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="group mb-5 inline-flex items-center gap-2 text-xs font-medium text-ink-muted transition-colors hover:text-ink cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to home
          </button>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-brand-text">
                Trust, Compliance & Governance
              </p>
              <h1 className="mt-2 font-display text-[clamp(2.2rem,4vw,3.5rem)] font-normal leading-tight tracking-[-0.035em] text-ink">
                Enterprise Legal Agreements
              </h1>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-raised px-3 py-1 text-[11px] font-mono text-ink-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Updated January 2026 · v2.4
              </span>
            </div>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-2 border-b border-border pb-4" role="tablist" aria-label="Legal documents">
          {LEGAL_TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => handleTabClick(tab)}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand text-white shadow-sm'
                  : 'bg-surface-raised text-ink-muted hover:bg-surface-hover hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Document Content View */}
        <div className="mt-10 rounded-2xl border border-border bg-surface-raised p-6 shadow-elevated sm:p-10 lg:p-12">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <article className="prose prose-slate max-w-none space-y-6 text-[13px] leading-relaxed text-ink-muted">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Privacy Policy</h2>
                <p className="text-xs text-ink-subtle">Effective Date: January 1, 2026 · Ultrakin Technologies, Inc.</p>
              </div>

              <div className="rounded-xl border border-border-hairline bg-surface-soft p-4 text-ink-soft">
                <p className="font-medium text-ink">Commitment to Enterprise Data Isolation:</p>
                <p className="mt-1">
                  Ultrakin does not sell customer data, does not use customer proprietary communications to train foundation models, and guarantees logical tenant boundary separation enforced at the database and encryption layers.
                </p>
              </div>

              <h3 className="text-lg font-medium text-ink">1. Information We Collect and Process</h3>
              <p>
                We collect information directly from workspace administrators and authorized users during registration and account configuration (name, corporate email, role, SSO credentials). Content submitted to workspaces (chats, files, meeting transcripts, living docs) is processed strictly on behalf of the customer as a data processor.
              </p>

              <h3 className="text-lg font-medium text-ink">2. Zero Model Training Guarantee</h3>
              <p>
                Any text, code, document, or audio processed by our autonomous agents (Ukin) is processed via dedicated, zero-retention model endpoints under contractual terms that forbid the LLM providers from storing, inspecting, or utilizing workspace tokens for general model training.
              </p>

              <h3 className="text-lg font-medium text-ink">3. International Data Transfers & GDPR Compliance</h3>
              <p>
                Ultrakin supports data residency options in the United States and the European Union. Transfers of personal data from the EEA, UK, and Switzerland adhere to Standard Contractual Clauses (SCCs) approved by the European Commission.
              </p>

              <h3 className="text-lg font-medium text-ink">4. User Rights and Data Deletion</h3>
              <p>
                Authorized workspace administrators can export all conversation archives, files, and task records in structured JSON/CSV format or trigger an expedited cryptographically verified tenant purge upon contract conclusion.
              </p>
            </article>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <article className="prose prose-slate max-w-none space-y-6 text-[13px] leading-relaxed text-ink-muted">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Master Terms of Service</h2>
                <p className="text-xs text-ink-subtle">Last Revised: January 2026</p>
              </div>

              <h3 className="text-lg font-medium text-ink">1. Subscription and Seat Allocation</h3>
              <p>
                Customers acquire enterprise licenses based on active workspace seats and included capabilities. Administrators may reallocate seats across organizational units at any time through the administration console.
              </p>

              <h3 className="text-lg font-medium text-ink">2. Service Level Agreement (SLA)</h3>
              <p>
                Ultrakin provides a 99.98% monthly uptime commitment for Business and Enterprise tiers. In the event of an unscheduled platform disruption exceeding SLA allowances, customers are entitled to service credits as outlined in their Order Form.
              </p>

              <h3 className="text-lg font-medium text-ink">3. Intellectual Property and Content Ownership</h3>
              <p>
                Customers retain all right, title, and interest in and to all workspace data, message threads, files, agent output, and telemetry generated within their tenant. Ultrakin claims no ownership rights over customer content.
              </p>

              <h3 className="text-lg font-medium text-ink">4. Security and Administrative Responsibilities</h3>
              <p>
                Customers are responsible for maintaining secure configuration of their Identity Provider (IdP), enforcing Multi-Factor Authentication (MFA), and managing role-based access permissions among their workspace members.
              </p>
            </article>
          )}

          {/* TAB 3: DATA PROCESSING AGREEMENT */}
          {activeTab === 'dpa' && (
            <article className="prose prose-slate max-w-none space-y-6 text-[13px] leading-relaxed text-ink-muted">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Data Processing Addendum (DPA)</h2>
                <p className="text-xs text-ink-subtle">Compliant with Regulation (EU) 2016/679 (GDPR) and UK GDPR</p>
              </div>

              <h3 className="text-lg font-medium text-ink">1. Scope and Roles</h3>
              <p>
                This DPA applies to the processing of Personal Data by Ultrakin on behalf of Customer in connection with the Ultrakin Workspace Services. For the purposes of Data Protection Laws, Customer is the Data Controller and Ultrakin is the Data Processor.
              </p>

              <h3 className="text-lg font-medium text-ink">2. Technical and Organizational Security Measures (TOMs)</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>AES-256 encryption for all data at rest across database partitions and object stores.</li>
                <li>TLS 1.3 enforced for all ingress and egress network traffic.</li>
                <li>Annual penetration testing conducted by independent CREST-accredited auditing firms.</li>
                <li>Role-Based Access Control (RBAC) with just-in-time access for internal operations under strict dual-control authorization.</li>
              </ul>

              <h3 className="text-lg font-medium text-ink">3. Security Incident Notification</h3>
              <p>
                Ultrakin will notify Customer without undue delay and, in any event, within 48 hours of becoming aware of a verified Personal Data Breach impacting Customer data.
              </p>
            </article>
          )}

          {/* TAB 4: SUBPROCESSORS */}
          {activeTab === 'subprocessors' && (
            <article className="space-y-6 text-[13px] text-ink-muted">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">Authorized Subprocessors</h2>
                <p className="mt-1 text-xs text-ink-subtle">
                  Ultrakin engages third-party infrastructure and service providers to support product delivery. All subprocessors are bound by data protection obligations no less restrictive than those in our DPA.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-surface-soft font-semibold text-ink">
                    <tr>
                      <th className="px-4 py-3">Subprocessor</th>
                      <th className="px-4 py-3">Service Role</th>
                      <th className="px-4 py-3">Data Location</th>
                      <th className="px-4 py-3">Security & Transfer Mechanism</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {SUBPROCESSORS_DATA.map((sub) => (
                      <tr key={sub.name} className="hover:bg-surface-soft/50">
                        <td className="px-4 py-3.5 font-medium text-ink">{sub.name}</td>
                        <td className="px-4 py-3.5">{sub.role}</td>
                        <td className="px-4 py-3.5 font-mono text-[11px]">{sub.location}</td>
                        <td className="px-4 py-3.5 text-ink-subtle">{sub.transfer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-ink-subtle">
                To subscribe to email notifications for upcoming subprocessor changes, email <a href="mailto:security@ultrakin.com" className="text-brand-text underline">security@ultrakin.com</a>.
              </p>
            </article>
          )}

          {/* TAB 5: SOC 2 TYPE II */}
          {activeTab === 'soc2' && (
            <article className="space-y-6 text-[13px] text-ink-muted">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink">SOC 2 Type II Certification</h2>
                <p className="mt-1 text-xs text-ink-subtle">AICPA Trust Services Criteria: Security, Availability, and Confidentiality</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-border bg-surface-soft p-4">
                  <p className="text-[10px] font-mono uppercase text-ink-subtle">Audit Period</p>
                  <p className="mt-1 text-base font-semibold text-ink">12 Months (2025–2026)</p>
                  <p className="mt-1 text-xs text-ink-subtle">Continuous operational assessment</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-soft p-4">
                  <p className="text-[10px] font-mono uppercase text-ink-subtle">Auditing Body</p>
                  <p className="mt-1 text-base font-semibold text-ink">Schellman & Co.</p>
                  <p className="mt-1 text-xs text-ink-subtle">Independent licensed CPA firm</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-soft p-4">
                  <p className="text-[10px] font-mono uppercase text-ink-subtle">Report Status</p>
                  <p className="mt-1 text-base font-semibold text-emerald-600 flex items-center gap-1">
                    <Check className="h-4 w-4" /> Unqualified Opinion
                  </p>
                  <p className="mt-1 text-xs text-ink-subtle">Clean audit with zero exceptions</p>
                </div>
              </div>

              <div className="rounded-xl border border-brand/20 bg-brand-soft/40 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">Request the Full SOC 2 Type II Audit Report</h3>
                    <p className="mt-1 text-xs text-ink-muted">
                      The full 84-page confidential report containing control testing results and auditor opinions is available to enterprise procurement teams under mutual NDA.
                    </p>
                  </div>
                  <a
                    href="mailto:security@ultrakin.com?subject=SOC%202%20Type%20II%20Report%20Request%20-%20NDA"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-brand-hover"
                  >
                    <Download className="h-3.5 w-3.5" /> Request Report (under NDA)
                  </a>
                </div>
              </div>
            </article>
          )}

        </div>

        {/* Contact info bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-ink-subtle sm:flex-row sm:items-center">
          <p>Questions regarding legal terms or compliance? Contact our legal counsel at <a href="mailto:legal@ultrakin.com" className="text-brand-text hover:underline">legal@ultrakin.com</a>.</p>
          <button
            type="button"
            onClick={() => navigate('/security')}
            className="inline-flex items-center gap-1.5 font-medium text-ink-soft hover:text-brand-text cursor-pointer"
          >
            Visit Security Overview <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
