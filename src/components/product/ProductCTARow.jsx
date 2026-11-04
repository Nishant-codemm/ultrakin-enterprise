/**
 * ProductCTARow.jsx
 * "Create a workspace" primary + "Talk to us" text link.
 * Reused across all product pages.
 */
import React from 'react';
import { ArrowRight } from 'lucide-react';

const APP_URL = 'https://app.ultrakin.com';

export default function ProductCTARow({ primaryLabel = 'Create a workspace' }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <a
        href={APP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-11 items-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-semibold text-white
                   transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]
                   hover:bg-[#1f2937] hover:-translate-y-px active:translate-y-0
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2
                   motion-reduce:transform-none motion-reduce:transition-none"
      >
        {primaryLabel}
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
        />
      </a>
      <a
        href={`${APP_URL}/talk`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-[#667085] underline-offset-2 hover:text-[#111827] hover:underline
                   transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
      >
        Talk to us
      </a>
    </div>
  );
}
