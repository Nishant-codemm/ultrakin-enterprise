import React from 'react';
import { cn } from '../../lib/cn';

export default function GlassCard({
  children,
  className = '',
  interactive = false,
  elevation = 'md',
  ...props
}) {
  const elevationStyles = {
    sm: 'bg-[#0F172A]/50 border border-white/6 shadow-[0_4px_16px_rgba(0,0,0,0.3)]',
    md: 'bg-[#0F172A]/70 border border-white/8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.45)]',
    lg: 'bg-[#1E293B]/70 border border-white/12 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.55)]',
  };

  return (
    <div
      className={cn(
        'backdrop-blur-xl rounded-2xl transition-all duration-200',
        elevationStyles[elevation],
        interactive &&
          'hover:bg-[#1E293B]/80 hover:border-indigo-500/35 hover:shadow-[0_12px_40px_-4px_rgba(99,102,241,0.2)] hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
