import React from 'react';
import { useReducedMotion } from 'framer-motion';

export default function WorkspaceModuleSkeleton({ title = 'Opening workspace view...' }) {
  const reduceMotion = useReducedMotion();
  const pulseClass = reduceMotion ? '' : 'animate-pulse';

  return (
    <div
      role="status"
      aria-label={title}
      className={`flex min-h-[580px] w-full flex-col bg-obsidian-canvas text-slate-200 select-none ${pulseClass}`}
    >
      {/* ── Top Bar Skeleton (Header) ── */}
      <div className="flex min-h-12 items-center justify-between border-b border-obsidian-border bg-obsidian-surface/60 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 rounded-md bg-white/10" />
          <div className="h-4 w-28 rounded-md bg-white/15" />
          <div className="hidden h-3 w-36 rounded-md bg-white/5 sm:block" />
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden h-7 w-32 rounded-lg border border-white/5 bg-white/[0.03] sm:block" />
          <div className="h-5 w-16 rounded-full bg-white/10" />
        </div>
      </div>

      {/* ── Main Canvas Grid Skeleton ── */}
      <div className="grid flex-1 md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)_260px]">
        {/* Left Sub-nav Skeleton */}
        <div className="hidden border-r border-obsidian-border bg-obsidian-base/60 p-3 md:block">
          <div className="mb-3 px-2 py-1">
            <div className="h-2.5 w-16 rounded bg-white/10" />
          </div>
          <div className="space-y-1.5">
            {[75, 55, 90, 65, 45].map((w, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg px-2.5 py-2">
                <div className="h-3 w-3 shrink-0 rounded bg-white/10" />
                <div className="h-3 rounded bg-white/10" style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Center River Skeleton */}
        <div className="flex flex-col p-4 sm:p-6 min-w-0">
          {/* Header Title Shimmer */}
          <div className="mb-6 border-b border-obsidian-border pb-4">
            <div className="h-2.5 w-24 rounded bg-indigo-400/20" />
            <div className="mt-2 h-5 w-44 rounded bg-white/15" />
            <div className="mt-2 h-3 w-64 rounded bg-white/5" />
          </div>

          {/* Conversation / Card Stream Skeletons */}
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-indigo-500/20" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 rounded bg-white/15" />
                  <div className="h-2.5 w-12 rounded bg-white/5" />
                </div>
                <div className="h-3 w-5/6 rounded bg-white/10" />
                <div className="h-3 w-3/4 rounded bg-white/5" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-lg bg-sky-500/20" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-24 rounded bg-white/15" />
                  <div className="h-2.5 w-14 rounded bg-white/5" />
                </div>
                <div className="h-3 w-11/12 rounded bg-white/10" />
              </div>
            </div>

            {/* Row 3: Agent Synthesizer Box Shimmer */}
            <div className="rounded-xl border border-violet-500/20 bg-violet-500/[0.04] p-4">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-violet-500/25" />
                <div className="space-y-1">
                  <div className="h-3 w-32 rounded bg-violet-200/20" />
                  <div className="h-2 w-20 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 space-y-1.5 pl-9">
                <div className="h-2.5 w-full rounded bg-white/10" />
                <div className="h-2.5 w-4/5 rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Contextual Inspector Skeleton (Desktop) */}
        <div className="hidden border-l border-obsidian-border bg-obsidian-base/40 p-4 lg:flex lg:flex-col">
          <div className="h-2.5 w-20 rounded bg-white/10" />
          <div className="mt-4 rounded-xl border border-obsidian-border bg-obsidian-base p-4 space-y-3">
            <div className="h-4 w-32 rounded bg-white/15" />
            <div className="h-2.5 w-full rounded bg-white/10" />
            <div className="h-2.5 w-3/4 rounded bg-white/10" />
            <div className="h-8 w-full rounded-lg bg-white/5 border border-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
