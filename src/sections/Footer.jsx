import React from 'react';
import UltrakinLogo from '../components/primitives/UltrakinLogo';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function Footer({ isHome = true }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="divider-hairline border-t border-border bg-transparent py-14 text-ink-muted sm:py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* 4-Column Enterprise Navigation Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">

          {/* Column 1: Brand & Live Status (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2">
            <a
              href={isHome ? '#hero' : '/'}
              className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <UltrakinLogo size={28} className="shrink-0" />
              <span className="text-xl font-semibold tracking-tight text-ink">Ultrakin</span>
            </a>
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-ink-muted">
              The autonomous workspace for fast teams. Chat, mail, docs, huddles, and tasks—connected by context-aware agents.
            </p>

            {/* Live Infrastructure Status Beacon */}
            <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-border bg-surface-raised px-3 py-2 text-[11px] font-mono text-ink-soft w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
              <span className="text-ink-subtle">·</span>
              <span className="text-ink-subtle">99.98% SLA</span>
            </div>

            <div className="mt-6 flex items-center gap-3 text-ink-subtle">
              <a
                href="https://github.com/Nishant-codemm/ultrakin-enterprise"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-raised transition-colors hover:border-brand/40 hover:text-brand-text"
                aria-label="GitHub Repository"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-raised transition-colors hover:border-brand/40 hover:text-brand-text"
                aria-label="X / Twitter"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface-raised transition-colors hover:border-brand/40 hover:text-brand-text"
                aria-label="LinkedIn"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 0-3.3 1.66 1.66 0 0 0 0 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">Product</p>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              {['Chat & Threads', 'Shared Mailbox', 'Living Docs', 'Huddle Simulator', 'Kanban Tasks', 'AI Agents', 'Integrations'].map((item) => (
                <li key={item}>
                  <a href="#workspace-showcase" className="transition-colors hover:text-brand-text">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform & Solutions */}
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">Platform</p>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li><a href="/workspace" className="transition-colors hover:text-brand-text">Workspace OS</a></li>
              <li><a href="/agents" className="transition-colors hover:text-brand-text">Agent Architecture</a></li>
              <li><a href="/security" className="transition-colors hover:text-brand-text">Trust & Compliance</a></li>
              <li><a href="/pricing" className="transition-colors hover:text-brand-text">Pricing & Plans</a></li>
              <li><a href="#platform" className="transition-colors hover:text-brand-text">Memory Engine</a></li>
              <li><a href="#workflows" className="transition-colors hover:text-brand-text">Workflow Automation</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Enterprise Trust */}
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">Enterprise Trust</p>
            <ul className="mt-4 space-y-2.5 text-[13px]">
              <li><a href="/security" className="inline-flex items-center gap-1 transition-colors hover:text-brand-text">Security Overview <ArrowUpRight className="h-3 w-3" /></a></li>
              <li><a href="mailto:sales@ultrakin.com" className="transition-colors hover:text-brand-text">SOC 2 Report</a></li>
              <li><a href="mailto:sales@ultrakin.com" className="transition-colors hover:text-brand-text">Data Processing (DPA)</a></li>
              <li><a href="mailto:sales@ultrakin.com" className="transition-colors hover:text-brand-text">Privacy Policy</a></li>
              <li><a href="mailto:sales@ultrakin.com" className="transition-colors hover:text-brand-text">Terms of Service</a></li>
              <li><a href="mailto:sales@ultrakin.com" className="transition-colors hover:text-brand-text">Subprocessors</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-[11px] text-ink-subtle sm:flex-row">
          <p>© {currentYear} Ultrakin Technologies, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-text" />
              SOC 2 Type II Certified
            </span>
            <span>·</span>
            <span>GDPR Compliant</span>
            <span>·</span>
            <span>ISO 27001 Aligned</span>
            <span>·</span>
            <span>256-bit AES Encryption</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
