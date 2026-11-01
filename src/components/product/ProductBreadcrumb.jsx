/**
 * ProductBreadcrumb.jsx
 * "Products / Mail" breadcrumb with colored product dot.
 */
import React from 'react';
import { ChevronRight } from 'lucide-react';

function navigate(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function ProductBreadcrumb({ productName, productColor }) {
  return (
    <nav className="mb-8 flex items-center gap-1.5 text-[13px] text-[#667085]" aria-label="Breadcrumb">
      <button
        onClick={() => navigate('/')}
        className="hover:text-[#111827] transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
      >
        Products
      </button>
      <ChevronRight size={12} className="text-[#d0cdc7]" />
      <span className="flex items-center gap-1.5 font-medium text-[#111827]">
        {productColor && (
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: productColor }}
          />
        )}
        {productName}
      </span>
    </nav>
  );
}
