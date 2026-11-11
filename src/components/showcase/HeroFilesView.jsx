import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckSquare,
  Copy,
  FileText,
  FolderOpen,
  GitBranch,
  Lock,
  Search,
  ShieldCheck,
  Video,
} from 'lucide-react';
import { cn } from '../../lib/cn';
import { useWorkspace } from '../../context/useWorkspace';
import { FOCUS_RING_OBSIDIAN } from '../../lib/interaction';

export default function HeroFilesView() {
  const { setActiveModule, docChecklists, kanbanTasks } = useWorkspace();
  const [selectedFile, setSelectedFile] = useState('RFC-891');
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const files = [
    {
      id: 'RFC-891',
      name: 'Launch plan & token refresh notes',
      type: 'Living Doc',
      format: 'DOCX',
      formatColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      size: '1.4 MB',
      updated: '10:48 AM',
      owner: 'Alex Mercer',
      icon: FileText,
      destination: 'docs',
      hash: 'sha256:4f8a...92b',
      summary:
        'Technical architectural specification and zero-downtime database failover migration checklist.',
    },
    {
      id: 'PR #1042',
      name: 'Token cache TTL recovery',
      type: 'Code Review · 14 checks',
      format: 'GIT',
      formatColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      size: '48 KB',
      updated: '10:44 AM',
      owner: 'Sara Chen',
      icon: GitBranch,
      destination: 'tasks',
      hash: 'commit: 8a4f10c',
      summary:
        'Sub-millisecond Redis TTL invalidation fallback on secondary cluster partition failure.',
    },
    {
      id: 'Huddle #18',
      name: 'Architecture sync transcript',
      type: 'Meeting Transcript · 18 min',
      format: 'AUDIO',
      formatColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      size: '18.5 MB',
      updated: '10:42 AM',
      owner: 'Ukin Scribe',
      icon: Video,
      destination: 'huddle',
      hash: 'media: 7f3d...11c',
      summary:
        'Automated speaker attribution and action item dispatch with SLA target verifications.',
    },
    {
      id: 'Sprint 24',
      name: 'EU cluster recovery checklist',
      type: `${docChecklists.length} checklist items`,
      format: 'SPEC',
      formatColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      size: '164 KB',
      updated: '10:40 AM',
      owner: kanbanTasks.find((task) => task.id === 'tsk_2')?.assignee || 'Sara Chen',
      icon: CheckSquare,
      destination: 'tasks',
      hash: 'task: tsk_891',
      summary:
        'Live synchronization with Jira and GitHub project boards for rapid deployment verification.',
    },
  ];

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      f.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      f.owner.toLowerCase().includes(searchFilter.toLowerCase()),
  );

  const selected = files.find((file) => file.id === selectedFile) || files[0];
  const FileIcon = selected.icon;

  return (
    <div className="flex min-h-[580px] flex-col bg-obsidian-canvas text-slate-200">
      {/* ── Files Command Header ── */}
      <div className="flex min-h-12 items-center justify-between border-b border-obsidian-border bg-obsidian-surface/70 px-4 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-300">
            <FolderOpen className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold tracking-tight text-white">Files & Artifacts</span>
          <span className="hidden text-xs text-obsidian-muted sm:inline">
            · Acme Platform Team / #infra-alerts
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 rounded-full border border-sky-400/20 bg-sky-400/10 px-2 py-0.5 font-mono text-[9.5px] text-sky-200 sm:inline-flex">
            <Lock className="h-2.5 w-2.5" /> AES-256 Scoped
          </span>
          <span className="font-mono text-[10px] text-obsidian-muted">
            {files.length} artifacts linked
          </span>
        </div>
      </div>

      <div className="grid flex-1 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        {/* ── Left: Files Table River ── */}
        <div className="flex flex-col border-b border-obsidian-border p-4 md:border-b-0 md:border-r sm:p-5 min-w-0">
          <div className="relative mb-3">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3 w-3 -translate-y-1/2 text-obsidian-muted" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search files by title, hash, or owner…"
              className="w-full rounded-md border border-obsidian-border bg-obsidian-base py-1.5 pl-7 pr-3 text-xs text-slate-200 placeholder:text-obsidian-muted/70 focus:border-indigo-500/50 focus:outline-none"
            />
          </div>

          <div className="mb-2 grid grid-cols-[minmax(0,1fr)_72px] gap-3 border-b border-obsidian-border px-2 pb-2 text-[9px] font-mono uppercase tracking-wider text-obsidian-muted sm:grid-cols-[minmax(0,1fr)_84px_90px]">
            <span>Artifact</span>
            <span>Size</span>
            <span className="hidden sm:block">Owner</span>
          </div>

          <div className="space-y-1 overflow-y-auto">
            {filteredFiles.map((file) => {
              const Icon = file.icon;
              const isSelected = selectedFile === file.id;
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setSelectedFile(file.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    'grid w-full grid-cols-[minmax(0,1fr)_72px] items-center gap-3 rounded-xl border border-transparent px-2.5 py-3 text-left transition-all cursor-pointer sm:grid-cols-[minmax(0,1fr)_84px_90px]',
                    FOCUS_RING_OBSIDIAN,
                    isSelected
                      ? 'border-indigo-400/30 bg-indigo-500/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                      : 'hover:border-white/5 hover:bg-white/[0.03]',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-obsidian-base text-slate-300 ring-1 ring-white/10">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-xs font-medium text-slate-100">
                          {file.name}
                        </span>
                        <span
                          className={cn(
                            'hidden rounded px-1 py-0.2 font-mono text-[8.5px] font-bold border sm:inline-block',
                            file.formatColor,
                          )}
                        >
                          {file.format}
                        </span>
                      </div>
                      <span className="mt-0.5 block truncate font-mono text-[10px] text-obsidian-muted">
                        {file.type} · {file.updated}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-obsidian-muted">{file.size}</span>
                  <span className="hidden truncate text-[10px] text-slate-300 sm:block">
                    {file.owner}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right Inspector Panel: File Metadata & Link ── */}
        <aside className="flex flex-col p-4 sm:p-5 bg-obsidian-base/40">
          <p className="font-mono text-[9.5px] font-semibold uppercase tracking-wider text-obsidian-muted">
            Artifact Inspector
          </p>

          <div className="mt-3 rounded-xl border border-obsidian-border bg-obsidian-base p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-obsidian-border pb-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300 ring-1 ring-indigo-400/20">
                <FileIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">{selected.name}</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className={cn(
                      'rounded px-1.5 py-0.2 font-mono text-[8.5px] font-bold border',
                      selected.formatColor,
                    )}
                  >
                    {selected.format}
                  </span>
                  <span className="font-mono text-[10px] text-obsidian-muted">{selected.size}</span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-300">{selected.summary}</p>

            <div className="mt-3.5 space-y-2 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 font-mono text-[10px]">
              <div className="flex items-center justify-between text-obsidian-muted">
                <span>Check:</span>
                <span className="text-slate-200">{selected.hash}</span>
              </div>
              <div className="flex items-center justify-between text-obsidian-muted">
                <span>Owner:</span>
                <span className="text-slate-200">{selected.owner}</span>
              </div>
              <div className="flex items-center justify-between text-obsidian-muted">
                <span>Updated:</span>
                <span className="text-slate-200">{selected.updated}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-2 border-t border-obsidian-border pt-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy link'}</span>
              </button>

              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5" /> SOC 2 Synced
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveModule(selected.destination)}
            className={cn(
              'mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/15 py-2.5 px-4 text-xs font-semibold text-indigo-200 transition-all hover:bg-indigo-500/25 hover:text-white cursor-pointer shadow-xs',
              FOCUS_RING_OBSIDIAN,
            )}
          >
            <span>
              Open linked{' '}
              {selected.destination === 'huddle'
                ? 'Huddle'
                : selected.destination === 'docs'
                ? 'Doc'
                : 'Task'}
            </span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </aside>
      </div>
    </div>
  );
}
