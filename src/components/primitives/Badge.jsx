import React from 'react';
import { cn } from '../../lib/cn';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  icon: Icon,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center font-medium rounded-full border transition-colors select-none tracking-tight';

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  };

  const variantStyles = {
    live: 'bg-emerald-400/10 text-emerald-200 border-emerald-400/20',
    ai: 'bg-violet-400/10 text-violet-200 border-violet-400/20',
    warn: 'bg-amber-400/10 text-amber-200 border-amber-400/20',
    destruct: 'bg-rose-400/10 text-rose-200 border-rose-400/20',
    indigo: 'bg-brand-soft text-brand-text border-brand/20',
    neutral: 'bg-surface-soft text-ink-muted border-border',
  };

  const dotColors = {
    live: 'bg-emerald-300',
    ai: 'bg-violet-300',
    warn: 'bg-amber-300',
    destruct: 'bg-rose-300',
    indigo: 'bg-brand',
    neutral: 'bg-ink-subtle',
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {dot ? (
        <span className="relative flex h-2 w-2">
          {variant === 'live' && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColors[variant]
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
        </span>
      ) : null}
      {Icon ? <Icon className="w-3.5 h-3.5 shrink-0" /> : null}
      <span>{children}</span>
    </span>
  );
}
