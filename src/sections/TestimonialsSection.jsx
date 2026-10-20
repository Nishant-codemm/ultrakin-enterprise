import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      "We cut 6 separate tools down to Ultrakin. The biggest unlock wasn't just saving $140k on software licenses — it was that our engineering tasks now live in the exact same application as executive briefings and customer mail.",
    author: 'Marcus Lindqvist',
    role: 'VP of Engineering',
    company: 'HyperScale Systems',
    metrics: 'Replaced Slack, Notion & Jira',
    avatar: 'ML',
    avatarBg: 'bg-indigo-600',
  },
  {
    quote:
      "The AI agents aren't just a chatbot gimmick in a side drawer. When an incident is flagged in our #support channel, Ukin correlates our docs, drafts the customer response, and creates the PR before our standup even starts.",
    author: 'Elena Rostova',
    role: 'Head of Product Operations',
    company: 'Vanguard Dynamics',
    metrics: '65% faster incident resolution',
    avatar: 'ER',
    avatarBg: 'bg-emerald-600',
  },
  {
    quote:
      "Security compliance was our chief hurdle for all-in-one workspaces. Ultrakin’s SOC 2 Type II audit, SAML SSO, and strict attribute-based permissions passed our Infosec team’s review in less than 48 hours.",
    author: 'David Chen',
    role: 'Chief Information Security Officer',
    company: 'Aether Health',
    metrics: 'Zero-trust enterprise posture',
    avatar: 'DC',
    avatarBg: 'bg-violet-600',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-[#07090E] divider-hairline relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs font-mono font-medium tracking-wide mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            PROVEN AT SCALE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
            Loved by product teams. <br />
            <span className="text-slate-400 font-normal">Sanctioned by enterprise CISOs.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed font-normal">
            See how forward-thinking leaders consolidate their fragmented stacks and accelerate work velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-[#0B0F19]/90 rounded-2xl border border-white/8 p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_16px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-between hover:border-indigo-500/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_20px_48px_-8px_rgba(99,102,241,0.18)] hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-indigo-300 bg-indigo-500/15 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                    {t.metrics}
                  </span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-white/6">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-xs text-white ${t.avatarBg} shadow-sm`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{t.author}</div>
                  <div className="text-xs text-slate-400">{t.role} · <span className="font-medium text-slate-300">{t.company}</span></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}