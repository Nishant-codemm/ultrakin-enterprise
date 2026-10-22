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
  Mail,
  MessageSquare,
  MessagesSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
  Workflow,
  X,
  Menu,
} from 'lucide-react';
import UltrakinLogo from './primitives/UltrakinLogo';
import Button from './primitives/Button';
import { useWorkspace } from '../context/WorkspaceContext';

const APP_URL = 'https://app.ultrakin.com';

const productGroups = [
  {
    label: 'Everyday work',
    items: [
      { title: 'Chat', description: 'Conversations with context built in.', icon: MessageSquare, module: 'chat' },
      { title: 'Threads', description: 'Carry decisions forward, not just messages.', icon: MessagesSquare, module: 'threads' },
      { title: 'Mail', description: 'Bring customer conversations into the flow.', icon: Mail, module: 'mail' },
      { title: 'Huddles', description: 'Turn a quick conversation into next steps.', icon: Video, module: 'huddle' },
    ],
  },
  {
    label: 'Shared context',
    items: [
      { title: 'Docs', description: 'Keep decisions and working notes together.', icon: FileText, module: 'docs' },
      { title: 'Files', description: 'Find the artifacts connected to the work.', icon: FolderOpen, module: 'files' },
      { title: 'Tasks', description: 'Move commitments into clear ownership.', icon: CheckSquare, module: 'tasks' },
      { title: 'Ukin agents', description: 'Let AI help while people stay in control.', icon: Bot, module: 'automations' },
    ],
  },
];

const solutionGroups = [
  {
    label: 'For the way teams work',
    items: [
      { title: 'Product & engineering', description: 'Keep technical decisions connected to delivery.', icon: Workflow, module: 'threads' },
      { title: 'Customer operations', description: 'Carry customer context from inbox to action.', icon: Headphones, module: 'mail' },
      { title: 'Distributed teams', description: 'Make async work easier to pick up and continue.', icon: MessagesSquare, module: 'docs' },
      { title: 'Team operations', description: 'Make ownership and follow-through visible.', icon: CheckSquare, module: 'tasks' },
    ],
  },
];

const resourceGroups = [
  {
    label: 'Explore Ultrakin',
    items: [
      { title: 'How it works', description: 'See a conversation become coordinated work.', icon: Workflow, href: '#workflows' },
      { title: 'Platform', description: 'Explore the connected workspace.', icon: Sparkles, href: '#platform' },
      { title: 'Integrations', description: 'Bring your team’s tools into the picture.', icon: FolderOpen, href: '#integrations' },
      { title: 'Security', description: 'Learn how Ultrakin protects team context.', icon: ShieldCheck, href: '/security' },
      { title: 'Pricing', description: 'Find the plan that fits your team.', icon: CheckSquare, href: '/pricing' },
    ],
  },
];

const menuContent = { Product: productGroups, Solutions: solutionGroups, Resources: resourceGroups };
const homeScrollSpySections = [
  ['hero', 'features'],
  ['workspace-showcase', 'workspace'],
  ['workflows', 'agents'],
  ['platform', 'features'],
  ['integrations', 'features'],
  ['security', 'security'],
  ['evaluation', 'features'],
  ['faq', 'features'],
  ['cta', 'features'],
];

function MenuItem({ item, onSelect }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors duration-150 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.035] text-indigo-200/90 transition-colors group-hover:border-indigo-300/20 group-hover:bg-indigo-300/[0.09] group-hover:text-indigo-100">
        <Icon size={17} strokeWidth={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 text-[13px] font-medium text-slate-100">
          {item.title}
          <ArrowDownRight size={13} className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:opacity-70" />
        </span>
        <span className="mt-1 block max-w-[230px] text-xs leading-[1.55] text-slate-400">{item.description}</span>
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
        setActiveStickyItem((visibleSection || lastPassedSection)?.navItem || 'features');
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
  }, []);

  const enterMenu = (name) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(name);
  };
  const leaveMenu = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };

  const selectItem = (item) => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileGroup(null);
    if (item.module) {
      if (window.location.pathname !== '/') {
        window.location.href = '/#hero';
        return;
      }
      setActiveModule(item.module);
      if (!isHeroVisible) scrollToSection('hero');
      return;
    }
    if (item.href?.startsWith('#') && window.location.pathname !== '/') window.location.href = `/${item.href}`;
    else if (item.href?.startsWith('#')) scrollToSection(item.href.slice(1));
    else if (item.href?.startsWith('/')) window.location.href = item.href;
    else if (item.href) window.open(item.href, '_blank', 'noopener,noreferrer');
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
      className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,box-shadow] duration-300 ${scrolled || openMenu ? 'border-white/[0.075] bg-[#090b12]/90 shadow-[0_10px_35px_rgba(0,0,0,.18)] backdrop-blur-xl' : 'border-transparent bg-[#090b12]/65 backdrop-blur-md'}`}
      onMouseLeave={leaveMenu}
    >
      <AnimatePresence mode="wait" initial={false}>
      {isHeroVisible ? (
      <motion.div key="full-navigation" {...compactTransition} className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#hero" aria-label="Ultrakin home" className="group inline-flex shrink-0 items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70" onClick={(event) => { event.preventDefault(); scrollToSection('hero'); }}>
          <UltrakinLogo size={30} />
          <span className="text-[17px] font-semibold tracking-[-0.045em] text-white">Ultrakin</span>
        </a>

        <div className="hidden h-full items-center gap-1 lg:flex">
          {['Product', 'Solutions', 'Resources'].map((name) => (
            <button
              key={name}
              type="button"
              aria-haspopup="true"
              aria-expanded={openMenu === name}
              aria-controls="navigation-mega-menu"
              onMouseEnter={() => enterMenu(name)}
              onFocus={() => enterMenu(name)}
              onClick={() => setOpenMenu((current) => current === name ? null : name)}
              className={`inline-flex h-10 items-center gap-1.5 rounded-lg px-3.5 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 ${openMenu === name ? 'bg-white/[0.06] text-white' : 'text-slate-300 hover:bg-white/[0.04] hover:text-white'}`}
            >
              {name}<ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${openMenu === name ? 'rotate-180' : ''}`} />
            </button>
          ))}
          <a href="/security" className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">Security</a>
          <a href="/pricing" className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">Pricing</a>
        </div>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <button type="button" onClick={openSearchPalette} aria-label="Search Ultrakin" className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">
            <Search size={17} strokeWidth={1.8} />
          </button>
          <button type="button" onClick={openDemoDrawer} className="rounded-lg px-3.5 py-2.5 text-[13px] font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">Talk with us</button>
          <a href={APP_URL} target="_blank" rel="noreferrer" className="group inline-flex h-10 items-center gap-2 rounded-lg border border-indigo-300/20 bg-[#7779ee] px-4 text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_4px_14px_rgba(78,80,190,.22)] transition-[background-color,box-shadow,transform] hover:-translate-y-px hover:bg-[#8587f5] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_7px_18px_rgba(78,80,190,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b12]">
            Open Ultrakin<ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={openSearchPalette} aria-label="Search Ultrakin" className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70"><Search size={18} /></button>
          <button type="button" onClick={() => { setMobileOpen((value) => !value); setMobileGroup(null); }} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] text-slate-200 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </motion.div>
      ) : (
        <motion.div key="compact-navigation" {...compactTransition} className="relative mx-auto flex h-[58px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#hero" aria-label="Ultrakin home" onClick={(event) => { event.preventDefault(); scrollToSection('hero'); }} className="inline-flex shrink-0 items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">
            <UltrakinLogo size={27} />
            <span className="text-[15px] font-semibold tracking-[-0.045em] text-white">Ultrakin</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {[
              { id: 'features', label: 'Features', href: '/' },
              { id: 'workspace', label: 'Workspace', href: '/workspace' },
              { id: 'agents', label: 'Agents', href: '/agents' },
              { id: 'security', label: 'Security', href: '/security' },
            ].map((item) => (
              <a key={item.id} href={item.href} aria-current={getCurrentNavState(item.id)} className={`rounded-md px-3 py-2 text-[12px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 ${activeStickyItem === item.id ? 'text-white' : 'text-slate-400 hover:text-slate-100'}`}>
                {item.label}
                <span className={`mt-1 block h-px rounded-full transition-colors ${activeStickyItem === item.id ? 'bg-indigo-300/80' : 'bg-transparent'}`} />
              </a>
            ))}
            <a href="/pricing" aria-current={getCurrentNavState('pricing')} className={`rounded-md px-3 py-2 text-[12px] font-medium transition-colors hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 ${activeStickyItem === 'pricing' ? 'text-white' : 'text-slate-400'}`}>Pricing</a>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a href={APP_URL} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-indigo-300/20 bg-[#7779ee] px-3.5 text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.14)] transition-colors hover:bg-[#8587f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090b12]">Open Ultrakin<ArrowRight size={13} /></a>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70 md:hidden">{mobileOpen ? <X size={17} /> : <Menu size={17} />}</button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div {...menuMotion} className="absolute inset-x-0 top-[calc(100%+1px)] border-b border-white/[0.08] bg-[#0c0f17]/95 p-3 shadow-[0_20px_48px_rgba(0,0,0,.42)] backdrop-blur-xl md:hidden">
                {[
                  { id: 'features', label: 'Features', href: '/' },
                  { id: 'workspace', label: 'Workspace', href: '/workspace' },
                  { id: 'agents', label: 'Agents', href: '/agents' },
                  { id: 'security', label: 'Security', href: '/security' },
                ].map((item) => <a key={item.id} href={item.href} aria-current={getCurrentNavState(item.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors hover:bg-white/[0.05] ${activeStickyItem === item.id ? 'text-white' : 'text-slate-400'}`}>{item.label}{activeStickyItem === item.id && <span className="h-1.5 w-1.5 rounded-full bg-indigo-300" />}</a>)}
                <a href="/pricing" aria-current={getCurrentNavState('pricing')} className={`block rounded-lg px-3 py-3 text-sm transition-colors hover:bg-white/[0.05] ${activeStickyItem === 'pricing' ? 'text-white' : 'text-slate-400'}`}>Pricing</a>
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
            className="absolute left-1/2 top-[calc(100%+8px)] hidden w-[min(960px,calc(100vw-48px))] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#10131c]/[.98] shadow-[0_28px_90px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.035)] backdrop-blur-2xl lg:block"
          >
            <div
              className="grid gap-3 p-4"
              style={{ gridTemplateColumns: menuContent[openMenu].length === 2 ? 'minmax(0,1fr) minmax(0,1fr) 260px' : 'minmax(0,1fr) 260px' }}
            >
              {menuContent[openMenu].map((group) => (
                <div key={group.label} className="px-1 py-1">
                  <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[.16em] text-slate-500">{group.label}</p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => <MenuItem key={item.title} item={item} onSelect={selectItem} />)}
                  </div>
                </div>
              ))}
              <aside className="relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-xl border border-indigo-200/[0.11] bg-[radial-gradient(ellipse_at_85%_5%,rgba(106,111,245,.25),transparent_52%),linear-gradient(145deg,rgba(35,38,64,.88),rgba(17,20,31,.96)_68%)] p-5">
                <div aria-hidden="true" className="absolute -right-10 top-16 h-36 w-36 rounded-full border border-indigo-100/[0.09] shadow-[0_0_60px_rgba(111,113,244,.16)]" />
                <div className="relative">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-indigo-100/15 bg-indigo-200/[0.09] text-indigo-100"><Sparkles size={16} /></span>
                  <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.16em] text-indigo-200/75">One connected workspace</p>
                  <h3 className="mt-2 max-w-[190px] text-lg font-semibold leading-[1.2] tracking-[-.035em] text-white">Keep the work moving forward.</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">From the first conversation to the next clear action, with your team in control.</p>
                </div>
                <button type="button" onClick={openShowcase} className="group relative mt-6 inline-flex w-fit items-center gap-2 text-xs font-semibold text-indigo-100 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300/70">
                  Explore the workspace<ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </button>
              </aside>
            </div>
            <div className="flex items-center justify-between border-t border-white/[0.07] px-6 py-3 text-[11px] text-slate-500">
              <span>People, tools, and agents in one app.</span>
              <button type="button" onClick={() => { setOpenMenu(null); scrollToSection('workflows'); }} className="font-medium text-slate-300 transition-colors hover:text-white">See how it works <span aria-hidden="true">→</span></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHeroVisible && mobileOpen && (
          <motion.div
            {...menuMotion}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-white/[0.09] bg-[#0c0f17]/[.98] px-5 pb-6 pt-3 shadow-[0_24px_60px_rgba(0,0,0,.42)] backdrop-blur-2xl lg:hidden"
          >
            {Object.entries(menuContent).map(([name, groups]) => (
              <section key={name} className="border-b border-white/[0.07]">
                <button type="button" aria-expanded={mobileGroup === name} onClick={() => setMobileGroup((current) => current === name ? null : name)} className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-slate-100">
                  {name}<ChevronDown size={16} className={`text-slate-500 transition-transform ${mobileGroup === name ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {mobileGroup === name && (
                    <motion.div initial={reduceMotion ? false : { height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0.01 : 0.18 }} className="overflow-hidden pb-3">
                      {groups.flatMap((group) => group.items).map((item) => <MenuItem key={`${name}-${item.title}`} item={item} onSelect={selectItem} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <button type="button" onClick={() => { setMobileOpen(false); scrollToSection('security'); }} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/[0.05]">Security</button>
          <a href="/pricing" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-300 hover:bg-white/[0.05]">Pricing</a>
            </div>
            <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.07] pt-4">
              <Button variant="secondary" onClick={() => { setMobileOpen(false); openDemoDrawer(); }} className="w-full">Talk with us</Button>
              <a href={APP_URL} target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#7779ee] text-sm font-semibold text-white">Open Ultrakin<ArrowRight size={15} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
