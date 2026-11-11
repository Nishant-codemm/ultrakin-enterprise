import React, { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  ChevronDown,
  Cpu,
  FileCheck2,
  KeyRound,
  Layers,
  RefreshCw,
  Scale,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { cn } from '../lib/cn';
import { navigate } from '../lib/navigate';
import { ULTRAKIN_EASE } from '../lib/motion';
import { useWorkspace } from '../context/useWorkspace';

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'security', label: 'Security & Compliance' },
  { id: 'deployment', label: 'Deployment & Infra' },
  { id: 'governance', label: 'Governance & Licensing' },
];

const FAQS = [
  {
    id: 'zero-retention',
    category: 'security',
    tag: 'DATA SECURITY & PRIVACY',
    icon: ShieldCheck,
    q: 'Does Ultrakin train AI models on our proprietary code or customer data?',
    a: (
      <>
        <strong>No. Ultrakin enforces a strict zero-data-retention policy for AI operations.</strong>{' '}
        Customer workspaces, prompt payloads, source code, document revisions, and contextual telemetry are never used to train, retrain, or fine-tune public or proprietary foundational models. All enterprise contracts include legally binding non-training covenants, isolated runtime memory, and cryptographic tenant separation.
      </>
    ),
  },
  {
    id: 'sso-scim',
    category: 'security',
    tag: 'IDENTITY & ACCESS',
    icon: KeyRound,
    q: 'How does Ultrakin handle enterprise identity, SSO, and user lifecycle provisioning?',
    a: (
      <>
        Ultrakin supports native SAML 2.0 and OIDC integrations compatible with <strong>Okta, Microsoft Entra ID (Azure AD), Google Workspace, PingFederate, and OneLogin</strong>.{' '}
        We provide Just-In-Time (JIT) provisioning and automated SCIM 2.0 synchronization, ensuring that team memberships, roles, and administrative privileges are automatically synced and access is revoked instantaneously when an employee offboards.
      </>
    ),
  },
  {
    id: 'deployment-models',
    category: 'deployment',
    tag: 'INFRASTRUCTURE & HOSTING',
    icon: Cpu,
    q: 'Can Ultrakin be deployed in self-hosted VPCs or air-gapped sovereign environments?',
    a: (
      <>
        Yes. In addition to our SOC 2 Type II certified multi-tenant cloud (US and EU data residency options), we provide <strong>Dedicated Private Cloud</strong> deployments in your designated AWS, Azure, or GCP region, as well as <strong>containerized Kubernetes deployments (via verified Helm charts)</strong>. Self-hosted deployments can route through our air-gapped local LLM inference gateway for strict data sovereignty.
      </>
    ),
  },
  {
    id: 'migration-tools',
    category: 'deployment',
    tag: 'MIGRATION & INTEGRATION',
    icon: RefreshCw,
    q: 'How complex is migrating from existing tools like Slack, Notion, Jira, and Zendesk?',
    a: (
      <>
        Ultrakin includes automated zero-downtime migration utilities. Our migration suite connects via OAuth or admin export to import channels, direct messages, rich documents, task boards, and historical tickets while preserving timestamps, author attribution, attachments, and thread hierarchies. Organizations frequently run Ultrakin in parallel with legacy tools during phased department rollouts.
      </>
    ),
  },
  {
    id: 'rbac-audit-logs',
    category: 'governance',
    tag: 'AUDIT & GOVERNANCE',
    icon: FileCheck2,
    q: 'What role-based access controls (RBAC) and compliance audit logs are available?',
    a: (
      <>
        Administrators have granular access control down to individual workspaces, channels, task boards, documents, and autonomous agent capabilities. Every system event, authentication attempt, permission modification, file download, and agent-executed action generates an <strong>immutable, cryptographically signed audit log</strong> exportable directly to your SIEM via Webhook, AWS S3 bucket sync, or Datadog/Splunk connectors.
      </>
    ),
  },
  {
    id: 'uptime-sla',
    category: 'deployment',
    tag: 'SLA & RESILIENCE',
    icon: Zap,
    q: 'What uptime guarantees and disaster recovery SLAs are backed by contract?',
    a: (
      <>
        Our Enterprise tier is backed by a <strong>99.99% uptime Service Level Agreement</strong> with contractual financial remedies. Our multi-region active-active architecture guarantees a Recovery Point Objective (RPO) of &lt; 1 minute and a Recovery Time Objective (RTO) of &lt; 15 minutes. Enterprise customers receive 24/7 priority support with guaranteed &lt; 15-minute response times from dedicated site reliability engineers.
      </>
    ),
  },
  {
    id: 'licensing-tokens',
    category: 'governance',
    tag: 'LICENSING & TRANSPARENCY',
    icon: Scale,
    q: 'How does licensing work between human team seats and autonomous agents?',
    a: (
      <>
        Ultrakin uses predictable seat-based pricing for human team members, which includes unlimited collaboration features (Chat, Docs, Lists, Mailbox, and Huddles). Autonomous agents operate with dedicated resource quotas and predictable, capped token pools with configurable budget guardrails so your finance team never encounters surprise overage bills. Custom enterprise MSAs and billing via AWS or GCP Marketplace are fully supported.
      </>
    ),
  },
  {
    id: 'poc-evaluation',
    category: 'security',
    tag: 'PROOF OF CONCEPT',
    icon: Layers,
    q: 'How do security and engineering teams evaluate Ultrakin before full enterprise rollout?',
    a: (
      <>
        We offer a structured 30-day Enterprise Proof-of-Concept (PoC) program. You receive a dedicated isolated staging environment, assisted migration pipelines, a designated Solutions Architect, and full access to our SOC 2 Type II report, penetration testing summaries, and vendor risk assessment packages.
      </>
    ),
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0); // First question open by default for immediate context
  const [selectedCategory, setSelectedCategory] = useState('all');
  const baseId = useId();
  const reduceMotion = useReducedMotion();
  const { openDemoDrawer } = useWorkspace();

  const filteredFaqs = selectedCategory === 'all'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="divider-hairline bg-transparent py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        {/* Eyebrow & Headline */}
        <div className="mb-9 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-text">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Frequently Asked Questions
          </div>
          <h2
            id="faq-heading"
            className="font-display text-3xl font-normal leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.65rem]"
          >
            Architected for enterprise clarity.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Direct answers on data security, zero-retention AI guarantees, hybrid VPC deployment, and licensing for engineering leaders and procurement teams.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-2" role="tablist" aria-label="FAQ categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setOpenIdx(0); // open first in filtered category
                }}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer',
                  isActive
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-surface border border-border text-ink-muted hover:border-border-strong hover:text-ink',
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Accordion Card (L-01 standardized radius) */}
        <div className="premium-card relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-[radial-gradient(ellipse_at_left,rgba(79,70,229,.06),transparent_72%)]"
          />

          {/* Top metadata strip */}
          <div className="relative flex items-center justify-between border-b border-border px-5 py-3.5 sm:px-7">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-medium tracking-[0.18em] text-ink-subtle uppercase">
                ENTERPRISE ARCHITECTURE & COMPLIANCE FAQ
              </span>
            </div>
            <span className="font-mono text-[10px] text-ink-subtle">
              {String(filteredFaqs.length).padStart(2, '0')} {filteredFaqs.length === 1 ? 'ENTRY' : 'ENTRIES'}
            </span>
          </div>

          {/* Accordion rows */}
          <div className="relative divide-y divide-border px-5 sm:px-7">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              const panelId = `${baseId}-panel-${faq.id}`;
              const triggerId = `${baseId}-trigger-${faq.id}`;
              const Icon = faq.icon;

              return (
                <div key={faq.id} className="py-1">
                  <h3>
                    <button
                      id={triggerId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[14px] font-medium text-ink transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
                    >
                      <div className="flex items-start gap-3.5 sm:items-center">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-border bg-surface-muted font-mono text-[10px] font-semibold text-ink-subtle sm:mt-0">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-text">
                              <Icon className="h-2.5 w-2.5" aria-hidden="true" />
                              {faq.tag}
                            </span>
                          </div>
                          <span className="block text-[13.5px] font-medium leading-snug text-ink group-hover:text-brand-text sm:text-[14px]">
                            {faq.q}
                          </span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface-muted transition-all duration-200',
                          isOpen ? 'bg-brand/10 border-brand/20 text-brand-text rotate-180' : 'text-ink-subtle group-hover:text-ink',
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease: ULTRAKIN_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pl-8 pr-4 sm:pl-10 sm:pr-8">
                          <p className="border-l-2 border-brand/30 pl-4 text-[13px] leading-relaxed text-ink-muted">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Contact / Procurement Bridge */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-surface-muted/60 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-ink">
              Have custom procurement, compliance, or private VPC requirements?
            </h3>
            <p className="text-[13px] leading-relaxed text-ink-muted">
              Talk directly with our security architects to review SOC 2 reports, pen-test summaries, or custom MSA terms.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openDemoDrawer ? openDemoDrawer() : navigate('/pricing')}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Schedule technical walk-through
            </button>
            <button
              type="button"
              onClick={() => navigate('/security')}
              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-border-strong hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
            >
              Security Overview
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
