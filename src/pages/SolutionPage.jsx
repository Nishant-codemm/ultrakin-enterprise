/**
 * SolutionPage.jsx
 * Universal shell for all /solutions/<slug> pages.
 * Reads slug from pathname, loads the correct solution demo + metadata.
 */
import React, { lazy, Suspense, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { createShellVariants } from '../lib/motion';
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
const SalesAgentShowcaseCard = lazy(() => import('./solutions/SalesAgentShowcaseCard'));
const EngineeringAgentShowcaseCard = lazy(() => import('./solutions/EngineeringAgentShowcaseCard'));

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

const SOLUTION_CASE_STORIES = {
  'customer-support': {
    eyebrow: 'ONE SUPPORT REQUEST · SR-31',
    title: 'From a double charge to a reviewed reply.',
    summary: 'The customer email, team context, and next response stay together while a person remains responsible for sending it.',
    entries: [
      { source: 'MAIL · 9:14 AM', title: 'J. Ortiz reports two $120 charges on order #4821.' },
      { source: 'SUPPORT SPACE · 9:27 AM', title: 'Dana checks the order against the refund guidance before replying.' },
      { source: 'REPLY · NEEDS REVIEW', title: 'A draft is ready for Dana to review. It has not been sent.' },
    ],
    footer: 'Source · support@northwind.shop',
    owner: 'Dana Lee',
    status: 'Needs review',
    statusTone: 'bg-amber-500',
  },
  sales: {
    eyebrow: 'OPPORTUNITY · MERIDIAN SYSTEMS',
    title: 'Keep the next customer step with the deal.',
    summary: 'The reviewed proposal, current stage, and customer follow-up stay visible to the person carrying the opportunity.',
    entries: [
      { source: 'PROPOSAL · V3.2', title: 'The team has reviewed the current proposal for Meridian Systems.' },
      { source: 'WORKING PLAN · DEAL ROOM', title: 'Milestones and open requirements stay alongside the opportunity.' },
      { source: 'OWNER · MARCUS VANCE', title: 'Marcus carries the customer follow-up and current deal context.' },
      { source: 'NEXT STEP · CUSTOMER REVIEW', title: 'The deal stays in Proposal until the next step is agreed.' },
    ],
    footer: 'Illustrative opportunity · sample data',
    owner: 'Marcus Vance',
    status: 'Proposal',
    statusTone: 'bg-slate-400',
  },
  engineering: {
    eyebrow: 'INCIDENT · AUTH LATENCY',
    title: 'Keep the incident context after the huddle ends.',
    summary: 'The team can carry a production issue from discussion into documented decisions and owned follow-up.',
    entries: [
      { source: 'CHAT · INCIDENT ROOM', title: 'The team flags rising latency in the authentication service.' },
      { source: 'HUDDLE · REVIEW', title: 'Engineers compare symptoms and agree what to investigate next.' },
      { source: 'DOCS · INCIDENT NOTES', title: 'The suspected cause and remediation notes stay with the discussion.' },
      { source: 'TASK · FOLLOW-UP', title: 'A named owner tracks the next action from the same incident context.' },
    ],
    footer: 'Illustrative incident · sample data',
    owner: 'Devin Zhao',
    status: 'In progress',
    statusTone: 'bg-[#3156cf]',
  },
  operations: {
    eyebrow: 'PROCUREMENT · PR-204',
    title: 'Make the approval handoff easy to follow.',
    summary: 'A request, its supporting details, and the decision owner remain together until the next step is clear.',
    entries: [
      { source: 'REQUEST · PR-204', title: 'Devin submits a server fleet expansion request for $12,400.' },
      { source: 'CONTEXT · Q4 CAPEX', title: 'The request and its budget details are available to the reviewer.' },
      { source: 'REVIEW · SARAH JENKINS', title: 'The approval is waiting on Sarah; the decision has not been recorded.' },
      { source: 'NEXT STEP · TRACKED', title: 'The request stays visible with its owner and current approval status.' },
    ],
    footer: 'Illustrative request · sample data',
    owner: 'Sarah Jenkins',
    status: 'Awaiting review',
    statusTone: 'bg-amber-500',
  },
  marketing: {
    eyebrow: 'LAUNCH BRIEF · Q3 RELEASE',
    title: 'Keep launch review beside the brief.',
    summary: 'Positioning, reviewer feedback, and launch milestones stay together as the team gets ready to publish.',
    entries: [
      { source: 'DOCS · POSITIONING', title: 'The launch brief holds the product story and its key messages.' },
      { source: 'LEGAL · REVIEWED', title: 'Legal feedback stays beside the material it applies to.' },
      { source: 'PRODUCT · DANA LEE', title: 'Product sign-off is still pending on the current draft.' },
      { source: 'MILESTONES · LAUNCH', title: 'The team can see which launch items are ready and which are scheduled.' },
    ],
    footer: 'Illustrative launch brief · sample data',
    owner: 'Chloe Martin',
    status: 'Product sign-off pending',
    statusTone: 'bg-amber-500',
  },
  people: {
    eyebrow: 'ONBOARDING · LUCAS RAY',
    title: 'Give a new teammate a clear first week.',
    summary: 'Setup work, the people helping, and the welcome plan are visible in one shared onboarding view.',
    entries: [
      { source: 'START · MONDAY', title: 'Lucas’s first-week plan starts with a shared onboarding checklist.' },
      { source: 'SETUP · 3 OF 4', title: 'Equipment, account setup, and buddy assignment are marked complete.' },
      { source: 'TEAM · MAYA CHEN', title: 'The welcome plan makes the buddy and team huddle easy to find.' },
      { source: 'NEXT · WELCOME HUDDLE', title: 'The checklist keeps the team’s remaining welcome step in view.' },
    ],
    footer: 'Illustrative onboarding · sample data',
    owner: 'Aisha Patel',
    status: '1 checklist item open',
    statusTone: 'bg-[#8b5cf6]',
  },
  agencies: {
    eyebrow: 'CLIENT PROJECT · VERVE',
    title: 'Keep client feedback with the scope it changes.',
    summary: 'A client request, the team’s scope decision, and the approval status remain together in the project space.',
    entries: [
      { source: 'CLIENT SPACE · 10:14 AM', title: 'Sarah asks for an additional packaging mockup for the launch.' },
      { source: 'SCOPE · JULIAN VANCE', title: 'Julian flags the request as outside the current project scope.' },
      { source: 'CHANGE ORDER · #12', title: 'The proposed change stays attached to the client conversation.' },
      { source: 'CLIENT REVIEW · PENDING', title: 'The team can see approval is still needed before planning the added work.' },
    ],
    footer: 'Illustrative client project · sample data',
    owner: 'Julian Vance',
    status: 'Awaiting client review',
    statusTone: 'bg-amber-500',
  },
  education: {
    eyebrow: 'CLASS · AP PHYSICS',
    title: 'Let the lesson carry on after class.',
    summary: 'The class room, live session, and recap stay connected so students can return to what was covered.',
    entries: [
      { source: 'EVENT · AP PHYSICS', title: 'The lesson has a scheduled event and a dedicated class space.' },
      { source: 'HUDDLE · DAVID CHEN', title: 'David teaches while students join the same class room.' },
      { source: 'RECORDING · RECAP', title: 'The recording and lesson notes are available after the session.' },
      { source: 'CLASS SPACE · MAYA CHEN', title: 'Student questions remain alongside the lesson discussion.' },
    ],
    footer: 'Illustrative class · sample data',
    owner: 'David Chen',
    status: 'Recap available',
    statusTone: 'bg-[#3156cf]',
  },
  ecommerce: {
    eyebrow: 'ORDER · #8821 · SIZE EXCHANGE',
    title: 'Keep the order question with the next step.',
    summary: 'The customer’s request stays beside the order and stock context, so the store team can prepare the exchange with the right details in view.',
    entries: [
      { source: 'EMAIL · MAYA CHEN', title: 'Maya asks to exchange the Merino Wool Crewneck from Medium to Large.' },
      { source: 'ORDER · #8821', title: 'The order shows the item, requested size, carrier, and return-policy status.' },
      { source: 'STOCK · NJ FULFILLMENT', title: 'The sample inventory view shows 14 units of Size L available.' },
      { source: 'NEXT STEP · RETURN LABEL', title: 'Generate the return label and hold the requested size from the same view.' },
    ],
    footer: 'Illustrative order · sample data',
    status: 'Awaiting action',
    statusTone: 'bg-amber-500',
  },
  'professional-services': {
    eyebrow: 'CLIENT MATTER · APEX M&A',
    title: 'Keep the client file and its access history together.',
    summary: 'The matter’s documents and the people reviewing them stay in view, giving the team a clear record of the work around a client file.',
    entries: [
      { source: 'CLIENT VAULT · APEX M&A', title: 'The matter’s financial disclosures and mutual NDA are available in the file view.' },
      { source: 'DOCUMENT · DISCLOSURES 2026', title: 'The sample record shows the file uploaded through the client portal.' },
      { source: 'ACCESS · ELEANOR STERLING', title: 'The ledger records the partner viewing the financial disclosures.' },
      { source: 'CLIENT UPDATE · SCHEDULE B', title: 'Marcus Vance has uploaded revisions for the team to review.' },
    ],
    footer: 'Illustrative client matter · sample data',
    owner: 'Eleanor Sterling',
    status: 'Review in progress',
    statusTone: 'bg-slate-400',
  },
  'field-services': {
    eyebrow: 'SERVICE JOB · #409 · 840 MARKET ST',
    title: 'Keep dispatch and the on-site work in sync.',
    summary: 'The dispatcher can follow the technician from assignment through arrival and closeout, while the mobile job view keeps the work order details close at hand.',
    entries: [
      { source: 'REQUEST · HVAC FAILURE', title: 'A commercial HVAC issue is tracked as Job #409 at 840 Market St.' },
      { source: 'DISPATCH · RAY KOWALSKI', title: 'Ray assigns the job to Sam Ortiz, who is shown en route.' },
      { source: 'FIELD · SAM ORTIZ', title: 'The job card carries the relay work order and service details to the technician.' },
      { source: 'CLOSEOUT · CUSTOMER SIGNOFF', title: 'After arrival and diagnosis, the demo can capture signoff and issue the invoice.' },
    ],
    footer: 'Illustrative service job · sample data',
    owner: 'Sam Ortiz',
    status: 'In route · 8m ETA',
    statusTone: 'bg-emerald-500',
  },
};

function SolutionCaseTrail({ story }) {
  return (
    <section className="mt-20 border-t border-[#e7e4de] py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
        <div className="max-w-sm">
          <p className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#667085]">
            {story.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-[#111827]">
            {story.title}
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#667085]">
            {story.summary}
          </p>
        </div>

        <ol className="border-y border-[#e7e4de]">
          {story.entries.map((entry) => (
            <li key={entry.source} className="relative grid gap-2 border-b border-[#e7e4de] py-5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-6">
              <p className="font-mono text-[10px] font-semibold tracking-[0.12em] text-[#667085]">
                {entry.source}
              </p>
              <p className="max-w-xl text-sm font-medium leading-6 text-[#111827]">
                {entry.title}
              </p>
            </li>
          ))}
          <li className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-[#e7e4de] py-4 text-xs">
            <span className="text-[#667085]">{story.footer}</span>
            {story.owner && <span className="text-[#475467]">Owner · <strong className="font-semibold text-[#111827]">{story.owner}</strong></span>}
            <span className="inline-flex items-center gap-2 text-[#475467]"><span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${story.statusTone}`} />{story.status}</span>
          </li>
        </ol>
      </div>
    </section>
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

      {/* Secondary Stacked Showcase Card for Sales */}
      {slug === 'sales' && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-2">
          <Suspense fallback={<div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />}>
            <SalesAgentShowcaseCard />
          </Suspense>
        </section>
      )}

      {/* Secondary Stacked Showcase Card for Engineering */}
      {slug === 'engineering' && (
        <section className="mx-auto max-w-7xl px-5 lg:px-8 mt-2">
          <Suspense fallback={<div className="h-24 bg-slate-100 rounded-2xl animate-pulse" />}>
            <EngineeringAgentShowcaseCard />
          </Suspense>
        </section>
      )}

      {SOLUTION_CASE_STORIES[slug] ? (
        <SolutionCaseTrail story={SOLUTION_CASE_STORIES[slug]} />
      ) : (
        <ProductFeatureGrid
          features={meta.features}
          productColor={meta.color}
        />
      )}
    </div>
  );
}
