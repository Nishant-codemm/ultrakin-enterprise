import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useWorkspace } from '../../context/useWorkspace';
import { cn } from '../../lib/cn';
import Button from '../primitives/Button';

const BRIEFING_SLOTS = [
  { id: 'slot-1', date: 'Tomorrow', time: '11:00 AM EST', label: 'Recommended' },
  { id: 'slot-2', date: 'Thursday', time: '2:30 PM EST', label: 'Available' },
  { id: 'slot-3', date: 'Friday', time: '10:00 AM EST', label: 'Available' },
];

const EVALUATION_TOPICS = [
  { id: 'security', label: 'AI Agent Governance & SOC 2' },
  { id: 'vpc', label: 'Private VPC & Dedicated Cluster' },
  { id: 'migration', label: 'Slack & Notion Migration' },
  { id: 'scale', label: 'Enterprise Pricing (100+ seats)' },
];

const TEAM_SIZES = ['25–100', '101–500', '500–2,000', '2,000+'];

export default function EnterpriseDemoDrawer() {
  const { isDemoDrawerOpen, closeDemoDrawer } = useWorkspace();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  const [activeTab, setActiveTab] = useState('briefing'); // 'briefing' | 'direct'
  const [selectedSlot, setSelectedSlot] = useState('slot-1');
  const [selectedTopic, setSelectedTopic] = useState('security');
  const [teamSize, setTeamSize] = useState('101–500');
  const [formData, setFormData] = useState({ name: '', email: '', note: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Keyboard accessibility: Escape key & focus trap
  useEffect(() => {
    if (!isDemoDrawerOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      return undefined;
    }

    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeDemoDrawer();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? lastElement : firstElement).focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [isDemoDrawerOpen, closeDemoDrawer]);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard?.writeText('sales@ultrakin.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  }, []);

  const handleSubmitBriefing = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const selectedSlotData = BRIEFING_SLOTS.find((s) => s.id === selectedSlot) || BRIEFING_SLOTS[0];
  const selectedTopicData = EVALUATION_TOPICS.find((t) => t.id === selectedTopic) || EVALUATION_TOPICS[0];

  const mailtoUrl = `mailto:sales@ultrakin.com?subject=Ultrakin%20Enterprise%20Briefing%20Request%20-%20${encodeURIComponent(formData.name || 'Enterprise Buyer')}&body=Hi%20Ultrakin%20Team%2C%0A%0AI%27d%20like%20to%20schedule%20an%20Executive%20Briefing%20and%20Product%20Architecture%20Session.%0A%0A%E2%80%A2%20Preferred%20Time%3A%20${encodeURIComponent(`${selectedSlotData.date} at ${selectedSlotData.time}`)}%0A%E2%80%A2%20Evaluation%20Focus%3A%20${encodeURIComponent(selectedTopicData.label)}%0A%E2%80%A2%20Team%20Size%3A%20${encodeURIComponent(teamSize)}%0A%E2%80%A2%20Work%20Email%3A%20${encodeURIComponent(formData.email || 'Provided')}%0A%E2%80%A2%20Notes%3A%20${encodeURIComponent(formData.note || 'None')}%0A%0ALooking%20forward%20to%20reviewing%20the%20security%20documentation%20and%20architecture.%0A`;

  if (!isDemoDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="presentation">
      {/* Backdrop with smooth blur */}
      <motion.button
        type="button"
        aria-label="Close evaluation panel"
        onClick={closeDemoDrawer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 cursor-default bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <motion.section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="evaluation-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-border bg-page text-ink shadow-[-28px_0_72px_-24px_rgba(20,34,59,.35)] overflow-hidden"
      >
        {/* ── Top Header ── */}
        <header className="relative border-b border-border bg-surface-raised/90 p-6 sm:p-7 backdrop-blur-md">
          {/* Subtle top edge glow */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand/20 bg-brand-soft shadow-sm text-brand-text">
                <Building2 aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Solutions Team Active
                  </span>
                  <span className="text-[11px] font-mono text-ink-subtle">Median reply &lt; 2h</span>
                </div>
                <h2 id="evaluation-title" className="mt-1 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  Talk with the Ultrakin team
                </h2>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDemoDrawer}
              aria-label="Close evaluation panel"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-surface-soft hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-3 text-xs leading-5 text-ink-muted">
            Connect directly with an Ultrakin Solutions Architect to review architecture, security governance, or tailored team deployment.
          </p>

          {/* ── Mode Switcher Tabs ── */}
          <div className="mt-5 flex rounded-xl border border-border bg-surface-soft/80 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('briefing')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all cursor-pointer',
                activeTab === 'briefing'
                  ? 'bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-ink font-semibold'
                  : 'text-ink-muted hover:text-ink'
              )}
            >
              <Calendar className="h-3.5 w-3.5 text-brand-text" />
              <span>Book Executive Briefing</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('direct')}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-medium transition-all cursor-pointer',
                activeTab === 'direct'
                  ? 'bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.06)] text-ink font-semibold'
                  : 'text-ink-muted hover:text-ink'
              )}
            >
              <ShieldCheck className="h-3.5 w-3.5 text-brand-text" />
              <span>Security Packet &amp; Direct</span>
            </button>
          </div>
        </header>

        {/* ── Drawer Body ── */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6">

          {/* TAB 1: EXECUTIVE BRIEFING */}
          {activeTab === 'briefing' && (
            <>
              {isSubmitted ? (
                /* Confirmation Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-50/40 p-6 text-center shadow-sm"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 ring-8 ring-emerald-500/5">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    Executive Briefing Requested
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-ink-muted">
                    We've registered your briefing request for{' '}
                    <strong className="text-ink font-semibold">
                      {selectedSlotData.date} at {selectedSlotData.time}
                    </strong>
                    . Our Solutions Architect is reviewing your focus on{' '}
                    <strong className="text-ink font-semibold">{selectedTopicData.label}</strong>.
                  </p>

                  <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-left space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-muted">Selected Slot</span>
                      <span className="font-medium text-ink">{selectedSlotData.date} · {selectedSlotData.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-muted">Assigned Team</span>
                      <span className="font-medium text-brand-text">Ultrakin Enterprise Architect</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-muted">Security Review</span>
                      <span className="font-medium text-emerald-600">SOC 2 Type II NDA Deck Included</span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={mailtoUrl}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-brand-hover transition-colors"
                    >
                      Open Email Confirmation
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-3 text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                    >
                      Edit Request
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Booking Form */
                <form onSubmit={handleSubmitBriefing} className="space-y-5">
                  {/* Slot Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-2">
                      1. Select a 30-Minute Briefing Window
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {BRIEFING_SLOTS.map((slot) => {
                        const isSelected = selectedSlot === slot.id;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot.id)}
                            className={cn(
                              'flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer',
                              isSelected
                                ? 'border-brand bg-brand-soft/30 ring-2 ring-brand/20 shadow-sm'
                                : 'border-border bg-surface hover:border-brand/30 hover:bg-surface-raised'
                            )}
                          >
                            <span className="text-[10px] font-mono text-brand-text font-medium">{slot.date}</span>
                            <span className="mt-1 text-xs font-semibold text-ink">{slot.time}</span>
                            <span className="mt-1.5 rounded bg-surface-soft px-1.5 py-0.5 text-[9px] text-ink-subtle">
                              {slot.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Topic Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-2">
                      2. Primary Architecture &amp; Evaluation Focus
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {EVALUATION_TOPICS.map((topic) => {
                        const isSelected = selectedTopic === topic.id;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => setSelectedTopic(topic.id)}
                            className={cn(
                              'flex items-center gap-2 rounded-xl border p-2.5 text-left text-xs transition-all cursor-pointer',
                              isSelected
                                ? 'border-brand bg-brand-soft/20 text-brand-text font-semibold ring-1 ring-brand/30'
                                : 'border-border bg-surface text-ink-muted hover:text-ink hover:border-border-strong'
                            )}
                          >
                            <span className={cn('h-1.5 w-1.5 rounded-full', isSelected ? 'bg-brand' : 'bg-border-strong')} />
                            <span className="truncate">{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Team Size Segmented Control */}
                  <div>
                    <label className="block text-xs font-semibold text-ink mb-2">
                      3. Organization Scale
                    </label>
                    <div className="flex gap-2">
                      {TEAM_SIZES.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setTeamSize(size)}
                          className={cn(
                            'flex-1 rounded-lg border py-2 text-center text-xs transition-all cursor-pointer',
                            teamSize === size
                              ? 'border-brand bg-brand text-white font-semibold shadow-sm'
                              : 'border-border bg-surface text-ink-muted hover:border-border-strong hover:text-ink'
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Inputs */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label htmlFor="drawer-email" className="block text-xs font-medium text-ink-muted mb-1">
                        Work Email <span className="text-brand">*</span>
                      </label>
                      <input
                        id="drawer-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@acme.com"
                        className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="drawer-name" className="block text-xs font-medium text-ink-muted mb-1">
                          Full Name
                        </label>
                        <input
                          id="drawer-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Alex Mercer"
                          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="drawer-note" className="block text-xs font-medium text-ink-muted mb-1">
                          Deployment Target
                        </label>
                        <input
                          id="drawer-note"
                          type="text"
                          value={formData.note}
                          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                          placeholder="AWS VPC / GCP / On-Prem"
                          className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-xs text-ink placeholder:text-ink-subtle focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(49,86,207,0.25)] transition-all hover:bg-brand-hover hover:shadow-[0_6px_20px_rgba(49,86,207,0.35)] disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          <span>Reserving Briefing Slot...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Executive Briefing</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-ink-subtle">
                      Includes 30-day sandbox tenant &amp; SOC 2 Type II audit report.
                    </p>
                  </div>
                </form>
              )}
            </>
          )}

          {/* TAB 2: DIRECT SECURITY & ENTERPRISE ACCESS */}
          {activeTab === 'direct' && (
            <div className="space-y-4">
              {/* Direct Email Card */}
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-soft text-brand-text">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-ink">Direct Enterprise Desk</p>
                      <p className="text-[11px] font-mono text-brand-text">sales@ultrakin.com</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface-soft px-2.5 text-[11px] font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink-muted">
                  Send your custom RFP, security questionnaires (SIG/CAIQ), or architectural constraints directly to our senior leadership team.
                </p>
              </div>

              {/* Security Packet Card */}
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                    <FileText className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-ink">Enterprise Security Dossier</p>
                    <p className="text-[11px] text-ink-muted">SOC 2 Type II · ISO 27001 · HIPAA BAA</p>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-5 text-ink-muted">
                  Request our comprehensive compliance deck, threat models, cryptographic key lifecycle specs, and penetration testing summaries under mutual NDA.
                </p>
                <a
                  href="mailto:security@ultrakin.com?subject=Ultrakin%20Security%20Packet%20Request"
                  className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-medium text-brand-text hover:underline"
                >
                  Request Security Whitepaper via email <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Dedicated Support Channel */}
              <div className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                    <Users className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-ink">Shared Matrix / Slack War Room</p>
                    <p className="text-[11px] text-ink-muted">For Enterprise evaluation teams</p>
                  </div>
                </div>
                <p className="mt-2.5 text-xs leading-5 text-ink-muted">
                  During POC evaluations, your engineers get a direct federated Matrix or Slack channel connected to Ultrakin's core platform team for real-time telemetry and API support.
                </p>
              </div>
            </div>
          )}

          {/* Enterprise Testimonial Quote */}
          <div className="rounded-xl border border-border/70 bg-surface-soft/60 p-4">
            <p className="text-xs italic leading-5 text-ink-muted">
              "Ultrakin resolved our biggest organizational bottleneck: context fragmentation across Slack threads, meeting transcripts, and backlog tickets. It acts as our team's operational nervous system."
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="font-semibold text-ink">Platform Engineering Lead</span>
              <span className="font-mono text-ink-subtle">Fintech Enterprise · 850 Engineers</span>
            </div>
          </div>

        </div>

        {/* ── Footer: Trust & Direct Email Fallback ── */}
        <footer className="border-t border-border bg-surface-raised p-5 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-ink-subtle">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>SOC 2 Type II</span>
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Lock className="h-3.5 w-3.5 text-brand-text" />
                <span>Mutual NDA</span>
              </span>
              <span>·</span>
              <span>99.98% SLA</span>
            </div>
            <a
              href="mailto:sales@ultrakin.com"
              className="inline-flex items-center gap-1 font-mono text-brand-text hover:underline"
            >
              sales@ultrakin.com <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </footer>
      </motion.section>
    </div>
  );
}
