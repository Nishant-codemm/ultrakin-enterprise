import React from 'react';

export default function BrowserFrame({ address, children, className = '', viewportClassName = '' }) {
  return (
    <div className={`marketing-browser-frame ${className}`}>
      <div className="marketing-browser-toolbar">
        <div aria-hidden="true" className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="marketing-browser-address">{address}</div>
        <span aria-hidden="true" className="w-[42px]" />
      </div>
      <div className={`product-preview ${viewportClassName}`}>{children}</div>
    </div>
  );
}
