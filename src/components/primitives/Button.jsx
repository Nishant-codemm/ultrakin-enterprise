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
    'group relative inline-flex items-center justify-center font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b91ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090c12] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
    md: 'h-10 px-4 text-sm rounded-lg gap-2',
    lg: 'h-12 px-6 text-base rounded-xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#7779ee] hover:bg-[#8587f5] active:bg-[#696bd8] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_3px_10px_-4px_rgba(99,102,241,0.42)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_5px_14px_-5px_rgba(99,102,241,0.48)] border border-white/[0.08] hover:-translate-y-px active:translate-y-0',
    secondary:
      'bg-white/[0.035] hover:bg-white/[0.07] text-[#F1F5F9] border border-white/[0.1] hover:border-white/[0.16] shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-px active:translate-y-0',
    ghost:
      'bg-transparent hover:bg-white/6 text-slate-300 hover:text-white border border-transparent',
    outline:
      'bg-white/[0.02] hover:bg-white/[0.06] text-slate-200 hover:text-white border border-white/14 hover:border-white/24 shadow-sm hover:-translate-y-0.5 active:translate-y-0',
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
