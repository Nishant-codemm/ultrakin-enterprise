/**
 * DemoWindowFrame.jsx
 * Floating app-window wrapper for product demo widgets.
 * White card with optional browser chrome bar.
 */
import React from 'react';
import { cn } from '../../lib/cn';

export default function DemoWindowFrame({
  children,
  url,
  className = '',
  innerClassName = '',
  height = 'h-[440px]',
  noPad = false,
}) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-[#e7e4de] bg-white',
        'shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_24px_48px_-12px_rgba(0,0,0,0.1)]',
        height,
        className
      )}
    >
      {/* Optional browser chrome */}
      {url && (
        <div className="flex h-9 shrink-0 items-center gap-3 border-b border-[#f0ede8] bg-[#faf9f7] px-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <span className="rounded-md bg-white px-3 py-0.5 text-[11px] text-[#8c8c8c] font-mono border border-[#e7e4de] select-none max-w-[260px] truncate">
              {url}
            </span>
          </div>
        </div>
      )}
      {/* Content */}
      <div className={cn('flex h-full flex-col overflow-hidden', !noPad && !url && 'p-0', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
