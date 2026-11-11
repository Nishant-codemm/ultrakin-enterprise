import React from 'react';
import { useWorkspace } from '../context/useWorkspace';
import WorkspaceShell from '../components/showcase/WorkspaceShell';
import BrowserFrame from '../components/BrowserFrame';

export default function WorkspacePage() {
  const { activeModule } = useWorkspace();

  return (
    <div className="min-h-screen bg-page pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[.2em] text-brand-text">Interactive workspace · sample data</p>
            <h1 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.035em]">One place to move<br className="hidden sm:block" /> <span className="font-display italic text-brand-text">the work forward.</span></h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted">Switch between the surfaces your team uses. Conversations, decisions, and next steps stay connected in the same workspace.</p>
          </div>
          <a href="https://app.ultrakin.com" target="_blank" rel="noreferrer" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-brand px-4 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_rgba(49,86,207,.5)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page md:self-auto">Open Ultrakin<span aria-hidden="true">↗</span></a>
        </header>

        <BrowserFrame
          address={`workspace.ultrakin.app/acme-corp/${activeModule}`}
          tabTitle={`Ultrakin · ${activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}`}
          className="rounded-3xl shadow-[0_28px_72px_-54px_rgba(17,24,39,.32),0_5px_18px_rgba(17,24,39,.06)]"
        >
          <WorkspaceShell />
        </BrowserFrame>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted"><span>Changes stay inside this interactive sample.</span><span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand/70" />Try a module from the workspace navigation</span></div>
      </div>
    </div>
  );
}
