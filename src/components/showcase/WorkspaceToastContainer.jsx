import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Bot, Activity } from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

const TOAST_ICONS = {
  success: CheckCircle2,
  ai: Bot,
  info: Activity,
};

const TOAST_THEMES = {
  success: {
    container: 'bg-obsidian-surface/95 border-emerald-500/40 text-emerald-200 shadow-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  ai: {
    container: 'bg-obsidian-surface/95 border-indigo-500/40 text-indigo-200 shadow-indigo-500/10',
    iconColor: 'text-indigo-400',
  },
  info: {
    container: 'bg-obsidian-surface/95 border-obsidian-border-medium text-slate-200',
    iconColor: 'text-sky-400',
  },
};

function WorkspaceToastContainer() {
  const { toasts } = useWorkspace();

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
          const Icon = TOAST_ICONS[toast.type] || Activity;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'pointer-events-auto p-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-2.5 text-xs',
                theme.container
              )}
            >
              <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', theme.iconColor)} />

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white">{toast.title}</div>
                <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.desc}</div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default memo(WorkspaceToastContainer);

