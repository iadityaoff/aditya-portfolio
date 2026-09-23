export type ProjectCategory = "flagship" | "compact" | "card";

export type ConfidentialityLevel = "public" | "anonymized" | "password";

export interface DecisionItem {
  title: string;
  reason: string;
  image?: string;
  alternative?: string;
  // Evidence chain links (§ Evidence system)
  evidence?: {
    problem: string;
    decision: string;
    implementation: string;
    outcome: string;
    evidenceImages?: [string, string, string, string]; // Images corresponding to the 4 stages
  };
}

export interface OutcomeItem {
  type: "fact" | "quote" | "delivery";
  text: string;
}

export interface TLDRData {
  problem: string;
  role: string;
  outcome: string;
  thumbnails?: string[];
}

export interface RoleData {
  role: string;
  goal: string;
  mainTask: string;
}

export interface BreakpointData {
  breakpoint: string;
  viewport: string;
  behavior: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  summary: string;
  insightHeadline?: string;
  keyOutcome?: { metric: string; label: string };
  realityCheck?: { quote: string; author: string; context: string };
  industry: string;
  category: ProjectCategory;
  role: string;
  platform: string[];
  scope: string[];
  tools: string[];
  timeline?: string;
  confidential: ConfidentialityLevel;
  tldr: TLDRData;
  context?: string[];
  constraints?: string[];
  roles?: RoleData[];
  keyFlow?: {
    title: string;
    steps: string[];
  };
  wireframes?: {
    title: string;
    description: string;
    status: "Kept" | "Rejected";
    reason?: string;
  }[];
  productStory?: {
    title: string;
    description: string;
    image?: string; // Optional real image
    mockComponentId?: string; // Fallback React component ID
  }[];
  decisions: DecisionItem[];
  breakpoints?: BreakpointData[];
  systemHandoff?: {
    componentsCount: number;
    tokensCount: number;
    storybookUrl?: string;
    specsDescription: string;
  };
  outcomes: OutcomeItem[];
  reflection?: {
    learnings: string[];
    improvements: string[];
  };
  cover: string;
  ogImage?: string;
  order: number;
  published: boolean;
  featured?: boolean;
}

export interface MetricItem {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  whoItsFor: string;
  deliverables: string[];
  typicalOutputs: string[];
  relatedWorkSlug: string;
  relatedWorkTitle: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  project: string;
  source: string;
  photo?: string;
}

export interface CapabilityGroup {
  category: string;
  skills: string[];
}

export interface ProcessStep {
  number: string;
  name: string;
  description: string;
  artifact: string;
  aiTools?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  roleTitle: string;
  headline: string;
  subHeadline: string;
  credibilityText: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  responseTime: string;
  metrics: MetricItem[];
  navItems: { label: string; href: string }[];
  socials: {
    linkedin: string;
    behance?: string;
    dribbble?: string;
    upwork?: string;
    github?: string;
  };
}
