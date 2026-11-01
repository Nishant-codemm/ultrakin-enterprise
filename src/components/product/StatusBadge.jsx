/**
 * StatusBadge.jsx
 * Semantic status pills used across product demos.
 */
import React from 'react';
import { cn } from '../../lib/cn';

const VARIANTS = {
  connected:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  approval:   'bg-amber-50  text-amber-700  border border-amber-200',
  error:      'bg-red-50    text-red-700    border border-red-200',
  new:        'bg-blue-50   text-blue-700   border border-blue-200',
  pending:    'bg-slate-100 text-slate-600  border border-slate-200',
  enabled:    'bg-emerald-50 text-emerald-700 border border-emerald-200',
  disabled:   'bg-slate-100 text-slate-400  border border-slate-200',
  high:       'bg-red-50    text-red-700    border border-red-200',
  medium:     'bg-amber-50  text-amber-700  border border-amber-200',
  low:        'bg-slate-100 text-slate-500  border border-slate-200',
  record:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
};

const DOT_COLORS = {
  connected: 'bg-emerald-500',
  approval:  'bg-amber-500',
  error:     'bg-red-500',
  new:       'bg-blue-500',
  enabled:   'bg-emerald-500',
  high:      'bg-red-500',
  medium:    'bg-amber-500',
};

export default function StatusBadge({ status = 'pending', label, showDot = false, className = '' }) {
  const text = label || status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium',
        VARIANTS[status] || VARIANTS.pending,
        className
      )}
    >
      {showDot && DOT_COLORS[status] && (
        <span className={cn('h-1.5 w-1.5 rounded-full', DOT_COLORS[status])} />
      )}
      {text}
    </span>
  );
}
