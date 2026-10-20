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
    'relative inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07090E] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs rounded-md gap-1.5',
    md: 'h-10 px-4 text-sm rounded-lg gap-2',
    lg: 'h-12 px-6 text-base rounded-xl gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary:
      'bg-[#6366F1] hover:bg-[#4F46E5] active:bg-[#4338CA] text-white shadow-[0_1px_3px_rgba(0,0,0,0.4),0_8px_20px_-4px_rgba(99,102,241,0.45)] border border-indigo-400/30',
    secondary:
      'bg-[#0F172A]/80 hover:bg-[#1E293B] text-[#F1F5F9] border border-white/10 hover:border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.3)]',
    ghost:
      'bg-transparent hover:bg-white/5 text-[#94A3B8] hover:text-[#F1F5F9] border border-transparent',
    outline:
      'bg-transparent hover:bg-white/5 text-[#F1F5F9] border border-white/15 hover:border-indigo-500/40',
    destructive:
      'bg-[#F43F5E] hover:bg-[#E11D48] text-white shadow-[0_4px_16px_-4px_rgba(244,63,94,0.45)] border border-rose-400/30',
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
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {!isLoading && IconRight ? (
        <IconRight className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
}
