import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck, Building2, Zap } from 'lucide-react';
import { useWorkspace } from '../context/WorkspaceContext';
import { cn } from '../lib/cn';

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const { openDemoDrawer } = useWorkspace();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      badge: 'COMMUNITY & LEAN TEAMS',
      price: '$0',
      period: 'forever · no credit card required',
      desc: 'Everything you need to run your team on a unified in-memory workspace.',
      cta: 'Start Free Workspace',
      ctaAction: () => window.open('https://app.ultrakin.com/auth', '_blank'),
      popular: false,
      features: [
        'All core tools (Chat, Docs, Mail, Tasks)',
        'Unlimited workspace members & spaces',
        'WebRTC Huddles up to 5 participants',
        '90-day searchable message & doc history',
        'Standard Ukin Agent operational actions',
        'Community support & self-serve onboarding',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      badge: 'HIGH-VELOCITY TEAMS',
      price: annual ? '$10' : '$12',
      period: '/ user / mo',
      desc: 'Unlimited history, custom domain mailboxes, and autonomous AI agents.',
      cta: 'Start 14-Day Free Trial',
      ctaAction: () => window.open('https://app.ultrakin.com/auth', '_blank'),
      popular: true,
      features: [
        'Everything in Starter, plus:',
        'Unlimited message, doc & transcript history',
        'Custom domain mailboxes with SPF & DKIM',
        'Autonomous Ukin Agent event daemon',
        'Live meeting speech-to-text transcriptions',
        '100 GB shared cloud storage & guest access',
        'Full App Marketplace (Forms, LMS, Lists)',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise Grid',
      badge: 'MISSION-CRITICAL SCALE',
      price: annual ? '$20' : '$24',
      period: '/ user / mo or custom invoicing',
      desc: 'SAML SSO, SCIM 2.0 lifecycle, sovereign data residency, and financial SLA.',
      cta: 'Request Enterprise Demo',
      ctaAction: openDemoDrawer,
      popular: false,
      features: [
        'Everything in Pro, plus:',
        'SAML 2.0 SSO (Okta, Entra ID, Google IdP)',
        'Automated SCIM 2.0 user lifecycle sync',
        'Dedicated data residency (Frankfurt or US)',
        'Immutable compliance audit logs & SIEM',
        'Customer-Managed Encryption Keys (CMEK)',
        '99.95% uptime financial SLA guarantee',
        'Dedicated Technical Solutions Architect',
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#0B0F19] border-t border-white/8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            TRANSPARENT VALUE ARCHITECTURE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
            Simple, honest pricing. <br />
            <span className="text-slate-400 font-normal">Replace 5 SaaS subscriptions with 1 unified platform.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-400 leading-relaxed">
            Eliminate $60+/seat/mo of redundant spend across Slack, Notion, Zoom, and Superhuman.
          </p>

          {/* Billing Toggle (Save 20%) */}
          <div className="mt-8 inline-flex items-center gap-2 p-1.5 rounded-xl bg-[#07090E] border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'px-4 py-2 rounded-lg transition-all cursor-pointer',
                !annual
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer',
                annual
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              )}
            >
              <span>Annual billing</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* 3-Tier Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className={cn(
                'relative rounded-2xl p-8 flex flex-col justify-between backdrop-blur-xl transition-all duration-200',
                plan.popular
                  ? 'bg-[#0F172A] border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 lg:-translate-y-2'
                  : 'bg-[#07090E]/90 border border-white/8 hover:border-white/16 shadow-xl'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-indigo-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-md shadow-indigo-500/30 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-white" />
                  MOST POPULAR FOR TEAMS
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold tracking-wider">
                    {plan.badge}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {plan.desc}
                </p>

                <div className="space-y-3 pt-5 border-t border-white/8 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={plan.ctaAction}
                  className={cn(
                    'w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer',
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                  )}
                >
                  {plan.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-white/8 bg-[#07090E]/80 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Need custom BAA, HIPAA, or dedicated VPC tenant deployment?</div>
              <div className="text-xs text-slate-400">Our engineering architects provide custom MSAs, security reviews, and penetration test access.</div>
            </div>
          </div>

          <button
            onClick={openDemoDrawer}
            className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/12 transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0"
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            Talk with Solutions Engineering
          </button>
        </div>
      </div>
    </section>
  );
}
