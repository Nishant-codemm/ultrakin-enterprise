/**
 * CollisionPresenceBanner.jsx
 * Real-time collision awareness indicator preventing concurrent replies.
 * Shows colleague presence with animated pulse beacon and avatar chip.
 */
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldAlert, Users } from 'lucide-react';
import AvatarChip from '../product/AvatarChip';

export default function CollisionPresenceBanner({
  agent = { name: 'Priya K.', initials: 'PK', color: '#dc2626', role: 'Support Lead' },
  action = 'is drafting a reply...',
  className = '',
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      role="status"
      aria-live="polite"
      className={`flex items-center justify-between gap-2.5 rounded-lg border border-[#fecaca] bg-[#fff5f5] px-3 py-1.5 text-xs text-[#991b1b] shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2">
        {/* Animated pulse beacon */}
        <span className="relative flex h-2 w-2 shrink-0">
          {!reduceMotion && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]" />
        </span>

        <div className="flex items-center gap-1.5">
          <AvatarChip name={agent.name} color={agent.color} size="xs" />
          <span className="font-semibold text-[#7f1d1d]">{agent.name}</span>
          <span className="text-[11px] text-[#991b1b] font-normal">{action}</span>
        </div>
      </div>

      <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#b91c1c] bg-white/70 border border-[#fca5a5] px-1.5 py-0.5 rounded font-semibold hidden sm:inline-block">
        Collision guard active
      </span>
    </motion.div>
  );
}
