/**
 * AvatarChip.jsx
 * Colored circle with initials — shared across all product and solution demos.
 * Unified prop signature: supports both person object and direct name/color/initials props.
 */
import React, { memo } from 'react';
import { cn } from '../../lib/cn';

const SIZE_MAP = {
  xs: 'h-5 w-5 text-[9px]',
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-8 w-8 text-[13px]',
  lg: 'h-10 w-10 text-[15px]',
  xl: 'h-12 w-12 text-[17px]',
};

function getInitials(name = '') {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function AvatarChip({
  person,
  name,
  color,
  initials,
  size = 'md',
  className = '',
  showRing = false,
  online = false,
}) {
  const resolvedName = person?.name || name || 'User';
  const resolvedColor = person?.color || color || '#3156cf';
  const resolvedInitials = person?.initials || initials || getInitials(resolvedName);
  const isOnline = person?.online !== undefined ? person.online : online;

  return (
    <span
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none',
        SIZE_MAP[size] || SIZE_MAP.md,
        showRing && 'ring-2 ring-white',
        className
      )}
      style={{ backgroundColor: resolvedColor }}
      title={resolvedName}
      aria-label={resolvedName}
    >
      {resolvedInitials}
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-white" />
      )}
    </span>
  );
}

export default memo(AvatarChip);

