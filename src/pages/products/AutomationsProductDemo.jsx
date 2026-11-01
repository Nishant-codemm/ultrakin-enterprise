/**
 * AutomationsProductDemo.jsx
 * Visual Automation Canvas preview for /products/automations
 * Features:
 * - Interactive node-based pipeline graph: Trigger -> Condition -> Action -> Approval
 * - Animated particle flow along SVG connector paths showing real-time signal routing
 * - Node selection: Click any node to inspect its live trigger or approval condition
 * - Respects useReducedMotion
 */
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Filter, PlusSquare, Bell, ShieldCheck, Play, ArrowRight, Settings2 } from 'lucide-react';
import { AUTOMATIONS_DATA } from '../../data/productPageData';

const NODE_ICONS = {
  trigger: Mail,
  condition: Filter,
  action: PlusSquare,
  end: ShieldCheck,
};

export default function AutomationsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [selectedNodeId, setSelectedNodeId] = useState('trigger');

  const selectedNode = AUTOMATIONS_DATA.nodes.find((n) => n.id === selectedNodeId) || AUTOMATIONS_DATA.nodes[0];

  return (
    <div className="flex h-full w-full bg-[#0B0F19] text-slate-100 select-none overflow-hidden relative">
      {/* ── Left Canvas Area ── */}
      <div className="flex-1 flex flex-col p-4 relative overflow-hidden">
        {/* Canvas Toolbar */}
        <div className="h-8 shrink-0 flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-slate-200">Support Inbound Triager</span>
            <span className="text-[10px] font-mono text-slate-500">v2.1 · Active</span>
          </div>
          <button className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-[10px] font-semibold hover:bg-indigo-600/50 transition-colors">
            <Play size={10} fill="currentColor" /> Test Run
          </button>
        </div>

        {/* Nodes Visual Flow */}
        <div className="flex-1 flex flex-col justify-center space-y-4 max-w-sm mx-auto w-full relative z-10">
          {AUTOMATIONS_DATA.nodes.map((node, index) => {
            const Icon = NODE_ICONS[node.type] || Settings2;
            const isSelected = selectedNodeId === node.id;
            return (
              <div key={node.id} className="relative">
                {/* Node Box */}
                <div
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-400 bg-[#1E293B] shadow-[0_0_20px_rgba(99,102,241,0.2)] ring-1 ring-indigo-400'
                      : 'border-white/[0.08] bg-[#0F172A] hover:border-white/[0.2]'
                  }`}
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${node.color}25`, border: `1px solid ${node.color}50` }}
                  >
                    <Icon size={15} style={{ color: node.color }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 truncate">{node.label}</span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 bg-white/[0.05] px-1.5 py-0.5 rounded">
                        {node.type}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono block truncate mt-0.5">
                      {node.sub}
                    </span>
                  </div>
                </div>

                {/* Connecting arrow line */}
                {index < AUTOMATIONS_DATA.nodes.length - 1 && (
                  <div className="h-4 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-indigo-500/40 relative">
                      {!reduceMotion && (
                        <motion.span
                          className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 -left-0.5"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right Node Config Inspector ── */}
      <div className="w-[180px] sm:w-[200px] shrink-0 border-l border-white/[0.08] bg-[#07090E] p-3 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 block mb-2">
            Step Configuration
          </span>
          <h4 className="text-xs font-bold text-slate-200 mb-1">{selectedNode.label}</h4>
          <p className="text-[11px] text-slate-400 leading-normal mb-3">{selectedNode.sub}</p>

          <div className="space-y-2 pt-2 border-t border-white/[0.08] text-[11px]">
            <div>
              <span className="text-slate-500 block text-[10px] font-mono">Execution Mode</span>
              <span className="text-slate-200 font-medium">Automatic with logs</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] font-mono">Approval Guard</span>
              <span className="text-emerald-400 font-medium">Required before mutate</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/[0.08] text-[10px] text-slate-400 font-mono">
          Click any step to inspect rules
        </div>
      </div>
    </div>
  );
}
