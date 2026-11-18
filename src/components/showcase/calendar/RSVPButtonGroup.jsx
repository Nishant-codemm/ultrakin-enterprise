import React from 'react';
import { Check, HelpCircle, X } from 'lucide-react';
import { cn } from '../../../lib/cn';

export default function RSVPButtonGroup({ currentRsvp, onUpdateRsvp, eventId }) {
  const OPTIONS = [
    {
      id: 'going',
      label: 'Going',
      icon: Check,
      activeClass: 'bg-indigo-600 text-white border-indigo-400 font-semibold shadow-sm',
      hoverClass: 'hover:bg-indigo-950/40 hover:text-indigo-200 hover:border-indigo-500/30',
    },
    {
      id: 'maybe',
      label: 'Maybe',
      icon: HelpCircle,
      activeClass: 'bg-amber-600 text-white border-amber-400 font-semibold shadow-sm',
      hoverClass: 'hover:bg-amber-950/40 hover:text-amber-200 hover:border-amber-500/30',
    },
    {
      id: 'declined',
      label: 'Declined',
      icon: X,
      activeClass: 'bg-rose-600 text-white border-rose-400 font-semibold shadow-sm',
      hoverClass: 'hover:bg-rose-950/40 hover:text-rose-200 hover:border-rose-500/30',
    },
  ];

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-obsidian-muted">
          Your Response
        </span>
        <span className="text-[10.5px] font-mono text-slate-400 capitalize">
          Status: <span className="text-white font-medium">{currentRsvp || 'Pending'}</span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-black/40 border border-white/[0.08]">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isActive = currentRsvp === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onUpdateRsvp(eventId, opt.id)}
              aria-pressed={isActive}
              className={cn(
                'py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1.5 border transition-all cursor-pointer',
                isActive
                  ? opt.activeClass
                  : cn('bg-white/[0.02] border-transparent text-slate-400', opt.hoverClass)
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
