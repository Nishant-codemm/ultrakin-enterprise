import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useReveal } from '../lib/useReveal';
import { getSectionHeaderMotion } from '../lib/motion';

const METRICS = [
  { target: 500, from: 0, decimals: 0, prefix: '', suffix: '+', display: '500+', label: 'engineering & product teams' },
  { target: 2.4, from: 0.0, decimals: 1, prefix: '', suffix: 'M+', display: '2.4M+', label: 'connected signals processed' },
  { target: 99.98, from: 95.0, decimals: 2, prefix: '', suffix: '%', display: '99.98%', label: 'verified platform uptime' },
];

function AnimatedCounter({ target, from = 0, decimals = 0, prefix = '', suffix = '', display, inView, reduceMotion }) {
  const [val, setVal] = useState(from);

  useEffect(() => {
    if (reduceMotion || !inView) return;

    let startTimestamp = null;
    const duration = 1400; // ms
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = from + ease * (target - from);
      setVal(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [inView, reduceMotion, target, from]);

  if (reduceMotion || !inView) {
    return <span>{display || `${prefix}${target}${suffix}`}</span>;
  }

  const formatted = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
  return <span>{prefix}{formatted}{suffix}</span>;
}

function VortexWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 3.2L18 8.8v6.4l-6 3.6-6-3.6V8.8l6-3.6z" />
        <path d="M12 9l3 2v4l-3 2-3-2v-4l3-2z" />
      </svg>
      <span className="font-mono text-xs font-bold tracking-[0.18em]">VORTEX</span>
    </div>
  );
}

function MeridianWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14.5 14.5 0 0 0 0 18M12 3a14.5 14.5 0 0 1 0 18M3 12h18" strokeWidth="1.8" />
      </svg>
      <span className="text-[13px] font-semibold tracking-wider font-sans">MERIDIAN</span>
    </div>
  );
}

function SynthetixWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="M12 8l-6 7h12l-6-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="font-mono text-xs font-semibold tracking-[0.16em]">SYNTHETIX</span>
    </div>
  );
}

function NordvikWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M4 4h4v16H4V4zm6 8l8-8v16l-8-8z" />
      </svg>
      <span className="text-[13px] font-bold tracking-[0.14em]">NORDVIK</span>
    </div>
  );
}

function CrestlineWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 18l5-8 4 5 4-7 5 10H3z" />
      </svg>
      <span className="text-[13px] font-semibold tracking-[0.15em] font-sans">CRESTLINE</span>
    </div>
  );
}

function HelixLabsWordmark({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
        <path d="M6 3c6 3 6 15 12 18M18 3C12 6 12 18 6 21M7 7h10M6 12h12M7 17h10" />
      </svg>
      <span className="font-mono text-xs font-medium tracking-[0.14em]">HELIX.LABS</span>
    </div>
  );
}

const BRAND_LOGOS = [
  { id: 'vortex', component: VortexWordmark },
  { id: 'meridian', component: MeridianWordmark },
  { id: 'synthetix', component: SynthetixWordmark },
  { id: 'nordvik', component: NordvikWordmark },
  { id: 'crestline', component: CrestlineWordmark },
  { id: 'helix', component: HelixLabsWordmark },
];

export default function TrustStrip() {
  const [sectionRef, inView] = useReveal({ threshold: 0.15 });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      aria-label="Customer trust and performance metrics"
      className="divider-hairline border-b border-border/50 bg-surface-raised/40 py-8"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div {...getSectionHeaderMotion(inView, reduceMotion)}>
          {/* Section Eyebrow */}
          <p className="mb-6 text-center font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-ink-subtle select-none">
            Trusted across mission-critical engineering, data & operations workflows
          </p>

          {/* Verified Performance Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
            {METRICS.map((metric, index) => (
              <React.Fragment key={metric.label}>
                <div className="flex flex-col items-center gap-1 select-none">
                  <span className="font-display text-[1.8rem] font-normal leading-none tracking-[-0.04em] text-ink tabular-nums">
                    <AnimatedCounter
                      target={metric.target}
                      from={metric.from}
                      decimals={metric.decimals}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      display={metric.display}
                      inView={inView}
                      reduceMotion={reduceMotion}
                    />
                  </span>
                  <span className="text-[11px] font-medium text-ink-muted">{metric.label}</span>
                </div>
                {index < METRICS.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden h-9 w-px bg-border-strong/50 sm:block"
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Marquee with real SVG Wordmarks */}
          <div className="relative mt-8 overflow-hidden">
            {/* Gradient Edges for smooth fade */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-page to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-page to-transparent"
            />

            <div className="animate-marquee flex items-center py-2">
              {/* Primary Track */}
              <div className="flex shrink-0 items-center justify-around gap-12 sm:gap-16 pr-12 sm:pr-16" role="list" aria-label="Partner organizations">
                {BRAND_LOGOS.map(({ id, component: Wordmark }) => (
                  <div key={id} role="listitem" className="text-ink-muted/50 transition-colors duration-200 hover:text-ink">
                    <Wordmark />
                  </div>
                ))}
              </div>

              {/* Seamless Loop Duplicate Track */}
              <div className="flex shrink-0 items-center justify-around gap-12 sm:gap-16 pr-12 sm:pr-16" aria-hidden="true">
                {BRAND_LOGOS.map(({ id, component: Wordmark }) => (
                  <div key={`dup-${id}`} className="text-ink-muted/50 transition-colors duration-200 hover:text-ink">
                    <Wordmark />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
