/**
 * ListsProductDemo.jsx
 * Kanban & Records management preview for /products/lists
 * Features:
 * - 3-column kanban board: Incoming, In Progress, Resolved
 * - Cards display ID (SR-14, SR-17), priority badge, source origins (#support-ops, mail)
 * - Click any card to advance it to the next workflow stage with smooth Framer Motion layout transitions
 * - Add quick record simulation
 */
import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus, ArrowRight, Tag, CheckCircle2, AlertCircle } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import StatusBadge from '../../components/product/StatusBadge';
import { LISTS_DATA, PERSONAS } from '../../data/productPageData';

export default function ListsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [columns, setColumns] = useState(LISTS_DATA.records);

  const moveCard = (card, fromCol) => {
    const colOrder = ['Incoming', 'In Progress', 'Resolved'];
    const currentIndex = colOrder.indexOf(fromCol);
    const nextCol = colOrder[(currentIndex + 1) % colOrder.length];

    setColumns((prev) => {
      const fromList = prev[fromCol].filter((c) => c.id !== card.id);
      const toList = [...prev[nextCol], card];
      return {
        ...prev,
        [fromCol]: fromList,
        [nextCol]: toList,
      };
    });
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f6f5f2] text-[#111827] select-none overflow-hidden">
      {/* Top Header */}
      <div className="h-10 shrink-0 border-b border-[#e7e4de] bg-[#fffefd] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#10b981]" />
          <span className="text-xs font-semibold text-[#111827]">Support Requests & Bugs</span>
          <span className="text-[11px] text-[#667085] font-mono">· Active Sprint</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            Auto-linked from Mail & Chat
          </span>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="flex-1 p-3 grid grid-cols-3 gap-2.5 overflow-x-auto">
        {LISTS_DATA.columns.map((colName) => {
          const cards = columns[colName] || [];
          return (
            <div
              key={colName}
              className="flex flex-col bg-[#eeece7]/70 rounded-xl p-2 border border-[#e7e4de] min-w-[150px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-1.5 py-1 mb-2">
                <span className="text-xs font-bold text-[#344054]">{colName}</span>
                <span className="text-[10px] font-mono text-[#667085] bg-white px-1.5 py-0.5 rounded-full border border-[#e7e4de]">
                  {cards.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
                <AnimatePresence>
                  {cards.map((card) => (
                    <motion.div
                      layout={!reduceMotion}
                      key={card.id}
                      onClick={() => moveCard(card, colName)}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="group p-2.5 rounded-lg bg-white border border-[#e7e4de] shadow-sm hover:border-[#3156cf] hover:shadow transition-all cursor-pointer relative"
                    >
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#3156cf] bg-blue-50 px-1.5 py-0.5 rounded">
                          {card.id}
                        </span>
                        <StatusBadge status={card.priority} label={card.priority} />
                      </div>

                      <h4 className="text-[11.5px] font-medium text-[#111827] leading-tight mb-2">
                        {card.title}
                      </h4>

                      <div className="flex items-center justify-between pt-1 border-t border-[#f0ede8] text-[10px] text-[#667085]">
                        <span className="font-mono text-[#667085] truncate max-w-[80px]">
                          {card.source}
                        </span>
                        {card.assignee ? (
                          <AvatarChip person={card.assignee} size="xs" />
                        ) : (
                          <span className="text-[9px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono">
                            Unassigned
                          </span>
                        )}
                      </div>

                      {/* Click prompt overlay on hover */}
                      <div className="absolute inset-0 rounded-lg bg-[#3156cf]/5 opacity-0 group-hover:opacity-100 flex items-center justify-center pointer-events-none transition-opacity">
                        <span className="text-[10px] font-bold text-[#3156cf] bg-white px-2 py-0.5 rounded-full shadow-sm border border-blue-200 flex items-center gap-1">
                          Advance <ArrowRight size={10} />
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-8 shrink-0 border-t border-[#e7e4de] bg-[#fffefd] px-4 flex items-center justify-between text-[10.5px] text-[#667085]">
        <span>Click any card to advance its stage</span>
        <span className="font-mono text-emerald-600 font-medium">Synced with workspace</span>
      </div>
    </div>
  );
}
