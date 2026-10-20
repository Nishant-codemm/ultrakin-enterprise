import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  DollarSign,
  HelpCircle,
  ArrowUp,
  Calendar,
  Search,
} from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { cn } from '../lib/cn';

const SECTIONS = [
  { id: 'hero', label: 'Kernel', icon: Cpu },
  { id: 'workflows', label: 'Loops', icon: Sparkles },
  { id: 'features', label: 'Capabilities', icon: Layers },
  { id: 'platform', label: 'Bento', icon: Compass },
  { id: 'security', label: 'Trust', icon: Shield },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

export default function FloatingOrbitPill() {
  const {
    openDemoDrawer,
    openSearchPalette,
    activeSection,
    isHeroVisible,
    scrollToSection,
  } = useWorkspace();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isHeroVisible && (
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.88 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 select-none max-w-[98vw] sm:max-w-none"
        >
          <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#0B0F19]/95 backdrop-blur-2xl border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_18px_48px_rgba(0,0,0,0.75)] ring-1 ring-white/5 shrink-0">
            {/* Scroll-Spy Section Tabs */}
            <div className="flex items-center gap-0.5 sm:gap-1 px-1 shrink-0">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                const IconComponent = sec.icon;

                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={cn(
                      'group relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-[0.97]',
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]'
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-orbit-indicator"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 border border-indigo-400/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_18px_rgba(99,102,241,0.55),0_2px_8px_rgba(99,102,241,0.4)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}
                    <IconComponent
                      className={cn(
                        'w-3.5 h-3.5 relative z-10 transition-colors',
                        isActive ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'text-slate-400 group-hover:text-slate-200'
                      )}
                      strokeWidth={2}
                    />
                    <span
                      className={cn(
                        'relative z-10 text-[11px] sm:text-xs font-sans tracking-tight whitespace-nowrap transition-colors',
                        isActive ? 'text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : 'text-slate-400 font-medium group-hover:text-slate-200'
                      )}
                    >
                      {sec.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Vertical Separator */}
            <div className="w-[1px] h-5 bg-white/12 mx-1 shrink-0 hidden sm:block" />

            {/* Quick Enterprise Demo Action */}
            <button
              type="button"
              onClick={openDemoDrawer}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 active:scale-95 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all cursor-pointer shadow-sm shrink-0 whitespace-nowrap"
              title="Open Enterprise Technical Architecture Drawer"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>Book Demo</span>
            </button>

            {/* Quick ⌘K Universal Search Trigger */}
            <button
              type="button"
              onClick={openSearchPalette}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Universal Search & Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
            </button>

            {/* Scroll to Top Trigger */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer shrink-0 ml-0.5"
              title="Return to top of document"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}