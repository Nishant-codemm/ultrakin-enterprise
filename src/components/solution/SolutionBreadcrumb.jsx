/**
 * SolutionBreadcrumb.jsx
 * "Solutions / [Icon] Solution Name" breadcrumb matching original Ultrakin standard.
 * Features:
 * - Proper aria-current="page" semantics for active item
 * - Navigation to /solutions directory
 */
import React from 'react';
import { ChevronRight } from 'lucide-react';

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function SolutionBreadcrumb({ solutionName, solutionColor, icon: Icon }) {
  return (
    <nav className="mb-8 flex items-center gap-2 text-[13px] text-[#667085]" aria-label="Breadcrumb">
      <button
        type="button"
        onClick={() => navigate('/solutions')}
        className="hover:text-[#111827] transition-colors duration-150 focus-visible:outline-none focus-visible:underline cursor-pointer"
      >
        Solutions
      </button>
      <ChevronRight size={12} className="text-[#d0cdc7]" aria-hidden="true" />
      <span
        aria-current="page"
        className="flex items-center gap-1.5 font-medium text-[#111827]"
      >
        {Icon ? (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-sm text-white shadow-2xs shrink-0"
            style={{ backgroundColor: solutionColor || '#3156cf' }}
            aria-hidden="true"
          >
            <Icon size={10} strokeWidth={2.5} />
          </span>
        ) : solutionColor ? (
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: solutionColor }}
            aria-hidden="true"
          />
        ) : null}
        <span>{solutionName}</span>
      </span>
    </nav>
  );
}
