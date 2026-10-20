import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  FileText,
  Lock,
  Server,
  Zap,
} from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { cn } from '../../lib/cn';

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

export default function EnterpriseDemoDrawer() {
  const { isDemoDrawerOpen, closeDemoDrawer, addToast } = useWorkspace();

  const [step, setStep] = useState(1); // 1: Qualify, 2: Slot, 3: Confirmed
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [seats, setSeats] = useState('50-250');
  const [priority, setPriority] = useState('tco');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow, 02:30 PM CET');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDemoDrawerOpen) {
        closeDemoDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoDrawerOpen, closeDemoDrawer]);

  if (!isDemoDrawerOpen) return null;

  const emailDomain = email.includes('@') ? email.split('@')[1]?.toLowerCase() : '';
  const isFreeEmail = FREE_EMAIL_DOMAINS.includes(emailDomain);
  const isCorporateValid = email.length > 5 && email.includes('@') && !isFreeEmail && emailDomain?.includes('.');

  const handleBookDemo = () => {
    setStep(3);
    addToast(
      'Enterprise Briefing Scheduled',
      `Assigned Alex Mercer (Principal Solutions Architect) for ${selectedSlot}. Calendar invite dispatched to ${email || 'your email'}.`,
      'success'
    );
  };

  const resetAndClose = () => {
    closeDemoDrawer();
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={resetAndClose}
      />

      {/* Slide-over Container */}
      <div className="relative z-10 w-full max-w-xl bg-[#07090E]/95 backdrop-blur-2xl border-l border-white/12 shadow-[-24px_0_60px_rgba(0,0,0,0.85)] flex flex-col h-full text-slate-200 overflow-hidden">
        {/* Header Bar */}
        <div className="p-6 border-b border-white/8 bg-[#0F172A]/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Enterprise Solutions Briefing
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  Direct Architect Access
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Custom SOC 2 verification, regional data residency, and migration runbooks.
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress indicator */}
        <div className="px-6 py-2.5 bg-[#0B0F19] border-b border-white/6 flex items-center justify-between text-xs font-mono">
          <span className={cn('flex items-center gap-1.5', step === 1 ? 'text-indigo-400 font-bold' : 'text-slate-400')}>
            <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">1</span>
            Corporate Qualification
          </span>
          <span className="text-white/20">→</span>
          <span className={cn('flex items-center gap-1.5', step === 2 ? 'text-indigo-400 font-bold' : 'text-slate-400')}>
            <span className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">2</span>
            Schedule Slot
          </span>
          <span className="text-white/20">→</span>
          <span className={cn('flex items-center gap-1.5', step === 3 ? 'text-emerald-400 font-bold' : 'text-slate-400')}>
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px]">3</span>
            Confirmation
          </span>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  Enterprise Procurement Guarantee
                </div>
                <p className="text-[12px] text-slate-300 leading-relaxed">
                  Ultrakin replaces your fragmented stack of Slack Enterprise, Notion, Zoom, and Superhuman with a single unified in-memory architecture. Dedicated solution architects evaluate your security requirements prior to pilot launch.
                </p>
              </div>

              {/* Work Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Corporate Work Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.vance@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />

                {/* Email Qualification Feedback */}
                {isFreeEmail && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 pt-1">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Please use your corporate work email for enterprise evaluation access.</span>
                  </div>
                )}
                {isCorporateValid && (
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Verified Corporate Domain: @{emailDomain}</span>
                  </div>
                )}
              </div>

              {/* Full Name & Company */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Your Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">Organization / Company</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Global Logistics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0F172A] border border-white/10 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Seat Count */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Total Planned Seats</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1-50', label: '1–50 seats' },
                    { id: '50-250', label: '50–250 seats' },
                    { id: '250+', label: '250+ enterprise' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSeats(s.id)}
                      className={cn(
                        'py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer text-center',
                        seats === s.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-sm'
                          : 'bg-[#0F172A] border-white/8 text-slate-400 hover:text-white hover:border-white/16'
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Evaluation Priority */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Primary Evaluation Focus
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    {
                      id: 'tco',
                      title: 'SaaS Consolidation & TCO Reduction',
                      desc: 'Replace Slack, Notion, Zoom & Superhuman with 1 unified platform.',
                      icon: Zap,
                    },
                    {
                      id: 'security',
                      title: 'Sovereign E2EE & Data Residency',
                      desc: 'Pin data exclusively to Frankfurt/US with customer-managed keys (CMEK).',
                      icon: Lock,
                    },
                    {
                      id: 'ai',
                      title: 'Autonomous AI Agent Workflows',
                      desc: 'Live meeting transcript synthesis and background event daemon execution.',
                      icon: Sparkles,
                    },
                    {
                      id: 'jmap',
                      title: 'Native Domain Mail & JMAP Integration',
                      desc: 'Run custom company email inside spaces with zero webhook webs.',
                      icon: Server,
                    },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3',
                        priority === p.id
                          ? 'bg-indigo-600/15 border-indigo-500/80 shadow-md shadow-indigo-500/10'
                          : 'bg-[#0F172A]/70 border-white/6 hover:border-white/16 text-slate-400'
                      )}
                    >
                      <div className={cn('p-2 rounded-lg mt-0.5', priority === p.id ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-400')}>
                        <p.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={cn('text-xs font-semibold', priority === p.id ? 'text-white' : 'text-slate-300')}>
                          {p.title}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{p.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Architect Match Card */}
              <div className="p-4 rounded-xl border border-white/8 bg-[#0F172A] flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-base shadow-md">
                  AM
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Alex Mercer</div>
                  <div className="text-[11px] text-indigo-400 font-mono">Principal Solutions Architect · Ex-Stripe</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Assigned technical specialist for corporate security, JMAP, and Matrix infrastructure review.
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  Select Architecture Consultation Window (30 Minutes)
                </label>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  {[
                    'Tomorrow · 10:00 AM CET (Frankfurt/Paris/Berlin)',
                    'Tomorrow · 02:30 PM CET (Frankfurt/Paris/Berlin)',
                    'Thursday · 11:30 AM CET (Frankfurt/Paris/Berlin)',
                    'Thursday · 04:00 PM CET (Frankfurt/Paris/Berlin)',
                    'Friday · 03:00 PM CET (Frankfurt/Paris/Berlin)',
                  ].map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={cn(
                        'p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between',
                        selectedSlot === slot
                          ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold shadow-sm'
                          : 'bg-[#0F172A] border-white/8 text-slate-300 hover:border-white/16'
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        {slot}
                      </span>
                      {selectedSlot === slot && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Agenda Highlights */}
              <div className="p-4 rounded-xl border border-white/6 bg-[#0B0F19] space-y-2 text-xs">
                <div className="font-semibold text-white">Briefing Agenda:</div>
                <ul className="space-y-1.5 text-slate-400 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Review your existing tool licenses (Slack, Notion, Zoom, Superhuman) and TCO models.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Demonstrate live data residency isolation (Frankfurt vs. US-East).
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Provision a custom sandbox tenant with your domain email DNS records.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">Enterprise Briefing Confirmed</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  A calendar invitation and direct WebRTC Huddle link have been prepared for your team.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-white/10 bg-[#0F172A] max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between text-slate-400 pb-2 border-b border-white/6">
                  <span>Scheduled Time:</span>
                  <span className="font-semibold text-white">{selectedSlot}</span>
                </div>
                <div className="flex justify-between text-slate-400 pb-2 border-b border-white/6">
                  <span>Assigned Architect:</span>
                  <span className="font-semibold text-indigo-300">Alex Mercer (Solutions Lead)</span>
                </div>
                <div className="flex justify-between text-slate-400 pb-2 border-b border-white/6">
                  <span>Meeting Room:</span>
                  <span className="font-mono text-emerald-300">meet.ultrakin.com/demo-819</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Security Scope:</span>
                  <span className="text-white">SOC 2 Type II & CMEK NDA</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-2.5 max-w-md mx-auto">
                <button
                  onClick={() => addToast('Trust Packet Downloaded', 'SOC 2 Type II & ISO 27001 summary downloaded.', 'info')}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Download Enterprise Compliance Overview (PDF)
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-md shadow-indigo-500/25"
                >
                  Return to Platform Showcase
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step < 3 && (
          <div className="p-6 border-t border-white/8 bg-[#0F172A]/70 flex items-center justify-between">
            {step === 1 ? (
              <button
                type="button"
                onClick={resetAndClose}
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            )}

            {step === 1 ? (
              <button
                type="button"
                disabled={email.length < 5 || isFreeEmail}
                onClick={() => setStep(2)}
                className={cn(
                  'py-2.5 px-5 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer',
                  email.length >= 5 && !isFreeEmail
                    ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-white/5 text-slate-500 border border-white/6 cursor-not-allowed'
                )}
              >
                Continue to Time Slots
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleBookDemo}
                className="py-2.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/30 transition-all cursor-pointer"
              >
                Confirm Enterprise Booking
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
