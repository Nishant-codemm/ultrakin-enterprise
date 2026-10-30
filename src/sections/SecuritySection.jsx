import React, { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, FileCheck2, Globe, KeyRound, Lock, MapPinned, Plus, Server, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/cn';
import { useReveal } from '../lib/useReveal';

/* ─── Reusable cursor-tracking 3D tilt ─── */
function TiltCard({ children, className, style, maxTilt = 9 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, on: false });

  const onMove = useCallback((e) => {
    if (reduceMotion) return;
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width  - 0.5;
    const dy = (e.clientY - r.top)  / r.height - 0.5;
    setT({ rx: -dy * maxTilt, ry: dx * maxTilt, gx: (dx + 0.5) * 100, gy: (dy + 0.5) * 100, on: true });
  }, [reduceMotion, maxTilt]);

  const onLeave = useCallback(() => setT({ rx: 0, ry: 0, gx: 50, gy: 50, on: false }), []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%', ...style }}
    >
      <div style={{
        transform: t.on
          ? `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(1.014)`
          : 'rotateX(0deg) rotateY(0deg) scale(1)',
        transition: t.on ? 'transform 90ms ease-out' : 'transform 500ms cubic-bezier(0.16,1,0.3,1)',
        transformOrigin: '50% 50%',
        willChange: 'transform',
        position: 'relative',
        borderRadius: 'inherit',
        height: '100%',
      }}>
        {children}
        {t.on && !reduceMotion && (
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none',
            background: `radial-gradient(circle at ${t.gx}% ${t.gy}%, rgba(165,180,252,0.09) 0%, transparent 58%)`,
            mixBlendMode: 'screen', zIndex: 10,
          }} />
        )}
      </div>
    </div>
  );
}

const TOPICS = [
  {
    id: 'assurance', number: '01', icon: FileCheck2,
    title: 'Assurance and compliance',
    description: 'Ask which reports, certifications, and contractual materials are currently available for your team\'s review.',
    badges: ['SOC 2 Type II', 'GDPR', 'DPA'],
  },
  {
    id: 'identity', number: '02', icon: KeyRound,
    title: 'Identity and access',
    description: 'Discuss SSO, SAML provisioning, role-based permissions, and administrative controls that fit your organisation.',
    badges: ['SSO / SAML', 'RBAC', 'Audit logs'],
  },
  {
    id: 'data', number: '03', icon: MapPinned,
    title: 'Data handling',
    description: 'Confirm hosting regions, retention windows, deletion guarantees, and backup behaviour for your deployment.',
    badges: ['Data residency', 'Retention', 'Deletion SLA'],
  },
];

export default function SecuritySection() {
  const [active, setActive] = useState('assurance');
  const [sectionRef, inView] = useReveal({ threshold: 0.12 });
  const reduceMotion = useReducedMotion();

  const complianceBadges = [
    { icon: ShieldCheck, label: 'SOC 2 Type II' },
    { icon: KeyRound, label: 'SSO / SAML' },
    { icon: Globe, label: 'GDPR Ready' },
    { icon: Lock, label: 'AES-256 Encryption' },
    { icon: FileCheck2, label: 'Audit Logs' },
    { icon: Server, label: 'Data Residency' },
  ];

  return (
    <section ref={sectionRef} id="security" className="relative overflow-hidden bg-transparent py-20 text-ink md:py-28">

      {/* Decorative ring */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-15rem] top-[-18rem] h-[42rem] w-[42rem] rounded-full border border-border/50" />
      {/* Ambient brand glow */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[-8rem] top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-brand/[0.04] blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:px-8">

        {/* ── Left: Copy with Scroll Entrance ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <p className="mb-6 flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle">
            <span className="h-px w-7 bg-brand" /> A straight conversation about trust
          </p>
          <h2 className="font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal leading-[1.02] tracking-[-0.035em] text-ink">
            Enterprise trust is<br /><span className="font-display italic text-brand-text">earned in the details.</span>
          </h2>
          <p className="mt-6 max-w-md text-[13px] leading-6 text-ink-muted">
            This preview does not include supporting security or compliance documents.
            Ask the Ultrakin team for current product details before making an evaluation decision.
          </p>

          {/* Compliance Badges Grid */}
          <div className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {complianceBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-[11px] font-medium text-ink-soft shadow-[0_2px_6px_rgba(0,0,0,0.02)]"
              >
                <Icon className="h-3.5 w-3.5 shrink-0 text-brand-text" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-ink-subtle">
            Compliance documentation available under NDA. Contact the team for current reports.
          </p>

          <a
            href="mailto:sales@ultrakin.com?subject=Ultrakin%20security%20and%20deployment%20questions"
            className="mt-6 inline-flex items-center gap-2 text-xs font-medium text-brand-text transition-colors hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
          >
            Ask about your requirements <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </motion.div>

        {/* ── Right: Accordion with TiltCard and Scroll Entrance ── */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
        <TiltCard maxTilt={5} className="rounded-2xl" style={{ borderRadius: '1rem' }}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-3 sm:p-4">
            {/* Inner ambient glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[radial-gradient(ellipse_at_left,rgba(169,155,132,.09),transparent_72%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-[radial-gradient(ellipse_at_right,rgba(100,100,255,.05),transparent_70%)]" />

            {TOPICS.map((topic) => {
              const isOpen = active === topic.id;
              const Icon = topic.icon;
              const panelId = `security-topic-${topic.id}`;
              return (
                <div
                  key={topic.id}
                  className={cn(
                    'relative rounded-xl border-b border-border last:border-b-0 transition-colors duration-300',
                    isOpen && 'bg-brand-soft/45',
                  )}
                >
                  {isOpen && (
                    <motion.span
                      layoutId="security-edge"
                      className="absolute bottom-3 left-0 top-3 w-px bg-gradient-to-b from-transparent via-brand/70 to-transparent"
                    />
                  )}
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={isOpen ? panelId : undefined}
                      onClick={() => setActive(isOpen ? null : topic.id)}
                      className="group flex min-h-[76px] w-full items-center gap-4 px-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus sm:gap-5 sm:px-4"
                    >
                      <span className={cn('w-7 font-mono text-[9px] transition-colors', isOpen ? 'text-brand-text' : 'text-ink-subtle')}>
                        {topic.number}
                      </span>
                      <Icon aria-hidden="true" className={cn('h-4 w-4 transition-colors', isOpen ? 'text-ink-soft' : 'text-ink-subtle group-hover:text-ink-muted')} />
                      <span className={cn('flex-1 text-[13px] font-medium transition-colors', isOpen ? 'text-ink' : 'text-ink-muted group-hover:text-ink-soft')}>
                        {topic.title}
                      </span>
                      <Plus aria-hidden="true" className={cn('h-4 w-4 text-ink-subtle transition-transform duration-200', isOpen && 'rotate-45 text-brand-text')} />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        key={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-14 sm:pl-[4.5rem]">
                          <p className="max-w-lg text-[12px] leading-6 text-ink-muted">{topic.description}</p>
                          {/* Inline badges for the open topic */}
                          <div className="mt-3 flex flex-wrap gap-2">
                            {topic.badges.map((b) => (
                              <span key={b} className="rounded-md border border-border bg-surface px-2 py-0.5 text-[10px] text-ink-subtle">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Bottom trust line */}
            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-[10px] text-ink-subtle">
              <Lock className="h-3 w-3" aria-hidden="true" />
              <span>Details shared under NDA on request · <a href="mailto:sales@ultrakin.com" className="text-brand-text hover:underline">Contact the team</a></span>
            </div>
          </div>
        </TiltCard>
        </motion.div>

      </div>
    </section>
  );
}
