/**
 * DocsProductDemo.jsx
 * High fidelity collaborative living document preview for /products/docs
 * Features:
 * - Rich editor surface with document title, breadcrumb & real-time presence avatars
 * - Pinned inline Decision blocks ("📌 Decision: Soft launch to 20%...")
 * - Interactive task checklist with toggleable checkboxes
 * - Inline sidebar comments (@Maya, @Priya) with interactive click-to-highlight
 * - Realistic editing simulation
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, CheckSquare, Square, MessageSquare, Sparkles, Clock, MoreHorizontal } from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import { DOCS_DATA, PERSONAS } from '../../data/productPageData';

export default function DocsProductDemo() {
  const [activeCommentId, setActiveCommentId] = useState(1);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Feature flags configured', done: true },
    { id: 2, text: 'Performance tests passing', done: true },
    { id: 3, text: 'Rollback plan documented', done: false },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="flex h-full w-full bg-[#fbfaf8] text-[#111827] overflow-hidden select-none">
      {/* ── Unified Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="docs" />

      {/* ── Main Document Area ── */}
      <div className="flex-1 flex flex-col overflow-y-auto border-r border-[#e7e4de] p-5">
        {/* Doc Header */}
        <div className="flex items-center justify-between border-b border-[#e7e4de] pb-3 mb-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#667085] font-mono mb-1">
              <span>Engineering</span>
              <span>/</span>
              <span>Planning</span>
            </div>
            <h2 className="text-base font-bold text-[#111827] flex items-center gap-2">
              <FileText size={16} className="text-[#2563eb]" />
              {DOCS_DATA.title}
            </h2>
          </div>

          {/* Active Presence Avatars */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#667085] flex items-center gap-1 font-mono">
              <Clock size={11} /> Edited 2m ago
            </span>
            <div className="flex -space-x-1.5 ml-2">
              {DOCS_DATA.onlineUsers.map((u, i) => (
                <AvatarChip key={i} person={u} size="xs" showRing online={i === 0} />
              ))}
            </div>
          </div>
        </div>

        {/* Doc Body Content */}
        <div className="space-y-4 text-xs leading-relaxed text-[#344054]">
          {/* Section 1: Overview with active comment highlight */}
          <div
            onClick={() => setActiveCommentId(1)}
            className={`p-2.5 rounded-lg transition-colors cursor-pointer ${
              activeCommentId === 1 ? 'bg-amber-500/10 border border-amber-300' : 'hover:bg-slate-100/60'
            }`}
          >
            <h3 className="font-semibold text-sm text-[#111827] mb-1">1. Overview</h3>
            <p>
              This document outlines the operational plan for our Q4 product release on November 15th.
              All teams should review their sections and confirm readiness by November 10th.
            </p>
          </div>

          {/* Section 2: Pinned Decision Block */}
          <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900 shadow-sm">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-800 text-[11px] uppercase tracking-wider mb-1">
              <Sparkles size={13} className="text-emerald-600" /> Pinned Team Decision
            </div>
            <p className="font-medium text-xs leading-relaxed">
              Soft launch to 20% of users first, then full rollout 48 hours later pending error rate metrics.
            </p>
            <div className="mt-1 text-[10px] text-emerald-700/80 font-mono">
              Confirmed in #launch-planning by Sam Ortiz
            </div>
          </div>

          {/* Section 3: Interactive Checklist */}
          <div>
            <h3 className="font-semibold text-sm text-[#111827] mb-2">2. Engineering Checklist</h3>
            <div className="space-y-1.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 cursor-pointer text-xs"
                >
                  {task.done ? (
                    <CheckSquare size={14} className="text-emerald-600 shrink-0" />
                  ) : (
                    <Square size={14} className="text-slate-400 shrink-0" />
                  )}
                  <span className={task.done ? 'line-through text-slate-400' : 'text-slate-700'}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Comments Sidebar ── */}
      <div className="w-[180px] sm:w-[200px] shrink-0 bg-[#faf9f7] flex flex-col p-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e7e4de] mb-3">
          <span className="text-[11px] font-semibold text-[#111827] flex items-center gap-1">
            <MessageSquare size={12} className="text-indigo-600" /> Comments (2)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Active</span>
        </div>

        <div className="space-y-2.5 overflow-y-auto flex-1">
          {DOCS_DATA.comments.map((comment) => {
            const isSelected = activeCommentId === comment.id;
            return (
              <div
                key={comment.id}
                onClick={() => setActiveCommentId(comment.id)}
                className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'border-indigo-400 bg-white shadow-sm ring-1 ring-indigo-300'
                    : 'border-[#e7e4de] bg-white/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <AvatarChip person={comment.person} size="xs" />
                  <span className="font-semibold text-[11px] text-slate-800 truncate">
                    {comment.person.name}
                  </span>
                  <span className="text-[9px] text-slate-400 ml-auto">{comment.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-normal">{comment.text}</p>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#e7e4de] text-[10px] text-slate-500 text-center font-mono">
          Click comments to inspect
        </div>
      </div>
    </div>
  );
}
