import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  Bot,
  CheckSquare,
  ChevronDown,
  FileText,
  FolderOpen,
  Headphones,
  HelpCircle,
  Layers,
  Mail,
  MessageSquare,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Workflow,
  X,
  Menu,
} from 'lucide-react';
import UltrakinLogo from './primitives/UltrakinLogo';
import Button from './primitives/Button';
import { useWorkspace } from '../context/useWorkspace';

const APP_URL = 'https://app.ultrakin.com';

function UltrakinIcon({ size = 18 }) {
  return <UltrakinLogo size={size} className="shrink-0" />;
}

const productGroups = [
  {
    label: 'Everyday work',
    items: [
      { title: 'Chat', description: 'Real-time discussions with context built in.', icon: MessageSquare, module: 'chat' },
      { title: 'Threads', description: 'Carry decisions forward, not just loose messages.', icon: MessagesSquare, module: 'threads' },
      { title: 'Mail', description: 'Bring customer inboxes directly into the flow.', icon: Mail, module: 'mail' },
      { title: 'Huddles', description: 'Turn audio/video meetings into live action items.', icon: Video, module: 'huddle' },
    ],
  },
  {
    label: 'Shared context',
    items: [
      { title: 'Docs', description: 'Living specs, meeting notes, and decision logs.', icon: FileText, module: 'docs' },
      { title: 'Files', description: 'Instant artifact preview linked to project threads.', icon: FolderOpen, module: 'files' },
      { title: 'Tasks', description: 'Kanban boards and sprints with clear owners.', icon: CheckSquare, module: 'tasks' },
      { title: 'Ukin agents', description: 'Autonomous agents that automate routine follow-through.', icon: Bot, module: 'automations' },
    ],
  },
];

const solutionGroups = [
  {
    label: 'By Team Function',
    items: [
      { title: 'Product & Engineering', description: 'Connect sprint specs and PR discussions to delivery.', icon: Workflow, module: 'threads' },
      { title: 'Customer Operations', description: 'Carry customer tickets and SLA context from email to triage.', icon: Headphones, module: 'mail' },
      { title: 'Executive & Leadership', description: 'Unified visibility across company decisions and async signoffs.', icon: Users, module: 'docs' },
      { title: 'Team Operations', description: 'Keep cross-functional ownership and milestones aligned.', icon: CheckSquare, module: 'tasks' },
    ],
  },
  {
    label: 'By Enterprise Need',
    items: [
      { title: 'Incident Swarming', description: 'Audio/video huddle triage with auto-transcribed actions.', icon: Video, module: 'huddle' },
      { title: 'Living Technical Specs', description: 'Synchronized collaborative documentation that never stales.', icon: FileText, module: 'docs' },
      { title: 'Agent Automation', description: 'Background agents to route signals without human toil.', icon: Bot, module: 'automations' },
      { title: 'Async Decision Mesh', description: 'Preserve team context across timezones and handoffs.', icon: MessageSquare, module: 'chat' },
    ],
  },
];

const resourceGroups = [
  {
    label: 'Platform Architecture',
    items: [
      { title: 'Core Workspace Engine', description: 'Explore the full connected enterprise workspace.', icon: UltrakinIcon, href: '#platform' },
      { title: 'How it works', description: 'Watch an incoming signal turn into completed work.', icon: Workflow, href: '#workflows' },
      { title: 'Integrations Matrix', description: 'Connect GitHub, Slack, Jira, Figma, and linear tools.', icon: FolderOpen, href: '#integrations' },
      { title: 'Interactive Showcase', description: 'Hands-on browser frame with 8 working modules.', icon: Layers, href: '#workspace-showcase' },
    ],
  },
  {
    label: 'Trust & Evaluation',
    items: [
      { title: 'Security & Compliance', description: 'SOC 2 Type II, GDPR, AES-256 encryption & audit logs.', icon: ShieldCheck, href: '/security' },
      { title: 'Transparent Pricing', description: 'Per-seat plans with clear enterprise licensing terms.', icon: CheckSquare, href: '/pricing' },
      { title: 'Enterprise Consultation', description: 'Schedule an architecture review or security debrief.', icon: FileText, action: 'openDemoDrawer' },
      { title: 'FAQ & Details', description: 'Detailed specs on security, permissions, and offline state.', icon: HelpCircle, href: '#faq' },
    ],
  },
];

const asideContent = {
  Product: {
    tag: 'ONE CONNECTED WORKSPACE',
    title: 'Keep the work moving forward.',
    desc: 'From the first conversation to the next clear action, with your team in control.',
    actionText: 'Explore the workspace',
    action: (openShowcase) => openShowcase(),
  },
  Solutions: {
    tag: 'ENTERPRISE WORKFLOWS',
    title: 'Speed with built-in guardrails.',
    desc: 'Connect chat, docs, and customer signals into one living thread without context loss.',
    actionText: 'See workflows in action',
    action: (_, scrollToSection) => scrollToSection('workflows'),
  },
  Resources: {
    tag: 'SECURITY & COMPLIANCE',
    title: 'Enterprise trust from day zero.',
    desc: 'SOC 2 Type II audited, GDPR compliant, SSO/SAML enforced, and AES-256 encrypted.',
    actionText: 'Review security posture',
    action: () => { window.location.href = '/security'; },
  },
};

const menuContent = { Product: productGroups, Solutions: solutionGroups, Resources: resourceGroups };
const homeScrollSpySections = [
  ['hero', 'features'],
  ['workspace-showcase', 'workspace'],
  ['workflows', 'agents'],
  ['platform', 'features'],
  ['integrations', 'features'],
  ['security', 'security'],
  // These sections have no matching sticky navigation destination.
  ['evaluation', null],
  ['faq', null],
  ['cta', null],
];

function MenuItem({ item, onSelect }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 cursor-pointer"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-soft text-brand-text transition-colors group-hover:border-brand/25 group-hover:bg-brand-soft group-hover:text-brand-text">
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
          {item.title}
          <ArrowDownRight size={13} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:opacity-70" />
        </span>
        <span className="mt-1 block max-w-[230px] text-xs leading-[1.55] text-ink-muted">{item.description}</span>
      </span>
    </button>
  );
}

export default function Navbar() {
  const {
    setActiveModule,
    isHeroVisible,
    scrollToSection,
    openSearchPalette,
    openDemoDrawer,
  } = useWorkspace();
  const reduceMotion = useReducedMotion();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeStickyItem, setActiveStickyItem] = useState('features');
  const closeTimer = useRef(null);
  const navRef = useRef(null);
  const menuTriggerRefs = useRef({});
  const mobileMenuToggleRef = useRef(null);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 18);
      const hero = document.getElementById('hero');
      if (hero && hero.getBoundingClientRect().bottom <= 0) {
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileGroup(null);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateActiveItem = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const routeName = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
        if (['workspace', 'agents', 'security', 'pricing'].includes(routeName)) {
          setActiveStickyItem(routeName);
          return;
        }

        const readingLine = Math.min(window.innerHeight * 0.35, window.innerHeight - 1);
        const sections = homeScrollSpySections
          .map(([id, navItem]) => ({ element: document.getElementById(id), navItem }))
          .filter(({ element }) => element);
        const visibleSection = sections.find(({ element }) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top <= readingLine && bounds.bottom > readingLine;
        });
        const lastPassedSection = [...sections].reverse().find(({ element }) => (
          element.getBoundingClientRect().top <= readingLine
        ));
        const currentSection = visibleSection || lastPassedSection;
        setActiveStickyItem(currentSection?.navItem ?? null);
      });
    };
    updateActiveItem();
    window.addEventListener('scroll', updateActiveItem, { passive: true });
    window.addEventListener('resize', updateActiveItem);
    window.addEventListener('popstate', updateActiveItem);
    window.addEventListener('hashchange', updateActiveItem);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveItem);
      window.removeEventListener('resize', updateActiveItem);
      window.removeEventListener('popstate', updateActiveItem);
      window.removeEventListener('hashchange', updateActiveItem);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (openMenu) menuTriggerRefs.current[openMenu]?.focus();
        else if (mobileOpen) mobileMenuToggleRef.current?.focus();
        setOpenMenu(null);
        setMobileOpen(false);
        setMobileGroup(null);
      }
    };
    const onPointerDown = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.clearTimeout(closeTimer.current);
    };
  }, [openMenu, mobileOpen]);

  const enterMenu = (name) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const leaveMenu = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };

  const closeMobileNavigation = () => {
    const shouldRestoreFocus = mobileOpen;
    setMobileOpen(false);
    setMobileGroup(null);
    if (shouldRestoreFocus) {
      window.requestAnimationFrame(() => mobileMenuToggleRef.current?.focus());
    }
  };

  const selectItem = (item) => {
    setOpenMenu(null);
    closeMobileNavigation();
    if (item.action === 'openDemoDrawer') {
      openDemoDrawer();
      return;
    }
    if (item.module) {
      if (window.location.pathname !== '/') {
        window.location.href = '/#workspace-showcase';
        return;
      }
      setActiveModule(item.module);
      scrollToSection('workspace-showcase');
      return;
    }
    if (item.href?.startsWith('#') && window.location.pathname !== '/') {
      window.location.href = `/${item.href}`;
    } else if (item.href?.startsWith('#')) {
      scrollToSection(item.href.slice(1));
    } else if (item.href?.startsWith('/')) {
      window.location.href = item.href;
    } else if (item.href) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
  };

  const openShowcase = () => {
    setActiveModule('chat');
    setMobileOpen(false);
    setOpenMenu(null);
    window.location.href = '/workspace';
  };

  const compactTransition = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.01 } }
    : { initial: { opacity: 0, y: -8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } };

  const menuMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.01 } }
    : { initial: { opacity: 0, y: 8, scale: 0.99 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 5, scale: 0.995 }, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } };

  const routeName = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const activePageRoute = ['workspace', 'agents', 'security', 'pricing'].includes(routeName) ? routeName : '';
  const getCurrentNavState = (id) => activePageRoute
    ? (activePageRoute === id ? 'page' : undefined)
    : (activeStickyItem === id ? 'location' : undefined);

  return (
    <nav
      ref={navRef}
      aria-label="Main navigation"
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow] duration-300 ${scrolled || openMenu ? 'border-border bg-surface-glass/90 shadow-[0_10px_35px_rgba(30,35,45,.09)] backdrop-blur-xl' : 'border-transparent bg-surface-glass/78 backdrop-blur-md'}`}
      onMouseLeave={leaveMenu}
    >
      <AnimatePresence mode="wait" initial={false}>
      {isHeroVisible ? (
      <motion.div key="full-navigation" {...compactTransition} className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#hero" aria-label="Ultrakin home" className="group inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70" onClick={(event) => { event.preventDefault(); scrollToSection('hero'); }}>
          <UltrakinLogo size={30} />
          <span className="text-[17px] font-semibold tracking-[-0.045em] text-ink">Ultrakin</span>
        </a>

        <div className="hidden h-full items-center gap-1 lg:flex">
          {['Product', 'Solutions', 'Resources'].map((name) => (
            <button
              key={name}
              ref={(element) => { menuTriggerRefs.current[name] = element; }}
              type="button"
              aria-expanded={openMenu === name}
              aria-controls="navigation-mega-menu"
              onMouseEnter={() => enterMenu(name)}
              onFocus={() => enterMenu(name)}
              onClick={() => setOpenMenu((current) => current === name ? null : name)}
              className={`inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 ${openMenu === name ? 'bg-surface-soft text-ink' : 'text-ink-muted hover:bg-surface-soft hover:text-ink'}`}
            >
              {name}<ChevronDown size={14} className={`text-ink-subtle transition-transform duration-200 ${openMenu === name ? 'rotate-180' : ''}`} />
            </button>
          ))}
          <a href="/security" className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">Security</a>
          <a href="/pricing" className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">Pricing</a>
        </div>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <button type="button" onClick={openSearchPalette} aria-label="Search Ultrakin" className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">
            <Search size={17} strokeWidth={1.8} />
          </button>
          <button type="button" onClick={openDemoDrawer} className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">Talk with us</button>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="group inline-flex h-10 items-center gap-2 rounded-lg border border-brand/20 bg-brand px-4 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(49,86,207,.18)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-brand-hover hover:shadow-[0_7px_18px_rgba(49,86,207,.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page">
            Open Ultrakin<ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={openSearchPalette} aria-label="Search Ultrakin" className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-muted hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70"><Search size={18} /></button>
          <button ref={mobileMenuToggleRef} type="button" onClick={() => { setMobileOpen((value) => !value); setMobileGroup(null); }} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="full-mobile-navigation" className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:bg-surface-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.div>
      ) : (
        <motion.div key="compact-navigation" {...compactTransition} className="relative mx-auto flex h-[58px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#hero" aria-label="Ultrakin home" onClick={(event) => { event.preventDefault(); scrollToSection('hero'); }} className="inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70">
            <UltrakinLogo size={27} />
            <span className="text-[15px] font-semibold tracking-[-0.045em] text-ink">Ultrakin</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {[
              { id: 'features', label: 'Features', href: '/' },
              { id: 'workspace', label: 'Workspace', href: '/workspace' },
              { id: 'agents', label: 'Agents', href: '/agents' },
              { id: 'security', label: 'Security', href: '/security' },
            ].map((item) => (
              <a key={item.id} href={item.href} aria-current={getCurrentNavState(item.id)} className={`rounded-md px-3 py-2 text-[12px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 ${activeStickyItem === item.id ? 'text-ink' : 'text-ink-muted hover:text-ink'}`}>
                {item.label}
                <span className={`mt-1 block h-px rounded-full transition-colors ${activeStickyItem === item.id ? 'bg-brand/80' : 'bg-transparent'}`} />
              </a>
            ))}
            <a href="/pricing" aria-current={getCurrentNavState('pricing')} className={`rounded-md px-3 py-2 text-[12px] font-medium transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 ${activeStickyItem === 'pricing' ? 'text-ink' : 'text-ink-muted'}`}>Pricing</a>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-brand/20 bg-brand px-3.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-page">Open Ultrakin<ArrowRight size={13} /></a>
            <button ref={mobileMenuToggleRef} type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} aria-controls="compact-mobile-navigation" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 md:hidden">{mobileOpen ? <X size={17} /> : <Menu size={17} />}</button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div id="compact-mobile-navigation" {...menuMotion} className="absolute inset-x-0 top-[calc(100%+1px)] border-b border-border bg-surface-raised/96 p-3 shadow-[0_20px_48px_rgba(29,35,40,.075)] backdrop-blur-xl md:hidden">
                {[
                  { id: 'features', label: 'Features', href: '/' },
                  { id: 'workspace', label: 'Workspace', href: '/workspace' },
                  { id: 'agents', label: 'Agents', href: '/agents' },
                  { id: 'security', label: 'Security', href: '/security' },
                ].map((item) => <a key={item.id} href={item.href} aria-current={getCurrentNavState(item.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-surface-soft ${activeStickyItem === item.id ? 'text-ink' : 'text-ink-muted'}`}>{item.label}{activeStickyItem === item.id && <span className="h-1.5 w-1.5 rounded-full bg-brand" />}</a>)}
                <a href="/pricing" aria-current={getCurrentNavState('pricing')} className={`block rounded-lg px-3 py-3 text-sm transition-colors hover:bg-surface-soft ${activeStickyItem === 'pricing' ? 'text-ink' : 'text-ink-muted'}`}>Pricing</a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {isHeroVisible && openMenu && (
          <motion.div
            id="navigation-mega-menu"
            key={openMenu}
            {...menuMotion}
            onMouseEnter={() => enterMenu(openMenu)}
            className="absolute left-1/2 top-[calc(100%+8px)] hidden w-[min(980px,calc(100vw-48px))] -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface-raised/[.98] shadow-[0_28px_90px_rgba(29,35,40,.1),0_2px_6px_rgba(29,35,40,.035)] backdrop-blur-2xl lg:block"
          >
            <div
              className="grid gap-3 p-4"
              style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr) 270px' }}
            >
              {menuContent[openMenu].map((group) => (
                <div key={group.label} className="px-1 py-1">
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-ink-subtle">{group.label}</p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => <MenuItem key={item.title} item={item} onSelect={selectItem} />)}
                  </div>
                </div>
              ))}
              <aside className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border border-border bg-[radial-gradient(ellipse_at_85%_5%,rgba(49,86,207,.045),transparent_52%),linear-gradient(145deg,#fffefd,#f6f5f2_68%)] p-5 shadow-[0_12px_30px_-24px_rgba(39,34,25,.2)]">
                <div aria-hidden="true" className="absolute -right-10 top-16 h-36 w-36 rounded-full border border-brand/10 shadow-[0_0_60px_rgba(49,86,207,.08)]" />
                <div className="relative">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-brand/20 bg-brand-soft/70 p-1.5 shadow-[0_2px_8px_rgba(49,86,207,0.08)]">
                    <UltrakinLogo size={20} />
                  </span>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.16em] text-brand-text">
                    {asideContent[openMenu]?.tag ?? 'One connected workspace'}
                  </p>
                  <h3 className="mt-2 max-w-[200px] text-lg font-semibold leading-[1.2] tracking-[-.035em] text-ink">
                    {asideContent[openMenu]?.title ?? 'Keep the work moving forward.'}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                    {asideContent[openMenu]?.desc ?? 'From the first conversation to the next clear action, with your team in control.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    asideContent[openMenu]?.action(openShowcase, scrollToSection, openDemoDrawer);
                  }}
                  className="group relative mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-brand-text hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus/70 cursor-pointer"
                >
                  {asideContent[openMenu]?.actionText ?? 'Explore the workspace'}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </aside>
            </div>
            <div className="flex items-center justify-between border-t border-border px-6 py-3 text-[11px] text-ink-subtle">
              <span>People, tools, and agents in one app.</span>
              <button type="button" onClick={() => { setOpenMenu(null); scrollToSection('workflows'); }} className="font-medium text-ink-muted transition-colors hover:text-ink">See how it works <span aria-hidden="true">→</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHeroVisible && mobileOpen && (
          <motion.div
            {...menuMotion}
            id="full-mobile-navigation"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-border bg-surface-raised/[.98] px-5 pb-6 pt-3 shadow-[0_24px_60px_rgba(29,35,40,.085)] backdrop-blur-2xl lg:hidden"
          >
            {Object.entries(menuContent).map(([name, groups]) => (
              <section key={name} className="border-b border-border">
                <button type="button" aria-expanded={mobileGroup === name} aria-controls={`mobile-navigation-${name.toLowerCase()}`} onClick={() => setMobileGroup((current) => current === name ? null : name)} className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-ink">
                  {name}<ChevronDown size={16} className={`text-ink-subtle transition-transform ${mobileGroup === name ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileGroup === name && (
                    <motion.div id={`mobile-navigation-${name.toLowerCase()}`} initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.18 }} className="overflow-hidden pb-3">
                      {groups.flatMap((group) => group.items).map((item) => <MenuItem key={`${name}-${item.title}`} item={item} onSelect={selectItem} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <button type="button" onClick={() => { closeMobileNavigation(); scrollToSection('security'); }} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-ink-muted hover:bg-surface-soft">Security</button>
          <a href="/pricing" onClick={closeMobileNavigation} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-ink-muted hover:bg-surface-soft">Pricing</a>
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="secondary" onClick={() => { closeMobileNavigation(); openDemoDrawer(); }} className="w-full">Talk with us</Button>
              <a href={APP_URL} target="_blank" rel="noreferrer" onClick={closeMobileNavigation} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-hover">Open Ultrakin<ArrowRight size={15} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
