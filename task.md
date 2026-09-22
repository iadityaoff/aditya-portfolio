# Portfolio Build — Task Tracker

## Phase 1 — Project Scaffold & Foundation
- `[x]` Initialize Next.js project with TypeScript, Tailwind, ESLint
- `[x]` Install all dependencies (motion, clsx, tailwind-merge, lucide-react, gray-matter, zod, resend)
- `[x]` Create folder structure
- `[x]` Configure Tailwind CSS design tokens (`globals.css`)
- `[x]` Configure `next.config.ts` (images, redirects, webpack)
- `[x]` Set up Google fonts in root layout (`Inter Tight`, `Instrument Serif`, `Geist Mono`)
- `[x]` Create `globals.css` with base styles, focus, reduced-motion, print styles
- `[x]` Create `lib/utils.ts` (cn helper)
- `[x]` Create TypeScript types (`types/index.ts`)
- `[x]` Create Zod schemas (`lib/schemas.ts`)
- `[x]` Create content model (`content/site.ts`)
- `[x]` Create projects data repository (`content/projects-data.ts`)

## Phase 2 — Component Library
- `[x]` Button (primary, secondary, ghost, dark; sm/md/lg; loading, iconRight)
- `[x]` Badge / Tag (neutral, accent, outline, dark)
- `[x]` SectionHeading (eyebrow, title with serif accent, description, tone)
- `[x]` Metric (value, label, sublabel, tabular nums)
- `[x]` Container & Section (width, padding, tone)
- `[x]` Nav (sticky, scroll-hide/show, blur, active link indicator)
- `[x]` MobileMenu (full-screen, focus trap, ESC key close)
- `[x]` Footer (email copy, socials, availability, back-to-top)
- `[x]` Testimonial (quote, name, role, project, source)
- `[x]` CopyEmail (click-to-copy with toast state)
- `[x]` DeviceFrame (desktop, mobile, canvas)
- `[x]` CTA Section (dark panel, reusable)
- `[x]` ScrollProgress (spring-physics accent bar)
- `[x]` NextProject (next case study card)
- `[x]` Lightbox (keyboard, focus trap, captions)

## Phase 3 — Content Model & Projects Data
- `[x]` 8 projects modeled with full evidence chains and metrics
- `[x]` SVG cover graphics generated for all 8 projects

## Phase 4 — Homepage (10 Sections)
- `[x]` S1: Hero (layered screen composition, parallax, reduced-motion fallback)
- `[x]` S2: Proof Strip (4 stats + monochrome client names)
- `[x]` S3: Selected Work (4 large alternating cards)
- `[x]` S4: Featured Design System (dark panel, animated pipeline, live component playground)
- `[x]` S5: Specializations (4 cards with tags + plain text tools row)
- `[x]` S6: How I Work (6-step process stepper with artifact chips)
- `[x]` S7: Design + Engineering (advantage copy, interactive Figma vs Code toggle)
- `[x]` S8: Kind Words (verified quotes)
- `[x]` S9: About Teaser (portrait card, 3 lines of copy, 5 core principles)
- `[x]` S10: Final CTA (dark panel, 2 buttons, freelance/full-time note)
- `[x]` Home page.tsx composing all 10 sections

## Phase 5 — Work Index & Case Study Template
- `[x]` Work index page with instant filtering and Suspense boundary
- `[x]` FilterChips component (URL-synced `?type=`, counts)
- `[x]` ProjectCard (large alternating, compact grid)
- `[x]` Case study dynamic route (`/work/[slug]`)
- `[x]` Case study blocks (CaseHero, MetaGrid, TLDR, ConstraintList, RoleCards, FlowDiagram, WireframeGallery, DecisionBlock, EvidenceChain, BreakpointTable, ComponentPreview, OutcomeList, Reflection, NextProject, CaseStudyNav)

## Phase 6 — Flagship Case Studies
- `[x]` Design System (`/work/design-system`)
- `[x]` Healthcare Operations Platform (`/work/healthcare-platform`)
- `[x]` Application Management Platform (`/work/application-management`)
- `[x]` Global Event & Registration Platform (`/work/event-registration`)

## Phase 7 — Remaining Pages
- `[x]` Design System page (`/design-system`)
- `[x]` About page (`/about`)
- `[x]` Services page (`/services`)
- `[x]` Resume page (`/resume`)
- `[x]` Contact page (`/contact`) + API route (`/api/contact`)
- `[x]` Privacy page (`/privacy`)
- `[x]` Custom 404 (`/not-found.tsx`)

## Phase 8 — Motion & Interactions
- `[x]` Hero parallax with `motion/react` and reduced-motion fallback
- `[x]` Pipeline diagram pulse animation
- `[x]` Interactive Design vs Code toggle
- `[x]` Interactive Component Playground
- `[x]` Copy-to-clipboard micro-interactions
- `[x]` Card hover lift & soft shadows

## Phase 9 — Responsive & Accessibility
- `[x]` 12-column grid collapses across mobile, tablet, desktop
- `[x]` WCAG 2.1 AA focus rings (`:focus-visible`)
- `[x]` Skip-to-content accessible link in root layout
- `[x]` Full keyboard navigation (dialogs, lightbox, forms)
- `[x]` Reduced-motion media queries

## Phase 10 — SEO, Performance, Testing & Deploy
- `[x]` Dynamic sitemap (`sitemap.ts`)
- `[x]` Dynamic robots.txt (`robots.ts`)
- `[x]` Dynamic OpenGraph image (`opengraph-image.tsx`)
- `[x]` Proxy middleware for confidential projects (`proxy.ts`)
- `[x]` JSON-LD structured data for Person profile
- `[x]` ESLint check passed with 0 errors
- `[x]` TypeScript check passed with 0 errors
- `[x]` Production build passed with 23 static pages generated
