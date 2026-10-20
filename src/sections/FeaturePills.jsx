import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AtSign,
  BotMessageSquare,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Files,
  FolderOpen,
  Hash,
  Inbox,
  Mail,
  MessageSquare,
  Paperclip,
  Plus,
  Search,
  Send,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { cn } from '../lib/cn'

/* ─── Section data ───────────────────────────────────────────── */
const PILLS = [
  {
    id: 'chat',
    label: 'Chat',
    icon: MessageSquare,
    tagline: 'Where your team thinks out loud.',
    description:
      'Spaces, threads, and DMs that stay in context. Mention Ukin in any message and it turns conversations into action — no copy-paste, no task manager ping, no lost follow-ups.',
    benefits: [
      'Threaded Spaces keep topics focused across teams',
      'AI summarises any thread you missed while away',
      'One @mention turns a chat into a tracked task',
    ],
    accent: 'indigo',
  },
  {
    id: 'docs',
    label: 'Docs',
    icon: FileText,
    tagline: 'Knowledge that stays alive.',
    description:
      'Rich documents that live where the work happens. Ukin writes first drafts, suggests edits in context, and links every doc to the task or thread that created it.',
    benefits: [
      'AI drafts from meeting notes, threads, or a prompt',
      'Inline suggestions with one-click accept / rewrite',
      'Every doc is bidirectionally linked to its origin task',
    ],
    accent: 'violet',
  },
  {
    id: 'files',
    label: 'Files',
    icon: Files,
    tagline: 'One place for everything your team makes.',
    description:
      'All your files, organised by the work they belong to — not by who uploaded them last. Search across content, not just filenames.',
    benefits: [
      'Full-text search across PDFs, decks, and spreadsheets',
      'Automatic version history with no manual saves',
      'Files attached to tasks surface at the right moment',
    ],
    accent: 'cyan',
  },
  {
    id: 'mail',
    label: 'Mail',
    icon: Mail,
    tagline: 'Your inbox. Finally intelligent.',
    description:
      'A real email address on your domain, triage by AI, and threads that convert to tasks in one click. Mail isn\'t a separate app — it\'s part of the workspace loop.',
    benefits: [
      'Ukin triages, labels, and summarises overnight',
      'Reply in thread or convert to a tracked task instantly',
      'Shared team inboxes for support, sales, or ops',
    ],
    accent: 'emerald',
  },
  {
    id: 'ai',
    label: 'AI Agents',
    icon: BotMessageSquare,
    tagline: 'Your team, augmented.',
    description:
      'Purpose-built agents that run across every surface — not a chatbot you open separately. Scribe captures meetings, Sentinel watches deadlines, Connector syncs tools. Build your own in minutes.',
    benefits: [
      'Pre-built agents for meetings, contracts, and CRM sync',
      'Custom agents from natural-language workflow descriptions',
      'Agents share context across Chat, Mail, Docs, and Files',
    ],
    accent: 'amber',
  },
]

const ACCENT = {
  indigo: {
    pill: 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40',
    dot: 'bg-indigo-400',
    badge: 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20',
    glow: 'shadow-[0_0_40px_rgba(99,102,241,0.15)]',
    check: 'text-indigo-400',
    border: 'border-indigo-500/20',
    tag: 'text-indigo-400',
  },
  violet: {
    pill: 'bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/40',
    dot: 'bg-violet-400',
    badge: 'bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20',
    glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
    check: 'text-violet-400',
    border: 'border-violet-500/20',
    tag: 'text-violet-400',
  },
  cyan: {
    pill: 'bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/40',
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.12)]',
    check: 'text-cyan-400',
    border: 'border-cyan-500/20',
    tag: 'text-cyan-400',
  },
  emerald: {
    pill: 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40',
    dot: 'bg-emerald-400',
    badge: 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
    glow: 'shadow-[0_0_40px_rgba(74,222,128,0.10)]',
    check: 'text-emerald-400',
    border: 'border-emerald-500/20',
    tag: 'text-emerald-400',
  },
  amber: {
    pill: 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-500/40',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
    glow: 'shadow-[0_0_40px_rgba(251,191,36,0.15)]',
    check: 'text-amber-400',
    border: 'border-amber-500/20',
    tag: 'text-amber-400',
  },
}

/* ═══ CHAT PANEL ════════════════════════════════════════════════ */
const CHANNELS = ['# general', '# q3-finance', '# eng-infra', '# design-reviews']
const CHAT_THREAD = [
  {
    who: 'Priya M.', color: 'from-violet-500 to-purple-600',
    time: '10:12 AM',
    text: 'Anyone free to pair on the login flow issue? I\'ve hit a weird edge case with SSO tokens.',
  },
  {
    who: 'Raj K.', color: 'from-cyan-500 to-blue-600',
    time: '10:14 AM',
    text: 'On it — @ukin can you pull the last 3 error reports from #eng-infra and summarise them here?',
  },
  {
    who: 'Ukin AI', color: 'from-amber-400 to-orange-500', isAI: true,
    time: '10:14 AM',
    text: null,
    summary: {
      title: 'Last 3 SSO errors from #eng-infra',
      items: [
        'Token expiry mismatch — Oct 18, 14 affected sessions',
        'PKCE flow regression in v2.4.1 — flagged by Sentinel',
        'Redirect URI whitelist stale — updated 2h ago by @devops',
      ],
      cta: 'Task created: Fix PKCE regression → assigned to Raj K.',
    },
  },
]

function ChatMockup({ a }) {
  return (
    <div className="flex h-full overflow-hidden rounded-xl">
      {/* Sidebar */}
      <div className="w-44 flex-shrink-0 border-r border-white/[0.05] bg-[#080b14] flex flex-col p-3 gap-1">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Spaces</div>
        {CHANNELS.map((ch, i) => (
          <div key={ch} className={cn(
            'flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors cursor-pointer',
            i === 1 ? `${ACCENT[a].badge} font-semibold` : 'text-slate-500 hover:bg-white/[0.04] hover:text-slate-400'
          )}>
            <Hash className="h-3 w-3 flex-shrink-0" />
            {ch.replace('# ', '')}
            {i === 1 && <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">3</span>}
          </div>
        ))}
        <div className="mt-4 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Direct</div>
        {['Priya M.', 'Raj K.'].map((name) => (
          <div key={name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-slate-500 hover:bg-white/[0.04] hover:text-slate-400 cursor-pointer">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80]" />
            {name}
          </div>
        ))}
      </div>

      {/* Main thread */}
      <div className="flex flex-1 flex-col bg-[#0d1117]">
        <div className={cn('flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5')}>
          <Hash className={cn('h-4 w-4', ACCENT[a].tag)} />
          <span className="text-sm font-semibold text-slate-200">eng-infra</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
            <Users className="h-3 w-3" /> 8 members
          </span>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {CHAT_THREAD.map((msg, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <div className={cn('h-7 w-7 rounded-full bg-gradient-to-br flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0', msg.color,
                msg.isAI && 'ring-1 ring-amber-400/40 shadow-[0_0_8px_rgba(251,191,36,0.25)]')}>
                {msg.isAI ? <Sparkles className="h-3 w-3" /> : msg.who.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-xs font-semibold', msg.isAI ? 'text-amber-400' : 'text-slate-200')}>{msg.who}</span>
                  {msg.isAI && <span className="rounded-full bg-amber-400/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">AI</span>}
                  <span className="text-[10px] text-slate-600">{msg.time}</span>
                </div>
                {msg.text && <p className="text-xs leading-relaxed text-slate-300">{msg.text}</p>}
                {msg.summary && (
                  <div className={cn('mt-1.5 rounded-xl border p-3', ACCENT[a].border, 'bg-amber-400/[0.04]')}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      <span className="text-[11px] font-semibold text-amber-300">{msg.summary.title}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {msg.summary.items.map((it, ii) => (
                        <li key={ii} className="flex items-start gap-2">
                          <ChevronRight className="h-3 w-3 flex-shrink-0 mt-0.5 text-slate-600" />
                          <span className="text-[11px] leading-snug text-slate-400">{it}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={cn('flex items-center gap-2 rounded-lg px-2.5 py-2', ACCENT[a].badge)}>
                      <CheckCircle2 className="h-3 w-3" />
                      <span className="text-[11px] font-semibold">{msg.summary.cta}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] p-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]">
            <AtSign className="h-3.5 w-3.5 text-slate-600" />
            <span className="flex-1 text-xs text-slate-600">Message #eng-infra or @ukin to summarise…</span>
            <Send className="h-3.5 w-3.5 text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ DOCS PANEL ════════════════════════════════════════════════ */
const CURSORS = [
  { name: 'Priya', color: '#6366f1', top: '18%', left: '55%' },
  { name: 'Raj', color: '#22d3ee', top: '40%', left: '70%' },
]

function DocsMockup({ a }) {
  return (
    <div className="flex h-full overflow-hidden rounded-xl bg-[#0d1117]">
      {/* Doc sidebar */}
      <div className="w-40 flex-shrink-0 border-r border-white/[0.05] bg-[#080b14] flex flex-col p-3 gap-1">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Docs</div>
        {['Q3 Board Deck', 'Product Roadmap', 'Onboarding Guide', 'API Reference'].map((d, i) => (
          <div key={d} className={cn(
            'rounded-lg px-2 py-2 text-xs cursor-pointer flex items-start gap-2',
            i === 0 ? `${ACCENT[a].badge} font-semibold` : 'text-slate-500 hover:bg-white/[0.04]'
          )}>
            <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" /> {d}
          </div>
        ))}
        <div className="mt-4 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Recent</div>
        {['Competitive Brief v2', 'Sprint 12 Retro'].map((d) => (
          <div key={d} className="rounded-lg px-2 py-2 text-xs text-slate-600 hover:bg-white/[0.04] cursor-pointer flex items-start gap-2">
            <Clock className="h-3 w-3 mt-0.5 flex-shrink-0" /> {d}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="relative flex-1 overflow-hidden">
        {/* Collaborative cursors */}
        {CURSORS.map((c) => (
          <div key={c.name} className="pointer-events-none absolute z-20" style={{ top: c.top, left: c.left }}>
            <div className="h-4 w-0.5 rounded-full" style={{ background: c.color }} />
            <div className="mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-semibold text-white" style={{ background: c.color }}>{c.name}</div>
          </div>
        ))}

        <div className="h-full overflow-y-auto px-6 py-5">
          <div className="mb-1 text-[10px] font-mono uppercase tracking-widest text-slate-600">Board Presentation · Q3 2026</div>
          <div className="mb-4 h-px bg-white/[0.05]" />
          <h2 className="mb-3 text-xl font-bold tracking-tight text-slate-100">Q3 Business Review</h2>
          <p className="mb-4 text-sm leading-relaxed text-slate-400">
            Revenue grew <span className="font-semibold text-emerald-400">24% year-over-year</span>, exceeding targets by $1.2M across all enterprise segments. Three strategic initiatives accelerated adoption.
          </p>

          {/* AI suggestion block */}
          <div className={cn('mb-4 rounded-xl border p-3', ACCENT[a].border, 'bg-violet-500/[0.04]')}>
            <div className="mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300">Ukin suggestion</span>
              <span className="ml-auto text-[10px] text-slate-600">based on Competitive Brief v2</span>
            </div>
            <p className="mb-2.5 text-xs leading-relaxed text-slate-400">
              "Add a market comparison table here — I found positioning data from your last three research docs."
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg bg-violet-500/20 px-3 py-1.5 text-[11px] font-semibold text-violet-300 hover:bg-violet-500/30 transition-colors">Accept & insert</button>
              <button className="rounded-lg px-3 py-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition-colors">Dismiss</button>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-1">
            {['Executive Summary', 'Revenue Breakdown', 'Product Roadmap Q4', 'Risk Register', 'Board Ask'].map((s, i) => (
              <div key={s} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-white/[0.03] cursor-pointer group">
                <span className="font-mono text-[10px] text-slate-700">{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-sm text-slate-400 group-hover:text-slate-200 transition-colors">{s}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-700 group-hover:text-slate-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ FILES PANEL ═══════════════════════════════════════════════ */
const FOLDERS = ['Q3 Finance', 'Design Assets', 'Engineering', 'Legal Contracts', 'Marketing']
const FILE_LIST = [
  { name: 'Q3_Board_Deck_v4.pdf', size: '4.2 MB', type: 'PDF', when: 'Today, 10:09', icon: '📄', modified: 'Priya M.' },
  { name: 'Revenue_Model.xlsx', size: '892 KB', type: 'Sheet', when: 'Yesterday', icon: '📊', modified: 'Raj K.' },
  { name: 'Brand_v3.fig', size: '38 MB', type: 'Figma', when: 'Oct 18', icon: '🎨', modified: 'Design' },
  { name: 'SOC2_Audit_2026.pdf', size: '1.1 MB', type: 'PDF', when: 'Oct 16', icon: '🔒', modified: 'Legal' },
]

function FilesMockup({ a }) {
  return (
    <div className="flex h-full overflow-hidden rounded-xl">
      {/* Folder sidebar */}
      <div className="w-40 flex-shrink-0 border-r border-white/[0.05] bg-[#080b14] flex flex-col p-3 gap-1">
        <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">Workspace</div>
        {FOLDERS.map((f, i) => (
          <div key={f} className={cn(
            'flex items-center gap-2 rounded-lg px-2 py-2 text-xs cursor-pointer',
            i === 0 ? `${ACCENT[a].badge} font-semibold` : 'text-slate-500 hover:bg-white/[0.04]'
          )}>
            <FolderOpen className="h-3 w-3 flex-shrink-0" /> {f}
          </div>
        ))}
      </div>

      {/* File browser */}
      <div className="flex flex-1 flex-col bg-[#0d1117]">
        <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
          <Files className={cn('h-4 w-4', ACCENT[a].tag)} />
          <span className="text-sm font-semibold text-slate-200">Q3 Finance</span>
          <div className="ml-auto flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5 ring-1 ring-white/[0.06]">
            <Search className="h-3 w-3 text-slate-600" />
            <span className="text-xs text-slate-600">Search files…</span>
          </div>
        </div>

        {/* Storage bar */}
        <div className="border-b border-white/[0.04] px-4 py-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[10px] text-slate-600">Storage</span>
            <span className="text-[10px] font-medium text-slate-400">48.6 / 100 GB</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
            <div className={cn('h-full rounded-full', 'bg-gradient-to-r from-cyan-500 to-indigo-500')} style={{ width: '48.6%' }} />
          </div>
        </div>

        {/* Column headers */}
        <div className="flex items-center gap-3 border-b border-white/[0.04] px-4 py-2">
          {['Name', 'Modified by', 'Size', 'Date'].map(h => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-wider text-slate-700 first:flex-1">{h}</span>
          ))}
        </div>

        {/* Files */}
        <div className="flex-1 overflow-y-auto">
          {FILE_LIST.map((f, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-white/[0.03] px-4 py-2.5 hover:bg-white/[0.03] cursor-pointer group transition-colors">
              <span className="text-base">{f.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-300 truncate group-hover:text-slate-100 transition-colors">{f.name}</div>
              </div>
              <span className="text-[11px] text-slate-600 w-16 text-right">{f.modified}</span>
              <span className="text-[11px] text-slate-600 w-14 text-right">{f.size}</span>
              <span className="text-[10px] text-slate-600 w-16 text-right">{f.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══ MAIL PANEL ════════════════════════════════════════════════ */
const MAILS = [
  { from: 'Priya Mehta', subject: 'Contract renewal — sign-off needed', preview: 'Hi, the Acme renewal is 14 days out. Ukin has drafted the update memo…', time: '10:44 AM', unread: true, tag: '🔴 Urgent' },
  { from: 'Ukin AI', subject: 'Weekly digest — 3 items need you', preview: '7 threads summarised · 2 contracts expiring · 1 stalled project flagged by Sentinel.', time: 'Yesterday', unread: false, tag: '✨ AI digest' },
  { from: 'Board Alerts', subject: 'Q3 deck approved ✅', preview: 'The Q3 Board Deck has been approved and distributed to all execs.', time: 'Oct 18', unread: false, tag: '✅ Done' },
  { from: 'Raj Kumar', subject: 'PKCE regression — hotfix merged', preview: 'Hey, shipped the fix. Sentinel confirmed no new errors in the last 2h.', time: 'Oct 18', unread: false, tag: null },
]

function MailMockup({ a }) {
  const [selected, setSelected] = useState(0)
  const selectedMail = MAILS[selected]
  return (
    <div className="flex h-full overflow-hidden rounded-xl">
      {/* Inbox list */}
      <div className="w-56 flex-shrink-0 border-r border-white/[0.05] bg-[#080b14] flex flex-col">
        <div className="flex items-center gap-2 border-b border-white/[0.05] px-3 py-2.5">
          <Inbox className={cn('h-4 w-4', ACCENT[a].tag)} />
          <span className="text-sm font-semibold text-slate-200">Inbox</span>
          <span className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">1</span>
        </div>
        {/* AI triage strip */}
        <div className="flex items-center gap-1.5 border-b border-amber-400/10 bg-amber-400/[0.04] px-3 py-2">
          <Sparkles className="h-3 w-3 text-amber-400 flex-shrink-0" />
          <span className="text-[10px] text-slate-500">Ukin triaged <span className="font-medium text-slate-300">14</span> · 3 → tasks</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MAILS.map((m, i) => (
            <div key={i} onClick={() => setSelected(i)}
              className={cn('cursor-pointer border-b border-white/[0.04] px-3 py-3 transition-colors',
                i === selected ? 'bg-indigo-500/[0.07]' : 'hover:bg-white/[0.03]'
              )}>
              <div className="flex items-center justify-between mb-0.5">
                <span className={cn('text-xs font-semibold', m.unread ? 'text-slate-100' : 'text-slate-400')}>{m.from}</span>
                <span className="text-[10px] text-slate-700">{m.time}</span>
              </div>
              <div className={cn('text-xs mb-1 truncate', m.unread ? 'font-medium text-slate-200' : 'text-slate-400')}>{m.subject}</div>
              {m.tag && <span className="text-[10px] text-slate-600">{m.tag}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Mail reader */}
      <div className="flex flex-1 flex-col bg-[#0d1117]">
        <div className="border-b border-white/[0.05] px-5 py-3.5">
          <div className="text-sm font-semibold text-slate-200 mb-1">{selectedMail.subject}</div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>From: <span className="text-slate-300">{selectedMail.from}</span></span>
            <span>·</span>
            <span>To: <span className="text-slate-300">team@acme.ukin</span></span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-slate-400">{selectedMail.preview}</p>
          {selected === 0 && (
            <div className={cn('mt-4 rounded-xl border p-3', ACCENT[a].border, 'bg-emerald-500/[0.04]')}>
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">Ukin drafted update memo</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 mb-3">
                "I've prepared the contract renewal memo with updated terms based on the Acme account history. Ready to send — or reply here and I'll thread it."
              </p>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors">
                  <Send className="h-3 w-3" /> Send draft
                </button>
                <button className="flex items-center gap-1.5 rounded-lg bg-indigo-500/20 px-3 py-1.5 text-[11px] font-semibold text-indigo-300 hover:bg-indigo-500/30 transition-colors">
                  <CheckCircle2 className="h-3 w-3" /> Convert to task
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-white/[0.05] p-3">
          <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.06]">
            <span className="flex-1 text-xs text-slate-600">Reply or @mention Ukin to summarise this thread…</span>
            <Paperclip className="h-3.5 w-3.5 text-slate-700" />
            <Send className="h-3.5 w-3.5 text-slate-700" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ AI AGENTS PANEL ═══════════════════════════════════════════ */
const AGENTS = [
  {
    name: 'Scribe', color: 'from-amber-400 to-orange-500',
    desc: 'Meeting summariser & task extractor',
    status: 'Running', statusColor: 'text-emerald-400',
    dot: 'bg-emerald-400',
    stats: [{ label: 'Meetings captured', val: '142' }, { label: 'Tasks created', val: '489' }],
    log: 'Just summarised "Q4 Planning — 43 min" → 6 tasks created',
  },
  {
    name: 'Sentinel', color: 'from-violet-500 to-purple-600',
    desc: 'Contract & deadline watchdog',
    status: 'Watching', statusColor: 'text-violet-400',
    dot: 'bg-violet-400',
    stats: [{ label: 'Items monitored', val: '38' }, { label: 'Alerts sent', val: '12' }],
    log: 'Acme renewal — 14 days remaining · memo drafted',
  },
  {
    name: 'Connector', color: 'from-cyan-400 to-blue-500',
    desc: 'CRM & calendar sync agent',
    status: 'Active', statusColor: 'text-cyan-400',
    dot: 'bg-cyan-400',
    stats: [{ label: 'Syncs today', val: '291' }, { label: 'Tools connected', val: '7' }],
    log: 'Salesforce → Ultrakin: 3 deals updated, 1 stale opp flagged',
  },
]

function AIMockup({ a }) {
  return (
    <div className="flex h-full flex-col bg-[#0d1117] rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-2.5">
        <BotMessageSquare className={cn('h-4 w-4', ACCENT[a].tag)} />
        <span className="text-sm font-semibold text-slate-200">AI Agents</span>
        <span className="ml-2 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">3 active</span>
        <button className="ml-auto flex items-center gap-1 rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-[11px] font-semibold text-amber-400 ring-1 ring-amber-400/20 hover:bg-amber-500/25 transition-colors">
          <Plus className="h-3 w-3" /> New agent
        </button>
      </div>

      {/* Agent cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {AGENTS.map((ag) => (
          <div key={ag.name} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer">
            <div className="flex items-start gap-3">
              <div className={cn('flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white', ag.color)}>
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold text-slate-200">{ag.name}</span>
                  <div className="flex items-center gap-1.5">
                    <motion.span className={cn('h-1.5 w-1.5 rounded-full', ag.dot)}
                      animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                    <span className={cn('text-[10px] font-medium', ag.statusColor)}>{ag.status}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mb-2">{ag.desc}</p>
                <div className="flex items-center gap-4 mb-2.5">
                  {ag.stats.map(s => (
                    <div key={s.label}>
                      <div className="text-sm font-bold text-slate-200">{s.val}</div>
                      <div className="text-[10px] text-slate-600">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.04] px-2.5 py-1.5">
                  <Zap className="h-3 w-3 text-slate-600 flex-shrink-0" />
                  <span className="text-[11px] leading-snug text-slate-500">{ag.log}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Create prompt */}
        <div className="rounded-xl border border-dashed border-white/[0.07] bg-white/[0.01] p-3.5">
          <div className="flex items-center gap-2 mb-2">
            <Plus className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400">Describe a workflow, Ukin builds the agent</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 ring-1 ring-white/[0.06]">
            <span className="flex-1 text-xs text-slate-600">"Alert me when any contract is 30 days from expiry…"</span>
            <Send className="h-3 w-3 text-slate-700" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══ PANEL SWITCH MAP ══════════════════════════════════════════ */
function PanelContent({ id, accent }) {
  switch (id) {
    case 'chat': return <ChatMockup a={accent} />
    case 'docs': return <DocsMockup a={accent} />
    case 'files': return <FilesMockup a={accent} />
    case 'mail': return <MailMockup a={accent} />
    case 'ai': return <AIMockup a={accent} />
    default: return null
  }
}

/* ═══ MAIN EXPORT ═══════════════════════════════════════════════ */
export default function FeaturePills() {
  const [active, setActive] = useState(PILLS[0].id)
  const pill = PILLS.find((p) => p.id === active)
  const a = ACCENT[pill.accent]

  return (
    <section className="relative overflow-hidden bg-[#080b14] py-20 md:py-28">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(800px 500px at 50% 20%, rgba(99,102,241,0.07), transparent 70%)' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Everything in one place</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl md:text-5xl">
            Six tools. One workspace.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Zero switching.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400 text-lg">
            Every surface talks to every other. What you write in Docs connects to your task. What you receive in Mail becomes a thread. Your agents work across all of it.
          </p>
        </div>

        {/* Pill tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {PILLS.map(({ id, label, icon: Icon, accent: pillAccent }) => {
            const isActive = id === active
            const pA = ACCENT[pillAccent]
            return (
              <button key={id} onClick={() => setActive(id)}
                className={cn(
                  'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200',
                  isActive ? pA.pill : 'text-slate-500 hover:bg-white/[0.05] hover:text-slate-300',
                )}
              >
                {isActive && (
                  <motion.span layoutId="pill-bg" className="absolute inset-0 rounded-full"
                    style={{ background: id === 'ai' ? 'rgba(251,191,36,0.06)' : undefined }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }} />
                )}
                <Icon className="relative h-3.5 w-3.5" />
                <span className="relative">{label}</span>
                {id === 'ai' && (
                  <span className="relative rounded-full bg-amber-400/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    New
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Main content — split layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10 items-start">
          {/* Left: copy */}
          <AnimatePresence mode="wait">
            <motion.div key={active + '-copy'}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:col-span-2 flex flex-col justify-center"
            >
              <div className={cn('mb-3 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold', a.badge)}>
                {(() => { const Icon = pill.icon; return <Icon className="h-3.5 w-3.5" /> })()}
                {pill.label}
              </div>

              <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-100 lg:text-3xl">
                {pill.tagline}
              </h3>
              <p className="mb-6 text-slate-400 leading-relaxed">
                {pill.description}
              </p>

              <ul className="mb-8 space-y-3">
                {pill.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className={cn('h-4 w-4 flex-shrink-0 mt-0.5', a.check)} />
                    <span className="text-sm text-slate-300">{b}</span>
                  </li>
                ))}
              </ul>

              <a href="#"
                className={cn(
                  'inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all',
                  a.badge, 'hover:opacity-80'
                )}
              >
                Learn more about {pill.label}
                <ChevronRight className="h-4 w-4" />
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Right: mockup panel */}
          <div className="lg:col-span-3">
            {/* Window chrome */}
            <div className={cn('relative rounded-2xl border border-white/[0.08] bg-[#0d1117] shadow-2xl shadow-black/60 overflow-hidden', a.glow)}>
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#080b14] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                <div className="mx-auto flex items-center gap-1.5 rounded-md bg-white/[0.04] px-3 py-1 text-[11px] text-slate-600">
                  <div className="h-2 w-2 rounded-full border border-emerald-400/60 flex items-center justify-center">
                    <div className="h-1 w-1 rounded-full bg-emerald-400" />
                  </div>
                  app.ultrakin.com / {pill.id}
                </div>
                <Clock className="ml-auto h-3 w-3 text-slate-700" />
              </div>

              {/* Panel body */}
              <div className="h-[420px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="h-full"
                  >
                    <PanelContent id={active} accent={pill.accent} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
