/**
 * productPageData.js
 * Central data config for all 13 product pages.
 * Hero copy, fake datasets, feature grids, and demo metadata.
 */

// ─── Shared Personas ────────────────────────────────────────────────────────
export const PERSONAS = {
  maya:  { name: 'Maya Chen',    initials: 'MC', color: '#5c5bd6', role: 'Customer'    },
  sam:   { name: 'Sam Ortiz',   initials: 'SO', color: '#dc2626', role: 'Support'     },
  dana:  { name: 'Dana Lee',    initials: 'DL', color: '#059669', role: 'Engineering'  },
  priya: { name: 'Priya K',     initials: 'PK', color: '#c026d3', role: 'Design'      },
  lumen: { name: 'Lumen Health', initials: 'LH', color: '#2563eb', role: 'Client'      },
  alex:  { name: 'Alex Morris',  initials: 'AM', color: '#d97706', role: 'Operations'  },
};

// ─── Mail Data ───────────────────────────────────────────────────────────────
export const MAIL_DATA = {
  inbox: [
    { id: 1, from: PERSONAS.maya,  subject: 'Charged twice for October', preview: 'Hi, I was charged twice for Oct...', time: 'Now',       unread: true  },
    { id: 2, from: PERSONAS.lumen, subject: 'Re: Invoice 1182',           preview: 'Please see attached revised...',  time: '9:12',      unread: false },
    { id: 3, from: PERSONAS.dana,  subject: 'Weekly numbers',             preview: 'Revenue is up 12% this week...', time: 'Yesterday', unread: false },
    { id: 4, from: PERSONAS.sam,   subject: 'Onboarding checklist',       preview: 'Can you review the steps for...', time: 'Yesterday', unread: false },
    { id: 5, from: PERSONAS.alex,  subject: 'Q4 planning session',        preview: 'Let\'s align on the roadmap...', time: 'Mon',       unread: false },
  ],
  threads: {
    1: {
      subject: 'Charged twice for October',
      messages: [
        {
          id: 'a1', from: PERSONAS.maya, time: '9:04 AM',
          body: 'Hi, I was charged twice for October — order #4821. Can you please check and process a refund? My billing statement shows two separate charges of $49.',
        },
        {
          id: 'a2', from: PERSONAS.sam, time: '9:18 AM', isSelf: true,
          body: 'Hi Maya, sorry about that! We have confirmed the duplicate charge and initiated a refund. It will show in 3 to 5 business days.',
          reply: true,
          replyLabel: 'Replied by Priya',
        },
      ],
      record: { id: 'SR-14', list: 'Support requests', color: '#059669' },
    },
    2: {
      subject: 'Re: Invoice 1182',
      messages: [
        {
          id: 'b1', from: PERSONAS.lumen, time: '9:12 AM',
          body: 'Please find the revised invoice attached. The corrected amount is $2,400 for November. Let us know if you need any adjustments.',
        },
      ],
      record: null,
    },
    3: {
      subject: 'Weekly numbers',
      messages: [
        {
          id: 'c1', from: PERSONAS.dana, time: 'Yesterday 5:00 PM',
          body: 'Revenue up 12% this week. Churn is at 1.2%, down from 1.8% last month. ARR is now at $1.4M. Dashboard link attached.',
        },
      ],
      record: null,
    },
    4: {
      subject: 'Onboarding checklist',
      messages: [
        {
          id: 'd1', from: PERSONAS.sam, time: 'Yesterday 11:30 AM',
          body: 'Can you review the onboarding checklist for new hires? Want to make sure everything is up to date before the next batch joins Monday.',
        },
      ],
      record: null,
    },
  },
};

// ─── Chat Data ───────────────────────────────────────────────────────────────
export const CHAT_DATA = {
  channels: [
    { id: 'general',   name: 'general',        members: 48, unread: 0 },
    { id: 'launch',    name: 'launch-planning', members: 12, unread: 3 },
    { id: 'support',   name: 'support-ops',     members: 8,  unread: 1 },
    { id: 'design',    name: 'design-feedback', members: 6,  unread: 0 },
  ],
  dms: [
    { id: 'dm-maya', person: PERSONAS.maya, online: true  },
    { id: 'dm-sam',  person: PERSONAS.sam,  online: false },
  ],
  messages: {
    general: [
      { id: 1, from: PERSONAS.dana,  text: 'Calendar is set for the review, please RSVP.', time: '10:02', type: 'text' },
      { id: 2, type: 'event_card', event: { title: 'Quarterly client review', time: 'Thu 3:00 PM · Northwind Studio', going: [PERSONAS.dana, PERSONAS.sam, PERSONAS.alex, PERSONAS.maya] } },
      { id: 3, from: PERSONAS.maya,  text: 'Going! See you all there. 👋', time: '10:05', type: 'text' },
      { id: 4, from: PERSONAS.priya, text: 'Same. Will prep the design deck tonight.', time: '10:07', type: 'text', reaction: { emoji: '👍', count: 2 } },
    ],
    launch: [
      { id: 1, from: PERSONAS.sam,   text: 'Launch date confirmed: Nov 15th. All hands on deck.', time: '9:30', type: 'text' },
      { id: 2, from: PERSONAS.alex,  text: 'Copy is ready. Waiting on final visuals from @Priya.', time: '9:44', type: 'text' },
      { id: 3, type: 'decision', text: 'Decision: Ship on Nov 15 with soft launch to 20% of users first.', author: PERSONAS.sam, time: '9:58' },
      { id: 4, from: PERSONAS.dana,  text: 'Feature flags are set. Engineering is ready ✅', time: '10:01', type: 'text', reaction: { emoji: '🚀', count: 5 } },
    ],
    support: [
      { id: 1, from: PERSONAS.priya, text: 'SR-14 needs attention — duplicate charge reported.', time: '9:04', type: 'text' },
      { id: 2, type: 'task', task: { title: 'Process refund for order #4821', assignee: PERSONAS.sam, status: 'In progress' } },
      { id: 3, from: PERSONAS.sam,   text: 'On it. Refund initiated, will confirm shortly.', time: '9:18', type: 'text', reaction: { emoji: '✅', count: 1 } },
    ],
    'design-feedback': [
      { id: 1, from: PERSONAS.priya, text: 'New hero visuals uploaded to Figma. Feedback welcome.', time: '8:45', type: 'text' },
      { id: 2, from: PERSONAS.maya,  text: 'Love the direction! The colors feel more premium.', time: '9:00', type: 'text', reaction: { emoji: '❤️', count: 3 } },
    ],
  },
};

// ─── Calls Data ───────────────────────────────────────────────────────────────
export const CALLS_DATA = {
  participants: [
    { id: 1, person: PERSONAS.dana,  speaking: true,  muted: false, video: true  },
    { id: 2, person: PERSONAS.sam,   speaking: false, muted: false, video: true  },
    { id: 3, person: PERSONAS.priya, speaking: false, muted: true,  video: false },
    { id: 4, person: PERSONAS.alex,  speaking: false, muted: false, video: true  },
  ],
  actionItems: [
    'Dana to send updated proposal by Friday',
    'Sam to coordinate with support team on SR backlog',
    'Priya to share design deck with stakeholders',
  ],
  summary: 'Quarterly sync — discussed launch timeline, support backlog resolution, and design review process.',
};

// ─── Docs Data ────────────────────────────────────────────────────────────────
export const DOCS_DATA = {
  title: 'Q4 Launch Plan',
  breadcrumb: 'Engineering / Planning',
  lastEdited: '2 minutes ago',
  onlineUsers: [PERSONAS.dana, PERSONAS.sam, PERSONAS.alex],
  content: [
    { type: 'h2',       text: 'Overview' },
    { type: 'p',        text: 'This document outlines the plan for our Q4 product launch on November 15th. All teams should review their sections and confirm readiness by November 10th.' },
    { type: 'decision', text: 'Decision: Soft launch to 20% of users first, then full rollout 48 hours later pending metrics.' },
    { type: 'h2',       text: 'Engineering Checklist' },
    { type: 'task',     items: ['Feature flags configured ✅', 'Performance tests passing ✅', 'Rollback plan documented 🔲'] },
    { type: 'h2',       text: 'Marketing' },
    { type: 'p',        text: 'Email campaign scheduled for Nov 14th. Blog post drafted. Social assets in review.' },
  ],
  comments: [
    { id: 1, person: PERSONAS.maya,  line: 1, text: '@Dana should we push this to Nov 22 given the QA delays?', time: '2m ago' },
    { id: 2, person: PERSONAS.priya, line: 3, text: 'Design assets are ready. Linking Figma here.', time: '15m ago' },
  ],
};

// ─── Lists / Kanban Data ──────────────────────────────────────────────────────
export const LISTS_DATA = {
  columns: ['Incoming', 'In Progress', 'Resolved'],
  records: {
    Incoming: [
      { id: 'SR-17', title: 'Refund request: Maya Chen',   priority: 'high',   assignee: null,          source: '#support-ops', tag: 'Billing'  },
      { id: 'SR-18', title: 'Login loop on mobile',        priority: 'medium', assignee: null,          source: 'mail',         tag: 'Bug'      },
    ],
    'In Progress': [
      { id: 'SR-14', title: 'Duplicate charge: #4821',     priority: 'high',   assignee: PERSONAS.sam,  source: 'mail',         tag: 'Billing'  },
      { id: 'SR-15', title: 'CSV export failing on Safari',priority: 'medium', assignee: PERSONAS.dana, source: '#general',     tag: 'Bug'      },
    ],
    Resolved: [
      { id: 'SR-12', title: 'Onboarding email not sending', priority: 'low',   assignee: PERSONAS.alex, source: 'mail',         tag: 'Email'    },
    ],
  },
};

// ─── Events Data ─────────────────────────────────────────────────────────────
export const EVENTS_DATA = {
  weekLabel: 'This week',
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  events: [
    { id: 1, day: 1, startHour: 10, duration: 1,   title: 'Design review',         color: '#c026d3', attendees: [PERSONAS.priya, PERSONAS.maya]  },
    { id: 2, day: 2, startHour: 14, duration: 1.5, title: 'Engineering sync',      color: '#059669', attendees: [PERSONAS.dana, PERSONAS.alex, PERSONAS.sam] },
    { id: 3, day: 3, startHour: 15, duration: 1,   title: 'Quarterly client review', color: '#2563eb', attendees: [PERSONAS.dana, PERSONAS.sam, PERSONAS.alex, PERSONAS.maya], featured: true },
    { id: 4, day: 4, startHour: 9,  duration: 0.5, title: 'Standup',               color: '#d97706', attendees: [PERSONAS.sam, PERSONAS.priya]  },
  ],
  featured: {
    id: 3,
    title: 'Quarterly client review',
    time: 'Thu 3:00 PM · Northwind Studio',
    host: PERSONAS.dana,
    attendees: [PERSONAS.dana, PERSONAS.sam, PERSONAS.alex, PERSONAS.maya],
    description: 'Review Q3 results and align on Q4 priorities with the Northwind team.',
    rsvpCounts: { going: 4, maybe: 1, no: 0 },
  },
};

// ─── Forms Data ──────────────────────────────────────────────────────────────
export const FORMS_DATA = {
  formTitle: 'Customer Support Request',
  targetList: 'Support Requests',
  fields: [
    { id: 'f1', type: 'text',     label: 'Your name',        placeholder: 'Maya Chen',           required: true  },
    { id: 'f2', type: 'email',    label: 'Email address',    placeholder: 'maya@company.com',    required: true  },
    { id: 'f3', type: 'select',   label: 'Issue type',       options: ['Billing', 'Technical', 'Account', 'Other'], required: true },
    { id: 'f4', type: 'textarea', label: 'Describe the issue', placeholder: 'Please describe...', required: false },
    { id: 'f5', type: 'checkbox', label: 'Attach my account history', required: false },
  ],
};

// ─── Automations Data ────────────────────────────────────────────────────────
export const AUTOMATIONS_DATA = {
  nodes: [
    { id: 'trigger',   type: 'trigger',   label: 'Email received',          sub: 'support@ inbox', color: '#2563eb', x: 80,  y: 60  },
    { id: 'condition', type: 'condition', label: 'If subject contains',      sub: '"urgent" or "billing"', color: '#d97706', x: 280, y: 60  },
    { id: 'action1',   type: 'action',    label: 'Create record',            sub: 'in Support Requests', color: '#059669', x: 480, y: 20  },
    { id: 'action2',   type: 'action',    label: 'Notify channel',           sub: '#support-ops', color: '#5c5bd6', x: 480, y: 100 },
    { id: 'end',       type: 'end',       label: 'Agent reviews',            sub: 'awaiting approval', color: '#c026d3', x: 660, y: 60  },
  ],
  edges: [
    { from: 'trigger', to: 'condition' },
    { from: 'condition', to: 'action1' },
    { from: 'condition', to: 'action2' },
    { from: 'action1', to: 'end' },
    { from: 'action2', to: 'end' },
  ],
};

// ─── Agents Data ─────────────────────────────────────────────────────────────
export const AGENTS_DATA = {
  agent: {
    name: 'Support Triage Agent',
    role: 'Reads support mail, creates records, proposes replies',
    color: '#5c5bd6',
    tools: [
      { name: 'Read support inbox', status: 'enabled'  },
      { name: 'Create list records', status: 'enabled'  },
      { name: 'Send email replies',  status: 'approval' },
    ],
  },
  activityLog: [
    { id: 1, text: 'Email received: "Charged twice for October"', time: '9:04 AM', type: 'read'   },
    { id: 2, text: 'Record SR-14 created in Support Requests',    time: '9:04 AM', type: 'action' },
    { id: 3, text: 'Drafting reply to Maya Chen...',              time: '9:05 AM', type: 'thinking'},
  ],
  proposal: {
    action: 'Send reply to Maya Chen',
    preview: 'Hi Maya, sorry about that! We have confirmed the duplicate charge and initiated a refund. It will show in 3 to 5 business days.',
    risk: 'Low',
    record: 'SR-14',
  },
};

// ─── Connectors Data ─────────────────────────────────────────────────────────
export const CONNECTORS_DATA = {
  integrations: [
    { id: 'hubspot',    name: 'HubSpot',    color: '#FF7A59', connected: true,  syncedToday: 14, category: 'CRM'        },
    { id: 'stripe',     name: 'Stripe',     color: '#635BFF', connected: true,  syncedToday: 7,  category: 'Payments'   },
    { id: 'github',     name: 'GitHub',     color: '#24292F', connected: true,  syncedToday: 23, category: 'Engineering'},
    { id: 'slack',      name: 'Slack',      color: '#4A154B', connected: false, syncedToday: 0,  category: 'Messaging'  },
    { id: 'figma',      name: 'Figma',      color: '#F24E1E', connected: false, syncedToday: 0,  category: 'Design'     },
    { id: 'linear',     name: 'Linear',     color: '#5E6AD2', connected: false, syncedToday: 0,  category: 'Project'    },
    { id: 'notion',     name: 'Notion',     color: '#000000', connected: false, syncedToday: 0,  category: 'Docs'       },
    { id: 'intercom',   name: 'Intercom',   color: '#1F8DED', connected: false, syncedToday: 0,  category: 'Support'    },
    { id: 'api',        name: 'Custom API', color: '#64748b', connected: false, syncedToday: 0,  category: 'Custom'     },
  ],
  activityFeed: [
    { id: 1, source: 'Stripe',  text: 'Payment $240 received → SR-21 updated',       time: 'now'   },
    { id: 2, source: 'HubSpot', text: 'Deal "Northwind Q4" moved to Closed Won',     time: '1m'    },
    { id: 3, source: 'GitHub',  text: 'PR #142 merged → Task TK-88 marked Done',     time: '3m'    },
    { id: 4, source: 'Stripe',  text: 'Subscription renewed: maya@northwind.studio', time: '5m'    },
    { id: 5, source: 'HubSpot', text: 'Contact "Alex Morris" created from form',     time: '7m'    },
  ],
};

// ─── Templates Data ──────────────────────────────────────────────────────────
export const TEMPLATES_DATA = {
  categories: ['All', 'Sales', 'Support', 'People', 'Marketing', 'Engineering'],
  templates: [
    {
      id: 'lead-qualify',    name: 'Website lead → qualified deal',
      category: 'Sales',     emoji: '🎯',
      description: 'Capture website leads, score them, and route to the right account executive automatically.',
      steps: ['Form submitted on website', 'Score lead by company size + role', 'Create deal record in Lists', 'Notify AE in #sales channel'],
      usedBy: 340,
    },
    {
      id: 'inbound-support', name: 'Inbound mail → support request',
      category: 'Support',   emoji: '📧',
      description: 'Every email to support@ becomes a tracked record with ownership and SLA visibility.',
      steps: ['Email received at support@', 'Create SR record in Support Requests', 'Assign to on-call agent', 'Send acknowledgment reply'],
      usedBy: 1200,
    },
    {
      id: 'new-hire',        name: 'New hire onboarding',
      category: 'People',    emoji: '🧑‍💼',
      description: 'From offer accepted to day one ready — tasks, docs, channels, and introductions automated.',
      steps: ['Record created in People list', 'Generate onboarding doc from template', 'Schedule 1:1 with manager', 'Add to relevant channels'],
      usedBy: 580,
    },
    {
      id: 'sprint-retro',    name: 'Sprint retrospective',
      category: 'Engineering', emoji: '🔄',
      description: 'Auto-collect sprint metrics, create the retro doc, and schedule the meeting.',
      steps: ['Sprint ends (trigger from Linear)', 'Pull velocity and bug metrics', 'Generate retro doc', 'Schedule retro meeting'],
      usedBy: 210,
    },
    {
      id: 'marketing-launch', name: 'Product launch sequence',
      category: 'Marketing',  emoji: '🚀',
      description: 'Coordinate blog, email, social, and press from one automation.',
      steps: ['Launch date set in calendar', 'Draft blog post via Docs template', 'Schedule email campaign', 'Post social announcements'],
      usedBy: 95,
    },
  ],
};

// ─── Ukin AI Data ─────────────────────────────────────────────────────────────
export const UKIN_DATA = {
  initialMessages: [
    {
      id: 1, role: 'user',
      text: 'What did we decide about the launch date?',
    },
    {
      id: 2, role: 'ai',
      text: 'Based on #launch-planning (Oct 28, 9:58 AM), the team agreed on **November 15th** with a soft launch to 20% of users first. Sam confirmed engineering readiness and feature flags are set.',
      sources: [{ label: '#launch-planning', type: 'channel' }, { label: 'Q4 Launch Plan', type: 'doc' }],
    },
    {
      id: 3, role: 'user',
      text: 'Draft a follow-up email to Maya about her refund',
    },
    {
      id: 4, role: 'ai',
      text: 'Here\'s a draft reply for SR-14:',
      draft: {
        to: 'maya@northwind.studio',
        subject: 'Re: Charged twice for October',
        body: 'Hi Maya,\n\nYour refund for order #4821 has been processed. You should see it reflected in 3–5 business days.\n\nThanks for your patience,\nSupport Team',
      },
      sources: [{ label: 'SR-14', type: 'record' }],
    },
  ],
  cannedResponses: {
    'meeting':    'I found 3 upcoming meetings this week. The next one is "Quarterly client review" on Thursday at 3:00 PM.',
    'summary':    'Here\'s what happened in #support-ops today: 2 new tickets, 1 resolved (SR-14 refund), 1 escalated to engineering.',
    'status':     'SR-14 is In Progress — Sam initiated the refund at 9:18 AM. Expected completion: 3–5 business days.',
    'default':    'I found 4 related conversations and 2 documents. Want me to summarize the key decisions?',
  },
};

// ─── Search Data ─────────────────────────────────────────────────────────────
export const SEARCH_DATA = {
  defaultQuery: 'refund SR',
  results: [
    { id: 1, type: 'record',  icon: '📋', title: 'SR-14: Duplicate charge — Maya Chen',    source: 'Support Requests', time: '9:04 AM',    preview: 'Refund initiated by Sam. Expected in 3–5 business days.' },
    { id: 2, type: 'message', icon: '💬', title: '#support-ops: "SR-14 needs attention"',  source: 'Channels',         time: 'Today 9:04', preview: 'Priya K: SR-14 needs attention — duplicate charge reported.' },
    { id: 3, type: 'mail',    icon: '✉️', title: 'Charged twice for October — Maya Chen', source: 'Mail',              time: 'Today 9:04', preview: 'Hi, I was charged twice for October — order #4821. Can you...' },
    { id: 4, type: 'doc',     icon: '📄', title: 'Q4 Launch Plan',                         source: 'Docs',              time: 'Yesterday',  preview: 'Engineering checklist, marketing timeline, and launch metrics.' },
    { id: 5, type: 'message', icon: '💬', title: '#launch-planning: "Launch date confirmed"', source: 'Channels',      time: 'Yesterday',  preview: 'Sam Ortiz: Launch date confirmed: Nov 15th. All hands on deck.' },
  ],
  typeLabels: { record: 'Record', message: 'Message', mail: 'Mail', doc: 'Document' },
};

// ─── Product Page Metadata ────────────────────────────────────────────────────
export const PRODUCT_META = {
  chat: {
    slug: 'chat', name: 'Chat',
    color: '#5c5bd6', colorSoft: 'rgba(92,91,214,0.1)',
    eyebrow: 'CHAT · SPACES & THREADS',
    h1Lines: ['Conversations', 'that carry context.'],
    sub: 'Every channel, thread, and DM stays connected to the decisions made inside them. No more reconstructing what was agreed.',
    features: [
      { problem: 'Decisions get buried in long threads',       solution: 'Every decision is pinned and searchable in context.' },
      { problem: 'No one knows who owns the follow-through',   solution: 'Tasks can be created inline from any message.'       },
      { problem: 'New team members have no history',           solution: 'Full conversation and decision history, always accessible.' },
      { problem: 'Context is lost across channels and tools',  solution: 'Channels, DMs, and docs all share the same context graph.' },
    ],
    pageTitle: 'Chat — Ultrakin',
    pageDesc:  'Spaces, threads, and DMs that carry context. Every conversation in one workspace.',
  },
  calls: {
    slug: 'calls', name: 'Calls & Huddles',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    eyebrow: 'CALLS · AUDIO & VIDEO',
    h1Lines: ['Quick calls that', 'end with next steps.'],
    sub: 'Audio and video huddles with automatic summaries, transcripts, and action items captured where the work happens.',
    features: [
      { problem: 'Meetings end with no clear actions',          solution: 'Action items are auto-captured and assigned in real time.' },
      { problem: 'Recordings are never reviewed',               solution: 'AI summary surfaces the key decisions in 30 seconds.'   },
      { problem: 'Call context is lost after the meeting ends', solution: 'Summary and tasks are linked to the originating channel.'  },
      { problem: 'Meeting notes live in a separate doc',        solution: 'Notes sync directly to the relevant workspace thread.'    },
    ],
    pageTitle: 'Calls & Huddles — Ultrakin',
    pageDesc:  'Quick audio/video calls that end with auto-captured action items and summaries.',
  },
  mail: {
    slug: 'mail', name: 'Mail',
    color: '#dc2626', colorSoft: 'rgba(220,38,38,0.1)',
    eyebrow: 'MAIL · SHARED INBOX',
    h1Lines: ['Mail on your own', 'domain, shared', 'with the team.'],
    sub: 'Personal mailboxes and shared ones like support@ and sales@, on your company domain. Replies show who sent them, and any email can become a record.',
    features: [
      { problem: 'Support inbox is a black box to the team',   solution: 'Shared inboxes show who replied and what happened.'    },
      { problem: 'Emails duplicate work across tools',         solution: 'Any email thread can become a record with one click.'  },
      { problem: 'You can\'t see if a colleague is replying',  solution: 'Live collision detection prevents double replies.'      },
      { problem: 'Customer context is siloed in email',        solution: 'Email threads link directly to customer records.'       },
    ],
    pageTitle: 'Mail — Ultrakin',
    pageDesc:  'Shared mail on your domain. support@, sales@, and personal inboxes in one place.',
  },
  docs: {
    slug: 'docs', name: 'Docs',
    color: '#2563eb', colorSoft: 'rgba(37,99,235,0.1)',
    eyebrow: 'DOCS · LIVING SPECS',
    h1Lines: ['Pages your team', 'writes together.'],
    sub: 'Living specs, meeting notes, and decision logs that stay connected to the conversations that created them. No more stale documents.',
    features: [
      { problem: 'Docs go stale the moment they\'re published', solution: 'Docs update in real time as decisions are made.'         },
      { problem: 'Comments are lost when resolved',              solution: 'Decision trail is preserved inline forever.'             },
      { problem: 'Everyone has their own version',               solution: 'One shared source of truth, always in sync.'            },
      { problem: 'Finding the right doc takes too long',         solution: 'Docs are findable via ⌘K across the whole workspace.'   },
    ],
    pageTitle: 'Docs — Ultrakin',
    pageDesc:  'Living specs and decision logs connected to the conversations that created them.',
  },
  lists: {
    slug: 'lists', name: 'Lists',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    eyebrow: 'LISTS · RECORDS & TASKS',
    h1Lines: ['Records for requests,', 'deals, and defects.'],
    sub: 'Structured lists that capture ownership, status, and context — linked directly to the conversations and emails they came from.',
    features: [
      { problem: 'Spreadsheets have no conversation context',   solution: 'Every record links to the chat or email that created it.' },
      { problem: 'Status updates require a meeting',           solution: 'Record status updates are visible in real time.'          },
      { problem: 'No one knows who owns what',                 solution: 'Assignees and due dates are first-class fields.'          },
      { problem: 'Issues fall through the cracks',             solution: 'Inbox auto-creates records from emails and Slack alerts.'  },
    ],
    pageTitle: 'Lists — Ultrakin',
    pageDesc:  'Structured records for requests, deals, and defects. Linked to conversations.',
  },
  events: {
    slug: 'events', name: 'Events',
    color: '#d97706', colorSoft: 'rgba(217,119,6,0.1)',
    eyebrow: 'EVENTS · CALENDAR',
    h1Lines: ['Meetings, classes,', 'and team events.'],
    sub: 'Schedule events that automatically share recordings, transcripts, and action items with every attendee — even those who couldn\'t make it.',
    features: [
      { problem: 'Attendees miss what happened in a meeting',   solution: 'Recording and AI summary go to every attendee automatically.' },
      { problem: 'Calendar and work tools are separate',        solution: 'Events link to channels, docs, and records in one place.'    },
      { problem: 'RSVP responses are scattered',                solution: 'Going/Maybe/No is visible to the whole team in the workspace.'  },
      { problem: 'Classes have no follow-through',              solution: 'Recordings and transcripts are shared post-event automatically.' },
    ],
    pageTitle: 'Events — Ultrakin',
    pageDesc:  'Meetings and events that automatically share recordings and action items.',
  },
  forms: {
    slug: 'forms', name: 'Forms',
    color: '#7c3aed', colorSoft: 'rgba(124,58,237,0.1)',
    eyebrow: 'FORMS · INTAKE & CAPTURE',
    h1Lines: ['Public forms that', 'fill a list.'],
    sub: 'Create intake forms, request forms, or lead capture — every submission becomes a structured record in your workspace, ready for action.',
    features: [
      { problem: 'Form data lives in a separate spreadsheet',   solution: 'Submissions go directly into a structured workspace list.' },
      { problem: 'No visibility on submissions in real time',   solution: 'Team sees new records as they arrive, with notifications.'   },
      { problem: 'Forms can\'t trigger automations',             solution: 'Any form submission can start an automated workflow.'       },
      { problem: 'Building forms requires a developer',          solution: 'Drag-and-drop builder, no code needed.'                    },
    ],
    pageTitle: 'Forms — Ultrakin',
    pageDesc:  'Public intake forms that become structured records in your workspace.',
  },
  automations: {
    slug: 'automations', name: 'Automations',
    color: '#c026d3', colorSoft: 'rgba(192,38,211,0.1)',
    eyebrow: 'AUTOMATIONS · WORKFLOWS',
    h1Lines: ['Steps across every', 'tool, with approvals.'],
    sub: 'Build workflows that move work forward automatically — with human approval gates at the moments that matter.',
    features: [
      { problem: 'Repetitive tasks eat team time',              solution: 'Automations handle routing, notifications, and record creation.' },
      { problem: 'Automations run without oversight',           solution: 'Add approval gates at any step to keep people in control.'      },
      { problem: 'Cross-tool workflows require custom code',    solution: 'Visual builder connects triggers across mail, lists, and chat.'  },
      { problem: 'Hard to see what automation did what',        solution: 'Full audit log of every automated action.'                       },
    ],
    pageTitle: 'Automations — Ultrakin',
    pageDesc:  'Visual workflow builder with approval gates. Automate across mail, lists, and chat.',
  },
  agents: {
    slug: 'agents', name: 'Agents',
    color: '#6366f1', colorSoft: 'rgba(99,102,241,0.1)',
    eyebrow: 'AGENTS · AI AUTOMATION',
    h1Lines: ['Agents with a job,', 'tools, and limits.'],
    sub: 'Give an agent a specific role, the tools it needs, and approval gates so people stay in control of what changes in your workspace.',
    features: [
      { problem: 'AI acts without context or guardrails',       solution: 'Agents only see the workspace context they\'re scoped to.'      },
      { problem: 'No oversight on what AI changed',             solution: 'Every agent action requires approval or is fully audited.'      },
      { problem: 'AI tools are disconnected from your workflow', solution: 'Agents act directly inside channels, records, and mail.'       },
      { problem: 'Setting up AI is complex',                    solution: 'Agents are configured like team members — role, tools, limits.' },
    ],
    pageTitle: 'Agents — Ultrakin',
    pageDesc:  'AI agents with a job, tools, and approval gates. People stay in control.',
  },
  connectors: {
    slug: 'connectors', name: 'Connectors',
    color: '#0284c7', colorSoft: 'rgba(2,132,199,0.1)',
    eyebrow: 'CONNECTORS · INTEGRATIONS',
    h1Lines: ['HubSpot, Stripe,', 'GitHub, and any API.'],
    sub: 'Connect the tools your team already uses. Connectors bring external signals into your workspace and let agents act on them in context.',
    features: [
      { problem: 'Data is siloed across 12+ tools',            solution: 'Connectors stream external signals into a unified workspace.'   },
      { problem: 'Integrations require engineering time',       solution: 'No-code connectors for 40+ tools, and MCP for anything else.' },
      { problem: 'Webhook events are invisible to the team',    solution: 'Every connector event shows up in the relevant channel or record.' },
      { problem: 'Tool switching kills focus',                  solution: 'Agents can act on connector data without leaving the workspace.' },
    ],
    pageTitle: 'Connectors — Ultrakin',
    pageDesc:  'No-code integrations for HubSpot, Stripe, GitHub, and any API.',
  },
  templates: {
    slug: 'templates', name: 'Templates',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    eyebrow: 'TEMPLATES · QUICK START',
    h1Lines: ['Ready-made automations', 'and agents to start from.'],
    sub: 'Choose from proven templates built by teams like yours. Deploy immediately — no setup from scratch required.',
    features: [
      { problem: 'Starting from a blank slate is slow',         solution: 'Templates give you a working automation in one click.'        },
      { problem: 'You don\'t know what\'s possible',             solution: 'Browse templates organized by team function and industry.'   },
      { problem: 'Custom templates can\'t be shared',            solution: 'Publish your own templates for your whole organization.'     },
      { problem: 'Templates go out of date',                    solution: 'Community-maintained templates are versioned and updated.'    },
    ],
    pageTitle: 'Templates — Ultrakin',
    pageDesc:  'Ready-made automations and agents. Deploy proven workflows instantly.',
  },
  ukin: {
    slug: 'ukin', name: 'Ukin',
    color: '#8b5cf6', colorSoft: 'rgba(139,92,246,0.1)',
    eyebrow: 'UKIN · AI ASSISTANT',
    h1Lines: ['The agent that works', 'across every tool.'],
    sub: 'Ukin reads your workspace — conversations, docs, records — and can take actions with your approval. Not a chatbot. A team member.',
    features: [
      { problem: 'AI doesn\'t know your team\'s history',        solution: 'Ukin reads every channel, doc, and record in your workspace.' },
      { problem: 'AI answers are generic and unverifiable',      solution: 'Every answer links to the source — channel, doc, or record.'  },
      { problem: 'AI tools require prompt engineering',          solution: 'Ask naturally — Ukin understands workspace context.'          },
      { problem: 'AI suggestions can\'t be acted on directly',   solution: 'Ukin can draft, create, and reply — with your approval.'     },
    ],
    pageTitle: 'Ukin — Ultrakin',
    pageDesc:  'The AI assistant that works across your entire workspace with full context.',
  },
  search: {
    slug: 'search', name: 'Search',
    color: '#374151', colorSoft: 'rgba(55,65,81,0.1)',
    eyebrow: 'SEARCH · ⌘K EVERYWHERE',
    h1Lines: ['⌘K across messages,', 'mail, docs and records.'],
    sub: 'One keyboard shortcut finds anything across your entire workspace — with context about where it came from and what happened next.',
    features: [
      { problem: 'Finding anything requires knowing where to look', solution: 'One search across channels, mail, docs, and records.' },
      { problem: 'Search results lack context',                   solution: 'Results show source, time, and preview inline.'         },
      { problem: 'No way to search across tools at once',         solution: 'Connected integrations are searchable from ⌘K too.'    },
      { problem: 'Search slows you down',                         solution: 'Results appear in under 100ms. Keyboard-first navigation.' },
    ],
    pageTitle: 'Search — Ultrakin',
    pageDesc:  '⌘K search across messages, mail, docs, and records. Everything, instantly.',
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCT_META);
