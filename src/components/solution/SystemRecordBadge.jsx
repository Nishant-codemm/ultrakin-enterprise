/**
 * SystemRecordBadge.jsx
 * Interactive immutable system-of-record anchor badge.
 * Represents thread/document conversion to permanent workspace record (e.g., SR-28).
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, Plus, ExternalLink } from 'lucide-react';

export default function SystemRecordBadge({
  recordId = 'SR-28',
  collectionName = 'Support requests',
  isLogged = true,
  onToggle,
  showLink = false,
  className = '',
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      aria-label={isLogged ? `Logged as ${recordId} in ${collectionName}` : `Log as ${collectionName}`}
      className={`group flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors cursor-pointer select-none ${
        isLogged
          ? 'border border-[#bbf7d0] bg-[#f0fdf4] text-emerald-800 hover:bg-[#dcfce7] shadow-2xs'
          : 'border border-[#e5e2dc] bg-white text-[#4b5563] hover:bg-[#f3f1ed]'
      } ${className}`}
    >
      <CheckCircle2
        size={12}
        className={isLogged ? 'text-emerald-600 transition-colors' : 'text-slate-400 group-hover:text-slate-600'}
      />
      <span className="truncate">
        {isLogged ? (
          <>
            Logged as <span className="font-mono font-bold">{recordId}</span> in {collectionName}
          </>
        ) : (
          `+ Log as ${collectionName}`
        )}
      </span>
      {showLink && isLogged && (
        <ExternalLink size={10} className="text-emerald-600/70 group-hover:text-emerald-800 transition-colors shrink-0" />
      )}
    </motion.button>
  );
}
