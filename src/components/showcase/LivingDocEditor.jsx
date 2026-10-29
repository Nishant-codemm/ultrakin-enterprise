import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Sparkles,
  CheckSquare,
  MessageSquare,
  GitPullRequest,
  GitCommit,
  GitBranch,
  Plus,
  Bold,
  Italic,
  Code2,
  Strikethrough,
  AlertCircle,
  Send,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

export default function LivingDocEditor() {
  const {
    docChecklists,
    toggleChecklist,
    docComments,
    addDocComment,
    addDocChecklistItem,
    setActiveModule,
  } = useWorkspace();

  // Floating toolbar states
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    code: false,
    strike: false,
  });

  // Slash command menu state
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [newChecklistText, setNewChecklistText] = useState('');
  const [showAddChecklist, setShowAddChecklist] = useState(false);

  // Active paragraph comment drawer
  const [activeCommentNode, setActiveCommentNode] = useState(null); // 'node_p1' | 'node_checklist' | null
  const [newCommentText, setNewCommentText] = useState('');

  // Custom inserted blocks
  const [insertedBlocks, setInsertedBlocks] = useState([]);

  const completedCount = docChecklists.filter((c) => c.checked).length;
  const progressPct = Math.round((completedCount / docChecklists.length) * 100);

  const toggleFormat = (key) => {
    setActiveFormats((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInsertBlock = (type) => {
    setShowSlashMenu(false);
    if (type === 'checklist') {
      setShowAddChecklist(true);
    } else if (type === 'callout') {
      setInsertedBlocks((prev) => [
        ...prev,
        {
          id: 'blk_' + Date.now(),
          type: 'callout',
          title: 'Architecture Security Invariant',
          desc: 'All inter-module state transitions must be idempotent and broadcast across the in-memory bus with deterministic sequence numbers.',
        },
      ]);
    } else if (type === 'code') {
      setInsertedBlocks((prev) => [
        ...prev,
        {
          id: 'blk_' + Date.now(),
          type: 'code',
          title: 'launch-checklist.md',
          code: `# Launch checklist\n\n- Confirm the rollout owner\n- Review the support handoff\n- Link the release notes`,
        },
      ]);
    }
  };

  const handleAddChecklist = (e) => {
    e?.preventDefault();
    if (!newChecklistText.trim()) return;
    addDocChecklistItem(newChecklistText.trim());
    setNewChecklistText('');
    setShowAddChecklist(false);
  };

  const handlePostComment = (e) => {
    e?.preventDefault();
    if (!newCommentText.trim() || !activeCommentNode) return;
    addDocComment(activeCommentNode, newCommentText.trim());
    setNewCommentText('');
  };

  const activeComments = activeCommentNode ? docComments[activeCommentNode] || [] : [];

  return (
    <div className="flex flex-col h-full bg-obsidian-canvas text-slate-200 relative overflow-hidden font-sans">
      {/* Document header with collaborator presence */}
      <div className="h-12 px-4 border-b border-obsidian-border bg-obsidian-surface/80 flex items-center justify-between select-none shrink-0">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-xs sm:text-sm text-white">Q4 EU Cluster Architecture RFC</span>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded">
            Sample document
          </span>
        </div>

        {/* Live Collaborator Presence Indicators */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1.5">
            <div
              className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-[10px] text-white ring-2 ring-[#0B0F19]"
              title="Sara Chen (Editing Section 2...)"
            >
              SC
            </div>
            <div
              className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[10px] text-white ring-2 ring-[#0B0F19]"
              title="Alex Mercer (Viewing Section 1)"
            >
              AM
            </div>
            <div
              className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center font-bold text-[10px] text-white ring-2 ring-[#0B0F19]"
              title="Marcus Lindqvist (Viewing PR #1042)"
            >
              ML
            </div>
          </div>
          <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">3 active peers</span>
        </div>
      </div>

      {/* Floating Formatting Toolbar (Sprint 4 ProseMirror Controls) */}
      <div className="h-10 px-4 border-b border-obsidian-border-soft bg-obsidian-base/80 flex items-center justify-between select-none shrink-0 text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => toggleFormat('bold')}
            className={cn(
              'p-1.5 rounded transition-colors cursor-pointer',
              activeFormats.bold ? 'bg-indigo-600 text-white font-bold' : 'hover:bg-white/10 hover:text-white'
            )}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat('italic')}
            className={cn(
              'p-1.5 rounded transition-colors cursor-pointer',
              activeFormats.italic ? 'bg-indigo-600 text-white italic' : 'hover:bg-white/10 hover:text-white'
            )}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat('code')}
            className={cn(
              'p-1.5 rounded transition-colors cursor-pointer',
              activeFormats.code ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 hover:text-white'
            )}
            title="Inline Code (Ctrl+E)"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat('strike')}
            className={cn(
              'p-1.5 rounded transition-colors cursor-pointer',
              activeFormats.strike ? 'bg-indigo-600 text-white' : 'hover:bg-white/10 hover:text-white'
            )}
            title="Strikethrough"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <div className="w-[1px] h-4 bg-white/10 mx-1" />

          {/* Slash Command Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSlashMenu(!showSlashMenu)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-obsidian-border text-slate-300 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 text-emerald-400" />
              <span>Insert Block (/)</span>
            </button>

            {/* Dropdown Menu */}
            {showSlashMenu && (
              <div className="absolute top-8 left-0 z-40 w-56 bg-obsidian-surface border border-obsidian-border-medium rounded-xl shadow-2xl p-1.5 space-y-1 text-xs">
                <div className="px-2 py-1 text-[10px] font-mono uppercase text-slate-500">
                  TipTap Block Elements
                </div>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('checklist')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white text-left cursor-pointer"
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">/check</div>
                    <div className="text-[10px] text-slate-400">Operational Checklist Item</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('callout')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white text-left cursor-pointer"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <div>
                    <div className="font-semibold text-white">/callout</div>
                    <div className="text-[10px] text-slate-400">Architecture Callout Box</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInsertBlock('code')}
                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white text-left cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <div>
                    <div className="font-semibold text-white">/code</div>
                    <div className="text-[10px] text-slate-400">Syntax Code Block</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span>Document state:</span>
          <span className="text-emerald-400 font-bold">Sample preview</span>
        </div>
      </div>

      {/* Main Document Body */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-8 max-w-4xl mx-auto w-full space-y-6">
        {/* Document Title Header */}
        <div className="space-y-2 border-b border-obsidian-border pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-emerald-400">DOC-891</span>
            <span>·</span>
            <span>Created Oct 2026</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            RFC-891: Redis Sentinel Latency Hardening &amp; Token Caching
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
            <span>
              Author: <strong className="text-white">Alex Mercer (CTO)</strong>
            </span>
            <span>·</span>
            <span>
              Reviewed by: <strong className="text-white">Sara Chen</strong>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Approved for Prod
            </span>
          </div>
        </div>

        {/* Sprint Completion Progress Bar */}
        <div className="p-4 rounded-xl border border-obsidian-border bg-obsidian-surface/60 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">EXECUTION PROGRESS</span>
            <span className="text-emerald-400 font-bold">{progressPct}% COMPLETED</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              style={{ width: `${progressPct}%` }}
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Section 1: Context & Objective (With Paragraph Anchor node_p1) */}
        <div
          id="node_p1"
          className="group relative p-3 rounded-xl border border-transparent hover:border-obsidian-border-medium hover:bg-white/[0.02] transition-all space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-semibold text-white">
              1. Incident Context &amp; Resolution Plan
            </h2>

            {/* Paragraph Discussion Anchor Indicator */}
            <button
              type="button"
              onClick={() => setActiveCommentNode(activeCommentNode === 'node_p1' ? null : 'node_p1')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 transition-all cursor-pointer"
            >
              <MessageSquare className="w-3 h-3 text-indigo-400" />
              <span>{docComments.node_p1?.length || 0} Comments</span>
            </button>
          </div>

          <p>
            During the launch rehearsal, the team noticed intermittent timeouts in the sample environment. They linked the
            related discussion and token refresh change, then captured the agreed follow-up checks below.
          </p>
        </div>

        {/* Section 2: Interactive Operational Checklist (node_checklist) */}
        <div
          id="node_checklist"
          className="space-y-3 p-4 rounded-xl border border-indigo-500/25 bg-obsidian-surface/80 relative"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-indigo-300 uppercase font-mono tracking-wider">
            <span>2. Operational Verification Checklist</span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setActiveCommentNode(activeCommentNode === 'node_checklist' ? null : 'node_checklist')
                }
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-all cursor-pointer lowercase"
              >
                <MessageSquare className="w-3 h-3 text-indigo-400" />
                <span>{docComments.node_checklist?.length || 0} comments</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddChecklist(true)}
                className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer"
                title="Add checklist item"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            {docChecklists.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklist(item.id)}
                className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors text-left cursor-pointer"
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded border flex items-center justify-center mt-0.5 transition-all flex-shrink-0',
                    item.checked
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'border-slate-500 bg-transparent'
                  )}
                >
                  {item.checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <span
                  className={cn(
                    'flex-1 text-xs sm:text-[13px]',
                    item.checked ? 'line-through text-slate-400' : 'text-slate-200'
                  )}
                >
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {showAddChecklist && (
            <form onSubmit={handleAddChecklist} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                aria-label="New checklist item"
                autoFocus
                value={newChecklistText}
                onChange={(e) => setNewChecklistText(e.target.value)}
                placeholder="New verification step (e.g. Test Redis sentinel quorum)..."
                className="flex-1 bg-obsidian-base border border-obsidian-border-medium rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddChecklist(false)}
                className="px-2 py-1.5 text-slate-400 hover:text-white text-xs cursor-pointer"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Section 3: GitHub PR & Commit Synchronizer Card (Sprint 4 Deliverable) */}
        <div className="p-4 rounded-xl border border-obsidian-border-medium bg-obsidian-surface/90 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-indigo-300 font-mono font-bold">
              <GitPullRequest className="w-4 h-4 text-indigo-400" />
              <span>LINKED GITHUB PULL REQUEST #1042</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 font-semibold">
              ✓ Merged &amp; Deployed
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-semibold text-xs sm:text-sm text-white">
              Revert token caching logic &amp; bump TTL to 3600s
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1 font-mono text-slate-300">
                <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                patch/redis-ttl-bump &rarr; main
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono text-violet-300">
                <GitCommit className="w-3.5 h-3.5" />
                #8b19f0
              </span>
              <span>·</span>
              <span className="font-mono text-emerald-400">+42 / -12 lines</span>
            </div>
          </div>

          <div className="pt-2 border-t border-obsidian-border-soft flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400 font-mono">
              Sample checks: ready for team review
            </span>
            <button
              type="button"
              onClick={() => setActiveModule('chat')}
              className="text-indigo-400 hover:text-indigo-300 font-medium underline cursor-pointer text-xs"
            >
              Discuss commit in #general-arch &rarr;
            </button>
          </div>
        </div>

        {/* Inserted Dynamic Blocks */}
        {insertedBlocks.map((blk) => (
          <div key={blk.id} className="relative">
            {blk.type === 'callout' && (
              <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-slate-200 space-y-1">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  {blk.title}
                </div>
                <p className="text-slate-300 text-[12px]">{blk.desc}</p>
              </div>
            )}
            {blk.type === 'code' && (
              <div className="rounded-xl border border-obsidian-border bg-obsidian-base p-3 font-mono text-xs text-indigo-200">
                <div className="text-slate-500 pb-1 border-b border-obsidian-border-soft mb-2">{blk.title}</div>
                <pre className="overflow-x-auto text-[11px] leading-relaxed">
                  <code>{blk.code}</code>
                </pre>
              </div>
            )}
          </div>
        ))}

        {/* Section 4: Live Huddle Transcription Citation */}
        <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Synchronized from Live Huddle #18 (10:42 AM)
          </div>
          <p className="text-[12px] text-slate-400 italic">
            "Token cache TTL expired prematurely under peak load. I have reverted the cache TTL to 3600s in PR #1042." &mdash; Sara Chen
          </p>
        </div>
      </div>

      {/* Paragraph Anchored Matrix Discussion Drawer (Sprint 4 Core Feature) */}
      {activeCommentNode && (
        <div className="absolute right-0 top-12 bottom-0 w-80 bg-obsidian-surface border-l border-obsidian-border-medium shadow-2xl flex flex-col z-30 select-none">
          <div className="h-11 px-4 border-b border-obsidian-border flex items-center justify-between bg-obsidian-base/60 text-xs">
            <div className="flex items-center gap-2 font-semibold text-white">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>Matrix Thread: #{activeCommentNode}</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveCommentNode(null)}
              className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Comment Stream */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
            {activeComments.length === 0 ? (
              <div className="text-center text-slate-500 py-6">
                No comments on this paragraph yet. Start the discussion!
              </div>
            ) : (
              activeComments.map((cm) => (
                <div key={cm.id} className="p-2.5 rounded-lg bg-obsidian-base border border-obsidian-border-soft space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-indigo-300">{cm.author}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{cm.time}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{cm.role}</div>
                  <p className="text-slate-200 text-[11px] leading-relaxed pt-0.5">{cm.text}</p>
                </div>
              ))
            )}
          </div>

          {/* Comment Input */}
          <form onSubmit={handlePostComment} className="p-3 border-t border-obsidian-border bg-obsidian-base/80 flex items-center gap-2">
            <input
              type="text"
              aria-label="Add a document comment"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Comment on this paragraph..."
              className="flex-1 bg-obsidian-surface border border-obsidian-border-medium rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
                newCommentText.trim()
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                  : 'bg-white/5 text-slate-500 cursor-not-allowed'
              )}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
