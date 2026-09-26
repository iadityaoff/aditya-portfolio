import { SiteConfig, ServiceItem, TestimonialItem, CapabilityGroup, ProcessStep, ExperienceItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Aditya Tripathi",
  roleTitle: "Senior UI/UX Designer",
  headline: "Complex products. Clear experiences. Scalable systems.",
  subHeadline:
    "I design SaaS and enterprise products with complex workflows, dashboards, roles and data — then use AI-assisted workflows to move from Figma to working prototypes, design systems, and production-ready implementation faster.",
  credibilityText: "5+ YEARS · SAAS & ENTERPRISE · DESIGN SYSTEMS · FIGMA · AI-ASSISTED IMPLEMENTATION",
  email: "aditya21tripathi81040@gmail.com",
  phone: "+91 6394625747",
  location: "Surat, Gujarat, India",
  availability: "Open to projects",
  responseTime: "Within 24 hours",
  metrics: [
    { value: "5+", label: "Years experience", sublabel: "SaaS & enterprise focus" },
    { value: "14+", label: "Products designed", sublabel: "Healthcare, ERP, fintech" },
    { value: "480+", label: "Reusable components", sublabel: "Tokens, states & documentation" },
    { value: "Web + Mobile", label: "Multi-platform delivery", sublabel: "Responsive & native" },
  ],
  navItems: [
    { label: "Work", href: "/work" },
    { label: "Design System", href: "/design-system" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Resume", href: "/resume" },
  ],
  socials: {
    linkedin: "https://linkedin.com/in/aditya-tripathi-2a4847171",
    github: "https://github.com/iadityaoff",
  },
};

export const proofClients = [
  "OctaNode",
  "Apex Health Systems",
  "TalentFlow Enterprise",
  "OpsPulse Cloud",
  "Converge Events",
];

export const specializations = [
  {
    title: "SaaS & Enterprise UX",
    description: "Multi-tenant architectures, deep permission matrices, and high-density data views tailored for high-frequency operators.",
    tags: ["Role-Based Access", "Data Tables", "Information Density"],
  },
  {
    title: "Design Systems",
    description: "Multi-tier design token architecture, accessible Figma component libraries, and synchronized code tokens.",
    tags: ["Token Architectures", "Figma Variables", "Component Governance"],
  },
  {
    title: "Complex Workflows",
    description: "Multi-step approval engines, conditional forms, state transitions, and audit-ready data tracking.",
    tags: ["State Machines", "Conditional Logic", "Progressive Disclosure"],
  },
  {
    title: "Product Redesign",
    description: "Auditing legacy enterprise interfaces, eliminating dead paths, consolidating fragmented patterns, and modernizing without retraining friction.",
    tags: ["UX Audits", "Information Architecture", "Friction Reduction"],
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    name: "Understand",
    description: "Map existing workflows, interview operators, and identify domain constraints. Use AI to synthesize notes, organize requirements, and surface themes.",
    artifact: "Role map + AI brief",
    aiTools: "Claude · ChatGPT",
  },
  {
    number: "02",
    name: "Structure",
    description: "Define object relationships, hierarchy, navigation models, and decision-tree paths.",
    artifact: "Flow diagram",
  },
  {
    number: "03",
    name: "Explore",
    description: "Rapid low-fidelity layout testing with real data. Use AI to explore layout alternatives, UX copy variations, and interaction directions.",
    artifact: "Wireframes + AI alternatives",
    aiTools: "Claude · ChatGPT",
  },
  {
    number: "04",
    name: "Systemize",
    description: "Establish semantic tokens, layout primitives, and component variants. Use AI to assist with token naming, component documentation, and state definitions.",
    artifact: "Tokens + AI-generated docs",
    aiTools: "Claude · Figma MCP",
  },
  {
    number: "05",
    name: "Design",
    description: "High-fidelity screens across all responsive breakpoints with explicit edge cases, error states, and empty states.",
    artifact: "Interactive prototype",
  },
  {
    number: "06",
    name: "Validate & Handoff",
    description: "AI-scaffolded components reviewed against the design system. Walk developers through responsive rules, tokens, and inspectable specs.",
    artifact: "Specs + Storybook + AI scaffold",
    aiTools: "Cursor · Antigravity",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    quote: "Aditya restructured our clinical billing workflow in six weeks. For the first time, our doctors and billing administrators share a single mental model without context switching.",
    name: "Dr. Marcus Vance",
    role: "Chief Medical Officer",
    project: "Doctor-Patient Care Platform",
    source: "Verified Enterprise Client",
  },
  {
    quote: "Most designers give us static art that breaks the moment real table data loads. Aditya delivered a cohesive token system and documented states that directly mirrored our React and Angular component props.",
    name: "Elena Rostova",
    role: "Lead Frontend Architect",
    project: "Application Management System",
    source: "Enterprise Client",
  },
  {
    quote: "His frontend fluency meant zero translation loss between Figma and production. Every edge case, empty state, and responsive behavior was accounted for before we wrote a single line of code.",
    name: "David Chen",
    role: "VP of Product",
    project: "Event & Registration Platform",
    source: "SaaS Founder",
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    category: "Design & UX",
    skills: [
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Information Architecture",
      "User Flows",
      "Wireframing",
      "Prototyping",
      "Interaction & Motion Design",
    ],
  },
  {
    category: "Frontend Implementation",
    skills: [
      "HTML",
      "CSS/SCSS (variables, functions, mixins)",
      "Angular",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Bootstrap 5",
      "PrimeNG",
      "Framer Motion",
    ],
  },
  {
    category: "Tools & Workflows",
    skills: [
      "Figma",
      "Storybook",
      "Design Tokens",
      "Atomic Design",
      "Developer Handoff",
      "Adobe Photoshop",
      "Adobe Illustrator",
    ],
  },
  {
    category: "AI-Assisted Development",
    skills: [
      "Claude / ChatGPT (research, exploration, content)",
      "Cursor / GitHub Copilot (code assistance)",
      "Antigravity (agentic UI building)",
      "Figma MCP (design-to-code context)",
      "Vibe Coding & Rapid Prototyping",
      "Prompt Engineering for UX Workflows",
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    role: "Product & UI/UX Designer",
    company: "OctaNode",
    period: "03/2021 — Present",
    description: "Lead end-to-end UX/UI design for enterprise web and mobile applications, building scalable design systems in Storybook, and writing production UI code in Angular, SCSS, and Tailwind CSS.",
  },
];

export const services: ServiceItem[] = [
  {
    id: "product-ux-ui",
    title: "Product UX & UI Design",
    tagline: "End-to-end design for data-heavy platforms and multi-step SaaS tools.",
    whoItsFor: "Startups and scale-ups building complex SaaS products or replacing fragmented spreadsheets with dedicated software.",
    deliverables: [
      "End-to-end UX audit & workflow mapping",
      "Role-based permission architecture & IA",
      "Low-fidelity wireframe flows with stress-tested data",
      "High-fidelity UI screens (all breakpoints & edge states)",
      "Clickable prototypes for validation and investor demos",
    ],
    typicalOutputs: ["Figma Design File", "Interactive Prototype", "Handoff Specification"],
    relatedWorkSlug: "healthcare-platform",
    relatedWorkTitle: "DrPro Hospital & Clinic Platform",
  },
  {
    id: "design-systems",
    title: "Design Systems & Token Architecture",
    tagline: "Scalable foundation libraries that align design teams and engineering squads.",
    whoItsFor: "Engineering and product teams experiencing UI inconsistencies, slow development cycles, and high design debt.",
    deliverables: [
      "Multi-tier design token architecture (primitive, semantic, component)",
      "Complete Figma component library with variants and auto-layout",
      "State definitions: default, hover, focus, active, disabled, error",
      "Component parity documentation mapped to frontend framework props",
      "Contribution model & versioning guidelines",
    ],
    typicalOutputs: ["Figma Tokens Library", "Token Sync Pipeline", "Documentation Guide"],
    relatedWorkSlug: "design-system",
    relatedWorkTitle: "Foundations & Component System",
  },
  {
    id: "product-redesign",
    title: "Product Modernization & Redesign",
    tagline: "Refactoring legacy software into fast, modern experiences without retraining users.",
    whoItsFor: "Established enterprise platforms suffering from usability drop-offs, cluttered screens, and declining renewal rates.",
    deliverables: [
      "Heuristic UX audit identifying workflow bottlenecks",
      "Information architecture restructuring",
      "Table & data visualization decluttering",
      "Progressive disclosure patterns for dense forms",
      "Phased migration plan to preserve operator muscle memory",
    ],
    typicalOutputs: ["UX Audit Report", "Before/After Comparison", "Target State Architecture"],
    relatedWorkSlug: "application-management",
    relatedWorkTitle: "Enterprise Application Management",
  },
  {
    id: "design-to-dev",
    title: "Design-to-Development Handoff",
    tagline: "Frontend-aware specs, token exports, and component blueprints developers love.",
    whoItsFor: "Founders and product managers tired of handoff disconnects, redesign rework, and CSS interpretation gaps.",
    deliverables: [
      "Clean CSS / SCSS / Tailwind token translation",
      "Component state matrices and keyboard focus specifications",
      "Responsive breakpoint behavior rules (375px to 1920px)",
      "Storybook-ready component documentation",
      "Developer QA review sessions during implementation sprints",
    ],
    typicalOutputs: ["Tailwind Theme Configuration", "Storybook Blueprint", "Inspection Specs"],
    relatedWorkSlug: "event-registration",
    relatedWorkTitle: "Event & Registration Platform",
  },
  {
    id: "ai-assisted-prototyping",
    title: "AI-Assisted Prototyping & Implementation",
    tagline: "From Figma designs and briefs to working prototypes using AI-assisted development.",
    whoItsFor: "Teams who need to validate product concepts quickly, or bridge the gap between design handoff and initial frontend scaffolding.",
    deliverables: [
      "Rapid working prototypes from Figma designs or requirements",
      "AI-scaffolded component code reviewed against design system",
      "Vibe-coded proof-of-concepts for stakeholder validation",
      "Figma MCP-assisted design-to-development handoff",
      "Production-ready code after manual refinement and QA",
    ],
    typicalOutputs: ["Working Prototype", "Reviewed Component Code", "Storybook Stories"],
    relatedWorkSlug: "design-system",
    relatedWorkTitle: "Foundations & Component System",
  },
];

export const faqs = [
  {
    question: "What is your primary design focus?",
    answer: "I specialize in SaaS and enterprise product design — particularly platforms with high data density, role-based workflows, administrative dashboards, and modular design systems.",
  },
  {
    question: "How does your frontend background help my project?",
    answer: "Because I write Angular, Next.js, SCSS, and Tailwind CSS, I understand the DOM, CSS layout models, component state lifecycles, and framework conventions. I design systems that are practical to build and scale.",
  },
  {
    question: "How do you use AI in your design and development workflow?",
    answer: "I use AI tools like Claude, ChatGPT, Cursor, GitHub Copilot, and Antigravity to accelerate research synthesis, UX copy exploration, component scaffolding, and prototype building. AI handles the first pass — I review, refine, and validate every output against the design system, accessibility standards, and UX requirements before anything ships.",
  },
  {
    question: "What time zones do you work with?",
    answer: "I am based in Surat, Gujarat, India (IST, UTC+5:30) and regularly collaborate with teams across North America (PST/EST), Europe (GMT/CET), and APAC, with guaranteed daily overlap hours for sync meetings and standups.",
  },
  {
    question: "How do you handle revisions and feedback?",
    answer: "We structure work in weekly milestone sprints. Each sprint includes low-fidelity review before high-fidelity styling, preventing large rework cycles. Feedback is captured asynchronously via Figma comments or scheduled review sessions.",
  },
  {
    question: "What tools do you use?",
    answer: "Figma is my primary design hub (variables, tokens, auto-layout, interactive components). For implementation and handoff, I work with Storybook, Angular, SCSS, Tailwind, and GitHub. I also use Claude, Cursor, and Antigravity for AI-assisted component scaffolding and rapid prototyping.",
  },
];

export const whatICareAbout = [
  {
    title: "Clarity over decoration",
    description: "In enterprise software, an operator's time is precious. Clean visual hierarchy and information clarity always beat superficial flourishes.",
  },
  {
    title: "Systems over one-off screens",
    description: "Every button, modal, and data row should belong to a disciplined token-driven system that scales with the product.",
  },
  {
    title: "Real data over placeholder text",
    description: "Interfaces must be stress-tested with edge cases: long names, empty states, missing records, and 1,000-row tables.",
  },
  {
    title: "Engineer-friendly delivery",
    description: "A design is only as good as what ships to users. Complete states, responsive breakpoints, and tokenized specs bridge the engineering gap.",
  },
  {
    title: "Measurable workflow outcomes",
    description: "Design choices should be rooted in reducing clicks, eliminating context-switching, and preventing operational errors.",
  },
  {
    title: "AI as acceleration, not replacement",
    description: "AI tools help me explore faster, scaffold code, and generate first-pass content — but every design decision, UX evaluation, and final review is human-led.",
  },
];
