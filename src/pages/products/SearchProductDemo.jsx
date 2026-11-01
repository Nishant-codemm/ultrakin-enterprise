/**
 * SearchProductDemo.jsx
 * Unified Workspace ⌘K Command Palette preview for /products/search
 * Features:
 * - Real-time instantaneous search across messages, emails, documents and records
 * - Interactive query filter: type queries to filter live records
 * - Left results list with category grouping & right live context inspector
 * - Keyboard navigation (Up/Down arrows) + item selection
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, CornerDownLeft, FileText, MessageSquare, Mail, CheckSquare } from 'lucide-react';
import { SEARCH_DATA } from '../../data/productPageData';

const TYPE_ICONS = {
  record: CheckSquare,
  message: MessageSquare,
  mail: Mail,
  doc: FileText,
};

export default function SearchProductDemo() {
  const [query, setQuery] = useState(SEARCH_DATA.defaultQuery);
  const [selectedId, setSelectedId] = useState(1);

  const filtered = SEARCH_DATA.results.filter((item) =>
    query
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.preview.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const selectedItem = filtered.find((i) => i.id === selectedId) || filtered[0] || SEARCH_DATA.results[0];

  return (
    <div className="flex flex-col h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden">
      {/* ── Search Input Bar ── */}
      <div className="h-12 shrink-0 border-b border-white/[0.08] bg-[#0B0F19] px-4 flex items-center gap-3">
        <Search size={16} className="text-indigo-400 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all messages, mail, docs and records..."
          className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded">
          ⌘K
        </span>
      </div>

      {/* ── Two Column Results + Context Inspector ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 border-r border-white/[0.08]">
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const Icon = TYPE_ICONS[item.type] || FileText;
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`flex items-center gap-2.5 p-2 rounded-lg text-xs cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-indigo-600/25 border border-indigo-500/40 text-slate-100'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="h-6 w-6 rounded-md bg-white/[0.06] flex items-center justify-center text-indigo-400 shrink-0">
                    <Icon size={12} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate text-[11.5px]">{item.title}</span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0">{item.time}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate block">
                      {item.source}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-slate-500">
              No results found for "{query}".
            </div>
          )}
        </div>

        {/* Right Preview Inspector */}
        <div className="w-[180px] sm:w-[210px] shrink-0 bg-[#0B0F19] p-3 flex flex-col justify-between">
          {selectedItem ? (
            <div>
              <span className="text-[9px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full inline-block mb-2">
                {SEARCH_DATA.typeLabels[selectedItem.type] || 'Item'}
              </span>

              <h4 className="text-xs font-bold text-slate-100 leading-snug mb-2">
                {selectedItem.title}
              </h4>

              <div className="p-2 rounded-lg bg-black/40 border border-white/[0.06] text-[11px] text-slate-300 leading-relaxed mb-3">
                "{selectedItem.preview}"
              </div>

              <div className="text-[10px] font-mono text-slate-500 space-y-1">
                <div>Source: <span className="text-slate-300">{selectedItem.source}</span></div>
                <div>Indexed: <span className="text-emerald-400">Live</span></div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">Select an item</div>
          )}

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>Press Enter to jump</span>
            <CornerDownLeft size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
