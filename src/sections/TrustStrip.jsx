import React from 'react';

const STATS = [
  { value: '500+', label: 'teams onboarded' },
  { value: '2M+', label: 'messages threaded' },
  { value: '40+', label: 'countries active' },
];

const LOGOS = [
  'Acme Corp', 'Meridian', 'Helix Labs', 'Nordvik', 'Crestline', 'Vertex IO',
  'Acme Corp', 'Meridian', 'Helix Labs', 'Nordvik', 'Crestline', 'Vertex IO',
];

export default function TrustStrip() {
  return (
    <div className="border-b border-border bg-surface/50 py-6">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Label */}
        <p className="mb-5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-ink-subtle select-none">
          Trusted by teams that move fast
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-16">
          {STATS.map((stat, index) => (
            <React.Fragment key={stat.label}>
              <div className="flex flex-col items-center gap-0.5 select-none">
                <span className="text-[1.6rem] font-semibold leading-none tracking-[-0.04em] text-ink">
                  {stat.value}
                </span>
                <span className="text-[11px] text-ink-muted">{stat.label}</span>
              </div>
              {index < STATS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden h-8 w-px bg-border-strong/60 sm:block"
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Logo marquee — scrolling company names */}
        <div className="relative mt-6 overflow-hidden">
          {/* Left fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-surface/50 to-transparent"
          />
          {/* Right fade */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-surface/50 to-transparent"
          />
          <div className="animate-marquee" aria-hidden="true">
            {LOGOS.map((name, i) => (
              <span
                key={i}
                className="mx-8 shrink-0 text-[13px] font-semibold tracking-tight text-ink-muted opacity-40 select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
