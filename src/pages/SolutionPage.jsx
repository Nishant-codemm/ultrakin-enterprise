/**
 * SolutionPage.jsx
 * Universal shell for all /solutions/<slug> pages.
 * Reads slug from pathname, loads the correct solution demo + metadata.
 */
import React, { lazy, Suspense, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
} from 'lucide-react';
import { SOLUTION_META } from '../data/solutionPageData';
import SolutionBreadcrumb from '../components/solution/SolutionBreadcrumb';
import ProductCTARow from '../components/product/ProductCTARow';
import ProductFeatureGrid from '../components/product/ProductFeatureGrid';
import DemoWindowFrame from '../components/product/DemoWindowFrame';

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

// ─── Lazy-load all 11 solution demo components ──────────────────────────────
const SupportAgentShowcaseCard = lazy(() => import('./solutions/SupportAgentShowcaseCard'));

const DEMO_MAP = {
  'customer-support': lazy(() => import('./solutions/CustomerSupportSolutionDemo')),
  sales: lazy(() => import('./solutions/SalesSolutionDemo')),
  engineering: lazy(() => import('./solutions/EngineeringSolutionDemo')),
  operations: lazy(() => import('./solutions/OperationsSolutionDemo')),
  marketing: lazy(() => import('./solutions/MarketingSolutionDemo')),
  people: lazy(() => import('./solutions/PeopleSolutionDemo')),
  agencies: lazy(() => import('./solutions/AgenciesSolutionDemo')),
  education: lazy(() => import('./solutions/EducationSolutionDemo')),
  ecommerce: lazy(() => import('./solutions/EcommerceSolutionDemo')),
  'professional-services': lazy(() => import('./solutions/ProfessionalServicesSolutionDemo')),
  'field-services': lazy(() => import('./solutions/FieldServicesSolutionDemo')),
};

// ─── Demo Skeleton ────────────────────────────────────────────────────────────
function DemoSkeleton() {
  return (
    <div className="h-full w-full animate-pulse bg-white">
      <div className="h-10 bg-[#f0ede8] mb-0" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#f0ede8] rounded-full w-3/4" />
        <div className="h-4 bg-[#f0ede8] rounded-full w-1/2" />
        <div className="h-4 bg-[#f0ede8] rounded-full w-5/6" />
        <div className="mt-6 h-4 bg-[#f0ede8] rounded-full w-2/3" />
        <div className="h-4 bg-[#f0ede8] rounded-full w-3/4" />
      </div>
    </div>
  );
}

// ─── Hero H1 with line breaks ─────────────────────────────────────────────────
function HeroH1({ lines = [], accentColor }) {
  return (
    <h1 className="font-display text-[clamp(2.1rem,4vw,3.4rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#111827]">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {i === lines.length - 1 ? (
            <span style={{ color: accentColor || '#111827' }}>{line}</span>
          ) : (
            line
          )}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h1>
  );
}

// ─── Main SolutionPage ────────────────────────────────────────────────────────
export default function SolutionPage() {
  const reduceMotion = useReducedMotion();
  const slug = window.location.pathname.replace('/solutions/', '').replace(/\/$/, '');
  const meta = SOLUTION_META[slug];

  // Update page title & meta
  useEffect(() => {
    if (meta) {
      document.title = meta.pageTitle;
      document.querySelector('meta[name="description"]')?.setAttribute('content', meta.pageDesc);
    }
  }, [meta]);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page">
        <div className="text-center">
          <p className="text-[#667085] text-sm">Solution page not found.</p>
          <a href="/solutions" className="mt-4 inline-block text-sm text-[#3156cf] hover:underline">
            ← View all solutions
          </a>
        </div>
      </div>
    );
  }

  const Demo = DEMO_MAP[slug];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: reduceMotion ? 0 : 20, y: reduceMotion ? 0 : 8 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="min-h-screen bg-page pt-20 pb-0">
      {/* Hero section */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pt-10 pb-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div variants={leftVariants}>
            <SolutionBreadcrumb
              solutionName={meta.name}
              solutionColor={meta.color}
              icon={SOLUTION_ICONS[slug]}
            />
          </motion.div>

          {/* Two-column hero */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left: copy */}
            <motion.div variants={leftVariants} className="max-w-lg">
              {/* Eyebrow */}
              <p
                className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: meta.color }}
              >
                {meta.eyebrow}
              </p>

              {/* H1 */}
              <HeroH1 lines={meta.h1Lines} accentColor={meta.color} />

              {/* Sub */}
              <p className="mt-5 text-[1rem] leading-[1.7] text-[#667085] max-w-[440px]">
                {meta.sub}
              </p>

              {/* CTAs */}
              <ProductCTARow accentColor={meta.color} />

              {/* Trust micro-strip */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                {['No credit card required', 'SOC 2 Type II', 'Free 14-day trial'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-[12px] text-[#9ca3af]">
                    <span
                      className="h-1 w-1 rounded-full"
                      style={{ backgroundColor: meta.color, opacity: 0.6 }}
                    />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right: interactive demo widget */}
            <motion.div variants={rightVariants} className="relative">
              {/* Subtle glow behind demo */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${meta.color}22, transparent 70%)` }}
              />
              <DemoWindowFrame
                height="h-[430px]"
                className="relative"
              >
                {Demo ? (
                  <Suspense fallback={<DemoSkeleton />}>
                    <Demo />
                  </Suspense>
                ) : (
                  <DemoSkeleton />
                )}
              </DemoWindowFrame>

              {/* Floating solution badge */}
              <div
                className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-[#e7e4de] bg-white px-3 py-1.5 shadow-md"
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[11px] font-semibold text-[#374151]">{meta.badgeText || meta.name}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Secondary Stacked Showcase Card for Customer Support */}
      {slug === 'customer-support' && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-2">
          <Suspense fallback={<div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />}>
            <SupportAgentShowcaseCard />
          </Suspense>
        </section>
      )}

      {/* Feature grid: "What gets in the way, and what changes" */}
      <ProductFeatureGrid features={meta.features} productColor={meta.color} />
    </div>
  );
}
