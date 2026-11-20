import React, { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import TrustStrip from './sections/TrustStrip';
import WorkflowSpotlight from './sections/WorkflowSpotlight';
import PlatformLensSection from './sections/PlatformLensSection';
import IntegrationsSection from './sections/IntegrationsSection';
import SecuritySection from './sections/SecuritySection';
import EvaluationSection from './sections/EvaluationSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import EnterpriseDemoDrawer from './components/showcase/EnterpriseDemoDrawer';
import CommandPaletteModal from './components/CommandPaletteModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import ErrorBoundary from './components/common/ErrorBoundary';
import { WorkspaceProvider } from './context/WorkspaceContext';

function ProductRouteSkeleton() {
  return (
    <div className="min-h-screen bg-page pt-20 pb-16 animate-pulse select-none" aria-busy="true">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 bg-slate-200/80 rounded-md" />
          <span className="text-slate-300">/</span>
          <div className="h-4 w-28 bg-slate-200/80 rounded-md" />
        </div>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="max-w-lg space-y-4">
            <div className="h-10 bg-slate-200/80 rounded-lg w-4/5" />
            <div className="h-10 bg-slate-200/80 rounded-lg w-3/5" />
            <div className="pt-2 space-y-2">
              <div className="h-4 bg-slate-200/60 rounded w-full" />
              <div className="h-4 bg-slate-200/60 rounded w-5/6" />
            </div>
            <div className="pt-4 flex items-center gap-3">
              <div className="h-11 w-32 bg-brand/20 rounded-xl" />
              <div className="h-11 w-28 bg-slate-200/70 rounded-xl" />
            </div>
          </div>
          <div className="h-[430px] rounded-2xl border border-slate-200/60 bg-white shadow-sm overflow-hidden flex flex-col">
            <div className="h-9 border-b border-slate-100 bg-slate-50/70 flex items-center px-3.5 gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <div className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <div className="flex-1 p-5 space-y-3">
              <div className="h-4 bg-slate-100 rounded-full w-3/4" />
              <div className="h-4 bg-slate-100 rounded-full w-1/2" />
              <div className="h-4 bg-slate-100 rounded-full w-5/6" />
              <div className="h-24 bg-slate-50 rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PAGE_METADATA = {
  '/': {
    title: 'Ultrakin — One workspace for fast teams',
    description: 'Bring chat, mail, meetings, docs, tasks, calendar, and Ukin agents into one connected workspace. Move work from signal to decision, action, and outcome.',
  },
  '/pricing': {
    title: 'Pricing — Ultrakin',
    description: 'Compare Ultrakin plans for small teams, growing organizations, and enterprise deployments.',
  },
  '/workspace': {
    title: 'Workspace — Ultrakin',
    description: 'Explore an interactive Ultrakin workspace with connected conversations, docs, files, huddles, agents, and tasks.',
  },
  '/agents': {
    title: 'AI Agents — Ultrakin',
    description: 'See how Ultrakin agents work across team context while keeping people in control of important actions.',
  },
  '/security': {
    title: 'Security — Ultrakin',
    description: 'Review Ultrakin security and trust information for privacy, access, infrastructure, and enterprise evaluation.',
  },
  '/solutions': {
    title: 'Solutions — Ultrakin',
    description: 'Explore Ultrakin solutions tailored for Customer Support, Sales, Engineering, Operations, Marketing, Education, Agencies, and more.',
  },
  '/resources': {
    title: 'Resources & Architecture — Ultrakin',
    description: 'Explore architectural whitepapers, operational playbooks, hands-on tutorials, and case studies for Ultrakin.',
  },
  '/privacy': {
    title: 'Privacy Policy — Ultrakin',
    description: 'Learn how Ultrakin protects your data, handles privacy, and adheres to GDPR and CCPA standards.',
  },
  '/terms': {
    title: 'Terms of Service — Ultrakin',
    description: 'Read the terms and conditions governing the use of Ultrakin enterprise workspaces and platforms.',
  },
  '/dpa': {
    title: 'Data Processing Agreement (DPA) — Ultrakin',
    description: 'Ultrakin Data Processing Addendum with standard contractual clauses and enterprise data commitments.',
  },
  '/subprocessors': {
    title: 'Authorized Subprocessors — Ultrakin',
    description: 'List of third-party infrastructure and sub-processors utilized across Ultrakin systems.',
  },
  '/soc2': {
    title: 'SOC 2 Type II Certification — Ultrakin',
    description: 'Ultrakin SOC 2 Type II compliance details, auditor evaluation criteria, and report access.',
  },
};

// Product page slugs
const PRODUCT_SLUGS = ['chat','calls','mail','docs','lists','events','forms',
                       'automations','agents','connectors','templates','ukin','search'];

const SOLUTION_SLUGS = [
  'customer-support', 'sales', 'engineering', 'operations', 'marketing', 'people',
  'agencies', 'education', 'ecommerce', 'professional-services', 'field-services'
];

const UniversalProductPage = lazy(() => import('./pages/ProductPage'));
const UniversalSolutionPage = lazy(() => import('./pages/SolutionPage'));
const SolutionsOverviewPage = lazy(() => import('./pages/SolutionsOverviewPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const ROUTE_PAGES = {
  '/pricing':       lazy(() => import('./pages/PricingPage')),
  '/workspace':     lazy(() => import('./pages/WorkspacePage')),
  '/agents':        UniversalProductPage,
  '/security':      lazy(() => import('./pages/SecurityPage')),
  '/privacy':       LegalPage,
  '/terms':         LegalPage,
  '/dpa':           LegalPage,
  '/subprocessors': LegalPage,
  '/soc2':          LegalPage,
  '/solutions':     SolutionsOverviewPage,
  '/resources':     ResourcesPage,
  '/products':      UniversalProductPage,
  '/products/tasks': UniversalProductPage,
  '/events':        UniversalProductPage,
  '/calendar':      UniversalProductPage,
  '/events/calendar': UniversalProductPage,
  ...Object.fromEntries(
    PRODUCT_SLUGS.map(slug => [
      `/products/${slug}`,
      UniversalProductPage,
    ])
  ),
  ...Object.fromEntries(
    SOLUTION_SLUGS.map(slug => [
      `/solutions/${slug}`,
      UniversalSolutionPage,
    ])
  ),
};

export default function App() {
  const [pathname, setPathname] = useState(() => {
    const raw = window.location.pathname.replace(/\/$/, '') || '/';
    return raw === '/products/tasks' ? '/products/lists' : raw;
  });

  useEffect(() => {
    // Normalization guard: redirect /products/tasks alias to canonical /products/lists
    if (window.location.pathname.replace(/\/$/, '') === '/products/tasks') {
      window.history.replaceState({}, '', '/products/lists');
    }

    const syncPathname = () => {
      const raw = window.location.pathname.replace(/\/$/, '') || '/';
      const resolved = raw === '/products/tasks' ? '/products/lists' : raw;
      if (raw === '/products/tasks') {
        window.history.replaceState({}, '', '/products/lists');
      }
      setPathname(resolved);
    };

    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'marketing';
  }, []);

  const isHome = pathname === '/';

  // Support exact routes, /products/*, /solutions/* dynamic routes, and explicit 404 fallback
  const RoutePage = ROUTE_PAGES[pathname] || 
    (pathname.startsWith('/products/') ? UniversalProductPage : 
    (pathname.startsWith('/solutions/') ? UniversalSolutionPage : (isHome ? null : NotFoundPage)));

  useEffect(() => {
    // Product and solution sub-pages own their own meta via their component useEffect.
    // Skip App-level meta updates for those routes to prevent homepage metadata overwriting
    // the per-page title/description set by ProductPage.jsx / SolutionPage.jsx.
    const isSubPage = pathname.startsWith('/products/') || pathname.startsWith('/solutions/');
    if (isSubPage) return;

    const isNotFound = !isHome && !ROUTE_PAGES[pathname] && !pathname.startsWith('/products/') && !pathname.startsWith('/solutions/');
    const metadata = isNotFound
      ? {
          title: 'Page Not Found — Ultrakin',
          description: 'The requested page could not be found.',
        }
      : (PAGE_METADATA[pathname] || PAGE_METADATA['/']);
    const canonicalUrl = `https://ultrakin-enterprise.vercel.app${pathname === '/' ? '/' : pathname}`;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [pathname, isHome]);

  return (
    <WorkspaceProvider>
      <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-page font-sans antialiased text-ink selection:bg-brand/15 selection:text-ink">
        <Navbar />
        <a
          href="#main_content"
          className="fixed left-4 top-3 z-[200] -translate-y-20 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-reduce:transition-none"
        >
          Skip to main content
        </a>
        {RoutePage ? (
          <main id="main_content" tabIndex={-1} className="min-h-screen">
            <ErrorBoundary name="Page">
              <Suspense
                fallback={
                  pathname.startsWith('/products/') || pathname === '/agents' ? (
                    <ProductRouteSkeleton />
                  ) : (
                    <div className="min-h-screen bg-page flex items-center justify-center" aria-busy="true">
                      <div className="flex items-center gap-2 text-ink-subtle text-xs font-mono">
                        <span className="h-2 w-2 rounded-full bg-brand animate-ping" />
                        <span>Loading workspace…</span>
                      </div>
                    </div>
                  )
                }
              >
                <RoutePage />
              </Suspense>
            </ErrorBoundary>
          </main>
        ) : (
          <main id="main_content" tabIndex={-1} className="relative isolate overflow-hidden bg-page">
            {/* Ambient atmospheric depth layers */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_34rem_at_50%_-8rem,rgba(49,86,207,.035),transparent_76%),radial-gradient(ellipse_42%_34rem_at_92%_38%,rgba(169,155,132,.085),transparent_72%),radial-gradient(ellipse_44%_30rem_at_8%_72%,rgba(49,86,207,.02),transparent_74%)]" />
            </div>

            {/* Main Page Content Layers */}
            <div className="relative z-10">
              <HeroSection />
              <TrustStrip />
              <WorkflowSpotlight />
              <PlatformLensSection />
              <IntegrationsSection />
              <SecuritySection />
              <EvaluationSection />
              <FAQSection />
              <CTASection />
            </div>
          </main>
        )}
        <div className="relative z-10 bg-transparent"><Footer isHome={pathname === '/'} /></div>
        <EnterpriseDemoDrawer />
        <CommandPaletteModal />
        <KeyboardShortcutsModal />
      </div>
      </MotionConfig>
    </WorkspaceProvider>
  );
}
