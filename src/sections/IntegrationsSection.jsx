import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  ArrowRight,
  Code2,
  Cpu,
  Share2,
  Workflow,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Plus,
} from 'lucide-react';
import { cn } from '../lib/cn';

const CATEGORIES = ['All', 'Developer Tools', 'Product & Design', 'Sales & CRM', 'Cloud & Data'];

const INTEGRATIONS = [
  {
    name: 'GitHub',
    category: 'Developer Tools',
    badge: 'Official MCP',
    desc: 'Trigger Ukin agent workflows from PR reviews, commit pushes, and issue labels.',
    color: 'bg-slate-800 text-white border border-white/10',
    iconLetter: 'GH',
  },
  {
    name: 'Figma',
    category: 'Product & Design',
    badge: 'Live Sync',
    desc: 'Inspect design components, sync tokens, and track design review approvals in Docs.',
    color: 'bg-purple-900/60 text-purple-300 border border-purple-500/30',
    iconLetter: 'Fg',
  },
  {
    name: 'Linear',
    category: 'Developer Tools',
    badge: 'Bi-directional',
    desc: 'Turn chat discussions into Linear cycles, issues, and project milestones seamlessly.',
    color: 'bg-indigo-900/60 text-indigo-300 border border-indigo-500/30',
    iconLetter: 'Ln',
  },
  {
    name: 'Salesforce',
    category: 'Sales & CRM',
    badge: 'Enterprise',
    desc: 'Summarize customer meetings, update deal pipeline stages, and sync opportunities.',
    color: 'bg-blue-900/60 text-blue-300 border border-blue-500/30',
    iconLetter: 'SF',
  },
  {
    name: 'Google Workspace',
    category: 'Product & Design',
    badge: 'IdP & Calendar',
    desc: 'Two-way calendar sync, Single Sign-On (SSO), and Google Drive doc linking.',
    color: 'bg-amber-900/60 text-amber-300 border border-amber-500/30',
    iconLetter: 'GW',
  },
  {
    name: 'PostgreSQL / Snowflake',
    category: 'Cloud & Data',
    badge: 'MCP Database',
    desc: 'Secure read-only analytics queries orchestrated by your verified internal AI agents.',
    color: 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/30',
    iconLetter: 'DB',
  },
];

export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('All');

  const filtered = selectedCat === 'All'
    ? INTEGRATIONS
    : INTEGRATIONS.filter(item => item.category === selectedCat);

  return (
    <section id="integrations" className="py-24 md:py-32 bg-[#07090E] border-t border-white/8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              ECOSYSTEM & EXTENSIBILITY
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              Connects to your stack. <br />
              <span className="text-slate-400 font-normal">Supercharged with open MCP.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
              Ultrakin does not replace the specialized tools your engineers and designers love. 
              It gives them a unified command center so information never gets trapped in silos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#mcp"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#0F172A]/70 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 hover:bg-[#1E293B] transition-all shadow-sm cursor-pointer"
            >
              <Code2 className="h-4 w-4 text-indigo-400" />
              Build a custom MCP Server
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer',
                selectedCat === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-[#0F172A]/70 text-slate-400 hover:text-white hover:bg-[#1E293B] border border-white/8'
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="group p-6 rounded-2xl border border-white/8 bg-[#0B0F19]/90 hover:border-indigo-500/40 hover:bg-[#0F172A]/80 shadow-xl backdrop-blur-xl transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm', item.color)}>
                    {item.iconLetter}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/6 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[10px] text-slate-500">{item.category}</span>
                <span className="inline-flex items-center gap-1 text-indigo-400 group-hover:translate-x-0.5 transition-transform">
                  Configure <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}