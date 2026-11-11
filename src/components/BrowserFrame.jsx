import React, { memo } from 'react';
import { ChevronLeft, ChevronRight, Lock, RotateCw, X, Plus } from 'lucide-react';
import UltrakinLogo from './primitives/UltrakinLogo';

function BrowserFrame({
  address = 'workspace.ultrakin.app/workspace',
  children,
  className = '',
  viewportClassName = '',
  ariaLabel,
  showControls = true,
  statusLabel = 'TLS 1.3 · E2EE',
  tabTitle,
}) {
  // Format address into protocol, host, and path
  const cleanAddress = address.replace(/^https?:\/\//, '');
  const [host, ...pathParts] = cleanAddress.split('/');
  const path = pathParts.length > 0 ? `/${pathParts.join('/')}` : '';

  // Derive human-readable tab label if not explicitly provided
  const displayTabTitle = tabTitle || (
    path.includes('#')
      ? `Ultrakin · ${path.split('#')[1]}`
      : path.length > 1
      ? `Ultrakin · ${pathParts[pathParts.length - 1].replace(/-/g, ' ')}`
      : 'Ultrakin · Workspace'
  );

  return (
    <div
      role="region"
      aria-label={ariaLabel || `Interactive browser preview of ${cleanAddress}`}
      className={`marketing-browser-frame rounded-[1.25rem] border border-border bg-surface-raised shadow-[0_24px_64px_-36px_rgba(39,34,25,0.24),0_4px_16px_rgba(39,34,25,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] transition-all duration-300 ${className}`}
    >
      {/* ── Realistic Desktop Browser Tab Bar (M-01) ── */}
      <div className="flex h-9 items-center justify-between border-b border-border/70 bg-surface-soft/90 px-3.5 sm:px-4 backdrop-blur-sm select-none">
        {/* Left: Window Dots + Active Tab Strip */}
        <div className="flex items-center gap-3">
          {/* macOS Window Controls */}
          <div aria-hidden="true" className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
          </div>

          {/* Active Tab */}
          <div className="ml-2 flex items-center gap-2 rounded-t-lg border-t border-x border-border/80 bg-surface-raised px-2.5 py-1 shadow-sm">
            <UltrakinLogo size={12} />
            <span className="max-w-[140px] truncate text-[10.5px] font-medium text-ink sm:max-w-[200px]">
              {displayTabTitle}
            </span>
            <span
              aria-hidden="true"
              className="flex h-3.5 w-3.5 items-center justify-center rounded text-ink-subtle hover:bg-surface-soft hover:text-ink cursor-pointer"
            >
              <X className="h-2.5 w-2.5" />
            </span>
          </div>

          {/* Add Tab Button */}
          <span
            aria-hidden="true"
            className="hidden h-5 w-5 items-center justify-center rounded text-ink-subtle/60 hover:bg-surface-raised hover:text-ink cursor-pointer sm:flex"
            title="New tab"
          >
            <Plus className="h-3 w-3" />
          </span>
        </div>

        {/* Right: Window Status Minimap */}
        <div className="hidden items-center gap-2 text-[9px] font-mono text-ink-subtle/70 sm:flex">
          <span>Enterprise Preview</span>
        </div>
      </div>

      {/* ── Realistic Chrome Navigation Toolbar ── */}
      <div className="flex h-10 items-center justify-between gap-3 border-b border-border bg-surface-raised/95 px-3.5 sm:px-4 backdrop-blur-sm select-none">
        {/* Navigation Arrows */}
        {showControls && (
          <div aria-hidden="true" className="hidden items-center gap-0.5 text-ink-subtle/70 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink cursor-pointer">
              <ChevronLeft className="h-3.5 w-3.5" />
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink cursor-pointer">
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
            <span className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-surface-soft hover:text-ink cursor-pointer">
              <RotateCw className="h-3 w-3" />
            </span>
          </div>
        )}

        {/* Center: Realistic SSL URL Bar */}
        <div className="flex min-w-0 max-w-[460px] flex-1 items-center justify-center">
          <div className="flex w-full items-center justify-center gap-1.5 truncate rounded-md border border-border/80 bg-surface-soft/80 px-2.5 py-1 text-[11px] font-mono text-ink-muted shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] sm:max-w-md">
            <Lock className="h-3 w-3 shrink-0 text-emerald-600/90" aria-label="Secure SSL connection" />
            <span className="hidden text-ink-subtle/50 sm:inline">https://</span>
            <span className="font-semibold text-ink-soft truncate">{host}</span>
            {path && <span className="text-ink truncate">{path}</span>}
          </div>
        </div>

        {/* Right: Enterprise Security Badge or Minimalist Status */}
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
