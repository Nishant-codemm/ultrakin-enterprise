import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Shield, ArrowRight } from 'lucide-react';
import { cn } from '../lib/cn';

const FAQS = [
  {
    q: 'Can we use our existing company domain for Ultrakin Mail?',
    a: 'Yes. You can route inbound and outbound email directly through your company’s custom domain by configuring standard DNS records (MX, SPF, DKIM). You can have team-shared mailboxes (e.g. security@acme.com) or individual user addresses, fully connected to Spaces and Tasks.',
  },
  {
    q: 'How does the Huddle meeting transcript extract action items?',
    a: 'During an audio or video Huddle, Ukin transcribes the dialogue in real time using local WebRTC audio buffers. It detects speaker commitments ("I’ll patch the token cache by Friday") and automatically drafts assigned Kanban tasks and markdown notes that link back to the call transcript.',
  },
  {
    q: 'Does Ukin Agent train on our confidential documents or chat history?',
    a: 'Never. Your workspace data is strictly isolated within your tenant encryption boundary. We enforce zero-data-retention agreements with AI model providers, and your company data is never used to train or fine-tune public foundation models.',
  },
  {
    q: 'Can we import our historical data from Slack and Notion?',
    a: 'Yes. Ultrakin includes 1-click enterprise importers that migrate your Slack workspace archives (including channel message history, file attachments, and thread structures) and Notion workspaces (pages, databases, and sub-pages) with full schema fidelity.',
  },
  {
    q: 'How does Ultrakin replace Zapier and third-party webhooks?',
    a: 'Because Mail, Chat, Huddles, Docs, and Kanban share a unified in-memory event bus, automations execute natively in sub-50 milliseconds. When an email arrives or a form is submitted, the corresponding action fires without fragile HTTP webhooks.',
  },
  {
    q: 'What compliance certifications are available for enterprise review?',
    a: 'Ultrakin is SOC 2 Type II certified and fully compliant with GDPR and HIPAA guidelines. We support SAML 2.0 Single Sign-On (Okta, Azure AD, Google Workspace), automated SCIM 2.0 user provisioning, and immutable audit logging streamed directly to your SIEM.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#07090E] border-t border-white/8 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
            Everything you need to know <br />
            <span className="text-slate-400 font-normal">about running on Ultrakin.</span>
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Real answers to architectural, migration, and security questions.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={cn(
                  'rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-xl',
                  isOpen
                    ? 'border-indigo-500/40 bg-[#0F172A]/90 shadow-lg shadow-indigo-500/10'
                    : 'border-white/8 bg-[#0B0F19]/80 hover:border-white/16 hover:bg-[#0B0F19]'
                )}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <div className={cn(
                    'h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200',
                    isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-white/5 text-slate-400'
                  )}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/6 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-[#0B0F19]/90 border border-white/8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-semibold text-sm text-white">Have a custom infrastructure or security requirement?</div>
            <div className="text-xs text-slate-400 mt-0.5">Our solutions architects can walk your Infosec team through our SOC 2 report.</div>
          </div>
          <a
            href="mailto:sales@ultrakin.com"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white shadow-sm transition-all flex-shrink-0 cursor-pointer"
          >
            Talk to Solutions Architect <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}