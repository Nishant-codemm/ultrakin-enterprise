import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-brand-text shadow-2xs">
        <Compass className="h-3.5 w-3.5 text-brand-text" />
        <span>404 · Page Not Found</span>
      </div>

      <h1 className="mt-6 font-display text-[clamp(2.5rem,5vw,4rem)] font-normal leading-[1.08] tracking-[-0.035em] text-ink">
        This page could not be found.
      </h1>

      <p className="mt-4 max-w-md text-sm leading-6 text-ink-muted">
        The link you followed may be broken, or the page may have been moved or removed.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          Back to Home
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
        <a
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-4 py-2.5 text-xs font-medium text-ink transition-colors hover:bg-surface-hover hover:border-brand/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        >
          View Plans
        </a>
      </div>
    </div>
  );
}
