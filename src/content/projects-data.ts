import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "design-system",
    title: "Foundations & Multi-Brand Design System",
    subtitle: "A scalable token architecture and 60+ accessible component library unifying 4 enterprise products.",
    summary: "Standardized token pipeline, Figma library, and front-end component parity across a suite of SaaS products, cutting UI design and front-end sprint handoff time by 45%.",
    insightHeadline: "Systemizing tokens across Figma and code before scaling UI",
    industry: "Enterprise SaaS & Design Ops",
    category: "flagship",
    role: "Lead Systems Designer & Frontend Architect",
    platform: ["Figma", "Web (React / Angular)", "Storybook"],
    scope: ["Token Architecture", "Component Inventory", "Documentation", "Handoff Specs"],
    tools: ["Figma Variables", "Tokens Studio", "Storybook", "Tailwind / SCSS", "Git"],
    timeline: "4 Months",
    confidential: "public",
    order: 1,
    published: true,
    featured: true,
    cover: "/images/projects/design-system-cover.svg",
    tldr: {
      problem: "Four disparate engineering squads were building redundant UI components with inconsistent spacing, diverging color hex values, and zero shared accessibility standards.",
      role: "Defined atomic token hierarchy, built the multi-tiered Figma component library with strict states, and drafted matching component API specs for developers.",
      outcome: "Shipped 62 production-ready components, reduced design-to-development handoff cycles from 12 days to under 4 days, and achieved 100% WCAG AA color compliance.",
    },
    context: [
      "As the product portfolio expanded into four separate enterprise portals, visual inconsistency became a major brand liability and engineering cost center.",
      "Developers spent 30% of each two-week sprint reinventing button states, form validation wrappers, and modal behaviors.",
      "The goal was to build a single source of truth starting from primitive tokens up to composable template organisms.",
    ],
    constraints: [
      "Must support both Light and Dark modes without overriding component-level CSS.",
      "Strict backward compatibility with legacy Angular applications alongside new React micro-frontends.",
      "Zero drop in rendering performance for high-density enterprise data tables (1,000+ rows).",
    ],
    roles: [
      {
        role: "Product Designers",
        goal: "Rapidly assemble high-fidelity layouts without guessing spacing or type scales.",
        mainTask: "Drag-and-drop auto-layout components with pre-configured variant properties.",
      },
      {
        role: "Frontend Engineers",
        goal: "Consume reliable, type-safe tokens and components matching Figma 1:1.",
        mainTask: "Import npm design tokens and implement components with zero visual drift.",
      },
      {
        role: "Product Managers",
        goal: "Accelerate release velocity and guarantee cross-product brand consistency.",
        mainTask: "Review feature prototypes that directly mirror production UI standards.",
      },
    ],
    keyFlow: {
      title: "Token Pipeline: From Figma to Production",
      steps: [
        "Figma Variables & Primitives",
        "Semantic Tokens Mapping",
        "JSON Export via CI/CD",
        "Style Dictionary Build (CSS/SCSS)",
        "Storybook Component Validation",
        "Production Application Consumption",
      ],
    },
    wireframes: [
      {
        title: "Global Token Hierarchy",
        description: "Separated color values into three distinct layers: Global Primitives, Semantic Context, and Component Scope.",
        status: "Kept",
        reason: "Allows rebranding or theme switching without touching individual component files.",
      },
      {
        title: "Single-Tier Token Architecture",
        description: "Directly referencing raw hex values inside button and card components.",
        status: "Rejected",
        reason: "Creates immediate regression when adding dark mode or secondary enterprise themes.",
      },
    ],
    decisions: [
      {
        title: "Three-Tier Token Architecture (Primitive → Semantic → Component)",
        reason: "Separating color values into global primitives (e.g. blue-500), semantic tokens (e.g. surface-interactive-primary), and component bindings (e.g. btn-primary-bg) enabled dark mode in a single stylesheet swap without altering component markup.",
        alternative: "Hardcoding color hex codes directly in Figma component styles and developer stylesheets.",
        evidence: {
          problem: "Audit of 4 apps revealed 28 different shades of blue and 14 variations of modal overlay opacity.",
          decision: "Formalized 3-tier token structure in Figma Variables with automated JSON token export.",
          implementation: "Created Style Dictionary build pipeline compiling tokens to CSS custom properties and SCSS maps.",
          outcome: "Dark mode implementation across all 4 products completed in 2 weeks instead of 3 months.",
        },
      },
      {
        title: "Component State Completeness Checklist",
        reason: "Every interactive component is required to exhibit 6 explicit states: default, hover, active, focus-visible, disabled, and error. Focus rings use a dedicated 2px cobalt offset for WCAG 2.1 compliance.",
        alternative: "Letting developers extrapolate hover and active states from default Figma mockups.",
        evidence: {
          problem: "QA bug reports showed 42 focus and hover state inconsistencies reported across three sprints.",
          decision: "Mandated full 6-state variant matrix in Figma component sets with keyboard focus guidelines.",
          implementation: "Added interactive Storybook stories showcasing keyboard tab sequences for each component.",
          outcome: "Accessibility audit passed with zero keyboard navigation defects on the core component set.",
        },
      },
      {
        title: "Atomic Composition: Primitives to Page Templates",
        reason: "Strict atomic structuring: Atoms (Icons, Badges, Buttons) → Molecules (Search Bars, Form Fields) → Organisms (Data Tables, Navbars) → Templates (Dashboard Layouts).",
        alternative: "Monolithic, rigid page-level components that cannot be recombined for new use cases.",
        evidence: {
          problem: "Feature squads frequently detached Figma components to add slight variations, breaking design sync.",
          decision: "Structured nested slots and atomic building blocks that allow flexible content injection.",
          implementation: "Shipped composable compound components in React and Angular matching Figma auto-layout slots.",
          outcome: "Component detachment rate in Figma files dropped from 34% to under 2%.",
        },
      },
    ],
    breakpoints: [
      { breakpoint: "Mobile", viewport: "375px — 767px", behavior: "Single column, drawer navigation, 16px margins, touch-friendly 44px tap targets." },
      { breakpoint: "Tablet", viewport: "768px — 1023px", behavior: "2-column grids, collapsible sidebar, horizontal scroll on data tables with fixed ID column." },
      { breakpoint: "Desktop", viewport: "1024px — 1440px", behavior: "12-column grid, persistent sidebar navigation, full multi-column data views with filter bar." },
      { breakpoint: "Wide", viewport: "1440px+", behavior: "Container max-width capped at 1280px to preserve optimal line length and visual hierarchy." },
    ],
    systemHandoff: {
      componentsCount: 62,
      tokensCount: 148,
      storybookUrl: "https://storybook.example.com",
      specsDescription: "Auto-generated Figma variable tokens exported to GitHub via GitHub Actions, building SCSS variables and TypeScript token definitions directly into the component library npm package.",
    },
    outcomes: [
      { type: "fact", text: "62 production components documented and shipped across both React and Angular codebases." },
      { type: "fact", text: "Design-to-code handoff duration reduced from 12 business days to under 4 business days per major feature." },
      { type: "quote", text: "The token architecture Aditya built gave our frontend team a common language with design for the very first time. (Frontend Lead)" },
      { type: "delivery", text: "Published living documentation portal with interactive component previews and prop tables." },
    ],
    reflection: {
      learnings: [
        "Involving senior frontend engineers during the token naming phase prevents costly naming schema refactors later.",
        "A design system is 20% component creation and 80% governance, documentation, and adoption enablement.",
      ],
      improvements: [
        "Implement automated visual regression testing (like Chromatic) earlier in the pipeline to catch CSS bleed.",
        "Provide dedicated design system training office hours for new feature designers joining the squad.",
      ],
    },
  },
  {
    slug: "healthcare-platform",
    title: "Healthcare Operations & Doctor Management Platform",
    subtitle: "A unified clinical operations system designed for doctors, receptionists, billing teams, and ward administrators.",
    summary: "Replaced 6 fragmented clinical tools with a high-density, context-aware web application that eliminated patient context switching and reduced billing reconciliation errors by 38%.",
    insightHeadline: "Keeping patient clinical and financial context visible across all workflows",
    industry: "Healthcare Tech & Clinical ERP",
    category: "flagship",
    role: "Lead Product Designer",
    platform: ["Web Application (Desktop & Tablet Optimized)"],
    scope: ["End-to-End UX/UI", "Clinical Workflows", "Billing Architecture", "Information Architecture"],
    tools: ["Figma", "Role Mapping", "Interactive Prototyping", "Design System"],
    timeline: "6 Months",
    confidential: "anonymized",
    order: 2,
    published: true,
    featured: true,
    cover: "/images/projects/healthcare-cover.svg",
    tldr: {
      problem: "Clinical and administrative staff navigated across 4 separate legacy browser tabs to review patient vitals, add procedure charges, and generate discharge invoices, frequently misattributing billable items.",
      role: "Conducted contextual inquiries with clinical staff, mapped multi-role permissions, and designed a persistent patient context header with high-density data tables and inline charge reconciliation.",
      outcome: "Reduced patient discharge processing time from 42 minutes to 14 minutes, and decreased billing item omissions by 38% across initial pilot hospital wards.",
    },
    context: [
      "Mid-sized hospitals operate under intense operational pressure where delays directly impact bed turnover and patient satisfaction.",
      "Doctors need rapid clinical notes and medication ordering, receptionists require instant slot availability, and billing personnel must track every consumable item without losing patient history.",
      "The system handles confidential patient health records (anonymized in this case study) requiring role-based view permissions.",
    ],
    constraints: [
      "Hospital workstations frequently use 1366x768 monitor resolutions with high ambient lighting.",
      "Operators use keyboard-heavy input and need rapid shortcuts for frequent actions.",
      "Compliance requirements strictly mandate audit trails for any billing modification or diagnosis change.",
    ],
    roles: [
      {
        role: "Attending Doctor",
        goal: "Review recent vitals, add clinical notes, and prescribe discharge treatments in under 2 minutes.",
        mainTask: "Quick-switch between ward patients, view chronological treatment history, and approve discharge summaries.",
      },
      {
        role: "Billing Administrator",
        goal: "Reconcile unbilled pharmacy and procedure charges against insurance caps with zero unassigned items.",
        mainTask: "Select line items, apply tariff rules, review itemized invoices, and generate print-ready tax receipts.",
      },
      {
        role: "Front Desk Receptionist",
        goal: "Register incoming outpatients and assign consultation slots without queue pileups.",
        mainTask: "Fast appointment lookup, slot rebooking, and basic demographic data capture.",
      },
    ],
    keyFlow: {
      title: "End-to-End Inpatient Discharge & Billing Flow",
      steps: [
        "Patient Ward List",
        "Persistent Patient Context Header",
        "Unbilled Clinical Items Review",
        "Tariff & Insurance Selection",
        "Draft Invoice Reconciliation",
        "Doctor Discharge Sign-Off",
        "Print / Export Receipt",
      ],
    },
    wireframes: [
      {
        title: "Persistent Sticky Patient Header",
        description: "Displays patient name, UHID, room number, blood group, attending physician, and admission date fixed at the top of every tab.",
        status: "Kept",
        reason: "Completely eliminates misattributing medications or charges to the wrong patient when navigating tabs.",
      },
      {
        title: "Modal-Based Patient Switcher",
        description: "Opening a modal popup every time a billing clerk changes patient records.",
        status: "Rejected",
        reason: "Added 3 extra clicks per transaction and destroyed spatial orientation during high-volume discharge hours.",
      },
    ],
    decisions: [
      {
        title: "Persistent Context Header with Integrated Patient Switcher",
        reason: "Clinical operators frequently work on multiple cases simultaneously. By fixing patient identifiers, vital alerts, and insurance coverage at the viewport top, staff maintain continuous situational awareness.",
        alternative: "Displaying patient metadata only on the profile overview screen.",
        evidence: {
          problem: "Hospital audit revealed 12 instances per month of staff attaching laboratory fees to the wrong patient record due to tab switching.",
          decision: "Designed a 56px sticky context header containing photo, UHID, age, bed number, and keyboard shortcut patient switcher (Cmd+K).",
          implementation: "Built sticky layout container with micro-state indicator for insurance pre-authorization status.",
          outcome: "Zero wrong-patient billing assignment incidents reported in 90 days following rollout.",
        },
      },
      {
        title: "High-Density Data Tables with Contextual Inline Actions",
        reason: "Billing specialists review hundreds of line items per patient. Dense tables with clear visual row banding, right-aligned monetary values, and keyboard row selection allow operators to audit charges 2.5x faster.",
        alternative: "Card-based grid view with spacious white padding.",
        evidence: {
          problem: "Card-based prototype required over 14 scroll viewports to inspect a 4-day inpatient itemized stay.",
          decision: "Engineered compact tabular layout with 36px row height, sticky column headers, and inline category filtering.",
          implementation: "Implemented virtualized scroll data table component with keyboard arrow navigation and batch selection.",
          outcome: "Average time spent reviewing unbilled charges dropped from 11.4 minutes to 3.8 minutes per patient.",
        },
      },
      {
        title: "Two-Tier Discharge Sign-Off Safety Mechanism",
        reason: "Discharging a patient before clinical medication sign-off results in readmission penalties. We designed an automated prerequisite check that prevents invoice finalization until the attending doctor signs off.",
        alternative: "Relying on manual verbal confirmation between ward nurses and cashier staff.",
        evidence: {
          problem: "Ward nurses reported 6 premature discharges where take-home medications were not dispensed prior to billing settlement.",
          decision: "Introduced clear state dependency: Billing generation button is disabled with an explanatory tooltip until clinical sign-off is logged.",
          implementation: "Added prominent status badge linking directly to the pending doctor approval task.",
          outcome: "Premature discharge clearance errors dropped to absolute zero in post-launch clinical reviews.",
        },
      },
    ],
    breakpoints: [
      { breakpoint: "Mobile (Doctor Ward Rounds)", viewport: "375px — 767px", behavior: "Card-based patient summary with collapsed vitals, quick-voice note trigger, and emergency contact drawer." },
      { breakpoint: "Tablet (Nurse Station / Cart)", viewport: "768px — 1023px", behavior: "Side-by-side patient list and chart view; simplified tab navigation optimized for touch screen carts." },
      { breakpoint: "Desktop (Billing & Administration)", viewport: "1024px — 1440px", behavior: "Full 3-pane workstation view: patient queue sidebar, central interactive ledger, and live invoice calculation panel." },
    ],
    systemHandoff: {
      componentsCount: 44,
      tokensCount: 92,
      storybookUrl: "https://storybook.example.com",
      specsDescription: "Detailed data density tables with typography hierarchy (Geist Mono for UHID numbers and monetary currency figures to ensure perfect tabular alignment).",
    },
    outcomes: [
      { type: "fact", text: "Discharge turnaround time dropped from 42 minutes to 14 minutes on average." },
      { type: "fact", text: "38% reduction in unbilled consumable omissions across 3 pilot hospital branches." },
      { type: "quote", text: "The persistent patient header alone saved our staff hundreds of daily context switches and eliminated billing mixups entirely. (Chief Medical Officer)" },
      { type: "delivery", text: "Complete Figma design system with 44 clinical workflow components delivered on schedule." },
    ],
    reflection: {
      learnings: [
        "In enterprise healthcare, readability and speed always supersede visual embellishment.",
        "Direct observation of nurses on night shifts revealed lighting and contrast issues that daytime interviews never surfaced.",
      ],
      improvements: [
        "Introduce barcode scanner integration for automated consumable item entry in the next phase.",
        "Build customized print style templates for legacy thermal receipt printers.",
      ],
    },
  },
  {
    slug: "application-management",
    title: "Enterprise Application Management Platform",
    subtitle: "Complex multi-tiered applicant evaluation, role-based governance, and bulk workflow platform.",
    summary: "Redesigned an enterprise intake and assessment portal processing 250,000+ candidate submissions annually, cutting application review latency by 52% through progressive disclosure and high-density batch actions.",
    insightHeadline: "Replacing 18-field modal forms with progressive evaluation flows",
    industry: "Enterprise HR Tech & Talent Management",
    category: "flagship",
    role: "Senior Product Designer",
    platform: ["Web Application (Desktop First)"],
    scope: ["Role & Permission Matrix", "Information Architecture", "Filter Patterns", "Bulk Action System"],
    tools: ["Figma", "User Journey Mapping", "Figma Auto-Layout", "Design Tokens"],
    timeline: "5 Months",
    confidential: "public",
    order: 3,
    published: true,
    featured: true,
    cover: "/images/projects/application-management-cover.svg",
    tldr: {
      problem: "Hiring managers and enterprise evaluators were overwhelmed by massive 80-column spreadsheets and unresponsive modal dialogue forms, causing evaluation backlogs of over 3 weeks.",
      role: "Designed a clean 3-pane appraisal workspace with configurable column presets, keyboard-driven batch triage, and progressive disclosure evaluation criteria.",
      outcome: "Processed 250,000+ applications with a 52% decrease in review turnaround time and 94% positive reviewer satisfaction score.",
    },
    context: [
      "Enterprise organizations hire across hundreds of job families simultaneously with divergent compliance and interview requirements.",
      "Reviewers were switching back and forth between resume PDFs, scorecards, and email threads to submit candidate decisions.",
      "Data privacy regulations required granular role-based masking of candidate personal identifiable information (PII) during early screening.",
    ],
    constraints: [
      "Must comfortably support datasets exceeding 50,000 records per pipeline without UI sluggishness.",
      "Reviewers need to score candidates without leaving the keyboard.",
      "Strict compliance with EEOC and international anti-bias hiring regulations.",
    ],
    roles: [
      {
        role: "Hiring Manager",
        goal: "Compare shortlisted candidate dossiers and submit quantitative scoring in under 5 minutes.",
        mainTask: "Review structured assessment scores, listen to work samples, and submit advance/reject decisions.",
      },
      {
        role: "Recruiting Coordinator",
        goal: "Batch-process incoming applicants, send standardized assessments, and trigger interview loops.",
        mainTask: "Apply multi-dimensional filters, perform bulk status updates, and manage pipeline bottlenecks.",
      },
      {
        role: "Enterprise Admin",
        goal: "Configure permission levels, evaluation rubrics, and automated stage progression rules.",
        mainTask: "Define role permissions, audit reviewer activity, and export regulatory compliance reports.",
      },
    ],
    keyFlow: {
      title: "Batch Applicant Screening & Scoring Journey",
      steps: [
        "Candidate Pipeline Grid",
        "Multi-Parameter Filter Preset Selection",
        "Bulk Selection & Quick Triage",
        "Split-Pane Candidate Evaluation",
        "Rubric Scoring & Blind Review",
        "Stage Advance / Batch Notification",
      ],
    },
    wireframes: [
      {
        title: "Split-Screen Appraisal Canvas",
        description: "Left pane: candidate list; Center pane: resume/work submission; Right pane: scoring rubric and notes.",
        status: "Kept",
        reason: "Reviewers can evaluate and score without closing candidate files or opening new browser tabs.",
      },
      {
        title: "Multi-Tab Modal Assessment",
        description: "Candidate details and rubric separated into tabs inside a centered popup dialog.",
        status: "Rejected",
        reason: "Users lost context of the candidate's resume while filling the evaluation form tab.",
      },
    ],
    decisions: [
      {
        title: "Configurable Filter Chips with Savable View Presets",
        reason: "Recruiters frequently repeat complex queries (e.g. 'Status: Phone Screen', 'Score > 80%', 'Location: US/Canada'). Providing instant filter chips with custom named presets eliminated 8 minutes of setup time per session.",
        alternative: "A traditional complex SQL-like query builder modal that had to be reconstructed on every visit.",
        evidence: {
          problem: "Session replays showed recruiters spending an average of 4.2 minutes setting up identical table filters each morning.",
          decision: "Built quick-filter chips bar with instant URL sync (?status=active&score=min80) and one-click preset bookmarks.",
          implementation: "Created keyboard-accessible ChipGroup component with combobox popover for faceted search.",
          outcome: "Filter setup time dropped to 3 seconds with over 1,200 custom presets saved in the first month.",
        },
      },
      {
        title: "Contextual Floating Action Bar for Batch Operations",
        reason: "When selecting multiple rows, a floating toolbar surfaces available actions (Move Stage, Send Assessment, Reject with Template, Export) without scrolling back to the top of the table.",
        alternative: "Top-of-table action buttons that scroll out of view when reviewing deep candidate lists.",
        evidence: {
          problem: "Users selecting 50+ candidates had to scroll 2,000 pixels back to the table header to find the 'Action' dropdown.",
          decision: "Designed a floating, animated bottom action bar with selection count and keyboard hotkeys (M = Move, R = Reject).",
          implementation: "Used Framer Motion with slide-up reveal when selectedCount > 0, pinned 24px above viewport bottom.",
          outcome: "Bulk action processing speed increased by 64% during high-volume recruitment cycles.",
        },
      },
      {
        title: "Blind Evaluation Mode with PII Masking",
        reason: "To mitigate unconscious bias during early review rounds, candidate names, photos, universities, and graduation years are automatically redacted according to stage rules.",
        alternative: "Manual reviewer self-discipline without interface enforcement.",
        evidence: {
          problem: "Enterprise client diversity audits showed variance in shortlist progression correlated with applicant demographic identifiers.",
          decision: "Integrated toggleable Blind Evaluation mode with randomized candidate ID chips and masked metadata.",
          implementation: "Engineered tokenized mask components that blur and obfuscate identifying data until final interview stage.",
          outcome: "Client achieved compliance certification and reported an 18% improvement in diverse candidate shortlists.",
        },
      },
    ],
    breakpoints: [
      { breakpoint: "Mobile (Quick Approvals)", viewport: "375px — 767px", behavior: "Tinder-style swipe or single-card quick approval interface for busy hiring managers on the go." },
      { breakpoint: "Tablet", viewport: "768px — 1023px", behavior: "Collapsible candidate navigation drawer; 2-pane evaluation view with sticky rubric drawer." },
      { breakpoint: "Desktop (Standard 1080p)", viewport: "1024px — 1440px", behavior: "Full 3-pane appraisal layout: pipeline list, central artifact viewer, and pinned right-hand rubric." },
    ],
    systemHandoff: {
      componentsCount: 52,
      tokensCount: 110,
      storybookUrl: "https://storybook.example.com",
      specsDescription: "Complete keyboard shortcut map and WCAG AA aria-live region announcements for dynamic filter and batch operations.",
    },
    outcomes: [
      { type: "fact", text: "52% decrease in overall application review turnaround time across 250k submissions." },
      { type: "fact", text: "94% positive reviewer satisfaction rating from enterprise hiring teams." },
      { type: "quote", text: "The 3-pane evaluation workspace transformed our hiring loops. We can triage a hundred candidates in under an hour without fatigue. (Head of Talent Acquisition)" },
      { type: "delivery", text: "Delivered 52 modular component specs and responsive design patterns in Figma and Storybook." },
    ],
    reflection: {
      learnings: [
        "Dense data views require rigorous typography scales — tabular numbers for dates and IDs make thousands of rows effortless to scan.",
        "Keyboard navigation shortcuts must be clearly discoverable via tooltip kbd indicators.",
      ],
      improvements: [
        "Introduce natural language search query parsing ('candidates in Austin with React experience').",
        "Add custom audit reporting dashboards for enterprise compliance officers.",
      ],
    },
  },
  {
    slug: "event-registration",
    title: "Global Event & Registration Management Platform",
    subtitle: "End-to-end multi-tier ticketing, conditional question engine, and on-site attendee check-in system.",
    summary: "Engineered an end-to-end event onboarding platform serving 80,000+ international attendees, featuring complex conditional logic forms, real-time ticket inventory, and sub-second mobile check-in.",
    insightHeadline: "Streamlining conditional multi-step registration without cognitive overload",
    industry: "Events, Hospitality & Ticketing SaaS",
    category: "flagship",
    role: "Product Designer & Design Systems Lead",
    platform: ["Web (Responsive)", "Mobile Web (Attendee)", "Tablet App (Admin Check-In)"],
    scope: ["Conditional Logic Engine", "Multi-Tier Ticketing UX", "Mobile Check-In", "Design-to-Code Specs"],
    tools: ["Figma", "Conditional Flow Mapping", "HTML/SCSS Prototypes", "Tailwind"],
    timeline: "4 Months",
    confidential: "public",
    order: 4,
    published: true,
    featured: true,
    cover: "/images/projects/event-registration-cover.svg",
    tldr: {
      problem: "Enterprise conference attendees abandoned registration flows at a 44% rate due to disjointed 6-page forms with irrelevant questions and confusing ticket pricing tiers.",
      role: "Architected a single-page progressive disclosure registration flow with branch logic, real-time ticket tier reserve counters, and high-speed QR check-in.",
      outcome: "Registration completion rates increased from 56% to 89%, with on-site attendee badge printing reduced to 4.2 seconds per check-in.",
    },
    context: [
      "Large-scale corporate summits host attendees with wildly divergent requirements: VIPs need concierge hotel booking, press require credential verification, and general attendees only need session passes.",
      "The legacy registration form showed all 42 possible questions to every user regardless of their selected ticket type.",
      "Organizers also needed a rock-solid tablet interface for on-site registration desks that functioned under patchy venue Wi-Fi.",
    ],
    constraints: [
      "Must support 14 currencies with localized tax calculation (VAT / GST).",
      "Mobile checkout experience must complete in under 90 seconds on 3G cellular connections.",
      "On-site QR scanner must process check-ins in under 2 seconds to prevent venue entrance bottlenecks.",
    ],
    roles: [
      {
        role: "Event Attendee",
        goal: "Secure tickets, select preferred breakout workshops, and receive calendar invites without hassle.",
        mainTask: "Select ticket type, answer conditional dietary/accessibility questions, and complete payment.",
      },
      {
        role: "Event Operations Director",
        goal: "Monitor real-time ticket tier velocity, approve VIP press passes, and manage room capacities.",
        mainTask: "Review capacity alerts, export attendee rosters, and configure badge print templates.",
      },
      {
        role: "On-Site Registration Volunteer",
        goal: "Scan attendee mobile passes, verify credentials, and trigger automatic badge printing.",
        mainTask: "Operate tablet scanner, handle badge re-prints, and resolve ticket disputes quickly.",
      },
    ],
    keyFlow: {
      title: "Attendee Registration & Verification Journey",
      steps: [
        "Event Landing Page",
        "Ticket Tier Selection & Real-Time Hold",
        "Conditional Question Stepper",
        "Add-On Workshop Selection",
        "Payment & Tax Verification",
        "Instant Pass Delivery (Apple Wallet / QR)",
        "On-Site Fast-Track Check-In",
      ],
    },
    wireframes: [
      {
        title: "Dynamic Progressive Stepper",
        description: "Inline accordion that reveals the next relevant section based on previously selected answers.",
        status: "Kept",
        reason: "Users only see questions pertinent to their role, keeping form length perceived as short.",
      },
      {
        title: "Static Multi-Page Form Wizard",
        description: "Hardcoded 5-step wizard with next/previous buttons regardless of selections.",
        status: "Rejected",
        reason: "Showed empty pages for attendees who did not require special accommodations or travel concierge.",
      },
    ],
    decisions: [
      {
        title: "Branching Conditional Question Logic with Real-Time Validation",
        reason: "By querying attendee persona first ('Are you a Speaker, Sponsor, Press, or Attendee?'), the form dynamically prunes unnecessary fields, dropping the average question count from 38 to 9 fields per user.",
        alternative: "Showing all questions with 'Optional' labels across 4 long pages.",
        evidence: {
          problem: "Analytics demonstrated a 34% drop-off on Page 3 when general attendees encountered mandatory press credentialing questions.",
          decision: "Engineered a conditional branching model where question trees are rendered dynamically based on ticket tier.",
          implementation: "Designed clear branch transition animations indicating added or skipped sections.",
          outcome: "Form abandonment dropped by 58% in the first ticket sales cycle.",
        },
      },
      {
        title: "10-Minute Cart Hold with Transparent Countdown Timer",
        reason: "High-demand conferences create checkout anxiety when inventory runs out during data entry. Reserving tickets for 10 minutes gives attendees confidence to complete detailed workshop selections.",
        alternative: "Instant first-to-pay checkout causing checkout race conditions.",
        evidence: {
          problem: "Customer support received over 300 complaints during ticket drops from attendees whose carts expired mid-form.",
          decision: "Introduced an unobtrusive sticky cart countdown banner with a clear 'Tickets Reserved for 09:59' indicator.",
          implementation: "Designed calm, non-alarmist countdown indicator with automated gentle reminder at 2 minutes remaining.",
          outcome: "Payment step conversion increased by 22% with near-zero cart collision errors.",
        },
      },
      {
        title: "High-Contrast, Offline-First Tablet Check-In Interface",
        reason: "Convention centers often suffer from glare and intermittent Wi-Fi. The check-in kiosk UI features ultra-high contrast typography, tactile audio feedback on QR scan, and local indexedDB sync.",
        alternative: "Standard web dashboard requiring constant broadband connectivity.",
        evidence: {
          problem: "Previous event experienced 45-minute entry queues when hotel Wi-Fi throttled attendee check-in tablets.",
          decision: "Designed a dedicated full-screen tablet mode with local caching and batch server sync.",
          implementation: "High contrast UI (black on yellow/white) with massive 64px tap targets and instant scan confirmation.",
          outcome: "Checked in 12,000 attendees on morning of opening keynote with average scan-to-badge time of 4.2 seconds.",
        },
      },
    ],
    breakpoints: [
      { breakpoint: "Mobile (Attendee)", viewport: "375px — 767px", behavior: "Single-column linear card flow with sticky Apple Pay / Google Pay button fixed to bottom." },
      { breakpoint: "Tablet (Kiosk / Desk)", viewport: "768px — 1023px", behavior: "Landscape kiosk view with camera viewfinder left and attendee credential confirmation right." },
      { breakpoint: "Desktop (Admin Portal)", viewport: "1024px — 1440px", behavior: "Full event operations dashboard with capacity heatmaps and tier velocity charts." },
    ],
    systemHandoff: {
      componentsCount: 38,
      tokensCount: 78,
      storybookUrl: "https://storybook.example.com",
      specsDescription: "Semantic form elements with full error messaging states, ARIA labels, and responsive flexbox/grid layout specifications.",
    },
    outcomes: [
      { type: "fact", text: "Registration completion rate jumped from 56% to 89% across 80,000+ registrations." },
      { type: "fact", text: "On-site entry queue time reduced from 45 minutes to under 3 minutes per attendee." },
      { type: "quote", text: "Aditya's attention to conditional logic and offline kiosk realities made our global summit check-in the smoothest in our company's history. (VP of Operations)" },
      { type: "delivery", text: "Designed and documented 38 responsive components and tablet check-in patterns." },
    ],
    reflection: {
      learnings: [
        "Conditional forms require robust progress indicators so users always understand how much remains.",
        "Testing kiosk interfaces under direct outdoor sunlight is essential for outdoor venue registrations.",
      ],
      improvements: [
        "Add support for automated group seat allocations for corporate delegations.",
        "Integrate AI-driven schedule recommendations during the breakout selection step.",
      ],
    },
  },
  {
    slug: "help-desk",
    title: "Enterprise IT Service Management & Help Desk",
    subtitle: "Streamlined incident triage and SLA resolution interface for IT support specialists.",
    summary: "Refactored an IT help desk ticketing system with keyboard-first triage, incident routing automation, and visual SLA countdowns, reducing ticket resolution time by 34%.",
    insightHeadline: "Giving support engineers sub-second ticket triage without mouse reliance",
    industry: "IT Service Management & Enterprise Tools",
    category: "compact",
    role: "Product Designer",
    platform: ["Web Application"],
    scope: ["Incident Triage Flow", "Keyboard Shortcuts", "SLA Timers", "Detail Views"],
    tools: ["Figma", "Information Architecture", "Component Library"],
    timeline: "3 Months",
    confidential: "public",
    order: 5,
    published: true,
    featured: false,
    cover: "/images/projects/help-desk-cover.svg",
    tldr: {
      problem: "Support engineers spent 40% of their workday clicking through repetitive dropdown menus to categorize and assign internal IT incident tickets.",
      role: "Designed a command-palette-driven (Cmd+K) triage workflow with split-view ticket previews and clear SLA escalation indicators.",
      outcome: "Average time-to-first-response dropped by 41% and ticket resolution cycle improved by 34% within 60 days of launch.",
    },
    keyFlow: {
      title: "Sub-Second Ticket Triage Flow",
      steps: ["Incident Queue", "Quick Keyboard Preview", "Command Palette Routing", "Automated Macro Assignment", "Status Escalation Check"],
    },
    decisions: [
      {
        title: "Keyboard-First Command Palette (Cmd+K)",
        reason: "Engineers handle hundreds of tickets daily. Providing quick keys for status changes, priority tagging, and assignments kept hands on keyboard.",
        alternative: "Standard modal dialogues with multiple nested select menus.",
      },
      {
        title: "Visual SLA Countdown Progress Bars",
        reason: "Replaced plain text timestamps with color-shifting visual bars that shift from blue to amber to urgent red as breach thresholds approach.",
        alternative: "Static date/time text strings requiring mental calculation.",
      },
    ],
    outcomes: [
      { type: "fact", text: "41% reduction in initial ticket response latency across 1,500 internal engineers." },
      { type: "fact", text: "34% improvement in average SLA resolution adherence rate." },
      { type: "quote", text: "The keyboard triage flow made managing incident queues feel effortless. (IT Operations Manager)" },
    ],
  },
  {
    slug: "slot-scheduling",
    title: "Multi-Provider Dynamic Slot Scheduling Engine",
    subtitle: "High-capacity appointment scheduling and buffer engine across divergent resource pools.",
    summary: "Engineered an intelligent calendar and slot availability system handling timezone conversions, provider buffers, and multi-resource conflict resolution.",
    insightHeadline: "Preventing scheduling collisions across complex shared resource pools",
    industry: "Productivity & Operations SaaS",
    category: "compact",
    role: "Product & Interaction Designer",
    platform: ["Web Application (Desktop & Mobile)"],
    scope: ["Calendar Architecture", "Buffer Configuration", "Booking Flow", "Responsive UI"],
    tools: ["Figma", "State Flow Diagrams", "Tokens"],
    timeline: "3 Months",
    confidential: "public",
    order: 6,
    published: true,
    featured: false,
    cover: "/images/projects/slot-scheduling-cover.svg",
    tldr: {
      problem: "Providers and clients suffered frequent double-bookings and inadequate travel buffers due to rigid 30-minute calendar block assumptions.",
      role: "Designed flexible buffer calculation rules, multi-resource availability matrices, and a frictionless 3-click booking widget.",
      outcome: "Booking drop-off dropped by 29% and schedule collision tickets were reduced to near zero.",
    },
    keyFlow: {
      title: "Multi-Provider Conflict-Free Booking Flow",
      steps: ["Service Selection", "Provider / Resource Match", "Dynamic Slot Calculation", "Client Details Entry", "Instant Confirmation"],
    },
    decisions: [
      {
        title: "Dynamic Smart Buffer Allocation",
        reason: "Allowed providers to attach automatic 15-minute preparation or travel buffers that dynamically suppress adjacent slot generation.",
        alternative: "Manual buffer blocking on individual calendar slots.",
      },
      {
        title: "Localized Timezone Indicator with One-Click Switch",
        reason: "Displaying both client local time and provider origin time prominently on the picker reduced timezone mismatch confusion.",
        alternative: "Defaulting solely to user browser detected timezone without confirmation.",
      },
    ],
    outcomes: [
      { type: "fact", text: "29% increase in booking completion rate for international clients." },
      { type: "fact", text: "99.8% reduction in booking collision and double-allocation incidents." },
      { type: "quote", text: "Our providers finally have calendars that reflect real operational buffers without manual blocking. (Operations Lead)" },
    ],
  },
  {
    slug: "mysatsang",
    title: "mySatsang Community & Event Companion",
    subtitle: "Cross-platform mobile application for community event schedules, live streaming, and publications.",
    summary: "Designed an accessible iOS and Android companion app for 25,000+ community members with multilingual content and offline reading capabilities.",
    insightHeadline: "Delivering accessible reading experiences across diverse elderly demographics",
    industry: "Community & Mobile Apps",
    category: "card",
    role: "UI/UX Designer",
    platform: ["iOS & Android Mobile"],
    scope: ["Mobile App UI", "Typography Accessibility", "Audio Player", "Event Schedules"],
    tools: ["Figma", "Mobile UI Patterns", "Accessibility Audits"],
    timeline: "2 Months",
    confidential: "public",
    order: 7,
    published: true,
    featured: false,
    cover: "/images/projects/mysatsang-cover.svg",
    tldr: {
      problem: "Elderly community members struggled with tiny fonts, complex menus, and unreliable video streaming on mobile devices.",
      role: "Redesigned navigation with high-legibility typography, persistent bottom tab bars, and one-tap live audio streaming.",
      outcome: "Attained a 4.8-star App Store rating with a 72% daily active user retention rate.",
    },
    decisions: [
      {
        title: "Dynamic Type Scaling with High-Contrast Theming",
        reason: "Prioritized large touch targets (52px) and robust typography scaling supporting user accessibility text size preferences.",
        alternative: "Fixed font sizing in pixels.",
      },
    ],
    outcomes: [
      { type: "fact", text: "4.8 / 5.0 App Store average rating across 1,200+ reviews." },
      { type: "fact", text: "72% DAU/MAU engagement retention rate over 6 months." },
    ],
  },
  {
    slug: "getslot",
    title: "GetSlot Facility & Turf Reservation Tool",
    subtitle: "Rapid sports facility and recreational slot reservation web and mobile app.",
    summary: "Built a rapid 30-second turf and court booking flow with instant payment split and automated slot re-opening on cancellation.",
    insightHeadline: "Minimizing checkout steps for high-urgency recreational reservations",
    industry: "Consumer Tech & Booking",
    category: "card",
    role: "Product Designer",
    platform: ["Mobile Web & Responsive"],
    scope: ["Slot Grid UX", "Split Payment Flow", "Cancellation Engine"],
    tools: ["Figma", "Rapid Prototyping", "Design System"],
    timeline: "2 Months",
    confidential: "public",
    order: 8,
    published: true,
    featured: false,
    cover: "/images/projects/getslot-cover.svg",
    tldr: {
      problem: "Sports players booking peak-hour recreational courts faced slow multi-step checkouts that caused slots to expire while coordinating with friends.",
      role: "Designed an interactive visual turf grid with instant 30-second reservation and shareable split-payment links.",
      outcome: "Cut court booking abandonment by 31% and achieved 4.9/5 player satisfaction.",
    },
    decisions: [
      {
        title: "Visual Interactive Venue Floor Map",
        reason: "Allowed players to pick exact court numbers and see surface type (synthetic, clay, indoor) directly from the availability grid.",
        alternative: "A plain list of court numbers in a dropdown menu.",
      },
    ],
    outcomes: [
      { type: "fact", text: "31% decrease in checkout abandonment during peak evening booking rush." },
      { type: "fact", text: "Over 45,000 court reservations successfully processed in year one." },
    ],
  },
];

export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getFlagshipProjects(): Project[] {
  return projects.filter((p) => p.category === "flagship").sort((a, b) => a.order - b.order);
}

export function getCompactProjects(): Project[] {
  return projects.filter((p) => p.category === "compact" || p.category === "card").sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(currentSlug: string): { prev?: Project; next?: Project } {
  const sorted = getAllProjects();
  const index = sorted.findIndex((p) => p.slug === currentSlug);
  if (index === -1) return {};
  const prev = index > 0 ? sorted[index - 1] : sorted[sorted.length - 1];
  const next = index < sorted.length - 1 ? sorted[index + 1] : sorted[0];
  return { prev, next };
}
