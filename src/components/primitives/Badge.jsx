import React from 'react';
import { cn } from '../../lib/cn';

const BASE_STYLES =
  'inline-flex items-center font-medium rounded-full border transition-colors select-none tracking-tight';

const SIZE_STYLES = {
  sm: 'text-[11px] px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
  lg: 'text-sm px-3 py-1.5 gap-2',
};

const VARIANT_STYLES = {
  live: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/20',
  ai: 'bg-violet-400/10 text-violet-200 border-violet-400/20',
  warn: 'bg-amber-400/10 text-amber-200 border-amber-400/20',
  destruct: 'bg-rose-400/10 text-rose-200 border-rose-400/20',
  indigo: 'bg-brand-soft text-brand-text border-brand/20',
  neutral: 'bg-surface-soft text-ink-muted border-border',
  obsidian: 'bg-white/[0.06] text-slate-200 border-white/[0.12]',
  obsidianBrand: 'bg-indigo-500/15 text-indigo-200 border-indigo-400/25',
  obsidianSuccess: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/25',
};

const DOT_COLORS = {
  live: 'bg-emerald-300',
  ai: 'bg-violet-300',
  warn: 'bg-amber-300',
  destruct: 'bg-rose-300',
  indigo: 'bg-brand',
  neutral: 'bg-ink-subtle',
  obsidian: 'bg-slate-300',
  obsidianBrand: 'bg-indigo-400',
  obsidianSuccess: 'bg-emerald-400',
};

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const activeDotColor = DOT_COLORS[variant] || DOT_COLORS.neutral;

  return (
    <span
      className={cn(BASE_STYLES, SIZE_STYLES[size] || SIZE_STYLES.md, VARIANT_STYLES[variant] || VARIANT_STYLES.neutral, className)}
      {...props}
    >
      {dot ? (
        <span className="relative flex h-2 w-2">
          {variant === 'live' && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                activeDotColor
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', activeDotColor)} />
        </span>
      ) : null}
      {Icon ? <Icon className="w-3.5 h-3.5 shrink-0" /> : null}
      <span>{children}</span>
    </span>
  );
}
