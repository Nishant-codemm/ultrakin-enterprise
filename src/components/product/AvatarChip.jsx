/**
 * AvatarChip.jsx
 * Colored circle with initials — shared across all product demos.
 */
import React from 'react';
import { cn } from '../../lib/cn';

const SIZE_MAP = {
  xs: 'h-5 w-5 text-[9px]',
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-8 w-8 text-[13px]',
  lg: 'h-10 w-10 text-[15px]',
  xl: 'h-12 w-12 text-[17px]',
};

export default function AvatarChip({ person, size = 'md', className = '', showRing = false, online = false }) {
  if (!person) return null;
  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none',
        SIZE_MAP[size],
        showRing && 'ring-2 ring-white',
        className
      )}
      style={{ backgroundColor: person.color }}
      title={person.name}
      aria-label={person.name}
    >
      {person.initials}
      {online && (
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
      )}
    </span>
  );
}
