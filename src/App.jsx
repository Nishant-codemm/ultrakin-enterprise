import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
};

const ROUTE_PAGES = {
  '/pricing': lazy(() => import('./pages/PricingPage')),
  '/workspace': lazy(() => import('./pages/WorkspacePage')),
  '/agents': lazy(() => import('./pages/AgentsPage')),
  '/security': lazy(() => import('./pages/SecurityPage')),
};

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname.replace(/\/$/, '') || '/');
  const storyRef = useRef(null);
  const routePathRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const storyProgress = reduceMotion ? 0 : scrollYProgress;
  const threadX = useMotionValue('96%');
  const threadY = useMotionValue('0%');
  const mobileThreadY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname.replace(/\/$/, '') || '/');
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'marketing';
  }, []);

  const RoutePage = ROUTE_PAGES[pathname];

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
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_34rem_at_50%_-8rem,rgba(49,86,207,.035),transparent_76%),radial-gradient(ellipse_42%_34rem_at_92%_38%,rgba(169,155,132,.085),transparent_72%),radial-gradient(ellipse_44%_30rem_at_8%_72%,rgba(49,86,207,.02),transparent_74%)]" />

            {/* ── Desktop Continuous Story Thread (Calibrated for Light Theme) ── */}
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute inset-0 hidden h-full w-full md:block">
              <defs>
                <linearGradient id="ultrakin-story-thread" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3156cf" stopOpacity="0.32" />
                  <stop offset="25%" stopColor="#6366f1" stopOpacity="0.52" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.46" />
                  <stop offset="75%" stopColor="#818cf8" stopOpacity="0.52" />
                  <stop offset="100%" stopColor="#3156cf" stopOpacity="0.36" />
                </linearGradient>
                <linearGradient id="ultrakin-thread-active" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="35%" stopColor="#3156cf" />
                  <stop offset="70%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <filter id="thread-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Base guide track */}
              <path
                ref={routePathRef}
                d="M96 0 C96 50 97 72 84 90 C68 111 15 112 8 143 C1 176 40 184 59 200 C80 217 97 233 93 263 C87 299 31 300 8 326 C-10 348 10 383 39 393 C74 406 99 423 91 460 C82 497 29 504 8 537 C-11 568 11 598 42 609 C75 622 96 646 90 679 C82 720 34 725 11 754 C-11 782 10 819 48 831 C83 842 99 872 82 902 C69 927 55 945 52 1000"
                fill="none"
                stroke="url(#ultrakin-story-thread)"
                strokeWidth="1.85"
                vectorEffect="non-scaling-stroke"
              />

              {/* Active scroll progression line */}
              <motion.path
                d="M96 0 C96 50 97 72 84 90 C68 111 15 112 8 143 C1 176 40 184 59 200 C80 217 97 233 93 263 C87 299 31 300 8 326 C-10 348 10 383 39 393 C74 406 99 423 91 460 C82 497 29 504 8 537 C-11 568 11 598 42 609 C75 622 96 646 90 679 C82 720 34 725 11 754 C-11 782 10 819 48 831 C83 842 99 872 82 902 C69 927 55 945 52 1000"
                fill="none"
                stroke="url(#ultrakin-thread-active)"
                strokeWidth="2.75"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#thread-glow)"
                pathLength={storyProgress}
              />
            </svg>

            {/* Traveling Sapphire Kinetic Node with Radar Ping */}
            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                style={{ left: threadX, top: threadY }}
                className="absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex pointer-events-none"
              >
                <span className="absolute h-8 w-8 animate-ping rounded-full bg-blue-500/40" />
                <span className="absolute h-6 w-6 rounded-full bg-blue-400/25 blur-[2px]" />
                <span className="relative h-3.5 w-3.5 rounded-full bg-blue-600 ring-2 ring-white shadow-[0_0_16px_rgba(37,99,235,1),0_2px_8px_rgba(0,0,0,0.22)]" />
              </motion.div>
            )}

            {/* ── Mobile Story Thread ── */}
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-80 md:hidden">
              <path
                d="M3 0 C3 90 3 130 3 180 S3 290 3 350 S3 460 3 520 S3 630 3 700 S3 820 3 900 S3 960 3 1000"
                fill="none"
                stroke="#3156cf"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M3 0 C3 90 3 130 3 180 S3 290 3 350 S3 460 3 520 S3 630 3 700 S3 820 3 900 S3 960 3 1000"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.2"
                vectorEffect="non-scaling-stroke"
                pathLength={storyProgress}
              />
            </svg>

            {!reduceMotion && (
              <motion.div
                aria-hidden="true"
                style={{ left: '3%', top: mobileThreadY }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center md:hidden pointer-events-none"
              >
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-blue-500 opacity-40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-blue-600 ring-2 ring-white shadow-[0_0_12px_rgba(37,99,235,0.9)]" />
              </motion.div>
            )}
          </div>
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
        </main>}
        <div className="relative z-10 bg-transparent"><Footer isHome={pathname !== '/pricing' && pathname !== '/workspace' && pathname !== '/agents' && pathname !== '/security'} /></div>
        <EnterpriseDemoDrawer />
        <CommandPaletteModal />
        <KeyboardShortcutsModal />
      </div>
      </MotionConfig>
    </WorkspaceProvider>
  );
}
