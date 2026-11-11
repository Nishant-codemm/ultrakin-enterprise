import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Button from '../components/primitives/Button';
import Badge from '../components/primitives/Badge';
import { cn } from '../lib/cn';
import { useWorkspace } from '../context/useWorkspace';
import { navigate } from '../lib/navigate';
import BrowserFrame from '../components/BrowserFrame';
import WorkspaceShell from '../components/showcase/WorkspaceShell';
import HeroInteractiveStage from '../components/showcase/HeroInteractiveStage';
import { WORKFLOW_SIGNALS } from '../data/heroSignals';
import HeroThreadsView from '../components/showcase/HeroThreadsView';
import HeroFilesView from '../components/showcase/HeroFilesView';

export { HeroThreadsView, HeroFilesView, WORKFLOW_SIGNALS, HeroInteractiveStage };

function HeroWorkspaceContent() {
  const {
    activeModule,
    activeChannel,
  } = useWorkspace();

  const showcaseBounds = useRef(null);
  const rotateX = useSpring(0, { stiffness: 120, damping: 22, mass: 0.45 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 22, mass: 0.45 });
  const spotlightX = useSpring(0, { stiffness: 90, damping: 24, mass: 0.5 });
  const spotlightY = useSpring(0, { stiffness: 90, damping: 24, mass: 0.5 });

  const handleShowcasePointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleShowcasePointerLeave();
      return;
    }
    showcaseBounds.current = event.currentTarget.getBoundingClientRect();
  };

  const handleShowcasePointerMove = (event) => {
    const bounds = showcaseBounds.current;
    if (!bounds || event.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      handleShowcasePointerLeave();
      return;
    }
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateX.set(y * -0.7);
    rotateY.set(x * 1.1);
    spotlightX.set(x * bounds.width * 0.3);
    spotlightY.set(y * bounds.height * 0.3);
  };

  const handleShowcasePointerLeave = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    showcaseBounds.current = null;
    if (reduceMotion) {
      rotateX.jump(0);
      rotateY.jump(0);
      spotlightX.jump(0);
      spotlightY.jump(0);
      return;
    }
    rotateX.set(0);
    rotateY.set(0);
    spotlightX.set(0);
    spotlightY.set(0);
  };

  return (
    <>
      <section id="hero" className="relative overflow-hidden bg-transparent pt-28 pb-16 text-ink md:pt-36 md:pb-20">
        {/* ── Atmospheric depth layers ── */}
        {/* Primary brand glow — upper right */}
        <div
          className="pointer-events-none absolute -top-32 right-[-12%] h-[640px] w-[860px] rounded-full opacity-60 blur-[140px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(49,86,207,0.09) 0%, rgba(99,102,241,0.07) 30%, rgba(169,155,132,0.05) 60%, transparent 80%)' }}
        />
        {/* Secondary warm glow — lower left */}
        <div
          className="pointer-events-none absolute bottom-0 left-[-8%] h-[400px] w-[500px] rounded-full opacity-40 blur-[120px]"
          style={{ background: 'radial-gradient(ellipse at center, rgba(49,86,207,0.06) 0%, transparent 70%)' }}
        />
        {/* Subtle dot grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Top edge hairline glow */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(460px,1.08fr)] lg:gap-8 xl:gap-12">
            <div className="max-w-[700px]">

              {/* ── Badge ── */}
              <motion.div
                className="mb-5"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
              >
                <Badge
                  variant="indigo"
                  size="md"
                  dot
                  className="max-w-full flex-wrap gap-y-1 border-brand/20 bg-brand/[0.07] px-3 py-1 text-[11px] shadow-[0_2px_8px_rgba(49,86,207,0.12)]"
                >
                  <span className="font-semibold tracking-wider text-brand-text">ULTRAKIN</span>
                  <span className="mx-1.5 text-ink-subtle/40">|</span>
                  <span className="font-normal text-ink-muted">People, tools, and agents in one app</span>
                </Badge>
              </motion.div>

              {/* ── Headline ── */}
              <h1 className="max-w-[680px] font-display text-[clamp(3rem,5.5vw,5rem)] font-normal leading-[1.04] tracking-[-0.035em] text-ink">
                <span className="block">The autonomous</span>
                <span className="block">workspace for</span>
                <span
                  className="block bg-clip-text text-transparent italic"
                  style={{ backgroundImage: 'linear-gradient(105deg, #3156cf 0%, #6366f1 40%, #818cf8 75%, #4f7bd9 100%)' }}
                >
                  fast teams.
                </span>
              </h1>

              {/* ── Subheadline ── */}
              <p className="mt-5 max-w-[560px] text-[17px] leading-7 tracking-[-0.005em] text-ink-muted sm:text-[18px]">
                Chat, mail, docs, huddles, and tasks—connected by agents that carry context into what happens next.
              </p>

              {/* ── CTA Buttons ── */}
              <div className="mt-7 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center">
                <Button
                  variant="primary"
                  size="lg"
                  iconRight={ArrowRight}
                  className="w-full sm:w-auto text-[15px] px-7 h-12 hover:shadow-[0_8px_24px_rgba(49,86,207,0.45)] transition-shadow"
                  onClick={() => navigate('/workspace')}
                >
                  Start free
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto text-[15px] px-6 h-12"
                  iconRight={ArrowRight}
                  onClick={() => document.getElementById('workspace-showcase')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See how it works
                </Button>
              </div>

              {/* ── Trust badges ── */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-medium text-ink-subtle select-none">
                {[
                  'SOC 2 Type II',
                  'Zero-Retention AI',
                  'SAML 2.0 / SCIM',
                  '99.99% uptime SLA',
                ].map((label, i) => (
                  <React.Fragment key={label}>
                    {i > 0 && <span className="hidden sm:inline-block h-1 w-1 rounded-full bg-border-strong" aria-hidden="true" />}
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-brand-text" />
                      <span>{label}</span>
                    </span>
                  </React.Fragment>
                ))}
              </div>

            </div>

            {/* ── Hero Right: Next-Level 3D Interactive Workflow Stage ── */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <HeroInteractiveStage />
            </div>
          </div>
        </div>
      </section>

      <section id="workspace-showcase" className="divider-hairline relative bg-transparent py-20 text-ink md:py-28">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <header className="mb-8 flex items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(2rem,3.5vw,2.75rem)] font-medium tracking-[-0.045em] text-ink">Everything in one workspace</h2>
          </header>

          {/* Pure-code interactive application frame */}
          <motion.div
            className="relative"
            style={{ perspective: '1400px', rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onPointerEnter={handleShowcasePointerEnter}
            onPointerMove={handleShowcasePointerMove}
            onPointerLeave={handleShowcasePointerLeave}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(105,123,164,.12),rgba(169,155,132,.06)_35%,transparent_70%)] opacity-70 md:block"
              style={{ x: spotlightX, y: spotlightY, marginLeft: '-14rem', marginTop: '-14rem' }}
            />
            <BrowserFrame
              address={`workspace.ultrakin.app/acme-eng${activeModule === 'chat' ? `#${activeChannel}` : `/${activeModule}`}`}
              tabTitle={`Ultrakin · ${activeModule === 'chat' ? activeChannel : activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} · Acme Corp`}
              className="relative z-10 mt-8"
            >
              <div className="relative" style={{ perspective: '1400px' }}>
                {/* Dynamic Ambient Backglow matching active module */}
                <div
                  className={cn(
                    'pointer-events-none absolute -inset-4 sm:-inset-8 rounded-3xl blur-3xl opacity-35 transition-all duration-700 -z-10',
                    activeModule === 'chat' && 'bg-gradient-to-b from-indigo-500/30 via-indigo-600/10 to-transparent',
                    activeModule === 'mail' && 'bg-gradient-to-b from-sky-500/30 via-sky-600/10 to-transparent',
                    activeModule === 'docs' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent',
                    activeModule === 'huddle' && 'bg-gradient-to-b from-violet-500/30 via-violet-600/10 to-transparent',
                    activeModule === 'tasks' && 'bg-gradient-to-b from-amber-500/30 via-amber-600/10 to-transparent',
                    activeModule === 'automations' && 'bg-gradient-to-b from-emerald-500/30 via-emerald-600/10 to-transparent'
                  )}
                />

                <WorkspaceShell />
              </div>
            </BrowserFrame>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default function HeroSection() {
  return <HeroWorkspaceContent />;
}
