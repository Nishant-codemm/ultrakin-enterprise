import React from 'react';
import { cn } from '../lib/cn';

const LOGOS = [
  { name: 'Stripe', font: 'font-bold tracking-tight text-lg' },
  { name: 'Vercel', font: 'font-semibold tracking-widest uppercase text-xs' },
  { name: 'Linear', font: 'font-semibold tracking-tight text-base' },
  { name: 'Rivian', font: 'font-bold tracking-wider uppercase text-sm' },
  { name: 'Spotify', font: 'font-bold tracking-tight text-base' },
  { name: 'OpenAI', font: 'font-semibold tracking-wider uppercase text-xs' },
  { name: 'Notion', font: 'font-medium tracking-tight text-base' },
  { name: 'Datadog', font: 'font-bold tracking-tight text-base' },
  { name: 'Ramp', font: 'font-bold tracking-wider uppercase text-xs' },
  { name: 'Scale AI', font: 'font-semibold tracking-tight text-base' },
  { name: 'Figma', font: 'font-bold tracking-tight text-base' },
  { name: 'Retool', font: 'font-semibold tracking-tight text-base' },
];

function LogoItem({ item }) {
  return (
    <div className="flex items-center justify-center px-8 py-3 select-none">
      <span
        className={cn(
          'text-slate-500 transition-colors duration-200 hover:text-white cursor-default',
          item.font
        )}
      >
        {item.name}
      </span>
    </div>
  );
}

export default function LogoBar() {
  const all = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="border-y border-white/6 bg-[#07090E] py-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-5 text-center">
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500">
          TRUSTED BY HIGH-VELOCITY ENGINEERING TEAMS &amp; SCALE-UPS
        </p>
      </div>

      <div className="relative overflow-hidden w-full">
        {/* Soft edge feather gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#07090E] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#07090E] to-transparent" />

        <div className="animate-marquee flex items-center">
          {all.map((item, i) => (
            <LogoItem key={`${item.name}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
