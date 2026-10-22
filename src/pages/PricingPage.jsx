import React, { useState } from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';

const APP_URL = 'https://app.ultrakin.com';
const SALES_EMAIL = 'mailto:sales@ultrakin.com?subject=Ultrakin%20plan%20questions';

const plans = [
  {
    id: 'free', name: 'Free', price: { annual: 0, monthly: 0 }, period: 'forever',
    note: 'For small teams getting started.', button: 'Start free', href: APP_URL,
    features: ['Core tools: chat, meetings, calendar, tasks, and docs', 'Up to 10 users', 'Huddles up to 5 participants', 'Basic lists and 90-day history'],
  },
  {
    id: 'pro', name: 'Pro', price: { annual: 6, monthly: 8 }, period: 'per user / month',
    note: 'The full internal workspace for growing teams.', button: 'Start free trial', href: APP_URL, popular: true,
    features: ['Everything in Free', 'Unlimited users, history, and huddles', 'Full boards, docs, files, and events', 'Basic apps and agents', 'One workspace super agent'],
  },
  {
    id: 'business', name: 'Business', price: { annual: 12, monthly: 15 }, period: 'per user / month',
    note: 'Customer operations and team-wide controls.', button: 'Get Business', href: SALES_EMAIL,
    features: ['Everything in Pro', 'Shared mailboxes and email-to-task', 'Advanced agents and expanded MCP', 'SSO / IdP, roles, and audit logs', 'Priority support'],
  },
  {
    id: 'enterprise', name: 'Enterprise', custom: true, period: 'custom agreement',
    note: 'Governance and support for complex organizations.', button: 'Talk to sales', href: SALES_EMAIL,
    features: ['Everything in Business', 'Advanced SSO and SCIM provisioning', 'Custom retention and audit export', 'Dedicated support and SLA', 'Custom contracts and deployment controls'],
  },
];

const comparisonGroups = [
  { label: 'Collaboration', rows: [
    ['Users', 'Up to 10', 'Unlimited', 'Unlimited', 'Custom scale'],
    ['Chat spaces & channels', 'Included', 'Unlimited', 'Unlimited', 'Custom scale'],
    ['Message history', '90 days', 'Full history', 'Full history', 'Custom retention'],
    ['Huddles & meetings', 'Up to 5 people', 'Expanded', 'Expanded + customer-facing', 'Custom / SLA'],
    ['Events', 'Basic', 'Expanded', 'Org & customer events', 'Advanced controls'],
  ]},
  { label: 'Execution', rows: [
    ['Lists & board views', 'Basic list', 'Full lists & tasks', 'Mailbox & customer workflows', 'Advanced governance'],
    ['Documents', 'Limited', 'Full', 'Full + permissions', 'Advanced controls'],
    ['Files & storage', 'Limited', 'Team storage', 'Higher limits + mailbox files', 'Custom storage'],
  ]},
  { label: 'Customer operations', rows: [
    ['Shared mailboxes', '—', '—', '3 included, then per inbox', 'Custom'],
    ['Inbound & outbound email', '—', '—', 'Included', 'Included + governance'],
    ['Email to task', '—', '—', 'Included', 'Advanced / custom'],
  ]},
  { label: 'Intelligence & integrations', rows: [
    ['Agents', '—', 'Limited', 'Advanced', 'Custom / high volume'],
    ['Workspace super agent', '—', '1', 'Expanded / custom', 'Dedicated'],
    ['Apps', 'Limited', 'Basic apps', 'Expanded framework', 'Custom integrations'],
    ['MCP integrations', '—', 'Developer preview', 'Included / approved tools', 'Advanced controls'],
  ]},
  { label: 'Admin & security', rows: [
    ['SSO / identity provider', '—', '—', 'Included', 'Advanced SSO + SCIM'],
    ['Audit logs', '—', 'Basic (optional)', 'Included', 'Advanced export & retention'],
    ['Support', 'Email', 'Standard', 'Priority', 'Dedicated'],
  ]},
];

const faqs = [
  ['What does the Free plan include?', 'The Free plan includes core team tools, up to 10 users, huddles for up to five people, basic lists, and 90-day history.'],
  ['How is Pro or Business billed?', 'Pro and Business are priced per user each month. The annual rate is $6 per user for Pro and $12 for Business; monthly billing is $8 and $15 respectively.'],
  ['Does Business include shared mailboxes?', 'Business includes three shared mailboxes. Additional mailboxes are billed per inbox; contact the team for current mailbox pricing.'],
  ['Can we change plans later?', 'Start with Free and contact the team when your user, mailbox, identity, or governance needs change. They can help map the right plan.'],
  ['How is Enterprise priced?', 'Enterprise pricing is tailored to deployment, scale, governance, and support requirements. Talk with the Ultrakin team to scope it.'],
];

function Price({ plan, annual }) {
  if (plan.custom) return <span className="text-3xl font-semibold tracking-[-0.05em] text-white">Custom</span>;
  const price = plan.price[annual ? 'annual' : 'monthly'];
  return <span className="text-3xl font-semibold tracking-[-0.05em] text-white">${price}<span className="ml-1 text-xs font-normal tracking-normal text-slate-400">{price === 0 ? 'forever' : '/ user / mo'}</span></span>;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <div className="min-h-screen bg-[#080a10] pb-24 pt-28 text-white sm:pt-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-200/80">Plans that grow with your team</p>
          <h1 className="text-[clamp(2.8rem,6vw,5.25rem)] font-medium leading-[0.94] tracking-[-0.065em]">Start free.<br className="hidden sm:block" /> Scale when you’re ready.</h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400">Every plan brings the workday together. Add room for more people, customer operations, agents, and enterprise controls as your needs grow.</p>
          <div className="mt-7 inline-flex items-center gap-1 rounded-full border border-white/[0.09] bg-white/[0.025] p-1" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)} className={`rounded-full px-4 py-2 text-xs transition-colors ${annual ? 'bg-white text-[#11131a]' : 'text-slate-400 hover:text-white'}`}>Annual <span className="ml-1 text-[10px] opacity-70">Save ~25%</span></button>
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)} className={`rounded-full px-4 py-2 text-xs transition-colors ${!annual ? 'bg-white text-[#11131a]' : 'text-slate-400 hover:text-white'}`}>Monthly</button>
          </div>
        </header>

        <section aria-label="Pricing plans" className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.id} className={`relative flex flex-col rounded-2xl border p-5 ${plan.popular ? 'border-indigo-300/40 bg-[#15172a] shadow-[0_18px_48px_-32px_rgba(121,123,241,.5)]' : 'border-white/[0.085] bg-white/[0.025]'}`}>
              {plan.popular && <span className="absolute right-4 top-4 rounded-full bg-indigo-300/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-indigo-200">Most popular</span>}
              <p className="text-sm font-semibold text-white">{plan.name}</p>
              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-400">{plan.note}</p>
              <div className="mt-5 min-h-10"><Price plan={plan} annual={annual} /></div>
              {!plan.custom && plan.price.annual > 0 && <p className="mt-1 text-[10px] text-slate-400">Billed {annual ? 'annually' : 'monthly'}</p>}
              {plan.custom && <p className="mt-1 text-[10px] text-slate-400">Deployment, scale, and support tailored to you</p>}
              <a href={plan.href} target={plan.href.startsWith('mailto:') ? undefined : '_blank'} rel={plan.href.startsWith('mailto:') ? undefined : 'noreferrer'} className={`mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 ${plan.popular ? 'bg-[#7779ee] text-white hover:bg-[#8587f5]' : 'border border-white/[0.11] bg-white/[0.035] text-slate-100 hover:bg-white/[0.08]'}`}>{plan.button}<ArrowRight size={13} /></a>
              <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-5">
                {plan.features.map((feature) => <li key={feature} className="flex items-start gap-2 text-[11px] leading-[1.55] text-slate-400"><Check size={13} className="mt-0.5 shrink-0 text-indigo-200" />{feature}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section className="mt-24" aria-labelledby="comparison-heading">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div><p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">Plan comparison</p><h2 id="comparison-heading" className="text-2xl font-medium tracking-[-.04em] sm:text-3xl">A clear view of what’s included.</h2></div>
            <p className="max-w-xs text-xs leading-5 text-slate-400">All prices are USD per user, per month. Enterprise pricing is custom.</p>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full min-w-[780px] border-collapse text-left text-xs">
              <thead className="bg-white/[0.035]"><tr><th scope="col" className="w-[28%] px-4 py-4 font-medium text-slate-400">Capability</th>{plans.map((plan) => <th scope="col" key={plan.id} className="px-4 py-4 font-semibold text-slate-200">{plan.name}</th>)}</tr></thead>
              <tbody>{comparisonGroups.map((group) => <React.Fragment key={group.label}><tr className="border-t border-white/[0.09] bg-white/[0.02]"><th colSpan="5" scope="colgroup" className="px-4 py-3 font-mono text-[9px] font-medium uppercase tracking-[.16em] text-indigo-200/75">{group.label}</th></tr>{group.rows.map(([label, ...values]) => <tr key={label} className="border-t border-white/[0.055]"><th scope="row" className="px-4 py-3.5 font-normal text-slate-300">{label}</th>{values.map((value, index) => <td key={`${label}-${index}`} className={`px-4 py-3.5 ${value === '—' ? 'text-slate-700' : 'text-slate-400'}`}>{value === '—' ? <span className="inline-flex items-center gap-1"><Minus size={11} aria-hidden="true" /><span className="sr-only">Not included</span></span> : value}</td>)}</tr>)}</React.Fragment>)}</tbody>
            </table>
          </div>
          <p className="mt-3 text-[10px] leading-5 text-slate-400">Business includes three shared mailboxes; additional mailboxes are billed per inbox. Confirm current terms with the Ultrakin team.</p>
        </section>

        <section className="mx-auto mt-24 max-w-3xl" aria-labelledby="pricing-faq-heading">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-slate-500">A few details</p>
          <h2 id="pricing-faq-heading" className="mb-7 text-2xl font-medium tracking-[-.04em] sm:text-3xl">Pricing, answered.</h2>
          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">{faqs.map(([question, answer]) => <details key={question} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-medium text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"><span>{question}</span><span className="text-indigo-200 transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-5 pr-8 text-xs leading-6 text-slate-400">{answer}</p></details>)}</div>
        </section>

        <section className="mt-20 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 sm:flex-row sm:items-center sm:p-8">
          <div><p className="font-mono text-[9px] uppercase tracking-[.18em] text-indigo-200/75">Need a tailored plan?</p><h2 className="mt-2 text-xl font-medium tracking-[-.035em]">Let’s map Ultrakin to the way your team works.</h2></div>
          <a href={SALES_EMAIL} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg bg-white px-4 text-xs font-semibold text-[#11131a] transition-colors hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080a10]">Talk with sales<ArrowRight size={14} /></a>
        </section>
      </div>
    </div>
  );
}
