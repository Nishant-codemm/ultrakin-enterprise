import React, { memo } from 'react';
import { ChevronLeft, ChevronRight, Lock, RotateCw } from 'lucide-react';

function BrowserFrame({
  address = 'app.ultrakin.com/workspace',
  children,
  className = '',
  viewportClassName = '',
  ariaLabel,
  showControls = true,
  statusLabel = 'TLS 1.3 · E2EE',
}) {
  // Format address into protocol, host, and path
  const cleanAddress = address.replace(/^https?:\/\//, '');
  const [host, ...pathParts] = cleanAddress.split('/');
  const path = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';

  return (
    <div
      role="region"
      aria-label={ariaLabel || `Interactive browser preview of ${cleanAddress}`}
      className={`marketing-browser-frame rounded-[1.25rem] border border-border bg-surface-raised shadow-[0_24px_64px_-36px_rgba(39,34,25,0.24),0_4px_16px_rgba(39,34,25,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 ${className}`}
    >
      {/* ── Realistic Chrome Toolbar ── */}
      <div className="flex h-11 items-center justify-between gap-3 border-b border-border bg-surface-raised/95 px-3.5 sm:px-4 backdrop-blur-sm select-none">
        {/* Left: Window Controls + Navigation Buttons */}
        <div className="flex items-center gap-3">
          {/* macOS Window Dots with subtle rim */}
          <div aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
          </div>

          {/* Navigation Arrows (M-01) */}
          {showControls && (
            <div aria-hidden="true" className="hidden items-center gap-0.5 text-ink-subtle/60 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink">
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink">
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink">
                <RotateCw className="h-3 w-3" />
              </span>
            </div>
          )}
        </div>

        {/* Center: Realistic SSL URL Bar */}
        <div className="flex min-w-0 max-w-[440px] flex-1 items-center justify-center">
          <div className="flex w-full items-center justify-center gap-1.5 truncate rounded-md border border-border/80 bg-surface-soft/80 px-2.5 py-1 text-[11px] font-mono text-ink-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] sm:max-w-md">
            <Lock className="h-3 w-3 shrink-0 text-emerald-600/90" aria-label="Secure SSL connection" />
            <span className="hidden text-ink-subtle/50 sm:inline">https://</span>
            <span className="font-semibold text-ink-soft truncate">{host}</span>
            {path && <span className="text-ink truncate">{path}</span>}
          </div>
        </div>

        {/* Right: Enterprise Security Badge or Minimalist Status (M-01) */}
        <div className="flex items-center justify-end">
          {statusLabel ? (
            <span className="hidden items-center gap-1.5 rounded-full border border-border-hairline bg-surface px-2 py-0.5 font-mono text-[9.5px] font-medium text-ink-subtle md:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              {statusLabel}
            </span>
          ) : (
            <span aria-hidden="true" className="w-[52px]" />
          )}
        </div>
      </div>

      {/* ── Product Viewport ── */}
      <div className={`product-preview relative overflow-hidden ${viewportClassName}`}>
        {children}
      </div>
    </div>
  );
}

export default memo(BrowserFrame);
