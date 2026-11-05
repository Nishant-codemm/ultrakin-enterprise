/**
 * SolutionsOverviewPage.jsx
 * Hub page for /solutions ("See all solutions")
 * Displays all 11 solutions organized by Team and Industry,
 * plus the quick-start templates showcase.
 */
import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  const reduceMotion = useReducedMotion();

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
        <nav className="mb-6 flex items-center gap-2 text-[13px] text-[#667085]">
          <button
            onClick={() => navigate('/')}
            className="hover:text-[#111827] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight size={12} className="text-[#d0cdc7]" />
          <span className="font-medium text-[#111827]">Solutions</span>
        </nav>

        {/* Header */}
        <div className="max-w-3xl mb-14">
          <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3156cf]">
            SOLUTIONS · WORKSPACE OS
          </p>
          <h1 className="font-display text-[clamp(2.4rem,4.5vw,3.8rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#111827]">
            Workflows engineered for your <span className="text-[#3156cf]">team and industry.</span>
          </h1>
          <p className="mt-5 text-[1.05rem] leading-[1.7] text-[#667085]">
            From incident triage to student classrooms and sales proposals, explore how teams eliminate tool fragmentation and move from signals to outcomes in one workspace.
          </p>
        </div>

        {/* Section 1: By Team */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9ca3af]">01</span>
            <h2 className="text-xl font-semibold text-[#111827]">By Team Function</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamSolutions.map((sol) => {
              const Icon = SOLUTION_ICONS[sol.slug] || Workflow;
              return (
                <div
                  key={sol.slug}
                  onClick={() => navigate(`/solutions/${sol.slug}`)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#e5e2dc] bg-white p-6 shadow-xs hover:border-[#3156cf]/40 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-2xs"
                        style={{ backgroundColor: sol.color }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9ca3af] group-hover:text-[#3156cf] transition-colors">
                        Explore →
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#3156cf] transition-colors">
                      {sol.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#667085]">
                      {sol.sub}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f0ede8] flex items-center justify-between text-[11px] text-[#4b5563]">
                    <span className="font-medium">{sol.badgeText}</span>
                    <span className="flex items-center gap-1 text-[#3156cf] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View workflow</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 2: By Industry */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#9ca3af]">02</span>
            <h2 className="text-xl font-semibold text-[#111827]">By Industry Vertical</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industrySolutions.map((sol) => {
              const Icon = SOLUTION_ICONS[sol.slug] || Workflow;
              return (
                <div
                  key={sol.slug}
                  onClick={() => navigate(`/solutions/${sol.slug}`)}
                  className="group relative flex flex-col justify-between rounded-2xl border border-[#e5e2dc] bg-white p-6 shadow-xs hover:border-[#3156cf]/40 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-2xs"
                        style={{ backgroundColor: sol.color }}
                      >
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9ca3af] group-hover:text-[#3156cf] transition-colors">
                        Explore →
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#3156cf] transition-colors">
                      {sol.name}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#667085]">
                      {sol.sub}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#f0ede8] flex items-center justify-between text-[11px] text-[#4b5563]">
                    <span className="font-medium">{sol.badgeText}</span>
                    <span className="flex items-center gap-1 text-[#3156cf] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View workflow</span>
                      <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Ready-to-Deploy Templates Strip */}
        <section className="rounded-2xl border border-[#e5e2dc] bg-[#faf9f7] p-8 shadow-xs">
          <div className="max-w-xl mb-6">
            <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#059669]">
              READY-TO-USE WORKSPACE BLUEPRINTS
            </p>
            <h2 className="text-xl font-bold text-[#111827] mt-1">Start from proven templates.</h2>
            <p className="text-xs text-[#667085] mt-1">
              Deploy pre-configured automations, channels, and records in one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SOLUTION_TEMPLATES_ASIDE.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => navigate('/products/templates')}
                className="rounded-xl border border-[#e5e2dc] bg-white p-4 space-y-2 hover:border-[#059669] hover:shadow-xs transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[#111827]">{tpl.title}</span>
                  <Sparkles size={13} className="text-[#059669]" />
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">{tpl.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tpl.tags.map((tag, i) => (
                    <span key={i} className="rounded bg-[#f0ede8] px-2 py-0.5 text-[10px] font-medium text-[#4b5563]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
