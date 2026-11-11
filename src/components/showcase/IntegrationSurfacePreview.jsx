import React, { memo } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '../../lib/cn';
import BrowserFrame from '../BrowserFrame';
import { PRODUCT_ICON_CONFIG, PREVIEWS } from '../../data/integrationData';

function IntegrationSurfacePreview({ item }) {
  const iconConfig = PRODUCT_ICON_CONFIG[item.name] || {
    icon: Sparkles,
    bg: 'bg-indigo-600',
    glow: '#6366f1',
  };
  const Icon = iconConfig.icon;

  const preview = PREVIEWS[item.name] ?? {
    surface: item.name.toLowerCase(),
    actor: `${item.name} · connected view`,
    message: `Connected view of how ${item.name} context sits alongside team work.`,
    outcome: 'Integrated into workspace context',
  };

  return (
    <BrowserFrame
      address={`workspace.ultrakin.app/integrations/${item.name.toLowerCase().replaceAll(' ', '-')}`}
      tabTitle={`Ultrakin · ${item.name} Connector`}
      className="mt-6 max-w-md"
    >
      <div className="overflow-hidden bg-[#0d1118]/90 shadow-[0_18px_44px_-34px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.035)]">
        {/* Surface Header */}
        <div className="flex items-center justify-between border-b border-obsidian-border-soft px-3.5 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-white shadow-sm', iconConfig.bg)}>
              <Icon size={12} strokeWidth={2.2} />
            </span>
            <span className="truncate text-[10px] font-medium text-slate-300">{preview.surface}</span>
          </div>
          <span className="ml-3 flex shrink-0 items-center gap-1.5 text-[10px] text-obsidian-muted">
            <span className={cn('h-1.5 w-1.5 rounded-full', item.category === 'Built in' ? 'bg-emerald-300/80' : 'bg-slate-400/70')} />
            {item.category === 'Built in' ? 'Sample view' : 'Example only'}
          </span>
        </div>

        {/* Content Body */}
        <div className="px-3.5 py-3.5">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-obsidian-muted">
            <span>Context</span>
            <span className="text-obsidian-border">·</span>
            <span className="text-slate-400">{preview.actor}</span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-[1.6] text-slate-200">{preview.message}</p>
          <div className="mt-3.5 flex items-center gap-2 border-t border-obsidian-border-soft pt-2.5 text-[10.5px] text-indigo-100/85">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-indigo-300/10 text-[10px] text-indigo-200">
              <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
            </span>
            <span className="truncate">{preview.outcome}</span>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

export default memo(IntegrationSurfacePreview);
