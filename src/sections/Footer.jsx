import React from 'react';
import UltrakinLogo from '../components/primitives/UltrakinLogo';

const LINKS = [
  { href: '/#workflows', label: 'Workflows' },
  { href: '/workspace', label: 'Workspace' },
  { href: '/agents', label: 'Agents' },
  { href: '/security', label: 'Security' },
  { href: '/pricing', label: 'Pricing' },
];

export default function Footer({ isHome = true }) {
  const textTheme = 'text-ink-muted';
  const titleTheme = 'text-ink';
  const hoverTheme = 'hover:text-ink';
  return (
    <footer className={`divider-hairline border-t border-border bg-surface py-10 sm:py-12 ${textTheme}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between lg:px-8">
        <div className="max-w-md">
          <a href={isHome ? '#hero' : '/'} className="inline-flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-300">
            <UltrakinLogo size={26} className="shrink-0" />
            <span className={`text-lg font-semibold tracking-tight ${titleTheme}`}>Ultrakin</span>
          </a>
          <p className={`mt-3 max-w-sm text-[13px] leading-6 ${textTheme}`}>
            Chat, mail, meetings, docs, tasks, and Ukin agents—together in one connected workspace.
          </p>
          <p className={`mt-3 text-[11px] tracking-wide ${textTheme}`}>Interactive preview · sample data · simulated services</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-3 text-[13px]">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={isHome && href.startsWith('/#') ? href.slice(1) : href} className={`rounded-sm transition-colors ${hoverTheme} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600`}>
              {label}
            </a>
          ))}
          <a href="mailto:sales@ultrakin.com" className={`rounded-sm transition-colors ${hoverTheme} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600`}>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
