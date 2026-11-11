import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '../lib/cn';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion } from '../lib/motion';
import { CATEGORIES, INTEGRATIONS, PRODUCT_ICON_CONFIG } from '../data/integrationData';
import OrbitalTopologyMap from '../components/showcase/OrbitalTopologyMap';
import IntegrationSurfacePreview from '../components/showcase/IntegrationSurfacePreview';

export default function IntegrationsSection() {
  const [selectedCat, setSelectedCat] = useState('Built in');
  const [selected, setSelected] = useState('Spaces');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();

  const visible = INTEGRATIONS.filter((item) => item.category === selectedCat);
  const current = visible.find((item) => item.name === selected) ?? visible[0];
  const activeNode = hoveredNode || selected;

  const selectCategory = (category) => {
    setSelectedCat(category);
    if (!INTEGRATIONS.some((item) => item.name === selected && item.category === category)) {
      setSelected(INTEGRATIONS.find((item) => item.category === category)?.name ?? 'Spaces');
    }
  };

  return (
    <section ref={sectionRef} id="integrations" className="divider-hairline relative overflow-hidden bg-transparent py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Header with Scroll Entrance */}
        <motion.div
          {...getSectionHeaderMotion(inView, reduceMotion)}
          className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle">
              <span className="h-px w-7 bg-brand" /> BUILT IN, THEN OPEN
            </p>
            <h2 className="max-w-xl font-display text-[clamp(2.5rem,4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.035em] text-ink">
              One workspace.<br />
              <span className="font-display italic text-ink-muted">Room to extend.</span>
            </h2>
          </div>
          <div className="lg:justify-self-end lg:pb-1">
            <p className="max-w-sm text-[15px] leading-7 text-ink-muted">
              Chat, mail, meetings, calendar, tasks, docs, and Ukin are built into one workspace. External entries are illustrative examples.
            </p>
            <button
              type="button"
              onClick={() => document.getElementById('workspace-showcase')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer"
            >
              Explore the workspace <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>

        {/* Filter tabs */}
        <div className="mt-12 border-y border-border py-4">
          <div role="group" aria-label="Explore workspace surfaces and extensions" className="flex gap-1.5 overflow-x-auto pb-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCat === category}
                onClick={() => selectCategory(category)}
                className={cn(
                  'shrink-0 rounded-full px-3 py-1.5 text-[10px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer',
                  selectedCat === category ? 'bg-brand-soft text-brand-text font-medium' : 'text-ink-subtle hover:bg-surface-hover hover:text-ink-soft',
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Orbit map + detail */}
        <div className="grid gap-8 pt-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(250px,.8fr)] lg:items-center lg:gap-12 relative">

          {/* ── Orbit Map Component (Modularized) ── */}
          <OrbitalTopologyMap
            visible={visible}
            current={current}
            selectedCat={selectedCat}
            activeNode={activeNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            setSelected={setSelected}
            inView={inView}
          />

          {/* ── Detail panel ── */}
          <div className="relative min-h-[250px] border-l border-border pl-6 sm:pl-8 lg:min-h-[290px] lg:pl-10">
            {/* Top border hairline accent */}
            <div aria-hidden="true" className="absolute -left-px top-0 h-8 w-px bg-brand/70" />

            {/* Optical receiver bead aligned with incoming trajectory from vector diagram */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute -left-[3px] top-[148px] h-1.5 w-1.5 rounded-full bg-brand/60 ring-2 ring-page transition-all duration-300"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.17em] text-brand-text">{current.badge}</p>
                <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-ink sm:text-4xl">{current.name}</h3>
                <p className="mt-4 max-w-sm text-[15px] leading-7 text-ink-muted">{current.desc}</p>
                <IntegrationSurfacePreview item={current} />
                <div className="mt-8 flex items-center gap-3 text-[10px] text-ink-subtle">
                  <span className="h-px w-8 bg-border-strong" />
                  <span>{current.category}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mobile node list (accessible fallback) */}
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-0 border-t border-border sm:hidden">
              {visible.map((item) => {
                const conf = PRODUCT_ICON_CONFIG[item.name];
                const ItemIcon = conf?.icon || Sparkles;
                return (
                  <button
                    key={item.name}
                    type="button"
                    aria-pressed={item.name === current.name}
                    onClick={() => setSelected(item.name)}
                    className={cn(
                      'flex min-h-11 items-center gap-2 border-b border-border text-left text-[11px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus cursor-pointer',
                      item.name === current.name ? 'text-brand-text font-medium' : 'text-ink-subtle hover:text-ink-soft',
                    )}
                  >
                    <span className={cn('flex h-5 w-5 items-center justify-center rounded-md text-white', conf?.bg || 'bg-brand')}>
                      <ItemIcon size={11} />
                    </span>
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
