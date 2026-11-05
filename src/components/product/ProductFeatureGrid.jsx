/**
 * ProductFeatureGrid.jsx
 * "What gets in the way, and what changes." — shared bottom section.
 * Shows problem/solution pairs in a 2-column grid.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { ULTRAKIN_EASE } from '../../lib/motion';

export default function ProductFeatureGrid({ features = [], productColor }) {
  if (!features.length) return null;

  return (
    <section className="mt-20 border-t border-[#e7e4de] pt-16 pb-20">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.025em] text-[#111827] mb-12">
          What gets in the way,<br />
          <span className="text-[#667085] font-normal">and what changes.</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.problem || i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: ULTRAKIN_EASE }}
              className="rounded-xl border border-[#e7e4de] bg-[#fafaf9] p-5"
            >
              {/* Problem */}
              <div className="flex items-start gap-3 mb-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 border border-red-100">
                  <X size={11} className="text-red-400" />
                </span>
                <p className="text-[13px] leading-5 text-[#667085] line-through decoration-[#d0cdc7]">
                  {f.problem}
                </p>
              </div>
              {/* Solution */}
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: productColor ? `${productColor}18` : '#f0fdf4', border: `1px solid ${productColor ? `${productColor}30` : '#bbf7d0'}` }}
                >
                  <Check size={11} style={{ color: productColor || '#059669' }} />
                </span>
                <p className="text-[13px] leading-5 text-[#111827] font-medium">
                  {f.solution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
