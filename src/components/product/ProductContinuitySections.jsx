import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const SALES_EMAIL = 'mailto:sales@ultrakin.com';
const WORKSPACE_URL = 'https://app.ultrakin.com/auth';

export function ProductHandoffs({ productName, handoffs = [] }) {
  if (!handoffs.length) return null;

  return (
    <section className="mx-auto mt-20 max-w-7xl border-t border-[#e7e4de] px-5 pb-16 pt-14 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="max-w-[18ch] font-sans text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#111827]">
          What {productName} hands to the other tools.
        </h2>

        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-3">
          {handoffs.map((handoff, index) => (
            <a
              key={handoff.slug}
              href={`/products/${handoff.slug}`}
              className="group flex min-h-32 flex-col justify-between border-t border-[#e7e4de] py-4 text-inherit transition-colors hover:border-[#b8c3e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3156cf] focus-visible:ring-offset-4"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] tabular-nums text-[#667085]">0{index + 1}</span>
                <ArrowUpRight size={15} aria-hidden="true" className="shrink-0 text-[#667085] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#3156cf] motion-reduce:transform-none motion-reduce:transition-none" />
              </div>
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-[#111827]">{handoff.product}</h3>
                <p className="mt-1.5 text-[13px] leading-5 text-[#667085]">{handoff.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductClosingCTA({ productName }) {
  return (
    <section className="border-t border-[#e7e4de] bg-[#f6f5f2] px-5 py-14 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
        <div>
          <h2 className="font-sans text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-[#111827]">
            Try {productName} with your team.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#667085]">
            Every tool comes with every workspace. No card needed for the free plan.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={WORKSPACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-11 items-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1f2937] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            Create a workspace
            <ArrowRight size={15} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
          </a>
          <a
            href={SALES_EMAIL}
            className="text-sm font-medium text-[#667085] underline-offset-2 transition-colors hover:text-[#111827] hover:underline focus-visible:outline-none focus-visible:underline motion-reduce:transition-none"
          >
            Talk to us
          </a>
        </div>
      </div>
    </section>
  );
}
