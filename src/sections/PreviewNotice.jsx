import React from 'react';

export default function PreviewNotice() {
  return (
    <section
      aria-label="Preview information"
      className="border-y border-white/[0.04] bg-transparent py-4"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 text-center sm:flex-row sm:gap-3 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-indigo-300/[0.08] px-2.5 py-1 text-[10px] font-medium tracking-wide text-indigo-200/90">
          Interactive preview
        </span>
        <p className="text-[13px] leading-6 text-slate-400">
          Uses sample data. Email, meeting, and integration actions are simulated.
        </p>
      </div>
    </section>
  );
}
