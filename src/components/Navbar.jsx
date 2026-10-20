import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';
import Button from './primitives/Button';
import Badge from './primitives/Badge';
import { useWorkspace } from '../context/WorkspaceContext';
import { cn } from '../lib/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const { openDemoDrawer } = useWorkspace();

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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b',
        scrolled
          ? 'h-14 bg-[#07090E]/90 backdrop-blur-md border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'h-[72px] bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Anchor */}
        <div className="flex items-center gap-6">
          <a href="#" className="flex items-center gap-3 group">
            {/* Geometric Isometric Infinity Prism Brand Mark */}
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#4F46E5] flex items-center justify-center p-0.5 shadow-[0_0_16px_rgba(99,102,241,0.4)] transition-transform duration-200 group-hover:scale-105">
              <div className="w-full h-full bg-[#07090E]/40 rounded-[6px] flex items-center justify-center backdrop-blur-xs">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white group-hover:text-slate-100">
              Ultrakin
            </span>
          </a>

          {/* Micro Trust Badge */}
          <div className="hidden xl:flex items-center">
            <Badge variant="live" size="sm" dot>
              SOC 2 Type II
            </Badge>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Platform Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={() => setPlatformOpen(true)}
            onMouseLeave={() => setPlatformOpen(false)}
          >
            <button
              type="button"
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                platformOpen
                  ? 'text-white bg-white/5'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              )}
            >
              <span>Platform</span>
              <ChevronDown
                className={cn('w-3.5 h-3.5 transition-transform duration-150', platformOpen && 'rotate-180')}
              />
            </button>

            {/* Dropdown Menu */}
            {platformOpen && (
              <div className="absolute top-full left-0 pt-2 w-80">
                <div className="p-2 rounded-xl bg-[#0F172A] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                  <a
                    href="#chat"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                        Matrix Spaces Chat
                      </div>
                      <div className="text-xs text-slate-400">Decentralized, E2EE team discussions</div>
                    </div>
                  </a>

                  <a
                    href="#mail"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-sky-400 transition-colors">
                        Custom Domain Email
                      </div>
                      <div className="text-xs text-slate-400">Inbound mail connected to tasks</div>
                    </div>
                  </a>

                  <a
                    href="#docs"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                        TipTap Living Docs
                      </div>
                      <div className="text-xs text-slate-400">Real-time CRDT specifications</div>
                    </div>
                  </a>

                  <a
                    href="#huddle"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">
                        WebRTC Live Huddles
                      </div>
                      <div className="text-xs text-slate-400">Streaming transcript to tasks</div>
                    </div>
                  </a>

                  <a
                    href="#agent"
                    className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                        Autonomous Ukin Agent
                      </div>
                      <div className="text-xs text-slate-400">Event-driven background synthesis</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          <a
            href="#solutions"
            className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            Solutions
          </a>

          <a
            href="#security"
            className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            Security & Trust
          </a>

          <a
            href="#pricing"
            className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Dual CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.open('https://app.ultrakin.com', '_blank')}
          >
            Sign In
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.open('https://app.ultrakin.com/auth', '_blank')}
          >
            Launch App
          </Button>

          <Button
            variant="primary"
            size="sm"
            iconRight={ArrowRight}
            onClick={openDemoDrawer}
          >
            Request Demo
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-slate-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="sm:hidden bg-[#07090E]/98 border-b border-white/10 px-6 py-6 space-y-4">
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
              Security & Compliance
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
