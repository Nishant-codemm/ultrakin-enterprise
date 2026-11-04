/**
 * DemoWindowFrame.jsx
 * Tier-1 Production SaaS App Window Wrapper
 * Features:
 * - Multi-layer ambient occlusion shadows with inner specular hairline
 * - Interactive Chrome bar with clickable URL that triggers "Copied" feedback
 * - Strict Retina hairline border
 */
import React, { useState, useEffect, useRef } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function DemoWindowFrame({
  children,
  url,
  className = '',
  innerClassName = '',
  height = 'h-[440px]',
  noPad = false,
}) {
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleCopyUrl = () => {
    if (!url) return;
    navigator.clipboard?.writeText(`https://${url}`);
    setCopied(true);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl border border-[rgba(17,24,39,0.08)] bg-white',
        'shadow-[0_0_0_1px_rgba(17,24,39,0.04),0_2px_4px_rgba(17,24,39,0.03),0_12px_24px_-4px_rgba(17,24,39,0.07),0_32px_64px_-12px_rgba(17,24,39,0.1)]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]',
        height,
        className
      )}
    >
      {/* Interactive macOS-grade browser chrome */}
      {url && (
        <div className="flex h-9 shrink-0 items-center justify-between border-b border-[#f0ede8] bg-[#faf9f7] px-3.5 select-none">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbc2e] border border-[#dea123]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] border border-[#1ca32e]" />
          </div>

          <button
            type="button"
            onClick={handleCopyUrl}
            title="Click to copy demo URL"
            className="group flex items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 text-[11px] text-[#667085] hover:text-[#111827] font-mono border border-[#e7e4de] hover:border-[#d0cdc7] transition-all cursor-pointer shadow-2xs max-w-[280px] truncate"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate">{url}</span>
            {copied ? (
              <span className="flex items-center gap-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                <Check size={9} /> Copied
              </span>
            ) : (
              <Copy size={9} className="opacity-0 group-hover:opacity-70 transition-opacity ml-0.5" />
            )}
          </button>

          <div className="w-10" />
        </div>
      )}

      {/* Content Canvas */}
      <div className={cn('flex h-full flex-col overflow-hidden', !noPad && !url && 'p-0', innerClassName)}>
        {children}
      </div>
    </div>
  );
}
