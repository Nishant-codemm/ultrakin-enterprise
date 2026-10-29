import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  XCircle,
  Activity,
  Check,
  RefreshCw,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';

export default function UkinActionProposalCard() {
  const {
    proposalStatus,
    approveProposal,
    setProposalStatus,
    moveKanbanTask,
    kanbanTasks,
    addToast,
    setActiveModule,
  } = useWorkspace();

  const [isStreaming, setIsStreaming] = useState(false);
  const [streamProgress, setStreamProgress] = useState(100);
  const [streamTokens, setStreamTokens] = useState('');

  const fullReasoningText =
    'A customer reported a checkout issue. Ukin linked the related conversation, Huddle notes, and PR, then prepared a follow-up task for review.';

  const handleSimulateStreaming = () => {
    setIsStreaming(true);
    setStreamTokens('');
    setStreamProgress(0);
    setProposalStatus('pending');

    const words = fullReasoningText.split(' ');
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        setStreamTokens((prev) => (prev ? prev + ' ' + words[currentIdx] : words[currentIdx]));
        setStreamProgress(Math.round(((currentIdx + 1) / words.length) * 100));
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        addToast(
          'Sample suggestion ready',
          'Sample proposal is ready for review.',
          'info'
        );
      }
    }, 45);
  };

  const handleApprove = () => {
    approveProposal();
    // Shift task to in_progress or ensure it exists
    if (kanbanTasks.length > 0) {
      moveKanbanTask(kanbanTasks[0].id, 'in_progress');
    }
    addToast(
      'Suggestion approved',
      'Task updated and the related Space linked in the sample workspace.',
      'success'
    );
  };

  const handleReject = () => {
    setProposalStatus('rejected');
    addToast(
      'Proposal Declined',
      'The sample suggestion was dismissed.',
      'info'
    );
  };

  return (
    <div
      className={cn(
        'rounded-xl border transition-all duration-200 p-4 select-none',
        'bg-violet-950/20 border-violet-500/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_32px_rgba(139,92,246,0.12)] ring-1 ring-violet-500/10'
      )}
    >
      {/* Card Header (Section 10.6 Standard) */}
      <div className="flex items-center justify-between pb-3 border-b border-violet-500/20 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-500/20 text-violet-300 flex items-center justify-center border border-violet-500/30">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                UKIN AGENT SUGGESTION
              </span>
              <span className="text-[10px] font-mono text-violet-400">#prop_9812</span>
            </div>
            <div className="text-[10px] text-slate-400 font-sans">
              Sample: email discussion &amp; Huddle notes
            </div>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-1.5">
          {proposalStatus === 'approved' ? (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" />
              APPROVED
            </span>
          ) : proposalStatus === 'rejected' ? (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-rose-500/20 border border-rose-500/30 text-rose-300 flex items-center gap-1">
              <XCircle className="w-2.5 h-2.5" />
              DECLINED
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/20 border border-amber-500/30 text-amber-300 animate-pulse flex items-center gap-1">
              <Activity className="w-2.5 h-2.5" />
              AWAITING APPROVAL
            </span>
          )}
        </div>
      </div>

      {/* Proposed Mutation Parameters Box */}
      <div className="bg-obsidian-base/80 rounded-lg p-3 border border-obsidian-border-soft mb-3 space-y-1.5 text-xs font-mono">
        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center justify-between">
          <span>Suggested task changes</span>
          <span className="text-emerald-400">Ready for review</span>
        </div>
        <div className="flex items-start gap-1.5 text-slate-300">
          <span className="text-violet-400">•</span>
          <span className="text-slate-400">Create Task:</span>
          <span className="text-white font-semibold truncate">
            "Review the launch checklist"
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-violet-400">•</span>
          <span className="text-slate-400">Destination:</span>
          <span className="text-sky-300">Sprint 24 Kanban (In Progress)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-violet-400">•</span>
          <span className="text-slate-400">Assignee:</span>
          <span className="text-amber-300">@sara (Staff Infra Lead)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-violet-400">•</span>
          <span className="text-slate-400">Urgency:</span>
          <span className="text-rose-400 font-bold">P0 - Urgent (Deployment Blocker)</span>
        </div>
      </div>

      {/* Reasoning & Correlated Citations */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase mb-1">
          <span>Agent Reasoning &amp; Citations</span>
          {isStreaming && (
            <span className="text-violet-400 flex items-center gap-1 animate-pulse">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              Preparing suggestion {streamProgress}%
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed bg-white/5 p-2.5 rounded-lg border border-obsidian-border-soft font-sans">
          {isStreaming ? (
            <span>
              {streamTokens}
              <span className="inline-block w-1.5 h-3 bg-violet-400 animate-pulse ml-0.5 align-middle" />
            </span>
          ) : (
            fullReasoningText
          )}
        </p>
      </div>

      {/* Action Triggers (Section 10.6 Standard: Emerald Approve & Execute) */}
      <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        {proposalStatus === 'approved' ? (
          <div className="w-full flex items-center justify-between p-2.5 bg-emerald-500/15 border border-emerald-500/30 rounded-lg text-xs text-emerald-300 font-semibold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              Sample task updated
            </span>
            <button
              type="button"
              onClick={() => setActiveModule('tasks')}
              className="text-[10px] font-mono underline hover:text-white cursor-pointer"
            >
              View in Kanban ↗
            </button>
          </div>
        ) : proposalStatus === 'rejected' ? (
          <div className="w-full flex items-center justify-between p-2 bg-white/5 border border-obsidian-border-medium rounded-lg text-xs text-slate-400">
            <span>Proposal declined by human operator</span>
            <button
              type="button"
              onClick={handleSimulateStreaming}
              className="text-[10px] text-indigo-400 underline cursor-pointer"
            >
              Re-generate
            </button>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={handleApprove}
              disabled={isStreaming}
              className="w-full sm:flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_16px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Approve &amp; Execute
            </button>

            <button
              type="button"
              onClick={handleReject}
              disabled={isStreaming}
              className="w-full sm:w-auto py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-obsidian-border-medium text-slate-300 text-xs font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all cursor-pointer"
            >
              Reject Proposal
            </button>

            <button
              type="button"
              onClick={handleSimulateStreaming}
              disabled={isStreaming}
              className="p-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 active:scale-95 border border-violet-500/25 text-violet-300 cursor-pointer transition-all"
              title="Prepare sample suggestion"
            >
              <RefreshCw className={cn('w-3.5 h-3.5', isStreaming && 'animate-spin')} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
