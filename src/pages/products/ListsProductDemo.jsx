/**
 * ListsProductDemo.jsx
 * Enterprise Records & Issues Management Engine for /products/lists
 * Production-ready Linear/Jira grade module featuring:
 * - Multi-View Switcher: Board (Kanban) vs Table (Grid)
 * - Enterprise Filters: Priority (All, High, Medium, Low) & Search query
 * - Group By toggling: Status vs Priority
 * - Multi-column Sorting: Priority, ID, Title
 * - Record Details Slide-Over Drawer with metadata, signals, and live updates
 * - Selection states with bulk action bar
 * - Empty state handlers with reset filter action
 */
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Plus,
  ArrowRight,
  CornerDownLeft,
  LayoutGrid,
  List,
  Search,
  Filter,
  ArrowUpDown,
  Layers,
  X,
  Check,
  Sparkles,
  CheckSquare,
} from 'lucide-react';
import AvatarChip from '../../components/product/AvatarChip';
import WorkspaceAppRail from '../../components/product/WorkspaceAppRail';
import { LISTS_DATA, PERSONAS } from '../../data/productPageData';

const STATUS_CONFIG = {
  Incoming:    { label: 'Todo',        color: 'text-slate-700 bg-slate-100 border-slate-300', dot: 'bg-slate-400' },
  'In Progress':{ label: 'In Progress', color: 'text-indigo-700 bg-indigo-50 border-indigo-200', dot: 'bg-indigo-500' },
  Resolved:    { label: 'Done',        color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500' },
};

const PRIORITY_CONFIG = {
  high:   { label: 'High',   color: 'text-rose-700 bg-rose-50 border-rose-200' },
  medium: { label: 'Medium', color: 'text-amber-700 bg-amber-50 border-amber-200' },
  low:    { label: 'Low',    color: 'text-slate-600 bg-slate-50 border-slate-200' },
};

export default function ListsProductDemo() {
  const reduceMotion = useReducedMotion();
  const [columns, setColumns] = useState(LISTS_DATA.records);
  const [newTitle, setNewTitle] = useState('');
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'table'
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('status'); // 'status' | 'priority'
  const [sortBy, setSortBy] = useState('id'); // 'id' | 'priority' | 'title'
  const [selectedRecord, setSelectedRecord] = useState(null); // Record details modal
  const [selectedRows, setSelectedRows] = useState([]); // Array of IDs for multi-selection

  // Move card through lifecycle stages
  const moveCard = (card, fromCol, targetCol = null) => {
    const colOrder = ['Incoming', 'In Progress', 'Resolved'];
    const currentIndex = colOrder.indexOf(fromCol);
    const nextCol = targetCol || colOrder[(currentIndex + 1) % colOrder.length];

    setColumns((prev) => {
      const fromList = (prev[fromCol] || []).filter((c) => c.id !== card.id);
      const toList = [{ ...card, status: nextCol }, ...(prev[nextCol] || [])];
      return {
        ...prev,
        [fromCol]: fromList,
        [nextCol]: toList,
      };
    });

    if (selectedRecord && selectedRecord.id === card.id) {
      setSelectedRecord((prev) => (prev ? { ...prev, status: nextCol } : null));
    }
  };

  // Add new record
  const handleQuickAdd = (e) => {
    e?.preventDefault();
    if (!newTitle.trim()) return;

    const newRecord = {
      id: `SR-${Math.floor(Math.random() * 80 + 20)}`,
      title: newTitle.trim(),
      priority: 'high',
      assignee: PERSONAS.sam,
      source: 'live input',
      tag: 'Triage',
      status: 'Incoming',
      createdAt: 'Just now',
    };

    setColumns((prev) => ({
      ...prev,
      Incoming: [newRecord, ...prev.Incoming],
    }));
    setNewTitle('');
  };

  // Flattened & filtered records
  const allRecords = useMemo(() => {
    const records = [];
    Object.entries(columns).forEach(([status, items]) => {
      items.forEach((item) => {
        records.push({ ...item, status });
      });
    });

    return records
      .filter((r) => {
        const matchesPriority = priorityFilter === 'all' || r.priority === priorityFilter;
        const matchesSearch =
          !searchQuery.trim() ||
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (r.source && r.source.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesPriority && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const weight = { high: 3, medium: 2, low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return b.id.localeCompare(a.id);
      });
  }, [columns, priorityFilter, searchQuery, sortBy]);

  // Bulk actions
  const toggleSelectRow = (id, e) => {
    e?.stopPropagation();
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkAdvance = () => {
    selectedRows.forEach((id) => {
      const rec = allRecords.find((r) => r.id === id);
      if (rec) moveCard(rec, rec.status);
    });
    setSelectedRows([]);
  };

  return (
    <div className="flex h-full w-full bg-[#f6f5f2] text-[#111827] select-none overflow-hidden relative">
      {/* ── Unified Workspace App Rail ── */}
      <WorkspaceAppRail activeApp="lists" />

      {/* ── Main Lists Content Canvas ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Enterprise Header Bar */}
        <div className="h-11 shrink-0 border-b border-[#e7e4de] bg-[#fffefd] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500/10 text-emerald-600">
              <CheckSquare size={13} strokeWidth={2.2} />
            </span>
            <span className="text-xs font-semibold text-[#111827]">Support Requests & Bugs</span>
            <span className="text-[11px] text-[#667085] font-mono">· Sprint 42</span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-[#667085]">
              {allRecords.length} records
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher: Board vs Table */}
            <div className="flex items-center bg-[#f0ede8] rounded-md p-0.5 border border-[#e7e4de]">
              <button
                type="button"
                onClick={() => setViewMode('board')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium transition-all ${
                  viewMode === 'board'
                    ? 'bg-white text-[#111827] shadow-xs'
                    : 'text-[#667085] hover:text-[#111827]'
                }`}
                title="Board View"
              >
                <LayoutGrid size={11} />
                <span>Board</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-medium transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-[#111827] shadow-xs'
                    : 'text-[#667085] hover:text-[#111827]'
                }`}
                title="Table View"
              >
                <List size={11} />
                <span>Table</span>
              </button>
            </div>

            {/* Auto-Linked Context Beacon */}
            <span className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Workspace Sync
            </span>
          </div>
        </div>

        {/* Toolbar: Quick Add, Search, Filters, Group By, Sort */}
        <div className="h-10 shrink-0 border-b border-[#e7e4de] bg-[#faf9f7] px-3.5 flex items-center justify-between gap-3 text-xs">
          {/* Quick Add Form */}
          <form onSubmit={handleQuickAdd} className="flex-1 flex items-center gap-2 min-w-[200px] max-w-md">
            <Plus size={13} className="text-[#3156cf] shrink-0" />
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Add record to Todo (press Enter)..."
              className="flex-1 bg-transparent text-xs text-[#111827] placeholder-[#98a2b3] focus:outline-none"
            />
            {newTitle && (
              <button
                type="submit"
                className="flex items-center gap-1 text-[10px] font-mono text-[#3156cf] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded cursor-pointer"
              >
                <span>Add</span>
                <CornerDownLeft size={10} />
              </button>
            )}
          </form>

          {/* Right Toolbar Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Search Input */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white border border-[#e7e4de] rounded px-2 py-1 text-[11px] text-[#667085] focus-within:border-[#3156cf]">
              <Search size={11} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter records..."
                className="w-24 md:w-32 bg-transparent text-xs text-[#111827] placeholder-[#98a2b3] focus:outline-none"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="hover:text-black">
                  <X size={10} />
                </button>
              )}
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-1 text-[10.5px]">
              <Filter size={11} className="text-[#667085] hidden sm:inline" />
              {['all', 'high', 'medium'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2 py-0.5 rounded capitalize font-medium transition-colors ${
                    priorityFilter === p
                      ? 'bg-[#3156cf] text-white shadow-2xs'
                      : 'text-[#667085] hover:bg-[#eeece7]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Group By Toggle */}
            <button
              type="button"
              onClick={() => setGroupBy((g) => (g === 'status' ? 'priority' : 'status'))}
              className="hidden md:flex items-center gap-1 bg-white border border-[#e7e4de] rounded px-2 py-1 text-[10.5px] text-[#667085] hover:text-[#111827] capitalize"
              title="Group records by status or priority"
            >
              <Layers size={11} />
              <span>Group: {groupBy}</span>
            </button>

            {/* Sort Toggle */}
            <button
              type="button"
              onClick={() => {
                const nextSort = sortBy === 'id' ? 'priority' : sortBy === 'priority' ? 'title' : 'id';
                setSortBy(nextSort);
              }}
              className="hidden lg:flex items-center gap-1 bg-white border border-[#e7e4de] rounded px-2 py-1 text-[10.5px] text-[#667085] hover:text-[#111827]"
              title="Change sort order"
            >
              <ArrowUpDown size={11} />
              <span>Sort: {sortBy}</span>
            </button>
          </div>
        </div>

        {/* ── Viewport Content: Empty State OR Board OR Table ── */}
        {allRecords.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
              <Filter size={20} />
            </span>
            <h3 className="text-sm font-semibold text-[#111827]">No records match your filters</h3>
            <p className="mt-1 text-xs text-[#667085] max-w-sm">
              Try searching with different terms or reset your active priority filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setPriorityFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-[#3156cf] px-3 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-[#2546b8]"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === 'board' ? (
          /* ── Board (Kanban) View ── */
          <div className="flex-1 p-3.5 grid grid-cols-3 gap-3 overflow-x-auto">
            {(groupBy === 'status'
              ? LISTS_DATA.columns.map((colName) => ({
                  id: colName,
                  label: STATUS_CONFIG[colName]?.label || colName,
                  dot: STATUS_CONFIG[colName]?.dot || 'bg-slate-400',
                  cards: allRecords.filter((r) => r.status === colName),
                }))
              : ['high', 'medium', 'low'].map((prioKey) => ({
                  id: prioKey,
                  label: `${PRIORITY_CONFIG[prioKey]?.label || prioKey} Priority`,
                  dot: prioKey === 'high' ? 'bg-rose-500' : prioKey === 'medium' ? 'bg-amber-500' : 'bg-slate-400',
                  cards: allRecords.filter((r) => r.priority === prioKey),
                }))
            ).map((col) => {
              const { id: colKey, label: colLabel, dot: colDot, cards } = col;
              return (
                <div
                  key={colKey}
                  className="flex flex-col bg-[#eeece7]/65 rounded-xl p-2.5 border border-[#e7e4de] min-w-[200px]"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-2 py-1.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${colDot}`} />
                      <span className="text-xs font-bold text-[#344054]">{colLabel}</span>
                    </div>
                    <span className="text-[10px] font-mono font-medium text-[#667085] bg-white px-2 py-0.5 rounded-full border border-[#e7e4de] tabular-nums">
                      {cards.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="flex-1 space-y-2 overflow-y-auto pr-0.5">
                    <AnimatePresence initial={false}>
                      {cards.map((card) => {
                        const prio = PRIORITY_CONFIG[card.priority] || PRIORITY_CONFIG.low;
                        return (
                          <motion.div
                            layout={!reduceMotion}
                            key={card.id}
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.92 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="group p-3 rounded-lg bg-white border border-[#e7e4de] shadow-2xs hover:border-[#3156cf] hover:shadow-xs transition-all cursor-pointer relative"
                            onClick={() => setSelectedRecord(card)}
                          >
                            <div className="flex items-center justify-between gap-1 mb-2">
                              <span className="text-[10px] font-mono font-bold text-[#3156cf] bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-100">
                                {card.id}
                              </span>
                              <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full border ${prio.color}`}>
                                {prio.label}
                              </span>
                            </div>

                            <h4 className="text-[12px] font-medium text-[#111827] leading-snug mb-2.5">
                              {card.title}
                            </h4>

                            <div className="flex items-center justify-between pt-2 border-t border-[#f0ede8] text-[10px] text-[#667085]">
                              <span className="font-mono text-[#667085] truncate max-w-[100px] flex items-center gap-1">
                                <span className="h-1 w-1 rounded-full bg-slate-400" />
                                {card.source}
                              </span>
                              {card.assignee ? (
                                <AvatarChip person={card.assignee} size="xs" />
                              ) : (
                                <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
                                  Unassigned
                                </span>
                              )}
                            </div>

                            {/* Quick advance button on hover */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                moveCard(card, colName);
                              }}
                              className="absolute right-2.5 top-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#3156cf] text-white p-1 rounded shadow-xs hover:bg-[#2546b8]"
                              title="Advance to next column"
                            >
                              <ArrowRight size={11} />
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Table (Data Grid) View ── */
          <div className="flex-1 overflow-auto bg-white">
            <table className="w-full text-left border-collapse text-[11.5px]">
              <thead className="sticky top-0 bg-[#faf9f7] z-10">
                <tr className="border-b border-[#e7e4de] text-[10px] uppercase font-mono text-[#667085]">
                  <th className="py-2.5 px-3 w-8">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === allRecords.length && allRecords.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedRows(allRecords.map((r) => r.id));
                        else setSelectedRows([]);
                      }}
                      className="rounded border-slate-300 text-[#3156cf] focus:ring-0 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-3 font-semibold">ID</th>
                  <th className="py-2.5 px-3 font-semibold">Title</th>
                  <th className="py-2.5 px-3 font-semibold">Stage</th>
                  <th className="py-2.5 px-3 font-semibold">Priority</th>
                  <th className="py-2.5 px-3 font-semibold">Assignee</th>
                  <th className="py-2.5 px-3 font-semibold">Signal Source</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0ede8]">
                {allRecords.map((record) => {
                  const isSelected = selectedRows.includes(record.id);
                  const prio = PRIORITY_CONFIG[record.priority] || PRIORITY_CONFIG.low;
                  const colConfig = STATUS_CONFIG[record.status] || STATUS_CONFIG.Incoming;
                  return (
                    <tr
                      key={record.id}
                      onClick={() => setSelectedRecord(record)}
                      className={`hover:bg-[#f6f5f2] transition-colors cursor-pointer group ${
                        isSelected ? 'bg-indigo-50/50' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => toggleSelectRow(record.id, e)}
                          className="rounded border-slate-300 text-[#3156cf] focus:ring-0 cursor-pointer"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-[#3156cf]">{record.id}</td>
                      <td className="py-2.5 px-3 font-medium text-[#111827] max-w-xs truncate">{record.title}</td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${colConfig.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${colConfig.dot}`} />
                          {colConfig.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${prio.color}`}>
                          {prio.label}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        {record.assignee ? (
                          <AvatarChip person={record.assignee} size="xs" />
                        ) : (
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-mono">
                            Unassigned
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[#667085] text-[10.5px]">{record.source}</td>
                      <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => moveCard(record, record.status)}
                          className="text-[10px] text-[#3156cf] font-medium hover:underline flex items-center gap-1 justify-end ml-auto"
                        >
                          <span>Advance</span>
                          <ArrowRight size={10} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Floating Selection Action Bar ── */}
        <AnimatePresence>
          {selectedRows.length > 0 && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-[#111827] text-white px-4 py-2 rounded-xl shadow-lg border border-slate-700 text-xs"
            >
              <span className="font-mono text-indigo-300 font-semibold">{selectedRows.length} selected</span>
              <span className="h-3 w-px bg-slate-700" />
              <button
                type="button"
                onClick={handleBulkAdvance}
                className="flex items-center gap-1 bg-[#3156cf] text-white px-2.5 py-1 rounded text-[11px] font-medium hover:bg-[#2546b8]"
              >
                <span>Advance All</span>
                <ArrowRight size={11} />
              </button>
              <button
                type="button"
                onClick={() => setSelectedRows([])}
                className="text-slate-400 hover:text-white text-[11px]"
              >
                Clear
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Bar */}
        <div className="h-8 shrink-0 border-t border-[#e7e4de] bg-[#fffefd] px-4 flex items-center justify-between text-[10.5px] text-[#667085]">
          <span className="flex items-center gap-2">
            <span>Click any record to inspect details</span>
            <span className="text-[#e7e4de]">|</span>
            <span className="font-mono text-[#3156cf]">⌘K Actions</span>
          </span>
          <span className="font-mono text-emerald-600 font-medium flex items-center gap-1">
            <Check size={11} /> All changes saved in workspace
          </span>
        </div>
      </div>

      {/* ── Slide-Over Record Details Drawer (Linear-Grade) ── */}
      <AnimatePresence>
        {selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/25 backdrop-blur-[1px] z-30 flex justify-end"
            onClick={() => setSelectedRecord(null)}
          >
            <motion.aside
              initial={{ x: 340 }}
              animate={{ x: 0 }}
              exit={{ x: 340 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white border-l border-[#e7e4de] shadow-2xl h-full flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="h-12 border-b border-[#e7e4de] px-4 flex items-center justify-between bg-[#faf9f7]">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="font-bold text-[#3156cf] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {selectedRecord.id}
                  </span>
                  <span className="text-[#667085]">Record Details</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="p-1 rounded text-[#667085] hover:text-[#111827] hover:bg-[#eeece7]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-6">
                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider text-[#667085] block mb-1">
                    Title
                  </label>
                  <h3 className="text-base font-semibold text-[#111827] leading-snug">
                    {selectedRecord.title}
                  </h3>
                </div>

                {/* Properties Grid */}
                <div className="grid grid-cols-2 gap-4 border-y border-[#f0ede8] py-4 text-xs">
                  <div>
                    <span className="text-[#667085] text-[10.5px] block mb-1">Stage</span>
                    <div className="flex items-center gap-1.5">
                      {['Incoming', 'In Progress', 'Resolved'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => moveCard(selectedRecord, selectedRecord.status, st)}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                            selectedRecord.status === st
                              ? 'bg-[#3156cf] text-white border-[#3156cf]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {st === 'Incoming' ? 'Todo' : st === 'Resolved' ? 'Done' : st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#667085] text-[10.5px] block mb-1">Priority</span>
                    <div className="flex items-center gap-1">
                      {['high', 'medium', 'low'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => {
                            const updated = { ...selectedRecord, priority: p };
                            setSelectedRecord(updated);
                            setColumns((prev) => ({
                              ...prev,
                              [selectedRecord.status]: prev[selectedRecord.status].map((c) =>
                                c.id === selectedRecord.id ? updated : c
                              ),
                            }));
                          }}
                          className={`px-2 py-0.5 rounded capitalize text-[10px] font-medium border ${
                            selectedRecord.priority === p
                              ? 'bg-[#111827] text-white border-[#111827]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Origin Signal Info */}
                <div className="bg-[#f6f5f2] rounded-lg p-3.5 border border-[#e7e4de] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-[#111827] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#3156cf]" />
                      Connected Workspace Signal
                    </span>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified Origin
                    </span>
                  </div>
                  <p className="text-xs text-[#344054] leading-relaxed">
                    Automatically extracted from conversation thread in{' '}
                    <strong className="text-[#111827]">{selectedRecord.source}</strong>. Context, mentions, and customer details are preserved.
                  </p>
                </div>

                {/* Assignee Card */}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085] block mb-2">
                    Assigned Owner
                  </span>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-[#e7e4de] bg-[#faf9f7]">
                    {selectedRecord.assignee ? (
                      <>
                        <AvatarChip person={selectedRecord.assignee} size="sm" />
                        <div>
                          <p className="text-xs font-semibold text-[#111827]">{selectedRecord.assignee.name}</p>
                          <p className="text-[10.5px] text-[#667085]">{selectedRecord.assignee.role}</p>
                        </div>
                      </>
                    ) : (
                      <span className="text-xs text-amber-700 font-mono">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-[#e7e4de] bg-[#faf9f7] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => moveCard(selectedRecord, selectedRecord.status)}
                  className="flex items-center gap-1.5 rounded-lg bg-[#3156cf] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#2546b8]"
                >
                  <span>Advance Stage</span>
                  <ArrowRight size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRecord(null)}
                  className="text-xs text-[#667085] hover:text-[#111827] font-medium"
                >
                  Close
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
