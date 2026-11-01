/**
 * WorkspaceAppRail.jsx
 * Unified Workspace OS App Rail (Dock) shared across product and solution demos.
 * Provides consistent capability switching with interactive client-side routing.
 */
import React from 'react';
import {
  MessageSquare,
  Video,
  Mail,
  FileText,
  CheckSquare,
  Workflow,
  Sparkles,
} from 'lucide-react';
import AvatarChip from './AvatarChip';
import { cn } from '../../lib/cn';

function navigate(path) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const APPS = [
  { id: 'chat', label: 'Chat', icon: MessageSquare, path: '/products/chat', color: '#5c5bd6' },
  { id: 'calls', label: 'Calls', icon: Video, path: '/products/calls', color: '#059669' },
  { id: 'mail', label: 'Mail', icon: Mail, path: '/products/mail', color: '#dc2626' },
  { id: 'docs', label: 'Docs', icon: FileText, path: '/products/docs', color: '#0284c7' },
  { id: 'lists', label: 'Lists', icon: CheckSquare, path: '/products/lists', color: '#10b981' },
  { id: 'automations', label: 'Automations', icon: Workflow, path: '/products/automations', color: '#c026d3' },
];

export default function WorkspaceAppRail({
  activeApp = 'mail',
  theme = 'light',
  className = '',
}) {
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'w-11 shrink-0 flex flex-col items-center py-2.5 justify-between select-none z-10',
        isDark
          ? 'bg-[#12151a] border-r border-white/[0.08]'
          : 'bg-[#f8f7f5] border-r border-[#e7e4de]',
        className
      )}
      aria-label="Workspace application dock"
    >
      <div className="flex flex-col items-center gap-2">
        {/* Ultrakin Brand Roundel */}
        <button
          type="button"
          onClick={() => navigate('/workspace')}
          title="Switch Workspace (Acme Studio)"
          className="h-7 w-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-[11px] shadow-xs hover:opacity-90 transition-opacity cursor-pointer focus:outline-none"
        >
          U
        </button>

        <div className={cn('w-5 h-px my-0.5', isDark ? 'bg-white/10' : 'bg-[#e7e4de]')} />

        {/* Connected Workspace Capability Roundels */}
        {APPS.map((app) => {
          const Icon = app.icon;
          const isActive = activeApp === app.id;

          return (
            <button
              key={app.id}
              type="button"
              onClick={() => navigate(app.path)}
              title={`${app.label} · Ultrakin Workspace`}
              className={cn(
                'h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer focus:outline-none',
                isActive
                  ? 'text-white shadow-xs ring-2'
                  : isDark
                  ? 'text-white/50 hover:text-white hover:bg-white/10'
                  : 'text-[#667085] hover:text-[#111827] hover:bg-[#eeece7]'
              )}
              style={
                isActive
                  ? { backgroundColor: app.color, ringColor: `${app.color}40` }
                  : undefined
              }
            >
              <Icon size={13} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>

      {/* User Presence Avatar in Rail */}
      <div className="pt-2">
        <AvatarChip
          name="Priya K"
          color="#c026d3"
          size="xs"
          online
          showRing={!isDark}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
