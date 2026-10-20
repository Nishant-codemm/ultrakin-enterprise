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
    live: 'bg-[#10B981]/10 text-[#34D399] border-[#10B981]/25',
    ai: 'bg-[#8B5CF6]/10 text-[#A78BFA] border-[#8B5CF6]/30',
    warn: 'bg-[#F59E0B]/10 text-[#FBBF24] border-[#F59E0B]/30',
    destruct: 'bg-[#F43F5E]/10 text-[#FB7185] border-[#F43F5E]/30',
    indigo: 'bg-[#6366F1]/10 text-[#818CF8] border-[#6366F1]/30',
    neutral: 'bg-white/5 text-[#94A3B8] border-white/10',
  };

  const dotColors = {
    live: 'bg-[#10B981]',
    ai: 'bg-[#8B5CF6]',
    warn: 'bg-[#F59E0B]',
    destruct: 'bg-[#F43F5E]',
    indigo: 'bg-[#6366F1]',
    neutral: 'bg-[#94A3B8]',
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
