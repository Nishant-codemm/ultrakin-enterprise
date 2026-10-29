import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
    md: 'h-10 px-4 text-sm rounded-lg gap-2',
    lg: 'h-12 px-6 text-base rounded-xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-brand hover:bg-brand-hover active:bg-[#233fa4] text-white shadow-[0_6px_18px_-10px_rgba(49,86,207,.55)] hover:shadow-[0_10px_24px_-12px_rgba(49,86,207,.62)] border border-brand/20 hover:-translate-y-px active:translate-y-0',
    secondary:
      'bg-surface hover:bg-surface-hover text-ink border border-border hover:border-border-strong shadow-[0_1px_2px_rgba(17,24,39,.04)] hover:shadow-[0_5px_14px_-8px_rgba(17,24,39,.18)] hover:-translate-y-px active:translate-y-0',
    ghost:
      'bg-transparent hover:bg-surface-soft text-ink-muted hover:text-ink border border-transparent',
    outline:
      'bg-surface-soft hover:bg-surface-hover text-ink-soft hover:text-ink border border-border hover:border-border-strong shadow-sm hover:-translate-y-0.5 active:translate-y-0',
    destructive:
      'bg-[#F43F5E] hover:bg-[#E11D48] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_16px_-4px_rgba(244,63,94,0.45)] border border-rose-400/30 hover:-translate-y-0.5 active:translate-y-0',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-105" />
      ) : null}
      <span>{children}</span>
      {!isLoading && IconRight ? (
        <IconRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}
