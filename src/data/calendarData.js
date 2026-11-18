/**
 * calendarData.js
 * Comprehensive authentic data foundation for the Ultrakin Events & Calendar ecosystem.
 * Includes multi-view datasets, recurrence, attendees with timezone metadata,
 * dynamic RSVP states, WebRTC Huddle session details, and Ukin AI synthesis notes.
 */

export const CALENDAR_PERSONAS = {
  sara: {
    id: 'usr_sara',
    name: 'Sara Chen',
    initials: 'SC',
    email: 'sara@acmecorp.com',
    role: 'Principal Infra Engineer',
    color: '#059669',
    avatarBg: 'bg-emerald-600',
    timezone: 'PST (UTC-8)',
    status: 'online',
  },
  alex: {
    id: 'usr_alex',
    name: 'Alex Mercer',
    initials: 'AM',
    email: 'alex@acmecorp.com',
    role: 'Staff Architect',
    color: '#3156cf',
    avatarBg: 'bg-indigo-600',
    timezone: 'PST (UTC-8)',
    status: 'online',
  },
  elena: {
    id: 'usr_elena',
    name: 'Elena Rostova',
    initials: 'EL',
    email: 'elena@acmecorp.com',
    role: 'Lead Product Manager',
    color: '#7c3aed',
    avatarBg: 'bg-purple-600',
    timezone: 'CET (UTC+1)',
    status: 'in-call',
  },
  maya: {
    id: 'usr_maya',
    name: 'Maya Chen',
    initials: 'MC',
    email: 'maya@acmecorp.com',
    role: 'Design Lead',
    color: '#c026d3',
    avatarBg: 'bg-fuchsia-600',
    timezone: 'PST (UTC-8)',
    status: 'online',
  },
  david: {
    id: 'usr_david',
    name: 'David Vance',
    initials: 'DV',
    email: 'david@acmecorp.com',
    role: 'VP Infrastructure',
    color: '#d97706',
    avatarBg: 'bg-amber-600',
    timezone: 'EST (UTC-5)',
    status: 'away',
  },
  sam: {
    id: 'usr_sam',
    name: 'Sam Ortiz',
    initials: 'SO',
    email: 'sam@acmecorp.com',
    role: 'Customer Ops Lead',
    color: '#dc2626',
    avatarBg: 'bg-rose-600',
    timezone: 'PST (UTC-8)',
    status: 'offline',
  },
  priya: {
    id: 'usr_priya',
    name: 'Priya K',
    initials: 'PK',
    email: 'priya@acmecorp.com',
    role: 'Product Designer',
    color: '#0891b2',
    avatarBg: 'bg-cyan-600',
    timezone: 'IST (UTC+5:30)',
    status: 'online',
  },
};

export const INITIAL_CALENDAR_EVENTS = [
  {
    id: 'evt_1',
    title: 'Sprint 42 Architecture Review',
    day: 3, // Thursday (0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun)
    date: '2026-11-12',
    startHour: 15.0, // 3:00 PM
    duration: 1.0,   // 1 hour
    color: '#3156cf',
    category: 'engineering',
    isHuddle: true,
    isHuddleActive: true,
    huddleRoom: '/workspace/acme/events/evt_1/session',
    huddleParticipantsCount: 4,
    host: CALENDAR_PERSONAS.sara,
    userRsvp: 'going', // 'going' | 'maybe' | 'declined' | 'pending'
    attendees: [
      { ...CALENDAR_PERSONAS.sara, rsvp: 'going', isOrganizer: true },
      { ...CALENDAR_PERSONAS.alex, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.elena, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.maya, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.david, rsvp: 'maybe', isOrganizer: false },
      { ...CALENDAR_PERSONAS.sam, rsvp: 'pending', isOrganizer: false },
    ],
    description: 'Review token cache migration RFC, verify Redis failover latency under synthetic load, and align on EU cluster rollout checklist.',
    recurrence: 'Weekly on Thursday',
    linkedDoc: {
      id: 'doc_rfc_04',
      title: 'Q4 EU Cluster RFC (v2.4)',
    },
    linkedTask: {
      id: 'tsk_4082',
      title: '#4082 Intermittent SSL Handshake Timeout',
    },
    aiSummary: {
      consensus: 'Adopt CockroachDB for multi-region tenancy and keep local Redis token cache with 45m jittered TTL.',
      decisions: [
        'TLS 1.3 session tickets enabled for all EU cluster edge endpoints.',
        'Token refresh timeout capped at 300ms before triggering local fallback.',
      ],
      actionItems: [
        {
          id: 'act_1',
          text: '@alex: Benchmark CockroachDB write latencies across Frankfurt and Virginia nodes',
          assignee: 'Alex Mercer',
          due: 'Friday',
          completed: false,
        },
        {
          id: 'act_2',
          text: '@sara: Add automated cluster failover tests to launch checklist',
          assignee: 'Sara Chen',
          due: 'Monday',
          completed: true,
        },
      ],
    },
    discussion: [
      {
        id: 'disc_1',
        sender: CALENDAR_PERSONAS.sara,
        time: '2:45 PM',
        text: 'I uploaded the benchmark script to the shared RFC doc. Please take a look at section 3 before we hop on.',
      },
      {
        id: 'disc_2',
        sender: CALENDAR_PERSONAS.alex,
        time: '2:50 PM',
        text: 'Checked the write latency numbers—looking clean. Ready to discuss.',
      },
    ],
  },
  {
    id: 'evt_2',
    title: 'Customer SLA Escalation Review',
    day: 2, // Wednesday
    date: '2026-11-11',
    startHour: 14.0, // 2:00 PM
    duration: 1.5,
    color: '#059669',
    category: 'client',
    isHuddle: true,
    isHuddleActive: false,
    huddleRoom: '/workspace/acme/events/evt_2/session',
    huddleParticipantsCount: 0,
    host: CALENDAR_PERSONAS.sam,
    userRsvp: 'going',
    attendees: [
      { ...CALENDAR_PERSONAS.sam, rsvp: 'going', isOrganizer: true },
      { ...CALENDAR_PERSONAS.elena, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.alex, rsvp: 'maybe', isOrganizer: false },
      { ...CALENDAR_PERSONAS.david, rsvp: 'going', isOrganizer: false },
    ],
    description: 'Review Q3 enterprise uptime reports, SLA commitments, and high-priority customer ticket response times.',
    recurrence: 'Bi-weekly on Wednesday',
    linkedDoc: {
      id: 'doc_sla_q3',
      title: 'Enterprise SLA & Incident Postmortem',
    },
    linkedTask: null,
    aiSummary: {
      consensus: 'SLA guarantees met at 99.98% for October. Need automated status page notifications for future incidents.',
      decisions: [
        'Deploy public status badge to app header by next sprint.',
      ],
      actionItems: [
        {
          id: 'act_2_1',
          text: '@sam: Draft customer incident notification template for support team',
          assignee: 'Sam Ortiz',
          due: 'Wednesday',
          completed: false,
        },
      ],
    },
    discussion: [
      {
        id: 'disc_2_1',
        sender: CALENDAR_PERSONAS.sam,
        time: '1:30 PM',
        text: 'Attaching the customer feedback spreadsheet from Acme Corp.',
      },
    ],
  },
  {
    id: 'evt_3',
    title: 'Core Platform Daily Standup',
    day: 1, // Tuesday
    date: '2026-11-10',
    startHour: 9.5, // 9:30 AM
    duration: 0.5,
    color: '#d97706',
    category: 'standup',
    isHuddle: true,
    isHuddleActive: false,
    huddleRoom: '/workspace/acme/events/evt_3/session',
    huddleParticipantsCount: 0,
    host: CALENDAR_PERSONAS.alex,
    userRsvp: 'going',
    attendees: [
      { ...CALENDAR_PERSONAS.alex, rsvp: 'going', isOrganizer: true },
      { ...CALENDAR_PERSONAS.sara, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.maya, rsvp: 'going', isOrganizer: false },
    ],
    description: '15-minute sync on daily blockers, code review handoffs, and deployment verification.',
    recurrence: 'Daily (Mon-Fri)',
    linkedDoc: null,
    linkedTask: null,
    aiSummary: null,
    discussion: [],
  },
  {
    id: 'evt_4',
    title: 'Design System & Micro-Interactions Review',
    day: 1, // Tuesday
    date: '2026-11-10',
    startHour: 11.0, // 11:00 AM
    duration: 1.0,
    color: '#c026d3',
    category: 'design',
    isHuddle: true,
    isHuddleActive: false,
    huddleRoom: '/workspace/acme/events/evt_4/session',
    huddleParticipantsCount: 0,
    host: CALENDAR_PERSONAS.maya,
    userRsvp: 'maybe',
    attendees: [
      { ...CALENDAR_PERSONAS.maya, rsvp: 'going', isOrganizer: true },
      { ...CALENDAR_PERSONAS.priya, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.sara, rsvp: 'maybe', isOrganizer: false },
    ],
    description: 'Audit dark glass surfaces, orbital topology canvas spring transitions, and focus-visible rings across all modal components.',
    recurrence: 'Weekly on Tuesday',
    linkedDoc: {
      id: 'doc_ds_spec',
      title: 'Ultrakin Design System Tokens (v3)',
    },
    linkedTask: null,
    aiSummary: null,
    discussion: [],
  },
  {
    id: 'evt_5',
    title: 'Engineering All-Hands & Sprint Retrospective',
    day: 4, // Friday
    date: '2026-11-13',
    startHour: 16.0, // 4:00 PM
    duration: 1.0,
    color: '#7c3aed',
    category: 'engineering',
    isHuddle: true,
    isHuddleActive: false,
    huddleRoom: '/workspace/acme/events/evt_5/session',
    huddleParticipantsCount: 0,
    host: CALENDAR_PERSONAS.elena,
    userRsvp: 'pending',
    attendees: [
      { ...CALENDAR_PERSONAS.elena, rsvp: 'going', isOrganizer: true },
      { ...CALENDAR_PERSONAS.sara, rsvp: 'pending', isOrganizer: false },
      { ...CALENDAR_PERSONAS.alex, rsvp: 'pending', isOrganizer: false },
      { ...CALENDAR_PERSONAS.maya, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.david, rsvp: 'going', isOrganizer: false },
      { ...CALENDAR_PERSONAS.sam, rsvp: 'going', isOrganizer: false },
    ],
    description: 'Bi-weekly retrospective covering Sprint 41 velocity, architectural milestones, and upcoming sprint commitments.',
    recurrence: 'Bi-weekly on Friday',
    linkedDoc: null,
    linkedTask: null,
    aiSummary: null,
    discussion: [],
  },
];

export const CALENDAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const CALENDAR_HOURS = [
  8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
];
