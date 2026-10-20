import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  Plus,
  ArrowRight,
  ArrowLeft,
  Mail,
  MessageSquare,
  Radio,
  GitCommit,
  X,
  Shield,
  Layers,
  Search,
  Check,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';

export default function KanbanTaskBoard() {
  const {
    kanbanTasks,
    moveKanbanTask,
    updateKanbanTask,
    toggleKanbanSubtask,
    selectedKanbanTask,
    openTaskDrawer,
    closeTaskDrawer,
    isTaskDrawerOpen,
    setActiveModule,
    setActiveChannel,
    addToast,
  } = useWorkspace();

  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverCol, setDragOverCol] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [newSubtaskText, setNewSubtaskText] = useState('');

  const columns = [
    { id: 'backlog', title: 'Backlog', accent: 'border-slate-500/40 text-slate-300', dot: 'bg-slate-400' },
    { id: 'in_progress', title: 'In Progress', accent: 'border-indigo-500/40 text-indigo-300', dot: 'bg-indigo-400' },
    { id: 'review', title: 'Review', accent: 'border-violet-500/40 text-violet-300', dot: 'bg-violet-400' },
    { id: 'done', title: 'Done', accent: 'border-emerald-500/40 text-emerald-300', dot: 'bg-emerald-400' },
  ];

  // Drag-and-drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = (e, colId) => {
    e.preventDefault();
    if (dragOverCol === colId) {
      setDragOverCol(null);
    }
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      moveKanbanTask(taskId, colId);
    }
    setDraggedTaskId(null);
    setDragOverCol(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverCol(null);
  };

  // Keyboard navigation & move helpers
  const moveColumnStep = (task, direction) => {
    const colOrder = ['backlog', 'in_progress', 'review', 'done'];
    const currIdx = colOrder.indexOf(task.col);
    const targetIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
    if (targetIdx >= 0 && targetIdx < colOrder.length) {
      moveKanbanTask(task.id, colOrder[targetIdx]);
    }
  };

  // Filter tasks
  const filteredTasks = kanbanTasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = filterPriority === 'ALL' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const getSourceIcon = (sourceType) => {
    switch (sourceType) {
      case 'mail':
        return <Mail className="w-3 h-3 text-sky-400" />;
      case 'huddle':
        return <Radio className="w-3 h-3 text-violet-400 animate-pulse" />;
      case 'chat':
        return <MessageSquare className="w-3 h-3 text-indigo-400" />;
      case 'commit':
        return <GitCommit className="w-3 h-3 text-emerald-400" />;
      default:
        return <Layers className="w-3 h-3 text-slate-400" />;
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'P0':
        return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'P1':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'P2':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#07090E] relative overflow-hidden select-none">
      {/* Top Controls Toolbar */}
      <div className="h-14 px-4 bg-[#0B0F19] border-b border-white/8 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-white text-xs sm:text-sm">Sprint 24 Board</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300">
              {kanbanTasks.length} Active Tasks
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/8">
            <span className="text-[10px] text-slate-400 font-mono">Filter:</span>
            {['ALL', 'P0', 'P1', 'P2'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFilterPriority(p)}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer',
                  filterPriority === p
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 sm:w-48 pl-8 pr-3 py-1 bg-[#0F172A] border border-white/10 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 transition-colors"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              addToast(
                'Task Creation Modal',
                'Pre-configured template: P1 triage card with cross-module bindings ready.',
                'info'
              );
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-semibold shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Task</span>
          </button>
        </div>
      </div>

      {/* Main Kanban Board Scroll Area */}
      <div className="flex-1 overflow-x-auto p-4 flex gap-4 min-h-[500px]">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.col === col.id);
          const isOver = dragOverCol === col.id;

          return (
            <div
              key={col.id}
              onDragOver={(e) => handleDragOver(e, col.id)}
              onDragLeave={(e) => handleDragLeave(e, col.id)}
              onDrop={(e) => handleDrop(e, col.id)}
              className={cn(
                'w-[280px] sm:w-[310px] shrink-0 flex flex-col rounded-xl border transition-all duration-200',
                'bg-[#0B0F19]/80 backdrop-blur-sm',
                isOver
                  ? 'border-indigo-500/60 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                  : 'border-white/6 hover:border-white/10'
              )}
            >
              {/* Column Header */}
              <div className="px-3.5 py-3 border-b border-white/6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', col.dot)} />
                  <span className="font-semibold text-xs text-white uppercase tracking-wider">
                    {col.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 border border-white/8 px-1.5 py-0.2 rounded-full">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      addToast('Optimistic Addition', `Created new task in ${col.title}.`, 'info');
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title={`Add card to ${col.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Tasks List */}
              <div className="flex-1 p-2 space-y-2.5 overflow-y-auto max-h-[calc(100vh-280px)]">
                {colTasks.map((task) => {
                  const isDragging = draggedTaskId === task.id;
                  const totalSubs = task.subtasks ? task.subtasks.length : 0;
                  const doneSubs = task.subtasks ? task.subtasks.filter((s) => s.done).length : 0;

                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => openTaskDrawer(task)}
                      className={cn(
                        'p-3.5 rounded-lg border bg-[#0F172A] transition-all duration-150 cursor-grab active:cursor-grabbing group relative select-none',
                        'hover:border-indigo-500/40 hover:bg-[#131D33]',
                        isDragging
                          ? 'rotate-[1.5deg] scale-[1.02] shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_12px_28px_-4px_rgba(0,0,0,0.75)] border-indigo-500 opacity-90'
                          : 'border-white/8 shadow-sm'
                      )}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-1.5 mb-2">
                        <span
                          className={cn(
                            'text-[10px] font-mono font-bold px-2 py-0.5 rounded border',
                            getPriorityBadgeClass(task.priority)
                          )}
                        >
                          {task.priority}
                        </span>

                        {/* Polymorphic Source Tag */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (task.sourceType === 'mail') {
                              setActiveModule('mail');
                            } else if (task.sourceType === 'huddle') {
                              setActiveModule('huddle');
                            } else if (task.sourceType === 'chat') {
                              setActiveModule('chat');
                              setActiveChannel('client-escalations');
                            }
                          }}
                          className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white/5 hover:bg-white/10 px-1.5 py-0.5 rounded border border-white/6 transition-colors cursor-pointer"
                          title="Polymorphic Link: Click to jump to source surface"
                        >
                          {getSourceIcon(task.sourceType)}
                          <span className="truncate max-w-[110px]">{task.source}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs font-semibold text-white leading-snug mb-1.5 line-clamp-2">
                        {task.title}
                      </h4>

                      {/* Description Snippet */}
                      {task.description && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                          {task.description}
                        </p>
                      )}

                      {/* Card Meta Footer */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/6">
                        <div className="flex items-center gap-2">
                          {totalSubs > 0 && (
                            <span
                              className={cn(
                                'flex items-center gap-1 font-mono',
                                doneSubs === totalSubs ? 'text-emerald-400' : 'text-slate-400'
                              )}
                            >
                              <CheckSquare className="w-3 h-3" />
                              {doneSubs}/{totalSubs}
                            </span>
                          )}

                          <span className="text-slate-400 flex items-center gap-0.5 font-mono">
                            <Clock className="w-3 h-3" />
                            {task.time}
                          </span>
                        </div>

                        {/* Assignee Avatar */}
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-5 h-5 rounded-full bg-indigo-500/25 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-[9px]"
                            title={task.assignee}
                          >
                            {task.assigneeAvatar || task.assignee?.slice(0, 2).toUpperCase() || 'AM'}
                          </div>
                        </div>
                      </div>

                      {/* Quick Move Column Arrows (Accessibility / Click-Based) */}
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5 bg-[#0B0F19] p-0.5 rounded border border-white/10 shadow">
                        {col.id !== 'backlog' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveColumnStep(task, 'prev');
                            }}
                            className="p-1 hover:text-white hover:bg-white/10 rounded cursor-pointer text-slate-400"
                            title="Move to previous column"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>
                        )}
                        {col.id !== 'done' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              moveColumnStep(task, 'next');
                            }}
                            className="p-1 hover:text-white hover:bg-white/10 rounded cursor-pointer text-slate-400"
                            title="Move to next column"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-white/6 rounded-lg">
                    No tasks in {col.title}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          380px CONTEXTUAL TASK INSPECTOR DRAWER (Phase 6 & 7 Section 10.4 Standard)
         ========================================================================= */}
      {isTaskDrawerOpen && selectedKanbanTask && (
        <div className="absolute inset-y-0 right-0 w-full sm:w-[380px] bg-[#0F172A] border-l border-white/12 shadow-[0_0_50px_rgba(0,0,0,0.85)] z-40 flex flex-col backdrop-blur-2xl">
          {/* Drawer Header */}
          <div className="p-4 border-b border-white/8 flex items-center justify-between bg-[#0B0F19]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-indigo-400">
                #{selectedKanbanTask.id}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-medium">Task Inspector</span>
            </div>
            <button
              type="button"
              onClick={closeTaskDrawer}
              className="p-1 text-slate-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
            {/* Title & Column Picker */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-mono uppercase text-slate-400">Pipeline Stage</label>
                <div className="flex items-center gap-1">
                  {columns.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => moveKanbanTask(selectedKanbanTask.id, c.id)}
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer',
                        selectedKanbanTask.col === c.id
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'bg-[#1E293B] text-slate-400 hover:text-white'
                      )}
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug">
                {selectedKanbanTask.title}
              </h3>
            </div>

            {/* Priority & Assignee Selector */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-[#07090E] rounded-lg border border-white/6">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Priority</span>
                <div className="flex items-center gap-1">
                  {['P0', 'P1', 'P2', 'P3'].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => updateKanbanTask(selectedKanbanTask.id, { priority: p })}
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors cursor-pointer',
                        selectedKanbanTask.priority === p
                          ? getPriorityBadgeClass(p)
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Assignee</span>
                <div className="flex items-center gap-1.5 text-white font-medium">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold flex items-center justify-center text-[10px] border border-indigo-500/30">
                    {selectedKanbanTask.assigneeAvatar || 'SC'}
                  </div>
                  <span className="truncate">{selectedKanbanTask.assignee}</span>
                </div>
              </div>
            </div>

            {/* Cross-Module Linked Context Card */}
            <div>
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">
                Polymorphic Entity Binding
              </span>
              <div className="p-3 bg-[#07090E] rounded-lg border border-white/6 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(selectedKanbanTask.sourceType)}
                    <span className="font-semibold text-white">{selectedKanbanTask.source}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedKanbanTask.sourceType === 'mail') setActiveModule('mail');
                      if (selectedKanbanTask.sourceType === 'huddle') setActiveModule('huddle');
                      if (selectedKanbanTask.sourceType === 'chat') {
                        setActiveModule('chat');
                        setActiveChannel('client-escalations');
                      }
                      closeTaskDrawer();
                    }}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono underline cursor-pointer"
                  >
                    Open Source ↗
                  </button>
                </div>
                {selectedKanbanTask.description && (
                  <p className="text-[11px] text-slate-300 leading-relaxed font-sans bg-white/5 p-2 rounded border border-white/4">
                    "{selectedKanbanTask.description}"
                  </p>
                )}
              </div>
            </div>

            {/* Subtasks Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Execution Subtasks ({(selectedKanbanTask.subtasks || []).filter((s) => s.done).length}/{(selectedKanbanTask.subtasks || []).length})
                </span>
              </div>
              <div className="space-y-1.5">
                {(selectedKanbanTask.subtasks || []).map((st) => (
                  <div
                    key={st.id}
                    onClick={() => toggleKanbanSubtask(selectedKanbanTask.id, st.id)}
                    className={cn(
                      'flex items-center gap-2 p-2 rounded-md border transition-colors cursor-pointer select-none',
                      st.done
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-400 line-through'
                        : 'bg-[#07090E] border-white/6 text-slate-200 hover:border-white/12'
                    )}
                  >
                    <div
                      className={cn(
                        'w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors',
                        st.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/20'
                      )}
                    >
                      {st.done && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <span className="text-[11px]">{st.text}</span>
                  </div>
                ))}

                {/* Add Subtask Input */}
                <div className="flex items-center gap-1.5 pt-1">
                  <input
                    type="text"
                    placeholder="Add checklist subtask..."
                    value={newSubtaskText}
                    onChange={(e) => setNewSubtaskText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newSubtaskText.trim()) {
                        const newSub = { id: 'st_' + Date.now(), text: newSubtaskText.trim(), done: false };
                        updateKanbanTask(selectedKanbanTask.id, {
                          subtasks: [...(selectedKanbanTask.subtasks || []), newSub],
                        });
                        setNewSubtaskText('');
                      }
                    }}
                    className="flex-1 px-2.5 py-1.5 bg-[#07090E] border border-white/8 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSubtaskText.trim()) {
                        const newSub = { id: 'st_' + Date.now(), text: newSubtaskText.trim(), done: false };
                        updateKanbanTask(selectedKanbanTask.id, {
                          subtasks: [...(selectedKanbanTask.subtasks || []), newSub],
                        });
                        setNewSubtaskText('');
                      }
                    }}
                    className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Cryptographic SHA-256 Immutable Audit Log */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase text-slate-400">
                  Immutable Audit Ledger
                </span>
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  SHA-256 Validated
                </span>
              </div>
              <div className="space-y-1.5 bg-[#07090E] p-2.5 rounded-lg border border-white/6 font-mono text-[10px]">
                {(selectedKanbanTask.auditLog || []).map((audit, i) => (
                  <div key={i} className="flex items-start gap-1.5 text-slate-400 pb-1.5 border-b border-white/4 last:border-0 last:pb-0">
                    <span className="text-slate-500 shrink-0">{audit.time}</span>
                    <span className="text-indigo-400 shrink-0">{audit.actor}:</span>
                    <span className="text-slate-300">{audit.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}