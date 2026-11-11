import React from 'react';
import {
  MessageSquare,
  Mail,
  Video,
  CheckSquare,
  Calendar,
  FileText,
  Sparkles,
  Cpu,
  Route,
  ClipboardList,
  ListTodo,
} from 'lucide-react';

export const CATEGORIES = ['Built in', 'Extension examples'];

/* ─── Dedicated SVG Brand Marks for Developer Tools & Extensions ─── */
export function GitHubIcon({ size = 16, className = '' }) {
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      className,
      'aria-hidden': 'true',
    },
    React.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
    })
  );
}

export function PostHogIcon({ size = 16, className = '' }) {
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      className,
      'aria-hidden': 'true',
    },
    React.createElement('path', {
      d: 'M4 14.5V9.5C4 6.46 6.46 4 9.5 4h5c3.04 0 5.5 2.46 5.5 5.5v5c0 3.04-2.46 5.5-5.5 5.5h-5C6.46 20 4 17.54 4 14.5Z',
      fillOpacity: '0.25',
    }),
    React.createElement('path', {
      d: 'M7.5 13.5h2v3.5h-2v-3.5zm3.5-5.5h2v9h-2V8zm3.5 3h2v6h-2v-6z',
    })
  );
}

/* ─── Product Icon & Badge Mapping matching Navigation Mega-Menu ─── */
export const PRODUCT_ICON_CONFIG = {
  Spaces:      { icon: MessageSquare, bg: 'bg-[#5c5bd6]', glow: '#5c5bd6' },
  Mail:        { icon: Mail,          bg: 'bg-[#dc2626]', glow: '#dc2626' },
  Meetings:    { icon: Video,         bg: 'bg-[#059669]', glow: '#059669' },
  Tasks:       { icon: CheckSquare,   bg: 'bg-[#10b981]', glow: '#10b981' },
  Calendar:    { icon: Calendar,      bg: 'bg-[#d97706]', glow: '#d97706' },
  Docs:        { icon: FileText,      bg: 'bg-[#2563eb]', glow: '#2563eb' },
  'Ukin agent':{ icon: Sparkles,      bg: 'bg-[#8b5cf6]', glow: '#8b5cf6' },
  GitHub:      { icon: GitHubIcon,    bg: 'bg-[#181d24]', glow: '#64748b' },
  PostHog:     { icon: PostHogIcon,   bg: 'bg-[#ea580c]', glow: '#ea580c' },
  'MCP tools': { icon: Cpu,           bg: 'bg-[#0284c7]', glow: '#0284c7' },
  Journeys:    { icon: Route,         bg: 'bg-[#c026d3]', glow: '#c026d3' },
  Forms:       { icon: ClipboardList, bg: 'bg-[#2563eb]', glow: '#2563eb' },
  Lists:       { icon: ListTodo,      bg: 'bg-[#10b981]', glow: '#10b981' },
};

export const INTEGRATIONS = [
  { name: 'Spaces',     category: 'Built in',          badge: 'Conversations',                      desc: 'Spaces, direct messages, and huddles are where team signals arrive.',                        color: '#b9bbff', iconLetter: 'SP',  point: [112, 78]  },
  { name: 'Mail',       category: 'Built in',          badge: 'Business · shared mailbox',          desc: 'Route customer email into owned work and connected threads.',                               color: '#c6c9ff', iconLetter: 'ML',  point: [310, 50]  },
  { name: 'Meetings',   category: 'Built in',          badge: 'Live collaboration',                  desc: 'Meet, capture the important context, and carry the next step forward.',                     color: '#aeb3ff', iconLetter: 'MT',  point: [510, 78]  },
  { name: 'Tasks',      category: 'Built in',          badge: 'Follow-through',                     desc: 'Give every next step an owner and a place to move toward done.',                            color: '#a6d4c4', iconLetter: 'TK',  point: [548, 210] },
  { name: 'Calendar',   category: 'Built in',          badge: 'Time and availability',              desc: 'Keep schedules and team availability inside the same workspace.',                           color: '#e1c38b', iconLetter: 'CA',  point: [505, 340] },
  { name: 'Docs',       category: 'Built in',          badge: 'Shared context',                     desc: 'Keep knowledge close to the work and decisions it informs.',                               color: '#c4b6ff', iconLetter: 'DC',  point: [310, 362] },
  { name: 'Ukin agent', category: 'Built in',          badge: 'Intelligence across the workspace',  desc: 'Ukin works across workspace context to surface and move work forward.',                     color: '#d0d2ff', iconLetter: 'UK',  point: [112, 340] },
  { name: 'GitHub',     category: 'Extension examples',badge: 'Illustrative · developer tools',    desc: 'An example of how developer-tool context sits alongside team work.',                        color: '#c0c6d2', iconLetter: 'GH',  point: [126, 82]  },
  { name: 'PostHog',    category: 'Extension examples',badge: 'Illustrative · product analytics',  desc: 'An example of keeping product analytics context close to team work.',                       color: '#e9b18a', iconLetter: 'PH',  point: [494, 70]  },
  { name: 'MCP tools',  category: 'Extension examples',badge: 'Illustrative · external tools',     desc: 'An example of connecting approved external tools through MCP.',                             color: '#a8c9c2', iconLetter: 'MCP', point: [550, 210] },
  { name: 'Journeys',   category: 'Extension examples',badge: 'Illustrative · app ecosystem',      desc: 'An example of extending the workspace with an installable app.',                           color: '#c6b5f2', iconLetter: 'JR',  point: [490, 344] },
  { name: 'Forms',      category: 'Extension examples',badge: 'Illustrative · structured intake',  desc: 'An example of bringing structured requests into the team workspace.',                       color: '#a8c1ec', iconLetter: 'FM',  point: [142, 348] },
  { name: 'Lists',      category: 'Extension examples',badge: 'Illustrative · lightweight tracking',desc: 'An example of adding lightweight tracking alongside team work.',                           color: '#b5d3a5', iconLetter: 'LS',  point: [98, 210] },
];

export const CENTER = [310, 210];

/* ─── DEDICATED HUB INTERFACE PORTS (Squircle Perimeter Anchors) ─── */
export const HUB_PORTS = {
  west:  [266, 210],
  east:  [354, 210],
  north: [310, 166],
  south: [310, 254],
};

/* ─── DEDICATED NODE PERIMETER PORTS (Card Edge Sockets) ─── */
export const NODE_PORTS = {
  Spaces:      [136, 78],
  Mail:        [310, 74],
  Meetings:    [486, 78],
  Tasks:       [524, 210],
  Calendar:    [481, 340],
  Docs:        [310, 338],
  'Ukin agent':[136, 340],
  GitHub:      [150, 82],
  PostHog:     [470, 70],
  'MCP tools': [526, 210],
  Journeys:    [466, 344],
  Forms:       [166, 348],
  Lists:       [122, 210],
};

/* ─── CONTINUOUS ENTERPRISE BUS TOPOLOGY (Master Arterial Highway) ─── */
/* Ingress enters from left (-30, 78), rides Spaces stub, merges into West Trunk,
   flows through Ultrakin Core (266 -> 354), through Tasks (524, 210), out to East (660, 210). */
export const PATH_HERO_CROSS_SECTION =
  'M -30 78 L 152 78 C 185 78, 185 210, 218 210 L 266 210 L 354 210 L 524 210 L 660 210';

/* ─── DETERMINISTIC FEEDER ARTERIES (Node Port -> Orthogonal Stub -> S-Curve -> Combiner -> Core) ─── */
export const FEEDER_PATHS = {
  Spaces:      'M 136 78 L 152 78 C 185 78, 185 210, 218 210 L 266 210',
  Mail:        'M 310 74 L 310 166',
  Meetings:    'M 486 78 L 470 78 C 436 78, 436 210, 402 210 L 354 210',
  Tasks:       'M 524 210 L 354 210',
  Calendar:    'M 481 340 L 465 340 C 433.5 340, 433.5 210, 402 210 L 354 210',
  Docs:        'M 310 338 L 310 254',
  'Ukin agent':'M 136 340 L 152 340 C 185 340, 185 210, 218 210 L 266 210',
  // Extension Examples Feeder Branches
  GitHub:      'M 150 82 L 164 82 C 191 82, 191 210, 218 210 L 266 210',
  PostHog:     'M 470 70 L 456 70 C 429 70, 429 210, 402 210 L 354 210',
  'MCP tools': 'M 526 210 L 354 210',
  Journeys:    'M 466 344 L 452 344 C 427 344, 427 210, 402 210 L 354 210',
  Forms:       'M 166 348 L 180 348 C 199 348, 199 210, 218 210 L 266 210',
  Lists:       'M 122 210 L 266 210',
};

export const PREVIEWS = {
  Spaces:      { surface: 'launch-planning',       actor: 'Maya Chen',       message: 'The handoff is ready for review. I linked the launch checklist here.',          outcome: 'Decision captured in the launch brief',     icon: 'SC' },
  Mail:        { surface: 'shared inbox',           actor: 'Customer success',message: 'We need to move our onboarding session to Thursday.',                           outcome: 'Reply drafted · follow-up assigned',        icon: 'ML' },
  Meetings:    { surface: 'product sync · 10:30',   actor: 'Huddle notes',    message: 'The team agreed to keep the beta invite-only through launch week.',              outcome: 'Summary ready for the team',                icon: 'MT' },
  Tasks:       { surface: 'launch checklist',       actor: 'Jon Bell',        message: 'Review beta onboarding flow',                                                   outcome: 'In progress · due today',                   icon: 'TK' },
  Calendar:    { surface: 'team calendar',          actor: 'Next up · 2:30 PM',message: 'Beta readiness review · 4 attendees',                                          outcome: 'Agenda linked to launch planning',          icon: 'CA' },
  Docs:        { surface: 'launch brief',           actor: 'Updated just now', message: 'Beta scope, owners, and launch criteria in one shared document.',              outcome: 'Connected to 3 decisions',                  icon: 'DC' },
  'Ukin agent':{ surface: 'workspace signal',       actor: 'Ukin noticed',    message: 'The same onboarding question came up in three conversations this week.',        outcome: 'Suggested: add it to the launch brief',     icon: 'UK' },
  GitHub:      { surface: 'acme/core-repo',         actor: 'PR #412 merged',  message: 'feat: add telemetry streaming and webhook verification',                        outcome: '14 checks passed · released to staging',   icon: 'GH' },
  PostHog:     { surface: 'product telemetry',      actor: 'Retention metric',message: 'Activation velocity increased 18.4% across the enterprise cohort.',             outcome: 'Report synced to executive dashboard',     icon: 'PH' },
  'MCP tools': { surface: 'mcp-gateway',            actor: 'System agent',    message: 'Acme CRM, Postgres, and Vector store tools initialized over MCP.',              outcome: 'Authenticated · 12ms latency',             icon: 'MC' },
  Journeys:    { surface: 'customer-lifecycle',     actor: 'Journey engine',  message: 'Customer moved to Enterprise Tier milestone after contract execution.',          outcome: 'Triggered kickoff workflow',                icon: 'JR' },
  Forms:       { surface: 'intake-gateway',         actor: 'Request intake',  message: 'New enterprise security review submitted by Northwind Traders.',                outcome: 'Triage ticket SR-88 created',               icon: 'FM' },
  Lists:       { surface: 'asset-tracker',          actor: 'Operations team', message: 'SOC2 Type II compliance evidence checklist updated for Q4.',                    outcome: '12 items verified · audit ready',           icon: 'LS' },
};
