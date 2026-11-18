/**
 * SolutionsOverviewPage.jsx
 * Hub page for /solutions ("See all solutions")
 * Displays all 11 solutions organized by Team and Industry,
 * plus the quick-start templates showcase.
 */
import React, { useEffect } from 'react';
import { navigate } from '../lib/navigate';
import {
  Headphones,
  TrendingUp,
  Code,
  Layers,
  Megaphone,
  Users,
  Palette,
  GraduationCap,
  ShoppingBag,
  Scale,
  Truck,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Workflow,
} from 'lucide-react';
import { SOLUTION_META, SOLUTION_TEMPLATES_ASIDE } from '../data/solutionPageData';
import ProductCTARow from '../components/product/ProductCTARow';

const SOLUTION_ICONS = {
  'customer-support': Headphones,
  sales: TrendingUp,
  engineering: Code,
  operations: Layers,
  marketing: Megaphone,
  people: Users,
  agencies: Palette,
  education: GraduationCap,
  ecommerce: ShoppingBag,
  'professional-services': Scale,
  'field-services': Truck,
};

export default function SolutionsOverviewPage() {
  useEffect(() => {
    document.title = 'Solutions — Ultrakin';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Explore Ultrakin solutions tailored for Customer Support, Sales, Engineering, Operations, Marketing, Education, Agencies, and more.'
    );
  }, []);

  const teamSolutions = Object.values(SOLUTION_META).filter((s) => s.category === 'team');
  const industrySolutions = Object.values(SOLUTION_META).filter((s) => s.category === 'industry');

  return (
    <div className="min-h-screen bg-page pt-20 pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[13px] text-ink-muted">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-ink transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-xs"
          >
            Home
          </button>
          <ChevronRight size={12} className="text-border-strong" aria-hidden="true" />
          <span className="font-medium text-ink" aria-current="page">Solutions</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-text">
            SOLUTIONS · WORKSPACE OS
          </p>
          <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.03em] text-ink">
            Workflows engineered for your <span className="font-display italic text-brand-text">team and industry.</span>
          </h1>
          <p className="mt-5 text-[1.05rem] leading-[1.7] text-ink-muted">
            From incident triage to student classrooms and sales proposals, explore how teams eliminate tool fragmentation and move from signals to outcomes in one workspace.
          </p>
        </div>

        {/* Section 1: By Team */}
        <section className="mb-16" aria-labelledby="heading-team-solutions">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-subtle">01</span>
            <h2 id="heading-team-solutions" className="text-xl font-semibold text-ink">By Team Function</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamSolutions.map((sol) => {
              const Icon = SOLUTION_ICONS[sol.slug] || Workflow;
              return (
                <article
                  key={sol.slug}
                  role="link"
                  tabIndex={0}
                  aria-label={`${sol.name}: ${sol.sub}`}
                  onClick={() => navigate(`/solutions/${sol.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/solutions/${sol.slug}`);
                    }
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface-raised p-6 shadow-xs hover:border-brand/40 hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-2xs"
                        style={{ backgroundColor: sol.color }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-subtle group-hover:text-brand-text transition-colors">
                        Explore →
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-ink group-hover:text-brand-text transition-colors">
                      {sol.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {sol.sub}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-ink-soft">
                    <span className="font-medium">{sol.badgeText}</span>
                    <span className="flex items-center gap-1 text-brand-text font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View workflow</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 2: By Industry */}
        <section className="mb-16" aria-labelledby="heading-industry-solutions">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-ink-subtle">02</span>
            <h2 id="heading-industry-solutions" className="text-xl font-semibold text-ink">By Industry Vertical</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industrySolutions.map((sol) => {
              const Icon = SOLUTION_ICONS[sol.slug] || Workflow;
              return (
                <article
                  key={sol.slug}
                  role="link"
                  tabIndex={0}
                  aria-label={`${sol.name}: ${sol.sub}`}
                  onClick={() => navigate(`/solutions/${sol.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(`/solutions/${sol.slug}`);
                    }
                  }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-surface-raised p-6 shadow-xs hover:border-brand/40 hover:shadow-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-page"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-2xs"
                        style={{ backgroundColor: sol.color }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-ink-subtle group-hover:text-brand-text transition-colors">
                        Explore →
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-ink group-hover:text-brand-text transition-colors">
                      {sol.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                      {sol.sub}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/70 flex items-center justify-between text-[11px] text-ink-soft">
                    <span className="font-medium">{sol.badgeText}</span>
                    <span className="flex items-center gap-1 text-brand-text font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View workflow</span>
                      <ArrowRight size={12} aria-hidden="true" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3: Ready-to-Deploy Templates Strip */}
        <section className="rounded-2xl border border-border bg-surface-raised p-6 sm:p-8 shadow-xs" aria-labelledby="heading-templates">
          <div className="max-w-xl mb-6">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-600">
              READY-TO-USE WORKSPACE BLUEPRINTS
            </p>
            <h2 id="heading-templates" className="text-xl font-bold text-ink mt-1">Start from proven templates.</h2>
            <p className="text-xs text-ink-muted mt-1">
              Deploy pre-configured automations, channels, and records in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SOLUTION_TEMPLATES_ASIDE.map((tpl) => (
              <article
                key={tpl.id}
                role="link"
                tabIndex={0}
                aria-label={`Template: ${tpl.title} — ${tpl.desc}`}
                onClick={() => navigate('/products/templates')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate('/products/templates');
                  }
                }}
                className="rounded-xl border border-border bg-surface p-4 space-y-2 hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-page"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-ink">{tpl.title}</span>
                  <Sparkles size={13} className="text-emerald-600" aria-hidden="true" />
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">{tpl.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tpl.tags.map((tag, i) => (
                    <span key={i} className="rounded bg-surface-soft px-2 py-0.5 text-[10px] font-medium text-ink-soft">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <div className="mt-14 pt-8 border-t border-border">
          <ProductCTARow />
        </div>
      </div>
    </div>
  );
}
