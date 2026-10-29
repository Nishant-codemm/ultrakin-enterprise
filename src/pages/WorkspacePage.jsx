import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AtSign, Bot, CheckSquare, FileText, FolderOpen, Mail, MessageSquare, Video } from 'lucide-react';
import { useWorkspace } from '../context/useWorkspace';
import MatrixChatEngine from '../components/showcase/MatrixChatEngine';
import DomainMailboxEngine from '../components/showcase/DomainMailboxEngine';
import LivingDocEditor from '../components/showcase/LivingDocEditor';
import HuddleSimulator from '../components/showcase/HuddleSimulator';
import KanbanTaskBoard from '../components/showcase/KanbanTaskBoard';
import VisualAutomationsCanvas from '../components/showcase/VisualAutomationsCanvas';
import WorkspaceToastContainer from '../components/showcase/WorkspaceToastContainer';
import { HeroFilesView, HeroThreadsView } from '../sections/HeroSection';
import BrowserFrame from '../components/BrowserFrame';

const modules = [
  { id: 'chat', name: 'Chat', icon: MessageSquare },
  { id: 'threads', name: 'Threads', icon: AtSign },
  { id: 'huddle', name: 'Huddles', icon: Video },
  { id: 'docs', name: 'Docs', icon: FileText },
  { id: 'files', name: 'Files', icon: FolderOpen },
  { id: 'mail', name: 'Mail', icon: Mail },
  { id: 'automations', name: 'Agents', icon: Bot },
  { id: 'tasks', name: 'Tasks', icon: CheckSquare },
];

const panels = {
  chat: MatrixChatEngine,
  threads: HeroThreadsView,
  huddle: HuddleSimulator,
  docs: LivingDocEditor,
  files: HeroFilesView,
  mail: DomainMailboxEngine,
  automations: VisualAutomationsCanvas,
  tasks: KanbanTaskBoard,
};

export default function WorkspacePage() {
  const { activeModule, setActiveModule } = useWorkspace();
  const reduceMotion = useReducedMotion();
  const Panel = panels[activeModule] || MatrixChatEngine;

  return (
    <div className="min-h-screen bg-page pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[.2em] text-brand-text">Interactive workspace · sample data</p>
            <h1 className="text-[clamp(2.5rem,4.5vw,3.5rem)] font-medium leading-[1] tracking-[-.055em]">One place to move<br className="hidden sm:block" /> the work forward.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted">Switch between the surfaces your team uses. Conversations, decisions, and next steps stay connected in the same workspace.</p>
          </div>
          <a href="https://app.ultrakin.com" target="_blank" rel="noreferrer" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-brand px-4 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_rgba(49,86,207,.5)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page md:self-auto">Open Ultrakin<span aria-hidden="true">↗</span></a>
        </header>

        <BrowserFrame address={`app.ultrakin.com/workspace/${activeModule}`} className="rounded-3xl shadow-[0_28px_72px_-54px_rgba(17,24,39,.32),0_5px_18px_rgba(17,24,39,.06)]">
        <section aria-label="Ultrakin workspace demo" className="relative overflow-hidden bg-[#0b0e14]">
          <div className="flex min-h-14 items-center justify-between gap-3 border-b border-obsidian-border bg-[#10131b] px-4 sm:px-5">
            <div className="flex min-w-0 items-center gap-2.5"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-400/15 text-[10px] font-semibold text-indigo-100">A</span><span className="truncate text-xs font-medium text-slate-100">Acme · Launch team</span><span className="hidden text-[10px] text-slate-600 sm:inline">/ Shared workspace</span></div>
            <span className="flex shrink-0 items-center gap-1.5 text-[10px] text-slate-500"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Sample workspace</span>
          </div>

          <div className="grid min-h-[620px] lg:grid-cols-[210px_minmax(0,1fr)]">
            <nav aria-label="Workspace modules" className="border-b border-obsidian-border bg-[#090b11] p-2.5 lg:border-b-0 lg:border-r lg:p-3">
              <p className="hidden px-2 py-2 font-mono text-[9px] uppercase tracking-[.16em] text-slate-600 lg:block">Workspace</p>
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:flex lg:flex-col">
                {modules.map(({ id, name, icon: Icon }) => <button key={id} type="button" onClick={() => setActiveModule(id)} aria-current={activeModule === id ? 'page' : undefined} className={`flex min-w-0 w-full items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-left text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-obsidian-focus lg:justify-start lg:px-3 ${activeModule === id ? 'bg-indigo-400/[0.13] text-indigo-100' : 'text-slate-400 hover:bg-white/[0.045] hover:text-slate-100'}`}><Icon size={15} strokeWidth={1.7} /><span className="truncate">{name}</span>{id === 'mail' && <span className="ml-auto hidden rounded-full bg-sky-400/10 px-1.5 py-0.5 text-[9px] text-sky-200 lg:inline">2</span>}</button>)}
              </div>
              <div className="mt-7 hidden border-t border-white/[0.07] px-2 pt-4 lg:block"><p className="text-[10px] font-medium text-slate-300">Maya Chen</p><p className="mt-1 text-[9px] text-slate-600">Launch team · Admin</p></div>
            </nav>

            <div className="relative min-w-0 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={activeModule} initial={reduceMotion ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -4 }} transition={{ duration: reduceMotion ? 0.01 : 0.18 }} className="min-h-[620px]">
                  <Panel />
                </motion.div>
              </AnimatePresence>
              <WorkspaceToastContainer />
            </div>
          </div>
        </section>
        </BrowserFrame>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted"><span>Changes stay inside this interactive sample.</span><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand/70" />Try a module from the workspace navigation</span></div>
      </div>
    </div>
  );
}
