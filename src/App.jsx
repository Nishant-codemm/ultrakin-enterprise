import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import TrustStrip from './sections/TrustStrip';
import WorkflowSpotlight from './sections/WorkflowSpotlight';
import BentoGrid from './sections/BentoGrid';
import IntegrationsSection from './sections/IntegrationsSection';
import SecuritySection from './sections/SecuritySection';
import EvaluationSection from './sections/EvaluationSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import EnterpriseDemoDrawer from './components/showcase/EnterpriseDemoDrawer';
import CommandPaletteModal from './components/CommandPaletteModal';
import KeyboardShortcutsModal from './components/KeyboardShortcutsModal';
import { WorkspaceProvider } from './context/WorkspaceContext';

const STORY_THREAD_PATH = 'M1.25 0 C1.25 330 2 670 1.7 1000';

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

const ROUTE_PAGES = {
  '/pricing':   lazy(() => import('./pages/PricingPage')),
  '/workspace': lazy(() => import('./pages/WorkspacePage')),
  '/agents':    lazy(() => import('./pages/AgentsPage')),
  '/security':  lazy(() => import('./pages/SecurityPage')),
  '/solutions': SolutionsOverviewPage,
  '/resources': ResourcesPage,
  '/products':  UniversalProductPage,
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
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/$/, '') || '/');
  const storyRef = useRef(null);
  const routePathRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const storyProgress = reduceMotion ? 0 : scrollYProgress;
  const threadX = useMotionValue('1.25%');
  const threadY = useMotionValue('0%');

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname.replace(/\/$/, '') || '/');
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'marketing';
  }, []);

  // Support both exact routes and /products/* and /solutions/* dynamic routes
  const RoutePage = ROUTE_PAGES[pathname] || 
    (pathname.startsWith('/products/') ? UniversalProductPage : 
    (pathname.startsWith('/solutions/') ? UniversalSolutionPage : null));

  useEffect(() => {
    const metadata = PAGE_METADATA[pathname] || PAGE_METADATA['/'];
    const canonicalUrl = `https://ultrakin.com${pathname === '/' ? '/' : pathname}`;
    document.title = metadata.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description);
  }, [pathname]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const path = routePathRef.current;
    if (!path || reduceMotion) return;
    const point = path.getPointAtLength(path.getTotalLength() * progress);
    threadX.set(`${point.x}%`);
    threadY.set(`${point.y / 10}%`);
  });

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
            <Suspense fallback={<div className="min-h-screen" aria-busy="true"><span className="sr-only" role="status">Loading page…</span></div>}>
              <RoutePage />
            </Suspense>
          </main>
        ) : <main ref={storyRef} id="main_content" tabIndex={-1} className="relative isolate overflow-hidden bg-page">
          {/* Ambient atmospheric depth layers */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_34rem_at_50%_-8rem,rgba(49,86,207,.035),transparent_76%),radial-gradient(ellipse_42%_34rem_at_92%_38%,rgba(169,155,132,.085),transparent_72%),radial-gradient(ellipse_44%_30rem_at_8%_72%,rgba(49,86,207,.02),transparent_74%)]" />
          </div>

          {/* Main Page Content Layers */}
          <div className="relative z-10">
            <HeroSection />
            <TrustStrip />
            <WorkflowSpotlight />
            <BentoGrid />
            <IntegrationsSection />
            <SecuritySection />
            <EvaluationSection />
            <FAQSection />
            <CTASection />
          </div>

          {/* ── Continuous Luminous Story Thread & Traveling Photon Node (Floats gracefully behind cards at z-0) ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            {/* Desktop Continuous Story Thread — Delicate Luminous Ray */}
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="ultrakin-story-thread" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.08" />
                  <stop offset="25%" stopColor="#6366f1" stopOpacity="0.16" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.12" />
                  <stop offset="75%" stopColor="#6366f1" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.08" />
                </linearGradient>
                <linearGradient id="ultrakin-thread-active" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="#6366f1" stopOpacity="0.6" />
                  <stop offset="75%" stopColor="#818cf8" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#c7d2fe" stopOpacity="0.85" />
                </linearGradient>
                <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base guide track — delicate, ultra-thin optical filament (0.65px) */}
              <path
                ref={routePathRef}
                d={STORY_THREAD_PATH}
                fill="none"
                stroke="url(#ultrakin-story-thread)"
                strokeWidth="0.7"
                vectorEffect="non-scaling-stroke"
              />

              {/* Active scroll progression light ray — ultra-thin (0.75px) */}
              <motion.path
                d={STORY_THREAD_PATH}
                fill="none"
                stroke="url(#ultrakin-thread-active)"
                strokeWidth="0.7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#thread-glow)"
                pathLength={storyProgress}
              />
            </svg>

            {/* Traveling Luminous Pearl Photon Bead — refined 2px pearl node */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                style={{ left: threadX, top: threadY }}
                className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none"
              >
                {/* Subtle soft luminous aura */}
                <span className="absolute h-4 w-4 rounded-full bg-indigo-400/15 blur-[1.5px]" />
                {/* Pearl white photon bead matching reference screenshot */}
                <span className="relative h-2 w-2 rounded-full bg-white ring-1 ring-white/80 shadow-[0_0_6px_rgba(255,255,255,0.9),0_0_10px_rgba(99,102,241,0.4)]" />
              </motion.div>
            )}

          </div>
        </main>}
        <div className="relative z-10 bg-transparent"><Footer isHome={pathname === '/'} /></div>
        <EnterpriseDemoDrawer />
        <CommandPaletteModal />
        <KeyboardShortcutsModal />
      </div>
      </MotionConfig>
    </WorkspaceProvider>
  );
}
