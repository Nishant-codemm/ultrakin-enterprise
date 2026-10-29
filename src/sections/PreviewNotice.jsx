import React from 'react';

export default function PreviewNotice() {
  return (
    <section
      aria-label="Preview information"
      className="border-y border-border bg-surface-soft/70 py-4"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 text-center sm:flex-row sm:gap-3 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-medium tracking-wide text-brand-text">
          Interactive preview
        </span>
        <p className="text-[13px] leading-6 text-ink-muted">
          Uses sample data. Email, meeting, and integration actions are simulated.
        </p>
      </div>
    </section>
  );
}
