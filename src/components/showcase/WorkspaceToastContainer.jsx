import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Bot, Activity } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';

export default function WorkspaceToastContainer() {
  const { toasts } = useWorkspace();

  return (
    <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'pointer-events-auto p-3 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-2.5 text-xs',
              toast.type === 'success'
                ? 'bg-[#0F172A]/95 border-emerald-500/40 text-emerald-200 shadow-emerald-500/10'
                : toast.type === 'ai'
                ? 'bg-[#0F172A]/95 border-indigo-500/40 text-indigo-200 shadow-indigo-500/10'
                : 'bg-[#0F172A]/95 border-white/10 text-slate-200'
            )}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />}
            {toast.type === 'ai' && <Bot className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />}
            {toast.type === 'info' && <Activity className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />}

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">{toast.title}</div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.desc}</div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
