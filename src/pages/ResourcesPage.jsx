/**
 * ResourcesPage.jsx
 * The unified Ultrakin Resources & Architecture Hub (/resources).
 * Features live reactive search, category filtering, interactive featured paper,
 * responsive resource grid, and an interactive full-text article reader modal.
 */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  Clock,
  Terminal,
  Layers,
  ShieldCheck,
  Compass,
  Building2,
  ArrowRight,
  X,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import AvatarChip from '../components/product/AvatarChip';
import {
  RESOURCE_CATEGORIES,
  FEATURED_RESOURCE,
  RESOURCES_LIST,
} from '../data/resourcePageData';

const CATEGORY_ICONS = {
  Layers,
  Code: Terminal,
  Compass,
  Terminal,
  ShieldCheck,
  Building2,
};

const CATEGORY_COLORS = {
  architecture: 'text-[#6366f1] bg-indigo-50 border-indigo-200',
  guides: 'text-[#ef4444] bg-red-50 border-red-200',
  tutorials: 'text-[#059669] bg-emerald-50 border-emerald-200',
  security: 'text-[#475569] bg-slate-100 border-slate-300',
  stories: 'text-[#d97706] bg-amber-50 border-amber-200',
};

export default function ResourcesPage() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter resources based on active category & search query
  const filteredResources = useMemo(() => {
    return RESOURCES_LIST.filter((resource) => {
      const matchesCategory =
        activeCategory === 'all' || resource.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const copiedTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
        copiedTimeoutRef.current = null;
      }
    };
  }, []);

  const handleShareArticle = async () => {
    const shareUrl = typeof window !== 'undefined'
      ? (activeArticle?.id
          ? `${window.location.origin}${window.location.pathname}#${activeArticle.id}`
          : window.location.href)
      : '';

    if (!shareUrl || !navigator?.clipboard?.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);

      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
      copiedTimeoutRef.current = setTimeout(() => {
        setCopiedLink(false);
        copiedTimeoutRef.current = null;
      }, 2000);
    } catch {
      // Gracefully ignore clipboard permission denial or write rejection; do not show false success
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#111827] select-none font-sans pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ─── Hero Section ─────────────────────────────────────────────────── */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e2dc] bg-white px-3 py-1 text-[11px] font-semibold text-[#667085] shadow-2xs mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb]" />
            <span>KNOWLEDGE & ARCHITECTURE</span>
          </div>

          <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.8rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[#111827]">
            Resources, Guides, and <br />
            Platform Architecture.
          </h1>

          <p className="mt-5 text-[1.0625rem] leading-[1.7] text-[#667085] max-w-2xl">
            Explore deep architectural whitepapers, production engineering playbooks, hands-on tutorials, and case studies written by the engineers and operators building Ultrakin.
          </p>

          {/* ─── Instant Reactive Search Bar ──────────────────────────────── */}
          <div className="mt-8 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9ca3af]">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, architecture docs, whitepapers, or tags (e.g. MCP, WebSockets)..."
              className="w-full rounded-xl border border-[#e5e2dc] bg-white pl-10 pr-24 py-3 text-xs text-[#111827] placeholder-[#9ca3af] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 focus:outline-none transition-all shadow-2xs"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-[#9ca3af] hover:text-[#111827]"
              >
                Clear
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="font-mono text-[10px] text-[#9ca3af] bg-[#f0ede8] px-1.5 py-0.5 rounded border border-[#e5e2dc]">
                  ⌘K
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ─── Horizontal Category Filter Tabs ─────────────────────────────── */}
        <div className="border-b border-[#e5e2dc] pb-4 mb-10 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {RESOURCE_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] || Layers;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#111827] bg-white shadow-2xs border border-[#e5e2dc]'
                      : 'text-[#667085] hover:text-[#111827] hover:bg-white/60'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#2563eb]' : 'text-[#9ca3af]'} />
                  <span>{cat.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-resource-tab"
                      className="absolute inset-0 rounded-lg border-2 border-[#2563eb] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Featured Architecture Showcase Card ─────────────────────────── */}
        {activeCategory === 'all' && !searchQuery && (
          <div className="mb-14">
            <div className="rounded-2xl border border-[#e5e2dc] bg-gradient-to-br from-white via-white to-[#faf9f7] p-6 sm:p-8 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-indigo-500/10 via-transparent to-transparent pointer-events-none rounded-bl-full" />

              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                <div className="max-w-2xl space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-0.5 text-[10.5px] font-semibold font-mono">
                      {FEATURED_RESOURCE.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[#9ca3af]">
                      {FEATURED_RESOURCE.date} · {FEATURED_RESOURCE.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111827] group-hover:text-[#2563eb] transition-colors">
                    {FEATURED_RESOURCE.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                    {FEATURED_RESOURCE.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {FEATURED_RESOURCE.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#f4f2ee] border border-[#e5e2dc] px-2 py-0.5 text-[10px] font-mono text-[#4b5563]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    <AvatarChip
                      name={FEATURED_RESOURCE.author.name}
                      color={FEATURED_RESOURCE.author.color}
                      size="sm"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#111827]">
                        {FEATURED_RESOURCE.author.name}
                      </p>
                      <p className="text-[10.5px] text-[#6b7280]">
                        {FEATURED_RESOURCE.author.role} · {FEATURED_RESOURCE.author.company}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end justify-between self-stretch shrink-0 pt-2 lg:pt-0">
                  <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/5 p-4 text-[11px] font-mono text-indigo-950 max-w-xs space-y-1 hidden sm:block">
                    <p className="text-indigo-600 font-semibold">// Architecture Invariant</p>
                    <p className="text-slate-600 text-[10.5px]">
                      RFC-822 email parser + WebRTC audio mesh + CRDT distributed task journal.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveArticle(FEATURED_RESOURCE)}
                    className="mt-4 lg:mt-0 flex items-center gap-2 rounded-lg bg-[#111827] text-white px-4 py-2.5 text-xs font-semibold hover:bg-black transition-all cursor-pointer shadow-sm group-hover:bg-[#2563eb]"
                  >
                    <span>Read Technical Paper</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Resource Grid ────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#667085]">
            <p>
              Showing <strong className="text-[#111827]">{filteredResources.length}</strong> resources
              {activeCategory !== 'all' && ` in ${activeCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {filteredResources.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#e5e2dc] bg-white p-12 text-center space-y-3">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#f0ede8] text-[#667085]">
                <Search size={18} />
              </div>
              <p className="text-sm font-semibold text-[#111827]">No resources found</p>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                No guides or architecture papers match "{searchQuery}". Try searching for "MCP", "WebSockets", "Zendesk", or "Security".
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="rounded-md border border-[#e5e2dc] bg-white px-3 py-1.5 text-xs font-semibold text-[#111827] hover:bg-[#faf9f7] cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => {
                const categoryClass =
                  CATEGORY_COLORS[res.category] || 'text-slate-700 bg-slate-50 border-slate-200';

                return (
                  <div
                    key={res.id}
                    onClick={() => setActiveArticle(res)}
                    className="flex flex-col justify-between rounded-xl border border-[#e5e2dc] bg-white p-5 hover:border-[#2563eb]/40 hover:shadow-md transition-all cursor-pointer group select-none"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded px-2 py-0.5 text-[10px] font-semibold border ${categoryClass}`}
                        >
                          {res.categoryLabel}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-[#9ca3af]">
                          <Clock size={10} />
                          {res.readTime}
                        </span>
                      </div>

                      <h3 className="font-semibold text-sm sm:text-base text-[#111827] group-hover:text-[#2563eb] transition-colors leading-snug">
                        {res.title}
                      </h3>

                      <p className="text-xs text-[#4b5563] line-clamp-2 leading-relaxed">
                        {res.description}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {res.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-[#faf9f7] border border-[#f0ede8] px-1.5 py-0.2 text-[9.5px] font-mono text-[#667085]"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#f0ede8] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AvatarChip
                          name={res.author.name}
                          color={res.author.color}
                          size="xs"
                        />
                        <div>
                          <p className="text-[11px] font-medium text-[#111827]">
                            {res.author.name}
                          </p>
                          <p className="text-[9.5px] text-[#9ca3af]">{res.date}</p>
                        </div>
                      </div>

                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#2563eb] group-hover:translate-x-0.5 transition-transform">
                        <span>Read</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ─── Enterprise Architecture Consultation CTA ────────────────────── */}
        <div className="mt-20 rounded-2xl border border-[#e5e2dc] bg-white p-8 sm:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#2563eb]">
              SOLUTIONS ARCHITECTURE
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#111827]">
              Need a custom architectural evaluation or security debrief?
            </h3>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              Our engineering team works directly with enterprise architects to review deployment topology, data retention policies, and single-tenant self-hosting requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="mailto:architecture@ultrakin.com"
              className="w-full sm:w-auto text-center rounded-lg bg-[#2563eb] text-white px-5 py-2.5 text-xs font-semibold hover:bg-[#1d4ed8] transition-colors shadow-sm cursor-pointer"
            >
              Request Architecture Brief
            </a>
            <a
              href="/security"
              className="w-full sm:w-auto text-center rounded-lg border border-[#e5e2dc] bg-white text-[#374151] px-5 py-2.5 text-xs font-semibold hover:bg-[#faf9f7] transition-colors cursor-pointer"
            >
              Security Overview
            </a>
          </div>
        </div>
      </div>

      {/* ─── Interactive Article Reader Lightbox / Modal ─────────────────── */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 10 }}
              className="w-full max-w-2xl max-h-[85vh] rounded-2xl bg-white border border-[#e5e2dc] shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Reader Header */}
              <div className="flex items-center justify-between border-b border-[#e5e2dc] px-6 py-4 bg-[#fdfcfb]">
                <div className="flex items-center gap-2 truncate pr-4">
                  <span className="rounded bg-indigo-50 border border-indigo-200 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
                    {activeArticle.categoryLabel}
                  </span>
                  <span className="text-xs text-[#9ca3af] font-mono">
                    {activeArticle.readTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareArticle}
                    className="flex items-center gap-1.5 rounded-md border border-[#e5e2dc] bg-white px-2.5 py-1 text-xs font-medium text-[#4b5563] hover:bg-[#f5f3ef] cursor-pointer transition-colors"
                  >
                    {copiedLink ? <CheckCircle2 size={12} className="text-emerald-600" /> : <Share2 size={12} />}
                    <span>{copiedLink ? 'Copied' : 'Share'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-[#e5e2dc] text-[#6b7280] hover:text-[#111827] hover:bg-[#f0ede8] transition-colors cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-[#374151] leading-relaxed">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111827] leading-tight">
                    {activeArticle.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-[#667085]">
                    {activeArticle.description || activeArticle.subtitle}
                  </p>
                </div>

                {/* Author Card */}
                <div className="flex items-center gap-3 py-3 border-y border-[#f0ede8]">
                  <AvatarChip
                    name={activeArticle.author.name}
                    color={activeArticle.author.color}
                    size="sm"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#111827]">
                      {activeArticle.author.name}
                    </p>
                    <p className="text-[11px] text-[#667085]">
                      {activeArticle.author.role} · Published {activeArticle.date}
                    </p>
                  </div>
                </div>

                {/* Structured Content Sections */}
                {activeArticle.content?.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h3 className="font-semibold text-sm sm:text-base text-[#111827]">
                      {section.heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}

                {/* Tags Footer */}
                <div className="pt-4 border-t border-[#f0ede8] flex flex-wrap gap-1.5">
                  {activeArticle.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-[#faf9f7] border border-[#e5e2dc] px-2 py-0.5 text-[10px] font-mono text-[#667085]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reader Footer */}
              <div className="border-t border-[#e5e2dc] px-6 py-3.5 bg-[#faf9f7] flex items-center justify-between text-xs">
                <span className="text-[#6b7280]">
                  Ultrakin Architecture & Knowledge Base
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-md bg-[#111827] text-white px-3 py-1.5 text-xs font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
