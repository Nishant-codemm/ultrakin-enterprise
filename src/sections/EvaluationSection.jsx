import React from 'react';
import { ArrowRight, Building2, Compass } from 'lucide-react';

const PATHS = [
  {
    icon: Compass,
    eyebrow: 'Explore the preview',
    title: 'See the workspace in action',
    description: 'Open the interactive workspace to explore the sample conversations, notes, and follow-up flows.',
    action: 'Open the workspace',
    href: '/workspace',
    external: false,
  },
  {
    icon: Building2,
    eyebrow: 'Plan for your team',
    title: 'Compare plans and controls',
    description: 'See how workspace, mailbox, agent, and admin capabilities vary by plan. Contact the team for a tailored enterprise evaluation.',
    action: 'View current plans',
    href: '/pricing',
    external: false,
  },
];

export default function EvaluationSection() {
  return (
    <section id="evaluation" className="divider-hairline bg-transparent py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.19em] text-indigo-200/80">
            Next steps
          </p>
          <h2 className="max-w-xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.65rem]">
            Choose how you want to explore Ultrakin.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-slate-400">
            Start with the workspace preview, compare current plans, or talk with the team about an enterprise evaluation.
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-y border-white/[0.07] md:grid-cols-2 md:gap-0">
          {PATHS.map(({ icon: Icon, eyebrow, title, description, action, href, external }) => (
            <article key={title} className="group flex flex-col py-7 first:pr-0 md:min-h-[270px] md:py-8 md:pr-10 md:even:border-l md:even:border-white/[0.07] md:even:pl-10">
              <Icon aria-hidden="true" className="h-[18px] w-[18px] text-slate-400 transition-colors duration-200 group-hover:text-indigo-200" />
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.17em] text-slate-500">{eyebrow}</p>
              <h3 className="mt-2 text-xl font-medium tracking-[-0.025em] text-white">{title}</h3>
              <p className="mt-3 max-w-lg flex-1 text-[13px] leading-6 text-slate-400">{description}</p>
              <a
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="mt-7 inline-flex min-h-10 w-fit items-center gap-2 rounded-md text-sm font-medium text-slate-300 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
              >
                {action}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
