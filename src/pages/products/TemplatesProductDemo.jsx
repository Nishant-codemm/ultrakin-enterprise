/**
 * TemplatesProductDemo.jsx
 * Turnkey Automation & Agent Template gallery preview for /products/templates
 * Features:
 * - Category filter pills: All, Sales, Support, People, Engineering
 * - Template cards with emojis, usage count ("Used by 1,200 teams")
 * - Interactive step expansion: clicking "Preview steps" displays the 4-step execution flow
 * - One-click deployment simulation
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, ArrowRight, CheckCircle2, Search, Sparkles } from 'lucide-react';
import { TEMPLATES_DATA } from '../../data/productPageData';

export default function TemplatesProductDemo() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState('inbound-support');

  const filteredTemplates = TEMPLATES_DATA.templates.filter((t) =>
    selectedCategory === 'All' ? true : t.category === selectedCategory
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f5f2] text-[#111827] select-none overflow-hidden p-3.5">
      {/* Category Filter Row */}
      <div className="flex items-center gap-1.5 pb-2.5 border-b border-[#e7e4de] overflow-x-auto shrink-0">
        {TEMPLATES_DATA.categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                active
                  ? 'bg-[#111827] text-white shadow-xs'
                  : 'bg-white border border-[#e7e4de] text-[#344054] hover:bg-[#eeece7]'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Templates List */}
      <div className="flex-1 overflow-y-auto pt-3 space-y-2.5 pr-1">
        {filteredTemplates.map((template) => {
          const isExpanded = expandedId === template.id;
          return (
            <div
              key={template.id}
              className={`p-3 rounded-xl border bg-white transition-all ${
                isExpanded ? 'border-[#3156cf] shadow-sm ring-1 ring-blue-100' : 'border-[#e7e4de] hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl p-1.5 rounded-lg bg-[#f6f5f2] border border-[#e7e4de]">
                    {template.emoji}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#111827]">{template.name}</h4>
                    <span className="text-[10px] text-[#667085] font-mono">
                      {template.category} · Used by {template.usedBy} teams
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : template.id)}
                  className="px-2.5 py-1 rounded-lg border border-[#e7e4de] text-[11px] font-medium text-[#3156cf] hover:bg-blue-50 transition-colors shrink-0"
                >
                  {isExpanded ? 'Hide Steps' : 'View Flow →'}
                </button>
              </div>

              <p className="mt-2 text-[11.5px] text-[#344054] leading-relaxed">
                {template.description}
              </p>

              {/* Expanded Step Pipeline */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-2.5 border-t border-[#f0ede8]"
                  >
                    <span className="text-[10px] font-mono uppercase text-[#667085] block mb-1.5">
                      Automated Pipeline Stages:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {template.steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 p-1.5 rounded-md bg-[#faf9f7] border border-[#e7e4de] text-[#344054]"
                        >
                          <span className="h-4 w-4 rounded-full bg-[#3156cf] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate">{step}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
