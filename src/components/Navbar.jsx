import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  MessageSquare,
  Mail,
  FileText,
  Video,
  Bot,
  Search,
  Compass,
  Cpu,
  Layers,
  Shield,
  Sparkles,
  DollarSign,
  HelpCircle,
} from 'lucide-react';
import Button from './primitives/Button';
import Badge from './primitives/Badge';
import UltrakinLogo from './primitives/UltrakinLogo';
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const {
    openDemoDrawer,
    openSearchPalette,
    isHeroVisible,
    activeSection,
    scrollToSection,
  } = useWorkspace();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b',
        !isHeroVisible
          ? 'h-[70px] bg-[#07090E]/94 backdrop-blur-2xl border-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.75),inset_0_-1px_0_rgba(255,255,255,0.06)]'
          : scrolled
            ? 'h-[72px] bg-[#07090E]/85 backdrop-blur-xl border-white/8 shadow-[0_6px_24px_rgba(0,0,0,0.45)]'
            : 'h-[72px] bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Anchor */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            {/* Master Ultrakin Brand Mark */}
            <UltrakinLogo
              size={28}
              id="uk-nav-logo-grad"
              className="shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_14px_rgba(99,102,241,0.45)]"
            />
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-slate-100">
              Ultrakin
            </span>
          </a>

          {/* Contextual Tag: Micro Trust Badge on Hero or Active Section Indicator when scrolled */}
          {isHeroVisible ? (
            <div className="hidden xl:flex items-center">
              <Badge variant="live" size="sm" dot>
                SOC 2 Type II
              </Badge>
            </div>
          ) : (
            <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="capitalize">{activeSection}</span>
            </div>
          )}
        </div>

        {/* Center Navigation Track: Fluid Morph between Platform Links and Illuminated Command Track */}
        <div className="hidden md:flex items-center justify-center flex-1 max-w-3xl mx-auto px-4">
          <AnimatePresence mode="wait" initial={false}>
            {isHeroVisible ? (
              <motion.div
                key="standard-nav"
                initial={{ opacity: 0, y: -4, filter: 'blur(4px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: 4, filter: 'blur(4px)', scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 lg:gap-2"
              >
                {/* Platform Mega Menu Trigger */}
                <div
                  className="relative"
                  onMouseEnter={() => setPlatformOpen(true)}
                  onMouseLeave={() => setPlatformOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer',
                      platformOpen
                        ? 'text-white bg-white/[0.08]'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                    )}
                  >
                    <span>Platform</span>
                    <ChevronDown
                      className={cn('w-3.5 h-3.5 transition-transform duration-200', platformOpen && 'rotate-180')}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {platformOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-full left-0 pt-2 w-84 z-50"
                      >
                        <div className="p-2 rounded-2xl bg-[#0B0F19]/95 border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_24px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl space-y-1">
                          <a
                            href="#chat"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] active:scale-[0.99] transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 shrink-0 shadow-sm">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                                Matrix Spaces Chat
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">Decentralized, E2EE team discussions</div>
                            </div>
                          </a>

                          <a
                            href="#mail"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] active:scale-[0.99] transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/25 shrink-0 shadow-sm">
                              <Mail className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-sky-300 transition-colors">
                                Custom Domain Email
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">Inbound mail connected to tasks</div>
                            </div>
                          </a>

                          <a
                            href="#docs"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] active:scale-[0.99] transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0 shadow-sm">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                                TipTap Living Docs
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">Real-time CRDT specifications</div>
                            </div>
                          </a>

                          <a
                            href="#huddle"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] active:scale-[0.99] transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-violet-500/15 text-violet-400 border border-violet-500/25 shrink-0 shadow-sm">
                              <Video className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                                WebRTC Live Huddles
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">Streaming transcript to tasks</div>
                            </div>
                          </a>

                          <a
                            href="#agent"
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.06] active:scale-[0.99] transition-all group"
                          >
                            <div className="p-2 rounded-lg bg-purple-500/15 text-purple-400 border border-purple-500/25 shrink-0 shadow-sm">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                                Autonomous Ukin Agent
                              </div>
                              <div className="text-xs text-slate-400 leading-snug">Event-driven background synthesis</div>
                            </div>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href="#workflows"
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  Solutions
                </a>

                <a
                  href="#security"
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  Security &amp; Trust
                </a>

                <a
                  href="#pricing"
                  className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-all"
                >
                  Pricing
                </a>
              </motion.div>
            ) : (
              <motion.div
                key="command-track"
                initial={{ opacity: 0, y: 6, filter: 'blur(4px)', scale: 0.96 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -4, filter: 'blur(4px)', scale: 0.96 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1 p-1.5 rounded-full bg-[#0B0F19]/95 border border-white/14 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_32px_rgba(0,0,0,0.65)] ring-1 ring-white/5"
              >
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  const IconComp = sec.icon;

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      className={cn(
                        'group relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-[0.97]',
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.06]'
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-top-command-track"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0_18px_rgba(99,102,241,0.55),0_2px_8px_rgba(99,102,241,0.4)] border border-indigo-400/50"
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        />
                      )}
                      <IconComp
                        className={cn(
                          'w-3.5 h-3.5 relative z-10 transition-colors duration-200',
                          isActive ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                        strokeWidth={2}
                      />
                      <span
                        className={cn(
                          'relative z-10 text-[11px] sm:text-xs font-sans tracking-tight transition-colors duration-200',
                          isActive ? 'text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' : 'text-slate-400 font-medium group-hover:text-slate-200'
                        )}
                      >
                        {sec.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right CTA Actions Cluster */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
          {/* Universal ⌘K Search Quick Trigger (Tertiary) */}
          <button
            type="button"
            onClick={openSearchPalette}
            className="h-9 flex items-center gap-2.5 px-3 rounded-lg bg-[#0F172A]/70 hover:bg-[#1E293B]/80 border border-white/10 hover:border-indigo-500/40 active:scale-[0.98] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_0_14px_rgba(99,102,241,0.18)] group/search"
            aria-label="Universal Search (⌘K)"
            title="Universal Search (⌘K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover/search:text-indigo-300 transition-colors" />
            <span className="hidden md:inline text-xs font-normal text-slate-300 group-hover/search:text-white transition-colors">
              Search
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-[#07090E]/90 group-hover/search:bg-[#07090E] rounded text-slate-300 group-hover/search:text-white border border-white/12 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              ⌘K
            </kbd>
          </button>

          {/* Sign In (Ghost / Text Priority) */}
          {isHeroVisible && (
            <button
              type="button"
              onClick={() => window.open('https://app.ultrakin.com', '_blank')}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Launch App (Secondary) */}
          <button
            type="button"
            onClick={() => window.open('https://app.ultrakin.com/auth', '_blank')}
            className={cn(
              'h-9 px-3.5 rounded-lg text-xs font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/12 hover:border-white/20 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.3)]',
              isHeroVisible ? 'hidden md:inline-flex items-center' : 'hidden xl:inline-flex items-center'
            )}
          >
            Launch App
          </button>

          {/* Request Demo (Primary - Strongest Visual Weight) */}
          <button
            type="button"
            onClick={openDemoDrawer}
            className="h-9 px-4 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_16px_rgba(99,102,241,0.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_6px_22px_rgba(99,102,241,0.55)] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-1.5 group/demo"
          >
            <span>Request Demo</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/demo:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger & Quick Search */}
        <div className="sm:hidden flex items-center gap-1">
          <button
            type="button"
            onClick={openSearchPalette}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all"
            aria-label="Universal Search"
          >
            <Search className="w-5 h-5 text-indigo-400" />
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-400 hover:text-white active:scale-95 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#07090E]/98 border-b border-white/10 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <div className="space-y-2">
            <a
              href="#platform"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-slate-300"
            >
              Platform Overview
            </a>
            <a
              href="#security"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-slate-300"
            >
              Security &amp; Compliance
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-base font-medium text-slate-300"
            >
              Pricing
            </a>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={() => window.open('https://app.ultrakin.com/auth', '_blank')}
            >
              Launch Web App
            </Button>
            <Button
              variant="primary"
              className="w-full justify-center"
              iconRight={ArrowRight}
              onClick={() => {
                setMobileOpen(false);
                openDemoDrawer();
              }}
            >
              Request Enterprise Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
