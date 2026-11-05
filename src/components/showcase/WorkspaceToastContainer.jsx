import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Bot, Activity, X } from 'lucide-react';
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

function ToastItem({ toast, onDismiss }) {
  const [isHovered, setIsHovered] = useState(false);
  const remainingTimeRef = useRef(4000);
  const startTimeRef = useRef(0);
  const timerRef = useRef(null);

  const theme = TOAST_THEMES[toast.type] || TOAST_THEMES.info;
  const Icon = TOAST_ICONS[toast.type] || Activity;

  useEffect(() => {
    if (isHovered) return;

    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onDismiss(toast.id);
    }, remainingTimeRef.current);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHovered, toast.id, onDismiss]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = Math.max(800, remainingTimeRef.current - elapsed);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      key={toast.id}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'pointer-events-auto p-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-2.5 text-xs group relative',
        theme.container
      )}
    >
      <Icon className={cn('w-4 h-4 mt-0.5 shrink-0', theme.iconColor)} />

      <div className="flex-1 min-w-0 pr-1">
        <div className="font-semibold text-white">{toast.title}</div>
        <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.desc}</div>
      </div>

      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 -mr-1 -mt-1 active:scale-90"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

function WorkspaceToastContainer() {
  const { toasts } = useWorkspace();
  const [activeToasts, setActiveToasts] = useState([]);
  const dismissedIdsRef = useRef(new Set());

  // Synchronize new incoming notifications from context while respecting local dismissals
  useEffect(() => {
    setActiveToasts((prev) => {
      const existingIds = new Set(prev.map((t) => t.id));
      const newItems = toasts.filter(
        (t) => !existingIds.has(t.id) && !dismissedIdsRef.current.has(t.id)
      );
      if (newItems.length === 0) return prev;
      return [...prev, ...newItems].slice(-4);
    });
  }, [toasts]);

  const handleDismiss = useCallback((toastId) => {
    dismissedIdsRef.current.add(toastId);
    setActiveToasts((prev) => prev.filter((t) => t.id !== toastId));
  }, []);

  return (
    <aside
      aria-label="Notifications"
      className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={handleDismiss} />
        ))}
      </AnimatePresence>
    </aside>
  );
}

export default memo(WorkspaceToastContainer);
