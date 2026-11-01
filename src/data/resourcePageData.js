/**
 * resourcePageData.js
 * Comprehensive data fixtures and categories for the Ultrakin Resources Hub (/resources).
 * Features canonical workspace entities, authentic enterprise architectural guides,
 * deep documentation, production tutorials, and security whitepapers.
 */

export const RESOURCE_CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: 'Layers' },
  { id: 'architecture', label: 'Architecture Docs', icon: 'Code' },
  { id: 'guides', label: 'Operational Guides', icon: 'Compass' },
  { id: 'tutorials', label: 'Hands-on Tutorials', icon: 'Terminal' },
  { id: 'security', label: 'Trust & Whitepapers', icon: 'ShieldCheck' },
  { id: 'stories', label: 'Customer Case Studies', icon: 'Building2' },
];

export const FEATURED_RESOURCE = {
  id: 'core-workspace-engine',
  category: 'architecture',
  categoryLabel: 'Architecture Doc',
  title: 'Core Workspace Engine: Zero-Latency Polymorphic Data Model',
  subtitle: 'How Ultrakin unifies emails, audio war rooms, kanban tasks, and living documents into a single synchronized state tree.',
  readTime: '9 min read',
  date: 'Oct 24, 2026',
  badge: 'Featured Architecture',
  author: {
    name: 'Devin Zhao',
    initials: 'DZ',
    role: 'Staff Infrastructure Engineer',
    company: 'Apex Cloud',
    color: '#6366f1',
  },
  coverImage: 'terminal',
  tags: ['Architecture', 'State Machine', 'WebSockets', 'Polymorphic Schema'],
  summary: 'A deep architectural teardown of how Ultrakin eliminates SaaS silos. Explores the CRDT event log, WebSocket presence protocol, RFC-822 email parser, and zero-data-retention AI worker pools.',
  content: [
    {
      heading: 'The Problem with Fragmented SaaS Silos',
      body: 'In traditional enterprise stacks, customer support lives in Zendesk, engineering sprints live in Jira, team chatter lives in Slack, and executive specs live in Google Docs. When a production incident occurs, context is fragmented across 4 browser tabs. Ultrakin replaces this with a single distributed state tree where every entity—whether an email, a pull request, or a mutual action plan—shares the same underlying schema.',
    },
    {
      heading: 'The Polymorphic Entity Graph',
      body: 'Instead of storing separate records for tickets and tasks, Ultrakin defines a polymorphic record primitive. A ticket (like SR-28) is simply an email thread with an attached state machine. When an engineer merges PR #412 on GitHub, the event propagates through the CRDT journal, automatically updating the Customer Support thread in real time.',
    },
    {
      heading: 'Zero-Latency Presence & Collision Guardrails',
      body: 'Real-time presence is broadcast over encrypted WebSockets at 60Hz. If Priya is drafting a response to Elena Rostova, a deterministic lock beacon is broadcast to all active workspace clients, preventing collision and double-replies with zero server roundtrips.',
    },
  ],
};

export const RESOURCES_LIST = [
  {
    id: 'mcp-agent-integration',
    category: 'tutorials',
    categoryLabel: 'Hands-on Tutorial',
    title: 'Connecting Custom Tools to Ukin via Model Context Protocol (MCP)',
    description: 'Step-by-step tutorial to expose your internal Postgres database and billing APIs as secure tools for autonomous Ukin agents.',
    readTime: '6 min read',
    date: 'Oct 28, 2026',
    author: {
      name: 'Devin Zhao',
      initials: 'DZ',
      role: 'Staff Infrastructure Engineer',
      color: '#6366f1',
    },
    tags: ['MCP', 'AI Agents', 'APIs'],
    featured: false,
    content: [
      {
        heading: 'Overview of Model Context Protocol',
        body: 'MCP enables AI agents to query external systems securely without exposing raw database credentials. By deploying a lightweight Docker sidecar, your workspace gains access to custom enterprise actions.',
      },
      {
        heading: 'Defining Schema Handlers',
        body: 'Configure tool declarations using standard JSON schema. Ukin auto-validates inputs, requests biometric confirmation on destructive actions, and logs all invocations to the workspace audit ledger.',
      },
    ],
  },
  {
    id: 'zendesk-migration-playbook',
    category: 'guides',
    categoryLabel: 'Operational Guide',
    title: 'Migrating from Zendesk + Slack to a Single Workspace',
    description: 'A comprehensive playbook for moving 500+ customer support agents to shared domain mailboxes without downtime or lost ticket history.',
    readTime: '8 min read',
    date: 'Oct 19, 2026',
    author: {
      name: 'Elena Rostova',
      initials: 'ER',
      role: 'Head of Customer Experience',
      color: '#ef4444',
    },
    tags: ['Migration', 'Customer Support', 'Playbook'],
    featured: false,
    content: [
      {
        heading: 'Phase 1: Dual-Delivery MX Routing',
        body: 'Set up Google Workspace / Microsoft 365 dual-delivery so inbound emails route simultaneously to your legacy Zendesk queue and Ultrakin shared inboxes for risk-free shadow testing.',
      },
      {
        heading: 'Phase 2: Thread History Ingestion',
        body: 'Ultrakin’s one-click IMAP/REST importer pulls historical threads, preserving original RFC message IDs, customer tags, and SLA resolution timestamps.',
      },
    ],
  },
  {
    id: 'zero-retention-security-whitepaper',
    category: 'security',
    categoryLabel: 'Trust & Whitepapers',
    title: 'Zero-Data-Retention Architecture for Legal & Financial Data',
    description: 'Technical whitepaper on Ultrakin’s ephemeral in-memory LLM processing, AES-256 vault encryption, and SEC/IRS tamper-evident audit trails.',
    readTime: '12 min read',
    date: 'Oct 15, 2026',
    author: {
      name: 'Eleanor Sterling',
      initials: 'ES',
      role: 'Managing Partner & CPA',
      color: '#475569',
    },
    tags: ['SOC 2', 'Encryption', 'Legal AI', 'Compliance'],
    featured: false,
    content: [
      {
        heading: 'The Ethical Wall Isolation Model',
        body: 'Enterprise legal and M&A transactions demand that confidential client documents are never leaked across customer tenants or used to train third-party foundation models.',
      },
      {
        heading: 'Cryptographic SHA-256 Hash Chains',
        body: 'Every document upload, view, download, and partner signature appends a block to an immutable audit ledger, providing mathematical proof for regulatory compliance audits.',
      },
    ],
  },
  {
    id: 'meridian-sales-case-study',
    category: 'stories',
    categoryLabel: 'Customer Case Study',
    title: 'How Meridian Systems Cut Deal Cycles by 42% Using Living MAPs',
    description: 'Discover how Marcus Vance and the Meridian enterprise sales team replaced static PDF order forms with collaborative living Mutual Action Plans.',
    readTime: '5 min read',
    date: 'Oct 12, 2026',
    author: {
      name: 'Marcus Vance',
      initials: 'MV',
      role: 'Enterprise Account Executive',
      color: '#059669',
    },
    tags: ['Sales', 'Enterprise', 'Case Study'],
    featured: false,
    content: [
      {
        heading: 'The Friction of Static Proposals',
        body: 'Traditional sales cycles lose momentum waiting for legal redlines over email attachments. Meridian Systems moved their proposals directly into Ultrakin collaborative docs.',
      },
      {
        heading: 'The Outcome: 42% Faster Handoff to CS',
        body: 'When Meridian signed DEAL-409 ($120k ARR), the mutual plan automatically initialized the onboarding project in Lists and notified Elena Rostova in Customer Support.',
      },
    ],
  },
  {
    id: 'automated-procurement-pipeline',
    category: 'tutorials',
    categoryLabel: 'Hands-on Tutorial',
    title: 'Building Multi-Tier Approval Workflows with Rule Engines',
    description: 'Learn how to build automated procurement workflows that verify Capex budgets, route orders > $10,000 to executives, and record ledger entries.',
    readTime: '7 min read',
    date: 'Oct 08, 2026',
    author: {
      name: 'Sarah Jenkins',
      initials: 'SJ',
      role: 'VP of Business Operations',
      color: '#d97706',
    },
    tags: ['Operations', 'Automations', 'Workflows'],
    featured: false,
    content: [
      {
        heading: 'Defining Conditional Rules',
        body: 'Using Ultrakin Automations, configure rule nodes: IF department equals Engineering AND total exceeds $10,000, trigger COO executive signoff card in chat.',
      },
      {
        heading: 'Automated Asset Ledger Logging',
        body: 'Once approved, the system generates a virtual purchase order and commits entry PR-204 to the IT equipment registry with zero manual data entry.',
      },
    ],
  },
  {
    id: 'audio-huddle-webrtc-architecture',
    category: 'architecture',
    categoryLabel: 'Architecture Doc',
    title: 'Low-Latency Selective Forwarding Unit (SFU) for Instant Huddles',
    description: 'How Ultrakin achieves sub-80ms voice latency with native WebRTC, Opus audio codecs, and server-side noise cancellation for instant incident war rooms.',
    readTime: '10 min read',
    date: 'Sep 30, 2026',
    author: {
      name: 'Devin Zhao',
      initials: 'DZ',
      role: 'Staff Infrastructure Engineer',
      color: '#6366f1',
    },
    tags: ['WebRTC', 'Audio', 'Infrastructure', 'Networking'],
    featured: false,
    content: [
      {
        heading: 'Sub-80ms Global Audio Mesh',
        body: 'By deploying edge SFU nodes in 14 global regions, team huddles connect in under 200ms without the startup overhead of external video conferencing apps.',
      },
      {
        heading: 'Real-Time Audio Waveform Telemetry',
        body: 'Voice cadence and speaking activity are analyzed client-side via Web Audio API analyzers, driving fluid SVG equalizer visualizations with minimal CPU footprint.',
      },
    ],
  },
  {
    id: 'dtc-shopify-inventory-sync',
    category: 'guides',
    categoryLabel: 'Operational Guide',
    title: 'Synchronizing Real-Time Shopify & 3PL Webhooks with Customer Care',
    description: 'A technical guide on embedding warehouse stock counts, automated return label generation, and VIP buyer signals into customer conversations.',
    readTime: '6 min read',
    date: 'Sep 22, 2026',
    author: {
      name: 'Liam Torres',
      initials: 'LT',
      role: 'DTC Operations Lead',
      color: '#f59e0b',
    },
    tags: ['Ecommerce', 'Shopify', 'Logistics'],
    featured: false,
    content: [
      {
        heading: 'Eliminating the 5-Tab Chaos',
        body: 'E-commerce support teams typically navigate between Shopify, ShipStation, Zendesk, and Gorgias. Ultrakin displays customer LTV and live stock directly alongside emails.',
      },
      {
        heading: 'Automated Prepaid Return Slips',
        body: 'Clicking generate return label calls carrier APIs (USPS/FedEx), reserves the replacement item in the closest warehouse, and sends tracking links in one atomic operation.',
      },
    ],
  },
  {
    id: 'field-dispatch-mobile-architecture',
    category: 'stories',
    categoryLabel: 'Customer Case Study',
    title: 'Dispatching 40+ HVAC Technicians with Real-Time Mobile Job Cards',
    description: 'How Apex Comfort Mechanical transitioned from paper work orders to dynamic GPS dispatch boards, mobile diagnostic checklists, and on-glass digital signoffs.',
    readTime: '5 min read',
    date: 'Sep 15, 2026',
    author: {
      name: 'Ray Kowalski',
      initials: 'RK',
      role: 'Dispatch & Fleet Director',
      color: '#10b981',
    },
    tags: ['Field Services', 'Mobile', 'Dispatch'],
    featured: false,
    content: [
      {
        heading: 'Dynamic Fleet Kanban',
        body: 'Dispatchers view real-time technician routes, job status, and travel times. Dragging Job #409 advances the technician from In Route to On Site seamlessly.',
      },
      {
        heading: 'Instant Invoicing on Site',
        body: 'Upon replacing the compressor relay, technician Sam Ortiz captures the customer signature directly on tablet glass, instantly issuing Invoice #INV-889.',
      },
    ],
  },
];
