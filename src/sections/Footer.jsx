import React from 'react';
import UltrakinLogo from '../components/primitives/UltrakinLogo';

export default function Footer() {
  return (
    <footer className="bg-[#04060A] divider-hairline pt-16 pb-12 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Info */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <UltrakinLogo size={26} id="uk-footer-grad" className="shrink-0" />
              <span className="font-bold text-lg text-white tracking-tight">Ultrakin</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Your people, your tools, and your agents — finally in one app. Built from the ground up for high-velocity teams.
            </p>
            <div className="inline-flex items-center gap-3 p-2 px-3 rounded-full border border-white/8 bg-[#0F172A]/60 text-xs text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_8px_rgba(0,0,0,0.4)]">
              <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> All systems operational
              </span>
              <span>·</span>
              <span className="font-mono text-slate-400">v2.4.0 (Enterprise)</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Product
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#modules" className="hover:text-white transition-colors">Spaces & Matrix Chat</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Docs & Knowledge Vault</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Custom Domain Mailbox</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">WebRTC Audio Huddles</a></li>
              <li><a href="#platform" className="hover:text-white transition-colors">Ukin Autonomous Agents</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Solutions
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Engineering & Dev</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Product & Design</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Incident War Rooms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security & IT Ops</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Enterprise Tier</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Startups Program</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Legal */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-4">
              Trust & Legal
            </div>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#security" className="hover:text-white transition-colors">Security Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SOC 2 Type II Report</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Data Processing (DPA)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Subprocessors Directory</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Ultrakin Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://twitter.com/ultrakin" target="_blank" rel="noreferrer" className="hover:text-slate-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 inline-block">
              X (Twitter)
            </a>
            <a href="https://github.com/ultrakin" target="_blank" rel="noreferrer" className="hover:text-slate-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 inline-block">
              GitHub
            </a>
            <a href="https://linkedin.com/company/ultrakin" target="_blank" rel="noreferrer" className="hover:text-slate-200 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 inline-block">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}