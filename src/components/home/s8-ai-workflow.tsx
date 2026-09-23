"use client";

import * as React from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { WorkflowPipeline } from "@/components/shared/workflow-pipeline";
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "motion/react";

// --- Data for the 6 Stages ---
const stages = [
  {
    id: "context",
    name: "01 Context",
    leftTitle: "Understand & Synthesize",
    leftActivity: [
      "Requirements organized",
      "Constraints identified",
      "User roles mapped",
      "Dependencies identified",
      "Open questions captured",
    ],
    leftNote: "AI helps synthesize raw complex inputs quickly.",
  },
  {
    id: "strategy",
    name: "02 Strategy",
    leftTitle: "UX Architecture",
    leftActivity: [
      "Mapping workflow",
      "Exploring information architecture",
      "Comparing interaction approaches",
      "Identifying edge cases",
      "Drafting UX copy alternatives",
    ],
    leftNote: "AI helps me explore. I make the final UX decisions.",
  },
  {
    id: "design",
    name: "03 Design",
    leftTitle: "Figma Source of Truth",
    leftActivity: [
      "Page structure established",
      "Tokens & styles applied",
      "Component states defined",
      "Responsive rules mapped",
      "Auto-layout configured",
    ],
    leftNote: "The design system remains the absolute source of truth.",
  },
  {
    id: "build",
    name: "04 Build",
    leftTitle: "Agentic Implementation",
    leftActivity: [
      "Reading design context (MCP)",
      "Creating component structure",
      "Applying design tokens",
      "Implementing responsive states",
      "Preparing Storybook states",
    ],
    leftNote: "AI scaffolds the boilerplate component code rapidly.",
  },
  {
    id: "debug",
    name: "05 Debug",
    leftTitle: "Agentic Refinement",
    leftActivity: [
      "Fixing hydration errors",
      "Resolving layout shifts",
      "Correcting token usage",
      "Linting / Formatting",
      "Accessibility checks",
    ],
    leftNote: "AI acts as a fast iterative debugger in the loop.",
  },
  {
    id: "review",
    name: "06 Review",
    leftTitle: "Human Quality Gate",
    leftActivity: [
      "Code quality reviewed ✓",
      "Responsive ✓",
      "Accessibility reviewed ✓",
      "Design system aligned ✓",
      "Storybook documented ✓",
    ],
    leftNote: "AI accelerated execution. I owned the product decisions.",
  },
];

// --- Data for Tools & Outcomes ---
const tools = [
  { name: "Claude + ChatGPT", role: "Research, synthesis, requirements, UX exploration, documentation, and context." },
  { name: "Figma + Figma MCP", role: "Design source of truth, components, variables, and design-to-code context." },
  { name: "Cursor + Copilot", role: "Prompt-driven implementation, component scaffolding, and code assistance." },
  { name: "Antigravity", role: "Agentic development, multi-step implementation, UI building, and debugging." },
  { name: "Angular / Next.js", role: "Functional prototypes and production interfaces using Tailwind/PrimeNG." },
  { name: "Storybook", role: "Component states, validation, documentation, themes, and consistency." },
];

const outcomes = [
  "Faster movement from requirements to testable prototypes",
  "More UX alternatives explored before committing",
  "Better management of long-running project context",
  "Faster transition from Figma to functional interfaces",
  "Less repetitive implementation and documentation work",
  "Functional prototypes instead of only static screens",
  "Better designer-to-developer handoff",
  "Faster iteration without losing design intent",
];

export function S8AiWorkflow() {
  const [activeStage, setActiveStage] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true); // User click overrides scroll
  const sectionRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-driven pipeline: section progress maps to active stage
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const stageIndex = useTransform(scrollYProgress, [0.1, 0.9], [0, stages.length - 1]);

  useMotionValueEvent(stageIndex, "change", (latest) => {
    // Only auto-update via scroll if user hasn't explicitly clicked to pause/override
    if (isPlaying) {
      const clamped = Math.round(Math.max(0, Math.min(stages.length - 1, latest)));
      setActiveStage(clamped);
    }
  });

  // Fallback for reduced-motion users
  React.useEffect(() => {
    if (!shouldReduceMotion) return;
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev === stages.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, shouldReduceMotion]);

  const handleStageClick = (index: number) => {
    setActiveStage(index);
    setIsPlaying(false);
  };

  const renderVisualPreview = (currentStage: number) => {
    return (
      <>
        {/* Stage 01: Context (Document) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 0 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full bg-white rounded-lg shadow-sm border border-line p-6 font-mono text-xs text-muted space-y-3">
            <div className="h-3 w-1/3 bg-line rounded mb-6"></div>
            <div className="h-2 w-full bg-line/50 rounded"></div>
            <div className="h-2 w-5/6 bg-line/50 rounded"></div>
            <div className="h-2 w-4/6 bg-line/50 rounded"></div>
            <div className="my-4 border-b border-dashed border-line/60"></div>
            <div className="h-2 w-full bg-line/50 rounded"></div>
            <div className="h-2 w-full bg-line/50 rounded"></div>
          </div>
        </div>

        {/* Stage 02: Strategy (Sitemap/Flow) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 1 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full p-4 flex flex-col items-center justify-center gap-4">
            <div className="w-24 h-8 bg-white border-2 border-line rounded-md shadow-sm"></div>
            <div className="w-0.5 h-4 bg-line"></div>
            <div className="flex gap-4">
              <div className="w-16 h-8 bg-white border-2 border-line rounded-md shadow-sm"></div>
              <div className="w-16 h-8 bg-white border-2 border-accent/40 rounded-md shadow-sm relative">
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              </div>
              <div className="w-16 h-8 bg-white border-2 border-line rounded-md shadow-sm"></div>
            </div>
          </div>
        </div>

        {/* Stage 03: Design (Figma UI) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 2 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full bg-[#1E1E1E] rounded-lg shadow-lg overflow-hidden flex flex-col ring-1 ring-white/10">
            <div className="h-6 border-b border-white/10 flex items-center px-3 gap-1.5">
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
              <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            <div className="flex-1 p-4 grid grid-cols-3 gap-4">
              <div className="col-span-1 space-y-2 border-r border-white/10 pr-4">
                <div className="h-2 w-full bg-white/10 rounded"></div>
                <div className="h-2 w-full bg-white/10 rounded"></div>
                <div className="h-2 w-2/3 bg-white/10 rounded"></div>
              </div>
              <div className="col-span-2">
                <div className="w-full aspect-video bg-white/5 rounded border border-white/10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 04: Build (Code Editor) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 3 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full bg-[#0E0E10] rounded-lg shadow-xl overflow-hidden font-mono text-xs text-white/60 p-4 leading-relaxed">
            <div className="text-accent/80 mb-2">{"<Button variant=\"primary\">"}</div>
            <div className="pl-4 text-emerald-400">{"// Agent generated scaffolding"}</div>
            <div className="pl-4">{"<Icon name=\"check\" />"}</div>
            <div className="pl-4 text-white">{"Save Settings"}</div>
            <div className="text-accent/80 mt-2">{"</Button>"}</div>
            <div className="mt-4 text-white/30 animate-pulse">{"_"}</div>
          </div>
        </div>

        {/* Stage 05: Debug (Terminal/Console) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 4 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full bg-[#0E0E10] rounded-lg shadow-xl overflow-hidden font-mono text-xs p-4 leading-relaxed">
            <div className="text-rose-400 mb-1">{"Error: Hydration failed"}</div>
            <div className="text-white/40 mb-3">{"at components/layout.tsx:42"}</div>
            <div className="text-emerald-400 mb-1">{"> Auto-fixing via Antigravity..."}</div>
            <div className="text-white mt-2">{"✓ Compiled successfully"}</div>
          </div>
        </div>

        {/* Stage 06: Review (Polished UI component) */}
        <div className={cn("absolute inset-0 transition-opacity duration-500", currentStage === 5 ? "opacity-100 z-10" : "opacity-0 z-0")}>
          <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-white to-surface rounded-lg shadow-sm border border-line">
            <div className="w-full bg-white rounded-xl shadow-md border border-line p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold">A</div>
                <div>
                  <div className="h-3 w-20 bg-ink rounded mb-1.5"></div>
                  <div className="h-2 w-16 bg-muted rounded"></div>
                </div>
              </div>
              <div className="h-2 w-full bg-line rounded"></div>
              <div className="h-2 w-4/5 bg-line rounded"></div>
              <div className="pt-2 flex justify-end gap-2">
                <div className="h-7 w-16 bg-surface border border-line rounded-md"></div>
                <div className="h-7 w-20 bg-accent rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <section ref={sectionRef} id="ai-workflow" className="w-full py-20 lg:py-32 bg-background border-t border-line">
      <Container size="default">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-3">
            AI IN MY WORKFLOW
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-ink leading-tight mb-4">
            AI accelerates the workflow.<br />
            <em className="font-serif font-normal italic">I own the decisions.</em>
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            I use modern agentic workflows to handle complex enterprise products, prototype quickly, and bridge Figma to production code—while ensuring UX reasoning and final quality remain human-led.
          </p>
        </div>

        {/* Interactive Pipeline Component */}
        <div className="mb-16">
          <WorkflowPipeline 
            stages={stages} 
            activeStage={activeStage} 
            onStageClick={handleStageClick}
            renderVisualPreview={renderVisualPreview}
          />
        </div>

        {/* 2 & 3. Tools + Purpose and Outcomes (Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-line/60">
          
          {/* Tools */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-mono text-xs text-ink font-semibold">
              Tools &amp; Their Role
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl bg-white border border-line">
                  <div className="font-semibold text-sm text-ink mb-1">{tool.name}</div>
                  <div className="text-xs text-muted leading-relaxed">{tool.role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-mono text-xs text-ink font-semibold">
              What AI Helps Me Achieve
            </h3>
            <ul className="space-y-3">
              {outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-accent mt-0.5 shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </Container>
    </section>
  );
}
