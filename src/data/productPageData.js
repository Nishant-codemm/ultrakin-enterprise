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
  ukin:  { name: 'Ukin',         initials: 'UK', color: '#3156cf', role: 'Workspace agent' },
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
          id: 'a1', from: PERSONAS.maya, time: '9:12 AM',
          body: 'Hi, I was charged twice for October — order #4821. Can you please check and process a refund? My billing statement shows two separate charges of $120.',
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
      { id: 1, from: PERSONAS.sam, text: 'Maya Chen followed up about the duplicate charge. I linked her email to SR-14.', time: '9:14', type: 'text' },
      { id: 2, from: PERSONAS.priya, text: '@Ukin, is this already tracked?', time: '9:18', type: 'text' },
      { id: 3, from: PERSONAS.ukin, text: 'Yes. SR-14 is the open request for this charge review.', time: '9:18', type: 'text', source: 'Maya Chen · support email · 9:12' },
      { id: 4, type: 'task', task: { title: 'Review duplicate charge · SR-14', assignee: PERSONAS.dana, status: 'In progress' } },
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
    { id: 1, person: PERSONAS.priya, speaking: true,  muted: false, video: true  },
    { id: 2, person: PERSONAS.maya,  speaking: false, muted: false, video: true  },
    { id: 3, person: PERSONAS.dana,  speaking: false, muted: true,  video: false },
    { id: 4, person: PERSONAS.sam,   speaking: false, muted: false, video: true  },
  ],
  actionItems: [
    'Priya to share the kickoff notes in #client-kestrel',
    'Dana to confirm the launch owner',
    'Sam to send the follow-up to the client',
  ],
  summary: 'Kestrel Robotics kickoff — the team agreed to keep the launch checklist in one shared doc and confirm an owner for each follow-up.',
};

// ─── Docs Data ────────────────────────────────────────────────────────────────
export const DOCS_DATA = {
  title: 'Kickoff notes',
  breadcrumb: 'Kestrel Robotics / Projects',
  lastEdited: '2 minutes ago',
  onlineUsers: [PERSONAS.dana, PERSONAS.sam, PERSONAS.alex],
  content: [
    { type: 'h2', text: 'Kickoff' },
    { type: 'p', text: 'Shared notes from the Kestrel Robotics project kickoff. Owners and next steps stay connected to the conversation that created them.' },
    { type: 'decision', text: 'Decision: Keep the launch checklist in one shared document and assign an owner to each follow-up.' },
    { type: 'h2', text: 'Follow-up' },
    { type: 'task', items: ['Share kickoff notes', 'Confirm the launch owner', 'Schedule the customer review'] },
  ],
  comments: [
    { id: 1, person: PERSONAS.maya, line: 1, text: '@Priya, can you add the owner for the customer review?', time: '2m ago' },
    { id: 2, person: PERSONAS.dana, line: 3, text: 'I’ll confirm the launch owner after the review.', time: '15m ago' },
  ],
};

// ─── Lists / Kanban Data ──────────────────────────────────────────────────────
export const LISTS_DATA = {
  columns: ['Incoming', 'In Progress', 'Resolved'],
  records: {
    Incoming: [],
    'In Progress': [
      { id: 'SR-14', title: 'Duplicate charge · order #4821', priority: 'high', assignee: PERSONAS.dana, source: 'mail', tag: 'Billing', createdAt: '1 min ago' },
      { id: 'SR-12', title: 'Export to CSV missing columns', priority: 'medium', assignee: PERSONAS.dana, source: '#support-ops', tag: 'Bug', createdAt: 'Today' },
    ],
    Resolved: [
      { id: 'SR-13', title: 'Password reset email late', priority: 'low', assignee: PERSONAS.sam, source: 'mail', tag: 'Email', createdAt: 'Yesterday' },
      { id: 'SR-11', title: 'Invite link expired', priority: 'low', assignee: PERSONAS.priya, source: '#support-ops', tag: 'Access', createdAt: 'Yesterday' },
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
    name: 'Support inbox agent',
    role: 'Reads policy, looks up orders, drafts replies',
    color: '#5c5bd6',
    tools: [
      { name: 'Read support inbox', status: 'enabled'  },
      { name: 'Look up payments', status: 'enabled'  },
      { name: 'Send reply · over $50', status: 'approval' },
    ],
  },
  activityLog: [
    { id: 1, text: 'Read refund policy for order #4821', time: '9:04 AM', type: 'read' },
    { id: 2, text: 'Stripe found two charges of $120', time: '9:04 AM', type: 'lookup' },
    { id: 3, text: '$120 exceeds the $50 approval limit · waiting for Dana', time: '9:05 AM', type: 'approval' },
  ],
  proposal: {
    action: 'Review refund for order #4821',
    preview: 'Two $120 charges were found. The refund is above the $50 limit. Nothing has been sent; Dana needs to approve this action.',
    risk: 'Over $50 limit',
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
        body: 'Hi Maya,\n\nWe found two charges of $120 for order #4821. Your refund is awaiting review, and we will update you once it is approved.\n\nThanks for your patience,\nSupport Team',
      },
      sources: [{ label: 'SR-14', type: 'record' }],
    },
  ],
  cannedResponses: {
    'meeting':    'I found 3 upcoming meetings this week. The next one is "Quarterly client review" on Thursday at 3:00 PM.',
    'summary':    'Here\'s what happened in #support-ops today: 2 new tickets, SR-14 is awaiting approval, and 1 issue was escalated to engineering.',
    'status':     'SR-14 is awaiting Dana’s approval. Two $120 charges were found for order #4821; no refund has been sent.',
    'default':    'I found 4 related conversations and 2 documents. Want me to summarize the key decisions?',
  },
};

// ─── Search Data ─────────────────────────────────────────────────────────────
export const SEARCH_DATA = {
  defaultQuery: 'refund SR',
  results: [
    { id: 1, type: 'record',  icon: '📋', title: 'SR-14: Duplicate charge — Maya Chen',    source: 'Support Requests', time: '9:12 AM',    preview: 'Two $120 charges found. Waiting for Dana’s approval; nothing sent.' },
    { id: 2, type: 'message', icon: '💬', title: '#support-ops: "SR-14 needs attention"',  source: 'Channels',         time: 'Today 9:18', preview: 'Ukin linked Maya’s support email to SR-14.' },
    { id: 3, type: 'mail',    icon: '✉️', title: 'Charged twice for October — Maya Chen', source: 'Mail',              time: 'Today 9:04', preview: 'Two separate charges of $120 for order #4821. Can you check this?' },
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
    headline: 'Chat where the answer is one @Ukin away.',
    sub: 'Spaces for each team and client, threads that keep a topic together, and direct messages. Every message can become a record, a task or a doc.',
    handoffs: [
      { product: 'Lists', slug: 'lists', description: 'A message becomes a record with one press.' },
      { product: 'Calls', slug: 'calls', description: 'Start a huddle from the space; the summary posts back.' },
      { product: 'Automations', slug: 'automations', description: 'Approval cards land in the space that owns the work.' },
    ],
    capabilities: [
      { title: 'Spaces and threads', description: 'Public and private spaces, with threads so a topic doesn’t drown the room.' },
      { title: 'Log it from the message', description: 'Hover a message to log it as a defect, a task or a request in the list the space uses.' },
      { title: 'Ask @Ukin in the thread', description: 'Ukin reads the thread you are in and answers with links to the records it used.' },
      { title: 'Guests for clients', description: 'Invite a client to one space. They see that space and nothing else.' },
    ],
    pageTitle: 'Chat — Ultrakin',
    pageDesc:  'Spaces, threads, and direct messages where every message can become a record, task, or doc.',
  },
  calls: {
    slug: 'calls', name: 'Calls',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    headline: 'Calls that end with the notes already written.',
    sub: 'Start a huddle in any space or call someone directly. When it ends, the transcript, summary and recording post to the place the call started.',
    handoffs: [
      { product: 'Docs', slug: 'docs', description: 'The transcript is saved as a page you can search.' },
      { product: 'Ukin', slug: 'ukin', description: 'Ukin proposes the actions; you choose which to create.' },
      { product: 'Lists', slug: 'lists', description: 'Agreed actions become tasks with owners.' },
    ],
    capabilities: [
      { title: 'Huddles and calls', description: 'Audio, video and screen share on the web, phone and tablet.' },
      { title: 'One record button', description: 'Record video and transcript, or transcript only. Everyone sees it is on.' },
      { title: 'Summary in the space', description: 'One card per call that changes in place: live, processing, ready.' },
      { title: 'Host controls for classes', description: 'Mute all, lock the room, keep a waiting room and end it for everyone.' },
    ],
    pageTitle: 'Calls & Huddles — Ultrakin',
    pageDesc:  'Huddles and calls with transcripts, summaries, and actions saved where the conversation started.',
  },
  mail: {
    slug: 'mail', name: 'Mail',
    color: '#dc2626', colorSoft: 'rgba(220,38,38,0.1)',
    headline: 'Mail on your own domain, shared with the team.',
    sub: 'Personal mailboxes and shared ones like support@ and sales@, on your company domain. Replies show who sent them, and any email can become a record.',
    handoffs: [
      { product: 'Lists', slug: 'lists', description: 'An email becomes a request, a lead or a ticket.' },
      { product: 'Automations', slug: 'automations', description: 'Mail to an address can start an automation.' },
      { product: 'Agents', slug: 'agents', description: 'An agent can draft the reply for a person to approve.' },
    ],
    capabilities: [
      { title: 'Your domain', description: 'Add your domain, follow the DNS steps on screen and mail starts arriving.' },
      { title: 'Shared inboxes', description: 'Give a team support@ and see who replied to which thread.' },
      { title: 'Spam and phishing checks', description: 'Links are checked before you open them; senders you block stay blocked.' },
      { title: 'Search every thread', description: 'Mail shows up in ⌘K search, only for the mailboxes you can open.' },
    ],
    pageTitle: 'Mail — Ultrakin',
    pageDesc:  'Shared mail on your domain. support@, sales@, and personal inboxes in one place.',
  },
  docs: {
    slug: 'docs', name: 'Docs',
    color: '#2563eb', colorSoft: 'rgba(37,99,235,0.1)',
    headline: 'Docs your team and Ukin write together.',
    sub: 'Pages for plans, policies and notes, edited live by everyone in them. Ukin can read them when it answers, and write in them when you ask.',
    handoffs: [
      { product: 'Agents', slug: 'agents', description: 'Help pages become what a support agent answers from.' },
      { product: 'Chat', slug: 'chat', description: 'Share a page into a space; comments notify the right people.' },
      { product: 'Search', slug: 'search', description: 'Every page is in ⌘K, within what you can open.' },
    ],
    capabilities: [
      { title: 'Write together', description: 'Live cursors, comments and history on every page.' },
      { title: 'Call transcripts', description: 'Each recorded call adds a transcript page with speakers and times.' },
      { title: 'Knowledge for agents', description: 'Point an agent at a folder and it answers from those pages.' },
      { title: 'Publish a page', description: 'Turn a page into a public help or docs site on your domain.' },
    ],
    pageTitle: 'Docs — Ultrakin',
    pageDesc:  'Collaborative pages for plans, policies, and notes that Ukin can read and write with your team.',
  },
  lists: {
    slug: 'lists', name: 'Lists',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    headline: 'Lists that keep every request, deal and defect.',
    sub: 'Build a list for anything your team tracks. Records link to each other, keep their history, and can be created from chat, mail, calls or forms.',
    handoffs: [
      { product: 'Automations', slug: 'automations', description: 'A record changing can start an automation.' },
      { product: 'Ukin', slug: 'ukin', description: 'Ask Ukin which requests have been open the longest.' },
      { product: 'Forms', slug: 'forms', description: 'A form fills a list directly.' },
    ],
    capabilities: [
      { title: 'Your columns', description: 'Text, people, dates, choices, files and links to records in other lists.' },
      { title: 'History on every record', description: 'Who changed what and when, kept even after a record is deleted.' },
      { title: 'Comments and mentions', description: 'Talk about a record on the record, and @mention the person who should act.' },
      { title: 'Created from anywhere', description: 'From a chat message, an email, a call action or a form.' },
    ],
    pageTitle: 'Lists — Ultrakin',
    pageDesc:  'Track requests, deals, and defects in linked records created from chat, mail, calls, or forms.',
  },
  events: {
    slug: 'events', name: 'Events',
    color: '#d97706', colorSoft: 'rgba(217,119,6,0.1)',
    headline: 'Events with invites, replies and the call built in.',
    sub: 'Schedule a meeting, a class or a webinar. Invite your team or people outside it, collect replies, and start the call from the event.',
    handoffs: [
      { product: 'Calls', slug: 'calls', description: 'The event opens its own call when it starts.' },
      { product: 'Mail', slug: 'mail', description: 'Invites and reminders go out by email.' },
      { product: 'Chat', slug: 'chat', description: 'Each event has a chat for before, during and after.' },
    ],
    capabilities: [
      { title: 'Invite anyone', description: 'Bring your team or people outside it into the same event.' },
      { title: 'Replies that count', description: 'Collect attendee replies in one place.' },
      { title: 'The call is in the event', description: 'Start the meeting from the event itself.' },
      { title: 'Repeat on a schedule', description: 'Set recurring meetings, classes or webinars.' },
    ],
    pageTitle: 'Events — Ultrakin',
    pageDesc:  'Schedule meetings, classes, and webinars with invitations, replies, and calls in the event.',
  },
  forms: {
    slug: 'forms', name: 'Forms',
    color: '#7c3aed', colorSoft: 'rgba(124,58,237,0.1)',
    headline: 'Forms that land straight in a list.',
    sub: 'Make a contact, intake or sign-up form and share its link. Each answer is a record in the list you choose, ready for your team or an automation.',
    handoffs: [
      { product: 'Lists', slug: 'lists', description: 'Every answer is a record.' },
      { product: 'Automations', slug: 'automations', description: 'A submission starts the flow you built.' },
      { product: 'Mail', slug: 'mail', description: 'Send the person a reply when their form arrives.' },
    ],
    capabilities: [
      { title: 'Build in minutes', description: 'Create a form and share its link with the people who need it.' },
      { title: 'Answers are records', description: 'Each response lands in the list you choose.' },
      { title: 'Start an automation', description: 'Use a submission to begin the next step.' },
      { title: 'Share anywhere', description: 'Give people a direct link to fill out your form.' },
    ],
    pageTitle: 'Forms — Ultrakin',
    pageDesc:  'Contact, intake, and sign-up forms that land directly in the list your team uses.',
  },
  automations: {
    slug: 'automations', name: 'Automations',
    color: '#c026d3', colorSoft: 'rgba(192,38,211,0.1)',
    headline: 'Automations that ask a person before they act.',
    sub: 'Describe what should happen to Ukin, start from a template or draw it on the canvas. Steps run across mail, lists, chat and your connected tools, and wait for approval where it matters.',
    handoffs: [
      { product: 'Agents', slug: 'agents', description: 'Give a step to an agent when it needs judgment.' },
      { product: 'Connectors', slug: 'connectors', description: 'Read and write HubSpot, Stripe and any API you connect.' },
      { product: 'Templates', slug: 'templates', description: 'Share a working automation as a template.' },
    ],
    capabilities: [
      { title: 'Start from anything', description: 'Begin with an event in mail, lists, chat or a connected tool.' },
      { title: 'Approvals in chat', description: 'Put a person in control when a step needs review.' },
      { title: 'Branches, retries and time limits', description: 'Set how a flow responds when a step changes or cannot finish.' },
      { title: 'Every run, step by step', description: 'See what happened during each automation run.' },
    ],
    pageTitle: 'Automations — Ultrakin',
    pageDesc:  'Automations across mail, lists, chat, and connected tools, with human approval where it matters.',
  },
  agents: {
    slug: 'agents', name: 'Agents',
    color: '#6366f1', colorSoft: 'rgba(99,102,241,0.1)',
    headline: 'Agents with a job, the right tools and a limit.',
    sub: 'Write the job in plain words, add the docs it answers from and the tools it may use. Decide what it does alone and when it asks a person.',
    handoffs: [
      { product: 'Mail', slug: 'mail', description: 'Answer a shared inbox with drafts or replies.' },
      { product: 'Lists', slug: 'lists', description: 'Log what it finds as records.' },
      { product: 'Automations', slug: 'automations', description: 'Run as one step inside a larger flow.' },
    ],
    capabilities: [
      { title: 'The job, as a doc', description: 'Instructions live in a versioned page anyone on the team can read.' },
      { title: 'Tools with rules', description: 'For each tool: never ask, ask each time, or ask over a limit you set.' },
      { title: 'Sees what the asker sees', description: 'An agent helping a person can only read what that person can.' },
      { title: 'Test before it goes live', description: 'Run it on last week’s real mail; nothing is sent.' },
    ],
    pageTitle: 'Agents — Ultrakin',
    pageDesc:  'Agents with defined jobs, tools, limits, and human approval for consequential actions.',
  },
  connectors: {
    slug: 'connectors', name: 'Connectors',
    color: '#0284c7', colorSoft: 'rgba(2,132,199,0.1)',
    headline: 'Connect a tool once. Decide who may use it.',
    sub: 'Connect the tools your team already pays for, any MCP server or any HTTP API. Then choose which agents and automations may use each one, and as whom.',
    handoffs: [
      { product: 'Agents', slug: 'agents', description: 'Agents use connected tools within their rules.' },
      { product: 'Automations', slug: 'automations', description: 'Events in a tool can start an automation.' },
      { product: 'Ukin', slug: 'ukin', description: 'Ask Ukin about data in a connected tool.' },
    ],
    capabilities: [
      { title: 'A library to start from', description: 'Connect tools your team already uses.' },
      { title: 'Any MCP server or API', description: 'Connect an MCP server or an HTTP API.' },
      { title: 'Workspace or each person', description: 'Choose whether a connection belongs to the workspace or a person.' },
      { title: 'Access per agent', description: 'Decide which agents and automations may use each connection.' },
    ],
    pageTitle: 'Connectors — Ultrakin',
    pageDesc:  'Connect your tools, MCP servers, and APIs, then control access for agents and automations.',
  },
  templates: {
    slug: 'templates', name: 'Templates',
    color: '#059669', colorSoft: 'rgba(5,150,105,0.1)',
    headline: 'Start from a template. Ukin fits it to your workspace.',
    sub: 'Ready-made automations and agents from Ultrakin, your organisation and other teams. Ukin asks the few questions that make one yours before anything runs.',
    handoffs: [
      { product: 'Automations', slug: 'automations', description: 'A template becomes your automation, ready to edit.' },
      { product: 'Agents', slug: 'agents', description: 'Agent templates arrive with their job and tools.' },
      { product: 'Connectors', slug: 'connectors', description: 'Missing a tool? Connect it from the template.' },
    ],
    capabilities: [
      { title: 'Made by Ultrakin and teams like yours', description: 'Start from automations and agents made for real team workflows.' },
      { title: 'Fits your stack first', description: 'Connect the tools your workspace will use.' },
      { title: 'Set up by questions', description: 'Ukin asks for the details needed to make the template yours.' },
      { title: 'Share your own', description: 'Make a workspace template available to other teams.' },
    ],
    pageTitle: 'Templates — Ultrakin',
    pageDesc:  'Ready-made agents and automations configured for your workspace before they run.',
  },
  ukin: {
    slug: 'ukin', name: 'Ukin',
    color: '#8b5cf6', colorSoft: 'rgba(139,92,246,0.1)',
    headline: 'Ukin works across every tool, as you.',
    sub: 'Ask in any thread. Ukin reads chat, mail, docs, lists and calls, only what the person asking can see, and turns answers into records, replies and automations you approve.',
    handoffs: [
      { product: 'Calls', slug: 'calls', description: 'Read the transcript of a call you were in.' },
      { product: 'Lists', slug: 'lists', description: 'Create records as you, in the right list.' },
      { product: 'Automations', slug: 'automations', description: 'Drafts the automation; you publish it.' },
    ],
    capabilities: [
      { title: 'Answers with sources', description: 'See the workspace sources behind an answer.' },
      { title: 'Actions from calls', description: 'Turn meeting context into actions for the team.' },
      { title: 'Builds automations', description: 'Describe a workflow and configure it with Ukin.' },
      { title: 'Your permissions, never more', description: 'Ukin only reads what the person asking can open.' },
    ],
    pageTitle: 'Ukin — Ultrakin',
    pageDesc:  'Workspace intelligence that answers with sources and prepares actions for people to approve.',
  },
  search: {
    slug: 'search', name: 'Search',
    color: '#374151', colorSoft: 'rgba(55,65,81,0.1)',
    headline: 'One search box for everything you can open.',
    sub: 'Press ⌘K anywhere. Messages, mail, docs, records, people and spaces come back together, ranked for the place you are in.',
    handoffs: [
      { product: 'Chat', slug: 'chat', description: 'Jump to the message, in its thread.' },
      { product: 'Mail', slug: 'mail', description: 'Open the thread in the mailbox it came from.' },
      { product: 'Ukin', slug: 'ukin', description: 'Ask Ukin when a list of results isn’t enough.' },
    ],
    capabilities: [
      { title: 'Everything in one box', description: 'Search messages, mail, docs, records, people and spaces together.' },
      { title: 'Starts from where you are', description: 'Results are ranked for the place you are in.' },
      { title: 'Only what you can open', description: 'Search respects the access you already have.' },
      { title: 'Fast in both regions', description: 'Find workspace information with one keyboard shortcut.' },
    ],
    pageTitle: 'Search — Ultrakin',
    pageDesc:  'Search messages, mail, docs, records, people, and spaces with ⌘K, within your access.',
  },
};

export const PRODUCT_SLUGS = Object.keys(PRODUCT_META);
