import React, { useState } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '../lib/cn';

const FAQS = [
  {
    q: 'What am I seeing in the interactive preview?',
    a: 'The page uses sample conversations, messages, and tasks to illustrate a connected workspace. Email, meeting, and integration actions are simulated in the browser.',
  },
  {
    q: 'Does the preview send messages or book a meeting?',
    a: 'No. The preview does not send email, create calendar events, or connect to live service providers. Use the contact link to reach the team.',
  },
  {
    q: 'Where can I check current plan availability and controls?',
    a: <span>Plan availability differs by tier. <a href="/pricing" className="font-medium text-ink-soft underline decoration-border-strong underline-offset-4 transition-colors hover:text-brand-text">See the current plan comparison</a>, or contact the team about an enterprise evaluation.</span>,
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="divider-hairline bg-surface-soft/55 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <div className="mb-9 max-w-2xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.19em] text-brand-text">A few useful details</p>
          <h2 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-ink sm:text-[2.65rem]">
            Know what the preview does.
          </h2>
        </div>

        <div className="premium-card relative overflow-hidden rounded-[1.4rem] border bg-surface">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-[radial-gradient(ellipse_at_left,rgba(169,155,132,.09),transparent_72%)]" />
          <div className="relative flex items-center justify-between border-b border-border px-5 py-3.5 sm:px-7">
            <span className="font-mono text-[9px] font-medium tracking-[0.17em] text-ink-subtle">PREVIEW / FIELD NOTES</span>
            <span className="font-mono text-[9px] text-ink-subtle">03 ENTRIES</span>
          </div>
          <div className="relative divide-y divide-border px-5 sm:px-7">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const panelId = `faq-answer-${idx}`;

            return (
              <div key={faq.q} className="py-1">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left text-[13px] font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <span className="flex items-start gap-3"><span className="mt-0.5 font-mono text-[9px] text-ink-subtle">0{idx + 1}</span><span>{faq.q}</span></span>
                    <ChevronDown aria-hidden="true" className={cn('h-4 w-4 shrink-0 text-ink-subtle transition-transform duration-200', isOpen && 'rotate-180')} />
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen}>
                    <p className="max-w-3xl pb-5 pr-8 text-[13px] leading-6 text-ink-muted">{faq.a}</p>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-sm font-medium text-ink-soft">Need current product or security details?</h3>
            <p className="mt-1 text-[13px] leading-6 text-ink-muted">Ask the team before planning an evaluation.</p>
          </div>
          <a
            href="mailto:sales@ultrakin.com?subject=Ultrakin%20product%20questions"
            className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md text-sm font-medium text-ink-soft transition-colors hover:text-brand-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            Contact the team <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
