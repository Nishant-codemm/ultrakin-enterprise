# Ultrakin Enterprise

[![React](https://img.shields.io/badge/React-19.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Oxlint](https://img.shields.io/badge/Linter-Oxlint-F59E0B?style=flat-square)](https://oxc.rs/)
[![Bundle Size](https://img.shields.io/badge/Gzip_Bundle-%3C205_KB-10B981?style=flat-square)](https://github.com/Nishant-codemm/ultrakin-enterprise)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

> The Autonomous Unified Workspace for High-Velocity Teams. A single, sovereign surface uniting decentralized chat, living docs, domain email, and real-time execution.

---

## Overview

Modern software teams spend hours every week context-switching across fragmented tools: chat clients, standalone wiki documents, siloed ticketing boards, and disconnected customer mailboxes.

**Ultrakin** unifies these critical primitives into a cohesive enterprise operating surface. Powered by an in-memory event bus and reactive workspace kernel, conversations and inbound client emails automatically synthesize into executable tasks, living documentation, and structured team workflows.

This repository contains the complete enterprise landing page and interactive product showcase, built with React 19, Vite 8, and Tailwind CSS 4.

---

## Key Features

- **Interactive Workspace Showcase:** Live interactive simulator featuring four primary application modules:
  - **Matrix E2EE Chat:** Real-time channel communications, threaded conversations, and AI copilot actions.
  - **Living Docs:** Real-time document editor with embedded task references and team presence.
  - **Custom Domain Mailbox:** Native domain email handling (`@acme.corp`) with automated triage and action synthesis.
  - **Live Huddles:** Ultra-low latency voice/video simulation with live transcript processing.
- **In-Memory Event Bus Telemetry:** Live event ledger demonstrating real-time message ingestion, task generation, and automated cross-system updates.
- **Dynamic Navigation Morph System:** A smart scroll-responsive top navigation bar that smoothly transitions between a full enterprise header and an elevated sticky command bar.
- **Global Command Palette (`⌘K` / `Ctrl+K`):** Fast workspace switching, quick action dispatching, and fuzzy section search.
- **Enterprise Design System:** Custom dark-mode UI with high-contrast typography, refined glassmorphic surfaces, layered elevation, and fluid spring micro-interactions.
- **Strict Performance Budget:** Fully bundled client assets under **205 KB gzipped**, achieving near-instant first contentful paint (FCP) and smooth 60 FPS animation loops.

---

## Tech Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime / UI** | React | `^19.3.1` | Component model, state management, and DOM reconciliation |
| **Bundler & Dev Server** | Vite | `^8.3.4` | Lightning-fast HMR and optimized production rollup |
| **Styling** | Tailwind CSS | `^4.3.3` | Utility-first design tokens and CSS variables |
| **Motion** | Framer Motion | `^14.4.0` | Fluid gesture controls, spring physics, and morphing transitions |
| **Icons** | Lucide React | `^1.59.0` | Consistent, accessible icon set |
| **Linter** | Oxlint | `^1.88.0` | High-performance Rust-based static code analysis |

---

## Architecture

The project is structured around decoupled presentation and state layers:

```
┌─────────────────────────────────────────────────────────────┐
│                       App Container                         │
├──────────────────────────────┬──────────────────────────────┤
│  Top Command Navigation      │  Global Command Palette (⌘K) │
│  (Navbar & Scroll Spy)       │  Keyboard Shortcuts Modal    │
├──────────────────────────────┴──────────────────────────────┤
│                      WorkspaceContext                       │
│    • Active Section & Scroll Position                       │
│    • Workspace Module State (Chat, Docs, Mail, Tasks)       │
│    • Real-Time Event Bus Queue & Telemetry                  │
├─────────────────────────────────────────────────────────────┤
│                    Application Sections                     │
│    • HeroSection & Interactive Product Showcase             │
│    • FeaturePills & Capabilities Grid                       │
│    • BentoGrid Architectural Overview                       │
│    • Security & Compliance Framework                        │
│    • Transparent Enterprise Pricing                         │
│    • Footer & Global Brand Anchors                          │
└─────────────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
ultrakin-enterprise/
├── docs/                        # Architectural specifications & blueprints
│   ├── 00_Ultrakin_Master_Specification.md
│   ├── 01_Slack_Enterprise_Research_Report.md
│   ├── 02_Ultrakin_Current_State_Audit.md
│   ├── 03_Slack_vs_Ultrakin_Strategic_Gap_Analysis.md
│   ├── 04_Ultrakin_Enterprise_Product_Requirements_Document.md
│   ├── 05_Ultrakin_Enterprise_Experience_Architecture.md
│   ├── 06_Ultrakin_Enterprise_Design_System_Specification.md
│   └── 07_Ultrakin_Engineering_Implementation_Blueprint.md
├── public/                      # Static assets & web manifest
│   ├── favicon.svg              # Canonical vector logo favicon
│   ├── manifest.webmanifest     # PWA metadata
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/                  # Images and static media
│   ├── components/              # Modular UI components
│   │   ├── primitives/          # Atomic primitives (Button, Badge, GlassCard, UltrakinLogo)
│   │   ├── showcase/            # Interactive engine simulators (Chat, Docs, Mail, Tasks)
│   │   ├── CommandPaletteModal.jsx
│   │   ├── FloatingOrbitPill.jsx
│   │   ├── KeyboardShortcutsModal.jsx
│   │   └── Navbar.jsx
│   ├── context/                 # Centralized state management
│   │   └── WorkspaceContext.jsx # In-memory event bus and reactive state
│   ├── lib/                     # Utility helpers (classnames / cn)
│   ├── sections/                # Full landing page sections
│   ├── App.jsx                  # Root application assembly
│   ├── index.css                # Global Tailwind directives & custom utilities
│   └── main.jsx                 # React root mount
├── .gitignore                   # Standard production ignore rules
├── .oxlintrc.json               # Linter configuration
├── index.html                   # HTML template & typography preconnects
├── package.json                 # Project dependencies & build scripts
├── README.md                    # Project documentation
└── vite.config.js               # Vite build configuration
```

---

## Getting Started

### Prerequisites

- **Node.js:** `>= 18.0.0`
- **npm:** `>= 9.0.0`

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/Nishant-codemm/ultrakin-enterprise.git

# Navigate into the project directory
cd ultrakin-enterprise

# Install dependencies
npm install
```

### Running Locally

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server on `http://localhost:5173` |
| `npm run build` | Compiles and minifies assets into `/dist` for production deployment |
| `npm run lint` | Runs `oxlint` static code analysis across all source files |
| `npm run preview` | Locally serves the production build in `/dist` for verification |

---

## Performance & Optimization

- **Bundle Efficiency:** Minified and tree-shaken with Vite/Rollup; gzipped bundle is **~183 KB** (JS) and **~20 KB** (CSS).
- **GPU-Accelerated Transforms:** Dynamic cards, floating badges, and interactive drawers utilize 3D transforms (`translate3d`, `scale3d`) to prevent layout thrashing and maintain 60 FPS.
- **Typography Optimization:** Preconnected Google Fonts (`Inter`, `Inter Display`, `JetBrains Mono`) with `font-display: swap` to prevent render blocking.
- **Resource Hygiene:** Zero unoptimized heavy runtime dependencies; SVG icons are modularly tree-shaken via `lucide-react`.

---

## Accessibility & UX

- **Semantic HTML:** Correct document outlines using `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Keyboard Navigation:** Full keyboard navigation support across all buttons, quick-switchers, and modal dialogs.
- **Reduced Motion:** Fully respects user OS preferences via `prefers-reduced-motion` media queries.
- **Color Contrast:** Dark obsidian surfaces (`#07090E`, `#0B0F19`) paired with slate/white foreground text meet WCAG 2.1 AA contrast requirements.

---

## Documentation

Comprehensive engineering blueprints and research specifications are available in the [`/docs`](./docs) folder:

- [`00_Ultrakin_Master_Specification.md`](./docs/00_Ultrakin_Master_Specification.md) — Master product specification and requirements.
- [`05_Ultrakin_Enterprise_Experience_Architecture.md`](./docs/05_Ultrakin_Enterprise_Experience_Architecture.md) — Component architecture and state lifecycle.
- [`06_Ultrakin_Enterprise_Design_System_Specification.md`](./docs/06_Ultrakin_Enterprise_Design_System_Specification.md) — Color tokens, typography, and elevations.
- [`07_Ultrakin_Engineering_Implementation_Blueprint.md`](./docs/07_Ultrakin_Engineering_Implementation_Blueprint.md) — Implementation architecture and technical roadmap.

---

## Browser Support

| Browser | Supported Versions |
| :--- | :--- |
| **Google Chrome** | Latest 2 versions |
| **Mozilla Firefox** | Latest 2 versions |
| **Apple Safari** | Latest 2 versions (macOS & iOS) |
| **Microsoft Edge** | Latest 2 versions |

---

## Future Roadmap

- [ ] WebRTC direct peer-to-peer data channels for zero-latency screen sharing.
- [ ] End-to-end client-side encryption key management integration (Vault / AWS KMS).
- [ ] Native desktop application wrappers using Tauri.

---

## Author

**Nishant Kumar**
- GitHub: [@Nishant-codemm](https://github.com/Nishant-codemm)
- Repository: [ultrakin-enterprise](https://github.com/Nishant-codemm/ultrakin-enterprise)

---

## License

This project is licensed under the [MIT License](LICENSE).
