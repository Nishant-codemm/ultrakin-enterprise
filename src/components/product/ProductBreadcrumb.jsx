/**
 * ProductBreadcrumb.jsx
 * "Products / [Icon] Mail" breadcrumb matching original Ultrakin standard.
 */
import React from 'react';
import { ChevronRight } from 'lucide-react';

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function ProductBreadcrumb({ productName, productColor, icon: Icon }) {
  return (
    <nav className="mb-8 flex items-center gap-2 text-[13px] text-[#667085]" aria-label="Breadcrumb">
      <button
        onClick={() => navigate('/')}
        className="hover:text-[#111827] transition-colors duration-150 focus-visible:outline-none focus-visible:underline cursor-pointer"
      >
        Products
      </button>
      <ChevronRight size={12} className="text-[#d0cdc7]" />
      <span className="flex items-center gap-1.5 font-medium text-[#111827]">
        {Icon ? (
          <span
            className="flex h-4 w-4 items-center justify-center rounded-sm text-white shadow-2xs shrink-0"
            style={{ backgroundColor: productColor || '#dc2626' }}
          >
            <Icon size={10} strokeWidth={2.5} />
          </span>
        ) : productColor ? (
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: productColor }}
          />
        ) : null}
        <span>{productName}</span>
      </span>
    </nav>
  );
}
