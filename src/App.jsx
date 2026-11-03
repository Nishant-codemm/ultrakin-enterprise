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

// Keep the same broad, organic page-wide sweep used by the original experience
// while the measured workspace anchors are being resolved.
const STORY_THREAD_FALLBACK = 'M96 0 C96 50 97 72 84 90 C68 111 15 112 8 143 C1 176 40 184 59 200 C80 217 97 233 93 263 C87 299 31 300 8 326 C4 350 8 380 18 405 C30 430 62 448 91 460 C82 497 29 504 8 537 C-11 568 11 598 42 609 C75 622 96 646 90 679 C82 720 34 725 11 754 C-11 782 10 819 48 831 C83 842 99 872 82 902 C69 927 55 945 52 1000';

// These anchors preserve the original page-thread's wide, unhurried curves.
// The path is reconnected to the measured Integrations spine between them.
const STORY_THREAD_APPROACH = [
  [96, 0], [96, 50], [97, 72], [84, 90], [68, 111], [15, 112], [8, 143],
  [1, 176], [40, 184], [59, 200], [80, 217], [97, 233], [93, 263],
  [87, 299], [31, 300], [8, 326],
];

const STORY_THREAD_DEPARTURE = [
  [91, 460], [82, 497], [29, 504], [8, 537], [-11, 568], [11, 598],
  [42, 609], [75, 622], [96, 646], [90, 679], [82, 720], [34, 725],
  [11, 754], [-11, 782], [10, 819], [48, 831], [83, 842], [99, 872],
  [82, 902], [69, 927], [55, 945], [52, 1000],
];

function splineThrough(points) {
  if (points.length < 2) return STORY_THREAD_FALLBACK;
  return points.reduce((path, point, index) => {
    if (index === 0) return `M${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    const previous = points[index - 1];
    const beforePrevious = points[Math.max(0, index - 2)];
    const next = points[Math.min(points.length - 1, index + 1)];
    const c1x = previous.x + (point.x - beforePrevious.x) / 6;
    const c1y = previous.y + (point.y - beforePrevious.y) / 6;
    const c2x = point.x - (next.x - previous.x) / 6;
    const c2y = point.y - (next.y - previous.y) / 6;
    return `${path} C${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, '');
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
  const storySvgRef = useRef(null);
  const routePathRef = useRef(null);
  const [storyThreadPath, setStoryThreadPath] = useState(STORY_THREAD_FALLBACK);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] });
  const storyProgress = reduceMotion ? 0 : scrollYProgress;
  const threadX = useMotionValue('96%');
  const threadY = useMotionValue('0%');

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname.replace(/\/$/, '') || '/');
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = 'marketing';
  }, []);

  useEffect(() => {
    const page = storyRef.current;
    const storySvg = storySvgRef.current;
    if (!page || !storySvg) return undefined;

    const updateStoryRoute = () => {
      const integrationSpine = page.querySelector('[data-workline-anchor="integration-spine"]');
      const integrationSvg = integrationSpine?.ownerSVGElement;
      const inverseStoryMatrix = storySvg.getScreenCTM()?.inverse();
      const spineMatrix = integrationSpine?.getScreenCTM();
      const graphRect = integrationSvg?.getBoundingClientRect();

      if (!integrationSpine || !inverseStoryMatrix || !spineMatrix || !graphRect?.width || graphRect.width < 240) {
        setStoryThreadPath(STORY_THREAD_FALLBACK);
        return;
      }

      const length = integrationSpine.getTotalLength();
      // Track the illustration's native spline closely enough that the page
      // thread reads as the same cable at both room boundaries.
      const sampleCount = 144;
      const tangentScale = sampleCount / 36;
      const toStoryPoint = (point) => {
        const screenPoint = new DOMPoint(point.x, point.y).matrixTransform(spineMatrix);
        const storyPoint = screenPoint.matrixTransform(inverseStoryMatrix);
        return { x: storyPoint.x, y: storyPoint.y };
      };
      const firstAnchor = toStoryPoint(integrationSpine.getPointAtLength(0));
      const pageRect = page.getBoundingClientRect();
      const firstSpinePoint = toStoryPoint(integrationSpine.getPointAtLength(length / sampleCount));
      const entryTangent = {
        x: firstSpinePoint.x - firstAnchor.x,
        y: firstSpinePoint.y - firstAnchor.y,
      };
      const approachEndY = Math.max(24, firstAnchor.y - Math.max(58, firstAnchor.y * 0.13));
      const approachScale = approachEndY / STORY_THREAD_APPROACH[STORY_THREAD_APPROACH.length - 1][1];
      const points = STORY_THREAD_APPROACH.map(([x, y]) => ({
        x: Math.min(96, Math.max(4, x)),
        y: y * approachScale,
      }));
      const approachLead = {
        x: Math.min(96, Math.max(4, firstAnchor.x - entryTangent.x * 8 * tangentScale)),
        y: Math.max(0, firstAnchor.y - entryTangent.y * 8 * tangentScale),
      };
      const approachCarry = {
        x: firstAnchor.x - entryTangent.x,
        y: firstAnchor.y - entryTangent.y,
      };
      points.push(approachLead, approachCarry, firstAnchor);

      for (let index = 1; index <= sampleCount; index += 1) {
        const point = integrationSpine.getPointAtLength(length * index / sampleCount);
        points.push(toStoryPoint(point));
      }

      const lastAnchor = points[points.length - 1];
      const integrationSection = page.querySelector('#integrations');
      const sectionRect = integrationSection?.getBoundingClientRect();
      const sectionBottom = sectionRect
        ? (sectionRect.bottom - pageRect.top) * 1000 / pageRect.height
        : lastAnchor.y + 180;
      const previousSpinePoint = points[points.length - 2];
      const tangentX = lastAnchor.x - previousSpinePoint.x;
      const tangentY = lastAnchor.y - previousSpinePoint.y;
      const exitCarry = {
        x: lastAnchor.x + tangentX,
        y: lastAnchor.y + tangentY,
      };
      const exitLead = {
        x: lastAnchor.x + tangentX * 3 * tangentScale,
        y: lastAnchor.y + tangentY * 3 * tangentScale,
      };
      const exitTransition = {
        x: lastAnchor.x + tangentX * 6 * tangentScale,
        y: lastAnchor.y + tangentY * 6 * tangentScale,
      };
      const tailStartY = Math.min(965, Math.max(
        exitTransition.y + 36,
        exitTransition.y + (1000 - exitTransition.y) * 0.1,
        sectionBottom + 28,
      ));
      const tailSpan = Math.max(1, 1000 - tailStartY);
      const departure = STORY_THREAD_DEPARTURE.map(([x, y]) => ({
        x: Math.min(96, Math.max(4, x)),
        y: tailStartY + ((y - 460) / (1000 - 460)) * tailSpan,
      }));
      points.push(exitCarry, exitLead, exitTransition, ...departure);

      setStoryThreadPath(splineThrough(points));
    };

    updateStoryRoute();
    const observer = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(updateStoryRoute)
      : null;
    observer?.observe(page);
    const integrations = page.querySelector('#integrations');
    const graph = integrations?.querySelector('[data-workline-anchor="integration-spine"]')?.ownerSVGElement;
    if (integrations) observer?.observe(integrations);
    if (graph) observer?.observe(graph);
    window.addEventListener('resize', updateStoryRoute, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', updateStoryRoute);
    };
  }, [pathname]);

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
            <svg ref={storySvgRef} viewBox="0 0 100 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="ultrakin-story-thread" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" stopOpacity="0.16" />
                  <stop offset="25%" stopColor="#6366f1" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#818cf8" stopOpacity="0.26" />
                  <stop offset="75%" stopColor="#6366f1" stopOpacity="0.34" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.18" />
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
                d={storyThreadPath}
                fill="none"
                stroke="url(#ultrakin-story-thread)"
                strokeWidth="1.15"
                vectorEffect="non-scaling-stroke"
              />

              {/* Active scroll progression light ray — ultra-thin (0.75px) */}
              <motion.path
                d={storyThreadPath}
                fill="none"
                stroke="url(#ultrakin-thread-active)"
                strokeWidth="1.25"
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
