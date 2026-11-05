/**
 * ProductPage.jsx
 * Universal shell for all /products/<slug> pages.
 * Reads slug from pathname, loads the correct demo + metadata.
 */
import React, { lazy, Suspense, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { createShellVariants } from '../lib/motion';
import {
  Mail,
  MessageSquare,
  Video,
  FileText,
  CheckSquare,
  Layers,
  Workflow,
  Bot,
  FolderOpen,
  Sparkles,
  Search,
} from 'lucide-react';
import { PRODUCT_META } from '../data/productPageData';
import ProductBreadcrumb from '../components/product/ProductBreadcrumb';
import ProductCTARow from '../components/product/ProductCTARow';
import ProductFeatureGrid from '../components/product/ProductFeatureGrid';
import DemoWindowFrame from '../components/product/DemoWindowFrame';

const PRODUCT_ICONS = {
  chat: MessageSquare,
  calls: Video,
  mail: Mail,
  docs: FileText,
  lists: CheckSquare,
  events: Layers,
  forms: CheckSquare,
  automations: Workflow,
  agents: Bot,
  connectors: FolderOpen,
  templates: Layers,
  ukin: Sparkles,
  search: Search,
};

const MailAgentShowcaseCard = lazy(() => import('./products/MailAgentShowcaseCard'));

// ─── Lazy-load all demo components ───────────────────────────────────────────
const DEMO_MAP = {
  chat:        lazy(() => import('./products/ChatProductDemo')),
  calls:       lazy(() => import('./products/CallsProductDemo')),
  mail:        lazy(() => import('./products/MailProductDemo')),
  docs:        lazy(() => import('./products/DocsProductDemo')),
  lists:       lazy(() => import('./products/ListsProductDemo')),
  events:      lazy(() => import('./products/EventsProductDemo')),
  forms:       lazy(() => import('./products/FormsProductDemo')),
  automations: lazy(() => import('./products/AutomationsProductDemo')),
  agents:      lazy(() => import('./products/AgentsProductDemo')),
  connectors:  lazy(() => import('./products/ConnectorsProductDemo')),
  templates:   lazy(() => import('./products/TemplatesProductDemo')),
  ukin:        lazy(() => import('./products/UkinProductDemo')),
  search:      lazy(() => import('./products/SearchProductDemo')),
};

// ─── Demo Skeleton ────────────────────────────────────────────────────────────
function DemoSkeleton() {
  return (
    <div className="h-full w-full animate-pulse">
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
          {i === lines.length - 1
            ? <span style={{ color: accentColor || '#111827' }}>{line}</span>
            : line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h1>
  );
}

// ─── Main ProductPage ─────────────────────────────────────────────────────────
export default function ProductPage() {
  const reduceMotion = useReducedMotion();
  const rawSlug = window.location.pathname.replace('/products/', '').replace('/products', '').replace(/\/$/, '');
  const slug = rawSlug || 'chat';
  const meta = PRODUCT_META[slug];

  // Update page title
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
          <p className="text-[#667085] text-sm">Product page not found.</p>
          <a href="/" className="mt-4 inline-block text-sm text-[#3156cf] hover:underline">← Back to home</a>
        </div>
      </div>
    );
  }

  const Demo = DEMO_MAP[slug];

  const { containerVariants, leftVariants, rightVariants } = createShellVariants(reduceMotion);

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
            <ProductBreadcrumb
              productName={meta.name}
              productColor={meta.color}
              icon={PRODUCT_ICONS[slug]}
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

            {/* Right: demo widget */}
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

              {/* Floating product badge */}
              <div
                className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full border border-[#e7e4de] bg-white px-3 py-1.5 shadow-md"
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{ backgroundColor: meta.color }}
                />
                <span className="text-[11px] font-semibold text-[#374151]">{meta.name}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Secondary Stacked Showcase Card for Mail */}
      {slug === 'mail' && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-4">
          <Suspense fallback={<div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />}>
            <MailAgentShowcaseCard />
          </Suspense>
        </section>
      )}

      {/* Feature grid */}
      <ProductFeatureGrid features={meta.features} productColor={meta.color} />
    </div>
  );
}
