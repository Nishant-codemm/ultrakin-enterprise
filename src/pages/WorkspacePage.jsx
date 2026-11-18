import React, { useEffect, useState, useCallback } from 'react';
import { Maximize2 } from 'lucide-react';
import { useWorkspace } from '../context/useWorkspace';
import WorkspaceShell from '../components/showcase/WorkspaceShell';
import BrowserFrame from '../components/BrowserFrame';

export default function WorkspacePage() {
  const { activeModule } = useWorkspace();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.title = isFullscreen
      ? `Ultrakin · ${activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} (Fullscreen)`
      : 'Workspace — Ultrakin';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Explore an interactive Ultrakin workspace with connected conversations, docs, files, huddles, agents, and tasks.'
    );
  }, [isFullscreen, activeModule]);

  // Handle ESC key to exit fullscreen, and 'F' key to toggle fullscreen when not typing
  const handleKeyDown = useCallback(
    (e) => {
      if (e.defaultPrevented) return;
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (
        (e.key === 'f' || e.key === 'F') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
      ) {
        setIsFullscreen((prev) => !prev);
      }
    },
    [isFullscreen]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent background scroll in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const moduleTitle = activeModule.charAt(0).toUpperCase() + activeModule.slice(1);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-[200] bg-obsidian-canvas flex flex-col h-screen w-screen overflow-hidden select-none">
        <WorkspaceShell
          className="h-full w-full rounded-none border-0 shadow-none flex-1 flex flex-col"
          onExitFullscreen={() => setIsFullscreen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page pb-24 pt-28 text-ink sm:pt-32">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-border pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[.2em] text-brand-text">
              Interactive workspace · sample data
            </p>
            <h1 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.035em]">
              One place to move<br className="hidden sm:block" />{' '}
              <span className="font-display italic text-brand-text">the work forward.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-muted">
              Switch between the surfaces your team uses. Conversations, decisions, and next steps stay connected in the same workspace.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface-raised px-3.5 text-xs font-semibold text-ink shadow-2xs transition-[background-color,border-color,transform] hover:-translate-y-px hover:bg-surface-hover hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
              title="Enter fullscreen workspace (F)"
            >
              <Maximize2 className="h-3.5 w-3.5 text-ink-muted" />
              <span>Fullscreen Mode</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-surface text-[10px] font-mono text-ink-subtle border border-border">F</kbd>
            </button>
            <a
              href="https://app.ultrakin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-4 text-xs font-semibold text-white shadow-[0_6px_18px_-8px_rgba(49,86,207,.5)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page cursor-pointer"
            >
              <span>Open Ultrakin</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </header>

        <BrowserFrame
          address={`workspace.ultrakin.app/acme-corp/${activeModule}`}
          tabTitle={`Ultrakin · ${moduleTitle}`}
          onToggleFullscreen={() => setIsFullscreen(true)}
          className="rounded-3xl shadow-[0_28px_72px_-54px_rgba(17,24,39,.32),0_5px_18px_rgba(17,24,39,.06)]"
        >
          <WorkspaceShell />
        </BrowserFrame>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted">
          <span>Changes stay inside this interactive sample.</span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-brand/70" />
            Try a module from the workspace navigation or press <kbd className="font-mono bg-surface-raised border border-border px-1 py-0.5 rounded text-[10px]">F</kbd> for fullscreen
          </span>
        </div>
      </div>
    </div>
  );
}
