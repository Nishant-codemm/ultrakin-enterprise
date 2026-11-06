/**
 * SearchProductDemo.jsx
 * Unified Workspace ⌘K Command Palette preview for /products/search
 * Features:
 * - Native keyboard navigation (ArrowUp, ArrowDown, Enter)
 * - Clear button (✕) when input has text
 * - Highlighted query substring matches
 * - Instant context inspector sync on arrow change
 */
import React, { useState, useRef } from 'react';
import { Search, CornerDownLeft, FileText, MessageSquare, Mail, CheckSquare, X } from 'lucide-react';
import { SEARCH_DATA } from '../../data/productPageData';

const TYPE_ICONS = {
  record: CheckSquare,
  message: MessageSquare,
  mail: Mail,
  doc: FileText,
};

export default function SearchProductDemo() {
  const [query, setQuery] = useState(SEARCH_DATA.defaultQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [openedResultId, setOpenedResultId] = useState(null);
  const inputRef = useRef(null);

  const filtered = SEARCH_DATA.results.filter((item) =>
    query
      ? item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.preview.toLowerCase().includes(query.toLowerCase())
      : true
  );

  const selectedItem = filtered[selectedIndex] || filtered[0] || SEARCH_DATA.results[0];

  // Native keyboard arrow navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter' && selectedItem) {
      e.preventDefault();
      setOpenedResultId(selectedItem.id);
    } else if (e.key === 'Escape') {
      setQuery('');
      setSelectedIndex(0);
      setOpenedResultId(null);
    }
  };

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={i} className="bg-indigo-500/30 text-indigo-200 font-bold px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      className="flex flex-col h-full w-full bg-[#07090E] text-slate-100 select-none overflow-hidden"
    >
      {/* ── Search Input Bar ── */}
      <div className="h-12 shrink-0 border-b border-white/[0.08] bg-[#0B0F19] px-4 flex items-center gap-2.5">
        <Search size={15} className="text-indigo-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          aria-label="Search workspace content"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(0);
          }}
          placeholder="Search across all messages, mail, docs and records..."
          className="flex-1 bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              setSelectedIndex(0);
              inputRef.current?.focus();
            }}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Clear search (Esc)"
          >
            <X size={13} />
          </button>
        )}
        <span className="text-[10px] font-mono text-slate-400 bg-white/[0.06] border border-white/[0.1] px-2 py-0.5 rounded tabular-nums">
          ⌘K
        </span>
      </div>

      {/* ── Two Column Results + Context Inspector ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1 border-r border-white/[0.08]">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = TYPE_ICONS[item.type] || FileText;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(idx);
                    setOpenedResultId(item.id);
                  }}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-2.5 p-2 rounded-lg text-left text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600/25 border border-indigo-500/40 text-slate-100 shadow-xs'
                      : 'text-slate-300 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <div className="h-6 w-6 rounded-md bg-white/[0.06] flex items-center justify-center text-indigo-400 shrink-0">
                    <Icon size={12} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold truncate text-[11.5px]">
                        {highlightMatch(item.title, query)}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 shrink-0 tabular-nums">
                        {item.time}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate block">
                      {item.source}
                    </span>
                  </div>

                  {isSelected && (
                    <CornerDownLeft size={10} className="text-indigo-400 shrink-0 opacity-70" />
                  )}
                </button>
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
                <div>Status: <span className="text-emerald-400">Indexed (Live)</span></div>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 text-xs py-8">Select an item</div>
          )}

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span aria-live="polite">
              {openedResultId === selectedItem?.id ? 'Preview opened' : '↑↓ Navigate · ↵ Open preview'}
            </span>
            <CornerDownLeft size={10} />
          </div>
        </div>
      </div>
    </div>
  );
}
