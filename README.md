# Ultrakin Enterprise

**The autonomous workspace for fast teams.** Chat, shared mail, living docs, huddles, Kanban tasks, and context-aware AI agents — unified in one SPA.

🔗 **Live:** [ultrakin-enterprise.vercel.app](https://ultrakin-enterprise.vercel.app)

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI Framework | React 19 (concurrent, lazy-loaded routes) |
| Build | Vite 8 (Rolldown bundler, sub-5s production builds) |
| Styling | Tailwind CSS v4 (`@theme` semantic design tokens) |
| Animation | Framer Motion 14 (GPU-composited, `layoutId` springs) |
| Linter | Oxlint (127-file sweep, 104 rules, ~350ms) |
| Deployment | Vercel (auto-deploy on `main` push) |

---

## Engineering Highlights

- **60fps GPU-composited motion** — every transition uses `transform`/`opacity` only; zero layout-thrashing properties animated.
- **`Cmd+K` Command Palette** — O(1) pre-indexed entity lookup across all modules with fuzzy search, keyboard navigation, and context-aware AI prompts per active module.
- **Semantic design token system** — full `@theme` layer in Tailwind v4 (`text-ink`, `text-ink-muted`, `bg-surface`, `border-border`, `ring-focus`, etc.). Zero raw hex in component layer.
- **Lazy-loaded route chunks** — every page and demo is a separate Vite chunk; `react-vendor` (219 kB gz 68 kB) and `motion-vendor` (148 kB gz 49 kB) split into their own long-cached assets.
- **Prefers-reduced-motion** — scroll behaviour and all entrance animations respect the OS accessibility setting.
- **SPA routing** — custom `navigate.js` helper intercepts all internal links; zero full-page reloads on client navigation.
- **Error boundaries** — component-level `ErrorBoundary` with chunk-load auto-recovery and optional telemetry callback.
- **OG / Twitter meta** — dynamic per-route Open Graph and Twitter Card tags injected via `useEffect` on product and solution sub-pages.

---

## Project Structure

```
src/
├── App.jsx                    # SPA router, lazy imports, canonical meta
├── index.css                  # Tailwind v4 @theme token definitions
│
├── components/
│   ├── common/                # ErrorBoundary, shared utilities
│   ├── primitives/            # UltrakinLogo, Badge, Button, TiltCard, AvatarChip
│   ├── product/               # ProductPage composition layer
│   │   ├── DemoWindowFrame    # Chrome frame wrapper for all product demos
│   │   ├── ProductFeatureGrid # 3-col capability grid with token-based theming
│   │   ├── ProductContinuitySections # Cross-sell handoff rows
│   │   ├── WorkspaceAppRail   # Persistent left-rail navigation shell
│   │   └── ...
│   ├── showcase/              # Interactive homepage showcase components
│   │   ├── calendar/          # Full calendar engine (month/week/day/agenda views)
│   │   ├── huddle/            # Huddle Simulator (audio waveform, transcript, canvas)
│   │   ├── HeroInteractiveDemo
│   │   ├── HuddleSimulator
│   │   ├── KanbanTaskBoard
│   │   ├── LivingDocEditor
│   │   ├── OrbitalReactorMesh # WebGL-free GPU mesh animation
│   │   └── VisualAutomationsCanvas
│   └── solution/              # Agent showcase cards per solution vertical
│
├── context/
│   └── WorkspaceContext.jsx   # Global module state (active app, cmd palette open)
│
├── data/
│   ├── productPageData.js     # PRODUCT_META, DEMO_MAP, dmMessages
│   └── solutionPageData.js    # SOLUTION_META, SOLUTION_MAP, SOLUTION_TEMPLATES_ASIDE
│
├── lib/
│   ├── navigate.js            # SPA navigate helper (reduced-motion aware)
│   ├── useClipboard.js
│   └── useFocusTrap.js
│
├── pages/
│   ├── ProductPage.jsx        # Universal /products/:slug handler
│   ├── SolutionPage.jsx       # Universal /solutions/:slug handler
│   ├── PricingPage.jsx
│   ├── SecurityPage.jsx
│   ├── SolutionsOverviewPage.jsx
│   ├── ResourcesPage.jsx      # Architecture hub with article reader modal
│   ├── WorkspacePage.jsx
│   ├── LegalPage.jsx          # /privacy, /terms, /dpa, /subprocessors, /soc2
│   ├── NotFoundPage.jsx
│   ├── products/              # Per-product interactive demos
│   │   ├── ChatProductDemo    # DM rows, channel switcher, mobile pill bar
│   │   ├── DocsProductDemo
│   │   ├── ListsProductDemo
│   │   ├── MailProductDemo
│   │   ├── AgentsProductDemo
│   │   ├── AutomationsProductDemo
│   │   ├── CallsProductDemo
│   │   └── ...
│   └── solutions/             # Per-solution interactive demos (11 verticals)
│
└── sections/                  # Homepage sections
    ├── HeroSection
    ├── PlatformLensSection
    ├── WorkflowSpotlight
    ├── IntegrationsSection
    ├── EvaluationSection
    ├── FAQSection
    ├── CTASection
    ├── SecuritySection
    ├── TrustStrip
    └── Footer
```

---

## Routes

| Path | Page |
|---|---|
| `/` | Homepage |
| `/products/:slug` | Product sub-page (chat, docs, lists, mail, agents, automations, calls, connectors, forms, templates, search, ukin) |
| `/solutions/:slug` | Solution sub-page (11 verticals: sales, engineering, marketing, operations, people, agencies, customer-support, education, ecommerce, professional-services, field-services) |
| `/solutions` | Solutions overview hub |
| `/pricing` | Pricing & plan comparison |
| `/security` | Trust & compliance |
| `/resources` | Architecture & resource hub |
| `/workspace` | Workspace OS overview |
| `/agents` | AI agents overview |
| `/privacy` `/terms` `/dpa` `/subprocessors` `/soc2` | Legal |

---

## Local Setup

```bash
# Install
npm install

# Dev server (http://localhost:5173)
npm run dev

# Lint (oxlint, ~350ms)
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

**Node ≥ 20** required.

---

## Build Output

```
dist/assets/index.js          387 kB │ gz 94 kB   (app shell + all sections)
dist/assets/react-vendor.js   219 kB │ gz 68 kB   (React 19 + ReactDOM)
dist/assets/motion-vendor.js  148 kB │ gz 49 kB   (Framer Motion)
dist/assets/CalendarEngine.js  56 kB │ gz 12 kB   (calendar views — lazy)
dist/assets/ProductPage.js     39 kB │ gz 13 kB   (product shell — lazy)
dist/assets/index.css         249 kB │ gz 34 kB   (Tailwind v4 compiled)
```

Each product demo, solution demo, and legal page is a separate lazy chunk (0.5–26 kB gz).

---

## License

MIT — see [LICENSE](LICENSE).
