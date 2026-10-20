import { motion } from 'framer-motion';
import { MessageSquare, AlignLeft, CheckSquare, Zap, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquare,
    label: 'Signal',
    sub: 'Chat · request · idea',
    desc: 'Something happens in chat, mail, or a meeting.',
    color: 'text-indigo-400',
    border: 'border-indigo-500/30',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: AlignLeft,
    label: 'Decision',
    sub: 'Context · priority',
    desc: 'Ukin surfaces the right context. Someone decides.',
    color: 'text-indigo-300',
    border: 'border-indigo-400/30',
    bg: 'bg-indigo-500/10',
  },
  {
    icon: CheckSquare,
    label: 'Action',
    sub: 'Task · owner',
    desc: 'A task is created, assigned, and tracked automatically.',
    color: 'text-violet-400',
    border: 'border-violet-400/30',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Zap,
    label: 'Outcome',
    sub: 'Done · shipped',
    desc: 'Work is completed. Context is preserved for what\'s next.',
    color: 'text-emerald-400',
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-500/10',
  },
];

export default function SpineSection() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] py-24 md:py-32 border-t border-white/8">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(900px 600px at 50% 50%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(900px 600px at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(800px 500px at 50% 60%, rgba(99,102,241,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl mb-16">
          <p className="mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-indigo-400 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            HOW IT WORKS
          </p>
          <h2 className="text-4xl md:text-[52px] font-bold leading-[1.04] tracking-[-0.025em] text-white">
            A message becomes a task{' '}
            <span className="text-indigo-400">becomes a result.</span>
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-[1.65] text-slate-400">
            Work doesn't stop at the chat. A request gets prioritized, turned into a task with an owner, completed, and tracked — automatically, without copy-pasting between apps.
          </p>
        </div>

        {/* Flow nodes */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-[36px] z-0 h-px overflow-hidden bg-white/10">
            <motion.span
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
              className="absolute top-0 left-0 h-full w-1/3"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.9), transparent)',
                boxShadow: '0 0 14px 2px rgba(99,102,241,0.6)',
              }}
            />
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 px-2"
              >
                <div className="relative z-10">
                  <div
                    className={`h-[72px] w-[72px] rounded-[20px] border ${step.border} ${step.bg} backdrop-blur-md flex items-center justify-center shadow-lg shadow-indigo-500/5`}
                  >
                    <step.icon className={`h-7 w-7 ${step.color}`} strokeWidth={1.6} />
                  </div>
                </div>
                <div>
                  <p className="text-base font-semibold text-white mb-1">{step.label}</p>
                  <p className="text-xs font-medium text-slate-400 mb-2">{step.sub}</p>
                  <p className="text-sm leading-[1.6] text-slate-300">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://app.ultrakin.com/auth"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 hover:-translate-y-0.5 transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            See it in action
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="text-sm text-slate-400">No setup required · runs natively in your workspace</p>
        </div>
      </div>
    </section>
  );
}